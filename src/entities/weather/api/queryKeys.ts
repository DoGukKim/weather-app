import { QueryKeyFactory } from '@/shared/lib/reactQuery';

import { HourlyQueryOptions, WeatherQueryOptions } from '../model/repository';

const BASE_KEY = ['weather'] as const;
const FORECAST_KEY = [...BASE_KEY, 'forecast'] as const;

export const weatherKeys = {
  all: BASE_KEY,
  forecasts: () => FORECAST_KEY,
  current: ({ latitude, longitude, unit }: WeatherQueryOptions) =>
    [...FORECAST_KEY, 'current', latitude, longitude, unit] as const,
  daily: ({ latitude, longitude, unit }: WeatherQueryOptions) =>
    [...FORECAST_KEY, 'daily', latitude, longitude, unit] as const,
  hourly: ({ latitude, longitude, timezone, unit }: HourlyQueryOptions) =>
    [...FORECAST_KEY, 'hourly', latitude, longitude, timezone, unit] as const,
} as const satisfies QueryKeyFactory;
