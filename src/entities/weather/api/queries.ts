import {
  useSuspenseQuery,
  UseSuspenseQueryOptions,
} from '@tanstack/react-query';

import { HourlyQueryOptions, WeatherQueryOptions } from '../model/repository';
import {
  CurrentTemperature,
  DailyTemperatureRange,
  HourlyTemperature,
} from '../model/types';

import { weatherKeys } from './queryKeys';
import { weatherRepository } from './weatherRepository';

type CurrentTemperatureQueryOptions = Omit<
  UseSuspenseQueryOptions<CurrentTemperature>,
  'queryKey' | 'queryFn'
>;

type DailyTemperatureRangeQueryOptions = Omit<
  UseSuspenseQueryOptions<DailyTemperatureRange>,
  'queryKey' | 'queryFn'
>;

type HourlyTemperatureQueryOptions = Omit<
  UseSuspenseQueryOptions<HourlyTemperature>,
  'queryKey' | 'queryFn'
>;

export function useCurrentTemperatureQuery(
  options: WeatherQueryOptions,
  queryOptions?: CurrentTemperatureQueryOptions,
) {
  return useSuspenseQuery({
    queryKey: weatherKeys.current(options),
    queryFn: () => weatherRepository.getCurrentTemperature(options),
    ...queryOptions,
  });
}

export function useDailyTemperatureRangeQuery(
  options: WeatherQueryOptions,
  queryOptions?: DailyTemperatureRangeQueryOptions,
) {
  return useSuspenseQuery({
    queryKey: weatherKeys.daily(options),
    queryFn: () => weatherRepository.getDailyTemperatureRange(options),
    ...queryOptions,
  });
}

export function useHourlyTemperatureQuery(
  options: HourlyQueryOptions,
  queryOptions?: HourlyTemperatureQueryOptions,
) {
  return useSuspenseQuery({
    queryKey: weatherKeys.hourly(options),
    queryFn: () => weatherRepository.getHourlyTemperature(options),
    ...queryOptions,
  });
}
