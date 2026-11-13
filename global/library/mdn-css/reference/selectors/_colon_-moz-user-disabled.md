---
title: "`:-moz-user-disabled` CSS pseudo-class"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/selectors/_colon_-moz-user-disabled/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `:-moz-user-disabled` CSS pseudo-class

The **`:-moz-user-disabled`** CSS pseudo-class is a Mozilla extension that matches elements representing images that were not loaded because images have been entirely disabled by the user's preferences.

> **Note:**
> This selector is mainly intended to be used by theme developers.

## Syntax

```css
:-moz-user-disabled {
  /* ... */
}
```

## Examples

### Styling user-disabled elements

```css
:-moz-user-disabled {
  background-color: lightgray;
  padding: 8px;
}
```

## Specifications

Not part of any standard.

## See also

- `:-moz-broken`, `:-moz-loading`, `:-moz-suppressed`
