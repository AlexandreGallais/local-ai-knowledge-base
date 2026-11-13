---
title: "`rotate3d()` CSS function"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/css/reference/values/transform-function/rotate3d/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# `rotate3d()` CSS function

The **`rotate3d()`** CSS function defines a transformation that rotates an element around a
fixed axis in 3D space, without deforming it. Its result is a `<transform-function>` data type.

```css
transform: rotate3d(0, 0, 0, 0);
```

```css
transform: rotate3d(1, 1, 1, 45deg);
```

```css
transform: rotate3d(2, -1, -1, -0.2turn);
```

```css
transform: rotate3d(0, 1, 0.5, 3.142rad);
```

```html
<section class="default-example" id="default-example">
  <div class="transition-all" id="example-element">
    <div class="face front">1</div>
    <div class="face back">2</div>
    <div class="face right">3</div>
    <div class="face left">4</div>
    <div class="face top">5</div>
    <div class="face bottom">6</div>
  </div>
</section>
```

```css
#default-example {
  background: linear-gradient(skyblue, khaki);
  perspective: 550px;
}

#example-element {
  width: 100px;
  height: 100px;
  transform-style: preserve-3d;
}

.face {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: absolute;
  backface-visibility: inherit;
  font-size: 60px;
  color: white;
}

.front {
  background: rgb(90 90 90 / 0.7);
  transform: translateZ(50px);
}

.back {
  background: rgb(0 210 0 / 0.7);
  transform: rotateY(180deg) translateZ(50px);
}

.right {
  background: rgb(210 0 0 / 0.7);
  transform: rotateY(90deg) translateZ(50px);
}

.left {
  background: rgb(0 0 210 / 0.7);
  transform: rotateY(-90deg) translateZ(50px);
}

.top {
  background: rgb(210 210 0 / 0.7);
  transform: rotateX(90deg) translateZ(50px);
}

.bottom {
  background: rgb(210 0 210 / 0.7);
  transform: rotateX(-90deg) translateZ(50px);
}
```

In 3D space, rotations have three degrees of freedom, which together describe a single axis of rotation. The axis of
rotation is defined by an \[x, y, z] vector and pass by the origin (as defined by the `transform-origin`
property). If, as specified, the vector is not _normalized_ (i.e., if the sum of the square of its three
coordinates is not 1), the user agent will normalize it internally. A non-normalizable vector, such as
the null vector, \[0, 0, 0], will cause the rotation to be ignored, but without invalidating the whole CSS property.

> **Note:**
> Unlike rotations in the 2D plane, the composition of 3D rotations is usually
> not commutative. In other words, the order in which the rotations are applied impacts the result.

## Syntax

```css
rotate3d(x, y, z, a)
```

### Values

- `x`
    Is a `<number>` describing the x-coordinate of the vector denoting the axis of rotation which
    can be a positive or negative number.
- `y`
    Is a `<number>` describing the y-coordinate of the vector denoting the axis of rotation which
    can be a positive or negative number.
- `z`
    Is a `<number>` describing the z-coordinate of the vector denoting the axis of rotation which
    can be a positive or negative number.
- `a`
    Is an `<angle>` representing the angle of the rotation. A positive angle denotes a clockwise
    rotation, a negative angle a counter-clockwise one.

       | Cartesian coordinates on ℝ^2
       |
        This transformation applies to the 3D space and can't be represented on the plane.

       | Homogeneous coordinates on ℝℙ^2

       | Cartesian coordinates on ℝ^3
       |
        <math display="block">
          <semantics><mrow><mo>(</mo><mtable displaystyle="false" rowspacing="0.5ex"><mtr><mtd><mn>1</mn><mo>+</mo><mo stretchy="false">(</mo><mn>1</mn><mo>−</mo><mo lspace="0em" rspace="0em">cos</mo><mo stretchy="false">(</mo><mi>a</mi><mo stretchy="false">)</mo><mo stretchy="false">)</mo><mo stretchy="false">(</mo><msup><mi>x</mi><mn>2</mn></msup><mo>−</mo><mn>1</mn><mo stretchy="false">)</mo></mtd><mtd><mi>z</mi><mo>⋅</mo><mo lspace="0em" rspace="0em">sin</mo><mo stretchy="false">(</mo><mi>a</mi><mo stretchy="false">)</mo><mo>+</mo><mi>x</mi><mi>y</mi><mo stretchy="false">(</mo><mn>1</mn><mo>−</mo><mo lspace="0em" rspace="0em">cos</mo><mo stretchy="false">(</mo><mi>a</mi><mo stretchy="false">)</mo><mo stretchy="false">)</mo></mtd><mtd><mo>−</mo><mi>y</mi><mo>⋅</mo><mo lspace="0em" rspace="0em">sin</mo><mo stretchy="false">(</mo><mi>a</mi><mo stretchy="false">)</mo><mo>+</mo><mi>x</mi><mi>z</mi><mo stretchy="false">(</mo><mn>1</mn><mo>−</mo><mo lspace="0em" rspace="0em">cos</mo><mo stretchy="false">(</mo><mi>a</mi><mo stretchy="false">)</mo><mo stretchy="false">)</mo></mtd></mtr><mtr><mtd><mo>−</mo><mi>z</mi><mo>⋅</mo><mo lspace="0em" rspace="0em">sin</mo><mo stretchy="false">(</mo><mi>a</mi><mo stretchy="false">)</mo><mo>+</mo><mi>x</mi><mi>y</mi><mo stretchy="false">(</mo><mn>1</mn><mo>−</mo><mo lspace="0em" rspace="0em">cos</mo><mo stretchy="false">(</mo><mi>a</mi><mo stretchy="false">)</mo><mo stretchy="false">)</mo></mtd><mtd><mn>1</mn><mo>+</mo><mo stretchy="false">(</mo><mn>1</mn><mo>−</mo><mo lspace="0em" rspace="0em">cos</mo><mo stretchy="false">(</mo><mi>a</mi><mo stretchy="false">)</mo><mo stretchy="false">)</mo><mo stretchy="false">(</mo><msup><mi>y</mi><mn>2</mn></msup><mo>−</mo><mn>1</mn><mo stretchy="false">)</mo></mtd><mtd><mi>x</mi><mo>⋅</mo><mo lspace="0em" rspace="0em">sin</mo><mo stretchy="false">(</mo><mi>a</mi><mo stretchy="false">)</mo><mo>+</mo><mi>y</mi><mi>z</mi><mo stretchy="false">(</mo><mn>1</mn><mo>−</mo><mo lspace="0em" rspace="0em">cos</mo><mo stretchy="false">(</mo><mi>a</mi><mo stretchy="false">)</mo><mo stretchy="false">)</mo></mtd></mtr><mtr><mtd><mi>y</mi><mo>⋅</mo><mo lspace="0em" rspace="0em">sin</mo><mo stretchy="false">(</mo><mi>a</mi><mo stretchy="false">)</mo><mo>+</mo><mi>x</mi><mi>z</mi><mo stretchy="false">(</mo><mn>1</mn><mo>−</mo><mo lspace="0em" rspace="0em">cos</mo><mo stretchy="false">(</mo><mi>a</mi><mo stretchy="false">)</mo><mo stretchy="false">)</mo></mtd><mtd><mo>−</mo><mi>x</mi><mo>⋅</mo><mo lspace="0em" rspace="0em">sin</mo><mo stretchy="false">(</mo><mi>a</mi><mo stretchy="false">)</mo><mo>+</mo><mi>y</mi><mi>z</mi><mo stretchy="false">(</mo><mn>1</mn><mo>−</mo><mo lspace="0em" rspace="0em">cos</mo><mo stretchy="false">(</mo><mi>a</mi><mo stretchy="false">)</mo><mo stretchy="false">)</mo></mtd><mtd><mn>1</mn><mo>+</mo><mo stretchy="false">(</mo><mn>1</mn><mo>−</mo><mo lspace="0em" rspace="0em">cos</mo><mo stretchy="false">(</mo><mi>a</mi><mo stretchy="false">)</mo><mo stretchy="false">)</mo><mo stretchy="false">(</mo><msup><mi>z</mi><mn>2</mn></msup><mo>−</mo><mn>1</mn><mo stretchy="false">)</mo></mtd></mtr></mtable><mo>)</mo></mrow><annotation encoding="TeX">\begin{pmatrix}1 + (1 - \cos(a))(x^2 - 1) & z\cdot \sin(a) + xy(1 - \cos(a)) & -y\cdot \sin(a) + xz(1 - \cos(a))\\-z\cdot \sin(a) + xy(1 - \cos(a)) & 1 + (1 - \cos(a))(y^2 - 1) & x\cdot \sin(a) + yz(1 - \cos(a))\\y\cdot \sin(a) + xz(1 - \cos(a)) & -x\cdot \sin(a) + yz(1 - \cos(a)) & 1 + (1 - \cos(a))(z^2 - 1)\end{pmatrix}</annotation></semantics>
        </math>

       | Homogeneous coordinates on ℝℙ^3
       |
        <math display="block">
          <semantics><mrow><mo>(</mo><mtable displaystyle="false" rowspacing="0.5ex"><mtr><mtd><mn>1</mn><mo>+</mo><mo stretchy="false">(</mo><mn>1</mn><mo>−</mo><mo lspace="0em" rspace="0em">cos</mo><mo stretchy="false">(</mo><mi>a</mi><mo stretchy="false">)</mo><mo stretchy="false">)</mo><mo stretchy="false">(</mo><msup><mi>x</mi><mn>2</mn></msup><mo>−</mo><mn>1</mn><mo stretchy="false">)</mo></mtd><mtd><mi>z</mi><mo>⋅</mo><mo lspace="0em" rspace="0em">sin</mo><mo stretchy="false">(</mo><mi>a</mi><mo stretchy="false">)</mo><mo>+</mo><mi>x</mi><mi>y</mi><mo stretchy="false">(</mo><mn>1</mn><mo>−</mo><mo lspace="0em" rspace="0em">cos</mo><mo stretchy="false">(</mo><mi>a</mi><mo stretchy="false">)</mo><mo stretchy="false">)</mo></mtd><mtd><mo>−</mo><mi>y</mi><mo>⋅</mo><mo lspace="0em" rspace="0em">sin</mo><mo stretchy="false">(</mo><mi>a</mi><mo stretchy="false">)</mo><mo>+</mo><mi>x</mi><mi>z</mi><mo stretchy="false">(</mo><mn>1</mn><mo>−</mo><mo lspace="0em" rspace="0em">cos</mo><mo stretchy="false">(</mo><mi>a</mi><mo stretchy="false">)</mo><mo stretchy="false">)</mo></mtd><mtd><mn>0</mn></mtd></mtr><mtr><mtd><mo>−</mo><mi>z</mi><mo>⋅</mo><mo lspace="0em" rspace="0em">sin</mo><mo stretchy="false">(</mo><mi>a</mi><mo stretchy="false">)</mo><mo>+</mo><mi>x</mi><mi>y</mi><mo stretchy="false">(</mo><mn>1</mn><mo>−</mo><mo lspace="0em" rspace="0em">cos</mo><mo stretchy="false">(</mo><mi>a</mi><mo stretchy="false">)</mo><mo stretchy="false">)</mo></mtd><mtd><mn>1</mn><mo>+</mo><mo stretchy="false">(</mo><mn>1</mn><mo>−</mo><mo lspace="0em" rspace="0em">cos</mo><mo stretchy="false">(</mo><mi>a</mi><mo stretchy="false">)</mo><mo stretchy="false">)</mo><mo stretchy="false">(</mo><msup><mi>y</mi><mn>2</mn></msup><mo>−</mo><mn>1</mn><mo stretchy="false">)</mo></mtd><mtd><mi>x</mi><mo>⋅</mo><mo lspace="0em" rspace="0em">sin</mo><mo stretchy="false">(</mo><mi>a</mi><mo stretchy="false">)</mo><mo>+</mo><mi>y</mi><mi>z</mi><mo stretchy="false">(</mo><mn>1</mn><mo>−</mo><mo lspace="0em" rspace="0em">cos</mo><mo stretchy="false">(</mo><mi>a</mi><mo stretchy="false">)</mo><mo stretchy="false">)</mo></mtd><mtd><mn>0</mn></mtd></mtr><mtr><mtd><mi>y</mi><mo>⋅</mo><mo lspace="0em" rspace="0em">sin</mo><mo stretchy="false">(</mo><mi>a</mi><mo stretchy="false">)</mo><mo>+</mo><mi>x</mi><mi>z</mi><mo stretchy="false">(</mo><mn>1</mn><mo>−</mo><mo lspace="0em" rspace="0em">cos</mo><mo stretchy="false">(</mo><mi>a</mi><mo stretchy="false">)</mo><mo stretchy="false">)</mo></mtd><mtd><mo>−</mo><mi>x</mi><mo>⋅</mo><mo lspace="0em" rspace="0em">sin</mo><mo stretchy="false">(</mo><mi>a</mi><mo stretchy="false">)</mo><mo>+</mo><mi>y</mi><mi>z</mi><mo stretchy="false">(</mo><mn>1</mn><mo>−</mo><mo lspace="0em" rspace="0em">cos</mo><mo stretchy="false">(</mo><mi>a</mi><mo stretchy="false">)</mo><mo stretchy="false">)</mo></mtd><mtd><mn>1</mn><mo>+</mo><mo stretchy="false">(</mo><mn>1</mn><mo>−</mo><mo lspace="0em" rspace="0em">cos</mo><mo stretchy="false">(</mo><mi>a</mi><mo stretchy="false">)</mo><mo stretchy="false">)</mo><mo stretchy="false">(</mo><msup><mi>z</mi><mn>2</mn></msup><mo>−</mo><mn>1</mn><mo stretchy="false">)</mo></mtd><mtd><mn>0</mn></mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>1</mn></mtd></mtr></mtable><mo>)</mo></mrow><annotation encoding="TeX">\begin{pmatrix}1 + (1 - \cos(a))(x^2 - 1) & z\cdot \sin(a) + xy(1 - \cos(a)) & -y\cdot \sin(a) + xz(1 - \cos(a)) & 0\\-z\cdot \sin(a) + xy(1 - \cos(a)) & 1 + (1 - \cos(a))(y^2 - 1) & x\cdot \sin(a) + yz(1 - \cos(a)) & 0\\y\cdot \sin(a) + xz(1 - \cos(a)) & -x\cdot \sin(a) + yz(1 - \cos(a)) & 1 + (1 - \cos(a))(z^2 - 1) & 0\\0 & 0 & 0 & 1\end{pmatrix}</annotation></semantics>
        </math>

## Examples

### Rotating on the y-axis

#### HTML

```html
<div>Normal</div>
<div class="rotated">Rotated</div>
```

#### CSS

```css
body {
  perspective: 800px;
}

div {
  width: 80px;
  height: 80px;
  background-color: skyblue;
}

.rotated {
  transform: rotate3d(0, 1, 0, 60deg);
  background-color: pink;
}
```

#### Result

### Rotating on a custom axis

#### HTML

```html
<div>Normal</div>
<div class="rotated">Rotated</div>
```

#### CSS

```css
body {
  perspective: 800px;
}

div {
  width: 80px;
  height: 80px;
  background-color: skyblue;
}

.rotated {
  transform: rotate3d(1, 2, -1, 192deg);
  background-color: pink;
}
```

#### Result

## See also

- `transform` property
- `rotate` property
- `<transform-function>`
