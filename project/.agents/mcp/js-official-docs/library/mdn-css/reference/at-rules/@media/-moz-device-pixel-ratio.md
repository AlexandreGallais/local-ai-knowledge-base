---
title: "`-moz-device-pixel-ratio` CSS media feature"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/at-rules/@media/-moz-device-pixel-ratio/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `-moz-device-pixel-ratio` CSS media feature

The **`-moz-device-pixel-ratio`** Gecko-only CSS media feature can be used to apply styles based on the number of device pixels per CSS pixel.

> **Warning:**
> Do not use this feature. Use the `resolution` feature with the `dppx` unit instead.

> **Note:**
> This media feature is also implemented by WebKit as `-webkit-device-pixel-ratio`. The min and max prefixes as implemented by Gecko are named `min--moz-device-pixel-ratio` and `max--moz-device-pixel-ratio`; but the same prefixes as implemented by WebKit are named `-webkit-min-device-pixel-ratio` and `-webkit-max-device-pixel-ratio`.

## Syntax

- `<number>`
    The number of device pixels per CSS pixel.

**Media:** `@media`
**Accepts min/max prefixes:** yes

## Examples

### Basic <example-value> example

`-moz-device-pixel-ratio` may be used for compatibility with Firefox older than 16, and alongside `-webkit-device-pixel-ratio` for compatibility with WebKit-based browsers that do not support `dppx`.

Example:

```css
/* First, set for WebKit-based browsers */
@media (-webkit-min-device-pixel-ratio: 2),
  (min--moz-device-pixel-ratio: 2) /* Older Firefox browsers (prior to firefox 16) */,
  (min-resolution: 2dppx) /* The standard way */,
  (min-resolution: 192dpi); /* dppx fallback */
```

> **Note:**
> See this CSSWG article for compatibility good practices regarding `resolution` and `dppx`.

## Specifications

Not part of any standard.

## See also

- Using Media Queries
- @media
