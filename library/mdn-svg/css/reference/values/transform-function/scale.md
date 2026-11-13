---
title: "`scale()` CSS function"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/css/reference/values/transform-function/scale/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# `scale()` CSS function

The **`scale()`** CSS function defines a transformation that resizes an element on the 2D
plane. Because the amount of scaling is defined by a vector [sx, sy], it can resize the horizontal and vertical dimensions at
different scales. Its result is a `<transform-function>` data type.

```css
transform: scale(1);
```

```css
transform: scale(0.7);
```

```css
transform: scale(1.3, 0.4);
```

```css
transform: scale(-0.5, 1);
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

This scaling transformation is characterized by a two-dimensional vector. Its coordinates define how much scaling is
done in each direction. If both coordinates are equal, the scaling is uniform (_isotropic_) and the aspect
ratio of the element is preserved (this is a homothetic transformation).

When a coordinate value is outside the \[-1, 1] range, the element grows along that dimension; when inside, it
shrinks. A negative value results in a point reflection
in that dimension. The value `1` has no effect.

> **Note:**
> The `scale()` function only scales in 2D. To scale in 3D, use
> `scale3d()` instead.

## Syntax

```css
scale(sx)

scale(sx, sy)
```

### Values

- `sx`
    A `<number>` or `<percentage>` representing the abscissa (horizontal, x-component) of the scaling vector.
- `sy` (optional)
    A `<number>` or `<percentage>` representing the ordinate (vertical, y-component) of the scaling vector.
    If not defined, its default value is `sx`, resulting in a uniform scaling that preserves the element's aspect ratio.

       | Cartesian coordinates on ℝ^2
       | Homogeneous coordinates on ℝℙ^2
       | Cartesian coordinates on ℝ^3
       | Homogeneous coordinates on ℝℙ^3

       |
        <math display="block">
          <semantics><mrow><mo>(</mo><mtable><mtr><mtd><mi>sx</mi></mtd><mtd><mn>0</mn></mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mi>sy</mi></mtd></mtr></mtable><mo>)</mo></mrow><annotation encoding="TeX">\left( \begin{array}{cc} sx & 0 \\ 0 & sy \end{array} \right)</annotation></semantics>
        </math>

       |
        <math display="block">
          <semantics><mrow><mo>(</mo><mtable><mtr><mtd><mi>sx</mi></mtd><mtd><mn>0</mn></mtd><mtd><mn>0</mn></mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mi>sy</mi></mtd><mtd><mn>0</mn></mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>1</mn></mtd></mtr></mtable><mo>)</mo></mrow><annotation encoding="TeX">\left( \begin{array}{ccc} sx & 0 & 0 \\ 0 & sy & 0 \\ 0 & 0 & 1 \end{array} \right)</annotation></semantics>
        </math>

       |
        <math display="block">
          <semantics><mrow><mo>(</mo><mtable><mtr><mtd><mi>sx</mi></mtd><mtd><mn>0</mn></mtd><mtd><mn>0</mn></mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mi>sy</mi></mtd><mtd><mn>0</mn></mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>1</mn></mtd></mtr></mtable><mo>)</mo></mrow><annotation encoding="TeX">\left( \begin{array}{ccc} sx & 0 & 0 \\ 0 & sy & 0 \\ 0 & 0 & 1 \end{array} \right)</annotation></semantics>
        </math>

       |
        <math display="block">
          <semantics><mrow><mo>(</mo><mtable><mtr><mtd><mi>sx</mi></mtd><mtd><mn>0</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>0</mn></mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mi>sy</mi></mtd><mtd><mn>0</mn></mtd><mtd><mn>0</mn></mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>0</mn></mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>1</mn></mtd></mtr></mtable><mo>)</mo></mrow><annotation encoding="TeX">\left( \begin{array}{cccc} sx & 0 & 0 & 0 \\ 0 & sy & 0 & 0 \\ 0 & 0 & 1 & 0 \\ 0 & 0 & 0 & 1 \end{array} \right)</annotation></semantics>
        </math>

       | `[sx 0 0 sy 0 0]`

## Accessibility

Scaling/zooming animations are problematic for accessibility, as they are a common trigger for certain types of
migraine. If you need to include such animations on your website, you should provide a control to allow users to turn
off animations, preferably site-wide.

Also, consider making use of the `prefers-reduced-motion` media feature
— use it to write a media query that will turn off animations if the
user has reduced animation specified in their system preferences.

Find out more:

- MDN Understanding WCAG, Guideline 2.3 explanations
- Understanding Success Criterion 2.3.3 | W3C Understanding WCAG 2.1

## Examples

### Scaling the X and Y dimensions together

#### HTML

```html
<div>Normal</div>
<div class="scaled">Scaled</div>
```

#### CSS

```css
div {
  width: 80px;
  height: 80px;
  background-color: skyblue;
}

.scaled {
  transform: scale(0.7); /* Equal to scaleX(0.7) scaleY(0.7) */
  background-color: pink;
}
```

#### Result

### Scaling X and Y dimensions separately, and translating the origin

#### HTML

```html
<div>Normal</div>
<div class="scaled">Scaled</div>
```

#### CSS

```css
div {
  width: 80px;
  height: 80px;
  background-color: skyblue;
}

.scaled {
  transform: scale(2, 0.5); /* Equal to scaleX(2) scaleY(0.5) */
  transform-origin: left;
  background-color: pink;
}
```

#### Result

## See also

- `transform`
- `scale`
- `zoom`
- `<transform-function>`
- `scale3d()`
- Other individual transform properties `translate` and `rotate`
