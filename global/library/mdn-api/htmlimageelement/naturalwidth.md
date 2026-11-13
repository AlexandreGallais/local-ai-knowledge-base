---
title: "HTMLImageElement: naturalWidth property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlimageelement/naturalwidth/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLImageElement: naturalWidth property

The read-only **`naturalWidth`** property of the `HTMLImageElement` interface returns the intrinsic (natural), density-corrected width of the image in CSS pixels.

This is the width the image is if drawn with nothing constraining its width; if you neither specify a width for the image nor place the image inside a container that limits or expressly specifies the image width, it will be rendered this wide.

> **Note:**
> Most of the time the natural width is the actual width of the image sent by the server. Nevertheless, browsers can modify an image before pushing it to the renderer. For example, Chrome degrades the resolution of images on low-end devices. In such cases, `naturalWidth` will consider the width of the image modified by such browser interventions as the natural width, and returns this value.

## Value

An integer value indicating the intrinsic width of the image, in CSS pixels. This is the width at which the image is naturally drawn when no constraint or specific value is established for the image. This natural width is corrected for the pixel density of the device on which it's being presented, unlike `width`.

If the intrinsic width is not available—either because the image does not specify an intrinsic width or because the image data is not available in order to obtain this information, `naturalWidth` returns 0.

## Examples

See `HTMLImageElement.naturalHeight` for example code that displays an image in both its natural "density-adjusted" size, and in its rendered size as altered by the page's CSS and other factors.

## See also

- `HTMLImageElement.width`
- `HTMLImageElement.naturalHeight`
