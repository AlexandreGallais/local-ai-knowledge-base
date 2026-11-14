# signals/src/with-state

## withState

```ts
export function withState<State extends object>( stateOrFactory: State | (()
```

@description

Adds state slices to a SignalStore.
Accepts an object or a factory function that returns the initial state.

@usageNotes

```ts
import { signalStore, withState } from '@ngrx/signals';

export const CounterStore = signalStore(
  withState({ count: 0 })
);
```