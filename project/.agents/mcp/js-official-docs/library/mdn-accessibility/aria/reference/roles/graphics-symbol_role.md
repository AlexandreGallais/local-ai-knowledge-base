---
title: "ARIA: graphics-symbol role"
tool: "mdn-accessibility"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/accessibility/aria/reference/roles/graphics-symbol_role/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ARIA: graphics-symbol role

The `graphics-symbol` role identifies a graphical object that conveys a simple meaning or category, where the meaning is more important than the particular visual appearance.

> **Note:**
> The `graphics-symbol` role is defined in the WAI-ARIA Graphics Module specification.
> It's not part of the core WAI-ARIA specification.

## Description

The `graphics-symbol` role identifies an element as a meaningful, atomic symbol that functions as a single unit. It may be part of a larger graphical structure, such as a map, chart, or diagram.

The `graphics-symbol` role is a subclass of `img` for symbols with a simple meaning, whereas an `img` may require a detailed description.

### All descendants are presentational

The children of a `graphics-symbol` are not exposed separately to assistive technologies. Include any meaningful text from its children in the symbol's accessible name.

### Associated WAI-ARIA roles, states, and properties

- `aria-labelledby` or `aria-label`
    A `graphics-symbol` must have an accessible name. Use `aria-labelledby` to reference a label or `aria-label` to provide one directly.
- `aria-roledescription`
    When used as part of a structured symbolic language, this attribute can name the symbol type separately from the name and description of an individual symbol.

## Examples

Each parking-space symbol combines a rectangle and text into one `` element. The `graphics-symbol` role makes this combination a single object for assistive technologies, with its meaning supplied by `aria-label`. The outer `` provides the graphical document semantics.

```html
<svg aria-label="Parking lot" viewBox="0 0 700 220">
  <title>Parking lot with designated spaces</title>
  <g role="graphics-symbol" aria-label="Available parking space">
    <rect
      x="90"
      y="50"
      width="100"
      height="150"
      fill="#3986ca"
      stroke="black"
      stroke-width="3" />
    <text
      x="140"
      y="135"
      text-anchor="middle"
      fill="black"
      font-size="35"
      font-weight="bold">
      P
    </text>
    <text x="140" y="180" text-anchor="middle" fill="black" font-size="18">
      Available
    </text>
  </g>
  <g role="graphics-symbol" aria-label="Reserved parking space">
    <rect
      x="290"
      y="50"
      width="100"
      height="150"
      fill="#cac539"
      stroke="black"
      stroke-width="3" />
    <text
      x="340"
      y="135"
      text-anchor="middle"
      fill="black"
      font-size="35"
      font-weight="bold">
      P
    </text>
    <text x="340" y="180" text-anchor="middle" fill="black" font-size="18">
      Reserved
    </text>
  </g>
  <g role="graphics-symbol" aria-label="Unavailable parking space">
    <rect
      x="490"
      y="50"
      width="100"
      height="150"
      fill="#b3b3b3"
      stroke="black"
      stroke-width="3" />
    <text
      x="540"
      y="135"
      text-anchor="middle"
      fill="black"
      font-size="35"
      font-weight="bold">
      P
    </text>
    <circle
      cx="540"
      cy="123"
      r="32"
      fill="none"
      stroke="black"
      stroke-width="4" />
    <line x1="517" y1="100" x2="563" y2="146" stroke="black" stroke-width="4" />
    <text x="540" y="180" text-anchor="middle" fill="black" font-size="16">
      Unavailable
    </text>
  </g>
</svg>
```

## Best practices

Don't use this role for decorative graphics. Use `aria-hidden="true"` instead.

Avoid this role for complex graphics with internal structure. Use `graphics-object` instead.

## See also

- The `` element
- ARIA in HTML
- ARIA: `graphics-document` role
- ARIA: `graphics-object` role
- ARIA: `figure` role
- ARIA: `img` role
- Notes on Using ARIA in HTML
