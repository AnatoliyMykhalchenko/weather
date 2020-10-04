import { WeatherInterface } from './../item/item.types';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class GetWeatherService {
  constructor(private readonly http: HttpClient) {}

  getWeather(cityName: string = 'Киев'): Observable<WeatherInterface> {
    return this.http
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=bc85bf8ec162713673bd2afd22dc5883&units=metric&lang=ru`
      )
      .pipe(
        map((item: any) => {
          console.log(item);
          const data: WeatherInterface = {
            name: item.name,
            clouds: item.clouds.all,
            temp: item.main.temp,
            feelsLike: item.main.feels_like,
            humidity: item.main.humidity,
            pressure: item.main.pressure,
            description: item.weather[0].description,
            icon: item.weather[0].icon
          };
          console.log(data);
          return data;
        })
      );
  }

  getHourlyWeather(cityName: string = 'Киев'): Observable<any> {
    return this.http
      .get(
        `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&APPID=bc85bf8ec162713673bd2afd22dc5883&units=metric&lang=ru`
      )
      .pipe(
        map((data: any) => {
          console.log(data);
          return data.list.map(item => ({
            clouds: item.clouds.all,
            temp: item.main.temp,
            feelsLike: item.main.feels_like,
            humidity: item.main.humidity,
            pressure: item.main.pressure,
            description: item.weather[0].description,
            icon: item.weather[0].icon,
            date: moment(item.dt_txt).format('DD.MM.YYYY HH:mm'),
          }));
        })
      );
  }
}
