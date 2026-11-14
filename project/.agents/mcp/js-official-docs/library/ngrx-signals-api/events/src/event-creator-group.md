# signals/events/src/event-creator-group

## eventGroup

```ts
export function eventGroup< Source extends string, Events extends Record<string, unknown>, >(config:
```

@description

Creates a group of event creators.

@usageNotes

```ts
import { type } from '@ngrx/signals';
import { eventGroup } from '@ngrx/signals/events';

const counterPageEvents = eventGroup({
  source: 'Counter Page',
  events: {
    increment: type<void>(),
    decrement: type<void>(),
    set: type<number>(),
  },
});
```