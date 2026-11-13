import { computed } from '@angular/core';
import {
  patchState,
  signalStoreFeature,
  type,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import type { ValveState } from './valve-row';
import type { ValveRowsFeature } from './valve-rows.feature';

/** The choice of the filter: every valve, or the valves of one state. */
export type StateFilter = 'all' | ValveState;

interface ValveFilterState {
  readonly stateFilter: StateFilter;
}

// Sub-domain "filter": it reads the rows, so it comes after withValveRows in the store.
export function withValveFilter<_>() {
  return signalStoreFeature(
    type<ValveRowsFeature>(),
    withState<ValveFilterState>({ stateFilter: 'all' }),
    withComputed(({
      rows,
      stateFilter,
    }) => ({ visibleRows: computed(() => (stateFilter() === 'all' ? rows() : rows().filter((row) => row.state === stateFilter()))) })),
    withMethods((store) => ({
      setStateFilter(stateFilter: StateFilter): void {
        patchState(store, { stateFilter });
      },
    })),
  );
}
