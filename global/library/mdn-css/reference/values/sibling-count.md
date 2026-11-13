---
title: "`sibling-count()` CSS function"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/values/sibling-count/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `sibling-count()` CSS function

The **`sibling-count()`** CSS function returns an integer representing the total number of sibling DOM elements (direct children of the parent) of the element on which it is used, including itself.

> **Note:**
> The `counter()` function provides a similar result but it returns a `<string>` (which is more suitable for generated content, while `sibling-count()` returns an `<integer>` (which can be used for calculations).

## Syntax

```css
sibling-count()
```

### Parameters

The `sibling-count()` function doesn't accept parameters.

### Return value

An integer; the total number of sibling DOM elements including the element itself.

## Examples

### Dynamic column count

This example demonstrates setting the width of each item in a list based on the number of items, enabling placing each child in its own column.

#### HTML

We include a `` container and several `` elements children.

```html
<ul>
  <li>One</li>
  <li>Two</li>
  <li>Three</li>
  <li>Four</li>
  <li>Five</li>
</ul>
```

#### CSS

We divide the `width` of each list item by the number of direct children the list contains. We also set every odd element to have a `background-color` to better demonstrate the resulting effect.

```css
ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  text-align: center;
  display: flex;
}

li {
  width: calc(100% / sibling-count());
}

li:nth-of-type(odd) {
  background-color: rgb(0 0 0 / 0.05);
}
```

#### Results

## See also

- `sibling-index()`
- `calc`
