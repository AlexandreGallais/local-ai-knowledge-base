---
title: "Using multiple backgrounds"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/backgrounds_and_borders/using_multiple_backgrounds/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Using multiple backgrounds

You can apply **multiple backgrounds** to elements. These are layered atop one another with the first background you provide on top and the last background listed in the back. Only the last background can include a background color.

Multiple backgrounds are specified as a comma-separated list, such as `background: background1, background2, ...;`. This syntax is accepted by both the shorthand `background` property and the individual properties thereof except for `background-color`: `background-attachment`, `background-clip`, `background-image`, `background-origin`, `background-position`, `background-repeat`, `background-size`.

## Example

In this example, three backgrounds are stacked: the Firefox logo, an image of bubbles, and a linear gradient:

### HTML

```html
<div class="multi-bg-example"></div>
```

### CSS

```css
.multi-bg-example {
  width: 100%;
  height: 400px;
  background-image:
    url("firefox.png"), url("bubbles.png"),
    linear-gradient(to right, rgb(30 75 115 / 100%), transparent);
  background-repeat: no-repeat, no-repeat, no-repeat;
  background-position:
    bottom right,
    left,
    right;
}
```

### Result

As you can see here, the Firefox logo (listed first within `background-image`) is on top, directly above the bubbles graphic, followed by the gradient (listed last) sitting underneath all previous 'images'. Each subsequent sub-property (`background-repeat` and `background-position`) applies to the corresponding backgrounds. So the first listed value for `background-repeat` applies to the first (frontmost) background, and so forth.

## Value repetition for multiple backgrounds

When using multiple backgrounds, if a background-related property is given fewer comma-separated values than the number of background layers, the user agent repeats the list of values until there are enough values for all layers.

For example:

```css
.element {
  background-image: url("a.png"), url("b.png"), url("c.png");
  background-position: left top;
}
```

This is equivalent to:

```css
.element {
  background-position:
    left top,
    left top,
    left top;
}
```

## See also

- CSS backgrounds and borders module
- Using CSS gradients
