---
title: "`translateZ()` CSS function"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/values/transform-function/translatez/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `translateZ()` CSS function

The **`translateZ()`** CSS function repositions an element along the z-axis in 3D space, i.e.,
closer to or farther away from the viewer. Its result is a `<transform-function>` data type.

```css
transform: translateZ(0);
```

```css
transform: translateZ(42px);
```

```css
transform: translateZ(-9.7rem);
```

```css
transform: translateZ(-3ch);
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

This transformation is defined by a `<length>` which specifies how far inward or outward the
element or elements move.

In the above interactive examples, `perspective: 550px;` (to
create a 3D space) and `transform-style: preserve-3d;`
(so the children, the 6 sides of the cube, are also positioned in the 3D space), have been set on the cube.

> **Note:**
> `translateZ(tz)` is equivalent to
> `translate3d(0, 0, tz)`.

## Syntax

```css
translateZ(tz)
```

### Values

- `tz`
    A `<length>` representing the z-component of the translating vector [0, 0, tz]. In Cartesian coordinate system it represents shift along z-axis. A positive value moves the
    element towards the viewer, and a negative value farther away.

       | Cartesian coordinates on ℝ^2
       | Homogeneous coordinates on ℝℙ^2
       | Cartesian coordinates on ℝ^3
       | Homogeneous coordinates on ℝℙ^3

       |
        This transformation applies to the 3D space and can't be represented on the plane.

       |
        A translation is not a linear transformation in ℝ^3 and can't be represented using a Cartesian-coordinate matrix.

       |
        <math display="block">
          <semantics><mrow><mo>(</mo><mtable><mtr><mtd><mn>1</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>0</mn></mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>0</mn></mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>1</mn></mtd><mtd><mi>t</mi></mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>1</mn></mtd></mtr></mtable><mo>)</mo></mrow><annotation encoding="TeX">\left( \begin{array}{cccc} 1 & 0 & 0 & 0 \\ 0 & 1 & 0 & 0 \\ 0 & 0 & 1 & t \\ 0 & 0 & 0 & 1 \end{array} \right)</annotation></semantics>
        </math>

## Examples

In this example, two boxes are created. One is positioned normally on the page, without being translated at all. The
second is altered by applying perspective to create a 3D space, then moved towards the user.

### HTML

```html
<div>Static</div>
<div class="moved">Moved</div>
```

### CSS

```css
div {
  position: relative;
  width: 60px;
  height: 60px;
  left: 100px;
  background-color: skyblue;
}

.moved {
  transform: perspective(500px) translateZ(200px);
  background-color: pink;
}
```

What really matters here is the class "moved"; let's take a look at what it does. First, the
`perspective()` function positions the
viewer relative to the plane that lies where z=0 (in essence, the surface of the screen). A value of
`500px` means the user is 500 pixels "in front of" the imagery located at z=0.

Then, the `translateZ()` function moves the element 200 pixels "outward" from the screen, toward the user.
This has the effect of making the element appear larger when viewed on a 2D display, or closer when viewed using a VR
headset or other 3D display device.

Note if the `perspective()` value is less than the `translateZ()` value, such as
`transform: perspective(200px) translateZ(300px);` the transformed element will not be visible as it is
further than the user's viewport. The smaller the difference between the perspective and translateZ values, the closer
the user is to the element and the larger the translated element will seem.

> **Note:**
> As the composition of transforms isn't commutative, the order you write the different functions is significant. In particular, in general, you want `perspective()` to be placed before `translateZ()`.

## See also

- `transform`
- `<transform-function>`
- `translate`
