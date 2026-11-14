---
title: "Locators | Browser Mode (part 2 of 4)"
tool: "vitest"
version: "5.1"
source: "https://github.com/vitest-dev/vitest/blob/7a3844954d8753fc0d5bed76a96ffd3a21716c22/docs/api/browser/locators.md"
commit: "7a3844954d8753fc0d5bed76a96ffd3a21716c22"
license: "MIT"
---

# Locators | Browser Mode (part 2 of 4)

## filter

```ts
function filter(options: LocatorFilterOptions): Locator
```

This methods narrows down the locator according to the options, such as filtering by text. It can be chained to apply multiple filters.

### has

- **Type:** `Locator`

This options narrows down the selector to match elements that contain other elements matching provided locator. For example, with this HTML:

```html
<article>
  <div>Vitest</div>
</article>
<article>
  <div>Rolldown</div>
</article>
```

We can narrow down the locator to only find the `article` with `Vitest` text inside:

```ts
page.getByRole('article').filter({ has: page.getByText('Vitest') }) // ✅
```

**Warning:**
Provided locator (`page.getByText('Vitest')` in the example) must be relative to the parent locator (`page.getByRole('article')` in the example). It will be queried starting with the parent locator, not the document root.

Meaning, you cannot pass down a locator that queries the element outside of the parent locator:

```ts
page.getByText('Vitest').filter({ has: page.getByRole('article') }) // ❌
```

This example will fail because the `article` element is outside the element with `Vitest` text.

**Tip:**
This method can be chained to narrow down the element even further:

```ts
page.getByRole('article')
  .filter({ has: page.getByRole('button', { name: 'delete row' }) })
  .filter({ has: page.getByText('Vitest') })
```

### hasNot

- **Type:** `Locator`

This option narrows down the selector to match elements that do not contain other elements matching provided locator. For example, with this HTML:

```html
<article>
  <div>Vitest</div>
</article>
<article>
  <div>Rolldown</div>
</article>
```

We can narrow down the locator to only find the `article` that doesn't have `Rolldown` inside.

```ts
page.getByRole('article')
  .filter({ hasNot: page.getByText('Rolldown') }) // ✅
page.getByRole('article')
  .filter({ hasNot: page.getByText('Vitest') }) // ❌
```

**Warning:**
Note that provided locator is queried against the parent, not the document root, just like `has` option.

### hasText

- **Type:** `string | RegExp`

This options narrows down the selector to only match elements that contain provided text somewhere inside. When the `string` is passed, matching is case-insensitive and searches for a substring.

```html
<article>
  <div>Vitest</div>
</article>
<article>
  <div>Rolldown</div>
</article>
```

Both locators will find the same element because the search is case-insensitive:

```ts
page.getByRole('article').filter({ hasText: 'Vitest' }) // ✅
page.getByRole('article').filter({ hasText: 'Vite' }) // ✅
```

### hasNotText

- **Type:** `string | RegExp`

This options narrows down the selector to only match elements that do not contain provided text somewhere inside. When the `string` is passed, matching is case-insensitive and searches for a substring.
