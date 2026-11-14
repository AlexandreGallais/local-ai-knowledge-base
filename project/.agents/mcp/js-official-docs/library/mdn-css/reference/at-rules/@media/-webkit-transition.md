---
title: "`-webkit-transition` CSS media feature"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/at-rules/@media/-webkit-transition/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `-webkit-transition` CSS media feature

> **Note:**
> All browsers support the `transition` property without vendor prefixes. Only WebKit (Safari), and not Chromium, based browsers support the `-webkit-transition` media feature. No browsers support `transition` without the prefix as a media query (though some browsers do support - `-webkit-transform-3d`). Use the `@supports (transition)` feature query instead.

The **`-webkit-transition`** Boolean non-standard CSS media feature is a WebKit extension whose value is `true` if the browsing context supports CSS transitions.

Apple has a description in Safari CSS Reference; this is now called `transition` there.

> **Note:**
> You should not use this media feature; it was never specified, has never been widely implemented, and has been removed from most browsers. Use a `@supports` feature query instead.

## Syntax

```css
@media (-webkit-transition) {
  /* CSS to use if this media feature and prefixed transitions are supported */
}
```

## Examples

### Use @supports instead

Do not use the `-webkit-transition` media feature. Instead, test for transition support using the CSS `@supports` at-rule, like this:

```css
@supports (transition: initial) {
  /* CSS to use if transitions are supported */
}
```

### Obsolete example

Before this became obsolete, you could use `-webkit-transition` in your CSS like this:

```css
@media (-webkit-transition) {
  /* CSS to use if transitions are supported */
}
```

## Specifications

Not part of any standard.

## See also

- `-webkit-transform-3d`
- `-webkit-transform-2d`
- `-webkit-animation`
- `transition` and using CSS transitions
- `@media` and Using media queries
- `@supports` and using feature queries
