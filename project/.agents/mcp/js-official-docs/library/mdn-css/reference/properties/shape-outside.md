---
title: "`shape-outside` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/shape-outside/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `shape-outside` CSS property

The **`shape-outside`** CSS property defines a shape—which may be non-rectangular—around which adjacent inline content should wrap. By default, inline content wraps around its margin box; `shape-outside` provides a way to customize this wrapping, making it possible to wrap text around complex objects rather than rectangular boxes.

```css
shape-outside: circle(50%);
```

```css
shape-outside: ellipse(130px 140px at 20% 20%);
```

```css
shape-outside: url("/shared-assets/images/examples/round-balloon.png");
```

```css
shape-outside: polygon(50% 0, 100% 50%, 50% 100%, 0 50%);
```

```html
<section class="default-example" id="default-example">
  <div class="example-container">
    <img
      class="transition-all"
      id="example-element"
      src="/shared-assets/images/examples/round-balloon.png"
      width="150" />
    We had agreed, my companion and I, that I should call for him at his house,
    after dinner, not later than eleven o'clock. This athletic young Frenchman
    belongs to a small set of Parisian sportsmen, who have taken up "ballooning"
    as a pastime. After having exhausted all the sensations that are to be found
    in ordinary sports, even those of "automobiling" at a breakneck speed, the
    members of the "Aéro Club" now seek in the air, where they indulge in all
    kinds of daring feats, the nerve-racking excitement that they have ceased to
    find on earth.
  </div>
</section>
```

```css
.example-container {
  text-align: left;
  padding: 20px;
}

#example-element {
  float: left;
  width: 150px;
  margin: 20px;
}
```

## Syntax

```css
/* Keyword values */
shape-outside: none;
shape-outside: margin-box;
shape-outside: content-box;
shape-outside: border-box;
shape-outside: padding-box;

/* Function values */
shape-outside: circle();
shape-outside: ellipse();
shape-outside: inset(10px 10px 10px 10px);
shape-outside: polygon(10px 10px, 20px 20px, 30px 30px);

/* Shape box with basic shape */
shape-outside: circle() border-box;
shape-outside: margin-box ellipse();

/* <url> value */
shape-outside: url("image.png");

/* <gradient> value */
shape-outside: linear-gradient(45deg, white 150px, red 150px);

/* Global values */
shape-outside: inherit;
shape-outside: initial;
shape-outside: revert;
shape-outside: revert-layer;
shape-outside: unset;
```

The `shape-outside` property is specified using the values from the list below, which define the _float area_ for _float elements_. The float area determines the shape around which inline content (float elements) wrap.

### Values

- `none`
    The float area is unaffected. Inline content wraps around the element's margin box, like usual.
- `<shape-box>`
    The float area is computed according to the shape of a float element's edges (as defined by the CSS box model). This can be `margin-box`, `border-box`, `padding-box`, or `content-box`. The shape includes any curvature created by the `border-radius` property (behavior which is similar to `background-clip`).
    - `margin-box`
        Defines the shape enclosed by the outside margin edge. The corner radii of this shape are determined by the corresponding `border-radius` and `margin` values. If the `border-radius / margin` ratio is `1` or more, then the margin box corner radius is `border-radius + margin`. If the ratio is less than `1`, then the margin box corner radius is `border-radius + (margin * (1 + (ratio - 1) ^ 3))`.
    - `border-box`
        Defines the shape enclosed by the outside border edge. The shape follows the normal border radius shaping rules for the outside of the border.
    - `padding-box`
        Defines the shape enclosed by the outside padding edge. The shape follows the normal border radius shaping rules for the inside of the border.
    - `content-box`
        Defines the shape enclosed by the outside content edge. Each corner radius of this box is the larger of `0` or `border-radius - border-width - padding`.

- `basic-shape`
    The float area is computed based on the shape created by an `inset()`, `circle()`, `ellipse()`, or `polygon()` function; other `<basic-shape>` functions are invalid. If a `<shape-box>` is also supplied, it defines the reference box for the `<basic-shape>` function. Otherwise, the reference box defaults to `margin-box`.
- `image`
    The float area is extracted and computed based on the alpha channel of the specified `image` as defined by `shape-image-threshold`.

> **Note:**
> If the image is invalid, the effect is as if the keyword `none` had been specified. Additionally, the image must be served with CORS headers allowing its use.

## Examples

### Funneling text

#### HTML

```html
<div class="main">
  <div class="left"></div>
  <div class="right"></div>
  <p>
    Sometimes a web page's text content appears to be funneling your attention
    towards a spot on the page to drive you to follow a particular link.
    Sometimes you don't notice.
  </p>
</div>
```

#### CSS

```css
.main {
  width: 530px;
}

.left,
.right {
  background-color: lightgray;
  height: 12ex;
  width: 40%;
}

.left {
  clip-path: polygon(0 0, 100% 100%, 0 100%);
  float: left;
  shape-outside: polygon(0 0, 100% 100%, 0 100%);
}

.right {
  clip-path: polygon(100% 0, 100% 100%, 0 100%);
  float: right;
  shape-outside: polygon(100% 0, 100% 100%, 0 100%);
}

p {
  text-align: center;
}
```

#### Result

## See also

- CSS shapes
- Overview of shapes
- `basic-shape`
- `shape-margin`
- `shape-image-threshold`
