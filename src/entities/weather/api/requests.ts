import { API_CLIENTS } from '@/shared/api/clients';
import { clientEnv } from '@/shared/config';
import { formatZodError } from '@/shared/lib/utils';

import { HourlyQueryOptions, WeatherQueryOptions } from '../model/repository';

import {
  CurrentTemperatureResponse,
  CurrentTemperatureResponseSchema,
  DailyTemperatureRangeResponse,
  DailyTemperatureRangeResponseSchema,
  HourlyTemperatureResponse,
  HourlyTemperatureResponseSchema,
} from './schemas';

const OPEN_METEO_FIELDS = {
  current: 'temperature_2m,weather_code',
  daily: 'temperature_2m_max,temperature_2m_min,weather_code',
  hourly: 'temperature_2m,weather_code,time',
} as const;

const DEFAULT_OPTIONS = {
  unit: 'celsius',
  timezone: 'Asia/Seoul',
  forecastDays: 1,
} as const;

export async function getCurrentTemperature({
  latitude,
  longitude,
  unit = DEFAULT_OPTIONS.unit,
  timezone = DEFAULT_OPTIONS.timezone,
}: WeatherQueryOptions): Promise<CurrentTemperatureResponse> {
  const response = await API_CLIENTS.openMeteo
    .get(clientEnv.NEXT_PUBLIC_OPEN_METEO_ENDPOINT_FORECAST, {
      searchParams: {
        latitude,
        longitude,
        current: OPEN_METEO_FIELDS.current,
        temperature_unit: unit,
        timezone,
      },
    })
    .json();

  const parsed = CurrentTemperatureResponseSchema.safeParse(response);

  if (!parsed.success) {
    const errorDetails = formatZodError(parsed.error);
    console.error(
      `❌ getCurrentTemperature API response validation failed:\n${errorDetails}`,
    );
    throw new Error('Invalid getCurrentTemperature API response');
  }

  return parsed.data;
}

export async function getDailyTemperatureRange({
  latitude,
  longitude,
  unit = DEFAULT_OPTIONS.unit,
  timezone = DEFAULT_OPTIONS.timezone,
}: WeatherQueryOptions): Promise<DailyTemperatureRangeResponse> {
  const response = await API_CLIENTS.openMeteo
    .get(clientEnv.NEXT_PUBLIC_OPEN_METEO_ENDPOINT_FORECAST, {
      searchParams: {
        latitude,
        longitude,
        daily: OPEN_METEO_FIELDS.daily,
        temperature_unit: unit,
        timezone,
      },
    })
    .json();

  const parsed = DailyTemperatureRangeResponseSchema.safeParse(response);

  if (!parsed.success) {
    const errorDetails = formatZodError(parsed.error);
    console.error(
      `❌ getDailyTemperatureRange API response validation failed:\n${errorDetails}`,
    );
    throw new Error('Invalid getDailyTemperatureRange API response');
  }

  return parsed.data;
}

export async function getHourlyTemperature({
  latitude,
  longitude,
  unit = DEFAULT_OPTIONS.unit,
  timezone = DEFAULT_OPTIONS.timezone,
  forecastDays = DEFAULT_OPTIONS.forecastDays,
}: HourlyQueryOptions): Promise<HourlyTemperatureResponse> {
  const response = await API_CLIENTS.openMeteo
    .get(clientEnv.NEXT_PUBLIC_OPEN_METEO_ENDPOINT_FORECAST, {
      searchParams: {
        latitude,
        longitude,
        hourly: OPEN_METEO_FIELDS.hourly,
        temperature_unit: unit,
        timezone,
        forecast_days: forecastDays,
      },
    })
    .json();

  const parsed = HourlyTemperatureResponseSchema.safeParse(response);

  if (!parsed.success) {
    const errorDetails = formatZodError(parsed.error);
    console.error(
      `❌ getHourlyTemperature API response validation failed:\n${errorDetails}`,
    );
    throw new Error('Invalid getHourlyTemperature API response');
  }

  return parsed.data;
}
