---
title: "`resize` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/resize/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `resize` CSS property

The **`resize`** CSS property sets whether an element is resizable, and if so, in which directions.

```css
resize: both;
```

```css
resize: horizontal;
```

```css
resize: vertical;
```

```css
resize: none;
```

```html
<section class="default-example" id="default-example">
  <div id="example-element">Try resizing this element.</div>
</section>
```

```css
#example-element {
  background: linear-gradient(135deg, cyan 0%, cyan 94%, white 95%);
  border: 3px solid #c5c5c5;
  overflow: auto;
  width: 250px;
  height: 250px;
  font-weight: bold;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
}
```

`resize` does not apply to the following:

- Inline elements
- Block elements for which the `overflow` property is set to `visible` or `clip`

## Syntax

```css
/* Keyword values */
resize: none;
resize: both;
resize: horizontal;
resize: vertical;
resize: block;
resize: inline;

/* Global values */
resize: inherit;
resize: initial;
resize: revert;
resize: revert-layer;
resize: unset;
```

### Values

This property is specified as one of the following keyword values:

- `none`
    The element offers no user-controllable method for resizing it.
- `both`
    The element displays a mechanism for allowing the user to resize it, which may be resized both horizontally and vertically.
- `horizontal`
    The element displays a mechanism for allowing the user to resize it in the _horizontal_ direction.
- `vertical`
    The element displays a mechanism for allowing the user to resize it in the _vertical_ direction.
- `block`
    The element displays a mechanism for allowing the user to resize it in the _block_ direction (either horizontally or vertically, depending on the `writing-mode` and `direction` value).
- `inline`
    The element displays a mechanism for allowing the user to resize it in the _inline_ direction (either horizontally or vertically, depending on the `writing-mode` and `direction` value).

## Examples

### Disabling resizability of text areas

In many browsers, `<textarea>` elements are resizable by default. You may override this behavior with the `resize` property.

#### HTML

```html
<textarea>Type some text here.</textarea>
```

#### CSS

```css
textarea {
  resize: none; /* Disables resizability */
}
```

#### Result

### Using resize with arbitrary elements

You can use the `resize` property to make any element resizable. In the example below, a resizable `` contains a resizable paragraph (`` element).

#### HTML

```html
<div class="resizable">
  <p class="resizable">
    This paragraph is resizable in all directions, because the CSS `resize`
    property is set to `both` on this element.
  </p>
</div>
```

#### CSS

```css
.resizable {
  resize: both;
  overflow: scroll;
  border: 1px solid black;
}

div {
  height: 300px;
  width: 300px;
}

p {
  height: 200px;
  width: 200px;
}
```

#### Result

## See also

- `<textarea>`
