---
title: "`<content-distribution>` CSS type"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/values/content-distribution/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<content-distribution>` CSS type

The **`<content-distribution>`** enumerated value type is used by `justify-content` and `align-content` properties, and the `place-content` shorthand, to distribute a container's extra space among its alignment subjects.

## Syntax

```plain
<content-distribution> = space-between | space-around | space-evenly | stretch
```

## Values

The following keyword values are represented by the `<content-distribution>` grammar term:

- `space-between`
    Evenly distributes the alignment subject within the alignment container. The first item is placed flush with the start edge of the alignment container, the last item subject is placed flush with the end edge of the alignment container, and the remaining items are evenly distributed so that the spacing between any two adjacent items is the same. The default fallback alignment for `space-between` is `safe flex-start` for flex layout, and `start` otherwise. If there is only one item, the item will be flush with the start edge.

- `space-around`
    The items are evenly distributed in the container, with a half-size space on either end. The spacing between any two adjacent items is the same, and the spacing before the first and after the last items is half the size of the other spacing. The default fallback alignment for `space-around` is `safe center`. If the container has only one child, the item will be centered.

- `space-evenly`
    The items are evenly distributed in the container, with a full-size space on either end. The spacing between any two adjacent items, before the first item, and after the last item, are all the same. The default fallback alignment for `space-evenly` is `safe center`. If the container has only one child, the item will be centered.

- `stretch`
    If the combined size of the items is less than the size of the container, any items that can grow will have their size increased equally (not proportionally), while still respecting the constraints imposed by `max-height`, `max-width`, or equivalent functionality, so that the combined size of the items exactly fills the container. The default fallback alignment for `stretch` is `flex-start` in flexbox, and `start` in other layout modes. If there is only one item, and that item can grow, it will grow to fill the container.

## See also

- Properties that use this data type: `align-content`, `justify-content`, `place-content`
- Other box alignment data types: `baseline-position`, `content-position`, `overflow-position`, and `self-position`
- CSS box alignment module
- CSS flexible box layout module
- CSS grid layout module
