---
title: "`contrast-color()` CSS function"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/values/color_value/contrast-color/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `contrast-color()` CSS function

The **`contrast-color()`** CSS function takes a `color` value and returns a contrasting color. The function commonly ensures the WCAG AA minimum contrast. The browsers may use different and better algorithms.

The `contrast-color()` function enables specifying a text color and automatically generating a contrasting background color, or vice versa. It avoids the need to maintain background-text color pairs.

## Syntax

```css
contrast-color(red)
contrast-color(var(--backgroundColor))
```

### Parameters

- `color`
    Any valid `<color>` value.

### Return value

A `named-color` of either `white` or `black`.

## Description

The `contrast-color()` function returns a value of `white` or `black`, depending on which value has the greatest contrast with the input color. If both `white` and `black` have the same contrast with the input color, `white` is returned.

> **Warning:**
> WCAG AA (4.5:1) contrast is not capable of producing clearly readable text in all cases. Mid-tone background colors generally don't provide enough contrast with either black or white foreground. For example, `contrast-color()` on a royal bluish (`#2277d3`) background produces black text, which is not readable for small text. It is recommended, therefore, to use light or dark colors with the `contrast-color()` function.

## Examples

### Contrasting text for a button

In the following example, the browser automatically applies the selected color to the background of the "Button" ``, and the contrasting color (black or white) to its text.

```html
<label>
  Select background color of the button:
  <input type="color" id="colorPicker" value="#660066" />
</label>
<br />
<button>Button</button>
```

```css
:root {
  --button-color: lightblue;
}

button {
  background-color: var(--button-color);

  /* Set contrasting text color automatically */
  color: contrast-color(var(--button-color));
}
```

```css
body {
  padding: 1rem;
}

button {
  margin: 3rem;
  padding: 1rem;
  width: 150px;
  font-size: 2rem;
  border-radius: 1rem;
}

@supports not (color: contrast-color(red)) {
  body::before {
    content: "Your browser doesn't support the contrast-color() function.";
    background-color: wheat;
    display: block;
    text-align: center;
    padding: 1rem 0;
  }
}
```

```js
const colorPicker = document.getElementById("colorPicker");
const root = document.documentElement;

function updateColor(color) {
  root.style.setProperty("--button-color", colorPicker.value);
}

colorPicker.addEventListener("input", updateColor);
updateColor();
```

### Light and dark mode usage

In the following example, the `prefers-color-scheme` media query is used to set a background color based on operating system or browser color scheme settings. The `contrast-color()` function is used to set the text color automatically.

Try changing the browser or OS dark mode setting to see the effect.

```html
<pre>
    Q: How does CSS transform light into energy?
  Ans: Using <a href="/en-US/docs/Web/CSS/Reference/Properties/font-synthesis">font-synthesis</a>.
</pre>
```

```css
:root {
  --background-color: navy;
}

@media (prefers-color-scheme: light) {
  :root {
    --background-color: wheat;
  }
}

body,
a {
  background-color: var(--background-color);
  color: contrast-color(var(--background-color));
}
```

```css
body {
  padding: 2rem;
  font-size: 1.2rem;
}

pre {
  margin-top: 3rem;
}

@supports not (color: contrast-color(red)) {
  body::before {
    content: "Your browser doesn't support the contrast-color() function.";
    background-color: wheat;
    display: block;
    text-align: center;
    padding: 1rem 0;
  }
}
```

## See also

- `contrast()`
- CSS colors module
- CSS custom properties and `var`
- `prefers-contrast` and `prefers-color-scheme` `@media` features
- WCAG: color contrast
- How to have the browser pick a contrasting color in CSS on webkit.org (2025)
- WebAIM Contrast Checker on webaim.org (2025)
