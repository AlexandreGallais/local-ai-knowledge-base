# signals/entities/src/updaters/remove-entity

## removeEntity

```ts
export function removeEntity( id: EntityId, config?: { collection?: string } ): PartialStateUpdater<EntityState<any> | NamedEntityState<any, string>>
```

@description

Removes an entity from the collection by ID.

@usageNotes

```ts
import { patchState } from '@ngrx/signals';
import { removeEntity } from '@ngrx/signals/entities';

patchState(store, removeEntity(1));
```