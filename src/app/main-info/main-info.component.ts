import { Component, Input, Inject } from '@angular/core';
import { icons } from '../shared/icons';
import { WeatherInterface } from './../item/item.types';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-main-info',
  templateUrl: './main-info.component.html',
  styleUrls: ['./main-info.component.scss'],
})
export class MainInfoComponent {
  @Input() data: WeatherInterface;

  icons = icons;

  constructor() {}
}
