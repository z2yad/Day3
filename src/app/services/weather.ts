import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { WeatherResponse } from '../inerfaces/weather';

@Injectable({
  providedIn: 'root',
})
export class Weather {
  private http = inject(HttpClient);

  // Get weather data
  getWeather(latitude: number, longitude: number) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,rain_sum,wind_speed_10m_max&hourly=temperature_2m,relative_humidity_2m,rain,wind_speed_10m`;

    return this.http.get<WeatherResponse>(url);
  }
}
