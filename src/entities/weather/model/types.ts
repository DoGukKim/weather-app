export type TemperatureUnit = '°C' | '°F';

export interface CurrentTemperature {
  temp: number;
  unit: TemperatureUnit;
  weatherCode: number;
}

export interface DailyTemperatureRange {
  minTemp: number;
  maxTemp: number;
  unit: TemperatureUnit;
  weatherCode: number;
}

export interface HourlyTemperature {
  temps: number[];
  times: string[];
  unit: TemperatureUnit;
  weatherCode: number[];
}
