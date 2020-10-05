import { Component, Input } from '@angular/core';
import { faBatteryHalf, faCloud, faFingerprint, faTemperatureLow, faTint, faWind } from '@fortawesome/free-solid-svg-icons';
import { GenerateIconService } from '../services/generate-icon.service';
import { WeatherInterface } from './../item/item.types';

@Component({
  selector: 'app-main-info',
  templateUrl: './main-info.component.html',
  styleUrls: ['./main-info.component.scss']
})
export class MainInfoComponent  {
  @Input() data: WeatherInterface;

  faCloud = faCloud;
  faTemp = faTemperatureLow;
  faFinger = faFingerprint;
  faTint = faTint;
  faBattery = faBatteryHalf;
  faWind = faWind;

  constructor( readonly iconService: GenerateIconService) { }

}
