# signals/entities/src/updaters/set-entities

## setEntities

```ts
export function setEntities( entities: any[], config?: { collection?: string
```

@description

Adds or replaces multiple entities in the collection.

@usageNotes

```ts
import { patchState } from '@ngrx/signals';
import { setEntities } from '@ngrx/signals/entities';

patchState(store, setEntities([todo1, todo2]));
```