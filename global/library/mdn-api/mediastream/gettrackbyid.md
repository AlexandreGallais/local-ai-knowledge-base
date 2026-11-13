---
title: "MediaStream: getTrackById() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mediastream/gettrackbyid/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MediaStream: getTrackById() method

The **`getTrackById()`** method of the `MediaStream` interface
returns a `MediaStreamTrack` object representing the track with the specified ID
string. If there is no track with the specified ID, this method returns `null`.

## Syntax

```js
getTrackById(id)
```

### Parameters

- `id`
    A string which identifies the track to be returned.

### Return value

If a track is found for which `MediaStreamTrack.id` matches the specified
`id` string, that `MediaStreamTrack` object is returned.
Otherwise, the returned value is `null`.

## Examples

This example activates a commentary track on a video by ducking the audio level of the main audio track to 50%, then enabling the commentary track.

The example assumes that the IDs of the two tracks are known (for example, from a previous call to `MediaStreamTrack.id`). In a real application, you might store these IDs when you first obtain the stream, because they are randomly generated in the browser.

```js
const primaryAudioTrack = stream.getTrackById(
  "69f8520f-d94e-43f0-8a7c-77b1774f3b8f",
);
const commentaryTrack = stream.getTrackById(
  "b5410643-2549-491e-b0f7-f08a4ebe54b8",
);

primaryAudioTrack.applyConstraints({ volume: 0.5 });
commentaryTrack.enabled = true;
```

## See also

- `MediaStream`
- `MediaStreamTrack.id`
