---
title: "flood-color"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/svg/reference/attribute/flood-color/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# flood-color

The **`flood-color`** attribute indicates what color to use to flood the current filter primitive subregion.

> **Note:**
> As a presentation attribute, `flood-color` also has a CSS property counterpart: `flood-color`. When both are specified, the CSS property takes priority.

You can use this attribute with the following SVG elements:

- `<feFlood>`
- `<feDropShadow>`

## Example

```css
html,
body,
svg {
  height: 100%;
}
```

```html
<svg viewBox="0 0 420 200" xmlns="http://www.w3.org/2000/svg">
  <filter id="flood1">
    <feFlood flood-color="skyblue" x="0" y="0" width="200" height="200" />
  </filter>
  <filter id="flood2">
    <feFlood flood-color="seagreen" x="0" y="0" width="200" height="200" />
  </filter>

  <rect x="0" y="0" width="200" height="200" filter="url(#flood1)" />
  <rect x="220" y="0" width="200" height="200" filter="url(#flood2)" />
</svg>
```

## Usage notes

       | Value
       | `color`

       | Initial value
       | `black`

       | Animatable
       | Yes

## See also

- CSS `flood-color` property
- `flood-opacity`
