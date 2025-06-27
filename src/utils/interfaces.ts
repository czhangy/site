import { WeatherCondition } from '@/utils/types';

// Defines the interface used to pass links between components
export interface LinkItem {
    display: string;
    href: string;
    width: number;
}

// Defines the data needed to populate the TweetPanel
export interface TwitterData {
    profilePicUrl: string;
    displayName: string;
    tweet: string;
    timestamp: string;
}

// Defines the data needed to call to the Open-Meteo API
export interface LocationData {
    cityName: string;
    latitude: number;
    longitude: number;
}

// Defines the data needed to populate WeatherPanel
export interface WeatherData {
    cityName: string;
    weather: WeatherCondition;
    temperature: string;
    isDay: boolean;
}

// Defines the data needed to be cached in WeatherPanel
export interface CachedWeatherData extends WeatherData {
    expiry: Date;
}

// Defines the data needed to populate FunFactsPanel
export interface FunFactData {
    fact: string;
    emoji: string;
}

// Defines the data needed to populate SpotifyPanel
export interface SpotifyData {
    songName: string;
    artist: string;
    albumCoverUrl: string;
    spotifyUrl: string;
}

// Defines the data needed to populate the Timeline
export interface WorkExperience {
    id: string;
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
    achievements: string[];
    logo?: string;
}
