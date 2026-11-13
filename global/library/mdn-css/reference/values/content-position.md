---
title: "`<content-position>` CSS type"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/values/content-position/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<content-position>` CSS type

The **`<content-position>`** enumerated value type is used by `justify-content` and `align-content` properties, and the `place-content` shorthand, to align the box's contents within itself.

## Syntax

```plain
<content-position> = center | start | end | flex-start | flex-end
```

## Values

The `<content-position>` enumerated value type is specified using one of the following key terms.

- `center`
    Centers the alignment subject within its alignment container.
- `start`
    Aligns the alignment subject flush with the alignment container's start edge.
- `end`
    Aligns the alignment subject flush with the alignment container's end edge.
- `flex-start`
    In flex layout, aligns the alignment subject flush with the edge of the alignment container corresponding to the flex container's main-start or cross-start side, as appropriate. It is identical to `start` for layout modes other than flex layout.
- `flex-end`
    In flex layout, aligns the alignment subject flush with the edge of the alignment container corresponding to the flex container's main-end or cross-end side, as appropriate. Identical to `end` for layout modes other than flex layout.

> **Note:**
> The `left` and `right` keywords are excluded from `<content-position>`, despite being valid positional alignment values for the `justify-*` properties (`justify-content`, `justify-self`, and `justify-items`), because they are not allowed in the `align-*` properties (`align-content`, `align-self`, and `align-items`). They are instead explicitly included in the `justify-*` properties' grammars.

## See also

- Properties that use this data type: `align-content`, `justify-content`, `place-content`
- Other box alignment data types: `baseline-position`, `content-distribution`, `content-position`, `overflow-position`, and `self-position`
- CSS box alignment module
- CSS flexible box layout module
- CSS grid layout module
