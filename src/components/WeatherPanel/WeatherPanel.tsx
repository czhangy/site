'use client';

import { cacheToLocalStorage, fetchSingleRow, maybeFetchFromLocalStorage } from '@/utils/helpers';
import { LocationData, WeatherData } from '@/utils/interfaces';
import { WeatherCondition } from '@/utils/types';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import LoadingSymbol from '../LoadingSymbol/LoadingSymbol';
import styles from './WeatherPanel.module.scss';

const WeatherPanel: React.FC = () => {
    // Constants
    const CACHE_KEY = 'weatherData';

    // Hooks
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(false);
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    useEffect(() => {
        const mapWeatherCondition = (code: number): WeatherCondition => {
            // https://open-meteo.com/en/docs?current=weather_code,temperature_2m#weather_variable_documentation
            if (code >= 95) {
                return 'Thunderstorm';
            } else if (code >= 71 && code !== 80 && code !== 81 && code !== 82) {
                return 'Snowing';
            } else if (code >= 51) {
                return 'Raining';
            } else if (code >= 2) {
                return 'Cloudy';
            } else {
                return 'Clear';
            }
        };

        const fetchLocationData = async () => {
            // Read access is public on the Location table
            const data = await fetchSingleRow('location');

            if (data) {
                const fetchedLocationData: LocationData = {
                    cityName: data.city_name,
                    latitude: data.latitude,
                    longitude: data.longitude,
                };

                return fetchedLocationData;
            }
        };

        const fetchWeatherData = async () => {
            setIsLoading(true);

            const cachedWeatherData = maybeFetchFromLocalStorage(CACHE_KEY);

            if (cachedWeatherData) {
                // Check local storage for any cached location data
                setWeatherData(cachedWeatherData);
            } else {
                // If the weather data isn't in local storage, generate it from API
                const locationData = await fetchLocationData();
                if (locationData) {
                    try {
                        const url = `https://api.open-meteo.com/v1/forecast?temperature_unit=fahrenheit&latitude=${locationData.latitude}&longitude=${locationData.longitude}&current=temperature_2m,weather_code&daily=sunrise,sunset&timezone=auto`;
                        const weatherResponse = await fetch(url);
                        if (!weatherResponse.ok) {
                            throw new Error(`HTTP error! status: ${weatherResponse.status}`);
                        }

                        const data = await weatherResponse.json();
                        const now = new Date();
                        const sunrise = new Date(data.daily.sunrise[0]);
                        const sunset = new Date(data.daily.sunset[0]);

                        const fetchedWeatherData: WeatherData = {
                            cityName: locationData.cityName,
                            weather: mapWeatherCondition(data.current.weather_code),
                            temperature: `${Math.round(data.current.temperature_2m)}${data.current_units.temperature_2m}`,
                            isDay: now >= sunrise && now < sunset,
                        };

                        // Save weather data + expiry to local storage
                        cacheToLocalStorage(fetchedWeatherData, CACHE_KEY, 60);

                        setWeatherData(fetchedWeatherData);
                    } catch (error) {
                        console.error('Error fetching weather data:', error);
                        setIsError(true);
                    }
                } else {
                    setIsError(true);
                }
            }

            setIsLoading(false);
        };

        fetchWeatherData();
    }, []);

    // Helpers
    const getWeatherSlug = (): string => {
        if (!weatherData) {
            return '';
        }
        const prefix = `${weatherData.weather.toLowerCase()}-`;
        const suffix = weatherData.isDay ? 'day' : 'night';
        return prefix + suffix;
    };

    // JSX
    if (isError) {
        return (
            <div className={styles.error}>
                <svg className={styles.icon} viewBox="0 0 24 24">
                    <path
                        fill="currentColor"
                        d="M10.62 14.44L9.56 15.5L10.62 16.56L9.56 17.62L8.5 16.56L7.44 17.62L6.38 16.56L7.44 15.5L6.38 14.44L7.44 13.38L8.5 14.44L9.56 13.38L10.62 14.44M16.56 13.38L15.5 14.44L14.44 13.38L13.38 14.44L14.44 15.5L13.38 16.56L14.44 17.62L15.5 16.56L16.56 17.62L17.62 16.56L16.56 15.5L17.62 14.44L16.56 13.38M23 15V18C23 18.55 22.55 19 22 19H21V20C21 21.11 20.11 22 19 22H5C3.9 22 3 21.11 3 20V19H2C1.45 19 1 18.55 1 18V15C1 14.45 1.45 14 2 14H3C3 10.13 6.13 7 10 7H11V5.73C10.4 5.39 10 4.74 10 4C10 2.9 10.9 2 12 2S14 2.9 14 4C14 4.74 13.6 5.39 13 5.73V7H14C17.87 7 21 10.13 21 14H22C22.55 14 23 14.45 23 15M21 16H19V14C19 11.24 16.76 9 14 9H10C7.24 9 5 11.24 5 14V16H3V17H5V20H19V17H21V16Z"
                    />
                </svg>
                <p className={styles.msg}>Something went wrong...</p>
            </div>
        );
    } else if (isLoading || !weatherData) {
        return <LoadingSymbol />;
    } else {
        return (
            <div className={`${styles.weatherPanel} ${styles[getWeatherSlug()]}`}>
                <div className={styles.icon}>
                    <Image
                        className="next-image"
                        src={`/${getWeatherSlug()}.svg`}
                        alt={`${weatherData.weather} weather icon`}
                        fill
                        priority
                    />
                </div>
                <div className={styles.text}>
                    <p className={styles.city}>{weatherData.cityName}</p>
                    <p className={styles.temperature}>{weatherData.temperature}</p>
                    <p className={styles.condition}>{weatherData.weather}</p>
                </div>
            </div>
        );
    }
};

export default WeatherPanel;
