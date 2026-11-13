---
title: "`<input type=\"color\">` HTML attribute value"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/input/color/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<input type="color">` HTML attribute value

`` elements of type **`color`** provide a user interface element that lets a user specify a color, either by using a visual color picker interface or by entering the color into a text field in a CSS color value format.

The element's presentation may vary substantially from one browser and/or platform to another—it might be a basic <example-value> input that automatically validates to ensure that the color information is entered in the proper format, or a platform-standard color picker, or some kind of custom color picker window.

```html
<p>Choose your colors:</p>

<div>
  <input type="color" id="foreground" name="foreground" value="#e66465" />
  <label for="foreground">Foreground color</label>
</div>

<div>
  <input
    type="color"
    id="background"
    name="background"
    value="oklab(50% 0.1 0.1 / 0.5)"
    colorspace="display-p3"
    alpha />
  <label for="background">Background color</label>
</div>
```

```css
p,
label {
  font:
    1rem "Fira Sans",
    sans-serif;
}

input {
  margin: 0.4rem;
}
```

## Value

A CSS color value.

> **Note:**
> Historically, only basic <example-value> colors (without alpha channel) were allowed. Now, any CSS color format, including named colors, functional notations, and hexadecimal colors with an alpha channel, can be used. The default value is `#000000` (black) if a `value` is omitted or is invalid.

## Additional attributes

In addition to the global attribute and the input attributes common to all `` elements, the `color` input also supports the following attributes:

- `alpha` (experimental)
    A boolean attribute, if present, indicates the color's alpha component can be manipulated by the end user and does not have to be fully opaque.

- `colorspace` (experimental)
    Defines the color space for the color and hints at the desired user interface for the color picker widget. Possible enumerated values are:
    - `"limited-srgb"`: The color is in the sRGB color space. This includes `rgb()`, `hsl()`, `hwb()`, and `hex-color` values. The color value is limited to 8-bits per `r`, `g`, and `b` component. This is the default.
    - `"display-p3"`: The Display P3 color space, e.g., `color(display-p3 1.84 -0.19 0.72 / 0.6)`

## Using color inputs

Inputs of type `color` are simple, due to the limited number of attributes they support.

### Providing a default color

You can update the example above to set a default value, so that the color picker is pre-filled with the default color and the color picker (if any) will also default to that color.

```html
<input type="color" value="#ff0000" />
<input
  type="color"
  id="body"
  name="body"
  value="oklab(50% 0.1 0.1 / 0.5)"
  colorspace="display-p3"
  alpha />
```

If you don't specify a value or if the value is invalid or otherwise not supported by the browser, the value defaults to `#000000`, which is opaque black.

### Tracking color changes

As is the case with other `` types, there are two events that can be used to detect changes to the color value: `input` and `change`. `input` is fired on the `` element every time the color changes. The `change` event is fired when the user dismisses the color picker. In both cases, you can determine the new value of the element by looking at its `value`.

Here's an example that watches changes over time to the color value:

```js
colorPicker.addEventListener("input", updateFirst);
colorPicker.addEventListener("change", watchColorPicker);

function watchColorPicker(event) {
  document.querySelectorAll("p").forEach((p) => {
    p.style.color = event.target.value;
  });
}
```

### Selecting the value

When a browser doesn't support a color picker interface, its implementation of color inputs will be a text box that validates the contents automatically to ensure that the value is in the correct format. In this case you can use the `select()` method to select the text currently in the edit field.

If the browser instead uses a color picker, `select()` does nothing. You should be aware of this behavior so your code can respond appropriately in either case.

```js
colorPicker.select();
```

## Validation

A color input's value is considered to be invalid if the user agent is unable to convert the user's input into seven-character lower-case hexadecimal notation. If and when this is the case, the `:invalid` pseudo-class is applied to the element.

## Example

Let's create an example which does a little more with the color input by tracking the `change` and `input` events to take the new color and apply it to every `` element in the document.

### HTML

The HTML is fairly straightforward — a couple of paragraphs of descriptive material with an `` of type `color` with the ID `color-picker`, which we'll use to change the color of the paragraphs' text.

```html
<p>
  An example demonstrating the use of the
  <code>&lt;input type="color"&gt;</code> control.
</p>

<label for="color-picker">Color:</label>
<input type="color" value="#ff0000" id="color-picker" />

<p>
  Watch the paragraph colors change when you adjust the color picker. As you
  make changes in the color picker, the first paragraph's color changes, as a
  preview (this uses the <code>input</code> event). When you close the color
  picker, the <code>change</code> event fires, and we detect that to change
  every paragraph to the selected color.
</p>
```

### JavaScript

#### Initialization

The following code initializes the color input:

```js
const defaultColor = "#0000ff";
const colorPicker = document.querySelector("#color-picker");
colorPicker.value = defaultColor;
colorPicker.addEventListener("input", updateFirst);
colorPicker.addEventListener("change", updateAll);
colorPicker.select();
```

This gets a reference to the color `` element in a variable called `colorPicker`, then sets the color input's value to the value in `defaultColor`. Then the color input's `input` event is set up to call our `updateFirst()` function, and the `change` event is set to call `updateAll()`. These are both seen below.

Finally, we call `select()` to select the text content of the color input if the control is implemented as a text field (this has no effect if a color picker interface is provided instead).

#### Reacting to color changes

We provide two functions that deal with color changes. The `updateFirst()` function is called in response to the `input` event. It changes the color of the first paragraph element in the document to match the new value of the color input. Since `input` events are fired every time an adjustment is made to the value (for example, if the brightness of the color is increased), these will happen repeatedly as the color picker is used.

```js
function updateFirst(event) {
  const p = document.querySelector("p");
  if (p) {
    p.style.color = event.target.value;
  }
}
```

When the color picker is dismissed, indicating that the value will not change again (unless the user re-opens the color picker), a `change` event is sent to the element. We handle that event using the `updateAll()` function, using `Event.target.value` to obtain the final selected color:

```js
function updateAll(event) {
  document.querySelectorAll("p").forEach((p) => {
    p.style.color = event.target.value;
  });
}
```

This sets the color of every `` block so that its `color` attribute matches the current value of the color input, which is referred to using `event.target`.

### Result

The final result looks like this:

## Technical summary

       | Value
       |
        Any CSS `<color>` value in any notation.

       | Events
       |
        `change` and
        `input`

       | Supported common attributes
       |
        `autocomplete` and
        `list`

       | IDL attributes
       |
        <code>alpha</code>,
        `colorSpace`,
        `list`, and
        `value`

       | DOM interface
       | `HTMLInputElement`

       | Implicit ARIA Role
       | no corresponding role

## See also

- `HTMLInputElement.alpha`
- `HTMLInputElement.colorspace`
