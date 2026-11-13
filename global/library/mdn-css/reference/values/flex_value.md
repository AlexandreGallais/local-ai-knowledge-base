---
title: "`<flex>` CSS type"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/values/flex_value/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<flex>` CSS type

The **`<flex>`** CSS data type denotes a flexible length within a grid container. It is used in `grid-template-columns`, `grid-template-rows` and other related properties.

## Syntax

The `<flex>` data type is specified as a `<number>` followed by the unit `fr`. The `fr` unit represents a fraction of the leftover space in the grid container. As with all CSS dimensions, there is no space between the unit and the number.

## Examples

### Examples of correct values for the fr data type

```plain
1fr    /* Using an integer value */
2.5fr  /* Using a float value */
```

### Example of use in a track listing for CSS grid layout

```css
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr 2.5fr 1.5fr;
}
```

## See also

- CSS grid layout
