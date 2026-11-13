---
title: "Events (part 2 of 2)"
tool: "ngrx-signals"
version: "22.0"
source: "https://github.com/ngrx/platform/blob/a4995391ef631f1bd60d539f436a1aa5c23c4fe5/projects/www/src/app/pages/guide/signals/signal-store/events.md"
commit: "a4995391ef631f1bd60d539f436a1aa5c23c4fe5"
license: "MIT"
---

# Events (part 2 of 2)

## Scoped Events

By default, the `Dispatcher` and `Events` services operate in a global scope where all dispatched events are handled application-wide.
In some cases, event handling should be isolated to a particular feature or component subtree.
Typical examples include local state management scenarios where events should stay within a specific feature, or micro-frontend architectures where each remote module needs its own isolated event scope.
To support this, the Events plugin provides a built-in mechanism for scoped events.

### Creating Local Scope

A new event scope can be created at a feature or component level by using the `provideDispatcher()` function.
Any events dispatched inside this boundary will belong to the local scope unless explicitly forwarded.

When dispatching an event, the scope can be explicitly selected using the dispatch configuration:

- `self` (default): An event dispatched and handled only within the local scope.
- `parent`: An event is forwarded to the parent dispatcher.
- `global`: An event is forwarded to the global dispatcher.

<ngrx-code-example header="book-search.ts">

```ts
// ... other imports
import { provideDispatcher } from '@ngrx/signals/events';

@Component({
  // ... component config
  providers: [
    // 👇 Provide local `Dispatcher` and `Events` services
    // at the `BookSearch` injector level.
    provideDispatcher(),
    BookSearchStore,
  ],
})
export class BookSearch {
  readonly store = inject(BookSearchStore);
  readonly dispatch = injectDispatch(bookSearchEvents);

  constructor() {
    // 👇 Dispatch event to the local scope.
    this.dispatch.opened();
  }

  changeQuery(query: string): void {
    // 👇 Dispatch event to the parent scope.
    this.dispatch({ scope: 'parent' }).queryChanged(query);
  }

  triggerRefresh(): void {
    // 👇 Dispatch event to the global scope.
    this.dispatch({ scope: 'global' }).refreshTriggered();
  }
}
```

</ngrx-code-example>

Event flow within scopes follows a hierarchical visibility rule, which means that `Events` service receives events dispatched in their own scope and events dispatched in any parent scope, including the global scope.
On the other hand, events dispatched locally are not visible to ancestor scopes.

<ngrx-docs-alert type="help">

When using `Dispatcher`, the scope can be provided as a second argument of the `dispatch` method.

```ts
@Component({
  // ... component config
  providers: [provideDispatcher(), CounterStore],
})
export class Counter {
  readonly dispatcher = inject(Dispatcher);

  increment(): void {
    this.dispatcher.dispatch(counterPageEvents.increment(), {
      scope: 'parent',
    });
  }

  incrementBy(count: number): void {
    this.dispatcher.dispatch(counterPageEvents.incrementBy(count), {
      scope: 'global',
    });
  }
}
```

</ngrx-docs-alert>

### Scoped Events in Event Handlers

Scoped events can also be dispatched from event handlers. The Events plugin provides:

- `toScope`: Forwards a returned event to the specified scope.
- `mapToScope`: RxJS operator that applies scope forwarding to all returned events within a handler.

<ngrx-code-example header="book-search-store.ts">

```ts
// ... other imports
import { mapToScope, toScope } from '@ngrx/signals/events';

export const BookSearchStore = signalStore(
  // ... other features
  withEventHandlers(
    (
      store,
      events = inject(Events),
      booksService = inject(BooksService)
    ) => ({
      loadBooksByQuery$: events
        .on(bookSearchEvents.queryChanged)
        .pipe(
          switchMap(({ payload: query }) =>
            booksService.getByQuery(query).pipe(
              mapResponse({
                // 👇 Dispatch `loadedSuccess` to the current scope.
                next: (books) => booksApiEvents.loadedSuccess(books),
                // 👇 Dispatch `loadedFailure` to the global scope.
                error: (error: { message: string }) => [
                  booksApiEvents.loadedFailure(error.message),
                  toScope('global'),
                ],
              })
            )
          )
        ),
      loadBookById$: events.on(bookSearchEvents.bookSelected).pipe(
        exhaustMap(({ payload: bookId }) =>
          booksService.getById(bookId).pipe(
            mapResponse({
              next: (book) => booksApiEvents.loadedByIdSuccess(book),
              error: (error: { message: string }) =>
                booksApiEvents.loadedByIdFailure(error.message),
            }),
            // 👇 Dispatch all returned events to the parent scope.
            mapToScope('parent')
          )
        )
      ),
    })
  )
);
```

</ngrx-code-example>
