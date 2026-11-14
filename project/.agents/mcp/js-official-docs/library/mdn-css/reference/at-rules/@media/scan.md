---
title: "`scan` CSS media feature"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/at-rules/@media/scan/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `scan` CSS media feature

The **`scan`** CSS media feature is used to apply CSS styles based on the scanning process of the output device.

## Syntax

The `scan` feature is specified as one of the following keyword values:

- `interlace`
    The output device uses "interlaced" rendering, where video frames alternate between specifying only the "even" lines on the screen and only the "odd" lines.
- `progressive`
    The output device renders content to the screen with no special treatment.

## Description

Most modern screens (and all computer screens) use progressive rendering, displaying each screen fully with no special treatment.

Interlacing was used by CRT monitors and some plasma TVs to enable the appearance of faster frames per second (FPS) while reducing bandwidth. With interlacing, video frames alternate between rendering the even lines and the odd lines on the screen, downloading and rendering only half the screen for each frame, exploiting the human image-smoothing ability so the brain simulates a higher FPS broadcast at half the bandwidth cost.

When targeting interlaced screens, avoid very fast movement across the screen and ensure animated details are wider than 1px to reduce flickering.

## Examples

### HTML

```html
<p>This is a test.</p>
```

### CSS

```css
p {
  padding: 10px;
  border: solid;
}

@media screen and (scan: interlace) {
  p {
    background: #f4ae8a;
  }
}
@media screen and (scan: progressive) {
  p {
    text-decoration: underline;
  }
}
@media not screen and (scan: progressive) {
  p {
    border-style: dashed;
  }
}
@media not screen and (scan: interlace) {
  p {
    color: purple;
  }
}
```

## See also

- The @media at-rule, which is used to specify the scan expression.
- Using media queries to understand when and how to use a media query.
