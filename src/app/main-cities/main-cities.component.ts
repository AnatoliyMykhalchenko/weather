import { Component, Output, EventEmitter } from '@angular/core';
import { GetWeatherService } from '../services/get-weather.service';

@Component({
  selector: 'app-main-cities',
  templateUrl: './main-cities.component.html',
  styleUrls: ['./main-cities.component.scss']
})
export class MainCitiesComponent {
  @Output() changeByToggle = new EventEmitter();
  cities = ['Киев', 'Харьков', 'Одесса', 'Днепр', 'Донецк', 'Запорожье', 'Львов', 'Кривой Рог', 'Николаев', 'Мариуполь', 'Луганск', 'Винница', 'Херсон', 'Полтава'];

  constructor(readonly weatherService: GetWeatherService) {
  }

}
