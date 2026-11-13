---
title: "Frequently Asked Questions"
tool: "ngrx-signals"
version: "22.0"
source: "https://github.com/ngrx/platform/blob/a4995391ef631f1bd60d539f436a1aa5c23c4fe5/projects/www/src/app/pages/guide/signals/faq.md"
commit: "a4995391ef631f1bd60d539f436a1aa5c23c4fe5"
license: "MIT"
---

# Frequently Asked Questions

  **#1 How to connect my SignalStore(s) with Redux DevTools?**

There's no official connection between `@ngrx/signals` and the Redux Devtools.
We expect the Angular Devtools will provide support for signals soon, which can be used to track the state.
However, you could create a feature for this, or you can make use of the `withDevtools` feature from the `@angular-architects/ngrx-toolkit` package.

  **#2 Can I use the Flux/Redux pattern with SignalStore?**

Yes. Starting from NgRx version 19.2, the Events plugin introduces support for a Flux-style state management with SignalStore.
It enables defining and dispatching events, handling them through reducers and effects, and maintaining a unidirectional data flow similar to the traditional Redux pattern.
For more information, see the Events Plugin documentation.

  **#3 Can I define my SignalStore as a class?**

Yes, it is possible to define a SignalStore using a class-based approach.
However, the NgRx team recommends using the functional style for defining SignalStores.

To define a class-based SignalStore, create a new class and extend from `signalStore`.

<ngrx-code-example>

```ts
@Injectable()
export class CounterStore extends signalStore(
  { protectedState: false },
  withState({ count: 0 })
) {
  readonly doubleCount = computed(() => this.count() * 2);

  increment(): void {
    patchState(this, { count: this.count() + 1 });
  }
}
```

</ngrx-code-example>

  **#4 How can I get the type of a SignalStore?**

To get the type of a SignalStore, use the `InstanceType` utility type.

```ts
const CounterStore = signalStore(withState({ count: 0 }));

type CounterStore = InstanceType<typeof CounterStore>;

function logCount(store: CounterStore): void {
  console.log(store.count());
}
```

  **#5 Can I inject a SignalStore via the constructor?**

Yes. To inject a SignalStore via the constructor, define and export its type with the same name.

```ts
// counter-store.ts
export const CounterStore = signalStore(withState({ count: 0 }));

export type CounterStore = InstanceType<typeof CounterStore>;

// counter.ts
import { CounterStore } from './counter.store';

@Component({
  /* ... */
})
export class Counter {
  constructor(readonly store: CounterStore) {}
}
```

  **#6 Can features like `withComputed` or `withMethods` reference other members inside the same feature?**

It may be necessary for a computed in a `withComputed` feature to need to reference another computed value,
or a method in a `withMethods` feature to refer to another method. To do so, you can break out the common piece
with a helper that can serve as a function or computed itself.

Although it is possible to have multiple features that reference each other, we recommend having everything in one call.
That adheres more to JavaScript's functional style and keeps features co-located.

<ngrx-code-example>

```ts
export const BooksStore = signalStore(
  withState(initialState),
  withComputed(({ filter }) => {
    // 👇 Define helper functions (or computed signals).
    const sortDirection = computed(() =>
      filter.order() === 'asc' ? 1 : -1
    );

    return {
      sortDirection,
      sortDirectionReversed: () => sortDirection() * -1,
    };
  })
);
```

</ngrx-code-example>
