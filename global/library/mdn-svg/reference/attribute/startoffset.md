---
title: "startOffset"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/svg/reference/attribute/startoffset/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# startOffset

The **`startOffset`** attribute defines an offset from the start of the path for the initial current text position along the path after converting the path to the `<textPath>` element's coordinate system.

You can use this attribute with the following SVG elements:

- `<textPath>`

## Example

```css
html,
body,
svg {
  height: 100%;
}
```

```html
<svg viewBox="0 0 220 100" xmlns="http://www.w3.org/2000/svg">
  <path
    id="path1"
    fill="none"
    stroke="red"
    d="M10,90 Q90,90 90,45 Q90,10 50,10 Q10,10 10,40 Q10,70 45,70 Q70,70 75,50" />
  <path
    id="path2"
    fill="none"
    stroke="red"
    d="M130,90 Q210,90 210,45 Q210,10 170,10 Q130,10 130,40 Q130,70 165,70 Q190,70 195,50" />

  <text>
    <textPath href="#path1" startOffset="0">
      Quick brown fox jumps over the lazy dog.
    </textPath>
  </text>

  <text>
    <textPath href="#path2" startOffset="40">
      Quick brown fox jumps over the lazy dog.
    </textPath>
  </text>
</svg>
```

## Usage notes

       | Value
       |
        `length-percentage` |
        `number`

       | Default value
       | `0`

       | Animatable
       | Yes

- `<length-percentage>`
    A length represents a distance along the path measured in the current user coordinate system for the `<textPath>` element.

    If a percentage is given, then the start offset represents a percentage distance along the entire path. Thus, `0%` indicates the start point of the path and `100%` indicates the end point of the path.

- `<number>`
    This value indicates a distance along the path measured in the current user coordinate system for the `<textPath>` element.

> **Note:**
> Negative values and values larger than the path length (e.g., `150%`) are allowed.
