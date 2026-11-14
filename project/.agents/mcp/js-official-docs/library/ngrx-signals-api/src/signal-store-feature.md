# signals/src/signal-store-feature

## signalStoreFeature

```ts
export function signalStoreFeature( ...args: | [Partial<SignalStoreFeatureResult>, ...SignalStoreFeature[]] | SignalStoreFeature[] ): SignalStoreFeature<EmptyFeatureResult, EmptyFeatureResult>
```

@description

Combines multiple store features into a single feature.

@usageNotes

```ts
import {
  patchState,
  signalStore,
  signalStoreFeature,
  withMethods,
  withState,
} from '@ngrx/signals';

export function withCounter() {
  return signalStoreFeature(
    withState({ count: 0 }),
    withMethods((store) => ({
      increment(): void {
        patchState(store, ({ count }) => ({ count: count + 1 }));
      },
    }))
  );
}

export const CounterStore = signalStore(withCounter());
```