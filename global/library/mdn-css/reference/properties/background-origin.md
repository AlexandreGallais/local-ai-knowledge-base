---
title: "`background-origin` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/background-origin/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `background-origin` CSS property

The **`background-origin`** CSS property sets the background's origin: from the border start, inside the border, or inside the padding.

Note that `background-origin` is ignored when `background-attachment` is `fixed`.

```css
background-origin: border-box;
background-repeat: no-repeat;
```

```css
background-origin: padding-box;
background-repeat: no-repeat;
```

```css
background-origin: content-box;
background-repeat: no-repeat;
```

```html
<section id="default-example">
  <div id="example-element">This is the content of the element.</div>
</section>
```

```css
#example-element {
  background-image: url("/shared-assets/images/examples/leopard.jpg");
  color: #d73611;
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
background-origin: border-box;
background-origin: padding-box;
background-origin: content-box;

/* Global values */
background-origin: inherit;
background-origin: initial;
background-origin: revert;
background-origin: revert-layer;
background-origin: unset;
```

### Values

This property is specified as one of the following keyword values:

- `border-box`
    The background is positioned relative to the border box.
- `padding-box`
    The background is positioned relative to the padding box. Default value.
- `content-box`
    The background is positioned relative to the content box.

## Examples

### Setting background origins

```css
.example {
  border: 10px double;
  padding: 10px;
  background: url("image.jpg");
  background-position: center left;
  background-origin: content-box;
}
```

```css
#example2 {
  border: 4px solid black;
  padding: 10px;
  background: url("image.gif");
  background-repeat: no-repeat;
  background-origin: border-box;
}
```

```css
div {
  background-image:
    url("logo.jpg"), url("main-back.png"); /* Applies two images to the background */
  background-position:
    top right,
    0px 0px;
  background-origin: content-box, padding-box;
}
```

### Using two gradients

In this example the box has a thick dotted border. The first gradient uses the `padding-box` as the `background-origin` and therefore the background sits inside the border. The second uses the `content-box` and so only displays behind the content.

```css
.box {
  margin: 10px 0;
  color: white;
  background:
    linear-gradient(
      90deg,
      rgb(131 58 180 / 100%) 0%,
      rgb(253 29 29 / 60%) 60%,
      rgb(252 176 69 / 100%) 100%
    ),
    radial-gradient(circle, white 0%, black 28%);
  border: 20px dashed black;
  padding: 20px;
  width: 400px;
  background-origin: padding-box, content-box;
  background-repeat: no-repeat;
}
```

```html
<div class="box">Hello!</div>
```

## See also

- `background-clip`
