---
title: "`color-scheme` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/color-scheme/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `color-scheme` CSS property

The **`color-scheme`** CSS property allows an element to indicate which color schemes it can comfortably be rendered in. User agents change the following aspects of the UI chrome to match the used color scheme:

- The color of the canvas surface.
- The default colors of scrollbars and other interaction UI.
- The default colors of form controls.
- The default colors of other browser-provided UI, such as "spellcheck" underlines.

Component authors must use the `prefers-color-scheme` media feature to support the color schemes on the rest of the elements.

Common choices for operating system color schemes are "light" and "dark", or "day mode" and "night mode". When a user selects one of these color schemes, the operating system makes adjustments to the user interface. This includes form controls, scrollbars, and the used values of CSS system colors.

```css
color-scheme: normal;
```

```css
color-scheme: dark;
```

```css
color-scheme: light;
```

```html
<section class="default-example container" id="default-example">
  <textarea id="example-element">Text Area</textarea>
</section>
```

```css
#example-element {
  width: 80%;
  height: 50%;
}
```

## Syntax

```css
color-scheme: normal;
color-scheme: light;
color-scheme: dark;
color-scheme: light dark;
color-scheme: only light;

/* Global values */
color-scheme: inherit;
color-scheme: initial;
color-scheme: revert;
color-scheme: revert-layer;
color-scheme: unset;
```

### Values

This property is specified as one of the following keyword values:

- `normal`
    Indicates that the element can be rendered using the page's color scheme settings. If the page does not have a color scheme set, the element is rendered using the page's default color settings.
- `light`
    Indicates that the element can be rendered using the operating system _light_ color scheme.
- `dark`
    Indicates that the element can be rendered using the operating system _dark_ color scheme.
- `only`
    Forbids the user agent from overriding the color scheme for the element.

    Can be used to turn off color overrides caused by Chrome's Auto Dark Theme, by applying `color-scheme: only light;` on a specific element or `:root`.

## Examples

### Declaring color scheme preferences

To opt the entire page into the user's color scheme preferences, declare `color-scheme` on the `:root` element.

```css
:root {
  color-scheme: light dark;
}
```

To opt in specific elements to the user's color scheme preferences, declare `color-scheme` on those elements.

```css
header {
  color-scheme: only light;
}
main {
  color-scheme: light dark;
}
footer {
  color-scheme: only dark;
}
```

Along with the above CSS, also include the `<meta name="color-scheme">` HTML `<meta>` tag in the `<head>`, before any CSS style information, to inform user agents about the preferred color scheme, helping prevent unwanted screen flashes during the page load.

### Styling based on color schemes

To style elements based on color scheme preferences, use the `prefers-color-scheme` media query. The example below opts in the entire page to using both light and dark operating system color schemes via the `color-scheme` property, and then uses `prefers-color-scheme` to specify the desired foreground and background colors for individual elements in those color schemes.

```css
:root {
  color-scheme: light dark;
}

@media (prefers-color-scheme: light) {
  .element {
    color: black;
    background-color: white;
  }
}

@media (prefers-color-scheme: dark) {
  .element {
    color: white;
    background-color: black;
  }
}
```

Alternatively, use the `light-dark()` `<color>` function to set the foreground and background colors for the different color schemes using a more compact code structure:

```css
:root {
  color-scheme: light dark;
}

.element {
  color: light-dark(black, white);
  background-color: light-dark(white, black);
}
```

## See also

- `prefers-color-scheme` media query to detect user preferences for color schemes.
- `light-dark()` color function to set colors for both light and dark color schemes.
- Other color-related properties: `color`, `accent-color`, `background-color`, `border-color`, `outline-color`, `text-decoration-color`, `text-emphasis-color`, `text-shadow`, `caret-color`, and `column-rule-color`
- `background-image`
- `print-color-adjust`
- Using relative colors
