---
title: "`-webkit-transform-3d` CSS media feature"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/at-rules/@media/-webkit-transform-3d/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `-webkit-transform-3d` CSS media feature

The **`-webkit-transform-3d`** Boolean CSS media feature is a WebKit extension whose value is `true` if vendor-prefixed CSS 3D `transform`s are supported.

> **Note:**
> While this media feature is currently supported by most browsers. If possible, use an `@supports` feature query instead.

## Syntax

`-webkit-transform-3d` is a Boolean CSS media feature whose value is `true` if the browser supports `-webkit` prefixed CSS 3D `transform`s.

### Values

- `true`
    The browser supports the 3D CSS transforms with the `-webkit` prefix and supports non-standard, prefixed media queries.
- `false`
    The 3D CSS transforms prefixed with `-webkit` are not supported by the browser.

## Examples

### Examples of media queries with -webkit-transform-3d

```css
@media (-webkit-transform-3d) {
  .foo {
    transform-style: preserve-3d;
  }
}
```

A better method for checking for browser support is using a feature query:

```css
@supports (transform-style) {
  .foo {
    transform-style: preserve-3d;
  }
}
```

## See also

- `-webkit-transform-2d`
- `-webkit-transition`
- `-webkit-animation`
- `transform` and using CSS transforms
- `@media` and Using media queries
- `@supports` and using feature queries
