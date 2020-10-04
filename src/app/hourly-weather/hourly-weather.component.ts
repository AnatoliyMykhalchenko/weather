import { WeatherInterface } from './../item/item.types';
import { Component, OnInit, Input } from '@angular/core';
import { faCloud, faTemperatureLow } from '@fortawesome/free-solid-svg-icons';
import { GenerateIconService } from '../services/generate-icon.service';

@Component({
  selector: 'app-hourly-weather',
  templateUrl: './hourly-weather.component.html',
  styleUrls: ['./hourly-weather.component.scss']
})
export class HourlyWeatherComponent implements OnInit {
  @Input() data: WeatherInterface[];

  faCloud = faCloud;
  faTemp = faTemperatureLow;

  constructor(
    public iconService: GenerateIconService
  ) { }

  ngOnInit() {
  }

}
