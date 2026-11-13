---
title: "`:stalled` CSS pseudo-class"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/selectors/_colon_stalled/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `:stalled` CSS pseudo-class

The **`:stalled`** CSS pseudo-class selector represents an element that is playable, such as `<audio>` or ``, when playback is stalled.
A resource is considered to be stalled if the user has requested playback of a specific position in the media resource, but it has failed to receive any data for some amount of time.
This is different from `:buffering` in that the media element is unexpectedly not loading data when stalled (e.g., due to a network error) for around 3 seconds (the exact time is user agent dependent).

> **Note:**
> Like with the `:buffering` pseudo-class, the element is still considered to be "playing" when it is "stalled".
> If `:stalled` matches an element, `:playing` will also match that element.

## Syntax

```css
:stalled {
  /* ... */
}
```

## Examples

### CSS

```css
:stalled {
  outline: 5px solid red;
}

audio:stalled {
  background-color: red;
}
```

## See also

- `:buffering`
- `:muted`
- `:paused`
- `:playing`
- `:seeking`
- `:volume-locked`
- CSS selectors
- `stalled` event
