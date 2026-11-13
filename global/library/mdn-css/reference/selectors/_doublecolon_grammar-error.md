---
title: "`::grammar-error` CSS pseudo-element"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/selectors/_doublecolon_grammar-error/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `::grammar-error` CSS pseudo-element

The **`::grammar-error`** CSS pseudo-element represents a text segment which the user agent has flagged as grammatically incorrect.

The `::grammar-error` pseudo-element follows a special inheritance model common to all highlight pseudo-elements. For more details on how this inheritance works, see the Highlight pseudo-elements inheritance section.

## Allowable properties

Only a small subset of CSS properties can be used in a rule with `::grammar-error` in its selector:

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
::grammar-error {
  /* ... */
}
```

## Examples

### Basic <example-value> grammar check

In this example, eventual supporting browsers should highlight any flagged grammatical errors with the styles shown.

#### HTML

```html
<p contenteditable spellcheck="true">
  My friends is coming to the party tonight.
</p>
```

#### CSS

```css
::grammar-error {
  text-decoration: underline red;
  color: red;
}
```

#### Result

## See also

- `::spelling-error`
- `text-decoration-line`
