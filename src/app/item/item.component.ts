import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { faCoffee, faCloud } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { GetWeatherService } from '../services/get-weather.service';
import { GenerateIconService } from './../services/generate-icon.service';


@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  private weatherItem = this.weatherService.getWeather();
  private iconUrl: Observable<string> = this.weatherItem.pipe(
    switchMap(weatherItem => {
    console.log(weatherItem.weather[0].icon);
    console.log(this.iconService.getIconUrl(weatherItem.weather[0].icon))
    return this.iconService.getIconUrl(weatherItem.weather[0].icon)
    }),
  );
  faCloud = faCloud;

  cityControl = new FormControl('');

  cityForm = new FormGroup({
    cityControl: this.cityControl,
  });

  constructor(private weatherService: GetWeatherService, public iconService: GenerateIconService) {
    // this.weatherItem.subscribe(console.log);
  }

  ngOnInit() {
    // this.iconUrl.subscribe(console.log);
  }

  search() {
   this.weatherItem = this.weatherService.getWeather(this.cityControl.value);
  }

}
