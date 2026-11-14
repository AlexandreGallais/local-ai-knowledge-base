import { computed } from '@angular/core';
import {
  patchState,
  signalStoreFeature,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';

import type { ValveState } from './valve';

/** The valves of a circuit, by name. */
export interface ValvesState {
  valves: Record<string, ValveState>;
}

/** The valves sub-domain of a store: their states, how many are open, how to set one. */
export function withValves() {
  return signalStoreFeature(
    withState<ValvesState>({ valves: {} }),
    withComputed(({ valves }) => ({
      openCount: computed(() => Object.values(valves()).filter((state) => state === 'open').length),
    })),
    withMethods((store) => ({
      setState(name: string, state: ValveState): void {
        patchState(store, ({ valves }) => ({
          valves: {
            ...valves,
            [name]: state,
          },
        }));
      },
    })),
  );
}
