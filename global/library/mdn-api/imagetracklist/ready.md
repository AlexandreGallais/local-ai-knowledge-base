---
title: "ImageTrackList: ready property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/imagetracklist/ready/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ImageTrackList: ready property

The **`ready`** property of the `ImageTrackList` interface returns a `Promise` that resolves when the `ImageTrackList` is populated with `tracks`.

## Value

A `Promise` that resolves with `undefined`.

## Examples

The following example prints the value of `ready` to the console, this will be `undefined` once the promise resolves.

```js
let tracks = imageDecoder.tracks;
let ready = await tracks.ready;
console.log(ready);
```
