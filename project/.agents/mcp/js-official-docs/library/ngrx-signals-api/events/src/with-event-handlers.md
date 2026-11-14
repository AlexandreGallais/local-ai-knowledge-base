# signals/events/src/with-event-handlers

## withEventHandlers

```ts
export function withEventHandlers<Input extends SignalStoreFeatureResult>( handlersFactory: ( store: Prettify< StateSignals<Input['state']> & Input['props'] & Input['methods'] & WritableStateSource<Prettify<Input['state']>> > )
```

@description

SignalStore feature for defining event handlers.

@usageNotes

```ts
import { signalStore, withState } from '@ngrx/signals';
import { event, Events, withEventHandlers } from '@ngrx/signals/events';

const increment = event('[Counter Page] Increment');
const decrement = event('[Counter Page] Decrement');

const CounterStore = signalStore(
  withState({ count: 0 }),
  withEventHandlers(({ count }, events = inject(Events)) => ({
    logCount$: events.on(increment, decrement).pipe(
      tap(({ type }) => console.log(type, count())),
    ),
  })),
);
```