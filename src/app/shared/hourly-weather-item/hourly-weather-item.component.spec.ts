import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HourlyWeatherItemComponent } from './hourly-weather-item.component';

describe('HourlyWeatherItemComponent', () => {
  let component: HourlyWeatherItemComponent;
  let fixture: ComponentFixture<HourlyWeatherItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HourlyWeatherItemComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HourlyWeatherItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
