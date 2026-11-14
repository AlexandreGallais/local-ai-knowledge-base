import { clamp } from './clamp';

/** The state a valve reports. */
export type ValveState = 'closed' | 'moving' | 'open';

/** A valve: an object with a state that changes over time. */
export class Valve {
  /** The state that follows from the opening. */
  #opening = 0;

  constructor(readonly name: string) {}

  /** How open the valve is, from 0 (closed) to 1 (open). */
  get opening(): number {
    return this.#opening;
  }

  get state(): ValveState {
    if (this.#opening === 0) {
      return 'closed';
    }

    return this.#opening === 1 ? 'open' : 'moving';
  }

  /**
   * Moves the valve toward a target opening.
   * @param target The opening wanted, from 0 to 1.
   * @param step The largest change in one call.
   */
  moveToward(target: number, step: number): void {
    const wanted = clamp(target, 0, 1);

    this.#opening = clamp(wanted, this.#opening - step, this.#opening + step);
  }
}
