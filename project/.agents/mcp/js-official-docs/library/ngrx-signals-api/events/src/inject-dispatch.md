# signals/events/src/inject-dispatch

## injectDispatch

```ts
export function injectDispatch< EventGroup extends Record<string, EventCreator<string, any>>, >( events: EventGroup, config?: { injector?: Injector } ): ((config: EventScopeConfig)
```

@description

Creates self-dispatching events for a given event group.

@usageNotes

```ts
import { type } from '@ngrx/signals';
import { eventGroup, injectDispatch } from '@ngrx/signals/events';

const counterPageEvents = eventGroup({
  source: 'Counter Page',
  events: {
    increment: type<void>(),
    decrement: type<void>(),
  },
});

\@Component(...)
class Counter {
  readonly dispatch = injectDispatch(counterPageEvents);

  increment(): void {
    this.dispatch.increment();
  }

  decrement(): void {
    this.dispatch.decrement();
  }
}
```