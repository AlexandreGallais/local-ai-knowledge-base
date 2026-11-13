---
title: "rotate"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/svg/reference/attribute/rotate/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# rotate

The `rotate` attribute has two different uses depending on the element it is applied to:

- On `<animateMotion>` elements it specifies how the animated element rotates as it travels along a motion path.
- On `<text>` and `<tspan>` elements it specifies rotation for each glyph in the text element.

The SVG `rotate` attribute can be used with the following SVG elements:

- `<animateMotion>`
- `<text>`
- `<tspan>`

## animateMotion

       | Value
       |
        `auto` | `auto-reverse` |
        `number`

       | Default value
       | `0`

       | Animatable
       | No

The `auto` and `auto-reverse` values allow the animated element's rotation to change dynamically as it travels along the path.
If the value of `rotate` is `auto`, the element turns to align its right-hand side in the current direction of motion.
If the value is `auto-reverse`, it turns its left-hand side in the current direction of motion.

Setting `rotate`'s value to a number specifies a constant rotation, in degrees, that does not change with the animation.
The default value of `0` keeps the animated element in its original orientation.

## text and tspan

       | Value
       |
        &#x3C;list-of-number>

       | Default value
       | None

       | Animatable
       | Yes

A list of numbers (separated by spaces or commas), each specifying the rotation in degrees to apply to the corresponding glyph.
If there are fewer numbers than glyphs, the last number is applied to all remaining glyphs.
If there are more numbers than glyphs, the extra numbers are ignored.

Rotation values apply to single rendered visual characters, and therefore do not always map one-to-one to input characters or rendered glyphs.
Where a single visual character is composed of multiple glyphs (such as a base letter with a separate accent glyph), or where multiple input characters collapse into a single glyph (such as a ligature), the parts that belong together are rotated as a group.
This is needed because rotating them independently would distort the appearance or meaning of the character.

## Examples

### Rotation along a motion path (animateMotion)

#### SVG

```html
<svg
  width="400"
  height="120"
  viewBox="0 0 480 120"
  xmlns="http://www.w3.org/2000/svg">
  <!-- Draw the outline of the motion path in grey -->
  <path
    d="M10,110 A120,120 -45 0,1 110 10 A120,120 -45 0,1 10,110"
    stroke="lightgrey"
    stroke-width="2"
    fill="none"
    id="theMotionPath" />

  <!-- Red arrow which will not rotate -->
  <path fill="red" d="M-5,-5 L10,0 -5,5 0,0 Z">
    <!-- Define the motion path animation -->
    <animateMotion dur="6s" repeatCount="indefinite" rotate="0">
      <mpath href="#theMotionPath" />
    </animateMotion>
  </path>

  <g transform="translate(100, 0)">
    <use href="#theMotionPath" />
    <!-- Green arrow which will rotate along the motion path -->
    <path fill="green" d="M-5,-5 L10,0 -5,5 0,0 Z">
      <!-- Define the motion path animation -->
      <animateMotion dur="6s" repeatCount="indefinite" rotate="auto">
        <mpath href="#theMotionPath" />
      </animateMotion>
    </path>
  </g>

  <g transform="translate(200, 0)">
    <use href="#theMotionPath" />
    <!-- Blue arrow which will rotate backwards along the motion path -->
    <path fill="blue" d="M-5,-5 L10,0 -5,5 0,0 Z">
      <!-- Define the motion path animation -->
      <animateMotion dur="6s" repeatCount="indefinite" rotate="auto-reverse">
        <mpath href="#theMotionPath" />
      </animateMotion>
    </path>
  </g>

  <g transform="translate(300, 0)">
    <use href="#theMotionPath" />
    <!-- Purple arrow which will have a static rotation of 210 degrees -->
    <path fill="purple" d="M-5,-5 L10,0 -5,5 0,0 Z">
      <!-- Define the motion path animation -->
      <animateMotion dur="6s" repeatCount="indefinite" rotate="210">
        <mpath href="#theMotionPath" />
      </animateMotion>
    </path>
  </g>
</svg>
```

#### Result

### Per-glyph rotation (text)

#### SVG

```html
<svg width="200" height="80" xmlns="http://www.w3.org/2000/svg">
  <text x="20" y="50" font-size="28" rotate="0 15 30 45 60 75">Hello!</text>
</svg>
```

#### Result
