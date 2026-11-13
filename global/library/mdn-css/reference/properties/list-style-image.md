---
title: "`list-style-image` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/list-style-image/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `list-style-image` CSS property

The **`list-style-image`** CSS property sets an image to be used as the list item marker.

It is often more convenient to use the shorthand `list-style`.

```css
list-style-image: url("/shared-assets/images/examples/rocket.svg");
```

```css
list-style-image: none;
```

```html
<section class="default-example" id="default-example">
  <div>
    <p>NASA Notable Missions</p>
    <ul class="transition-all unhighlighted" id="example-element">
      <li>Apollo</li>
      <li>Hubble</li>
      <li>Chandra</li>
      <li>Cassini-Huygens</li>
      <li>Spitzer</li>
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

> **Note:**
> This property is applied to list items, i.e., elements with ``display`: list-item;` by default this includes `` elements. Because this property is inherited, it can be set on the parent element (normally `` or ``) to let it apply to all list items.

## Syntax

```css
/* Keyword value */
list-style-image: none;

/* <url> values */
list-style-image: url("star-solid.gif");

/* valid image values */
list-style-image: linear-gradient(to left bottom, red, blue);

/* Global values */
list-style-image: inherit;
list-style-image: initial;
list-style-image: revert;
list-style-image: revert-layer;
list-style-image: unset;
```

### Values

This property is specified as a single value from the following list:

- `image`
    A valid image to use as the marker.
- `none`
    Specifies that no image is used as the marker. If this value is set, the marker defined in `list-style-type` will be used instead. This is the default value for `list-style`.

## Examples

### Using a url value

This example has a star as a marker, which we include using the `<url>` image function.

#### HTML

```html
<ul>
  <li>Item 1</li>
  <li>Item 2</li>
</ul>
```

#### CSS

```css
ul {
  list-style-image: url("star-solid.gif");
}
```

#### Result

### Using a gradient

This example has a CSS gradient as a marker, which we create uses the `linear-gradient()` image function.

#### HTML

```html
<ul>
  <li>Item 1</li>
  <li>Item 2</li>
</ul>
```

#### CSS

```css
ul {
  font-size: 200%;
  list-style-image: linear-gradient(to left bottom, red, blue);
}
```

#### Result

## See also

- `list-style` shorthand
- `list-style-type` property
- `list-style-position` property
- `::marker` pseudo-element
- CSS lists and counters module
- CSS counter styles module
