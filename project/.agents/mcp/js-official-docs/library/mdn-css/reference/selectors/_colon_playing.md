---
title: "`:playing` CSS pseudo-class"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/selectors/_colon_playing/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `:playing` CSS pseudo-class

The **`:playing`** CSS pseudo-class selector represents the playback state of an element that is playable, such as `<audio>` or ``, when that element is "playing".
An element is considered to be playing if it is currently playing the media resource, or if it has temporarily stopped for reasons other than user intent (such as `:buffering` or `:stalled`).

## Syntax

```css
:playing {
  /* ... */
}
```

## Examples

### CSS

```css
:playing {
  border: 5px solid green;
}
```

## See also

- `:buffering`
- `:muted`
- `:paused`
- `:seeking`
- `:stalled`
- `:volume-locked`
- CSS selectors
