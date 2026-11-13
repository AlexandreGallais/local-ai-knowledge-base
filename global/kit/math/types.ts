// Types of the math kit.

export type AngleUnit = 'deg' | 'rad' | 'turn';

export interface DurationParts {
  readonly hours: number;
  readonly milliseconds: number;
  readonly minutes: number;
  readonly seconds: number;
  readonly sign: -1 | 1;
}

export interface FixedTimestepResult {
  readonly accumulatorMs: number;
  readonly alpha: number;
  readonly stepCount: number;
}

export type LimitZone = 'high' | 'highHigh' | 'low' | 'lowLow' | 'normal' | 'unknown';

export type RotationSpeedUnit = 'degPerS' | 'radPerS' | 'rpm' | 'turnPerS';

export interface RunningStatistics {
  readonly count: number;
  readonly mean: number;
  readonly sumOfSquaredDeviations: number;
}

export type TemperatureUnit = 'degC' | 'degF' | 'k';
