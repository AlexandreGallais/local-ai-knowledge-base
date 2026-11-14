# signals/entities/src/updaters/update-entity

## updateEntity

```ts
export function updateEntity( update:
```

@description

Updates an entity in the collection by ID. Supports partial updates.

@usageNotes

```ts
import { patchState } from '@ngrx/signals';
import { updateEntity } from '@ngrx/signals/entities';

patchState(store, updateEntity({ id: 1, changes: { completed: true } }));
```