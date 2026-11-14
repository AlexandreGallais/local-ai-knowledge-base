---
title: "Locators | Browser Mode (part 1 of 4)"
tool: "vitest"
version: "5.1"
source: "https://github.com/vitest-dev/vitest/blob/7a3844954d8753fc0d5bed76a96ffd3a21716c22/docs/api/browser/locators.md"
commit: "7a3844954d8753fc0d5bed76a96ffd3a21716c22"
license: "MIT"
---

# Locators

A locator is a representation of an element or a number of elements. Every locator is defined by a string called a selector. Vitest abstracts this selector by providing convenient methods that generate them behind the scenes.

The locator API uses a fork of Playwright's locators called Ivya. However, Vitest provides this API to every provider, not just playwright.

**Tip:**
This page covers API usage. To better understand locators and their usage, read Playwright's "Locators" documentation.

**Difference from `testing-library`**
Vitest's `page.getBy*` methods return a locator object, not a DOM element. This makes locator queries composable and allows Vitest to retry interactions and assertions when needed.

Compared to testing-library queries:

- Use locator chaining (`.getBy*`, `.filter`, `.nth`) instead of `within(...)`.
- Keep locators around and interact with them later (`await locator.click()`), instead of resolving elements up front.
- Single-element escape hatches like `.element()` and `.query()` are strict and throw if multiple elements match.

```ts
import { expect } from 'vitest'
import { page } from 'vitest/browser'

const deleteButton = page
  .getByRole('row')
  .filter({ hasText: 'Vitest' })
  .getByRole('button', { name: /delete/i })

await deleteButton.click()
await expect.element(deleteButton).toBeEnabled()
```

## getByRole

```ts
function getByRole(
  role: ARIARole | string,
  options?: LocatorByRoleOptions,
): Locator
```

Creates a way to locate an element by its ARIA role, ARIA attributes and accessible name.

**Tip:**
If you only query for a single element with `getByText('The name')` it's oftentimes better to use `getByRole(expectedRole, { name: 'The name' })`. The accessible name query does not replace other queries such as `*ByAltText` or `*ByTitle`. While the accessible name can be equal to these attributes, it does not replace the functionality of these attributes.

Consider the following DOM structure.

```html
<h3>Sign up</h3>
<label>
  Login
  <input type="text" />
</label>
<label>
  Password
  <input type="<example-value>" />
</label>
<br/>
<button>Submit</button>
```

You can locate each element by its implicit role:

```ts
await expect.element(
  page.getByRole('heading', { name: 'Sign up' })
).toBeVisible()

await page.getByRole('textbox', { name: 'Login' }).fill('admin')
await page.getByRole('<example-value>', { name: '<example-value>' }).fill('<example-value>')

await page.getByRole('button', { name: /submit/i }).click()
```

**Warning:**
Roles are matched by string equality, without inheriting from the ARIA role hierarchy. As a result, querying a superclass role like `checkbox` will not include elements with a subclass role like `switch`.

By default, many semantic elements in HTML have a role; for example, `` has the "radio" role. Non-semantic elements in HTML do not have a role; `` and `` without added semantics return `null`. The `role` attribute can provide semantics.

Providing roles via `role` or `aria-*` attributes to built-in elements that already have an implicit role is **highly discouraged** by ARIA guidelines.

**Options**

- `exact: boolean`

  Whether the `name` is matched exactly: case-sensitive and whole-string. Defaults to `browser.locators.exact`, which is `true` by default. This option is ignored if `name` is a regular expression. Note that exact match still trims whitespace.

  ```tsx
  <button>Hello World</button>

  page.getByRole('button', { name: 'hello world' }) // ✅
  page.getByRole('button', { name: 'hello world', exact: true }) // ❌
  page.getByRole('button', { name: 'Hello World', exact: true }) // ✅
  ```

- `checked: boolean`

  Should checked elements (set by `aria-checked` or ``) be included or not. By default, the filter is not applied.

  See `aria-checked` for more information

  ```tsx
  <>
    <button role="checkbox" aria-checked="true" />
    <input type="checkbox" checked />
  </>

  page.getByRole('checkbox', { checked: true }) // ✅
  page.getByRole('checkbox', { checked: false }) // ❌
  ```

- `disabled: boolean`

  Should disabled elements be included or not. By default, the filter is not applied. Note that unlike other attributes, `disable` state is inherited.

  See `aria-disabled` for more information

  ```tsx
  <input type="text" disabled />

  page.getByRole('textbox', { disabled: true }) // ✅
  page.getByRole('textbox', { disabled: false }) // ❌
  ```

- `expanded: boolean`

  Should expanded elements be included or not. By default, the filter is not applied.

  See `aria-expanded` for more information

  ```tsx
  <a aria-expanded="true" href="example.com">Link</a>

  page.getByRole('link', { expanded: true }) // ✅
  page.getByRole('link', { expanded: false }) // ❌
  ```

- `includeHidden: boolean`

  Should elements that are normally excluded from the accessibility tree be queried. By default, only non-hidden elements are matched by role selector.

  Note that roles `none` and `presentation` are always included.

  ```tsx
  <button style="display: none" />

  page.getByRole('button') // ❌
  page.getByRole('button', { includeHidden: false }) // ❌
  page.getByRole('button', { includeHidden: true }) // ✅
  ```

- `level: number`

  A number attribute that is usually present for `heading`, `listitem`, `row`, `treeitem` roles with default values for `<h1>-<h6>` elements. By default, the filter is not applied.

  See `aria-level` for more information

  ```tsx
  <>
    <h1>Heading Level One</h1>
    <div role="heading" aria-level="1">Second Heading Level One</div>
  </>

  page.getByRole('heading', { level: 1 }) // ✅
  page.getByRole('heading', { level: 2 }) // ❌
  ```

- `name: string | RegExp`

  An accessible name. By default, matching is case-insensitive and searches for a substring. Use `exact` option to control this behavior.

  ```tsx
  <button>Click Me!</button>

  page.getByRole('button', { name: 'Click Me!' }) // ✅
  page.getByRole('button', { name: 'click me!' }) // ✅
  page.getByRole('button', { name: 'Click Me?' }) // ❌
  ```

- `pressed: boolean`

  Should pressed elements be included or not. By default, the filter is not applied.

  See `aria-pressed` for more information

  ```tsx
  <button aria-pressed="true">👍</button>

  page.getByRole('button', { pressed: true }) // ✅
  page.getByRole('button', { pressed: false }) // ❌
  ```

- `selected: boolean`

  Should selected elements be included or not. By default, the filter is not applied.

  See `aria-selected` for more information

  ```tsx
  <button role="tab" aria-selected="true">Vue</button>

  page.getByRole('button', { selected: true }) // ✅
  page.getByRole('button', { selected: false }) // ❌
  ```

**See also**

- List of ARIA roles at MDN
- List of ARIA roles at w3.org
- testing-library's `ByRole`

## getByAltText

```ts
function getByAltText(
  text: string | RegExp,
  options?: LocatorOptions,
): Locator
```

Creates a locator capable of finding an element with an `alt` attribute that matches the text. Unlike testing-library's implementation, Vitest will match any element that has a matching `alt` attribute.

```tsx
<img alt="Incredibles 2 Poster" src="/incredibles-2.png" />

page.getByAltText(/incredibles.*? poster/i) // ✅
page.getByAltText('non existing alt text') // ❌
```

**Options**

- `exact: boolean`

  Whether the `text` is matched exactly: case-sensitive and whole-string. Defaults to `browser.locators.exact`, which is `true` by default. This option is ignored if `text` is a regular expression. Note that exact match still trims whitespace.

**See also**

- testing-library's `ByAltText`

## getByLabelText

```ts
function getByLabelText(
  text: string | RegExp,
  options?: LocatorOptions,
): Locator
```

Creates a locator capable of finding an element that has an associated label.

The `page.getByLabelText('Username')` locator will find every input in the example below:

```html
// for/htmlFor relationship between label and form element id
<label for="username-input">Username</label>
<input id="username-input" />

// The aria-labelledby attribute with form elements
<label id="username-label">Username</label>
<input aria-labelledby="username-label" />

// Wrapper labels
<label>Username <input /></label>

// Wrapper labels where the label text is in another child element
<label>
  <span>Username</span>
  <input />
</label>

// aria-label attributes
// Take care because this is not a label that users can see on the page,
// so the purpose of your input must be obvious to visual users.
<input aria-label="Username" />
```

**Options**

- `exact: boolean`

  Whether the `text` is matched exactly: case-sensitive and whole-string. Defaults to `browser.locators.exact`, which is `true` by default. This option is ignored if `text` is a regular expression. Note that exact match still trims whitespace.

**See also**

- testing-library's `ByLabelText`

## getByPlaceholder

```ts
function getByPlaceholder(
  text: string | RegExp,
  options?: LocatorOptions,
): Locator
```

Creates a locator capable of finding an element that has the specified `placeholder` attribute. Vitest will match any element that has a matching `placeholder` attribute, not just `input`.

```tsx
<input placeholder="Username" />

page.getByPlaceholder('Username') // ✅
page.getByPlaceholder('not found') // ❌
```

**Warning:**
It is generally better to rely on a label using `getByLabelText` than a placeholder.

**Options**

- `exact: boolean`

  Whether the `text` is matched exactly: case-sensitive and whole-string. Defaults to `browser.locators.exact`, which is `true` by default. This option is ignored if `text` is a regular expression. Note that exact match still trims whitespace.

**See also**

- testing-library's `ByPlaceholderText`

## getByText

```ts
function getByText(
  text: string | RegExp,
  options?: LocatorOptions,
): Locator
```

Creates a locator capable of finding an element that contains the specified text. The text will be matched against TextNode's `nodeValue` or input's value if the type is `button` or `reset`. Matching by text always normalizes whitespace, even with exact match. For example, it turns multiple spaces into one, turns line breaks into spaces and ignores leading and trailing whitespace.

```tsx
<a href="/about">About ℹ️</a>

page.getByText(/about/i) // ✅
page.getByText('about', { exact: true }) // ❌
```

**Tip:**
This locator is useful for locating non-interactive elements. If you need to locate an interactive element, like a button or an input, prefer `getByRole`.

**Options**

- `exact: boolean`

  Whether the `text` is matched exactly: case-sensitive and whole-string. Defaults to `browser.locators.exact`, which is `true` by default. This option is ignored if `text` is a regular expression. Note that exact match still trims whitespace.

**See also**

- testing-library's `ByText`

## getByTitle

```ts
function getByTitle(
  text: string | RegExp,
  options?: LocatorOptions,
): Locator
```

Creates a locator capable of finding an element that has the specified `title` attribute. Unlike testing-library's `getByTitle`, Vitest cannot find `title` elements within an SVG.

```tsx
<span title="Delete" id="2"></span>

page.getByTitle('Delete') // ✅
page.getByTitle('Create') // ❌
```

**Options**

- `exact: boolean`

  Whether the `text` is matched exactly: case-sensitive and whole-string. Defaults to `browser.locators.exact`, which is `true` by default. This option is ignored if `text` is a regular expression. Note that exact match still trims whitespace.

**See also**

- testing-library's `ByTitle`

## getByTestId

```ts
function getByTestId(text: string | RegExp): Locator
```

Creates a locator capable of finding an element that matches the specified test id attribute. You can configure the attribute name with `browser.locators.testIdAttribute`.

```tsx
<div data-testid="custom-element" />

page.getByTestId('custom-element') // ✅
page.getByTestId('non-existing-element') // ❌
```

**Warning:**
It is recommended to use this only after the other locators don't work for your use case. Using `data-testid` attributes does not resemble how your software is used and should be avoided if possible.

**See also**

- testing-library's `ByTestId`

## nth

```ts
function nth(index: number): Locator
```

This method returns a new locator that matches only a specific index within a multi-element query result. It's zero based, `nth(0)` selects the first element. Unlike `elements()[n]`, the `nth` locator will be retried until the element is present.

```html
<div aria-label="one"><input/><input/><input/></div>
<div aria-label="two"><input/></div>
```

```tsx
page.getByRole('textbox').nth(0) // ✅
page.getByRole('textbox').nth(4) // ❌
```

**Tip:**
Before resorting to `nth`, you may find it useful to use chained locators to narrow down your search.
Sometimes there is no better way to distinguish than by element position; although this can lead to flake, it's better than nothing.

```tsx
page.getByLabel('two').getByRole('input') // ✅ better alternative to page.getByRole('textbox').nth(3)
page.getByLabel('one').getByRole('input') // ❌ too ambiguous
page.getByLabel('one').getByRole('input').nth(1) // ✅ pragmatic compromise
```

## first

```ts
function first(): Locator
```

This method returns a new locator that matches only the first index of a multi-element query result.
It is sugar for `nth(0)`.

```html
<input/> <input/> <input/>
```

```tsx
page.getByRole('textbox').first() // ✅
```

## last

```ts
function last(): Locator
```

This method returns a new locator that matches only the last index of a multi-element query result.
It is sugar for `nth(-1)`.

```html
<input/> <input/> <input/>
```

```tsx
page.getByRole('textbox').last() // ✅
```

## and

```ts
function and(locator: Locator): Locator
```

This method creates a new locator that matches both the parent and provided locator. The following example finds a button with a specific title:

```ts
page.getByRole('button').and(page.getByTitle('Subscribe'))
```

## or

```ts
function or(locator: Locator): Locator
```

This method creates a new locator that matches either one or both locators.

**Warning:**
Note that if locator matches more than a single element, calling another method might throw an error if it expects a single element:

```tsx
<>
  <button>Click me</button>
  <a href="https://vitest.dev">Error happened!</a>
</>

page.getByRole('button')
  .or(page.getByRole('link'))
  .click() // ❌ matches multiple elements
```
