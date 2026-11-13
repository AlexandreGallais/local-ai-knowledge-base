---
title: "`:-moz-suppressed` CSS pseudo-class"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/selectors/_colon_-moz-suppressed/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `:-moz-suppressed` CSS pseudo-class

The **`:-moz-suppressed`** CSS pseudo-class is a Mozilla extension that matches elements representing images that were suppressed because loading images from the specified site has been blocked.

> **Note:**
> This selector is mainly intended to be used by theme developers.

## Syntax

```css
:-moz-suppressed {
  /* ... */
}
```

## Examples

### Styling elements that have been blocked

```css
:-moz-suppressed {
  background: yellow;
  padding: 8px;
}
```

## Specifications

Not part of any standard.

## See also

- `:-moz-broken`, `:-moz-loading`, `:-moz-user-disabled`
