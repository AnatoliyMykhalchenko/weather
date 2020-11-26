import { Component, Input } from '@angular/core';
import { icons } from '../shared/icons';
import { WeatherInterface } from './../item/item.types';

@Component({
  selector: 'app-hourly-weather',
  templateUrl: './hourly-weather.component.html',
  styleUrls: ['./hourly-weather.component.scss'],
})
export class HourlyWeatherComponent {
  @Input() data: WeatherInterface[];
  @Input() dates: string[];

  icons = icons;

  constructor() {}

  filterByDate(date: string, arr: WeatherInterface[]) {
    return arr.filter((item) => item.date.includes(date));
  }
}
