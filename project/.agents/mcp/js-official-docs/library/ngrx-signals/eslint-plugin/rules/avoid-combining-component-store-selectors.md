---
title: "avoid-combining-component-store-selectors"
tool: "ngrx-signals"
version: "22.0"
source: "https://github.com/ngrx/platform/blob/a4995391ef631f1bd60d539f436a1aa5c23c4fe5/projects/www/src/app/pages/guide/eslint-plugin/rules/avoid-combining-component-store-selectors.md"
commit: "a4995391ef631f1bd60d539f436a1aa5c23c4fe5"
license: "MIT"
---

# avoid-combining-component-store-selectors

Prefer combining selectors at the selector level.

- **Type**: suggestion
- **Fixable**: No
- **Suggestion**: No
- **Requires type checking**: No
- **Configurable**: No

## Rule Details

Examples of **incorrect** code for this rule:

### Enrich state with other state in component

<ngrx-code-example>

```ts
export class Component extends ComponentStore<MoviesState> {
  all$ = combineLatest(
    this.select((state) => state.movies),
    this.select((state) => state.books)
  );

  constructor() {
    super({ movies: [], books: [] });
  }
}
```

</ngrx-code-example>

### Filter state in component

```ts
export class Component extends ComponentStore<MoviesState> {
  movie$ = combineLatest(
    this.select((state) => state.movies),
    this.select((state) => state.selectedId)
  ).pipe(map(([movies, selectedId]) => movies[selectedId]));

  constructor() {
    super({ movies: [] });
  }
}
```

Examples of **correct** code for this rule:

### Enrich state with other state in selector

```ts
export class Component extends ComponentStore<StoreState> {
  movies$ = this.select((state) => state.movies);
  books$ = this.select((state) => state.books);
  all$ = this.select(this.movies$, this.books$, ([movies, books]) => {
    return {
      movies,
      books,
    };
  });

  constructor() {
    super({ movies: [], books: [] });
  }
}
```

### Filter state in selector

<ngrx-code-example>

```ts
export class Component extends ComponentStore<MoviesState> {
  movies$ = this.select((state) => state.movies);
  selectedId$ = this.select((state) => state.selectedId);
  movie$ = this.select(
    this.movies$,
    this.selectedId$,
    ([movies, selectedId]) => movies[selectedId]
  );

  constructor() {
    super({ movies: [] });
  }
}
```

</ngrx-code-example>
