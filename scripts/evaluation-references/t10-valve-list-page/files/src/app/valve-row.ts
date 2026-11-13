/** The state of a valve, as the page shows it. Invented example. */
export type ValveState = 'closed' | 'fault' | 'open';

/** One valve of the page. */
export interface ValveRow {
  readonly state: ValveState;
  readonly tag: string;
}
