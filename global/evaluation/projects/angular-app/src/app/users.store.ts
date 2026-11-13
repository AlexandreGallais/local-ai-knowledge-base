import { signalStore } from '@ngrx/signals';

import { withUsers } from './users.feature';

export const UsersStore = signalStore(
  { providedIn: 'root' },
  withUsers(),
);
