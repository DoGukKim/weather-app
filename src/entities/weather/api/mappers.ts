import {
  CurrentTemperature,
  DailyTemperatureRange,
  HourlyTemperature,
} from '../model/types';

import {
  CurrentTemperatureResponse,
  DailyTemperatureRangeResponse,
  HourlyTemperatureResponse,
} from './schemas';

export function mapToCurrentTemperature(
  dto: CurrentTemperatureResponse,
): CurrentTemperature {
  return {
    temp: dto.current.temperature_2m,
    unit: dto.current_units.temperature_2m,
    weatherCode: dto.current.weather_code,
  };
}

export function mapToDailyTemperatureRange(
  dto: DailyTemperatureRangeResponse,
): DailyTemperatureRange {
  return {
    maxTemp: dto.daily.temperature_2m_max[0],
    minTemp: dto.daily.temperature_2m_min[0],
    unit: dto.daily_units.temperature_2m_max,
    weatherCode: dto.daily.weather_code[0],
  };
}

export function mapToHourlyTemperature(
  dto: HourlyTemperatureResponse,
): HourlyTemperature {
  return {
    temps: dto.hourly.temperature_2m,
    times: dto.hourly.time,
    unit: dto.hourly_units.temperature_2m,
    weatherCode: dto.hourly.weather_code,
  };
}
