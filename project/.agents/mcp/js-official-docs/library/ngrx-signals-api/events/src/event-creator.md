# signals/events/src/event-creator

## event

```ts
export function event(type: string): EventCreator<string, any>
```

@description

Creates an event creator.

@usageNotes

### Creating an event creator without payload

```ts
import { event } from '@ngrx/signals/events';

const increment = event('[Counter Page] Increment');
```

### Creating an event creator with payload

```ts
import { type } from '@ngrx/signals';
import { event } from '@ngrx/signals/events';

const set = event('[Counter Page] Set', type<number>());
```