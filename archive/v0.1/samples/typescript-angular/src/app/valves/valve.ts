export type ValveState = 'open' | 'closed' | 'fault';

export interface Valve {
  readonly id: string;
  readonly label: string;
  readonly state: ValveState;
}

const STATES: readonly unknown[] = ['open', 'closed', 'fault'];

export function isValve(value: unknown): value is Valve {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    typeof value.id === 'string' &&
    'label' in value &&
    typeof value.label === 'string' &&
    'state' in value &&
    STATES.includes(value.state)
  );
}
