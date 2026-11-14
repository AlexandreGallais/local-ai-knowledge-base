import { signalStore } from '@ngrx/signals';

import { withValves } from './valves.feature';

/** The store of a circuit: a list of features, one per sub-domain. */
export const CircuitStore = signalStore({ providedIn: 'root' }, withValves());
