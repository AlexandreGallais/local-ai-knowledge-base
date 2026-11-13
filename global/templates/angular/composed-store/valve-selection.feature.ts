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

import type { ValvesFeature } from './valves.feature';

export type ValveSelectionFeature = SignalStoreFeatureType<typeof withValveSelection>;

interface ValveSelectionState {
  readonly selectedValveId: string | undefined;
}

// Sub-domain "selection": it reads the valves, so it comes after withValves in the store.
export function withValveSelection<_>() {
  return signalStoreFeature(
    type<ValvesFeature>(),
    withState<ValveSelectionState>({ selectedValveId: undefined }),
    withComputed(({
      selectedValveId,
      valves,
    }) => ({ selectedValve: computed(() => valves().find((valve) => valve.id === selectedValveId())) })),
    withMethods((store) => ({
      clearValveSelection(): void {
        patchState(
          store,
          { selectedValveId: undefined },
        );
      },
      selectValve(id: string): void {
        patchState(
          store,
          { selectedValveId: id },
        );
      },
    })),
  );
}
