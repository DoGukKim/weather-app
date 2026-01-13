import { z } from 'zod';

const Temperature = z.number();

const WeatherCode = z
  .number()
  .int()
  .min(0)
  .max(99)
  .describe('WMO weather code');

const TemperatureUnit = z.enum(['°C', '°F']);

export const CurrentTemperatureSchema = z.object({
  temperature_2m: Temperature,
  weather_code: WeatherCode,
});

export const CurrentUnitsSchema = z.object({
  temperature_2m: TemperatureUnit,
});

export const CurrentTemperatureResponseSchema = z.object({
  current: CurrentTemperatureSchema,
  current_units: CurrentUnitsSchema,
});

export const DailyTemperatureRangeSchema = z.object({
  temperature_2m_min: z.array(Temperature),
  temperature_2m_max: z.array(Temperature),
  weather_code: z.array(WeatherCode),
});

export const DailyUnitsSchema = z.object({
  temperature_2m_min: TemperatureUnit,
  temperature_2m_max: TemperatureUnit,
});

export const DailyTemperatureRangeResponseSchema = z.object({
  daily: DailyTemperatureRangeSchema,
  daily_units: DailyUnitsSchema,
});

export const HourlyTemperatureSchema = z.object({
  temperature_2m: z.array(Temperature),
  time: z.array(z.string()),
  weather_code: z.array(WeatherCode),
});

export const HourlyUnitsSchema = z.object({
  temperature_2m: TemperatureUnit,
  weather_code: WeatherCode,
});

export const HourlyTemperatureResponseSchema = z.object({
  hourly: HourlyTemperatureSchema,
  hourly_units: HourlyUnitsSchema,
});

export type CurrentTemperatureResponse = z.infer<
  typeof CurrentTemperatureResponseSchema
>;
export type DailyTemperatureRangeResponse = z.infer<
  typeof DailyTemperatureRangeResponseSchema
>;
export type HourlyTemperatureResponse = z.infer<
  typeof HourlyTemperatureResponseSchema
>;
