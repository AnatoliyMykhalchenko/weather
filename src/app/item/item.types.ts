export interface WeatherInterface {
  clouds: number;
  description: string;
  feelsLike: number;
  humidity: number;
  icon: string;
  name?: string;
  pressure: number;
  temp: number;
  wind: number;
  date?: any;
  dayName?: string;
}

export interface ResolvedWeatherData {
  currentWeather: WeatherInterface;
  hourlyWeather: WeatherInterface[];
  datesArr?: string[];
}
