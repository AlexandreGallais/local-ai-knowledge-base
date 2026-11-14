# signals/entities/src/updaters/remove-entities

## removeEntities

```ts
export function removeEntities( idsOrPredicate: EntityId[] | EntityPredicate<any>, config?: { collection?: string } ): PartialStateUpdater<EntityState<any> | NamedEntityState<any, string>>
```

@description

Removes multiple entities from the collection by IDs or predicate.

@usageNotes

```ts
import { patchState } from '@ngrx/signals';
import { removeEntities } from '@ngrx/signals/entities';

// Remove by IDs
patchState(store, removeEntities([1, 2, 3]));

// Remove by predicate
patchState(store, removeEntities((todo) => todo.completed));
```