export interface WeatherResponse {
    current: Current;
    daily: Daily;
    hourly: Hourly;
}

export interface Hourly {
    time: string[];
    temperature_2m: number[];
    relative_humidity_2m: number[];
    rain: number[];
    wind_speed_10m: number[];
}
export interface Current {
    temperature_2m: number;
    relative_humidity_2m: number;
    rain: number;
    wind_speed_10m: number;
    time: string;
}
export interface Daily {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    rain_sum: number[];
    wind_speed_10m_max: number[];
}
export interface City {
    name: string;
    latitude: number;
    longitude: number;
}
