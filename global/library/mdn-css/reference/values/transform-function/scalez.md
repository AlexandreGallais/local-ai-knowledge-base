---
title: "`scaleZ()` CSS function"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/values/transform-function/scalez/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `scaleZ()` CSS function

The **`scaleZ()`** CSS function defines a transformation that resizes an element along the
z-axis. Its result is a `<transform-function>` data type.

```css
transform: scaleZ(1);
```

```css
transform: scaleZ(1.4);
```

```css
transform: scaleZ(0.5);
```

```css
transform: scaleZ(-1.4);
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
  perspective: 800px;
  perspective-origin: 150% 150%;
}

#example-element {
  width: 100px;
  height: 100px;
  perspective: 550px;
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

This scaling transformation modifies the z-coordinate of each element point by a constant factor, except when the
scale factor is 1, in which case the function is the identity transform. The scaling is not isotropic, and the angles
of the element are not conserved. `scaleZ(-1)` defines an axial symmetry, with the z-axis passing through the origin
(as specified by the `transform-origin` property).

In the above interactive examples, `perspective: 550px;` (to
create a 3D space) and `transform-style: preserve-3d;`
(so the children, the 6 sides of the cube, are also positioned in the 3D space), have been set on the cube.

> **Note:**
> `scaleZ(sz)` is equivalent to
> `scale3d(1, 1, sz)`.

## Syntax

```css
scaleZ(s)
```

### Values

- `s`
    Is a `<number>` representing the scaling factor to apply on the z-coordinate of each point of
    the element.

       | Cartesian coordinates on ℝ^2
       | Homogeneous coordinates on ℝℙ^2
       | Cartesian coordinates on ℝ^3
       | Homogeneous coordinates on ℝℙ^3

       |
        This transformation applies to the 3D space and can't be represented on the plane.

       |
        <math display="block">
          <semantics><mrow><mo>(</mo><mtable><mtr><mtd><mn>1</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>0</mn></mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>0</mn></mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>0</mn></mtd><mtd><mi>s</mi></mtd></mtr></mtable><mo>)</mo></mrow><annotation encoding="TeX">\left( \begin{array}{ccc} 1 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & s \end{array} \right)</annotation></semantics>
        </math>

       |
        <math display="block">
          <semantics><mrow><mo>(</mo><mtable><mtr><mtd><mn>1</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>0</mn></mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>0</mn></mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>0</mn></mtd><mtd><mi>s</mi></mtd><mtd><mn>0</mn></mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>1</mn></mtd></mtr></mtable><mo>)</mo></mrow><annotation encoding="TeX">\left( \begin{array}{cccc} 1 & 0 & 0 & 0 \\ 0 & 1 & 0 & 0 \\ 0 & 0 & s & 0 \\ 0 & 0 & 0 & 1 \end{array} \right)</annotation></semantics>
        </math>

## Examples

### HTML

```html
<div>Normal</div>
<div class="perspective">Translated</div>
<div class="scaled-translated">Scaled</div>
```

### CSS

```css
div {
  width: 80px;
  height: 80px;
  background-color: skyblue;
}

.perspective {
  /* Includes a perspective to create a 3D space */
  transform: perspective(400px) translateZ(-100px);
  background-color: limegreen;
}

.scaled-translated {
  /* Includes a perspective to create a 3D space */
  transform: perspective(400px) scaleZ(2) translateZ(-100px);
  background-color: pink;
}
```

## See also

- `scaleX()`
- `scaleY()`
- `transform`
- `<transform-function>`
- `transform-origin`
- Individual transform properties:
  - `translate`
  - `scale`
  - `rotate`
  - Note: there is no `skew` property
