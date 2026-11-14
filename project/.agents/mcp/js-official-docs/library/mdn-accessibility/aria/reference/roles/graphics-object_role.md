---
title: "ARIA: graphics-object role"
tool: "mdn-accessibility"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/accessibility/aria/reference/roles/graphics-object_role/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ARIA: graphics-object role

The `graphics-object` role identifies a section of a `graphics-document` that represents a distinct object or sub-component with semantic meaning.

> **Note:**
> The `graphics-object` role is defined in the WAI-ARIA Graphics Module specification.
> It's not part of the core WAI-ARIA specification.

## Description

The `graphics-object` role identifies a distinct part of a larger graphic, such as a region on a map, a bar in a chart, or a node in a diagram. A `graphics-object` may itself contain nested sub-components. Unlike a `graphics-document`, it does not need to be self-contained and does not introduce a separate navigation context.

### Associated WAI-ARIA roles, states, and properties

- `aria-labelledby` or `aria-label`
    An accessible name is optional and can also be derived from the element's contents. Use `aria-labelledby` to reference a label or `aria-label` to provide one directly.

## Examples

In this simplified map, each continent is a distinct object containing a shape and a text label. The `graphics-object` role identifies each `` as a meaningful part of the map while preserving its child content. A group used only to position or style elements would not need this role. The outer `` provides the graphical document semantics.

```html
<svg aria-label="World map showing major continents" viewBox="0 0 900 420">
  <title>Simplified world map</title>
  <g role="graphics-object">
    <circle cx="700" cy="130" r="120" fill="#3eca39" stroke="black" />
    <text x="700" y="137" fill="black" text-anchor="middle">Asia</text>
  </g>
  <g role="graphics-object">
    <circle cx="400" cy="70" r="50" fill="#7d39ca" stroke="black" />
    <text x="400" y="77" fill="white" text-anchor="middle">Europe</text>
  </g>
  <g role="graphics-object">
    <circle cx="400" cy="260" r="100" fill="#ca7d39" stroke="black" />
    <text x="400" y="267" fill="black" text-anchor="middle">Africa</text>
  </g>
  <g role="graphics-object">
    <circle cx="120" cy="70" r="65" fill="#ca393e" stroke="black" />
    <text x="120" y="77" fill="white" text-anchor="middle">North America</text>
  </g>
  <g role="graphics-object">
    <circle cx="120" cy="260" r="60" fill="#39ca7d" stroke="black" />
    <text x="120" y="267" fill="black" text-anchor="middle">South America</text>
  </g>
  <g role="graphics-object">
    <circle cx="760" cy="350" r="50" fill="#cac539" stroke="black" />
    <text x="760" y="357" fill="black" text-anchor="middle">Australia</text>
  </g>
</svg>
```

## Best practices

When dealing with container elements that represent a collection of disconnected objects, use `group` or `list` roles instead.

Avoid assigning this role to grouping elements used purely for styling or layout purposes. In such cases, omit the role or use `none` or `presentation` instead.

## See also

- The `` element
- ARIA in HTML
- ARIA: `graphics-document` role
- ARIA: `graphics-symbol` role
- ARIA: `group` role
- Notes on Using ARIA in HTML
