import { WeatherResponse } from "./weather";

export interface City {
    name: string;
    latitude: number;
    longitude: number;
}

export interface weatherCities {
    city: City;
    weather: WeatherResponse;
    
}