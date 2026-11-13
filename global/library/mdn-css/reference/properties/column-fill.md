---
title: "`column-fill` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/column-fill/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `column-fill` CSS property

The **`column-fill`** CSS property controls how an element's contents are balanced when broken into columns.

```css
column-fill: auto;
```

```css
column-fill: balance;
```

```html
<section id="default-example">
  <p id="example-element">
    London. Michaelmas term lately over, and the Lord Chancellor sitting in
    Lincoln's Inn Hall. Implacable November weather.
  </p>
</section>
```

```css
#example-element {
  width: 100%;
  height: 90%;
  columns: 3;
  text-align: left;
}
```

## Syntax

```css
/* Keyword values */
column-fill: auto;
column-fill: balance;

/* Global values */
column-fill: inherit;
column-fill: initial;
column-fill: revert;
column-fill: revert-layer;
column-fill: unset;
```

### Values

This property is specified as one of the following keyword values:

- `auto`
    Columns are filled sequentially. Content takes up only the room it needs, possibly resulting in some columns remaining empty.
- `balance`
    Content is equally divided between columns. In fragmented contexts, such as paged media, only the last fragment is balanced. Therefore in paged media, only the last page would be balanced. This is the default value.

The specification defines a `balance-all` value, in which content is equally divided between columns in fragmented contexts, such as paged media. This value is not yet supported in any browser.

## Examples

### Balancing column content

#### HTML

```html
<p class="fill-auto">
  This paragraph fills columns one at a time. Since all of the text can fit in
  the first column, the others are empty.
</p>

<p class="fill-balance">
  This paragraph attempts to balance the amount of content in each column.
</p>
```

#### CSS

```css
p {
  height: 7em;
  background: #ffff99;
  columns: 3;
  column-rule: 1px solid;
}

p.fill-auto {
  column-fill: auto;
}

p.fill-balance {
  column-fill: balance;
}
```

#### Result

## Browser compatibility

> **Warning:**
> There are some interoperability issues and bugs with `column-fill` across browsers, due to unresolved issues in the specification.
>
> In particular, when using `column-fill: auto` to fill columns sequentially, Chrome will only consult this property if the multicol container has a size in the block dimension (e.g., height in a horizontal writing mode). Firefox will always consult this property, therefore filling the first column with all of the content in cases where there is no size.

## See also

- Learn: Multiple-column Layout
- `column-count`
- `column-width`
