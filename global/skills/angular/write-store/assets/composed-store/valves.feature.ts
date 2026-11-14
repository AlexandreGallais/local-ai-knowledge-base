import { computed } from '@angular/core';
import {
  patchState,
  signalStoreFeature,
  type SignalStoreFeatureType,
  type,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';

import type { CircuitServicesFeature } from './circuit-services.feature';
import type { Valve } from './valve';

interface ValvesState {
  readonly isLoadingValves: boolean;
  readonly valves: readonly Valve[];
}

const initialValvesState: ValvesState = {
  isLoadingValves: false,
  valves: [],
};

export type ValvesFeature = SignalStoreFeatureType<typeof withValves>;

// Sub-domain "valves": the list and its loading. It needs the services of the circuit, declared by
// type<...>(); "<_>" avoids a known TypeScript failure when two features with an input follow.
export function withValves<_>() {
  return signalStoreFeature(
    type<CircuitServicesFeature>(),
    withState(initialValvesState),
    withComputed(({ valves }) => ({ openValveCount: computed(() => valves().filter((valve) => valve.isOpen).length) })),
    withMethods((store) => ({
      async loadValves(): Promise<void> {
        patchState(
          store,
          { isLoadingValves: true },
        );
        try {
          patchState(
            store,
            { valves: await store._valveApi.getAll() },
          );
        } finally {
          patchState(
            store,
            { isLoadingValves: false },
          );
        }
      },
    })),
  );
}
