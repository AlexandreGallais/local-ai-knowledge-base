---
title: "`update` CSS media feature"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/at-rules/@media/update/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `update` CSS media feature

The **`update`** CSS media feature can be used to test how frequently (if at all) the output device is able to modify the appearance of content once rendered.

## Syntax

- `none`
    Once it has been rendered, the layout can no longer be updated. Example: documents printed on paper.
- `slow`
    The layout may change dynamically according to the usual rules of CSS, but the output device is not able to render or display changes quickly enough for them to be perceived as a smooth animation. Examples: e-book readers or severely underpowered devices.
- `fast`
    The layout may change dynamically according to the usual rules of CSS, and the output device is not unusually constrained in speed, so regularly-updating things like CSS Animations can be used. Example: computer screens.

## Examples

### HTML

```html
<p>
  If this text animates for you, your browser supports `update` and you are
  using a fast-updating device.
</p>
```

### CSS

```css
@keyframes jiggle {
  from {
    transform: translateY(0);
  }

  to {
    transform: translateY(25px);
  }
}

@media (update: fast) {
  p {
    animation: 1s jiggle linear alternate infinite;
  }
}
```

## See also

- Using Media Queries
- @media
