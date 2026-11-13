---
title: "MediaMetadata: MediaMetadata() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mediametadata/mediametadata/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MediaMetadata: MediaMetadata() constructor

The **`MediaMetadata()`** constructor creates a new
`MediaMetadata` object.

## Syntax

```js
new MediaMetadata()
new MediaMetadata(metadata)
```

### Parameters

- `metadata` (optional)
    The metadata parameters are as follows:
    - `album` (optional)
        The name of the album, or collection, containing the media to be played. It defaults to the empty string (`""`).
    - `artist` (optional)
        The name of the artist, group, or creator, of the media to be played. It defaults to the empty string (`""`).
    - `artwork` (optional)
        An `Array` of objects that represent images associated with the playing media that defaults to be an empty array. The object structure is:
        - `src`
            The URL from which the user agent fetches the image's data.
        - `sizes` (optional)
            Specifies the resource in multiple sizes so the user agent doesn't have to scale a single image. It defaults to the empty string (`""`).
        - `type` (optional)
            The MIME type hint for the user agent that allows it to ignore images of types that it doesn't support. However, the user agent may still use MIME type sniffing after downloading the image to determine its type. It defaults to the empty string (`""`).
    - `chapterInfo` (optional)
        An array of `ChapterInformation` object instances representing the chapter information metadata associated with the media. The object structure is:
        - `artwork` (optional)
            An `Array` of `artwork` objects (see above) representing images associated with the chapter. If omitted, `artwork` defaults to an empty array.
        - `startTime` (optional)
            A number representing the chapter's start time in seconds. If omitted, `startTime` defaults to `0`.
        - `title` (optional)
            A string representing the title of the chapter. If omitted, `title` defaults to the empty string (`""`).
    - `title` (optional)
        The title of the media to be played. It defaults to the empty string (`""`).

## Example

The following example creates a new `MediaMetadata` object using the
correct format of metadata.

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
