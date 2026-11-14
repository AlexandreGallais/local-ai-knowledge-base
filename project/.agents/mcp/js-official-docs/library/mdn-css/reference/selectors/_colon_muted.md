---
title: "`:muted` CSS pseudo-class"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/selectors/_colon_muted/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `:muted` CSS pseudo-class

The **`:muted`** CSS pseudo-class selector represents an element that is capable of making sound, such as `<audio>` or ``, but is muted (forced silent).

Muted is different from `:volume-locked` in that the page author has control over whether a media element can be muted or un-muted.
User agents may set media `muted` value according to use preferences (e.g., remembering the last set value across sessions, on a per-site basis, or otherwise).
An element that is `:volume-locked` cannot be muted, un-muted, or have its volume changed via JavaScript because of an operating system or user agent preference.

## Syntax

```css
:muted {
  /* ... */
}
```

## Examples

### HTML

The `muted` attribute is added to the `` element so that the sound is muted, this works the same for `<audio>` elements.

```html
<!-- 'Big Buck Bunny' licensed under CC 3.0 by the Blender foundation. Hosted by archive.org -->
<!-- Poster from peach.blender.org -->
<video
  controls
  muted
  src="https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4"
  poster="https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217"
  width="620">
  Sorry, your browser doesn't support embedded videos, but don't worry, you can
  <a href="https://archive.org/details/BigBuckBunny_124">download it</a>
  and watch it with your favorite video player!
</video>
```

### CSS

If the `` element is `muted` then a red outline is drawn around it, when it is not muted then it has a green outline. Try toggling the mute icon in the controls to see the state change.

```css
video {
  margin: 5px;
}
```

```css
video:muted {
  outline: 5px solid red;
}

video:not(:muted) {
  outline: 5px solid green;
}
```

## See also

- `:buffering`
- `:paused`
- `:playing`
- `:seeking`
- `:stalled`
- `:volume-locked`
- CSS selectors
- `muted` property of `HTMLMediaElement` objects
