# signals/entities/src/updaters/set-entity

## setEntity

```ts
export function setEntity( entity: any, config?: { collection?: string
```

@description

Adds or replaces an entity in the collection.

@usageNotes

```ts
import { patchState } from '@ngrx/signals';
import { setEntity } from '@ngrx/signals/entities';

patchState(store, setEntity(todo));
```