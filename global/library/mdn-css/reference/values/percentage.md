---
title: "`<percentage>` CSS type"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/values/percentage/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<percentage>` CSS type

The **`<percentage>`** CSS data type represents a percentage value. It is often used to define a size as relative to an element's parent object. Numerous properties can use percentages, such as `width`, `height`, `margin`, `padding`, and `font-size`.

> **Note:**
> Only calculated values can be inherited. Thus, even if a percentage value is used on the parent property, a real value (such as a width in pixels for a `<length>` value) will be accessible on the inherited property, not the percentage value.

## Syntax

The `<percentage>` data type consists of a `<number>` followed by the percentage sign (`%`). Optionally, it may be preceded by a single `+` or `-` sign, although negative values are not valid for all properties. As with all CSS dimensions, there is no space between the symbol and the number.

## Interpolation

When animated, values of the `<percentage>` data type are interpolated as real, floating-point numbers. The speed of the interpolation is determined by the easing function associated with the animation.

## Examples

### Width and margin-left

```html
<div class="container">
  <div class="box1">Width: 50%, Left margin: 20%</div>
  <div class="box2">Width: 30%, Left margin: 60%</div>
</div>
```

```css
.container {
  background-color: navy;
}

.box1 {
  width: 50%;
  margin-left: 20%;
  background-color: chartreuse;
}

.box2 {
  width: 30%;
  margin-left: 60%;
  background-color: pink;
}
```

### Font-size

```html
<div class="container">
  <p>Full-size text (18px)</p>
  <p><span class="half">50% (9px)</span></p>
  <p><span class="double">200% (36px)</span></p>
</div>
```

```css
.container {
  font-size: 18px;
}

.half {
  font-size: 50%;
}

.double {
  font-size: 200%;
}
```

## See also

- `<length-percentage>`
- CSS values and units module
