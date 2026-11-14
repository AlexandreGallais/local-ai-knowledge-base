---
title: "`<dimension>` CSS type"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/values/dimension/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<dimension>` CSS type

The **`<dimension>`** CSS data type represents a `<number>` with a unit attached to it, for example `10px`.

CSS uses dimensions to specify distances (`<length>`), durations (`<time>`), frequencies (`<frequency>`), resolutions (`resolution`), and other quantities.

## Syntax

The syntax of `<dimension>` is a `<number>` immediately followed by a unit which is an identifier. Unit identifiers are case insensitive.

## Examples

### Valid dimensions

```plain
12px      12 pixels
1rem      1 rem
1.2pt     1.2 points
2200ms    2200 milliseconds
5s        5 seconds
200hz     200 Hertz
200Hz     200 Hertz (values are case insensitive)
```

### Invalid dimensions

```plain
12 px       The unit must come immediately after the number.
12"px"      Units are identifiers and therefore unquoted.
3sec        The seconds unit is abbreviated "s" not "sec".
```

## See also

- CSS data types
- Learn to style HTML using CSS
- CSS distances (`<length>`), durations (`<time>`), frequencies (`<frequency>`), and resolutions (`resolution`)
