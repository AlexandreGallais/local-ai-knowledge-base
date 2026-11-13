---
title: "Using relative colors (part 1 of 4)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/colors/using_relative_colors/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Using relative colors

The CSS colors module defines **relative color syntax**, which allows a CSS `<color>` value to be defined relative to another color. This is a powerful feature that enables the programmatic creation of complements to existing colors — such as lighter, darker, saturated, semi-transparent, or inverted variants — enabling more effective color palette creation.

This article explains relative color syntax, shows what the different options are, and looks at some illustrative examples.

## General syntax

A relative CSS color value has the following general syntax structure:

```css
color-function(from origin-color channel1 channel2 channel3)
color-function(from origin-color channel1 channel2 channel3 / alpha)

/* color space included in the case of color() functions */
color(from origin-color colorspace channel1 channel2 channel3)
color(from origin-color colorspace channel1 channel2 channel3 / alpha)
```

Relative colors are created using the same color functions as absolute colors, but with different parameters:

1. Include a basic color function (represented by _`color-function()`_ above) such as `rgb()`, `hsl()`, etc. Which one you pick depends on the color model you want to use for the relative color you are creating (the **output color**).
2. Pass in the **origin color** (represented above by _`origin-color`_) your relative color will be based on, preceded by the `from` keyword. This can be any valid `<color>` value using any available color model including a color value contained in a CSS custom property, system colors, `currentColor`, or even another relative color.
3. In the case of the `color()` function, include the _`colorspace`_ of the output color.
4. Provide an output value for each individual channel. The output color is defined after the origin color — represented above by the _`channel1`_, _`channel2`_, and _`channel3`_ placeholders. The channels defined here depend on the color function you are using for your relative color. For example, if you are using `hsl()`, you would need to define the values for hue, saturation, and lightness. Each channel value can be a new value, the same as the original value, or a value relative to the channel value of the origin color.
5. Optionally, an `alpha` channel value of type `<alpha-value>` for the output color can be defined, preceded by a slash (`/`). If the `alpha` channel value is not explicitly specified, it defaults to the alpha channel value of the _`origin-color`_ (not 100%, which is the case for absolute color values).

The browser converts the origin color to a syntax compatible with the color function then destructures it into component color channels (plus the `alpha` channel if the origin color has one). These are made available as appropriately-named values inside the color function — `r`, `g`, `b`, and `alpha` in the case of the `rgb()` function, `l`, `a`, `b`, and `alpha` in the case of the `lab()` function, `h`, `w`, `b`, and `alpha` in the case of `hwb()`, etc. — that can be used to calculate new output channel values.

Let's look at relative color syntax in action. The below CSS is used to style two `` elements, one with an absolute background color — `red` — and one with a relative background color created with the `rgb()` function, based on the same `red` color value:

```html
<div id="container">
  <div class="item" id="one"></div>
  <div class="item" id="two"></div>
</div>
```

```css
#container {
  display: flex;
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
}

.item {
  flex: 1;
  margin: 20px;
}
```

```css
#one {
  background-color: red;
}

#two {
  background-color: rgb(from red 200 g b / alpha);
}
```

The output is as follows:

The relative color uses the `rgb()` function, which takes `red` as the origin color, converts it to an equivalent `rgb()` color (`rgb(255 0 0)`) and then defines the new color as having a red channel of value `200` and green, blue and alpha channels with a value the same as the origin color (it uses the `g` and `b` values made available inside the function by the browser, which are both equal to `0`, and the `alpha` is `100%`).

This results in an output of `rgb(200 0 0)` — a slightly darker red. If we had specified a red channel value of `255` (or just the `r` value), the resulting output color would be exactly the same as the input value. The browser's final output color (the computed value) is an sRGB `color()` value equivalent to `rgb(200 0 0)` — `color(srgb 0.784314 0 0)`.

> **Note:**
> As mentioned above, when calculating a relative color the first thing the browser does is to convert the provided origin color (`red` in the above example) into a value compatible with the color function being used (in this case, `rgb()`). This is done so that the browser is able to calculate the output color from the origin color. While the calculations are performed relative to the color function used, the actual output color value depends on the color's color space:
>
> - Older sRGB color functions cannot express the full spectrum of visible colors. The output colors of (`hsl()`, `hwb()`, and `rgb()`) are serialized to `color(srgb)` to avoid these limitations. That means that querying the output color value via the `HTMLElement.style` property or the `CSSStyleDeclaration.getPropertyValue()` method returns the output color as a `color(srgb ...)` value.
> - For more recent color functions (`lab()`, `oklab()`, `lch()`, and `oklch()`), relative color output values are expressed in the same syntax as the color function used. For example, if a `lab()` color function is being used, the output color will be a `lab()` value.

All the following lines produce an equivalent output color:

```css
red
rgb(255 0 0)
rgb(from red 255 0 0)
rgb(from red 255 0 0 / 1)
rgb(from red 255 0 0 / 100%)

rgb(from red 255 g b)
rgb(from red r 0 0)
rgb(from red r g b / 1)
rgb(from red r g b / 100%)

rgb(from red r g b)
rgb(from red r g b / alpha)

/* With `red`, the g and b are the same, making them interchangeable */
rgb(from red r g g)
rgb(from red r b b)
rgb(from red 255 g g)
rgb(from red 255 b b)
```

## Syntax flexibility

There is an important distinction to be made between the destructured origin color channel values made available in the function, and the channel values of the output color set by the developer.

To reiterate, when a relative color is defined, the channel values of the origin color are made available in the function to use when defining the output color channel values. The following example defines a relative color using an `rgb()` function and uses the origin color channel values (made available as `r`, `g`, and `b`) for the output channel values, meaning that the output color is the same as the origin color:

```css
rgb(from red r g b)
```

However, when specifying the output values, you don't need to use the origin color channel values at all. You need to provide the output channel values in the right order (e.g., red, then green, then blue in the case of `rgb()`), but they can be any values you wish provided they are valid values for those channels. This gives relative CSS colors a high degree of flexibility.

For example, if you wanted to, you could specify absolute values like those shown below, transforming `red` into `blue`:

```css
rgb(from red 0 0 255)
/* output color is equivalent to rgb(0 0 255), full blue */
```

> **Note:**
> If you are using relative color syntax but outputting the same color as the origin color or a color not based on the origin color at all, you are not really creating a relative color. You'd be unlikely to ever do this in a real codebase, and would probably just use an absolute color value instead. But, we felt it useful to explain that you _can_ do this with relative color syntax, as a starting point for learning about it.

You can even mix up or repeat the provided values. The following takes a slightly darker red as an input and outputs a light gray color — the output color's `r`, `g`, and `b` channels are all set to the origin color's `r` channel value:

```css
rgb(from rgb(200 0 0) r r r)
/* output color is equivalent to rgb(200 200 200), light gray */
```

The following uses the origin color's channel values for the output color's `r`, `g`, and `b` channel values, but in reverse order:

```css
rgb(from rgb(200 170 0) b g r)
/* output color is equivalent to rgb(0 170 200) */
```

## Color functions that support relative colors

In the section above we only saw relative colors defined via the `rgb()` function. However, relative colors can be defined using any modern CSS color function — `color()`, `hsl()`, `hwb()`, `lab()`, `lch()`, `oklab()`, `oklch()`, or `rgb()`. The general syntax structure is the same in each case, although the origin color values have different names appropriate for the function being used.

Below you can find relative color syntax examples for each color function. Each case is the simplest possible, with the output color channel values exactly matching the origin color channel values:

```css
/* color() with and without alpha channel */
color(from red a98-rgb r g b)
color(from red a98-rgb r g b / alpha)

color(from red xyz-d50 x y z)
color(from red xyz-d50 x y z / alpha)

/* hsl() with and without alpha channel */
hsl(from red h s l)
hsl(from red h s l / alpha)

/* hwb() with and without alpha channel */
hwb(from red h w b)
hwb(from red h w b / alpha)

/* lab() with and without alpha channel */
lab(from red l a b)
lab(from red l a b / alpha)

/* lch() with and without alpha channel */
lch(from red l c h)
lch(from red l c h / alpha)

/* oklab() with and without alpha channel */
oklab(from red l a b)
oklab(from red l a b / alpha)

/* oklch() with and without alpha channel */
oklch(from red l c h)
oklch(from red l c h / alpha)

/* rgb() with and without alpha channel */
rgb(from red r g b)
rgb(from red r g b / alpha)
```

It is worth mentioning again that the color system of the origin color doesn't need to match the color system being used to create the output color. Again, this provides a lot of flexibility. Generally you won't be interested in and might not even know the system the origin color is defined in (you might just have a custom property value to manipulate). You'll just want to input a color and, for example, create a lighter variant of it by putting it into an `hsl()` function and varying the lightness value.

## Using custom properties

When creating a relative color, you can use values defined in CSS custom properties both for the origin color and within the output color channel value definitions. Let's look at an example.

In the below CSS we define two custom properties:

- `--base-color` contains our base brand color — `purple`. Here we are using a named color keyword, but relative colors can accept any color syntax for the origin color.
- `--standard-opacity` contains the standard brand opacity value that we want to apply to semi-transparent boxes — `0.75`.

We then give two `` elements a background color. One is given an absolute color — our `--base-color` brand purple. The other one is given a relative color equal to our brand purple, transformed to add an alpha channel equal to our standard opacity value.

```html
<div id="container">
  <div class="item" id="one"></div>
  <div class="item" id="two"></div>
</div>
```

```css
#container {
  display: flex;
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  background-image: repeating-linear-gradient(
    45deg,
    white,
    white 24px,
    black 25px,
    black 50px
  );
}

.item {
  flex: 1;
  margin: 20px;
}
```

```css
:root {
  --base-color: purple;
  --standard-opacity: 0.75;
}

#one {
  background-color: var(--base-color);
}

#two {
  background-color: hwb(from var(--base-color) h w b / var(--standard-opacity));
}
```

The output is as follows:

## Using math functions

You can use CSS math functions such as `calc` to calculate values for the output color channels. Let's look at an example.

The below CSS is used to style three `` elements with different background colors. The middle one is given an unmodified `--base-color`, while the left and right ones are given lightened and darkened variants of that `--base-color`. These variants are defined using relative colors — the `--base-color` is passed into an `lch()` function, and the output color has its lightness channel modified to achieve the desired effect via a `calc()` function. The lightened color has 20% added to the lightness channel, and the darkened color has 20% subtracted from it.

```html
<div id="container">
  <div class="item" id="one"></div>
  <div class="item" id="two"></div>
  <div class="item" id="three"></div>
</div>
```

```css
#container {
  display: flex;
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
}

.item {
  flex: 1;
  margin: 20px;
}
```

```css
:root {
  --base-color: orange;
}

#one {
  background-color: lch(from var(--base-color) calc(l + 20) c h);
}

#two {
  background-color: var(--base-color);
}

#three {
  background-color: lch(from var(--base-color) calc(l - 20) c h);
}
```

The output is as follows:

## Manipulating the alpha channel

This example demonstrates changing the alpha channel of a named color. Here, we have an item wrapped in a container that both have a `teal` background. To distinguish between the backgrounds, we vary the alpha channel value using the relative color feature, the `calc()` function, and a custom property.

```html
<div class="container">
  <div class="item"></div>
</div>
```

```css
.container {
  padding: 60px;
}

.item {
  height: 60px;
}
```

```css
div {
  background-color: rgb(
    from teal r g b / calc(alpha * var(--alpha-multiplier))
  );
}

.container {
  --alpha-multiplier: 0.3;
}

.item {
  --alpha-multiplier: 1;
}
```

The alpha channel is referenced using the `alpha` keyword. In this case, the `calc(alpha * var(--alpha-multiplier))` expression modifies the alpha channel value by multiplying `alpha` with the `--alpha-multiplier` custom property value. The container gets a semitransparent background because of the multiplier of `0.3` is less than `1.0`.

The output is as follows:
