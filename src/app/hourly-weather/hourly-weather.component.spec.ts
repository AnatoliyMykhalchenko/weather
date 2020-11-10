import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GenerateIconService } from '../services/generate-icon.service';

import { HourlyWeatherComponent } from './hourly-weather.component';

describe('HourlyWeatherComponent', () => {
  let component: HourlyWeatherComponent;
  let fixture: ComponentFixture<HourlyWeatherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HourlyWeatherComponent],
      imports: [HttpClientTestingModule, BrowserAnimationsModule],
      providers: [GenerateIconService, HttpClient],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HourlyWeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
