---
title: "`device-height` CSS media feature"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/at-rules/@media/device-height/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `device-height` CSS media feature

> **Note:**
> To query for the height of the viewport, developers should use the `height` media feature instead.

The **`device-height`** CSS media feature can be used to test the height of an output device's rendering surface.

## Syntax

The `device-height` feature is specified as a `<length>` value. It is a range feature, meaning that you can also use the prefixed **`min-device-height`** and **`max-device-height`** variants to query minimum and maximum values, respectively.

## Examples

### Applying a special stylesheet for devices that are shorter than 800 pixels

```html
<link
  rel="stylesheet"
  media="screen and (max-device-height: 799px)"
  href="https://cdn.example.com/short-styles.css" />
```

## See also

- Using Media Queries
- @media
