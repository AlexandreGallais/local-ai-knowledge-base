import { inject } from '@angular/core';
import {
  signalStoreFeature,
  type SignalStoreFeatureType,
  withProps,
} from '@ngrx/signals';

import { ValveApi } from './valve-api';

export type CircuitServicesFeature = SignalStoreFeatureType<typeof withCircuitServices>;

// First feature of the store: the services, injected once. The "_" prefix hides them outside the
// store; the next features still see them.
export function withCircuitServices() {
  return signalStoreFeature(withProps(() => ({ _valveApi: inject(ValveApi) })));
}
