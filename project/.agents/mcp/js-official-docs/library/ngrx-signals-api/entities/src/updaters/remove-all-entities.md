# signals/entities/src/updaters/remove-all-entities

## removeAllEntities

```ts
export function removeAllEntities(config?:
```

@description

Removes all entities from the collection.

@usageNotes

```ts
import { patchState } from '@ngrx/signals';
import { removeAllEntities } from '@ngrx/signals/entities';

patchState(store, removeAllEntities());
```