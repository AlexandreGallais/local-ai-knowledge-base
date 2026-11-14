---
title: "Next-sibling combinator"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/selectors/next-sibling_combinator/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Next-sibling combinator

The **next-sibling combinator** (`+`) separates two selectors and matches the second element only if it _immediately_ follows the first element, and both are children of the same parent `element`.

```css
/* Paragraphs that come immediately after any image */
img + p {
  font-weight: bold;
}
```

## Syntax

```css
/* The white space around the + combinator is optional but recommended. */
former_element + target_element { style properties }
```

## Examples

### Basic usage

This example demonstrates how to select the next sibling if that next sibling is of a specific type.

#### HTML

```html
<ul>
  <li>One</li>
  <li>Two!</li>
  <li>Three</li>
</ul>
```

#### CSS

We only style the `` that comes immediately after an `` that is the first of its type:

```css
li:first-of-type + li {
  color: red;
  font-weight: bold;
}
```

#### Result

### Selecting a previous sibling

The next-sibling combinator can be included within the `:has()` functional selector to select the previous sibling.

#### HTML

```html
<ul>
  <li>One</li>
  <li>Two</li>
  <li>Three!</li>
  <li>Four</li>
</ul>
```

#### CSS

We only style the `` with a next sibling that is an `` that is the last of its type:

```css
li:has(+ li:last-of-type) {
  color: red;
  font-weight: bold;
}
```

#### Result

## See also

- Subsequent-sibling combinator
