---
title: "Using CSS typed arithmetic (part 2 of 2)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/values_and_units/using_typed_arithmetic/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Using CSS typed arithmetic (part 2 of 2)

## An animated story circle

The animated story circle example (see source code) demonstrates a more complex effect created by leveraging CSS typed arithmetic rules. In this case, the different paragraphs of a body of text are laid out in a circle emanating from a center point. What's more, the circle of paragraphs closes up into a fan shape when the viewport is made narrower, and opens up again when it is made wider.

### HTML

The HTML is fairly basic — a `` containing multiple `` elements. The text of the first paragraph is wrapped in a `` element to provide an indicator of where to start reading.

```html
<div class="story-circle">
  <p><strong>Hello there!</strong></p>
  <p>This is</p>
  <p>quite an</p>
  <p>interesting way</p>
  <p>to tell a</p>
  <p>story</p>
  <p>all around in</p>
  <p>a circle.</p>
  <p>What fun!</p>
</div>
```

### CSS

We start the CSS by setting a `height` of `100%` on the `:root` element.

```css
:root {
  height: 100%;
}
```

Next, we set several properties on the `<body>` element:

- We start by setting a `height` of `inherit`, meaning the `<body>` will inherit the `:root` element's `100%` height and therefore span the full height of the viewport.
- Next, we horizontally center the `<body>` using `margin`, and give it a `max-width`. As you'll see later on, this upper bound is important for controlling the maximum rotation of the fan/circle shape.
- We center the `` with `class="story-circle"` horizontally and vertically inside the `<body>` using flexbox.
- We use the `container-type` property to declare the `<body>` as an inline size query container. This is important because we want to vary the shape rotation based on the `<body>` width, and not the viewport width as we did in previous examples. Setting it as a size query container allows us to reference its size in calculations.

```css
body {
  height: inherit;
  margin: 0 auto;
  max-width: 1600px;
  display: flex;
  align-items: center;
  justify-content: center;
  container-type: inline-size;
}
```

We now come to styling the `story-circle` ``. We set its `width` and `height` to `1px`: it will act as a reference point with its child paragraphs positioned in a circle around it. (We don't even need to set positioning on it, as it is fine for the paragraphs to be positioned relative to the `<body>`).

We then create a custom property called `--width-percentage` that contains the result of `100cqw` (100% of the width of the element's parent query container, which is the `<body>` element) divided by `1200px`, minus `0.33333`. This is the key value that will control the amount the circle rotates by as the viewport width is changed.

```css
.story-circle {
  width: 1px;
  height: 1px;
  --width-percentage: calc((100cqw / 1200px) - 0.33333);
}
```

We are using the container query width rather than the viewport width to control the rotation because we want to set a maximum bound for the container, which is controlled by the `<body>` `max-width`. If the rotation value becomes greater than a full circle, the last paragraph will start to overlap the first one, which spoils the effect.

Since the `max-width` is `1600px`, you might have expected the calculation to be `100cqw / 1600px)`. This would work, but we've instead gone for `(100cqw / 1200px) - 0.33333` (the `0.33333` comes from `1600px/1200px - 1`). Both would cause the maximum rotation to occur at a `<body>` width of `1600px`, but the fan now has a smaller minimum rotation, which gives a better effect at narrow viewport widths.

The final style rule selects the paragraphs themselves. Most of this styling is rudimentary. It is worth pointing out that we have set `position` to `absolute` to cause all of the paragraphs to sit on top of one another, and we've set a `transform-origin` value of `center left` to cause paragraphs to rotate around the center of their left edge, so they will all fan out from a center point over their containing ``.

Now onto the interesting bit — we define a custom property called `--angle` that contains the unitless rotation angle of the paragraph, before setting the `rotate` property to the resulting value. We multiply the resulting number by `1deg` to convert it to a degree value. The `--angle` custom property is the product of three values:

1. The paragraph's `sibling-index()` minus `1`, which causes the first paragraph to have a rotation angle of `0`, as we want it to be horizontal.
2. `360` divided by the paragraph's `sibling-count()`, which causes all the paragraphs to be equally spaced around the circle, meaning the design will still work if the number of paragraphs changes.
3. our `--width-percentage` custom property, which causes the rotation of the paragraphs around the circle to vary as the viewport width changes. Remember that this property has a maximum value of `1`, which will be achieved when the `<body>` element hits its `max-width` of `1600px`.

```css
p {
  padding: 10px;
  width: 150px;
  text-align: right;
  background: linear-gradient(to right, red, orange 50%);
  border-radius: 5px;

  position: absolute;
  transform-origin: center left;

  --angle: calc(
    ((sibling-index() - 1) * (360 / sibling-count())) * var(--width-percentage)
  );
  rotate: calc(var(--angle) * 1deg);
}
```

### Result

To see the result, view our animated story circle example live (see source code). Try increasing and decreasing the viewport width to see how the paragraph fan shape unfolds into a circle and back again.

## See also

- `calc()`, `abs()`
- CSS values and units module
- CSS Typed Arithmetic on css-tricks.com (2025)
