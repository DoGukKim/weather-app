import { z } from 'zod';

const Temperature = z.number();

const Temperatures = z.array(Temperature);

const WeatherCode = z
  .number()
  .int()
  .min(0)
  .max(99)
  .describe('WMO weather code');

const WeatherCodes = z.array(WeatherCode);

const ISO8601Timestamp = z.string();

const TemperatureUnit = z.enum(['°C', '°F']);

export const CurrentTemperatureSchema = z.object({
  temperature_2m: Temperature,
  weather_code: WeatherCode.min(1),
});

export const DailyTemperatureRangeSchema = z.object({
  temperature_2m_min: Temperatures.min(1),
  temperature_2m_max: Temperatures.min(1),
  weather_code: WeatherCodes.min(1),
});

export const HourlyTemperatureSchema = z.object({
  temperature_2m: Temperatures.min(1),
  time: z.array(ISO8601Timestamp).min(1),
  weather_code: WeatherCodes.min(1),
});

export const CurrentUnitsSchema = z.object({
  temperature_2m: TemperatureUnit,
});

export const DailyUnitsSchema = z.object({
  temperature_2m_min: TemperatureUnit,
  temperature_2m_max: TemperatureUnit,
});

export const HourlyUnitsSchema = z.object({
  temperature_2m: TemperatureUnit,
});

export const WeatherResponseSchema = z
  .object({
    current: CurrentTemperatureSchema,
    daily: DailyTemperatureRangeSchema,
    hourly: HourlyTemperatureSchema,
    current_units: CurrentUnitsSchema,
    daily_units: DailyUnitsSchema,
    hourly_units: HourlyUnitsSchema,
  })
  .describe('Open-Meteo weather API response');

export type WeatherResponse = z.infer<typeof WeatherResponseSchema>;
