---
title: "color"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/svg/reference/attribute/color/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# color

The **`color`** attribute is used to provide a potential indirect value, `currentColor`, for the `fill`, `stroke`, `stop-color`, `flood-color`, and `lighting-color` attributes.

> **Note:**
> As a presentation attribute, `color` also has a CSS property counterpart: `color`. When both are specified, the CSS property takes priority.

Technically, `color` can be applied to any element, but it has no direct effect on SVG elements.

## Example

```css
html,
body,
svg {
  height: 100%;
}
```

```html
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <g color="green">
    <rect width="50" height="50" fill="currentColor" />
    <circle
      r="25"
      cx="70"
      cy="70"
      stroke="currentColor"
      fill="none"
      stroke-width="5" />
  </g>
</svg>
```

## Usage notes

       | Value
       |
        <code>&#x3C;color></code>
        | `inherit`

       | Default value
       | Depends on user agent

       | Animatable
       | Yes

## See also

- CSS `color` property
