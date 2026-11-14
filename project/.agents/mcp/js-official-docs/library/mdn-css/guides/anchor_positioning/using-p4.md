---
title: "Using CSS anchor positioning (part 4 of 4)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/anchor_positioning/using/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Using CSS anchor positioning (part 4 of 4)

## Sizing elements based on anchor size

As well as positioning an element relative to its anchor's position, you can also size an element relative to its anchor's size using the `anchor-size()` function within a sizing property value.

Sizing properties that can accept an `anchor-size()` value include:

- `width`
- `height`
- `min-width`
- `min-height`
- `max-width`
- `max-height`
- `block-size`
- `inline-size`
- `min-block-size`
- `min-inline-size`
- `max-block-size`
- `max-inline-size`

`anchor-size()` functions resolve to `length` values. Their syntax looks like this:

```plain
anchor-size(<anchor-name> <anchor-size>, <length-percentage>)
```

- `<anchor-name>`
    The `<dashed-ident>` name set as the value of the `anchor-name` property of the anchor element you want to size the element relative to. If omitted, the element's **default anchor**, which is the anchor referenced in the `position-anchor` property, is used.
- `<anchor-size>`
    Specifies the dimension of the anchor element that the positioned element will be sized relative to. This can be expressed using physical (`width` or `height`) or logical (`inline`, `block`, `self-inline`, or `self-block`) values.
- `length-percentage`
    Specifies the size to use as a fallback value if the element is not absolutely or fixed positioned, or the anchor element doesn't exist.

The most common `anchor-size()` functions you'll use will just refer to a dimension of the default anchor. You can also use them inside `calc` functions, to modify the size applied to the positioned element.

For example, this rule sizes the positioned element's width equal to the default anchor element's width:

```css
.elem {
  width: anchor-size(width);
}
```

This rule sizes the positioned element's inline size to 4 times the anchor element's inline size, with the multiplication being done inside a `calc()` function:

```css
.elem {
  inline-size: calc(anchor-size(self-inline) * 4);
}
```

Let's look at an example. The HTML and base CSS are the same as in the previous examples, except that the anchor element is given a `tabindex="0"` attribute to make it focusable. The infobox is given fixed positioning and associated with the anchor in the same way as before. However, this time around we tether it to the right of the anchor using a `position-area`, and give it a width five times the width of the anchor's width:

```html
<p>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
  incididunt ut labore et dolore magna aliqua. Dui nunc mattis enim ut tellus
  elementum sagittis vitae et.
</p>

<div class="anchor" tabindex="0">⚓︎</div>

<div class="infobox">
  <p>This is an information box.</p>
</div>

<p>
  Nisi quis eleifend quam adipiscing vitae proin sagittis nisl rhoncus. In arcu
  cursus euismod quis viverra nibh cras pulvinar. Vulputate ut pharetra sit amet
  aliquam.
</p>

<p>
  Malesuada nunc vel risus commodo viverra maecenas accumsan lacus. Vel elit
  scelerisque mauris pellentesque pulvinar pellentesque habitant morbi
  tristique. Porta lorem mollis aliquam ut porttitor. Turpis cursus in hac
  habitasse platea dictumst quisque. Dolor sit amet consectetur adipiscing elit.
  Ornare lectus sit amet est placerat. Nulla aliquet porttitor lacus luctus
  accumsan.
</p>
```

```css
.anchor {
  font-size: 1.8rem;
  color: white;
  text-shadow: 1px 1px 1px black;
  background-color: hsl(240 100% 75%);
  width: fit-content;
  border-radius: 10px;
  border: 1px solid black;
  padding: 3px;
}

.anchor {
  anchor-name: --my-anchor;
}

body {
  width: 50%;
  margin: 0 auto;
}

.infobox {
  color: darkblue;
  background-color: azure;
  border: 1px solid #dddddd;
  padding: 10px;
  border-radius: 10px;
  font-size: 1rem;
}
```

```css
.infobox {
  position: fixed;
  position-anchor: --my-anchor;
  position-area: right;
  margin-left: 5px;
  width: calc(anchor-size(width) * 5);
}
```

In addition, we increase the anchor element's `width` on `:hover` and `:focus`, and give it a `transition` so that it animates when the state changes.

```css
.anchor {
  text-align: center;
  width: 30px;
  transition: 1s width;
}

.anchor:hover,
.anchor:focus {
  width: 50px;
}
```

Hover over or tab to the anchor element — the positioned element grows as the anchor grows, demonstrating that the anchor-positioned element's size is relative to its anchor:

## Other uses of `anchor-size()`

You can also use `anchor-size()` in physical and logical inset and margin properties. The sections below explore these uses in more detail, before providing a usage example.

### Setting element position based on anchor size

You can use the `anchor-size()` function within an inset property value to position elements based on their anchor element's size, for example:

```css
left: anchor-size(width);
inset-inline-end: anchor-size(--my-anchor height, 100px);
```

This doesn't position an element relative to the position of its anchor like the `anchor()` function or `position-area` property do (see Positioning elements relative to their anchor, above); the element won't change its position when its anchor does. Instead, the element will be positioned according to the normal rules of `absolute` or `fixed` positioning.

This can be useful in some situations. For example, if your anchor element can only move vertically, and always remains next to the edge of its closest positioned ancestor horizontally, you could use `left: anchor-size(width)` to cause the anchor-positioned element to always be positioned to the right of its anchor, even if the anchor width changes.

### Setting element margin based on anchor size

You can use the `anchor-size()` function within a `margin-*` property value to set element margins based on their anchor element's size, for example:

```css
margin-left: calc(anchor-size(width) / 4);
margin-block-start: anchor-size(--my-anchor self-block, 20px);
```

This can be useful in cases where you want to set an anchor-positioned element's margin to be always equal to the same percentage of the anchor element's width, even when the width changes.

### `anchor-size()` position and margin example

Let's look at an example where we set an anchor-positioned element's margin and position relative to the anchor element's width.

In the HTML, we specify two `` elements, one `anchor` element and one `infobox` element that we'll position relative to the anchor. We give the anchor element a `tabindex` attribute so that it can be focused via the keyboard. We also include filler text to make the `<body>` tall enough to require scrolling, but this has been hidden for the sake of brevity.

```html
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

<p>
  Nisi quis eleifend quam adipiscing vitae proin sagittis nisl rhoncus. In arcu
  cursus euismod quis viverra nibh cras pulvinar.
</p>
```

```html
<div class="anchor" tabindex="0">⚓︎</div>

<div class="infobox">
  <p>Infobox.</p>
</div>
```

```html
<p>Vulputate ut pharetra sit amet aliquam.</p>

<p>
  Malesuada nunc vel risus commodo viverra maecenas accumsan lacus. Vel elit
  scelerisque mauris pellentesque pulvinar pellentesque habitant morbi
  tristique. Porta lorem mollis aliquam ut porttitor. Turpis cursus in hac
  habitasse platea dictumst quisque. Dolor sit amet consectetur adipiscing elit.
  Ornare lectus sit amet est placerat. Nulla aliquet porttitor lacus luctus
  accumsan.
</p>
```

In the CSS, we first declare the `anchor` `` as an anchor element by giving it an `anchor-name`. The positioned element has its `position` property set to `absolute`, and is associated with the anchor element via its `position-anchor` property. We also set absolute `height` and `width` dimensions on the anchor and infobox, and include a `transition` on the anchor so that width changes are smoothly animated when its state changes:

```css
.anchor {
  font-size: 2rem;
  color: white;
  text-shadow: 1px 1px 1px black;
  background-color: hsl(240 100% 75%);
  text-align: center;
  align-content: center;
  outline: 1px solid black;
}

body {
  width: 80%;
  margin: 0 auto;
  position: relative;
}

.infobox {
  align-content: center;
  color: darkblue;
  background-color: azure;
  outline: 1px solid #dddddd;
  font-size: 1rem;
  text-align: center;
}
```

```css
.anchor {
  anchor-name: --my-anchor;
  width: 100px;
  height: 100px;
  transition: 1s all;
}

.infobox {
  position-anchor: --my-anchor;
  position: absolute;
  height: 100px;
  width: 100px;
}
```

Now onto the most interesting part. Here we set the anchor's `width` to `300px` when it is hovered or focused. We then set the infobox's:

- `top` value to `anchor(top)`. This causes the top of the infobox to always stay in line with the top of the anchor.
- `left` value to `anchor-size(width)`. This causes the left of the infobox to be positioned the specified distance away from the left edge of its nearest positioned ancestor. In this case, the specified distance is equal to the anchor element's width and the nearest positioned ancestor is the `<body>` element, so the infobox appears to the right of the anchor.
- `margin-left` value to `calc(anchor-size(width)/4)`. This cases the infobox to always have a left margin separating it and the anchor, equal to a quarter of the anchor's width.

```css
.anchor:hover,
.anchor:focus {
  width: 300px;
}

.infobox {
  top: anchor(top);
  left: anchor-size(width);
  margin-left: calc(anchor-size(width) / 4);
}
```

The rendered result is as follows:

Try tabbing to the anchor or hovering over it with the mouse pointer, and note how the infobox's position and left margin grow in proportion to the anchor element's width.

## See also

- CSS anchor positioning module
- Fallback options and conditional hiding for overflow guide
- Learn: Positioning
- CSS logical properties and values module
- Learn: Sizing items in CSS
