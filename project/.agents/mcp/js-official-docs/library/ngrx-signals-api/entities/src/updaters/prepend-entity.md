# signals/entities/src/updaters/prepend-entity

## prependEntity

```ts
export function prependEntity( entity: any, config?: { collection?: string
```

@description

Adds an entity to the beginning of the collection.
Does not add if entity with same ID exists.

@usageNotes

```ts
import { patchState } from '@ngrx/signals';
import { prependEntity } from '@ngrx/signals/entities';

patchState(store, prependEntity(todo));
```