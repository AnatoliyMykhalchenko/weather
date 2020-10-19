import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input } from '@angular/core';
import { GenerateIconService } from '../services/generate-icon.service';
import { icons } from '../shared/icons';
import { WeatherInterface } from './../item/item.types';

@Component({
  selector: 'app-hourly-weather',
  templateUrl: './hourly-weather.component.html',
  styleUrls: ['./hourly-weather.component.scss'],
  animations: [
    trigger('fade', [
      state('void', style({ opacity: 0 })),
      transition(':enter', [
        animate(1000),
      ]),
    ])

  ]
})
export class HourlyWeatherComponent {
  @Input() data: WeatherInterface[];
  @Input() dates: string[];

  icons = icons;

  constructor(
    public iconService: GenerateIconService
  ) { }

  filterByDate(date: string, arr: WeatherInterface[]) {
    return arr.filter(item => item.date.includes(date));
  }
}
