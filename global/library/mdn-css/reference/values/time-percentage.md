---
title: "`<time-percentage>` CSS type"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/values/time-percentage/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<time-percentage>` CSS type

The **`<time-percentage>`** CSS data type represents a value that can be either a `time` or a `percentage`.

## Syntax

Refer to the documentation for `time` and `percentage` for details of the individual syntaxes allowed by this type.

## Examples

### Use in calc()

Where a `<time-percentage>` is specified as an allowable type, this means that the percentage resolves to a time and therefore can be used in a `calc()` expression.

### Valid percentages

```plain
50%
+50%        Optional plus sign
-50%        Negative percentages are not valid for all properties that accept percentages
```

### Invalid percentages

```plain
50 %        Space not allowed between the number and the percentage sign
```

### Valid times

```plain
12s         Positive integer
-456ms      Negative integer
4.3ms       Non-integer
14mS        The unit is case-insensitive, although capital letters are not recommended.
+0s         Zero with a leading + and a unit
-0ms        Zero with a leading - and a unit
```

### Invalid times

```plain
0           Although unitless zero is allowed for <length>s, it's invalid for <time>s.
12.0        This is a <number>, not a <time>, because it's missing a unit.
7 ms        No space is allowed between the number and the unit.
```

## See also

- `<percentage>`
- `<time>`
- CSS values and units module
