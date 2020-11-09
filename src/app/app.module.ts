import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppComponent } from './app.component';
import { HourlyWeatherComponent } from './hourly-weather/hourly-weather.component';
import { MomentPipe } from './hourly-weather/moment.pipe';
import { ItemComponent } from './item/item.component';
import { MainCitiesComponent } from './main-cities/main-cities.component';
import { MainInfoComponent } from './main-info/main-info.component';
import { InfoItemComponent } from './shared/info-item/info-item.component';
import { CityInputComponent } from './city-input/city-input.component';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    ItemComponent,
    HourlyWeatherComponent,
    MainInfoComponent,
    MomentPipe,
    InfoItemComponent,
    MainCitiesComponent,
    CityInputComponent,
    SpinnerComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    CommonModule,
    MatTabsModule,
    MatButtonToggleModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
