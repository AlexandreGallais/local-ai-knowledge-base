---
title: "class"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/svg/reference/attribute/class/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# class

Assigns a class name or set of class names to an element. You may assign the same class name or names to any number of elements, however, multiple class names must be separated by whitespace characters.

An element's class name serves two key roles:

- As a style sheet selector, for when an author assigns style information to a set of elements.
- For general use by the browser.

You can use this class to style SVG content using CSS.

## Elements

The following elements can use the `class` attribute:

- ``
- `<circle>`
- `<clipPath>`
- `<defs>`
- `<desc>`
- `<ellipse>`
- `<feBlend>`
- `<feColorMatrix>`
- `<feComponentTransfer>`
- `<feComposite>`
- `<feConvolveMatrix>`
- `<feDiffuseLighting>`
- `<feDisplacementMap>`
- `<feFlood>`
- `<feGaussianBlur>`
- `<feImage>`
- `<feMerge>`
- `<feMorphology>`
- `<feOffset>`
- `<feSpecularLighting>`
- `<feTile>`
- `<feTurbulence>`
- `<filter>`
- `<foreignObject>`
- ``
- `<image>`
- `<line>`
- `<linearGradient>`
- `<marker>`
- `<mask>`
- ``
- `<pattern>`
- `<polygon>`
- `<polyline>`
- `<radialGradient>`
- `<rect>`
- `<stop>`
- ``
- `<switch>`
- `<symbol>`
- `<text>`
- `<textPath>`
- `<title>`
- `<tspan>`
- `<use>`

## Example

```html
<html lang="en">
  <body>
    <svg
      width="120"
      height="220"
      viewPort="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg">
      <style>
        <![CDATA[
          rect.rectClass {
            stroke: #000066;
            fill: #00cc00;
          }
          circle.circleClass {
            stroke: #006600;
            fill: #cc0000;
          }
        ]]>
      </style>

      <rect class="rectClass" x="10" y="10" width="100" height="100" />
      <circle class="circleClass" cx="40" cy="50" r="26" />
    </svg>
  </body>
</html>
```

## Usage notes

       | Categories
       | None

       | Value
       |
        &#x3C;list-of-class-names>

       | Animatable
       | Yes
