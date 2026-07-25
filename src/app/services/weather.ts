import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { WeatherResponse } from '../inerfaces/weather';

@Injectable({
  providedIn: 'root',
})
export class Weather {
  private http = inject(HttpClient);

  //return Api 
  Url = 'https://api.open-meteo.com/v1/forecast?latitude=30.0626&longitude=31.2497&daily=temperature_2m_max,temperature_2m_min,rain_sum,wind_speed_10m_max&current=temperature_2m,relative_humidity_2m,rain,wind_speed_10m'

  //get weather Data
  getWeather() {
    return this.http.get<WeatherResponse>(this.Url);
  }


}
