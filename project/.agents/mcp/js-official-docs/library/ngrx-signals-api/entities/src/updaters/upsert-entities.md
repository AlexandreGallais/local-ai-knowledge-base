# signals/entities/src/updaters/upsert-entities

## upsertEntities

```ts
export function upsertEntities( entities: any[], config?: { collection?: string
```

@description

Adds or updates multiple entities in the collection.
When updating, merges with existing entities.

@usageNotes

```ts
import { patchState } from '@ngrx/signals';
import { upsertEntities } from '@ngrx/signals/entities';

patchState(store, upsertEntities([todo1, todo2]));
```