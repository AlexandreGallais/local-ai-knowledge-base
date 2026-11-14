# signals/entities/src/updaters/update-all-entities

## updateAllEntities

```ts
export function updateAllEntities( changes: EntityChanges<any>, config?: { collection?: string
```

@description

Updates all entities in the collection. Supports partial updates.

@usageNotes

```ts
import { patchState } from '@ngrx/signals';
import { updateAllEntities } from '@ngrx/signals/entities';

patchState(store, updateAllEntities({ completed: false }));
```