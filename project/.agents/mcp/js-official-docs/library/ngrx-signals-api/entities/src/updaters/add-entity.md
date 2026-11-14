# signals/entities/src/updaters/add-entity

## addEntity

```ts
export function addEntity( entity: any, config?: { collection?: string
```

@description

Adds an entity to the collection.
Does not override if entity with same ID exists.

@usageNotes

```ts
import { patchState } from '@ngrx/signals';
import { addEntity } from '@ngrx/signals/entities';

patchState(store, addEntity(todo));
```