---
title: "Web Accessibility: Understanding Colors and Luminance (part 1 of 3)"
tool: "mdn-accessibility"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/accessibility/guides/colors_and_luminance/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Web Accessibility: Understanding Colors and Luminance

While understanding color, luminance, and saturation is important for design and readability for all sighted users, they are essential for those with reduced vision and color-deficient vision and those with specific neurological, cognitive, and other impairments.

Accessibility guidelines define adequate color contrast for sighted users with reduced vision, as well as guidelines intended to help users with color insensitive vision, commonly referred to as "color blindness". Understanding color is also important in preventing seizures and other physical reactions in people with vestibular disorders or other neurological disorders.

## Overview

The choice of colors and their use is a significant component of accessibility. On the surface, the subject seems simple. Still, it is a complex subject because color perception is as much about the physiology of the eye and human brain processing as it is about light emitting from a computer screen.

### Environment and perception

Environment matters. Perception of color in a well-lit room will be different than perception of that same color on that same computer screen in a dark room. Regarding accessibility, using certain color combinations has more impact than others. Font size, font style (some fonts are so thin or fancy that they present accessibility problems on their own), background color, the size of the background space around the text, even pixel densities, and more all affect how color is delivered from the screen.

A viewer's distance from the screen, the ambient background, the health of his eyes, and more all affect how that color is received by the viewer. How the viewer perceives color after it gets to their eyes is yet another matter, and can be affected by overall health. Fortunately, there are media queries that enable developers to provide styles based on user preferences, including contrast and color scheme preferences.

When supported, the Ambient Light Sensor interface returns the current light level or illuminance of the ambient light around the hosting device, enabling a web page to be aware of any change in the light intensity, and consequently, adjust the text accordingly. Additionally, the above media queries enable developers to provide alternative user experiences when user preferences indicate preferred contrast levels, automatically adjusting levels depending on the user's location and what kind of screen they are using.

### Luminance and perception

Color, contrast, and luminance are the most central and critical concepts to creating accessible web content with color. Luminance is of particular importance, however, because understanding what it is and how it is employed enables accessibility for those who are color-blind, as well as those who can perceive color. The luminance contrast enables the color blind to distinguish dark from light.

Luminance must be established before the contrast may be. When speaking of color contrast, W3C formulas are incorporating luminance, not just the colors ("hues") themselves.

### Terminology

Terminology can be confusing because different terms often describe the same thing. "Luminance" and "Saturation" are particularly important to get right. For example, "saturation" is known as "chroma" in some circles. In others, "chroma" and "saturation" are two different concepts. The "L" in the HSL color space is sometimes referred to as "luminosity," and other times as "lightness." Even something seemingly simple, like naming common colors, can be open to debate. For example, the color "crimson red" may be described in hex values as `#990000` by some and `#DC143C` by others. For this document, we'll use terminology as it is defined on the CSS `named-color` page.

When working with color, it's important to know which "color space" you are working in, as different color spaces map to different measurement systems.

In color printing, your printer likely has cyan, magenta, yellow, and black (CMYK) ink cartridges. CMYK is a subtractive model wherein the four inks _remove_ specific wavelengths of light, reflecting only the narrow range each is associated with. RGB is an additive color model that adds different proportions of red, green, and blue lights.

Currently, the RGB color space predominates as the space web developers work in. While HEX, RGB, and HSL color spaces are notated differently, browsers automatically convert values between these color notations. CSS color modules provide additional color spaces. Still, because of the current domination of the RGB color space in measuring color output, most calculations in this document are presumed to be in the RGB color space and, very specifically, in the sRGB color space.

## The sRGB color space

Color has many ways of being defined, as is apparent in the `<color>` data type, including RGB, RGB decimal, RGB percent, HSL, HWB, LCH, Lab, and CMYK, among others.

For digital concerns, much of the technology has historically resided in the RGB color space. The RGB color model is extended to include "alpha" — RGBA — to allow specification of the opacity of a color. Other methods for measuring color involve measurements using other color spaces and are supported in modern displays and browsers. Still, color measurements in the RGB color space predominate, including in video production.

Technologies, such as OpenGL and Direct3D incorporate support for the sRGB gamma curve, although some articles for OpenGL reference use of RGBA rather than sRGB. WebGL is usually in the RGBA format; see an example of how it is used in "Clearing with colors".

### CSS color values

It's important to know that there are variations even within one color space, such as the RGB color space. For example, variations of the RGB color space include **RGB**, **sRGB**, **Adobe RGB**, **Adobe Wide Gamut RGB**, and **RGBA**, among others.

These are examples of the CSS notations used to define a color. Here the example color for each is a fully opaque magenta:

```css
/* named color */
color: magenta;

/* sRGB value with percentage values */
color: rgb(100% 0% 100%);
color: rgb(100% 0% 100% / 100%);

/* by sRGB numeric values */
color: rgb(255 0 255);
color: rgb(255 0 255 / 1);

/* legacy rgb and rgba notation */
color: rgb(100%, 0%, 100%);
color: rgba(255, 0, 255, 1);

/* by sRGB value in hex */
color: #f0f; /* #rgb, a shorthand for #rrggbb */
color: #ff00ff; /* #rrggbb */
color: #f0ff; /* #rgba */
color: #ff00ffff; /* #rrggbbaa */

/* by HSL representation of the sRGB value */
color: hsl(300 100% 50%);
color: hsl(300deg 100% 50% / 100%);

/* by HWB representation of the sRGB value */
color: hwb(300deg 0% 0%);
color: hwb(300 0% 0% / 1);

/* by Lab representation of the sRGB value */
color: lab(60 93.56 -60.5);
color: lab(60 93.56 -60.5 / 1);

/* representation in the CIELAB color spaces */
color: oklch(0.7 0.32 328.37);
color: oklch(0.7 0.32 328.37 / 1);

/* color() function in the XYZ color space */
color: color(xyz-d65 0.59 0.28 0.96);
color: color(xyz-d65 0.59 0.28 0.96 / 1);
```

The first example uses one of the defined `named-color`s.

We can set the sRGB values directly as a percentage, with 0% being off (black) and 100% being the full value for that color. The values are in the order of red, green, and blue. We can also set the sRGB values directly by a number from 0 to 255.

Shown after that are hex color values. Hexadecimal is a numbering system with base-16, where the 0-255 integer is represented by two digits ranging from 0-15 using the digits 0-9 and a-f for 10-15. Thus, `ff` = `255`, `00` = `0`, and `d5` = `200`. The '#' symbol precedes the color to indicate the value is hex.

If all values are pairs of identical digits, the value can be represented by single digits that the browser will duplicate. Thus `f00` is the same as `ff0000`. If a fourth set of numbers is present, that value is the A in RGBA, the alpha channel defining transparency in terms of the opacity value of the color. A higher value means the color is more opaque and therefore, less transparent. In the examples above, the alpha value is `f`, `ff`, `1`, and `100%` for fully opaque.

The example also shows the legacy syntax for both `rgb()` and `rgba()`. The legacy syntax for color functions is comma-separated, with a separate function for when the alpha channel is included. New color functions only have one syntax with space-separated (rather than comma-separated) values, with the alpha channel, if present, being preceded by a slash. Modern syntax allows for mixing numbers and percents and supports the `none` keyword; the comma-separated legacy syntax does not.

The following examples show "HSL", which stands for _Hue, Saturation, and Lightness_. HSL color values are considered by many to be more intuitive than RGB values. The color produced from the settings are still in the sRGB colorspace, but `color_value/hsl` is an intuitive syntax for many. The hue is adjusted as an angle, and it is easy to create a user interface using a knob or circular control to adjust the hue. Do note that HSL colors incorporate _lightness_, not _luminance_, which is a significant consideration.

The next example shows "HWB" which stands for _Hue, Whiteness, and Blackness_. With both `hsl()` and `color_value/hwb` the first value can be a `number` or an `angle` value. When unitless, the value is interpreted as `deg` degrees.

There are several other color functions and color spaces. The last three examples demonstrate representing magenta using the `color_value/lab`, `color_value/oklch`, and `color_value/color` color functions.

### Conversions

As we saw, one color within the same color space may be expressed in many ways. Looking at how the RGB color space is used to describe the color "magenta", you can see that the same color may be expressed in a shorthand, three-digit hex number that converts to an rgb value as a six-digit hex number that also converts to the same rgb value, or as a rgba value, expressed in percentages.

RGB is hardware-oriented, reflecting the use of CRTs. Many developers and designers prefer the intuitiveness of `color_value/hsl` notation. Fortunately, browsers convert from RGB to HSL automatically, and shift-clicking on colors in browser developer tools provides conversion functionality.

In addition to developer tools, many tools can convert RGB to HSL for you and provide both the RGB hexadecimal and CSS function syntax. Many color pickers also provide WCAG color contrast values.

As noted earlier, the CSS color module includes adding additional colorspaces, including `color_value/lch` and `color_value/oklch` functional color notation and the `color_value/lab` and `color_value/oklab` color coordinate systems, which can specify any visible color. That said, sRGB is still the default and preferred colorspace for accessibility because of its ubiquity.

Where accessibility is concerned, however, standards and guidelines are currently written predominantly using the sRGB color space, especially as it applies to color contrast ratios.

> **Note:**
> Almost all systems used today to view Web content assume sRGB encoding. Unless it is known that another color space will be used to process and display the content, authors should evaluate using sRGB colorspace. If using other color spaces, apply the principles of minimum contrast ratios.

### Querying color values

The `Window.getComputedStyle()` method returns values using the RGB Decimal Reference scale or via `color(srgb...)`. For example, calling `Window.getComputedStyle()` on a `` with `background-color: red` set on it returns the computed background color as `rgb(255, 0, 0)` — the RGB Decimal reference. However, when using relative colors (for example `background-color: rgb(from blue 255 0 0)`), calling `Window.getComputedStyle()` returns the computed background color as `color(srgb 1 0 0)`. Being tied to computer hardware, `Window.getComputedStyle()` measures color in terms of RGB, not how the human eye perceives color.

### Red / green color blindness

Protanopia is a color vision deficiency in which the eye has no red cones; sRGB can still be perceived via green cones, though darker than normal vision. Both protan (red deficient) and deutan (green deficient) deficiencies cause difficulty distinguishing _between_ red and green.

Developer tools can help simulate color vision differences right in your browser. For example, Firefox's Accessibility Inspector enables simulating protanopia, deuteranopia, tritanopia, achromatopsia, and contrast loss right in the accessibility panel.
