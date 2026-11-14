# signals/entities/src/updaters/add-entities

## addEntities

```ts
export function addEntities( entities: any[], config?: { collection?: string
```

@description

Adds multiple entities to the collection.
Does not override existing entities with same IDs.

@usageNotes

```ts
import { patchState } from '@ngrx/signals';
import { addEntities } from '@ngrx/signals/entities';

patchState(store, addEntities([todo1, todo2]));
```