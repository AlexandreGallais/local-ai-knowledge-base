# signals/events/src/dispatcher

## Dispatcher

```ts
export class Dispatcher
```

@description

Globally provided service for dispatching events.

@usageNotes

```ts
import { Dispatcher, event } from '@ngrx/signals/events';

const increment = event('[Counter Page] Increment');

\@Component(...)
class Counter {
  readonly #dispatcher = inject(Dispatcher);

  increment(): void {
    this.#dispatcher.dispatch(increment());
  }
}
```

## provideDispatcher

```ts
export function provideDispatcher(): Provider[]
```

@description

Provides scoped instances of Dispatcher and Events services.
Enables event dispatching within a specific component or feature scope.

@usageNotes

```ts
import { Dispatcher, event } from '@ngrx/signals/events';

const increment = event('[Counter Page] Increment');

\@Component({
  // ...
  providers: [provideDispatcher()],
})
class Counter {
  readonly #dispatcher = inject(Dispatcher);

  increment(): void {
    // Dispatching an event to the local Dispatcher.
    this.#dispatcher.dispatch(increment());

    // Dispatching an event to the parent Dispatcher.
    this.#dispatcher.dispatch(increment(), { scope: 'parent' });

    // Dispatching an event to the global Dispatcher.
    this.#dispatcher.dispatch(increment(), { scope: 'global' });
  }
}
```