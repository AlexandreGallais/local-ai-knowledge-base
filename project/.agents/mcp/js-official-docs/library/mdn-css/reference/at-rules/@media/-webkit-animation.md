---
title: "`-webkit-animation` CSS media feature"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/at-rules/@media/-webkit-animation/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `-webkit-animation` CSS media feature

> **Note:**
> All browsers support the `animation` property without vendor prefixes. Only WebKit (Safari), and not Chromium, based browsers supports the `-webkit-animation` media feature. No browsers support `animation`, without the prefix, as a media query. Use the `@supports (animation)` feature query instead.

The **`-webkit-animation`** Boolean CSS media feature is a WebKit extension whose value is `true` if vendor-prefixed CSS `animation`s are supported.

Apple has a description in Safari CSS Reference.

> **Note:**
> This media feature is only supported by WebKit. If possible, use an `@supports` feature query instead.

## Syntax

The `-webkit-animation` media feature is a Boolean whose value is `true` if the vendor-prefixed CSS animation properties are supported _and_ the browser supports prefixed property media queries.

### Values

- `true`
    The browser supports `-webkit` prefixed CSS `animation`.
- `false`
    The browser doesn't support these prefixed CSS animations.

## Examples

### Example of -webkit-animation

```css
@media (-webkit-animation) {
  /* CSS to use if -webkit- prefixed animations are supported AND the browser supports prefixed properties as media queries */
}
```

## Specifications

Not part of any standard.

## See also

- `-webkit-transform-3d`
- `-webkit-transform-2d`
- `-webkit-transition`
- `animation` and using CSS animations
- `@media` and Using media queries
- `@supports` and using feature queries
