---
title: "`line-height-step` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/line-height-step/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `line-height-step` CSS property

The **`line-height-step`** CSS property sets the step unit for line box heights. When the property is set, line box heights are rounded up to the closest multiple of the unit.

## Syntax

```css
/* Point values */
line-height-step: 18pt;

/* Global values */
line-height-step: inherit;
line-height-step: initial;
line-height-step: revert;
line-height-step: revert-layer;
line-height-step: unset;
```

### Values

This property is specified as the following value:

- `<length>`
    The specified `<length>` is used in the calculation of the line box height step.

## Examples

### Setting step unit for line box height

In the following example, the height of line box in each paragraph is rounded up to the step unit. The line box in `<h1>` does not fit into one step unit and thus occupies two, but it is still centered within the two step unit.

```css
:root {
  font-size: 12pt;
  --my-grid: 18pt;
  line-height-step: var(--my-grid);
}
h1 {
  font-size: 20pt;
  margin-top: calc(2 * var(--my-grid));
}
```

The result of these rules is shown below in the following screenshot:

## Specifications

Currently, no browsers support this feature.

## See also

- `font`
- `font-size`
- `line-height`
- CSS Rhythmic Sizing specification
