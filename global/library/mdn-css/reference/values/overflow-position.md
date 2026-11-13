---
title: "`<overflow-position>` CSS type"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/values/overflow-position/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<overflow-position>` CSS type

The **`<overflow-position>`** enumerated value type defines how an alignment subject that is larger than its alignment container will overflow that container. For example, if centered items are wider than their container, the overflow may be displayed beyond the viewport's start edge, which can't be scrolled to. The `<overflow-position>` value defines whether the alignment mode should be overridden to ensure the content is visible (`safe`) or if the alignment mode must be adhered to (`unsafe`).

This data type is valid for the `align-content`, `align-items`, `align-self`, `justify-items` and `justify-self` properties as well as the `place-content`, `place-items`, and `place-self` shorthand properties.
If omitted, the default overflow alignment is a blend of `safe` and `unsafe`.

## Syntax

```plain
<overflow-position> = unsafe | safe
```

## Values

The following keyword values are represented by the `<overflow-position>` grammar term:

- `safe`
    If the size of the alignment subject overflows the alignment container, the alignment subject is instead aligned as if the alignment mode were `start`.

- `unsafe`
    Regardless of the relative sizes of the alignment subject and alignment container, the given alignment value is honored.

## See also

- Properties that use this data type: `align-content`, `align-items`, `align-self`, `justify-content` `justify-items`, `justify-self`, `place-content`, `place-items`, and `place-self`
- Other box alignment data types: `content-distribution`, `content-position`, `baseline-position`, and `self-position`
- CSS box alignment module
- CSS flexible box layout module
- CSS grid layout module
