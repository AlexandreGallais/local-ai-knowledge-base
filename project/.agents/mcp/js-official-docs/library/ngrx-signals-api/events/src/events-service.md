# signals/events/src/events-service

## Events

```ts
export class Events extends BaseEvents
```

@description

Globally provided service for listening to dispatched events.

@usageNotes

```ts
import { event, Events } from '@ngrx/signals/events';

const increment = event('[Counter Page] Increment');

\@Component(...)
class Counter {
  readonly #events = inject(Events);

  constructor() {
    this.#events
      .on(increment)
      .pipe(takeUntilDestroyed())
      .subscribe(() => /* handle increment event *\/);
  }
}
```

## ReducerEvents

```ts
export class ReducerEvents extends BaseEvents
```

@description

Globally provided service for listening to dispatched events.
Receives events before the `Events` service and is primarily used for
handling state transitions.