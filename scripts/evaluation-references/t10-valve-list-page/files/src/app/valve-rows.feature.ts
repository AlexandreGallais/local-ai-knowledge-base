import {
  patchState,
  signalStoreFeature,
  type SignalStoreFeatureType,
  withMethods,
  withState,
} from '@ngrx/signals';
import type { ValveRow } from './valve-row';

interface ValveRowsState {
  readonly rows: readonly ValveRow[];
}

export type ValveRowsFeature = SignalStoreFeatureType<typeof withValveRows>;

// Sub-domain "rows": the valves given to the page.
export function withValveRows() {
  return signalStoreFeature(withState<ValveRowsState>({ rows: [] }), withMethods((store) => ({
    setRows(rows: readonly ValveRow[]): void {
      patchState(store, { rows });
    },
  })));
}
