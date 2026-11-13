---
title: "`object-position` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/object-position/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `object-position` CSS property

The **`object-position`** CSS property specifies the alignment of the selected replaced element's contents within the element's box. Areas of the box which aren't covered by the replaced element's object will show the element's background.

You can adjust how the replaced element's object's intrinsic size (that is, its natural size) is adjusted to fit within the element's box using the `object-fit` property.

```css
object-position: 50% 50%;
```

```css
object-position: right top;
```

```css
object-position: left bottom;
```

```css
object-position: 250px 125px;
```

```html
<section id="default-example">
  <img
    class="transition-all"
    id="example-element"
    src="/shared-assets/images/examples/moon.jpg" />
</section>
```

```css
#example-element {
  height: 250px;
  width: 250px;
  object-fit: none;
  border: 1px solid red;
}
```

## Syntax

```css
/* Keyword values */
object-position: top;
object-position: bottom;
object-position: left;
object-position: right;
object-position: center;

/* <percentage> values */
object-position: 25% 75%;

/* <length> values */
object-position: 0 0;
object-position: 1cm 2cm;
object-position: 10ch 8em;

/* Edge offsets values */
object-position: bottom 10px right 20px;
object-position: right 3em bottom 10px;
object-position: top 0 right 10px;

/* Global values */
object-position: inherit;
object-position: initial;
object-position: revert;
object-position: revert-layer;
object-position: unset;
```

### Values

- `<position>`
    From one to four values that define the 2D position of the element. Relative or absolute offsets can be used.

> **Note:**
> The position can be set so that the replaced element is drawn outside its box.

## Examples

### Positioning image content

#### HTML

Here we see HTML that includes two `` elements, each displaying the MDN logo.

```html
<img id="object-position-1" src="mdn.svg" alt="MDN Logo" />
<img id="object-position-2" src="mdn.svg" alt="MDN Logo" />
```

#### CSS

The CSS includes default styling for the `` element itself, as well as separate styles for each of the two images.

```css
img {
  width: 300px;
  height: 250px;
  border: 1px solid black;
  background-color: silver;
  margin-right: 1em;
  object-fit: none;
}

#object-position-1 {
  object-position: 10px;
}

#object-position-2 {
  object-position: 100% 10%;
}
```

The first image is positioned with its left edge inset 10 pixels from the left edge of the element's box. The second image is positioned with its right edge flush against the right edge of the element's box and is located 10% of the way down the height of the element's box.

#### Result

## See also

- Other image-related CSS properties: `object-fit`, `image-orientation`, `image-rendering`, `image-resolution`.
