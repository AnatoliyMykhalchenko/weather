import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GetWeatherService } from '../services/get-weather.service';

import { MainCitiesComponent } from './main-cities.component';

describe('MainCitiesComponent', () => {
  let component: MainCitiesComponent;
  let fixture: ComponentFixture<MainCitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainCitiesComponent],
      imports: [HttpClientTestingModule],

      providers: [GetWeatherService, HttpClient],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainCitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
