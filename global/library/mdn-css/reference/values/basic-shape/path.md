---
title: "`path()` CSS function"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/values/basic-shape/path/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `path()` CSS function

The **`path()`** CSS function accepts an SVG path string, and is used in the CSS shapes and CSS motion path modules to enable a shape to be drawn. The `path()` function is a `basic-shape` data type value. It can be used in the CSS `offset-path` and `clip-path` properties and in the SVG `d` attribute.

There are some limitations to using the `path()` function. The path has to be defined as a single string, so a custom path can't be created using variables (`var()` functions). Also, all the lengths in the path are implicitly defined in pixel (`px`) units; other units can't be used. The `shape()` function offers more flexibility than the `path()` function.

```css
clip-path: path(
  "M  20  240 \
 L  20  80 L 160  80 \
 L 160  20 L 280 100 \
 L 160 180 L 160 120 \
 L  60 120 L  60 240 Z"
);
```

```css
clip-path: path(
  "M 20 240 \
 C 20 0 300 0 300 240 Z"
);
```

```html
<section class="default-example" id="default-example">
  <div class="transition-all" id="example-element"></div>
</section>
```

```css
#default-example {
  background: #ffee99;
}

#example-element {
  background: linear-gradient(to bottom right, #ff5522, #0055ff);
  width: 100%;
  height: 100%;
}
```

## Syntax

```css
path("M 10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80")

/* When used in clip-path only */
path(evenodd,"M 10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80")
```

### Parameters

- `<fill-rule>` (optional)
    Defines what parts of the path are inside the shape. The possible values include:
    - `nonzero`: A point is considered inside the shape if a ray drawn from the point crosses more left-to-right than right-to-left path segments, resulting in a non-zero count. This is the default value when `<fill-rule>` is omitted.

    - `evenodd`: A point is considered to be inside the shape if a ray drawn from the point crosses an odd number of path segments. This means that for each time the ray enters the shape, it has not exited an equal number of times, indicating an odd count of entries without corresponding exits.

    > **Warning:**
    > `<fill-rule>` is not supported in `offset-path` and using it invalidates the property.

- `string`
    A data string, contained in quotes, which defines an SVG path. The SVG path data string contains path commands that implicitly use pixel units. An empty path is considered invalid.

### Return value

Returns a `basic-shape` value.

## Examples

### Using a `path()` function as an `offset-path` value

A `path()` function has been provided as an `offset-path` value in the following example to create an elliptical path for a ball to move along.

```html
<div id="path">
  <div id="ball"></div>
</div>
<button>animate</button>
```

```css
#path {
  margin: 40px;
  width: 400px;
  height: 200px;

  /* draw the gray ramp */
  background: radial-gradient(at 50% 0%, transparent 70%, grey 70%, grey 100%);
}

#ball {
  width: 30px;
  height: 30px;
  background-color: red;
  border-radius: 50%;

  /* mark the elliptical path */
  offset-path: path("M 15 15 A 6 5.5 10 0 0 385 15");
}
```

```js
const btn = document.querySelector("button");
const ball = document.getElementById("ball");

btn.addEventListener("click", () => {
  btn.setAttribute("disabled", true);
  setTimeout(() => btn.removeAttribute("disabled"), 6000);

  ball.animate(
    // animate the offset path
    { offsetDistance: [0, "100%"] },
    {
      duration: 1500,
      iterations: 4,
      easing: "cubic-bezier(.667,0.01,.333,.99)",
      direction: "alternate",
    },
  );
});
```

### Modify the value of the SVG path d attribute

The `path()` can be used to modify the value of the SVG `d` attribute, which can also be set to `none` in your CSS.

The "V" symbol will flip vertically when you hover over it, if `d` is supported as a CSS property.

#### HTML

```html
<svg id="svg_css_ex1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <path fill="none" stroke="red" d="M20,20 L50,80 L80,20" />
</svg>
```

#### CSS

```css
html,
body,
svg {
  height: 100%;
}

/* This path is displayed on hover */
#svg_css_ex1:hover path {
  d: path("M20,80 L50,20 L80,80");
}
```

#### Result

## See also

- `border-shape`, `shape-outside`
- CSS shapes module
- Overview of CSS shapes
- The SVG `path` syntax: an illustrated guide via CSS-tricks (2021)
