// A reusable synoptic symbol, as docs/synoptics/symbol-component.md describes: a pure function
// turns the inputs into data attributes, one state word and one accessible name. The styles pick
// the fill and the badge from the data attributes; one clock per view makes the badges flash.
export type PositionState = 'open' | 'closed' | 'opening' | 'closing' | 'intermediate' | 'unknown';
export type AlarmPriority = 'none' | 'caution' | 'warning' | 'alarm' | 'emergency';
export type AlarmState = 'normal' | 'unacknowledged' | 'acknowledged';

export interface ValveSymbolInputs {
  readonly tagName: string;
  readonly positionState: PositionState;
  readonly actualPositionPercent?: number;
  readonly alarmPriority: AlarmPriority;
  readonly alarmState: AlarmState;
  readonly isOutOfService: boolean;
}

export interface SymbolView {
  readonly attributes: Readonly<Record<string, string>>;
  readonly stateText: string;
  readonly badgeLetter: string;
  readonly isBadgeFlashing: boolean;
  readonly accessibleName: string;
}

const POSITION_TEXT: Readonly<Record<PositionState, string>> = {
  open: 'OPEN',
  closed: 'CLOSED',
  opening: 'OPENING',
  closing: 'CLOSING',
  intermediate: 'PARTIAL',
  unknown: '?',
};
const BADGE_LETTER: Readonly<Record<AlarmPriority, string>> = {
  none: '',
  caution: 'C',
  warning: 'W',
  alarm: 'A',
  emergency: 'E',
};

function stateTextOf(inputs: ValveSymbolInputs): string {
  if (inputs.positionState === 'intermediate' && inputs.actualPositionPercent !== undefined) {
    return `${String(Math.round(inputs.actualPositionPercent))} %`;
  }
  return POSITION_TEXT[inputs.positionState];
}

export function toValveView(inputs: ValveSymbolInputs): SymbolView {
  const stateText = stateTextOf(inputs);
  const hasAlert = inputs.alarmPriority !== 'none';
  const alarmText = hasAlert ? `, ${inputs.alarmPriority} ${inputs.alarmState}` : '';

  return {
    attributes: {
      'data-position': inputs.positionState,
      'data-alarm-priority': inputs.alarmPriority,
      'data-alarm-state': inputs.alarmState,
      'data-out-of-service': String(inputs.isOutOfService),
    },
    stateText,
    badgeLetter: BADGE_LETTER[inputs.alarmPriority],
    isBadgeFlashing: hasAlert && inputs.alarmState === 'unacknowledged',
    accessibleName: `Valve ${inputs.tagName}, ${stateText}${alarmText}`,
  };
}

// One clock per view: it sets data-flash-phase on the view root, so that every badge flashes in
// phase, at 1 Hz by default. Call the returned function when the view closes.
export function startFlashClock(root: HTMLElement, periodMs = 1000): () => void {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    root.dataset['flashPhase'] = 'on';
    return () => undefined;
  }
  let isOn = true;
  const timer = window.setInterval(() => {
    isOn = !isOn;
    root.dataset['flashPhase'] = isOn ? 'on' : 'off';
  }, periodMs / 2);

  return () => {
    window.clearInterval(timer);
  };
}
