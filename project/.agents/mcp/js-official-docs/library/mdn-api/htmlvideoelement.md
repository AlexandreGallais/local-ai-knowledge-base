---
title: "HTMLVideoElement"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlvideoelement/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLVideoElement

Implemented by the `` element, the **`HTMLVideoElement`** interface provides special properties and methods for manipulating video objects. It also inherits properties and methods of `HTMLMediaElement` and `HTMLElement`.

The list of supported media formats varies from one browser to the other. You should either provide your video in a single format that all the relevant browsers supports, or provide multiple video sources in enough different formats that all the browsers you need to support are covered.

## Instance properties

_Inherits properties from its parent interface, `HTMLMediaElement`, and `HTMLElement`._

- `HTMLVideoElement.disablePictureInPicture`
    Indicates if the user agent should suggest the picture-in-picture to users, or not.
- `HTMLVideoElement.height`
    A string that reflects the `height` HTML attribute, which specifies the height of the display area, in CSS pixels.
- `HTMLVideoElement.poster`
    A string that reflects the `poster` HTML attribute, which specifies an image to show while no video data is available.
- `HTMLVideoElement.videoHeight` (read-only)
    Returns an unsigned integer value indicating the intrinsic height of the resource in CSS pixels, or 0 if no media is available yet.
- `HTMLVideoElement.videoWidth` (read-only)
    Returns an unsigned integer value indicating the intrinsic width of the resource in CSS pixels, or 0 if no media is available yet.
- `HTMLVideoElement.width`
    A string that reflects the `width` HTML attribute, which specifies the width of the display area, in CSS pixels.

### Firefox-specific properties

- `HTMLVideoElement.mozParsedFrames` (non-standard) (read-only) (deprecated)
    Returns an `unsigned long` with the count of video frames that have been parsed from the media resource.
- `HTMLVideoElement.mozDecodedFrames` (non-standard) (read-only) (deprecated)
    Returns an `unsigned long` with the count of parsed video frames that have been decoded into images.
- `HTMLVideoElement.mozPresentedFrames` (non-standard) (read-only) (deprecated)
    Returns an `unsigned long` with the count of decoded frames that have been presented to the rendering pipeline for painting.
- `HTMLVideoElement.mozPaintedFrames` (non-standard) (read-only) (deprecated)
    Returns an `unsigned long` with the count of presented frames which were painted on the screen.
- `HTMLVideoElement.mozFrameDelay` (non-standard) (read-only) (deprecated)
    Returns a `double` with the time which the last painted video frame was late by, in seconds.
- `HTMLVideoElement.mozHasAudio` (non-standard) (read-only) (deprecated)
    Returns a boolean indicating if there is some audio associated with the video.

## Instance methods

_Inherits methods from its parent interface, `HTMLMediaElement`, and `HTMLElement`._

- `HTMLVideoElement.cancelVideoFrameCallback()`
    Cancels a previously-registered video frame callback (see `requestVideoFrameCallback()`).
- `HTMLVideoElement.getVideoPlaybackQuality()`
    Returns a `VideoPlaybackQuality` object that contains the current playback metrics. This information includes things like the number of dropped or corrupted frames, as well as the total number of frames.
- `HTMLVideoElement.requestPictureInPicture()`
    Requests that the user agent enters the video into picture-in-picture mode.
- `HTMLVideoElement.requestVideoFrameCallback()`
    Registers a callback function that runs when a new video frame is sent to the compositor. This enables developers to perform efficient operations on each video frame.

## Events

_Inherits events from its parent interface, `HTMLMediaElement`, and `HTMLElement`._

Listen to these events using `addEventListener()` or by assigning an event listener to the `oneventname` property of this interface.

- `enterpictureinpicture`
    Fired when the `HTMLVideoElement` enters picture-in-picture mode successfully.
- `leavepictureinpicture`
    Fired when the `HTMLVideoElement` leaves picture-in-picture mode successfully.
- `resize`
    Fires when one or both of the `videoWidth` and `videoHeight` properties have just been updated.

## See also

- HTML element implementing this interface: ``.
- Supported media formats
