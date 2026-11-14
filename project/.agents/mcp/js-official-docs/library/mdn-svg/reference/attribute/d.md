---
title: "d (part 1 of 3)"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/svg/reference/attribute/d/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# d

The **`d`** attribute defines a path to be drawn.

A path definition is a list of path commands where each command is composed of a command letter and numbers that represent the command parameters.
The commands are detailed below.

This attribute is used with the SVG `` element.

`d` is a presentation attribute, and hence can also be used as a CSS property.

## path

For ``, `d` is a string containing a series of path commands that define the path to be drawn.

       | Value
       |
        &#x3C;string>

       | Default value
       | none

       | Animatable
       | Yes

## Using d as a CSS property

`d` is a presentation attribute, and hence can be also be modified using CSS.
The property takes either `basic-shape/path` or `none`.

The example below shows how you might apply a new path on hover over an element.
The new path is the same as the old one, but adds a line across the heart.

```css
html,
body,
svg {
  height: 100%;
}

/* This path is displayed on hover */
#svg_css_ex1:hover path {
  d: path(
    "M10,30 A20,20 0,0,1 50,30 A20,20 0,0,1 90,30 Q90,60 50,90 Q10,60 10,30 z M5,5 L90,90"
  );
}
```

```html
<svg id="svg_css_ex1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <path
    fill="none"
    stroke="red"
    d="M 10,30
       A 20,20 0,0,1 50,30
       A 20,20 0,0,1 90,30
       Q 90,60 50,90
       Q 10,60 10,30 z
       " />
</svg>
```

For a `` animation example, see the CSS `d` property reference page example.
