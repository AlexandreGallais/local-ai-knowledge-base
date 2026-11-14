# signals/src/signal-store

## signalStore

```ts
export function signalStore( ...args: [SignalStoreConfig, ...SignalStoreFeature[]] | SignalStoreFeature[] ): Type<SignalStoreMembers<any>>
```

@description

Creates a store by composing features.
Returns an injectable service that can be provided locally or globally.

@usageNotes

```ts
import { Component, inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

export const CounterStore = signalStore(
  withState({ count: 0 }),
  withMethods((store) => ({
    increment(): void {
      patchState(store, ({ count }) => ({ count: count + 1 }));
    },
  }))
);

\@Component({
  // ...
  providers: [CounterStore],
})
export class Counter {
  readonly store = inject(CounterStore);

  logCount(): void {
    console.log(this.store.count());
  }

  increment(): void {
    this.store.increment();
  }
}
```