# signals/entities/src/with-entities

## withEntities

```ts
export function withEntities<Entity>(config?:
```

@description

Provides entity management capabilities to the SignalStore.
Adds `entityMap`, `ids`, and `entities` signals to the store.

@usageNotes

```ts
import { signalStore } from '@ngrx/signals';
import { withEntities } from '@ngrx/signals/entities';

type Todo = { id: number; text: string; completed: boolean };

export const TodosStore = signalStore(withEntities<Todo>());
```