import {
  CurrentTemperature,
  DailyTemperatureRange,
  HourlyTemperature,
} from '../model/types';

import { WeatherResponse } from './schemas';

export function mapToCurrentTemperature(
  dto: WeatherResponse,
): CurrentTemperature {
  const { current, current_units } = dto;

  return {
    temp: current.temperature_2m,
    unit: current_units.temperature_2m,
    weatherCode: current.weather_code,
  };
}
export function mapToDailyTemperatureRange(
  dto: WeatherResponse,
): DailyTemperatureRange {
  const { daily, daily_units } = dto;

  return {
    minTemp: daily.temperature_2m_min[0],
    maxTemp: daily.temperature_2m_max[0],
    unit: daily_units.temperature_2m_max,
    weatherCode: daily.weather_code[0],
  };
}
export function mapToHourlyTemperature(
  dto: WeatherResponse,
): HourlyTemperature {
  const { hourly, hourly_units } = dto;

  return {
    temps: hourly.temperature_2m,
    times: hourly.time,
    unit: hourly_units.temperature_2m,
    weatherCode: hourly.weather_code[0],
  };
}
