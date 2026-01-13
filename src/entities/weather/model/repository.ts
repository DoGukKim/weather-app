import {
  CurrentTemperature,
  DailyTemperatureRange,
  HourlyTemperature,
} from './types';

export interface WeatherQueryOptions {
  latitude: number;
  longitude: number;
  unit?: 'celsius' | 'fahrenheit';
  timezone?: 'Asia/Seoul';
}

export interface HourlyQueryOptions extends WeatherQueryOptions {
  forecastDays?: number;
}

export interface WeatherRepository {
  getCurrentTemperature(
    options: WeatherQueryOptions,
  ): Promise<CurrentTemperature>;
  getDailyTemperatureRange(
    options: WeatherQueryOptions,
  ): Promise<DailyTemperatureRange>;
  getHourlyTemperature(options: HourlyQueryOptions): Promise<HourlyTemperature>;
}
