# signals/entities/src/updaters/prepend-entities

## prependEntities

```ts
export function prependEntities( entities: any[], config?: { collection?: string
```

@description

Adds multiple entities to the beginning of the collection.
Does not add existing entities with same IDs.

@usageNotes

```ts
import { patchState } from '@ngrx/signals';
import { prependEntities } from '@ngrx/signals/entities';

patchState(store, prependEntities([todo1, todo2]));
```