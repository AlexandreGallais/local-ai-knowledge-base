---
title: "side"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/svg/reference/attribute/side/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# side

The **`side`** attribute determines the side of a path the text is placed on (relative to the path direction).

You can use this attribute with the following SVG elements:

- `<textPath>`

## Example

### Basic usage

The following example draws two circular text paths, displaying text on the left-hand side and the right-hand side, respectively.

#### HTML

```css
html,
body,
svg {
  height: 100%;
}

text {
  font:
    25px "Helvetica",
    "Arial",
    sans-serif;
}
```

```html
<svg viewBox="0 0 420 200" xmlns="http://www.w3.org/2000/svg">
  <text>
    <textPath href="#circle1" side="left">Text on left of path</textPath>
  </text>
  <text>
    <textPath href="#circle2" side="right">Text on right of path</textPath>
  </text>

  <circle id="circle1" cx="100" cy="100" r="70" fill="none" stroke="silver" />
  <circle id="circle2" cx="320" cy="100" r="70" fill="none" stroke="silver" />
</svg>
```

#### Result

Browsers that support setting the `side` attribute will display text to the left (outside) and to the right (inside) of the circular text path below.

## Usage notes

       | Value
       | `left` | `right`

       | Default value
       | `left`

       | Animatable
       | Yes

- `left`
    This value places the text on the left side of the path (relative to the path direction).
- `right`
    This value places the text on the right side of the path (relative to the path direction). This effectively reverses the path direction.

## See also

- `SVGTextPathElement.side`
