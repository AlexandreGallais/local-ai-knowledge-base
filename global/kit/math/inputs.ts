// Types of the math kit.

export interface AlarmLimits {
  readonly highHighLimit: number;
  readonly highLimit: number;
  readonly lowLimit: number;
  readonly lowLowLimit: number;
}

export interface FixedTimestep {
  readonly maximumFrameTimeMs: number;
  readonly stepMs: number;
}

export interface NumberRange {
  readonly end: number;
  readonly start: number;
}

export interface Thresholds {
  readonly activateAt: number;
  readonly deactivateAt: number;
}

export interface Tolerance {
  readonly absolute: number;
  readonly relative?: number;
}
