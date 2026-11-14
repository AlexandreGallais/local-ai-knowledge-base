# signals/entities/src/entity-config

## entityConfig

```ts
export function entityConfig<Entity>(config:
```

@description

Creates a custom entity configuration and ensures strong typing.
Allows defining named entity collections and a custom id selector.

@usageNotes

```ts
import { signalStore, type, withMethods } from '@ngrx/signals';
import { addEntity, entityConfig, withEntities } from '@ngrx/signals/entities';

type Todo = { key: number; text: string };

const todoConfig = entityConfig({
  entity: type<Todo>(),
  collection: 'todo',
  selectId: (todo) => todo.key,
});

export const TodosStore = signalStore(
  // 👇 Adds `todoEntityMap`, `todoIds`, and `todoEntities` signals to the store.
  withEntities(todoConfig),
  withMethods((store) => ({
    addTodo(todo: Todo): void {
      patchState(store, addEntity(todo, todoConfig));
    },
  }))
);
```