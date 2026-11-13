---
title: "`rotate()` CSS function"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/values/transform-function/rotate/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `rotate()` CSS function

The **`rotate()`** CSS function defines a transformation that rotates an element around a
fixed point on the 2D plane, without deforming it. Its result is a `<transform-function>` data
type.

```css
transform: rotate(0);
```

```css
transform: rotate(90deg);
```

```css
transform: rotate(-0.25turn);
```

```css
transform: rotate(3.142rad);
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

The fixed point that the element rotates around — mentioned above — is also known as the **transform
origin**. This defaults to the center of the element, but you can set your own custom transform origin using
the `transform-origin` property.

> **Note:**
> The SVG `transform` attribute has its own grammar, in which `rotate()` accepts two optional extra values giving the center of rotation, as in `rotate(45, 50, 50)`. That form is only valid in the attribute, not in CSS: the CSS `rotate()` function takes an angle alone, and the center is set with `transform-origin`.

## Syntax

```css
rotate(a)
```

### Values

- _a_
    Is an `<angle>` representing the angle of the rotation. The direction of rotation depends on the writing direction.
    In a left-to-right context, a positive angle denotes a clockwise rotation, a negative angle a counter-clockwise one. In a right-to-left context,
    a positive angle denotes a counter-clockwise rotation, a negative angle a clockwise one. A rotation by 180° is called _point reflection_.

       | Cartesian coordinates on ℝ^2
       | Homogeneous coordinates on ℝℙ^2
       | Cartesian coordinates on ℝ^3
       | Homogeneous coordinates on ℝℙ^3

       |
        <math display="block">
          <semantics><mrow><mo>(</mo><mtable><mtr><mtd><mo>cos</mo><mo>(</mo><mi>a</mi><mo>)</mo></mtd><mtd><mo>-</mo><mo>sin</mo><mo>(</mo><mi>a</mi><mo>)</mo></mtd></mtr><mtr><mtd><mo>sin</mo><mo>(</mo><mi>a</mi><mo>)</mo></mtd><mtd><mo>cos</mo><mo>(</mo><mi>a</mi><mo>)</mo></mtd></mtr></mtable><mo>)</mo></mrow><annotation encoding="TeX">\left( \begin{array}{cc} \cos(a) & -\sin(a) \\ \sin(a) & \cos(a) \end{array} \right)</annotation></semantics>
        </math>

       |
        <math display="block">
          <semantics><mrow><mo>(</mo><mtable><mtr><mtd><mo>cos</mo><mo>(</mo><mi>a</mi><mo>)</mo></mtd><mtd><mo>-</mo><mo>sin</mo><mo>(</mo><mi>a</mi><mo>)</mo></mtd><mtd><mn>0</mn></mtd></mtr><mtr><mtd><mo>sin</mo><mo>(</mo><mi>a</mi><mo>)</mo></mtd><mtd><mo>cos</mo><mo>(</mo><mi>a</mi><mo>)</mo></mtd><mtd><mn>0</mn></mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>1</mn></mtd></mtr></mtable><mo>)</mo></mrow><annotation encoding="TeX">\left( \begin{array}{ccc} \cos(a) & -\sin(a) & 0 \\ \sin(a) & \cos(a) & 0 \\ 0 & 0 & 1 \end{array} \right)</annotation></semantics>
        </math>

       |
        <math display="block">
          <semantics><mrow><mo>(</mo><mtable><mtr><mtd><mo>cos</mo><mo>(</mo><mi>a</mi><mo>)</mo></mtd><mtd><mo>-</mo><mo>sin</mo><mo>(</mo><mi>a</mi><mo>)</mo></mtd><mtd><mn>0</mn></mtd></mtr><mtr><mtd><mo>sin</mo><mo>(</mo><mi>a</mi><mo>)</mo></mtd><mtd><mo>cos</mo><mo>(</mo><mi>a</mi><mo>)</mo></mtd><mtd><mn>0</mn></mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>1</mn></mtd></mtr></mtable><mo>)</mo></mrow><annotation encoding="TeX">\left( \begin{array}{ccc} \cos(a) & -\sin(a) & 0 \\ \sin(a) & \cos(a) & 0 \\ 0 & 0 & 1 \end{array} \right)</annotation></semantics>
        </math>

       |
        <math display="block">
          <semantics><mrow><mo>(</mo><mtable><mtr><mtd><mo>cos</mo><mo>(</mo><mi>a</mi><mo>)</mo></mtd><mtd><mo>-</mo><mo>sin</mo><mo>(</mo><mi>a</mi><mo>)</mo></mtd><mtd><mn>0</mn></mtd><mtd><mn>0</mn></mtd></mtr><mtr><mtd><mo>sin</mo><mo>(</mo><mi>a</mi><mo>)</mo></mtd><mtd><mo>cos</mo><mo>(</mo><mi>a</mi><mo>)</mo></mtd><mtd><mn>0</mn></mtd><mtd><mn>0</mn></mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>0</mn></mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>1</mn></mtd></mtr></mtable><mo>)</mo></mrow><annotation encoding="TeX">\left( \begin{array}{cccc} \cos(a) & -\sin(a) & 0 & 0 \\ \sin(a) & \cos(a) & 0 & 0 \\ 0 & 0 & 1 & 0 \\ 0 & 0 & 0 & 1 \\ \end{array} \right)</annotation></semantics>
        </math>

       | `[cos(a) sin(a) -sin(a) cos(a) 0 0]`

## Examples

### Basic <example-value>

#### HTML

```html
<div>Normal</div>
<div class="rotated">Rotated</div>
```

#### CSS

```css
div {
  width: 80px;
  height: 80px;
  background-color: skyblue;
}

.rotated {
  transform: rotate(45deg); /* Equal to rotateZ(45deg) */
  background-color: pink;
}
```

#### Result

### Combining rotation with another transformation

If you want to apply multiple transformations to an element, be careful about the order in which you specify your
transformations. For example, if you rotate before translating, the translation will be along the new axis of
rotation!

#### HTML

```html
<div>Normal</div>
<div class="rotate">Rotated</div>
<div class="rotate-translate">Rotated + Translated</div>
<div class="translate-rotate">Translated + Rotated</div>
```

#### CSS

```css
div {
  position: absolute;
  left: 40px;
  top: 40px;
  width: 100px;
  height: 100px;
  background-color: lightgray;
}

.rotate {
  background-color: transparent;
  outline: 2px dashed;
  transform: rotate(45deg);
}

.rotate-translate {
  background-color: pink;
  transform: rotate(45deg) translateX(180px);
}

.translate-rotate {
  background-color: gold;
  transform: translateX(180px) rotate(45deg);
}
```

#### Result

## See also

- `transform` property
- `rotate` property
- `<transform-function>`
- `rotate3d()`
