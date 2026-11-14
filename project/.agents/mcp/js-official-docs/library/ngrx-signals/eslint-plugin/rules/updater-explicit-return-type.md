---
title: "updater-explicit-return-type"
tool: "ngrx-signals"
version: "22.0"
source: "https://github.com/ngrx/platform/blob/a4995391ef631f1bd60d539f436a1aa5c23c4fe5/projects/www/src/app/pages/guide/eslint-plugin/rules/updater-explicit-return-type.md"
commit: "a4995391ef631f1bd60d539f436a1aa5c23c4fe5"
license: "MIT"
---

# updater-explicit-return-type

`Updater` should have an explicit return type.

- **Type**: problem
- **Fixable**: No
- **Suggestion**: No
- **Requires type checking**: No
- **Configurable**: No

## Rule Details

To enforce that the `updater` method from `@ngrx/component-store` returns the expected state interface, we must explicitly add the return type.

Examples of **incorrect** code for this rule:

<ngrx-code-example>

```ts
interface MoviesState {
  movies: Movie[];
}

class MoviesStore extends ComponentStore<MoviesState> {
  readonly addMovie = this.updater((state, movie: Movie) => ({
    movies: [...state.movies, movie],
    // ⚠ this doesn't throw, but is caught by the linter
    extra: 'property',
  }));
}
```

</ngrx-code-example>

Examples of **correct** code for this rule:

<ngrx-code-example>

```ts
interface MoviesState {
  movies: Movie[];
}

class MoviesStore extends ComponentStore<MoviesState> {
  readonly addMovie = this.updater(
    (state, movie: Movie): MoviesState => ({
      movies: [...state.movies, movie],
      // ⚠ this does throw
      extra: 'property',
    })
  );
}
```

</ngrx-code-example>
