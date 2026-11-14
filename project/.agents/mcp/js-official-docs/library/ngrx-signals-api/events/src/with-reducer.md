# signals/events/src/with-reducer

## withReducer

```ts
export function withReducer<State extends object>( ...caseReducers: CaseReducerResult<State, EventCreator<string, any>[]>[] ): SignalStoreFeature< { state: State
```

@description

SignalStore feature for defining state transitions based on dispatched events.

@usageNotes

```ts
import { signalStore, type, withState } from '@ngrx/signals';
import { event, on, withReducer } from '@ngrx/signals/events';

const set = event('[Counter Page] Set', type<number>());

const CounterStore = signalStore(
  withState({ count: 0 }),
  withReducer(
    on(set, ({ payload }) => ({ count: payload })),
  ),
);
```