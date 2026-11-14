---
title: "`prefers-contrast` CSS media feature"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/at-rules/@media/prefers-contrast/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `prefers-contrast` CSS media feature

The **`prefers-contrast`** CSS media feature is used to detect whether the user has requested the web content to be presented with a lower or higher contrast.

## Syntax

- `no-preference`
    Indicates that the user has made no preference known to the system. This keyword value evaluates as false in the Boolean context.
- `more`
    Indicates that user has notified the system that they prefer an interface that has a higher level of contrast.
- `less`
    Indicates that user has notified the system that they prefer an interface that has a lower level of contrast.
- `custom`
    Indicates that user has notified the system for using a specific set of colors, and the contrast implied by these colors matches neither `more` nor `less`. This value will match the color palette specified by users of `forced-colors: active`.

## User preferences

Various operating systems do support such preferences and user agents are likely to rely on the settings provided by the operating system.

## Examples

This example includes a box with a dashed `outline` set on it by default. When the `prefers-contrast: more` media query matches, the applied outline is given a higher contrast `solid` style instead.

### HTML

```html
<div class="contrast">low contrast box</div>
```

### CSS

```css
.contrast {
  margin: 5px;
  width: 100px;
  height: 100px;
  outline: 2px dashed black;
}

@media (prefers-contrast: more) {
  .contrast {
    outline: 2px solid black;
  }
}
```

## See also

- CSS forced-colors media query
