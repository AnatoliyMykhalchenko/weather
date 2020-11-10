import { Component, Output, EventEmitter, Input } from '@angular/core';
import { GetWeatherService } from '../services/get-weather.service';

@Component({
  selector: 'app-main-cities',
  templateUrl: './main-cities.component.html',
  styleUrls: ['./main-cities.component.scss'],
})
export class MainCitiesComponent {
  @Input() cityName: string;
  @Output() changeByToggle = new EventEmitter();
  cities = [
    'Киев',
    'Харьков',
    'Одесса',
    'Днепр',
    'Донецк',
    'Запорожье',
    'Львов',
    'Кривой Рог',
    'Николаев',
    'Мариуполь',
  ];

  constructor(readonly weatherService: GetWeatherService) {}
}
