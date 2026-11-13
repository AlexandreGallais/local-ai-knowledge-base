---
title: "`<gradient>` CSS type"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/values/gradient/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<gradient>` CSS type

The **`<gradient>`** CSS data type is a special type of `image` that consists of a progressive transition between two or more colors.

A CSS gradient has no intrinsic dimensions; i.e., it has no natural or preferred size, nor a preferred ratio. Its concrete size will match the size of the element to which it applies.

```css
background: linear-gradient(#f69d3c, #3f87a6);
```

```css
background: radial-gradient(#f69d3c, #3f87a6);
```

```css
background: repeating-linear-gradient(#f69d3c, #3f87a6 50px);
```

```css
background: repeating-radial-gradient(#f69d3c, #3f87a6 50px);
```

```css
background: conic-gradient(#f69d3c, #3f87a6);
```

```html
<section class="display-block" id="default-example">
  <div id="example-element"></div>
</section>
```

```css
#example-element {
  min-height: 100%;
}
```

## Syntax

The `<gradient>` data type is defined with one of the function types listed below.

### Linear gradient

Linear gradients transition colors progressively along an imaginary line. They are generated with the `linear-gradient()` function.

### Radial gradient

Radial gradients transition colors progressively from a center point (origin). They are generated with the `radial-gradient()` function.

### Conic gradient

Conic gradients transition colors progressively around a circle. They are generated with the `conic-gradient()` function.

### Repeating gradient

Repeating gradients duplicate a gradient as much as necessary to fill a given area. They are generated with the `repeating-linear-gradient()`, `repeating-radial-gradient()`, and `repeating-conic-gradient()` functions.

## Interpolation

As with any interpolation involving colors, gradients are calculated in the alpha-premultiplied color space. This prevents unexpected shades of gray from appearing when both the color and the opacity are changing. (Be aware that older browsers may not use this behavior when using the transparent keyword.)

## Examples

### Linear gradient example

A linear gradient.

```html
<div class="linear-gradient">Linear gradient</div>
```

```css
div {
  width: 240px;
  height: 80px;
}
```

```css
.linear-gradient {
  background: linear-gradient(
    to right,
    red,
    orange,
    yellow,
    green,
    blue,
    indigo,
    violet
  );
}
```

### Radial gradient example

A radial gradient.

```html
<div class="radial-gradient">Radial gradient</div>
```

```css
div {
  width: 240px;
  height: 80px;
}
```

```css
.radial-gradient {
  background: radial-gradient(red, yellow, dodgerblue);
}
```

### Conic gradient example

A conic gradient example.

```html
<div class="conic-gradient">Conic gradient</div>
```

```css
div {
  width: 200px;
  height: 200px;
}
```

```css
.conic-gradient {
  background: conic-gradient(pink, coral, lime);
}
```

### Repeating gradient examples

Repeating linear and radial gradient examples.

```html
<div class="linear-repeat"></div>
<span>Repeating linear gradient</span>
<hr />
<div class="radial-repeat"></div>
<span>Repeating radial gradient</span>
<hr />
<div class="conic-repeat"></div>
<span>Repeating conic gradient</span>
```

```css
div {
  display: inline-block;
  width: 240px;
  height: 80px;
}

span {
  font-weight: bold;
  vertical-align: top;
}
```

```css
.linear-repeat {
  background: repeating-linear-gradient(
    to top left,
    pink,
    pink 5px,
    white 5px,
    white 10px
  );
}

.radial-repeat {
  background: repeating-radial-gradient(
    lime,
    lime 15px,
    white 15px,
    white 30px
  );
}

.conic-repeat {
  background: repeating-conic-gradient(lime, pink 30deg);
}
```

## See also

- Using CSS gradients
- Gradient functions: `linear-gradient()`, `repeating-linear-gradient()`, `radial-gradient()`, `repeating-radial-gradient()`, `conic-gradient()`, `repeating-conic-gradient()`
- CSS Basic Data Types
- CSS values and units module
- Learn: Values and Units
