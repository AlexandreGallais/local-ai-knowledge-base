import { signalStore } from '@ngrx/signals';
import { withValveFilter } from './valve-filter.feature';
import { withValveRows } from './valve-rows.feature';

// The store only lists its features, in the order of their type dependencies: rows, then filter.
export const ValveListStore = signalStore(withValveRows(), withValveFilter());
