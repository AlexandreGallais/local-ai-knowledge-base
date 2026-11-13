---
title: "`list-style-position` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/list-style-position/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `list-style-position` CSS property

The **`list-style-position`** CSS property sets the position of the `::marker` relative to a list item.

```css
list-style-position: inside;
```

```css
list-style-position: outside;
```

```html
<section class="default-example" id="default-example">
  <div>
    <p>NASA Notable Missions</p>
    <ul class="transition-all" id="example-element">
      <li>Apollo 11: First Human Landing</li>
      <li>City in Space: The International Space Station</li>
      <li>Great Observatory: The Hubble Space Telescope</li>
      <li>Everlasting Mars Rovers</li>
    </ul>
  </div>
</section>
```

```css
.default-example {
  font-size: 1.2rem;
}

#example-element {
  width: 100%;
  background: #be094b;
  color: white;
}

section {
  text-align: left;
  flex-direction: column;
}

hr {
  width: 50%;
  color: lightgray;
  margin: 0.5em;
}

.note {
  font-size: 0.8rem;
}

.note a {
  color: #009e5f;
}

@counter-style space-counter {
  symbols: "\1F680" "\1F6F8" "\1F6F0" "\1F52D";
  suffix: " ";
}
```

## Syntax

```css
/* Keyword values */
list-style-position: inside;
list-style-position: outside;

/* Global values */
list-style-position: inherit;
list-style-position: initial;
list-style-position: revert;
list-style-position: revert-layer;
list-style-position: unset;
```

### Values

This property is specified as one of the following keyword values:

- `inside`
    The `::marker` is the first element among the list item's contents.
- `outside`
    The `::marker` is outside the principal block box. This is the default value for `list-style`.

## Description

This property is applied to list items, i.e., elements with ``display`: list-item;`. By default this includes `` elements. Because this property is inherited, it can be set on the parent element (normally `` or ``) to let it apply to all list items.

If a block element is the first child of a list element declared as `list-style-position: inside`, then the block element is placed on the line after the marker-box.

It is often more convenient to use the shorthand `list-style`.

## Examples

### Setting list item position

#### HTML

```html
<p>List 1</p>
<ul class="inside">
  <li>List Item 1-1</li>
  <li>List Item 1-2</li>
  <li>List Item 1-3</li>
  <li>List Item 1-4</li>
</ul>
<p>List 2</p>
<ul class="outside">
  <li>List Item 2-1</li>
  <li>List Item 2-2</li>
  <li>List Item 2-3</li>
  <li>List Item 2-4</li>
</ul>
<p>List 3</p>
<ul class="inside-img">
  <li>List Item 3-1</li>
  <li>List Item 3-2</li>
  <li>List Item 3-3</li>
  <li>List Item 3-4</li>
</ul>
```

#### CSS

```css
.inside {
  list-style-position: inside;
  list-style-type: square;
}

.outside {
  list-style-position: outside;
  list-style-type: circle;
}

.inside-img {
  list-style-position: inside;
  list-style-image: url("star-solid.gif");
}
```

#### Result

## See also

- `list-style` shorthand
- `list-style-type` property
- `list-style-image` property
- `::marker` pseudo-element
- CSS lists and counters module
- CSS counter styles module
