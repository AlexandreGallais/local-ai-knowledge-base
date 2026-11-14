# signals/src/signal-state

## signalState

```ts
export function signalState<State extends object>( initialState: State ): SignalState<State>
```

@description

Creates a state container with deeply nested signals for each property that
is an object literal.

@usageNotes

```ts
import { Component } from '@angular/core';
import { signalState, patchState } from '@ngrx/signals';

\@Component(...)
export class Counter {
  readonly state = signalState({ count: 0 });

  logCount(): void {
    console.log(this.state.count());
  }

  increment(): void {
    patchState(this.state, ({ count }) => ({ count: count + 1 }));
  }
}
```