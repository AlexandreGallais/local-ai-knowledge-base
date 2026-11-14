---
title: "CSS mask properties (part 4 of 4)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/masking/mask_properties/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSS mask properties (part 4 of 4)

## The `mask-composite` property

The `mask` shorthand includes the `mask-composite` property, which defines how multiple masks are combined to create the final mask effect. Each value in the comma-separated list of values determines whether the browser should `add`, `subtract`, `intersect`, or `exclude` the associated mask layer from or to the mask layers below it. Similar to `mask-mode`, and the other `mask-*` properties, there is no property in the `background` shorthand that is analogous.

```html
<div class="add">
  <img
    src="https://mdn.github.io/shared-assets/images/examples/progress-pride-flag.jpg"
    alt="Pride flag" />
</div>
<div class="subtract">
  <img
    src="https://mdn.github.io/shared-assets/images/examples/progress-pride-flag.jpg"
    alt="Pride flag" />
</div>
<div class="intersect">
  <img
    src="https://mdn.github.io/shared-assets/images/examples/progress-pride-flag.jpg"
    alt="Pride flag" />
</div>
<div class="exclude">
  <img
    src="https://mdn.github.io/shared-assets/images/examples/progress-pride-flag.jpg"
    alt="Pride flag" />
</div>
```

In this example, we include two `mask-image` values, including the star and the gradient from the previous examples as mask images:

```css
img {
  mask-image:
    repeating-linear-gradient(
      to bottom right,
      red 0 20px,
      #ff000055 20px 40px,
      transparent 40px 60px
    ),
    url("https://mdn.github.io/shared-assets/images/examples/mask-star.svg");
}
```

We set a different `mask-composite` value for each image:

```css
.add img {
  mask-composite: add;
}
.subtract img {
  mask-composite: subtract;
}
.intersect img {
  mask-composite: intersect;
}
.exclude img {
  mask-composite: exclude;
}
```

```css
div::before {
  content: "mask-composite: " attr(class);
  display: block;
  text-align: center;
  font-family: monospace;
}
body {
  flex-flow: row wrap;
}
```

The semi-transparent star mask is added to, subtracted from, intersected with, or excluded from the striped mask, depending on the `mask-composite` value.

The `mask-composite` property is only relevant in cases with two or more mask layers. This reads "mask layers", not "mask images" because, if `none` is included, the transparent black mask is composited. A `none` value can have a profound effect on masking in the case of `subtract` and `intersect`. For example, if the `mask-mode` resolves to `luminance`, subtracting a black mask will remove the entire mask (the element will be hidden). Similarly, if `none` is the last layer with `mask-composite: intersect` set for that layer, the entire element will be hidden. Here, we add a third layer, with `none`, to the previous example:

```css
img {
  mask-image:
    url("https://mdn.github.io/shared-assets/images/examples/mask-star.svg"),
    repeating-linear-gradient(
      to bottom right,
      red 0 20px,
      #ff000055 20px 40px,
      transparent 40px 60px
    ),
    none;
}
```

Note how the `intersect` example excludes everything because the transparent black mask doesn't intersect anything.

If we reverse the order of the mask layers, we can also get very different results:

```html
<div class="subtract">
  <img
    class="gradientFirst"
    src="https://mdn.github.io/shared-assets/images/examples/progress-pride-flag.jpg"
    alt="Pride flag" />
</div>
<div class="subtract">
  <img
    class="starFirst"
    src="https://mdn.github.io/shared-assets/images/examples/progress-pride-flag.jpg"
    alt="Pride flag" />
</div>
```

```css
.gradientFirst {
  mask-image:
    repeating-linear-gradient(
      to bottom right,
      red 0 20px,
      #ff000055 20px 40px,
      transparent 40px 60px
    ),
    url("https://mdn.github.io/shared-assets/images/examples/mask-star.svg");
}
.starFirst {
  mask-image:
    url("https://mdn.github.io/shared-assets/images/examples/mask-star.svg"),
    repeating-linear-gradient(
      to bottom right,
      red 0 20px,
      #ff000055 20px 40px,
      transparent 40px 60px
    );
}
```

In the first example, the stars are subtracted from the stripes. In the second, the stripes are subtracted from the stars.

Like all the other `mask` component properties, `mask-composite` takes a comma-separated list of values. Because the property effects how masks are combined, this property is only relevant for multiple mask layers and the number of used values is one less than the number of mask layers.

The last pair of masks is composited first. The previous mask image is then composited with the previous composition.

Continuing with the `masked-element` example, if we don't explicitly set the `mask-composite` property, it will default to `add` for each layer, as if we had set the following:

```css
.masked-element {
  mask-image:
    url("alphaImage.png"), linear-gradient(to right, black, transparent),
    radial-gradient(circle, white 50%, transparent 75%), none, url("#svg-mask");
  mask-mode: match-source;
  mask-position: 0% 0%;
  mask-origin: border-box;
  mask-clip: border-box;
  mask-size: auto;
  mask-repeat: repeat;
  mask-composite: add;
}
```

In this case, the `<mask>` element will be composited with the `none` layer. Then the radial gradient will be composited with the result of the previous composition, and so on.

Like we saw with all the other component properties, we could have used the `mask` shorthand:

```css
.masked-element {
  mask:
    url("alphaImage.png") 0% 0% / auto repeat border-box border-box add
      match-source,
    linear-gradient(to right, black, transparent) 0% 0% / auto repeat border-box
      border-box add match-source,
    radial-gradient(circle, white 50%, transparent 75%) 0% 0% / auto repeat
      border-box border-box add match-source,
    none 0% 0% / auto repeat border-box border-box add match-source,
    url("#svg-mask") 0% 0% / auto repeat border-box border-box add match-source;
}
```

## See also

- Introduction to CSS masking
- Introduction to CSS clipping
- CSS masking module
