---
title: "`text-shadow` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/text-shadow/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `text-shadow` CSS property

The **`text-shadow`** CSS property adds shadows to text. It accepts a comma-separated list of shadows to be applied to the text and any of its `text-decoration`. Each shadow is described by some combination of X and Y offsets from the element, blur radius, and color.

```css
text-shadow: 1px 1px 2px pink;
```

```css
text-shadow: #ffcc00 1px 0 10px;
```

```css
text-shadow: 5px 5px #558abb;
```

```css
text-shadow: red 2px 5px;
```

```css
text-shadow: 5px 10px;
```

```css
text-shadow:
  1px 1px 2px red,
  0 0 1em blue,
  0 0 0.2em blue;
```

```html
<section id="default-example">
  <p id="example-element">
    Far out in the uncharted backwaters of the unfashionable end of the western
    spiral arm of the Galaxy...
  </p>
</section>
```

```css
p {
  font:
    1.5em "Georgia",
    serif;
}
```

## Syntax

```css
/* offset-x | offset-y | blur-radius | color */
text-shadow: 1px 1px 2px black;

/* color | offset-x | offset-y | blur-radius */
text-shadow: #ffcc00 1px 0 10px;

/* offset-x | offset-y | color */
text-shadow: 5px 5px #558abb;

/* color | offset-x | offset-y */
text-shadow: white 2px 5px;

/* offset-x | offset-y
/* Use defaults for color and blur-radius */
text-shadow: 5px 10px;

/* Global values */
text-shadow: inherit;
text-shadow: initial;
text-shadow: revert;
text-shadow: revert-layer;
text-shadow: unset;
```

This property is specified as a comma-separated list of shadows.

Each shadow is specified as two or three `<length>` values, followed optionally by a `<color>` value. The first two `<length>` values are the `<offset-x>` and `<offset-y>` values. The third, optional, `<length>` value is the `<blur-radius>`. The `<color>` value is the shadow's color.

When more than one shadow is given, shadows are applied front-to-back, with the first-specified shadow on top.

This property applies to both `::first-line` and `::first-letter` pseudo-elements.

### Values

- `<color>`
    Optional. The color of the shadow. It can be specified either before or after the offset values. If unspecified, the color's value is left up to the user agent, so when consistency across browsers is desired you should define it explicitly.
- `<offset-x> <offset-y>`
    Required. These `<length>` values specify the shadow's distance from the text. `<offset-x>` specifies the horizontal distance; a negative value places the shadow to the left of the text. `<offset-y>` specifies the vertical distance; a negative value places the shadow above the text. If both values are `0`, the shadow is placed directly behind the text, although it may be partly visible due to the effect of `<blur-radius>`.
- `<blur-radius>`
    Optional. This is a `<length>` value. The higher the value, the bigger the blur; the shadow becomes wider and lighter. If not specified, it defaults to `0`.

## Examples

### Basic <example-value>

```css
.red-text-shadow {
  text-shadow: red 0 -2px;
}
```

```html
<p class="red-text-shadow">
  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
  doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore.
</p>
```

### Multiple shadows

```css
.white-text-with-blue-shadow {
  text-shadow:
    1px 1px 2px black,
    0 0 1em blue,
    0 0 0.2em blue;
  color: white;
  font:
    1.5em "Georgia",
    serif;
}
```

```html
<p class="white-text-with-blue-shadow">
  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
  doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore.
</p>
```

## See also

- Introduction to text shadows
- `<color>`
- `box-shadow`
- `drop-shadow()`
- CSS text decoration module
