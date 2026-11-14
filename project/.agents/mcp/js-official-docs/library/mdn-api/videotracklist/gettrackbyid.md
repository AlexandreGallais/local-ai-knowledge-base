---
title: "VideoTrackList: getTrackById() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/videotracklist/gettrackbyid/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# VideoTrackList: getTrackById() method

The **`VideoTrackList`** method
**`getTrackById()`** returns the first
`VideoTrack` object from the track list whose `id` matches the specified string.

This lets you find a specified track if
you know its ID string.

## Syntax

```js
getTrackById(id)
```

### Parameters

- `id`
    A string indicating the ID of the track to locate within the track
    list.

### Return value

A `VideoTrack` object indicating the first track found within the
`VideoTrackList` whose `id` matches the specified string. If no
match is found, this method returns `null`.

The tracks are searched in their natural order; that is, in the order defined by the
media resource itself, or, if the resource doesn't define an order, the relative order
in which the tracks are declared by the media resource.
