---
title: "`skew()` CSS function"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/values/transform-function/skew/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `skew()` CSS function

The **`skew()`** CSS function defines a transformation that skews an element on the 2D
plane. Its result is a `<transform-function>` data type.

```css
transform: skew(0);
```

```css
transform: skew(15deg, 15deg);
```

```css
transform: skew(-0.06turn, 18deg);
```

```css
transform: skew(0.312rad);
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

This transformation is a shear mapping (transvection) that distorts
each point within an element by a certain angle in the horizontal and vertical directions. The effect is as if you
grabbed each corner of the element and pulled them along a certain angle.

The coordinates of each point are modified by a value proportionate to the specified angle and the distance to the
origin. Thus, the farther from the origin a point is, the greater the value added to it.

## Syntax

```css
skew(ax)

skew(ax, ay)
```

### Values

- `ax`
    Is an `angle` representing the angle to use to distort the element along the x-axis.
- `ay` (optional)
    Is an `angle` representing the angle to use to distort the element along the y-axis. If not defined, its default value is `0`, resulting in a purely horizontal skewing.

       | Cartesian coordinates on ℝ^2
       | Homogeneous coordinates on ℝℙ^2
       | Cartesian coordinates on ℝ^3
       | Homogeneous coordinates on ℝℙ^3

       |
        <math display="block">
          <semantics><mrow><mo>(</mo><mtable><mtr><mtd><mn>1</mn></mtd><mtd><mo>tan</mo><mo>(</mo><mi>ax</mi><mo>)</mo></mtd></mtr><mtr><mtd><mo>tan</mo><mo>(</mo><mi>ay</mi><mo>)</mo></mtd><mtd><mn>1</mn></mtd></mtr></mtable><mo>)</mo></mrow><annotation encoding="TeX">\left( \begin{array}{cc} 1 & \tan(ax) \\ \tan(ay) & 1 \end{array} \right)</annotation></semantics>
        </math>

       |
        <math display="block">
          <semantics><mrow><mo>(</mo><mtable><mtr><mtd><mn>1</mn></mtd><mtd><mo>tan</mo><mo>(</mo><mi>ax</mi><mo>)</mo></mtd><mtd><mn>0</mn></mtd></mtr><mtr><mtd><mo>tan</mo><mo>(</mo><mi>ay</mi><mo>)</mo></mtd><mtd><mn>1</mn></mtd><mtd><mn>0</mn></mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr></mtr></mtable><mo>)</mo></mrow><annotation encoding="TeX">\left( \begin{array}{ccc} 1 & \tan(ax) & 0 \\ \tan(ay) & 1 & 0 \\ 0 & 0 & 1 \end{array} \right)</annotation></semantics>
        </math>

       |
        <math display="block">
          <semantics><mrow><mo>(</mo><mtable><mtr><mtd><mn>1</mn></mtd><mtd><mo>tan</mo><mo>(</mo><mi>ax</mi><mo>)</mo></mtd><mtd><mn>0</mn></mtd></mtr><mtr><mtd><mo>tan</mo><mo>(</mo><mi>ay</mi><mo>)</mo></mtd><mtd><mn>1</mn></mtd><mtd><mn>0</mn></mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>1</mn></mtd></mtr></mtable><mo>)</mo></mrow><annotation encoding="TeX">\left( \begin{array}{ccc} 1 & \tan(ax) & 0 \\ \tan(ay) & 1 & 0 \\ 0 & 0 & 1 \end{array} \right)</annotation></semantics>
        </math>

       |
        <math display="block">
          <semantics><mrow><mo>(</mo><mtable><mtr><mtd><mn>1</mn></mtd><mtd><mo>tan</mo><mo>(</mo><mi>ax</mi><mo>)</mo></mtd><mtd><mn>0</mn></mtd><mtd><mn>0</mn></mtd></mtr><mtr><mtd><mo>tan</mo><mo>(</mo><mi>ay</mi><mo>)</mo></mtd><mtd><mn>1</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>0</mn></mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>0</mn></mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>1</mn></mtd></mtr></mtable><mo>)</mo></mrow><annotation encoding="TeX">\left( \begin{array}{cccc} 1 & \tan(ax) & 0 & 0 \\ \tan(ay) & 1 & 0 & 0 \\ 0 & 0 & 1 & 0 \\ 0 & 0 & 0 & 1 \end{array} \right)</annotation></semantics>
        </math>

       | `[1 tan(ay) tan(ax) 1 0 0]`

## Examples

### Skewing on the x-axis only

#### HTML

```html
<div>Normal</div>
<div class="skewed">Skewed</div>
```

#### CSS

```css
body {
  margin: 20px;
}

div {
  width: 80px;
  height: 80px;
  background-color: skyblue;
}

.skewed {
  transform: skew(10deg); /* Equal to skewX(10deg) */
  background-color: pink;
}
```

#### Result

### Skewing on both axes

#### HTML

```html
<div>Normal</div>
<div class="skewed">Skewed</div>
```

#### CSS

```css
body {
  margin: 20px;
}

div {
  width: 80px;
  height: 80px;
  background-color: skyblue;
}

.skewed {
  transform: skew(10deg, 10deg);
  background-color: pink;
}
```

#### Result

## See also

- `transform`
- `<transform-function>`
- skewX()
- skewY()
- Individual transform properties:
  - `translate`
  - `scale`
  - `rotate`
  - Note: there is no `skew` property
