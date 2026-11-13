---
title: "`::cue` CSS pseudo-element"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/selectors/_doublecolon_cue/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `::cue` CSS pseudo-element

The **`::cue`** CSS pseudo-element matches WebVTT cues within a selected element.
This can be used to style captions and other cues in media with VTT tracks.

```css
video {
  width: 100%;
}

video::cue {
  font-size: 1rem;
  color: yellow;
}

::cue(u) {
  color: red;
}
```

```html
<video controls src="/shared-assets/videos/friday.mp4">
  <track
    default
    kind="captions"
    srclang="en"
    src="/shared-assets/misc/friday.vtt" />
  Sorry, your browser doesn't support embedded videos.
</video>
```

The properties are applied to the entire set of cues as if they were a single unit. The only exception is that `background` and its longhand properties apply to each cue individually, to avoid creating boxes and obscuring unexpectedly large areas of the media.

In the example above, the `::cue(u)` selector selects all the `` elements inside the cue text.

## Syntax

```css
::cue | ::cue(<selector>) {
  /* ... */
}
```

## Permitted properties

Rules whose selectors include this element may only use the following CSS properties:

- `background`
- `background-attachment`
- `background-clip`
- `background-color`
- `background-image`
- `background-origin`
- `background-position`
- `background-repeat`
- `background-size`
- `color`
- `font`
- `font-family`
- `font-size`
- `font-stretch`
- `font-style`
- `font-variant`
- `font-weight`
- `line-height`
- `opacity`
- `outline`
- `outline-color`
- `outline-style`
- `outline-width`
- `ruby-position`
- `text-combine-upright`
- `text-decoration`
- `text-decoration-color`
- `text-decoration-line`
- `text-decoration-style`
- `text-decoration-thickness`
- `text-shadow`
- `visibility`
- `white-space`

## Examples

### Styling WebVTT cues as white-on-black

The following CSS sets the cue style so that the text is white and the background is a translucent black box.

```css
::cue {
  color: white;
  background-color: rgb(0 0 0 / 60%);
}
```

### Styling WebVTT internal node objects

Cue text can include _internal node objects_ as the tags (similar to HTML elements) `<c>`, ``, ``, ``, `<ruby>`, `<rt>`, `<v>`, and `<lang>`.
The `::cue()` selector can be used to apply styles to content inside these tags to customize how the WebVTT track is displayed.
Consider the following cue text that uses the `` tag to underline some text:

```plain
00:00:01.500 --> 00:00:02.999 line:80%
Tell me, is the <u>lord of the universe</u> in?
```

The following CSS rule customizes the text inside the `` tag with a color and a text-decoration:

```css
::cue(u) {
  color: red;
  text-decoration: wavy overline lime;
}
```

## See also

- Web Video Tracks Format (WebVTT)
- `<track>`, ``
