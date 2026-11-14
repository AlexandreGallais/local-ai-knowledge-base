---
title: "`order` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/order/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `order` CSS property

The **`order`** CSS property sets the order to lay out an item in a flex or grid container. Items in a container are sorted by ascending `order` value and then by their source code order. Items not given an explicit `order` value are assigned the default value of `0`.

```css
order: 0;
```

```css
order: 3;
```

```css
order: -1;
```

```css
order: 2;
```

```html
<section class="default-example" id="default-example">
  <div class="transition-all" id="example-element">Box 1:</div>
  <div style="order: 1">Box 2: <code>order: 1;</code></div>
  <div style="order: 2">Box 3: <code>order: 2;</code></div>
  <div style="order: 2">Box 4: <code>order: 2;</code></div>
  <div style="order: 3">Box 5: <code>order: 3;</code></div>
</section>
```

```css
.default-example {
  max-height: 300px;
  display: flex;
  flex-flow: column;
}

.default-example > div {
  background-color: rgb(0 0 255 / 0.2);
  border: 3px solid blue;
  margin: 0.5rem;
  padding: 0.5rem;
  flex: 1;
}

#example-element {
  background-color: rgb(255 0 200 / 0.2);
  border: 3px solid rebeccapurple;
}

#example-element::after {
  content: attr(style);
  outline: 2px dashed;
  font-family: monospace;
}
```

In the above demo, select the options on the left-hand side to change the value of the pink box's `order` property. The light blue boxes have been given fixed `order` values.

Bear in mind the effect of source order. For example, when `order: 2;` is selected, the pink box is placed before the two blue boxes with `order: 2;`. This is because the pink box appears before the blue boxes in the source code.

## Syntax

```css
/* <integer> values */
order: 5;
order: -5;

/* Global values */
order: inherit;
order: initial;
order: revert;
order: revert-layer;
order: unset;
```

Since `order` is only meant to affect the _visual order_ of elements and not their logical or tab order, it must not be used on non-visual media such as speech.

Defined in the CSS display module, this property impacts only grid and flex items. When `order` is set on an element whose parent's `display` property is not creating a flex or grid container, it has no effect.

### Values

- `<integer>`
    Represents the ordinal group to be used by the item.

## Accessibility

Using the `order` property will create a disconnect between the visual presentation of content and DOM order. This will adversely affect low vision users navigating with the aid of assistive technology such as a screen reader. If the visual order differs from the DOM order, your users will have different experiences depending on how they access your content.

- Flexbox & the keyboard navigation disconnect via Tink (2016)
- Source Order Matters via Adrian Roselli (2015)
- Understanding WCAG, Guideline 1.3 explanations
- Understanding Success Criterion 1.3.2 | W3C Understanding WCAG 2.0

## Examples

### Ordering items in a flex container

In this example, we create a classic two-sidebar layout.

#### HTML

We include a header, a footer, and a main content area. The main content includes an article and two side bars. Note their order! We'll use the CSS `order` property to change their visual order.

```html
<header>Header</header>
<main>
  <article>Article</article>
  <nav>Nav</nav>
  <aside>Aside</aside>
</main>
<footer>Footer</footer>
```

#### CSS

We style the main area using flexible box layout module features; by setting `display` to `flex`, the `` element becomes a flex container. By default, this creates flex items of equal vertical size. The sidebars are both given an absolute `width`, while the `` will consume all the positive free space with a `flex-grow` factor set via the `flex` shorthand.

We then set different `order` property values on each of the flex container's three children; this means the CSS is defining that component's visual order rather than it appearing in the order declared in the HTML.

```css
main {
  display: flex;
  text-align: center;
}
main > article {
  flex: 1;
  order: 2;
}
main > nav {
  width: 200px;
  order: 1;
}
main > aside {
  width: 200px;
  order: 3;
}
```

#### Result

The `` appears first in the source order but visually rendered in the center.

## See also

- Basic <example-value> of flexbox
- Ordering flex items
- CSS grid layout and accessibility
- CSS display module
- Reading order
