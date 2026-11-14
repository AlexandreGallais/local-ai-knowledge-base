---
title: "`<baseline-position>` CSS type"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/values/baseline-position/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<baseline-position>` CSS type

The **`<baseline-position>`** enumerated value type represents the `baseline` keyword values and `first` and `last` modifiers, used for the `align-content`, `align-items`, `align-self`, `justify-items` and `justify-self` properties as well as the `place-content`, `place-items`, and `place-self` shorthand properties.

The `first` and `last` values give a box a baseline alignment preference, defaulting to `first` if the modifier is omitted.

## Syntax

```plain
<baseline-position> = [ first | last ]? && baseline
```

## Values

The `<baseline-position>` enumerated value type is specified using an optional `first` or `last` modifier with the `baseline` value. If a box does not belong to a shared alignment context, then the fallback alignment is used. The fallback alignment is also used to align the baseline-sharing group within its alignment container.

- `baseline`
    Computes to `first baseline`, as defined below.

- `first baseline`
    Aligns the alignment baseline of the box's first baseline set with the corresponding baseline of its baseline-sharing group. The fallback alignment is `safe self-start` for self-alignment or `safe start` for content distribution.

- `last baseline`
    Aligns the alignment baseline of the box's last baseline set with the corresponding baseline of its baseline-sharing group. The fallback alignment is `safe self-end` for self-alignment or `safe end` for content distribution.

## See also

- Properties that use this data type: `align-content`, `align-items`, `align-self`, `justify-items`, `justify-self`, `place-content`, `place-items`, and `place-self`
- Other box alignment data types: `content-distribution`, `content-position`, `overflow-position`, and `self-position`
- CSS box alignment module
- CSS flexible box layout module
- CSS grid layout module
