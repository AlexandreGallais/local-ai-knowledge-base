---
title: "Using CSS typed arithmetic (part 1 of 2)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/values_and_units/using_typed_arithmetic/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Using CSS typed arithmetic

**CSS typed arithmetic** refers to permitted calculations performed with typed CSS values via functions such as `calc()`, and specifically, to the behavior defined in the CSS values and units module. CSS typed arithmetic enables dividing a value with one unit by a value with a different unit of the same data type, resulting in unitless quotients.

These quotients can then be used as a `number` in the values of unitless properties, or converted into any numeric data type (such as a `length`, `percentage`, or `angle`) by multiplying them by a numeric typed value.

This typed arithmetic behavior enables relationships to be created between different values on a page. This article explores typed arithmetic and presents several examples that make use of it.

> **Note:**
> Originally, the CSS values and units module limited the arguments multiplication and division operations could take to make dividing by zero detectable at parse time and avoid issues such as squared units. Typed arithmetic relaxes some of those restrictions in supporting browsers.

## CSS typed arithmetic rules

When performing calculations on values in CSS, there are some rules around compatibility of values with different data types.

### Addition and subtraction

When adding or subtracting values, all the values must be within the same overall data type. The following examples all produce valid results:

```css
/* <length-percentage> units */
calc(250px - 150px)
calc(100% - 50px)
calc(50vw + 2rem)
calc(25cqw + 3in)

/* <angle> units */
calc(40deg + 2rad)
calc(420deg - 1turn)
```

However, the following are invalid. The results of such mixed-type calculations would be meaningless:

```css
calc(200px + 100ms)
calc(50% + 90deg)
```

## Multiplication

When multiplying values in CSS, only one of the values can have a unit. All other values must be unitless `number` values. This is because you want a product that is a greater or lesser amount of the same unit, and do not want to create squared units, which no CSS properties accept.

```css
calc(200px * 4) /* 800px */
calc(60deg * 3) /* 180deg */
```

If you try to multiply two values with units — even the same units — normal mathematical rules dictate that the units should be multiplied as well. For example:

```css
calc(200px * 4px)
```

In this case, the function is invalid as <code>800px2</code> is meaningless in CSS.

## Division

When dividing values in CSS, you can divide a value with a unit by a unitless value:

```css
calc(1000px / 2) /* 500px */
calc(360deg / 4) /* 90deg */
```

However, you can't divide a unitless value by a value with a unit as that doesn't make sense:

```css
calc(1000 / 2px) /* ?!? */
```

When a value of any numeric data type is divided by a value of the same type, the units cancel each other out, and you are left with a unitless value. Behind the scenes, the two values are computed before being divided by one another.

As a result, the same calculation can have very different results depending on the context it is used in and the units of the divisor.

Take the following example:

```css
calc(100vw / 1px)
```

The `100vw` is equal to `100%` of the width of the viewport. If the viewport is currently `1000px` wide, the calculation will return the unitless value `1000`. However, if the viewport is `500px` wide, the calculation will return the unitless value `500`.

If we replace the `1px` divisor by `1em`, we get very different results:

```css
calc(100vw / 1em)
```

If the viewport is `1000px` wide, and `1em` is equal to the browser default of `16px` at the point of calculation, the previous calculation will return `1000px / 16px` = `62.5`.

It used to be the case that you couldn't divide one typed value by another, even if the two values have units of the same type. However, the specification was updated to permit this; check for browser compatibility.

## Why is the behavioral update useful?

Being able to divide one typed value by another of the same type may not sound very significant at first, but it enables useful associations between different values that can be used to create responsive UI features.

The key to all of this is being able to represent values in a unitless form via divisions like this one:

```css
--viewport-width-in-pixels: calc(100vw / 1px);
```

The result is a `number` representing the viewport width in pixels as a unitless value. This can be used anywhere a number is valid, including other `calc()` functions. You can dynamically vary other property values based on this value, regardless of what units they have.

For example, the unitless value can be immediately transferred to `opacity`:

```css
opacity: calc(var(--viewport-width-in-pixels) / 1000 - 0.5);
```

You can multiply it by a value such as `1deg` to create an `<angle>` value:

```css
rotate: calc(var(--viewport-width-in-pixels) * 1deg);
```

You can multiply it by a value such as `1rem` to create a `<length>` value:

```css
font-size: calc(var(--viewport-width-in-pixels) * 1rem / 200);
```

Let's walk through some examples to show how CSS typed arithmetic can be useful.

## Basic <example-value>: responsive background opacity

The responsive background opacity example (see source code) shows how to vary the opacity of a background image as the viewport width is changed. Having the background image fade out as the screen gets narrower means the image is less likely to affect the readability of the text content as they start to overlap.

### HTML

The HTML contains some basic text content wrapped in a `` element.

```html
<div class="wrapper">
  <h1>Prose of the century</h1>
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla luctus
    aliquam dolor, eu lacinia lorem placerat vulputate. Duis felis orci,
    pulvinar id metus ut, rutrum luctus orci. Cras porttitor imperdiet nunc, at
    ultricies tellus laoreet sit amet.
  </p>
</div>
```

### CSS

We start by defining a CSS custom property called `--width-percentage` on the `:root` element, which contains the result of the calculation `100vw / 2000px`. This value represents the viewport width as a percentage of `2000px` that we will later use as an alpha channel value. When the viewport is `2000px` wide, the calculation will return `1`, which is equivalent to `100%` alpha. Anything less than a `2000px` viewport width will result in a smaller value.

```css
:root {
  --width-percentage: calc((100vw / 2000px));
}
```

> **Note:**
> Any alpha value greater than `1` is treated as `1`, therefore we don't need to clamp the maximum value.

We then set a fixed `width` and some `padding` on the wrapper ``, and center it horizontally using `margin`.

```css
.wrapper {
  width: 480px;
  padding: 20px;
  margin: 0 auto;
}
```

Finally, we set multiple backgrounds on the `<body>` element. We'll go through these in reverse order:

1. The last and therefore bottom-most `background` value is a non-repeating background image located near the top-right corner.
2. The top background is a white semi-transparent overlay created using a `linear-gradient()` function with both color stops set to the same color. The color's alpha channel value is calculated as `1` minus the `--width-percentage` custom property we set earlier: As the viewport width gets narrower, `--width-percentage` will get smaller, therefore the white gradient will become more opaque, reducing the opacity of the background image.

```css
body {
  background:
    linear-gradient(
      rgb(255 255 255 / calc(1 - var(--width-percentage))),
      rgb(255 255 255 / calc(1 - var(--width-percentage)))
    ),
    url("https://mdn.github.io/shared-assets/images/examples/colorful-heart.png")
      no-repeat top 50px right 50px;
}
```

### Result

To see the result, view our responsive background opacity example live (see source code). Try altering the viewport width to see how the background opacity varies as a result.

## Varying values of different types based on a single value

The different type variations example (see source code) works in a very similar way to the previous example, except that in this case, we demonstrate the use of a single variable value in the definition of multiple other values with different data types.

Specifically, we set a paragraph's background color _and_ font size based on the viewport width.

### HTML

The markup for this example contains a paragraph of text:

```html
<p>Hello there!</p>
```

### CSS

We start off our CSS in a similar way to the previous demo, creating a unitless value based on the viewport width. This time, we calculate it by dividing `100vw` by `1px` and store the resulting number in a custom property called `--viewport-in-pixels`. The value represents the current viewport width in pixels, without any units.

```css
:root {
  --viewport-in-pixels: calc(100vw / 1px);
}
```

Now on to the styling of the paragraph itself. We first give it some basic <example-value> (a `border` and `text-align` of `center`), then set two values based on the `--viewport-in-pixels` property created earlier:

1. We set the `font-size` of the paragraph to a value equal to `--viewport-in-pixels` divided by `200`, multiplied by `1em` to convert the numeric quotient into `em`s.
2. We set the `background-color` of the paragraph to an `lch()` color value. The lightness and chroma components are constant values (`75%` and `50%`, respectively), whereas the hue component is set to `--viewport-in-pixels` divided by `10`, plus `100`. We then multiply the result of that by `1deg` to ensure the value is an `angle`.
   > **Note:**
   > This last step is not strictly necessary, as `lch()` also accepts unitless hue values. However, a degree value may be more intuitive, and we wanted to show another example of how the unitless value can be converted into a different data type.

```css
p {
  border: 5px solid black;
  text-align: center;
  font-size: calc(1em * (var(--viewport-in-pixels) / 200));
  background-color: lch(
    75% 50% calc((100 + (var(--viewport-in-pixels) / 10)) * 1deg)
  );
}
```

### Result

To see the result, view our different type variations example live (see source code). Try altering the viewport width to see how the paragraph font size and background color both vary as a result.
