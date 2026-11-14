# signals/entities/src/updaters/update-entities

## updateEntities

```ts
export function updateEntities( update: ({ ids: EntityId[] } | { predicate: EntityPredicate<any> }) &
```

@description

Updates multiple entities in the collection by IDs or predicate.
Supports partial updates.

@usageNotes

```ts
import { patchState } from '@ngrx/signals';
import { updateEntities } from '@ngrx/signals/entities';

// Update by IDs
patchState(
  store,
  updateEntities({ ids: [1, 2], changes: { completed: true } })
);

// Update by predicate
patchState(
  store,
  updateEntities({
    predicate: (todo) => !todo.completed,
    changes: { text: '' },
  })
);
```