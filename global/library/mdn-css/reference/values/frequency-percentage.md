---
title: "`<frequency-percentage>` CSS type"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/values/frequency-percentage/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<frequency-percentage>` CSS type

The **`<frequency-percentage>`** CSS data type represents a value that can be either a `frequency` or a `percentage`. Frequency values, e.g., the pitch of a speaking voice, are not currently used in any CSS properties.

## Syntax

The value of a `<frequency-percentage>` is either a `frequency` or a `percentage`; see their individual reference pages for details about their syntaxes.

## Description

### Use in calc()

Where a `<frequency-percentage>` is specified as an allowable type, this means that the percentage resolves to a frequency and therefore can be used in a `calc()` expression.

## Examples

### Valid percentage values

```plain
90% Positive percentage
+90% Positive percentage with leading +
-90% Negative percentage — not valid for all properties that use percentages
```

### Invalid percentage values

```plain
90 % No space is allowed between the number and the unit
```

### Valid frequency values

```plain
12Hz     Positive integer
4.3Hz    Non-integer
14KhZ    The unit is case-insensitive, though non-SI capitalization is not recommended.
+0Hz     Zero, with a leading + and a unit
-0kHz    Zero, with a leading - and a unit
```

### Invalid frequency values

```plain
12.0     This is a <number>, not an <frequency>, because it is missing a unit.
7 Hz     No space is allowed between the number and the unit.
0        Although unitless zero is an allowable <length>, it's an invalid <frequency>.
```

## Browser compatibility

Currently, no browsers support this feature.

## See also

- CSS data types
- CSS values and units module
- Related CSS data types:
  - `<frequency>`
  - `<percentage>`
