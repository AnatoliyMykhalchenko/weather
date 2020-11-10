import { Component } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { catchError, map, shareReplay, tap } from 'rxjs/operators';
import { AlertService } from '../services/alert/alert.service';
import { GetWeatherService } from '../services/get-weather.service';
import { LoggerService } from '../services/logger/logger.service';
import { GenerateIconService } from './../services/generate-icon.service';
import { ResolvedWeatherData } from './item.types';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent {
  errorSubject$ = new BehaviorSubject<boolean>(false);
  loadingSubject$ = new BehaviorSubject<boolean>(true);

  data$: Observable<ResolvedWeatherData> = this.weatherService
    .getResolvedData()
    .pipe(tap(() => this.loadingSubject$.next(false)));

  isSpinnerShown$: Observable<boolean> = combineLatest([this.loadingSubject$, this.errorSubject$]).pipe(
    map(([loading, error]) => loading && !error),
  );

  constructor(
    private weatherService: GetWeatherService,
    public iconService: GenerateIconService,
    private logger: LoggerService,
    private alertService: AlertService,
  ) {
    weatherService.getResolvedData().subscribe(console.log);
  }

  search(city?: string) {
    console.log(city);
    this.loadingSubject$.next(true);
    if (city) {
      this.data$ = this.weatherService.getResolvedData(city).pipe(
        shareReplay(1),
        catchError((err) => {
          const caption = `Неправильное название города. Не существует такого города - ${city}. Проверьте написание.`;
          this.errorSubject$.next(true);
          this.logger.consoleMessage(err.error.message, '', 'red');
          this.alertService.show({
            title: 'Ошибка',
            caption,
            button: 'Хорошо',
          });
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
