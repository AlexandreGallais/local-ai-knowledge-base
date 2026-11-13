---
title: "CSS value functions (part 1 of 2)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/values/functions/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSS value functions

**CSS value functions** are statements that invoke special data processing or calculations to return a CSS value for a CSS property. CSS value functions represent more complex data types and they may take some input arguments to calculate the return value.

## Syntax

```plain
selector {
  property: function([argument]? [, argument]!);
}
```

The value syntax starts with the **name of the function**, followed by a left parenthesis `(`. Next up are the argument(s), and the function is finished off with a closing parenthesis `)`.

Functions can take multiple arguments, which are formatted similarly to CSS property values. Whitespace is allowed, but they are optional inside the parentheses. In some functional notations multiple arguments are separated by commas, while others use spaces.

> **Note:**
> The CSS value functions are used as property values and should not be confused with pseudo-classes. The functional pseudo-classes, linguistic pseudo-classes, and several tree-structural pseudo-classes require parameter values, but they're not value functions. The conditional at-rules are also not value functions; the parentheses are used for groupings.

## Transform functions

The `<transform-function>` CSS data type represent appearance transformation. It is used as a value of `transform` property.

### Translate functions

- `translateX()`
    Translates an element horizontally.
- `translateY()`
    Translates an element vertically.
- `translateZ()`
    Translates an element along the z-axis.
- `translate()`
    Translates an element on the 2D plane.
- `translate3d()`
    Translates an element in 3D space.

### Rotation functions

- `rotateX()`
    Rotates an element around the horizontal axis.
- `rotateY()`
    Rotates an element around the vertical axis.
- `rotateZ()`
    Rotates an element around the z-axis.
- `rotate()`
    Rotates an element around a fixed point on the 2D plane.
- `rotate3d()`
    Rotates an element around a fixed axis in 3D space.

### Scaling functions

- `scaleX()`
    Scales an element up or down horizontally.
- `scaleY()`
    Scales an element up or down vertically.
- `scaleZ()`
    Scales an element up or down along the z-axis.
- `scale()`
    Scales an element up or down on the 2D plane.
- `scale3d()`
    Scales an element up or down in 3D space.

### Skew functions

- `skewX()`
    Skews an element in the horizontal direction.
- `skewY()`
    Skews an element in the vertical direction.
- `skew()`
    Skews an element on the 2D plane.

### Matrix functions

- `matrix()`
    Describes a homogeneous 2D transformation matrix.
- `matrix3d()`
    Describes a 3D transformation as a 4×4 homogeneous matrix.

### Perspective functions

- `perspective()`
    Sets the distance between the user and the z=0 plane.

## Math functions

The math functions allow CSS numeric values to be written as mathematical expressions.

Each of the pages below contains detailed information about a math function's syntax, browser compatibility data, examples, and more. For a holistic introduction to CSS math functions, see Using CSS math functions.

### Basic <example-value>

- `calc()`
    Performs basic <example-value> calculations on numerical values.
- `calc-size()`
    Perform calculations on intrinsic size values such as `auto`, `fit-content`, and `max-content`, which are not supported by the `calc()` function.

### Comparison functions

- `min()`
    Calculates the smallest of a list of values.
- `max()`
    Calculates the largest of a list of values.
- `clamp()`
    Calculates the central of a minimum, central, and maximum values.

### Stepped value functions

- `round()`
    Calculates a rounded number based on a rounding strategy.
- `mod()`
    Calculates a modulus (with the same sign as the divisor) when dividing one number by another.
- `progress()`
    Calculates the position of a value between two other values — a start value and an end value. The result represents the progress between the start and end values, where 0 is the start, and 1 is the end.
- `rem()`
    Calculates a remainder (with the same sign as the dividend) when dividing one number by another.

### Trigonometric functions

- `sin()`
    Calculates the trigonometric sine of a number.
- `cos()`
    Calculates the trigonometric cosine of a number.
- `tan()`
    Calculates the trigonometric tangent of a number.
- `asin()`
    Calculates the trigonometric inverse sine of a number.
- `acos()`
    Calculates the trigonometric inverse cosine of a number.
- `atan()`
    Calculates the trigonometric inverse tangent of a number.
- `atan2()`
    Calculates the trigonometric inverse tangent of two-numbers in a plane.

### Exponential functions

- `pow()`
    Calculates the base raised to the power of a number.
- `sqrt()`
    Calculates the square root of a number.
- `hypot()`
    Calculates the square root of the sum of the squares of its arguments.
- `log()`
    Calculates the logarithm of a number.
- `exp()`
    Calculates `e` raised to the power of a number.

### Random value functions

- `random`
    Generates a random value between a minimum and maximum value.

### Sign-related functions

- `abs()`
    Calculates the absolute value of a number.
- `sign()`
    Calculates the sign (positive or negative) of the number.

## Filter functions

The `filter-function` CSS data type represents a graphical effect that can change the appearance of an input image. It is used in the `filter` and `backdrop-filter` properties.

- `blur()`
    Increases the image gaussian blur.
- `brightness()`
    Brightens or darkens an image.
- `contrast()`
    Increases or decreases the image contrast.
- `drop-shadow()`
    Applies a drop shadow behind an image.
- `grayscale()`
    Converts an image to grayscale.
- `hue-rotate()`
    Changes the overall hue of an image.
- `invert()`
    Inverts the colors of an image.
- `opacity()`
    Adds transparency to an image.
- `saturate()`
    Changes the overall saturation of an image.
- `sepia()`
    Increases the sepia of an image.

## Color functions

The `<color>` CSS data type specifies different color representations.

- `rgb()`
    Defines a given color according to its red, green, blue and alpha (transparency) components.
- `hsl()`
    Defines a given color according to its hue, saturation, lightness and alpha (transparency) components.
- `hwb()`
    Defines a given color according to its hue, whiteness and blackness components.
- `lch()`
    Defines a given color according to its lightness, chroma and hue components.
- `oklch()`
    Defines a given color according to its lightness, chroma, hue and alpha (transparency) components.
- `lab()`
    Defines a given color according to its lightness, a-axis distance and b-axis distance in the Lab colorspace.
- `oklab()`
    Defines a given color according to its lightness, a-axis distance, b-axis distance in the Lab colorspace and alpha (transparency).
- `color()`
    Specifies a particular, specified colorspace rather than the implicit sRGB colorspace.
- `color-mix()`
    Mixes two color values in a given colorspace by a given amount.
- `contrast-color()`
    Returns a color with maximum color contrast for a given color.
- `device-cmyk()`
    Defines CMYK colors in a device-dependent way.
- `alpha()`
    Returns a color with a modified alpha (transparency) channel.
- `light-dark()`
    Returns one of two provided colors based on the current color scheme.
- `dynamic-range-limit-mix()`
    Creates a custom maximum luminance limit that is a mix of different `dynamic-range-limit` keywords in specified percentages.

## Image functions

The `image` CSS data type provides graphical representation of images or gradients.

### Gradient functions

- `linear-gradient()`
    Linear gradients transition colors progressively along an imaginary line.
- `radial-gradient()`
    Radial gradients transition colors progressively from a center point (origin).
- `conic-gradient()`
    Conic gradients transition colors progressively around a circle.
- `repeating-linear-gradient()`
    Is similar to `linear-gradient()` and takes the same arguments, but it repeats the color stops infinitely in all directions so as to cover its entire container.
- `repeating-radial-gradient()`
    Is similar to `radial-gradient()` and takes the same arguments, but it repeats the color stops infinitely in all directions so as to cover its entire container.
- `repeating-conic-gradient()`
    Is similar to `conic-gradient()` and takes the same arguments, but it repeats the color stops infinitely in all directions so as to cover its entire container.

### Image functions

- `image()`
    Defines an `image` in a similar fashion to the `<url>` type, but with added functionality including specifying the image's directionality and fallback images for when the preferred image is not supported.
- `image-set()`
    Picks the most appropriate CSS image from a given set, primarily for high pixel density screens.
- `cross-fade()`
    Blends two or more images at a defined transparency.
- `element()`
    Defines an `image` value generated from an arbitrary HTML element.
- `paint()`
    Defines an `image` value generated with a PaintWorklet.

## Counter functions

CSS counter functions are generally used with the `content` property, although in theory, they may be used wherever a `<string>` is supported.

- `counter()`
    Returns a string representing the current value of the named counter if there is one.
- `counters()`
    Enables nested counters, returning a concatenated string representing the current values of the named counters, if there are any.
- `symbols()`
    Defines the counter styles inline, directly as the value of a property.

## Shape functions

### Basic <example-value>

The `basic-shape` CSS data type represents a graphical shape. It is used in the `clip-path`, `offset-path`, and `shape-outside` properties.

- `circle()`
    Defines a circle shape.
- `ellipse()`
    Defines an ellipse shape.
- `inset()`
    Defines an inset rectangle shape.
- `rect()`
    Defines a rectangle shape using the distances from the top and left edges of the reference box.
- `xywh()`
    Defines a rectangle shape using the specified distances from the top and left edges of the reference box and the rectangle width and height.
- `polygon()`
    Defines a polygon shape.
- `path()`
    Accepts an SVG path string to enable a shape to be drawn.
- `shape()`
    Accepts a comma-separated list of commands defining the shape to be drawn.

### Other shape functions

- `ray()`
    Valid with `offset-path`; defines the line segment an animated element can follow.
- `superellipse()`
    Defines the curvature of an ellipse; can be used to specify a `corner-shape-value`, which is used with `corner-shape` and its constituent and related properties.

## Reference functions

The following functions are used as a value of properties to reference a value defined elsewhere:

- `attr()`
    Uses the attributes defined on HTML element.
- `env()`
    Uses the user-agent defined as environment variable.
- `if()`
    Conditionally sets a property value depending on the result of a style query, media query, or feature query.
- `url()`
    Uses a file from the specified URL.
- `var()`
    Uses the custom property value instead of any part of a value of another property.

## Grid functions

The following functions are used to define a CSS grid:

- `fit-content()`
    Clamps a given size to an available size according to the formula `min(maximum size, max(minimum size, argument))`.
- `minmax()`
    Defines a size range greater-than or equal-to _min_ and less-than or equal-to _max_.
- `repeat()`
    Represents a repeated fragment of the track list, allowing a large number of columns or rows that exhibit a recurring pattern.

## Font functions

CSS font functions are used with the `font-variant-alternates` property to control the use of alternate glyphs.

- `stylistic()`
    Enables stylistic alternates for individual characters. The parameter is a font-specific name mapped to a number. It corresponds to the OpenType value `salt`, like `salt 2`.
- `styleset()`
    Enables stylistic alternatives for sets of characters. The parameter is a font-specific name mapped to a number. It corresponds to the OpenType value `ssXY`, such as `ss02`.
- `character-variant()`
    Enables specific stylistic alternatives for characters. It is similar to `styleset()`, but doesn't create coherent glyphs for a set of characters; individual characters will have independent and not necessarily coherent styles. The parameter is a font-specific name mapped to a number. It corresponds to the OpenType value `cvXY`, such as `cv02`.
- `swash()`
    Enables swash glyphs. The parameter is a font-specific name mapped to a number. It corresponds to the OpenType values `swsh` and `cswh`, such as `swsh 2` and `cswh 2`.
- `ornaments()`
    Enables ornaments such as fleurons and other dingbat glyphs. The parameter is a font-specific name mapped to a number. It corresponds to the OpenType value `ornm`, such as `ornm 2`.
- `annotation()`
    Enables annotations such as circled digits or inverted characters. The parameter is a font-specific name mapped to a number. It corresponds to the OpenType value `nalt`, such as `nalt 2`.

## Easing functions

The `easing-function` CSS data type represents a mathematical function. It is used in transition and animation properties:

- `linear()`
    Easing function that interpolates linearly between its points.
- `cubic-bezier()`
    Easing function that defines a cubic Bézier curve.
- `steps()`
    Iteration along a specified number of stops along the transition, displaying each stop for equal lengths of time.

## Animation functions

The following functions are used as a value of different `animation-timeline` properties:

- `scroll()`
    Sets the `animation-timeline` of an element to an _anonymous scroll progress timeline_.
- `view()`
    Sets the `animation-timeline` of an element to an _anonymous view progress timeline_.

## Anchor positioning functions

The anchor positioning functions are used when positioning and sizing anchor-positioned elements relative to the location and size of their associated anchor elements.

- `anchor()`
    Returns a length relative to the position of the edges of an anchor-positioned element's associated anchor element.
- `anchor-size()`
    Returns a length relative to the size of the associated anchor element.

## Tree counting functions

The following functions return an integer value based on the DOM tree, rather than the flat tree like most CSS values do:

- `sibling-index()`
    Returns an integer reflecting the position of the selected element among its siblings.
- `sibling-count()`
    Returns an integer reflecting the total number of siblings, including the selected element.
