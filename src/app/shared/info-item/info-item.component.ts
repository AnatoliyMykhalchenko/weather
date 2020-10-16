import { Component, Input } from '@angular/core';
import { faCloud, faTemperatureLow, faFingerprint, faTint, faBatteryHalf, faWind } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-info-item',
  templateUrl: './info-item.component.html',
  styleUrls: ['./info-item.component.scss']
})
export class InfoItemComponent {
  @Input() icon?: any;
  @Input() value?: string;

  faCloud = faCloud;
  faTemp = faTemperatureLow;
  faFinger = faFingerprint;
  faTint = faTint;
  faBattery = faBatteryHalf;
  faWind = faWind;

  constructor() {}

}
