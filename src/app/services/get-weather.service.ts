import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root',
})
export class GetWeatherService {
  constructor(private readonly http: HttpClient) {}

  getWeather(cityName: string = 'Киев'): Observable<any> {
    return this.http.get(
      `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=bc85bf8ec162713673bd2afd22dc5883&units=metric&lang=ru`
    );
  }
}
