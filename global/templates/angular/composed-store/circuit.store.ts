import { signalStore } from '@ngrx/signals';

import { withCircuitServices } from './circuit-services.feature';
import { withValveSelection } from './valve-selection.feature';
import { withValves } from './valves.feature';

// The store only lists its features, in the order of their type dependencies:
// services, then valves, then the selection that reads the valves.
export const CircuitStore = signalStore(
  { providedIn: 'root' },
  withCircuitServices(),
  withValves(),
  withValveSelection(),
);
export type CircuitStore = InstanceType<typeof CircuitStore>;
