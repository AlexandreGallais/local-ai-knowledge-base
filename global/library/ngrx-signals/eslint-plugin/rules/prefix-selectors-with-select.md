---
title: "prefix-selectors-with-select"
tool: "ngrx-signals"
version: "22.0"
source: "https://github.com/ngrx/platform/blob/a4995391ef631f1bd60d539f436a1aa5c23c4fe5/projects/www/src/app/pages/guide/eslint-plugin/rules/prefix-selectors-with-select.md"
commit: "a4995391ef631f1bd60d539f436a1aa5c23c4fe5"
license: "MIT"
---

# prefix-selectors-with-select

The selector should start with "select", for example "selectEntity".

- **Type**: suggestion
- **Fixable**: No
- **Suggestion**: Yes
- **Requires type checking**: No
- **Configurable**: No

It's recommended prefixing selector function names with the word "select" combined with a description of the value being selected.

## Rule Details

Examples of **incorrect** code for this rule:

<ngrx-code-example>

```ts
// ⚠ Usage of a selector without any prefix
export const feature = createSelector(
  (state: AppState) => state.feature
);

// ⚠ Usage of a selector without any description
export const select = (id: string) =>
  createSelector((state: AppState) => state.feature);

// ⚠ Usage of a selector with a `get` prefix
export const getFeature: MemoizedSelector<any, any> = (
  state: AppState
) => state.feature;

// ⚠ Usage of a selector with improper casing
const selectfeature = createFeatureSelector<AppState, FeatureState>(
  featureKey
);

// ⚠ Usage of a `createSelectorFactory` without `select` prefix
const createSelector = createSelectorFactory((projectionFun) =>
  defaultMemoize(
    projectionFun,
    orderDoesNotMatterComparer,
    orderDoesNotMatterComparer
  )
);
```

</ngrx-code-example>

Examples of **correct** code for this rule:

<ngrx-code-example>

```ts
export const selectFeature = createSelector(
  (state: AppState) => state.feature
);

export const selectFeature: MemoizedSelector<any, any> = (
  state: AppState
) => state.feature;

const selectFeature = createFeatureSelector<FeatureState>(featureKey);

export const selectThing = (id: string) =>
  createSelector(selectThings, (things) => things[id]);
```

</ngrx-code-example>

## Further reading

- Redux Style Guide
