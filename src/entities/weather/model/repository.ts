import {
  CurrentTemperature,
  DailyTemperatureRange,
  HourlyTemperature,
} from './types';

export interface WeatherRepository {
  getCurrentTemperature(lat: number, lon: number): Promise<CurrentTemperature>;
  getDailyTemperatureRange(
    lat: number,
    lon: number,
  ): Promise<DailyTemperatureRange>;
  getHourlyTemperature(lat: number, lon: number): Promise<HourlyTemperature>;
}
