---
title: "`:buffering` CSS pseudo-class"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/selectors/_colon_buffering/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `:buffering` CSS pseudo-class

The **`:buffering`** CSS pseudo-class selector represents an element that is playable, such as `<audio>` or ``, when the playable element is buffering a media resource.

An element is considered as buffering when that element cannot continue playing because it is trying to load media data but does not yet have enough data to begin or continue playback.
For more information, see the Media buffering, seeking, and time ranges guide.

> **Note:**
> An element is still considered to be `:playing` when it is "buffering".
> If `:buffering` matches an element, `:playing` will also match that element.

## Syntax

```css
:buffering {
  /* ... */
}
```

## Examples

### CSS

```css
:buffering {
  outline: 5px solid red;
}

video:buffering {
  outline: 5px solid blue;
}
```

## See also

- `:muted`
- `:paused`
- `:playing`
- `:seeking`
- `:stalled`
- `:volume-locked`
- CSS selectors
