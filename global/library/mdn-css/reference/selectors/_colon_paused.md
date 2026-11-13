---
title: "`:paused` CSS pseudo-class"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/selectors/_colon_paused/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `:paused` CSS pseudo-class

The **`:paused`** CSS pseudo-class selector represents an element that is playable, such as `<audio>` or ``, when that element is "paused" (i.e., not "playing").

A resource is paused if the user explicitly paused it, or if it is in a non-activated or other non-playing state, like "loaded, hasn't been activated yet".
This is different from `:buffering` or `:stalled`, which are states that occur while the resource is considered "playing".

## Syntax

```css
:paused {
  /* ... */
}
```

## Examples

### CSS

```css
:paused {
  border: 5px solid orange;
}
```

## See also

- `:buffering`
- `:muted`
- `:playing`
- `:seeking`
- `:stalled`
- `:volume-locked`
- CSS selectors
