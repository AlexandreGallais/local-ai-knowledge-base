---
title: "SignalStore (part 2 of 2)"
tool: "ngrx-signals"
version: "22.0"
source: "https://github.com/ngrx/platform/blob/a4995391ef631f1bd60d539f436a1aa5c23c4fe5/projects/www/src/app/pages/guide/signals/signal-store/index.md"
commit: "a4995391ef631f1bd60d539f436a1aa5c23c4fe5"
license: "MIT"
---

# SignalStore (part 2 of 2)

## Putting It All Together

The final `BookSearchStore` implementation with state, computed signals, and methods from this guide is shown below.

<ngrx-code-example header="book-search-store.ts">

```ts
import { computed, inject } from '@angular/core';
import {
  debounceTime,
  distinctUntilChanged,
  pipe,
  switchMap,
  tap,
} from 'rxjs';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { BooksService } from './books-service';
import { Book } from './book';

type BookSearchState = {
  books: Book[];
  isLoading: boolean;
  filter: { query: string; order: 'asc' | 'desc' };
};

const initialState: BookSearchState = {
  books: [],
  isLoading: false,
  filter: { query: '', order: 'asc' },
};

export const BookSearchStore = signalStore(
  withState(initialState),
  withComputed(({ books, filter }) => ({
    booksCount: computed(() => books().length),
    sortedBooks: computed(() => {
      const direction = filter.order() === 'asc' ? 1 : -1;

      return books().toSorted(
        (a, b) => direction * a.title.localeCompare(b.title)
      );
    }),
  })),
  withMethods((store, booksService = inject(BooksService)) => ({
    updateQuery(query: string): void {
      patchState(store, (state) => ({
        filter: { ...state.filter, query },
      }));
    },
    updateOrder(order: 'asc' | 'desc'): void {
      patchState(store, (state) => ({
        filter: { ...state.filter, order },
      }));
    },
    loadByQuery: rxMethod<string>(
      pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap(() => patchState(store, { isLoading: true })),
        switchMap((query) => {
          return booksService.getByQuery(query).pipe(
            tapResponse({
              next: (books) => patchState(store, { books }),
              error: console.error,
              finalize: () => patchState(store, { isLoading: false }),
            })
          );
        })
      )
    ),
  }))
);
```

</ngrx-code-example>

The `BookSearchStore` instance will contain the following properties and methods:

- State signals:
  - `books: Signal<Book[]>`
  - `isLoading: Signal<boolean>`
  - `filter: DeepSignal<{ query: string; order: 'asc' | 'desc' }>`
  - `filter.query: Signal<string>`
  - `filter.order: Signal<'asc' | 'desc'>`
- Computed signals:
  - `booksCount: Signal<number>`
  - `sortedBooks: Signal<Book[]>`
- Methods:
  - `updateQuery(query: string): void`
  - `updateOrder(order: 'asc' | 'desc'): void`
  - `loadByQuery: RxMethod<string>`

<ngrx-docs-alert type="help">

The `BookSearchStore` implementation can be enhanced further by utilizing the `entities` plugin and creating custom SignalStore features.
For more details, refer to the Entity Management and Custom Store Features guides.

</ngrx-docs-alert>

The `BookSearch` component can use the `BookSearchStore` to manage the state, as demonstrated below.

<ngrx-code-example header="book-search.ts">

```ts
import { Component, inject } from '@angular/core';
import { BookFilter } from './book-filter';
import { BookList } from './book-list';
import { BooksStore } from './books.store';

@Component({
  imports: [BookFilter, BookList],
  template: `
    <h1>Books ({{ store.booksCount() }})</h1>

    <ngrx-book-filter
      [query]="store.filter.query()"
      [order]="store.filter.order()"
      (queryChange)="store.updateQuery($event)"
      (orderChange)="store.updateOrder($event)"
    />

    <ngrx-book-list
      [books]="store.sortedBooks()"
      [isLoading]="store.isLoading()"
    />
  `,
  providers: [BookSearchStore],
})
export class BookSearch {
  readonly store = inject(BookSearchStore);

  constructor() {
    const query = this.store.filter.query;
    // 👇 Re-fetch books whenever the value of query signal changes.
    this.store.loadByQuery(query);
  }
}
```

</ngrx-code-example>

<ngrx-docs-alert type="help">

In addition to component lifecycle hooks, SignalStore also offers the ability to define them at the store level.
Learn more about SignalStore lifecycle hooks here.

</ngrx-docs-alert>
