---
title: "`:past` CSS pseudo-class"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/selectors/_colon_past/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `:past` CSS pseudo-class

The **`:past`** CSS pseudo-class selector is a time-dimensional pseudo-class that will match for any element which appears entirely before an element that matches `:current`. For example in a video with captions which are being displayed by WebVTT.

```css
:past(p, span) {
  display: none;
}
```

## Syntax

```css
:past {
  /* ... */
}
```

## Examples

### HTML

```html
<video controls preload="metadata">
  <source src="video.mp4" type="video/mp4" />
  <source src="video.webm" type="video/webm" />
  <track
    label="English"
    kind="subtitles"
    srclang="en"
    src="subtitles.vtt"
    default />
</video>
```

### CSS

```css
:past(p, span) {
  display: none;
}
```

### WebVTT

```plain
WEBVTT FILE

1
00:00:03.500 --> 00:00:05.000
This is the first caption

2
00:00:06.000 --> 00:00:09.000
This is the second caption

3
00:00:11.000 --> 00:00:19.000
This is the third caption
```

## See also

- Web Video Text Tracks Format (WebVTT)
- `:current`
- `:future`
