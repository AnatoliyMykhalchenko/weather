import { WeatherInterface } from './item.types';
import { Component } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { faBatteryHalf, faCloud, faFingerprint, faTemperatureLow, faTint } from "@fortawesome/free-solid-svg-icons";
import { Observable, Subject, throwError, of } from "rxjs";
import { catchError, shareReplay, tap } from "rxjs/operators";
import { GetWeatherService } from "../services/get-weather.service";
import { GenerateIconService } from "./../services/generate-icon.service";

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent {
  toggleInfo = false;

  errorSubject$ = new Subject<boolean>()
  weatherItem: Observable<any> = this.weatherService.getWeather();
  weatherArr: Observable<WeatherInterface[]> = this.weatherService.getHourlyWeather();

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
    this.weatherService.getHourlyWeather().subscribe(console.log);
  }

  search() {
    if (this.cityControl.value) {
      this.weatherItem = this.weatherService
      .getWeather(this.cityControl.value)
      .pipe(
        shareReplay(1),
        catchError(err => {
          this.errorSubject$.next(true);
          return of();
        }),
        tap(() => this.errorSubject$.next(false)),
        );
      this.weatherArr = this.weatherService.getHourlyWeather(this.cityControl.value);
    } else {
      this.weatherItem = this.weatherService.getWeather();
      this.weatherArr = this.weatherService.getHourlyWeather();
      this.errorSubject$.next(false);
    }
  }

  showInfo() {
    this.toggleInfo = !this.toggleInfo;
  }
}
