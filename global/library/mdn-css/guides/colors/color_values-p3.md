---
title: "CSS color values (part 3 of 3)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/colors/color_values/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSS color values (part 3 of 3)

## Additional color functional notations

### The `color()` function

If you want explicit control over color spaces when defining colors, you can use the `color()` function.

This is useful to describe a color for high-definition devices with wider color gamuts.
For example, if you wanted to show the `display-p3 0 0 1` color, which is outside of the sRGB gamut, you could use a `@media` `color-gamut` at-rule to detect if the client's hardware supports colors in this range before trying to use it:

```css
.vibrant {
  background-color: color(srgb 0 0 1);
}

@media (color-gamut: p3) {
  .vibrant {
    background-color: color(display-p3 0 0 1);
    /* Equivalent to out-of-gamut color(srgb 0 0 1.042) */
  }
}
```

Understanding `color()` is important when it comes to relative colors, discussed next. The older sRGB color notations discussed above — `hsl()`, `hwb()`, and `rgb()`— do not express the full spectrum of visible colors, while the `color()` function supports a much wider color gamut. As a result, when using the older functions types to define relative colors, the output color returned by querying `HTMLElement.style` property or the `CSSStyleDeclaration.getPropertyValue()` method will be a `color(srgb ...)` value.

To see an example of converting the `rgb()`, `hsl()`, `hwb()`, and other color formats, check out our color format converter tool.

### Relative colors

Every color function listed above can be used to define **relative colors**, which allows `<color>` values to be defined relative to other existing colors, rather than defining a color value from scratch each time. This powerful feature enables the creation of complements to existing colors — such as lighter, darker, saturated, semi-transparent, or inverted variants of an original color. Relative colors provide an effective mechanism to create palettes and define color adjustments. See each color function page to learn more about their relative syntaxes.

As noted above, when using `rgb()`, `hsl()`, or `hwb()` to output a relative color, the output color will be a `color()` function in the `srgb` color space.

### color-mix() function

The `color-mix()` function takes two color values of any syntax mentioned above, optionally with proportional percent values for each color, and returns the result of mixing them in a given colorspace by a given amount.

### light-dark() function

The `light-dark()` function lets you specify two color values for a property intended for use in light and dark color schemes, respectively. Which one is set depends on whether the developer has set or the user has requested a light or dark color scheme. This is a shortcut function, allowing you to achieve the same results as the `prefers-color-scheme` media feature query but with less code.

## See also

- Applying color to HTML elements using CSS
- Using color wisely
- Using relative colors
- Understanding color and luminance
- WCAG 1.4.1: Color contrast
- CSS color module
