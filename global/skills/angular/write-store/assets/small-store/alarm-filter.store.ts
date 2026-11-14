import { computed } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';

export type AlarmPriority = 'high' | 'low' | 'medium';

interface AlarmFilterState {
  readonly priorities: readonly AlarmPriority[];
  readonly search: string;
}

const initialAlarmFilterState: AlarmFilterState = {
  priorities: [
    'high',
    'medium',
    'low',
  ],
  search: '',
};

// A small store without sub-domain stays in one file. Once a second sub-domain comes, split it:
// one feature per sub-domain, and the store only lists them.
export const AlarmFilterStore = signalStore(
  { providedIn: 'root' },
  withState(initialAlarmFilterState),
  withComputed(({
    priorities,
    search,
  }) => ({ isFiltered: computed(() => priorities().length < 3 || search() !== '') })),
  withMethods((store) => ({
    reset(): void {
      patchState(
        store,
        initialAlarmFilterState,
      );
    },
    setSearch(search: string): void {
      patchState(
        store,
        { search: search.trim() },
      );
    },
    togglePriority(priority: AlarmPriority): void {
      const current = store.priorities();

      patchState(store, {
        priorities: current.includes(priority)
          ? current.filter((item) => item !== priority)
          : [
              ...current,
              priority,
            ],
      });
    },
  })),
);

export type AlarmFilterStore = InstanceType<typeof AlarmFilterStore>;
