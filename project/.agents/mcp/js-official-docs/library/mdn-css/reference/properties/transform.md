---
title: "`transform` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/transform/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `transform` CSS property

The **`transform`** CSS property lets you rotate, scale, skew, or translate an element.
It modifies the coordinate space of the CSS visual formatting model.

If the property has a value different from `none`, a stacking context will be created.
In that case, the element will act as a containing block for any `position: fixed;` or `position: absolute;` elements that it contains.

You can also use the individual transform properties: `translate`, `rotate`, and `scale`. These properties are applied in the order: `translate`, `rotate`, `scale`, and finally `transform`.

> **Warning:**
> Only transformable elements can be `transform`ed.
> That is, all elements whose layout is governed by the CSS box model except for: non-replaced inline boxes, table-column boxes, and table-column-group boxes.

```css
transform: matrix(1, 2, 3, 4, 5, 6);
```

```css
transform: translate(120px, 50%);
```

```css
transform: scale(2, 0.5);
```

```css
transform: rotate(0.5turn);
```

```css
transform: skew(30deg, 20deg);
```

```css
transform: scale(0.5) translate(-100%, -100%);
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

## Syntax

```css
/* Keyword value */
transform: none;

/* Function values */
transform: matrix(1, 2, 3, 4, 5, 6);
transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
transform: perspective(17px);
transform: rotate(0.5turn);
transform: rotate3d(1, 2, 3, 10deg);
transform: rotateX(10deg);
transform: rotateY(10deg);
transform: rotateZ(10deg);
transform: translate(12px, 50%);
transform: translate3d(12px, 50%, 3em);
transform: translateX(2em);
transform: translateY(3in);
transform: translateZ(2px);
transform: scale(2, 0.5);
transform: scale3d(2.5, 1.2, 0.3);
transform: scaleX(2);
transform: scaleY(0.5);
transform: scaleZ(0.3);
transform: skew(30deg, 20deg);
transform: skewX(30deg);
transform: skewY(1.07rad);

/* Multiple function values */
transform: translateX(10px) rotate(10deg) translateY(5px);
transform: perspective(500px) translate3d(10px, 0, 20px) rotateY(30deg);

/* Global values */
transform: inherit;
transform: initial;
transform: revert;
transform: revert-layer;
transform: unset;
```

### Values

This property is specified as either the keyword value `none` or as a space-separated list of `<transform-function>` values:

- `<transform-function>`
    One or more of the CSS transform functions to be applied.
    The transform functions are combined from left to right – each function establishes a new coordinate space for the next function and so on – so the visual result matches the written order of the functions. Alternatively, keeping the parent coordinate space fixed, the same transformation can be described as applying the functions in reverse order (right to left).
- `none`
    Specifies that no transform should be applied.

## Accessibility

Scaling/zooming animations are problematic for accessibility, as they are a common trigger for certain types of migraine.
If you need to include such animations on your website, you should provide a control to allow users to turn off animations, preferably site-wide.

Also, consider making use of the `prefers-reduced-motion` media feature — use it to write a media query that will turn off animations if the user has reduced animation specified in their system preferences.

Find out more:

- MDN Understanding WCAG, Guideline 2.3 explanations
- Understanding Success Criterion 2.3.3 | W3C Understanding WCAG 2.1

## Examples

### Translating and rotating an element

#### HTML

```html
<div>Transformed element</div>
```

#### CSS

```css
div {
  border: solid red;
  transform: translate(30px, 20px) rotate(20deg);
  width: 140px;
  height: 60px;
}
```

#### Result

### Comparing the order of transform functions

The order of transform functions matters.

In this example, two boxes are rotated and translated by the same values, but the functions are in the opposite order. The dotted lines mark the X-axis before and after rotation.

#### HTML

```html
<div class="original"></div>
<div class="one">1</div>
<div class="two">2</div>
```

#### CSS

```css
div {
  height: 200px;
  width: 200px;
  position: absolute;
  left: 200px;
  top: 50px;
  font-size: 4rem;
  line-height: 200px;
  text-align: center;
}
.original {
  border: 1px dashed;
}
.original::before,
.original::after {
  content: "";
  position: absolute;
  top: 100px;
  width: 500px;
  left: -150px;
  height: 1px;
  border-top: 2px dotted;
}
.original::after {
  transform: rotate(135deg);
}
.one {
  background-color: #cccccc;
}
.two {
  background-color: #d6bb72;
}
```

```css
.one {
  transform: translateX(200px) rotate(135deg);
}
.two {
  transform: rotate(135deg) translateX(200px);
}
```

#### Result

- Box 1 (first `translateX()`, then `rotate()`): The coordinate space first shifts `200px` along the X axis, then rotates `135deg` within that shifted space, so the element ends up to the right of its original position, rotated.
- Box 2 (first `rotate()`, then `translateX()`): The coordinate space first rotates `135deg`, so the element then moves `200px` along the rotated axis, in the direction shown by the dotted lines.
  Please see Using CSS transforms and `<transform-function>` for more examples.

## See also

- Using CSS transforms
- `<transform-function>` data type with all the transform functions explained.
- Individual CSS properties: `translate`, `rotate`, and `scale` (there is no `skew` property).
- SVG `transform` attribute
- Online tool to visualize CSS Transform functions: CSS Transform Playground
