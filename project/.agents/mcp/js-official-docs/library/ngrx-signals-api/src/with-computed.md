# signals/src/with-computed

## withComputed

```ts
export function withComputed< Input extends SignalStoreFeatureResult, ComputedDictionary extends Record< string | symbol, Signal<unknown> | (()
```

@description

Adds computed signals to a SignalStore.
Accepts a factory function that returns a dictionary of computed signals or
computation functions.

@usageNotes

```ts
import { signalStore, withState, withComputed } from '@ngrx/signals';

export const CounterStore = signalStore(
  withState({ count: 0 }),
  withComputed(({ count }) => ({
    doubleCount: () => count() * 2,
  }))
);
```