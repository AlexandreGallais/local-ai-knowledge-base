---
title: "`::spelling-error` CSS pseudo-element"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/selectors/_doublecolon_spelling-error/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `::spelling-error` CSS pseudo-element

The **`::spelling-error`** CSS pseudo-element represents a text segment which the user agent has flagged as incorrectly spelled.

The `::spelling-error` pseudo-element follows a special inheritance model common to all highlight pseudo-elements. For more details on how this inheritance works, see the Highlight pseudo-elements inheritance section.

## Allowable properties

Only a small subset of CSS properties can be used in a rule with `::spelling-error` in its selector:

- `color`
- `background-color`
- `cursor`
- `caret-color`
- `outline` and its longhands
- `text-decoration` and its associated properties
- `text-emphasis-color`
- `text-shadow`

## Syntax

```css
::spelling-error {
  /* ... */
}
```

## Examples

### Basic <example-value> spell check

In this example, eventual supporting browsers should highlight any flagged spelling errors with the styles shown.

#### HTML

```html
<p contenteditable spellcheck="true">
  My friends are coegdfgfddffbgning to the party tonight.
</p>
```

#### CSS

```css
::spelling-error {
  text-decoration: wavy red underline;
}
```

#### Result

## See also

- `::grammar-error`
- `text-decoration-line`
