---
title: "CSS color values (part 1 of 3)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/colors/color_values/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSS color values

To represent a color in CSS, you have to find a way to translate the analog concept of "color" into a digital form that a computer can use. This is typically done by breaking the color down into components, such as amounts of different primary colors to mix together, or brightness and hue. Defined color models ensure that colors will appear the same no matter where they are rendered.

A color model is a mathematical model that represents colors using numeric values. Color models describe how to create the available colors within a color space. RGB was the first color model for the web. The `sRGB` color space of the RGB color model — the standard red, green, and blue color space — was created in 1996 for computer monitors and the web. A color space is a system for grouping colors so that describing any given color is consistent. If you transform a color between two different color spaces, it should look identical in both.

Originally, monitors were limited regarding how many colors they could render, and CSS colors were limited by those constraints, expanding as capabilities improved. With modern devices no longer limited to RGB, we now also have color models based on human perception instead, providing a much wider gamut of colors. We can now describe color in CSS in several ways, and the options keep expanding.

This guide introduces the different `<color>` value types. For a more detailed discussion, see the reference links provided below.

## Keywords

The web defines a set of standard color names that lets you use keywords instead of numeric representations to describe colors. This is a simpler albeit more limited approach — there may not be a keyword representing the exact color you want to use.

Color keywords include standard primary and secondary colors (such as `red`, `blue`, or `orange`), shades of gray (from `black` to `white`, including colors like `darkgray` and `lightgrey`), and a variety of other blended colors, including `lightseagreen`, `cornflowerblue`, and `rebeccapurple`. Named colors use the RGB model and are associated with the sRGB (`srgb`) color space.

There are over 160 named colors. There are named colors of special interest: `transparent` sets a transparent color value, while `currentColor` sets the current value of the CSS `color` property. There are also named `system-color` colors, such as `accentcolortext` and `buttonface`, that reflect the default color choices made by the user, the browser, or the operating system.

All color keywords are case-insensitive. See the `named-color` data type for more information on color keywords.

## RGB values

There are two primary ways of defining an RGB color by its red, green, and blue components in CSS — hexadecimal and `rgb()` values. Like named colors, these methods use the RGB model and are associated with the sRGB (`srgb`) color space. However, they allow a much wider range of colors to be specified.

### Hexadecimal string notation

Hexadecimal (hex) string notation uses a hexadecimal value to represent each component (red, green, and blue) of an RGB color. It may also include a fourth component: the alpha channel (or opacity).

A color in hexadecimal string notation always begins with the character `"#"`. After that comes the hexadecimal digits of the color code. The string is case-insensitive.

- `"#rrggbb"`
    Specifies a fully opaque color whose red component is the hexadecimal number `0xrr`, green component is `0xgg`, and blue component is `0xbb`.

- `"#rrggbbaa"`
    Specifies a color whose red component is the hexadecimal number `0xrr`, green component is `0xgg`, and blue component is `0xbb`. The alpha channel is specified by `0xaa`; the lower this value is, the more translucent the color becomes.

- `"#rgb"`
    Specifies a color whose red component is the hexadecimal number `0xrr`, green component is `0xgg`, and blue component is `0xbb`.

- `"#rgba"`
    Specifies a color whose red component is the hexadecimal number `0xrr`, green component is `0xgg`, and blue component is `0xbb`. The alpha channel is specified by `0xaa`; the lower this value is, the more translucent the color becomes.

As shown above, the red, green, and blue color components can each be represented as a double-digit hex value representing a number between 0 (`00`) and 255 (`FF`) or a single-digit hex value (a number between 0 (`0`) and 15 (`F`)).

> **Note:**
> The leading `0x` in the values above indicates a hexadecimal integer literal. Hexadecimal integers can include digits (`0` - `9`) and the letters `a` – `f` and `A` – `F`. The case of a character does not change its value. Therefore: `0xa` = `0xA` = `10` and `0xf` = `0xF` = `15`.

These two hex colors are equivalent color values; they're both red:

```css
color: #ff0000;
color: #f00;
```

All components _must_ be specified using the same number of digits. If you use the single-digit notation, the final color is computed by using each component's digit twice; that is, `"#D"` becomes `"#DD"` when drawing.

To make the values 25% opaque, add in the alpha channel value as shown below:

```css
color: #ff000044;
color: #f004;
```

See the `hex-color` data type for more information on hexadecimal string notation for colors.

#### HTML color input type

There are many situations in which your website may need to let the user select a color. Perhaps you have a customizable user interface, or you're implementing a drawing app. Maybe you have editable text and need to let the user choose the text color. Or perhaps your app lets the user assign colors to folders or items. For such use cases, the `` element has a `"color"` `type`, which renders a color picker control.

This example allows you to choose a color. Once a choice is made, the `border-color` is set to that color, and the value is displayed.

```html
<div id="box">
  <label for="colorPicker">Border color:</label>
  <input type="color" value="#8888ff" id="colorPicker" />
  <output></output>
</div>
```

The HTML creates a box containing a color picker control (with a label created using the `` element) and an empty `<output>` element into which we'll output the color's value using JavaScript. The color input's value is always a hexadecimal string.

```css
#box {
  width: 500px;
  height: 100px;
  border: 5px solid rgb(245 220 225);
  padding: 4px 6px;
  font:
    16px "Lucida Grande",
    "Helvetica",
    "Arial",
    sans-serif;
}
```

The following JavaScript updates the border's color to match the color picker's initial value, then adds two event handlers to the `` element to respond to changes made to its value.

```js
const colorPicker = document.querySelector("#colorPicker");
const box = document.querySelector("#box");
const output = document.querySelector("output");

box.style.borderColor = colorPicker.value;

colorPicker.addEventListener("input", (event) => {
  box.style.borderColor = event.target.value;
});

colorPicker.addEventListener("change", (event) => {
  output.innerText = `${colorPicker.value}`;
});
```

The `input` event is sent every time the value of the element changes; that is, every time the user adjusts the color in the color picker. Each time this event arrives, we set the box's border color to match the color picker's current value.

The `change` event is received when the color picker's value is finalized. We respond by setting the contents of the `<output>` to the string value of the selected color.

### RGB functional notation

RGB (Red/Green/Blue) functional notation, like hexadecimal string notation, represents colors using their red, green, and blue components (and, optionally, an alpha channel component for opacity). However, instead of using a string, the color is defined using the CSS function `rgb()`. This function accepts 3 or 4 input parameters — red, green, and blue component values and an optional alpha channel value.

Legal values for each of these parameters are:

- `red`, `green`, and `blue`
    Each must be an `<number>` value between 0 and 255 (inclusive), a `<percentage>` from 0% to 100%, or the keyword `none`, which is equal to `0` in this case.

- `alpha`
    The alpha channel is specified as a percentage between `0%` (fully transparent) and `100%` (fully opaque), or a number between `0.0` (equivalent to `0%`) and `1.0` (equivalent to `100%`).

For example, a bright red that's 50% opaque can be represented as `rgb(255 0 0 / 50%)` or `rgb(100% 0 0 / 0.5)`.

See the `rgb()` color function for more information on the RGB functional notation.
