---
title: "`background-clip` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/background-clip/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `background-clip` CSS property

The **`background-clip`** CSS property sets whether an element's background extends underneath its border box, padding box, or content box.

```css
background-clip: border-box;
```

```css
background-clip: padding-box;
```

```css
background-clip: content-box;
```

```css
background-clip: text;
color: transparent;
text-shadow: none;
```

```html
<section id="default-example">
  <div id="example-element">This is the content of the element.</div>
</section>
```

```css
#example-element {
  background-image: url("/shared-assets/images/examples/leopard.jpg");
  color: white;
  text-shadow: 2px 2px black;
  padding: 20px;
  border: 10px dashed #333333;
  font-size: 2em;
  font-weight: bold;
}
```

## Syntax

```css
/* Keyword values */
background-clip: border-box;
background-clip: padding-box;
background-clip: content-box;
background-clip: text;
background-clip: border-area;

/* Global values */
background-clip: inherit;
background-clip: initial;
background-clip: revert;
background-clip: revert-layer;
background-clip: unset;
```

### Values

- `border-box`
    The background extends to the outside edge of the border (but underneath the border in z-ordering).
- `padding-box`
    The background extends to the outside edge of the padding. No background is drawn beneath the border.
- `content-box`
    The background is painted within (clipped to) the content box.
- `text`
    The background is painted within (clipped to) the foreground text.
- `border-area`
    The background is painted within (clipped to) the area painted by the border, taking `border-width` and `border-style` into account but ignoring any transparency introduced by `border-color`.

## Description

The background is always drawn behind the border, so `background-clip: border-box` has a visual effect only when the border is partially opaque or has transparent or partially opaque regions. Also, the `background-clip: text` property has little to no visual effect if the text is fully or partially opaque.

> **Note:**
> Because the root element has a different background painting area, the `background-clip` property has no effect when specified on it. See "The backgrounds of special elements."

> **Note:**
> For documents whose root element is an HTML element: if the computed value of `background-image` on the root element is `none` and its `background-color` is `transparent`, user agents must instead propagate the computed values of the `background` properties from that element's first HTML `<body>` child element. The used values of that `<body>` element's `background` properties are their initial values, and the propagated values are treated as if they were specified on the root element. It is recommended that authors of HTML documents specify the canvas background for the `<body>` element rather than the HTML element.

## Accessibility

When using `background-clip: text`, check that the contrast ratio between the background color and the color of the text placed over it is high enough that people experiencing low vision conditions will be able to read the content of the page.

If the background image does not load, this could also lead to the text becoming unreadable. Add a fallback `background-color` to prevent this from happening, and test without the image.

Consider using feature queries with `@supports` to test for support of `background-clip: text` and provide an accessible alternative where it is not supported.

## Examples

### HTML

```html
<p class="border-box">The background extends behind the border.</p>
<p class="padding-box">
  The background extends to the inside edge of the border.
</p>
<p class="content-box">
  The background extends only to the edge of the content box.
</p>
<p class="text">The background is clipped to the foreground text.</p>
<p class="border-area">
  The background is clipped to the area painted by the border.
</p>
```

### CSS

```css
p {
  border: 0.8em darkviolet;
  border-style: dotted double;
  margin: 1em 0;
  padding: 1.4em;
  background: linear-gradient(60deg, red, yellow, red, yellow, red);
  font: 900 1.2em sans-serif;
  text-decoration: underline;
}

.border-box {
  background-clip: border-box;
}
.padding-box {
  background-clip: padding-box;
}
.content-box {
  background-clip: content-box;
}

.text {
  background-clip: text;
  color: rgb(0 0 0 / 20%);
}

.border-area {
  background-clip: border-area;
  border-color: transparent;
}
```

#### Result

## See also

- The `clip-path` property creates a clipping region that defines what part of an _entire element_ should be displayed.
- Background properties: `background`, `background-color`, `background-image`, `background-origin`
- Introduction to the CSS box model
