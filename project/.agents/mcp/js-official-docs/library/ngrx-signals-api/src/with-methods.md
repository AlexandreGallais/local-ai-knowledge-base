# signals/src/with-methods

## withMethods

```ts
export function withMethods< Input extends SignalStoreFeatureResult, Methods extends MethodsDictionary, >( methodsFactory: ( store: Prettify< StateSignals<Input['state']> & Input['props'] & Input['methods'] & WritableStateSource<Input['state']> > )
```

@description

Adds methods to a SignalStore.

@usageNotes

```ts
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

export const CounterStore = signalStore(
  withState({ count: 0 }),
  withMethods((store) => ({
    increment(): void {
      patchState(store, ({ count }) => ({ count: count + 1 }));
    },
    decrement(): void {
      patchState(store, ({ count }) => ({ count: count - 1 }));
    },
  }))
);
```