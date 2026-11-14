---
title: "`device-width` CSS media feature"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/at-rules/@media/device-width/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `device-width` CSS media feature

> **Note:**
> To query for the width of the viewport, developers should use the `width` media feature instead.

The **`device-width`** CSS media feature can be used to test the width of an output device's rendering surface.

## Syntax

The `device-width` feature is specified as a `<length>` value. It is a range feature, meaning that you can also use the prefixed **`min-device-width`** and **`max-device-width`** variants to query minimum and maximum values, respectively.

## Examples

### Applying a special stylesheet for devices that are narrower than 800 pixels

```html
<link
  rel="stylesheet"
  media="screen and (max-device-width: 799px)"
  href="https://cdn.example.com/narrow-styles.css" />
```

## See also

- Using Media Queries
- @media
