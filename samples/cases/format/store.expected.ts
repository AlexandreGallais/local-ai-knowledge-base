import { computed } from '@angular/core';
import {
  patchState,
  signalStoreFeature,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';

import type { User } from './user';

interface UsersState { readonly users: readonly User[] }

export function withUsers() {
  return signalStoreFeature(
    withState<UsersState>({ users: [] }),
    withComputed(({ users }) => ({ count: computed(() => users().length) })),
    withMethods((store) => ({
      add(user: User): void {
        patchState(
          store,
          {
            users: [
              ...store.users(),
              user,
            ],
          },
        );
      },
    })),
  );
}
