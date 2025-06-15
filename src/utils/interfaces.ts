import { WeatherCondition } from '@/utils/types';

export interface LinkItem {
    display: string;
    href: string;
    width: number;
}

export interface Coords {
    x: number;
    y: number;
}

export interface TwitterData {
    profilePicUrl: string;
    displayName: string;
    tweet: string;
    timestamp: string;
}

export interface LocationData {
    cityName: string;
    latitude: number;
    longitude: number;
}

export interface WeatherData {
    cityName: string;
    weather: WeatherCondition;
    temperature: string;
}
