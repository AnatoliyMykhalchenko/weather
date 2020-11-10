import { Component, Input, OnInit } from '@angular/core';
import { WeatherInterface } from 'src/app/item/item.types';
import { GenerateIconService } from 'src/app/services/generate-icon.service';
import { icons } from '../icons';

@Component({
  selector: 'app-hourly-weather-item',
  templateUrl: './hourly-weather-item.component.html',
  styleUrls: ['./hourly-weather-item.component.scss'],
})
export class HourlyWeatherItemComponent implements OnInit {
  @Input() hourlyItem;

  icons = icons;

  constructor(public iconService: GenerateIconService) {}

  ngOnInit(): void {}
}
