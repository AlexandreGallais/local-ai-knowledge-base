---
title: "`scaleX()` CSS function"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/css/reference/values/transform-function/scalex/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# `scaleX()` CSS function

The **`scaleX()`** CSS function defines a transformation that resizes an element along the
x-axis (horizontally). Its result is a `<transform-function>` data type.

```css
transform: scaleX(1);
```

```css
transform: scaleX(0.7);
```

```css
transform: scaleX(1.3);
```

```css
transform: scaleX(-0.5);
```

```html
<section id="default-example">
  <img
    class="transition-all"
    id="example-element"
    src="/shared-assets/images/examples/firefox-logo.svg"
    width="200" />
</section>
```

It modifies the abscissa (horizontal, x-coordinate) of each element point by a constant factor, except when the scale factor is 1, in which case
the function is the identity transform. The scaling is not isotropic, and the angles of the element are generally not conserved, except for multiples of 90 degrees.
`scaleX(-1)` defines an axial symmetry, with a vertical axis passing through the origin (as specified by the `transform-origin`
property).

> **Note:**
> `scaleX(sx)` is equivalent to
> `scale(sx, 1)` or
> `scale3d(sx, 1, 1)`.

## Syntax

```css
scaleX(s)
```

### Values

- `s`
    Is a `<number>` representing the scaling factor to apply on the abscissa (horizontal, x-coordinate) of each point of the
    element.

       | Cartesian coordinates on ℝ^2
       | Homogeneous coordinates on ℝℙ^2
       | Cartesian coordinates on ℝ^3
       | Homogeneous coordinates on ℝℙ^3

       |
        <math display="block">
          <semantics><mrow><mo>(</mo><mtable><mtr><mtd><mi>s</mi></mtd><mtd><mn>0</mn></mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>1</mn></mtd></mtr></mtable><mo>)</mo></mrow><annotation encoding="TeX">\left( \begin{array}{cc} s & 0 \\ 0 & 1 \end{array} \right)</annotation></semantics>
        </math>

       |
        <math display="block">
          <semantics><mrow><mo>(</mo><mtable><mtr><mtd><mi>s</mi></mtd><mtd><mn>0</mn></mtd><mtd><mn>0</mn></mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>0</mn></mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>1</mn></mtd></mtr></mtable><mo>)</mo></mrow><annotation encoding="TeX">\left( \begin{array}{ccc} s & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 1 \end{array} \right)</annotation></semantics>
        </math>

       |
        <math display="block">
          <semantics><mrow><mo>(</mo><mtable><mtr><mtd><mi>s</mi></mtd><mtd><mn>0</mn></mtd><mtd><mn>0</mn></mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>0</mn></mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>1</mn></mtd></mtr></mtable><mo>)</mo></mrow><annotation encoding="TeX">\left( \begin{array}{ccc} s & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 1 \end{array} \right)</annotation></semantics>
        </math>

       |
        <math display="block">
          <semantics><mrow><mo>(</mo><mtable><mtr><mtd><mi>s</mi></mtd><mtd><mn>0</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>0</mn></mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>0</mn></mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>0</mn></mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>1</mn></mtd></mtr></mtable><mo>)</mo></mrow><annotation encoding="TeX">\left( \begin{array}{cccc} s & 0 & 0 & 0 \\ 0 & 1 & 0 & 0 \\ 0 & 0 & 1 & 0 \\ 0 & 0 & 0 & 1 \end{array} \right)</annotation></semantics>
        </math>

       | `[s 0 0 1 0 0]`

## Examples

### HTML

```html
<div>Normal</div>
<div class="scaled">Scaled</div>
```

### CSS

```css
div {
  width: 80px;
  height: 80px;
  background-color: skyblue;
}

.scaled {
  transform: scaleX(0.6);
  background-color: pink;
}
```

## See also

- `scaleY()`
- `scaleZ()`
- `transform`
- `scale`
- `<transform-function>`
- `transform-origin`
- Other individual transform properties:
  - `translate`
  - `rotate`
  - Note: there is no `skew` property
