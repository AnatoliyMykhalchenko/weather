import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { ResolvedWeatherData, WeatherInterface } from './../item/item.types';
import { LoggerService } from './logger/logger.service';

@Injectable({
  providedIn: 'root'
})
export class GetWeatherService {
  weatherUrl = 'http://api.openweathermap.org/data/2.5/weather';
  forecastUrl = 'http://api.openweathermap.org/data/2.5/forecast';
  constructor(private readonly http: HttpClient, private readonly logger: LoggerService) {
    this.getDayName();
   }

  getResolvedData(cityName: string = 'Киев'): Observable<any> {
    return combineLatest(
      [
        this.getWeather(cityName),
        this.getHourlyWeather(cityName)
      ]
    ).pipe(
      map(([currentWeather, hourlyWeather]): ResolvedWeatherData => ({
        currentWeather,
        hourlyWeather,
        datesArr: this.formatByDates(hourlyWeather),
      })),
      tap((data) => this.logger.consoleMessage('GetResolvedData', data)),
    );
  }

  getWeather(cityName: string): Observable<WeatherInterface> {
    return this.http
      .get(
        this.getWeatherUrl(cityName),
      )
      .pipe(
        map((item: any) => this.formatData(item)),
        tap((data) => this.logger.consoleMessage('GetWeatherData', data)),
      );
  }

  getHourlyWeather(cityName: string): Observable<WeatherInterface[]> {
    return this.http
      .get(
        this.getForecastUrl(cityName),
      )
      .pipe(
        map((data: any) => {
          const arr = data.list.map(item => this.formatData(item));
          return arr;
        }),
        tap((data) => this.logger.consoleMessage('GetHourlyWeatherData', data)),
      );
  }

  formatData(data: any): WeatherInterface {
    if (data) {
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
        wind: data.wind.speed,
        dayName: this.getDayName(),
      });
    }

  }

  formatByDates(arr: WeatherInterface[]) {
    const newArr = arr.map(item => item.date).map(date => date.slice(0, -5).trim());
    const filteredArr = [... new Set(newArr)];
    return filteredArr;
  }

  getWeatherUrl(cityName): string {
    return `${this.weatherUrl}?q=${cityName}&APPID=bc85bf8ec162713673bd2afd22dc5883&units=metric&lang=ru`;
  }

  getForecastUrl(cityName): string {
    return `${this.forecastUrl}?q=${cityName}&APPID=bc85bf8ec162713673bd2afd22dc5883&units=metric&lang=ru`;
  }

  getDayName() {
    const todayDate = new Date();
    const today = todayDate.getDay();
    const daysArr = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота' ];
    const dayName = daysArr[today];
    return dayName;
  }

}
