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
        map((item: any) => this.formatData(item)),
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
          return data.list.map(item => this.formatData(item));
        })
      );
  }

  formatData(data: any): WeatherInterface {
    return ({
    name: data.name,
    clouds: data.clouds.all,
    temp: data.main.temp,
    feelsLike: data.main.feels_like,
    humidity: data.main.humidity,
    pressure: data.main.pressure,
    description: data.weather[0].description,
    icon: data.weather[0].icon,
    date: moment(data.dt_txt).format('DD.MM.YYYY HH:mm'),
    });
  }

}
