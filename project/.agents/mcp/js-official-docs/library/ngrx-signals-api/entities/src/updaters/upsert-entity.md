# signals/entities/src/updaters/upsert-entity

## upsertEntity

```ts
export function upsertEntity( entity: any, config?: { collection?: string
```

@description

Adds or updates an entity in the collection.
When updating, merges with existing entity.

@usageNotes

```ts
import { patchState } from '@ngrx/signals';
import { upsertEntity } from '@ngrx/signals/entities';

patchState(store, upsertEntity(todo));
```