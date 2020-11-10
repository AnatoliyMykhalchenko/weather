import { HttpClient } from '@angular/common/http';
import { async, inject, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GetWeatherService } from './get-weather.service';
import { monitorEventLoopDelay } from 'perf_hooks';
import { ResolvedWeatherData } from '../item/item.types';

const mockData: ResolvedWeatherData = {
  currentWeather: {
    clouds: 1,
    date: '01.01.2020 00:00',
    description: 'переменная облачность',
    feelsLike: 2,
    humidity: 3,
    icon: 'aaa',
    name: 'Киев',
    pressure: 1000,
    temp: 10,
    wind: 5,
  },
  datesArr: ['10.01.2111', '10.01.2111', '10.01.2111', '10.01.2111', '10.01.2111'],
  hourlyWeather: [
    {
      clouds: 47,
      date: '05.11.2020 15:00',
      description: 'переменная облачность',
      feelsLike: 4.76,
      humidity: 85,
      icon: '03n',
      name: undefined,
      pressure: 1028,
      temp: 7.9,
      wind: 3.04,
    },
    {
      clouds: 47,
      date: '05.11.2020 15:00',
      description: 'переменная облачность',
      feelsLike: 4.76,
      humidity: 85,
      icon: '03n',
      name: undefined,
      pressure: 1028,
      temp: 7.9,
      wind: 3.04,
    },
    {
      clouds: 47,
      date: '05.11.2020 15:00',
      description: 'переменная облачность',
      feelsLike: 4.76,
      humidity: 85,
      icon: '03n',
      name: undefined,
      pressure: 1028,
      temp: 7.9,
      wind: 3.04,
    },
  ],
};

describe('GetWeatherService', () => {
  let service;
  let httpTestingController: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpClient],
    });
    httpTestingController = TestBed.get(HttpTestingController);
  }));

  beforeEach(inject([GetWeatherService], (s) => {
    service = s;
  }));

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('GetResolvedData()', () => {
    it('should return mockData', () => {
      service.getResolvedData('Киев').subscribe((data) => expect(data).toEqual(mockData));
      const req = httpTestingController.expectOne(service.getWeatherUrl('Киев'));
      expect(req.request.method).toEqual('GET');
      const req2 = httpTestingController.expectOne(service.getForecastUrl('Киев'));
      expect(req2.request.method).toEqual('GET');
      req.flush(mockData.currentWeather);
    });
  });

  describe('GetResolvedData()', () => {
    it('should return mockData', () => {
      service.getResolvedData('Киев').subscribe((data) => expect(data).toEqual(mockData));
      const req = httpTestingController.expectOne(service.getWeatherUrl('Киев'));
      expect(req.request.method).toEqual('GET');
      const req2 = httpTestingController.expectOne(service.getForecastUrl('Киев'));
      expect(req2.request.method).toEqual('GET');
    });
  });

  describe('getWeather()', () => {
    it('should return currentWeather', () => {
      service.getWeather('Киев').subscribe((data) => expect(data).toEqual(mockData.currentWeather));
      const req = httpTestingController.expectOne(service.getWeatherUrl('Киев'));
      expect(req.request.method).toEqual('GET');
    });
  });

  describe('getHourlyWeather()', () => {
    it('should return hourlyWeather', () => {
      service.getHourlyWeather('Киев').subscribe((data) => expect(data).toEqual(mockData.hourlyWeather));
      const req = httpTestingController.expectOne(service.getForecastUrl('Киев'));
      expect(req.request.method).toEqual('GET');
    });
  });
});
