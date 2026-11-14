# signals/src/state-source

## patchState

```ts
export function patchState<State extends object>( stateSource: WritableStateSource<State>, ...updaters: Array< Partial<NoInfer<State>> | PartialStateUpdater<NoInfer<State>> > ): void
```

@description

Updates the state of a SignalStore or SignalState.
Accepts a sequence of partial state objects and partial state updaters.

@usageNotes

```ts
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

export const CounterStore = signalStore(
  withState({ count1: 0, count2: 0 }),
  withMethods((store) => ({
    incrementFirst(): void {
      patchState(store, (state) => ({ count1: state.count1 + 1 }));
    },
    resetSecond(): void {
      patchState(store, { count2: 0 });
    },
  }))
);
```

## getState

```ts
export function getState<State extends object>( stateSource: StateSource<State> ): State
```

@description

Returns a snapshot of the current state from a SignalStore or SignalState.
When used within a reactive context, state changes are automatically tracked.

@usageNotes

```ts
import { Component, effect, inject } from '@angular/core';
import { getState, signalStore, withState } from '@ngrx/signals';

export const CounterStore = signalStore(
  withState({ count1: 0, count2: 0 })
);

\@Component(...)
export class Counter {
  readonly store = inject(CounterStore);

  constructor() {
    effect(() => {
      const state = getState(this.store);
      // 👇 Logs on state changes.
      console.log(state);
    });
  }
}
```

## watchState

```ts
export function watchState<State extends object>( stateSource: StateSource<State>, watcher: StateWatcher<State>, config?: { injector?: Injector } ): { destroy(): void }
```

@description

Synchronously tracks state changes of a SignalStore or SignalState.

@usageNotes

```ts
import { Component } from '@angular/core';
import { signalState, watchState } from '@ngrx/signals';

\@Component(...)
export class Counter {
  readonly state = signalState({ count1: 0, count2: 0 });

  constructor() {
    // 👇 Synchronously logs every state change without debouncing.
    watchState(this.state, console.log);
  }
}
```