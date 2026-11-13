---
title: "Using relative colors (part 2 of 4)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/colors/using_relative_colors/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Using relative colors (part 2 of 4)

## Channel values resolve to `<number>` values

To make channel value calculations work in relative colors, all origin color channel values resolve to appropriate `<number>` values. For example, in the `lch()` examples above, we are calculating new lightness values by adding or subtracting numbers from the origin color's `l` channel value. If we tried to do `calc(l + 20%)`, that would result in an invalid color — `l` is a `<number>` and cannot have a `<percentage>` added to it.

- Channel values originally specified as a `<percentage>` resolve to a `<number>` appropriate for the output color function.
- Channel values originally specified as a `hue` angle resolve to a number of degrees in a range of `0` to `360`, inclusive.

Check the different color function pages for the specifics of what their origin channel values resolve to.

## Origin colors outside the sRGB gamut

Converting an origin color to the output color space does not clamp its channels to that space's usual range. In the following example, `color(display-p3 1 0.5 0.5)` is inside the Display P3 gamut but outside sRGB—its red channel, expressed on the `rgb()` scale, is approximately `273.88`, which is greater than `255`. The `background-color` calculation uses that out-of-range value, so the red value ends up as `272.88`. No clamping ever happens in this calculation. Whether the final background color can be rendered accurately depends on the display's capability.

```css
.very-red {
  --origin: color(display-p3 1 0.5 0.5);
  background-color: rgb(from var(--origin) calc(r - 1) g b);
}
```

The absolute `rgb()` notation does clamp its arguments, so if you write `--origin: rgb(273.88 117.95 123.15)`, then the red channel would start at `255` and the background color's red channel would be `254`.

## Checking for browser support

You can check that a browser supports relative color syntax by running it through a `@supports` at-rule.

For example:

```css
@supports (color: hsl(from white h s l)) {
  /* safe to use hsl() relative color syntax */
}
```
