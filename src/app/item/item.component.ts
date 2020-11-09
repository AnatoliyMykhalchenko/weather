import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { faBatteryHalf, faCloud, faFingerprint, faTemperatureLow, faTint } from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject, combineLatest, Observable, of, Subject } from 'rxjs';
import { catchError, map, shareReplay, tap } from 'rxjs/operators';
import { GetWeatherService } from '../services/get-weather.service';
import { GenerateIconService } from './../services/generate-icon.service';
import { ResolvedWeatherData } from './item.types';
import { LoggerService } from '../services/logger/logger.service';
import { AlertService } from '../services/alert/alert.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent {
  errorSubject$ = new BehaviorSubject<boolean>(false);
  loadingSubject$ = new BehaviorSubject<boolean>(true);

  data$: Observable<ResolvedWeatherData> = this.weatherService.getResolvedData().pipe(
    tap(() => this.loadingSubject$.next(false))
  );
  isSpinnerShown$: Observable<boolean> = combineLatest([
    this.loadingSubject$,
    this.errorSubject$,
  ]).pipe(
    map(([loading, error]) => loading && !error)
    );

  faCloud = faCloud;
  faTemp = faTemperatureLow;
  faFinger = faFingerprint;
  faTint = faTint;
  faBattery = faBatteryHalf;


  constructor(
    private weatherService: GetWeatherService,
    public iconService: GenerateIconService,
    private logger: LoggerService,
    private alertService: AlertService,
  ) {
    weatherService.getResolvedData().subscribe(console.log);
  }

  search(city?: string) {
    this.loadingSubject$.next(true);
    if (city) {
      this.data$ = this.weatherService
        .getResolvedData(city)
        .pipe(
          shareReplay(1),
          catchError(err => {
            this.errorSubject$.next(true);
            this.logger.consoleMessage(err.error.message, '', 'red');
            this.alertService.show();
            this.search();
            return of();
          }),
          tap(() => {
            this.errorSubject$.next(false);
            this.loadingSubject$.next(false);
          }),
        );
    } else {
      this.data$ = this.weatherService.getResolvedData();
      this.errorSubject$.next(false);
      this.loadingSubject$.next(false);
    }
  }

  changeWeatherByToggle(event) {
    this.loadingSubject$.next(true);
    this.search(event);
  }
}
