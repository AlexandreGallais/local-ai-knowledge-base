---
title: "`env()` CSS function (part 1 of 2)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/values/env/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `env()` CSS function

The **`env()`** CSS function can be used to insert the value of a user-agent defined environment variable into your CSS. Alternatively `env()` can be used to make dynamic values in external SVG files which updated using the `link-parameters` CSS property.

## Syntax

```css
/* Without a fallback value */
env(safe-area-inset-top);
env(titlebar-area-width);
env(viewport-segment-right 0 0);

/* With a fallback value */
env(safe-area-inset-right, 1em);
env(titlebar-area-y, 40px);
env(viewport-segment-width 0 0, 40%);
```

```svg
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <path fill="env(--color, black)" d="..." />
</svg>
```

### Parameters

The `env( <environment-variable> | <dashed-ident>, <fallback> | <declaration-value> )` function accepts the following parameters:

- `<environment-variable>`
    A `<custom-ident>` specifying the name of the environment variable to be inserted. If the name provided represents an array-like environment variable, the name is followed by `<integer>` values identifying the specific instance the name is referencing. The case-sensitive environment variable name can be one of the following:
    - `safe-area-inset-top`, `safe-area-inset-right`, `safe-area-inset-bottom`, `safe-area-inset-left`
        The safe distance from the top, right, bottom, or left inset edge of the viewport, defining where it is safe to place content into without risking it being cut off by the shape of a non‑rectangular display. The four values form a rectangle, inside which all content is visible. The values are `0` if the viewport is a rectangle and no features — such as toolbars or dynamic keyboards — are occupying viewport space; otherwise, it is a `px` value greater than `0`.
    - `safe-area-max-inset-top`, `safe-area-max-inset-right`, `safe-area-max-inset-bottom`, `safe-area-max-inset-left`
        The static maximum values of their dynamic `safe-area-inset-*` variable counterparts when all dynamic user interface features are retracted. While the `safe-area-inset-*` values change as the currently-visible content area changes, the `safe-area-max-inset-*` values are constants.
    - `titlebar-area-x`, `titlebar-area-y`, `titlebar-area-width`, `titlebar-area-height`
        The dimensions of a visible `titlebar-area-*` area. These variables are available when using the `window-controls-overlay` `display_override` manifest field. The variables' values can be used to ensure content doesn't overlap window control buttons (that is, minimize, maximize, and close) with progressive web apps (PWA) installed on desktop devices.
    - `keyboard-inset-top`, `keyboard-inset-right`, `keyboard-inset-bottom`, `keyboard-inset-left`, `keyboard-inset-width`, `keyboard-inset-height`
        The insets from the edge of the viewport and dimensions of the device's on-screen virtual keyboard. Defined in the `VirtualKeyboard API`.
    - `preferred-text-scale`
        The user's preferred font scaling factor, a number set in browser or OS-level preferences. This can be used to size content proportionally to browser or OS-set font sizes.
    - `viewport-segment-width`, `viewport-segment-height`, `viewport-segment-top`, `viewport-segment-right`, `viewport-segment-bottom`, `viewport-segment-left`
        The dimensions and offset positions of specific viewport segments. The `viewport-segment-*` keyword is followed by two space-separated `<integer>` values that indicate the segment's horizontal and vertical position, or indices. The viewport-segment keywords are only defined when the viewport is made up of two or more segments, as with foldable or hinged devices.

- `<dashed-ident>`
    A `<dashed-ident>` is a user-defined variable that can be used as an identifier in the `param` CSS function to update the value.

- `<fallback>` (optional)
    A fallback value to be inserted if the environment variable referenced in the first argument does not exist. Everything after the first comma is deemed to be the fallback value. This can be a single value, another `env()` function, or a comma-separated list of values.

- `<declaration_value>` (optional)
    A `<declaration_value>` is the default value of the SVG attribute being set dynamically. If the `<declaration-value>` is omitted, it represents an empty value.

## Description

The `env()` function is used to insert the value of a globally-scoped, user-agent-defined environment variable into your CSS. The `env()` function can be used as a property value or in place of any part of a property value or descriptor (for example, in Media query rules).

The function accepts an `<environment-variable>` as its first argument. This is a case-sensitive `<custom-ident>` equal to the name of the environment variable to be substituted, but it can also include additional space-separated values if required. For example, `env(viewport-segment-width 0 0)` would return the width of the top or left segment in the case of a device with multiple viewport segments.

The second argument, if provided, is the fallback value, which is used if the environment variable referenced in the first argument is not supported or doesn't exist. The fallback can be another environment variable, even with its own fallback.

The syntax of the fallback is similar to the fallback syntax of the `var()` function used to insert CSS custom properties in that it allows for multiple commas. Anything between the first comma and the end of the function is considered the fallback value. However, if the `env()` function is used within a property value or descriptor that doesn't include commas, a fallback value that includes commas will not be valid.

A property or descriptor containing a syntactically valid `env()` function is assumed to be valid at parse time, when the browser first reads and interprets the downloaded CSS text. It is only syntax-checked at compute time, after each `env()` function has been substituted with its browser-provided value (or the fallback value if the environment variable passed as the first parameter is not a recognized environment variable name). If the value is invalid and no fallback is provided, the property or descriptor containing the `env()` function is invalid at computed-value time.

When an `env()` substitution is invalid, and an invalid fallback is included, or the fallback is omitted, the declaration is not ignored. Instead, the initial or inherited value of the property is used. The property is set to a new value, but it may not be the expected one.

### Use cases

Originally provided by the iOS browser to allow developers to place their content in a safe area of the viewport, and not be obscured by device notches or rounded corners, the `safe-area-inset-*` values can be used to help ensure content is visible to viewers. This feature was later expanded beyond its initial purpose to enable use cases such as stopping device notifications from covering up some of the app user interface.

Another use case for `env()` variables is for desktop Progressive web apps (PWAs) that use the Window Controls Overlay feature to take advantage of the full application window surface area. Using the `titlebar-area-*` values, developers can position elements where the title bar would have been and ensure content is not obscured by window control buttons.

The `viewport-segment-*` variable names can be used to set your containers to fit neatly into the available segments of a multi-viewport-segment device such as a hinged or foldable device. The integers following the `viewport-segment-*` name indicate which segment of the multiple segments the environment variable is referencing.

The `preferred-text-scale` variable can be used to size website text or other UI features proportionally to browser or OS-set font sizes. For example, you could set the body font size to be a percentage based on the user-defined text scale:

```css
body {
  font-size: calc(100% * env(preferred-text-scale));
}
```

Sizes can also be set to be proportional to browser or OS-level font size by including `<meta name="text-scale" content="scale">` inside the document `<head>`. The `<meta>` tag should be used in favor of the `env(preferred-text-scale)` when possible, as the `<meta>` tag is supported across a wider range of platforms and is also simpler to use.

> **Warning:**
> Be careful using `env(preferred-text-scale)` when `<meta name="text-scale" content="scale">` is set as this will result in text scaling being applied twice when combined with relative sizes, such as `em` and `rem`. For example, when the `<meta>` is set, a declaration such as `font-size: calc(2rem * env(preferred-text-scale))` will cause small font sizes to be made even smaller and large font sizes larger.

### Names followed by integers

When the environment variable is array-like, meaning the name may reference more than once value, such as is the case with devices with multiple viewport segments, the `<environment-variable>` parameter includes both the name of the variable and the indices of the specific instance of the variable the function is referencing. For example, in the case of the `viewport-segment-*` variables, the variable names are passed to the `env()` function along with two integers indicating the indices of the segment to return the value for. These values are both integers of `0` or greater. The first integer represents the horizontal index of the segment, with `0` being the left-most segment, and the second value represents the vertical index of the segment, with `0` representing the bottom-most segment:

- In a horizontal side-by-side layout, the left segment is represented by `0 0`, and the right segment is represented by `1 0`.
- In a vertical top-to-bottom layout, the top segment is represented by `0 0`, and the bottom segment is represented by `0 1`.
- In devices with more than two segments, the numbers may be greater. For example, a device with three horizontal segments may have the center segment represented by `1 0`, and the right-hand segment represented by `2 0`.

For example, the following returns the width of the right-hand segment on a two-segment foldable device where the segments are oriented horizontally:

```css
env(viewport-segment-width 1 0)
```

See the Viewport segment API demo for a full working demo (source code). Also check out Using the Viewport Segments API for a full demo explanation.
