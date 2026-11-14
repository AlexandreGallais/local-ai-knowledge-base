---
title: "`:-moz-loading` CSS pseudo-class"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/selectors/_colon_-moz-loading/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `:-moz-loading` CSS pseudo-class

The **`:-moz-loading`** CSS pseudo-class is a Mozilla extension that matches elements that can't be displayed because they have not started loading, such as images that haven't started to arrive yet. Note that images that are _in the process_ of loading _are not_ matched by this pseudo-class.

> **Note:**
> This selector is mainly intended to be used by theme developers.

## Syntax

```css
:-moz-loading {
  /* ... */
}
```

## Examples

### Setting a background for images that are loading

```css
:-moz-loading {
  background: url("loading-animation.gif") center no-repeat;
}
```

## Specifications

Not part of any standard.

## See also

- `:-moz-broken`, `:-moz-suppressed`, `:-moz-user-disabled`
