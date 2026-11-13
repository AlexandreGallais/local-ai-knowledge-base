---
title: "`:seeking` CSS pseudo-class"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/selectors/_colon_seeking/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `:seeking` CSS pseudo-class

The **`:seeking`** CSS pseudo-class selector represents an element that is playable, such as `<audio>` or ``, when the playable element is seeking a playback position in the media resource.
A resource is considered to be seeking if the user has requested playback of a specific position in the media resource, but the media element has not yet reached that position.

Seeking is different from `:buffering` in that the media element is not currently loading data, but is instead skipping to a new position in the media resource.
For more information, see the Media buffering, seeking, and time ranges guide.

## Syntax

```css
:seeking {
  /* ... */
}
```

## Examples

### CSS

```css
:seeking {
  outline: 5px solid red;
}

video:seeking {
  outline: 5px solid blue;
}
```

## See also

- `:buffering`
- `:muted`
- `:paused`
- `:playing`
- `:stalled`
- `:volume-locked`
- CSS selectors
