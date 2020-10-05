import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { ResolvedWeatherData, WeatherInterface } from './../item/item.types';

@Injectable({
  providedIn: 'root'
})
export class GetWeatherService {
  constructor(private readonly http: HttpClient) {}

  getResolvedData(cityName: string = 'Киев'): Observable<any> {
    return combineLatest(
      [
        this.getWeather(cityName),
        this.getHourlyWeather(cityName)
      ]
    ).pipe(
      map(([ currentWeather, hourlyWeather ]): ResolvedWeatherData => ({
        currentWeather,
        hourlyWeather,
        datesArr: this.formatByDates(hourlyWeather),
      })),
    );
  }

  getWeather(cityName: string): Observable<WeatherInterface> {
    return this.http
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=bc85bf8ec162713673bd2afd22dc5883&units=metric&lang=ru`
      )
      .pipe(
        map((item: any) => this.formatData(item)),
      );
  }

  getHourlyWeather(cityName: string): Observable<WeatherInterface[]> {
    return this.http
      .get(
        `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&APPID=bc85bf8ec162713673bd2afd22dc5883&units=metric&lang=ru`
      )
      .pipe(
        map((data: any) => {
          console.log(data);
          const arr = data.list.map(item => this.formatData(item));
          return arr;
        })
      );
  }

  formatData(data: any): WeatherInterface {
    console.log(data);
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
    });
  }

  formatByDates(arr: WeatherInterface[]) {
    const newArr = arr.map(item => item.date).map(date => date.slice(0, -5).trim());
    console.log(newArr);
    const filteredArr = [... new Set(newArr)];
    console.log(filteredArr);
    return filteredArr;
  }

}
