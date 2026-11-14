# signals/entities/src/updaters/set-all-entities

## setAllEntities

```ts
export function setAllEntities( entities: any[], config?: { collection?: string
```

@description

Replaces the entire entity collection with the provided entities.

@usageNotes

```ts
import { patchState } from '@ngrx/signals';
import { setAllEntities } from '@ngrx/signals/entities';

patchState(store, setAllEntities([todo1, todo2, todo3]));
```