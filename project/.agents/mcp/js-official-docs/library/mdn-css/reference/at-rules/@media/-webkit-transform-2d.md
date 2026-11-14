---
title: "`-webkit-transform-2d` CSS media feature"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/at-rules/@media/-webkit-transform-2d/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `-webkit-transform-2d` CSS media feature

> **Note:**
> All browsers support the `transform` property without vendor prefixes. Only WebKit (Safari), and not Chromium, based browsers supports the `-webkit-transform-2d` media feature. No browsers support `transform`, without the prefix or `2d` extension, as a media query. Use the `@supports (transform)` feature query instead.

The **`-webkit-transform-2d`** Boolean CSS media feature is a WebKit extension whose value is `true` if vendor-prefixed CSS 2D `transform`s and non-standard vendor-prefixed media queries are supported.

Apple has a description in Safari CSS Reference.

## Syntax

`-webkit-transform-2d` is a Boolean CSS media feature whose value is `true` if the browser supports `-webkit` prefixed CSS 2D `transform`s.

### Values

- `true`
    The browser supports the 2D CSS transforms with the `-webkit` prefix.
- `false`
    The 2D CSS transforms prefixed with `-webkit` are not supported by the browser.

## Examples

### Basic <example-value>

```css
@media (-webkit-transform-2d) {
  div {
    -webkit-transform: translate(100px, 100px);
  }
}
```

This media feature is only supported by WebKit. The unprefixed `transform` property is supported in all modern browsers. If possible, use an `@supports` feature query instead:

```css
@supports (-webkit-transform: translate(100px, 100px)) {
  div {
    -webkit-transform: translate(100px, 100px);
  }
}
```

## Specifications

Not part of any standard.

## See also

- `-webkit-transform-3d`
- `-webkit-transition`
- `-webkit-animation`
- `transform` and using CSS transforms
- `@media` and Using media queries
- `@supports` and using feature queries
