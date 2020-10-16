import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { faBatteryHalf, faCloud, faFingerprint, faTemperatureLow, faTint } from '@fortawesome/free-solid-svg-icons';
import { Observable, of, Subject } from 'rxjs';
import { catchError, shareReplay, tap } from 'rxjs/operators';
import { GetWeatherService } from '../services/get-weather.service';
import { GenerateIconService } from './../services/generate-icon.service';
import { WeatherInterface, ResolvedWeatherData } from './item.types';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  animations: [
    trigger('fade', [
      state('void', style({ opacity: 1, transform: 'translateX(-120%)' })),
      transition(':enter', [
        animate('.2s .4s'),
      ]),
      transition(':leave', [
        animate('.4s', style({ opacity: 0, marginBottom: '-200px' })),
      ])
    ])

  ]
})
export class ItemComponent {
  toggleInfo = false;

  errorSubject$ = new Subject<boolean>();

  data$: Observable<ResolvedWeatherData> = this.weatherService.getResolvedData();

  faCloud = faCloud;
  faTemp = faTemperatureLow;
  faFinger = faFingerprint;
  faTint = faTint;
  faBattery = faBatteryHalf;

  cityControl = new FormControl('');

  cityForm = new FormGroup({
    cityControl: this.cityControl,
  });

  constructor(
    private weatherService: GetWeatherService,
    public iconService: GenerateIconService
  ) {
    this.weatherService.getResolvedData().subscribe(console.log);
  }

  search() {
    if (this.cityControl.value) {
      this.data$ = this.weatherService
      .getResolvedData(this.cityControl.value)
      .pipe(
        shareReplay(1),
        catchError(err => {
          this.errorSubject$.next(true);
          return of();
        }),
        tap(() => this.errorSubject$.next(false)),
        );
      this.weatherService.getResolvedData(this.cityControl.value).subscribe(console.log);
    } else {
      this.data$ = this.weatherService.getResolvedData();
      this.errorSubject$.next(false);
    }
  }

  showInfo() {
    this.toggleInfo = !this.toggleInfo;
  }
}
