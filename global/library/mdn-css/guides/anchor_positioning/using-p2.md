---
title: "Using CSS anchor positioning (part 2 of 4)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/anchor_positioning/using/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Using CSS anchor positioning (part 2 of 4)

## Positioning elements relative to their anchor

As we saw earlier, associating a positioned element with an anchor is not really much use on its own. Our goal is to place the positioned element relative to its associated anchor element. This is done either by setting a CSS `anchor()` function value on an inset property, specifying a `position-area`, or centering the positioned element with the `anchor-center` placement value.

> **Note:**
> CSS anchor positioning also provides mechanisms for specifying fallback positions if the positioned element's default position causes it to overflow the viewport. See the Fallback options and conditional hiding guide for details.

> **Note:**
> The anchor element must be a visible DOM node for the association and positioning to work. If it is hidden (for example via `display: none`), the positioned element will be positioned relative to its nearest positioned ancestor. We discuss how to hide an anchor-positioned element when its anchor disappears in Conditional hiding using `position-visibility`.

### Using inset properties with `anchor()` function values

Conventional absolutely and fixed positioned elements are explicitly positioned by setting `length` or `percentage` values on inset properties. With `position: absolute`, this inset position value is an absolute distance relative to the edges of the nearest positioned ancestor. With `position: fixed`, the inset position value is an absolute distance relative to the viewport.

CSS anchor positioning changes this paradigm, enabling anchor-positioned elements to be placed relative to the edges of their associated anchor(s). The module defines the `anchor()` function, which is a valid value for each of the inset properties. When used, the function sets the inset position value as an absolute distance relative to the anchor element by defining the anchor element, the side of the anchor element the positioned element is being positioned relative to, and the distance from that side.

The function components look like this:

```plain
anchor(<anchor-name> <anchor-side>, <fallback>)
```

- `<anchor-name>`
    The `anchor-name` property value of the anchor element you want to position the element's side relative to. This is a `<dashed-ident>` value. If omitted, the element's **default anchor** is used. This is the anchor referenced in its `position-anchor` property, or associated with the element via the non-standard `anchor` HTML attribute.
    > **Note:**
    > Specifying an `<anchor-name>` positions the element relative to that anchor, but does not provide element association. While you can position an element's sides relative to multiple anchors by specifying different `<anchor-name>` values inside different `anchor()` functions on the same element, the positioned element is only associated with a single anchor.

- `<anchor-side>`
    Specifies the position relative to a side, or sides, of the anchor. Valid values include the `center` of the anchor, physical (`top`, `left`, etc.) or logical (`start`, `self-end`, etc.) sides of the anchor, or a `<percentage>` between the start (`0%`) and end (`100%`) of the axis of the inset property `anchor()` is set on. If a value is used that is not compatible with the inset property on which the `anchor()` function is set, the fallback value is used.

- `<fallback>`
    A `length-percentage` defining the distance to use as a fallback value if the element is not absolutely or fixed positioned, if the `<anchor-side>` value used is not compatible with the inset property on which the `anchor()` function is set, or if the anchor element doesn't exist.

The return value of the `anchor()` function is a length value calculated based on the position of the anchor. If you set a length or percentage directly on an anchor-positioned element's inset property, it is positioned as if it were not bound to the anchor element. This is the same behavior seen if the `<anchor-side>` value is incompatible with the inset property on which it is set and the fallback is used. These two declarations are equivalent:

```css
bottom: anchor(right, 50px);
bottom: 50px;
```

Both will place the positioned element `50px` above the bottom of the element's closest positioned ancestor (if any) or of the initial containing block.

The most common `anchor()` parameters you'll use will refer to a side of the default anchor. You will also often either add a `margin` to create spacing between the edge of the anchor and positioned element or use `anchor()` within a `calc()` function to add that spacing.

For example, this rule positions the left edge of the positioned element flush to the anchor element's right edge, then adds some `margin-left` to make some space between the edges:

```css
.positionedElement {
  left: anchor(right);
  margin-left: 10px;
}
```

The return value of an `anchor()` function is a length. This means you can use it within a `calc()` function. This rule positions the positioned element's logical block end edge `10px` from the anchor element's logical block start edge, adding the spacing using the `calc()` function so we don't need to add a margin:

```css
.positionedElement {
  inset-block-end: calc(anchor(start) + 10px);
}
```

#### `anchor()` example

Let's look at an example of `anchor()` in action. We've used the same HTML as in the previous examples, but with some filler text placed below and above it to cause the content to overflow its container and scroll. We'll also give the anchor element the same `anchor-name` as in the previous examples:

```html
<p>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
  incididunt ut labore et dolore magna aliqua. Dui nunc mattis enim ut tellus
  elementum sagittis vitae et.
</p>

<div class="anchor">⚓︎</div>

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

body {
  width: 50%;
  margin: 0 auto;
}
```

```css
.anchor {
  anchor-name: --my-anchor;
}
```

The infobox is associated with the anchor via the anchor name and given fixed positioning. By including the `inset-block-start` and `inset-inline-start` properties (which are equivalent to `top` and `left` in horizontal left-to-right writing modes) we have tethered it to the anchor. We add a `margin` to the infobox to add space between the positioned element and its anchor:

```css
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
  position-anchor: --my-anchor;
  position: fixed;
  inset-block-start: anchor(end);
  inset-inline-start: anchor(self-end);
  margin: 5px 0 0 5px;
}
```

Let's look at the inset property positioning declarations in more detail:

- `inset-block-start: anchor(end)`: This sets the positioned element's block start edge to the anchor's block end edge, calculated using the `anchor(end)` function.
- `inset-inline-start: anchor(self-end)`: This sets the positioned element's inline start edge to the anchor's inline end edge, calculated using the `anchor(self-end)` function.

This gives us the following result:

The positioned element is `5px` below and `5px` to the right of the anchor element. If you scroll the document up and down, the positioned element maintains its position relative to the anchor element — it is fixed to the anchor element, not the viewport.

> **Note:**
> When positioning elements relative to implicit anchors using `anchor()`, some additional steps are required, such as resetting default popover property values, and setting `position-anchor: auto` to opt in to the implicit association. See Popover anchor positioning for more information.
