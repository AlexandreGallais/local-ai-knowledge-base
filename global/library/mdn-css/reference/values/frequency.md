---
title: "`<frequency>` CSS type"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/values/frequency/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<frequency>` CSS type

The **`<frequency>`** CSS data type represents a frequency dimension, such as the pitch of a speaking voice. It is not currently used in any CSS properties.

## Syntax

The `<frequency>` data type consists of a `<number>` followed by one of the units listed below. As with all CSS dimensions, there is no space between the unit literal and the number.

### Units

- `Hz`
    Represents a frequency in hertz. Examples: `0Hz`, `1500Hz`, `10000Hz`.
- `kHz`
    Represents a frequency in kilohertz. Examples: `0kHz`, `1.5kHz`, `10kHz`.

> **Note:**
> Although the number `0` is always the same regardless of unit, the unit may not be omitted. In other words, `0` is invalid and does not represent `0Hz` or `0kHz`. Though the units are case-insensitive, it is good practice to use a capital "H" for `Hz` and `kHz`, as specified in the SI.

## Examples

Valid frequency values:

```plain
12Hz     Positive integer
4.3Hz    Non-integer
14KhZ    The unit is case-insensitive, though non-SI capitalization is not recommended.
+0Hz     Zero, with a leading + and a unit
-0kHz    Zero, with a leading - and a unit
```

Invalid frequency values:

```plain
12.0     This is a <number>, not an <frequency>, because it is missing a unit.
7 Hz     No space is allowed between the number and the unit.
0        Although unitless zero is an allowable <length>, it's an invalid <frequency>.
```

## Browser compatibility

Currently, no browsers support this feature.

## See also

- `<frequency-percentage>`
- CSS values and units module
