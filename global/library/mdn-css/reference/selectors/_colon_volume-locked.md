---
title: "`:volume-locked` CSS pseudo-class"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/selectors/_colon_volume-locked/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `:volume-locked` CSS pseudo-class

The **`:volume-locked`** CSS pseudo-class selector represents an element that is capable of making sound, such as `<audio>` or ``, but the audio volume of the media element is currently "locked" by the user.

User agents may set media `muted` or `volume` values according to user preferences (e.g., remembering the last set value across sessions, on a per-site basis, or otherwise).
An element that is `:volume-locked` cannot be muted, un-muted, or have its volume changed via JavaScript. The locked status is an operating system or user agent preference.

## Syntax

```css
:volume-locked {
  /* ... */
}
```

## Examples

### CSS

```css
:volume-locked {
  border: 5px solid green;
}

video:volume-locked {
  border: 5px solid aqua;
}
```

## See also

- `:buffering`
- `:muted`
- `:paused`
- `:playing`
- `:seeking`
- `:stalled`
- CSS selectors
- `volume` property of `HTMLMediaElement` objects
