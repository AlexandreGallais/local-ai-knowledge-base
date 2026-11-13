---
title: "filter"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/svg/reference/attribute/filter/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# filter

The **`filter`** attribute specifies the filter effects defined by the `<filter>` element that shall be applied to its element.

> **Note:**
> As a presentation attribute, `filter` also has a CSS property counterpart: `filter`. When both are specified, the CSS property takes priority.

Technically, `filter` can be applied to any element, but it only has effect on container elements without the `<defs>` element, all graphics elements, and the `<use>` element.

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
  <filter id="blur">
    <feGaussianBlur stdDeviation="2" />
  </filter>

  <rect x="10" y="10" width="80" height="80" filter="url(#blur)" />
</svg>
```

## Usage notes

       | Value
       |
        `none`
        |
        `&#x3C;filter-value-list>`

       | Default value
       | `none`

       | Animatable
       | Yes

For a description of the values see the CSS `filter` property.

## See also

- `<filter>`
- CSS `filter` property
