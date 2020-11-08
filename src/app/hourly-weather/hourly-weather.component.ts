import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input } from '@angular/core';
import { GenerateIconService } from '../services/generate-icon.service';
import { icons } from '../shared/icons';
import { WeatherInterface } from './../item/item.types';

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

  icons = icons;

  constructor(
    public iconService: GenerateIconService
  ) { }

  filterByDate(date: string, arr: WeatherInterface[]) {
    return arr.filter(item => item.date.includes(date));
  }
}



// import {MatTabChangeEvent, MatTabGroup} from '@angular/material';

// @Directive({
//   selector: '[mat-tab-scroll-fix]'
// })
// export class MatTabScrollFixDirective implements AfterViewInit {

//   constructor(private matTabGroup: MatTabGroup) {

//   }

//   private scrollPosition: number;
//   private tabChanging: boolean;

//   ngAfterViewInit(): void {
//     const scrollHandler = (event) => {
//       if (this.tabChanging) {
//         document.documentElement.scrollTop = this.scrollPosition;
//       }
//       this.scrollPosition = document.documentElement.scrollTop;
//     };

//     window.addEventListener('scroll', scrollHandler);

//     this.matTabGroup.selectedTabChange.subscribe((tabChangeEvent: MatTabChangeEvent) => {
//       this.tabChanging = false;
//       document.documentElement.scrollTop = this.scrollPosition;
//     });

//     this.matTabGroup.selectedIndexChange.subscribe((index: number) => {
//       this.tabChanging = true;
//     });
//   }
// }
