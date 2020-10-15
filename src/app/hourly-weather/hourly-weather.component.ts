import { WeatherInterface } from './../item/item.types';
import { Component, Input } from '@angular/core';
import { faCloud, faTemperatureLow, faFingerprint } from '@fortawesome/free-solid-svg-icons';
import { GenerateIconService } from '../services/generate-icon.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

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

  faCloud = faCloud;
  faTemp = faTemperatureLow;
  faFinger = faFingerprint;

  constructor(
    public iconService: GenerateIconService
  ) { }

  filterByDate(date: string, arr: WeatherInterface[]) {
    return arr.filter(item => item.date.includes(date));
  }
}
