---
title: "`device-aspect-ratio` CSS media feature"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/at-rules/@media/device-aspect-ratio/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `device-aspect-ratio` CSS media feature

> **Note:**
> To query for the aspect ratio of the viewport, developers should use the `aspect-ratio` media feature instead.

The **`device-aspect-ratio`** CSS media feature can be used to test the width-to-height aspect ratio of an output device.

## Syntax

The `device-aspect-ratio` feature is specified as a `<ratio>`. It is a range feature, meaning that you can also use the prefixed **`min-device-aspect-ratio`** and **`max-device-aspect-ratio`** variants to query minimum and maximum values, respectively.

## Examples

### Using min-device-aspect-ratio

```css
article {
  padding: 1rem;
}

@media screen and (min-device-aspect-ratio: 16/9) {
  article {
    padding: 1rem 5vw;
  }
}
```
