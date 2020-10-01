import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { faCoffee, faCloud, faTemperatureLow, faFingerprint, faTint, faBatteryHalf } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { GetWeatherService } from '../services/get-weather.service';
import { GenerateIconService } from './../services/generate-icon.service';


@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent {
  private weatherItem = this.weatherService.getWeather();

  faCloud = faCloud;
  faTemp = faTemperatureLow;
  faFinger = faFingerprint;
  faTint = faTint;
  faBattery = faBatteryHalf;

  cityControl = new FormControl('');

  cityForm = new FormGroup({
    cityControl: this.cityControl,
  });

  constructor(private weatherService: GetWeatherService, public iconService: GenerateIconService) {
  }

  search() {
   this.weatherItem = this.weatherService.getWeather(this.cityControl.value);
  }

}
