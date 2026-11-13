---
title: "MediaMetadata: artwork property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mediametadata/artwork/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MediaMetadata: artwork property

The **`artwork`** property of the
`MediaMetadata` interface returns or sets an array of
objects representing images associated with playing
media.

## Value

An `Array` of objects, each containing the following fields:

- `src`
    The URL from which the user agent fetches the image's data.
- `sizes` (optional)
    Specifies the resource in multiple sizes so the user agent doesn't have to scale a single image. It defaults to the empty string (`""`).
- `type` (optional)
    The MIME type hint for the user agent that allows it to ignore images of types that it doesn't support. However, the user agent may still use MIME type sniffing after downloading the image to determine its type. It defaults to the empty string (`""`).

## Examples

The following example checks for browser compatibility and sets the current metadata
for the media session.

```js
if ("mediaSession" in navigator) {
  navigator.mediaSession.metadata = new MediaMetadata({
    title: "Unforgettable",
    artist: "Nat King Cole",
    album: "The Ultimate Collection (Remastered)",
    artwork: [
      {
        src: "https://dummyimage.com/96x96",
        sizes: "96x96",
        type: "image/png",
      },
      {
        src: "https://dummyimage.com/128x128",
        sizes: "128x128",
        type: "image/png",
      },
      {
        src: "https://dummyimage.com/192x192",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "https://dummyimage.com/256x256",
        sizes: "256x256",
        type: "image/png",
      },
      {
        src: "https://dummyimage.com/384x384",
        sizes: "384x384",
        type: "image/png",
      },
      {
        src: "https://dummyimage.com/512x512",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  });
}
```
