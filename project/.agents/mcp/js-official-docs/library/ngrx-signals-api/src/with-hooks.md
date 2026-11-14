# signals/src/with-hooks

## withHooks

```ts
export function withHooks<Input extends SignalStoreFeatureResult>( hooksOrFactory: |
```

@description

Adds lifecycle hooks to a SignalStore.
Supports an onInit hook that executes when the store is initialized.
Supports an onDestroy hook for when the store is destroyed.

@usageNotes

```ts
import { signalStore, withHooks, withState } from '@ngrx/signals';

export const UserStore = signalStore(
  withState({ firstName: 'Jimi', lastName: 'Hendrix' }),
  withHooks({
    onInit({ firstName }) {
      console.log('first name on init', firstName());
    },
    onDestroy({ lastName }) {
      console.log('last name on destroy', lastName());
    },
  })
);
```