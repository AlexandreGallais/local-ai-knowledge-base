---
title: "`<display-inside>` CSS type"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/values/display-inside/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<display-inside>` CSS type

These keywords specify the element's inner `display` type, which defines the type of formatting context that lays out its contents (assuming it is a non-replaced element). These keywords are used as values of the `display` property, and can be used for legacy purposes as a single keyword, or as defined in the Level 3 specification alongside a value from the `<display-outside>` keywords.

## Syntax

Valid `<display-inside>` values:

- `flow`
    The element lays out its contents using flow layout (block-and-inline layout).

    If its outer display type is `inline`, and it is participating in a block or inline formatting context, then it generates an inline box. Otherwise it generates a block container box.

    Depending on the value of other properties (such as `position`, `float`, or `overflow`) and whether it is itself participating in a block or inline formatting context, it either establishes a new block formatting context (BFC) for its contents or integrates its contents into its parent formatting context.

- `flow-root`
    The element generates a block element box that establishes a new block formatting context, defining where the formatting root lies.
- `table`
    These elements behave like HTML `` elements. It defines a block-level box.
- `flex`
    The element behaves like a block element and lays out its content according to the flexbox model.
- `grid`
    The element behaves like a block element and lays out its content according to the grid model.
- `ruby`
    The element behaves like an inline element and lays out its content according to the ruby formatting model. It behaves like the corresponding HTML `<ruby>` elements.

> **Note:**
> Browsers that support the two value syntax, on finding the inner value only, such as when `display: flex` or `display: grid` is specified, will set their outer value to `block`. This will result in expected behavior; for example if you specify an element to be `display: grid`, you would expect that the box created on the grid container would be a block level box.

## Examples

In this example the parent box has been given `display: flow-root` and so establishes a new BFC and contains the floated item.

### HTML

```html
<div class="box">
  <div class="float">I am a floated box!</div>
  <p>I am content inside the container.</p>
</div>
```

### CSS

```css
.box {
  background-color: rgb(224 206 247);
  border: 5px solid rebeccapurple;
  display: flow-root;
}

.float {
  float: left;
  width: 200px;
  height: 150px;
  background-color: white;
  border: 1px solid black;
  padding: 10px;
}
```

## See also

- `display`
  - `<display-outside>`
  - `<display-listitem>`
  - `<display-internal>`
  - `<display-box>`
  - `<display-legacy>`

- Basic <example-value> of flexbox
- Basic <example-value> of grid layout
