import { WeatherRepository } from '../model/repository';

import {
  mapToCurrentTemperature,
  mapToDailyTemperatureRange,
  mapToHourlyTemperature,
} from './mappers';
import {
  getCurrentTemperature,
  getDailyTemperatureRange,
  getHourlyTemperature,
} from './requests';

export const openMeteoRepository: WeatherRepository = {
  async getCurrentTemperature({ latitude, longitude, unit, timezone }) {
    const dto = await getCurrentTemperature({
      latitude,
      longitude,
      unit,
      timezone,
    });

    return mapToCurrentTemperature(dto);
  },
  async getDailyTemperatureRange({ latitude, longitude, unit, timezone }) {
    const dto = await getDailyTemperatureRange({
      latitude,
      longitude,
      unit,
      timezone,
    });

    return mapToDailyTemperatureRange(dto);
  },
  async getHourlyTemperature({
    latitude,
    longitude,
    unit,
    timezone,
    forecastDays,
  }) {
    const dto = await getHourlyTemperature({
      latitude,
      longitude,
      unit,
      timezone,
      forecastDays,
    });

    return mapToHourlyTemperature(dto);
  },
};
