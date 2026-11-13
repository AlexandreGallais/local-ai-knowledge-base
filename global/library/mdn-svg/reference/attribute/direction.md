---
title: "direction"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/svg/reference/attribute/direction/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# direction

The **`direction`** attribute specifies the inline-base direction of a `<text>` or `<tspan>` element. It defines the start and end points of a line of text as used by the `text-anchor` and `inline-size` properties. It also may affect the direction in which characters are positioned if the `unicode-bidi` property's value is either `embed` or `bidi-override`.

It applies only to glyphs oriented perpendicular to the inline-base direction, which includes the usual case of horizontally-oriented Latin or Arabic text and the case of narrow-cell Latin or Arabic characters rotated 90 degrees clockwise relative to a top-to-bottom inline-base direction.

In many cases, the bidirectional Unicode algorithm produces the desired result automatically, so this attribute doesn't need to be specified in those cases. For other cases, such as when using right-to-left languages, it may be sufficient to add the `direction` attribute to the outermost `` element, and allow that direction to inherit to all text elements:

> **Note:**
> As a presentation attribute, `direction` also has a CSS property counterpart: `direction`. When both are specified, the CSS property takes priority.

You can use this attribute with the following SVG elements:

- `<textPath>`
- `<text>`
- `<tspan>`

## Example

```css
html,
body,
svg {
  height: 100%;
}
```

```html
<svg
  viewBox="0 0 600 72"
  xmlns="http://www.w3.org/2000/svg"
  direction="rtl"
  lang="fa">
  <text x="300" y="50" text-anchor="middle" font-size="36">
    داستان SVG 1.1 SE طولا ني است.
  </text>
</svg>
```

## Usage notes

       | Value
       | `ltr` | `rtl`

       | Default value
       | `ltr`

       | Animatable
       | Yes

## See also

- CSS `direction` property
