---
title: "Navigator: getUserMedia() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/navigator/getusermedia/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Navigator: getUserMedia() method

The deprecated **`Navigator.getUserMedia()`** method prompts the user for permission to use up to one video input device (such as a camera or shared screen) and up to one audio input device (such as a microphone) as the source for a `MediaStream`.

If permission is granted, a `MediaStream` whose video and/or audio tracks come from those devices is delivered to the specified success callback.
If permission is denied, no compatible input devices exist, or any other error condition occurs, the error callback is executed with an object describing what went wrong.
If the user instead doesn't make a choice at all, neither callback is executed.

> **Note:**
> This is a legacy method.
> Please use the newer `navigator.mediaDevices.getUserMedia()` instead.
> While technically not deprecated, this old callback version is marked as such, since the specification strongly encourages using the newer promise returning version.

## Syntax

```js
getUserMedia(constraints, successCallback, errorCallback)
```

### Parameters

- `constraints`
    An object specifying the types of media to
    request, along with any requirements for each type. For details, see the constraints
    section under the modern `MediaDevices.getUserMedia()` method, as well
    as the article Capabilities, constraints, and settings.
- `successCallback`
    A function which is invoked when the request for media access is approved. The
    function is called with one parameter: the `MediaStream` object that
    contains the media stream. Your callback can then assign the stream to the desired
    object (such as an `<audio>` or `` element), as
    shown in the following example:

    ```js
    function successCallback(stream) {
      const video = document.querySelector("video");
      video.srcObject = stream;
      video.onloadedmetadata = (e) => {
        // Do something with the video here.
      };
    }
    ```

- `errorCallback`
    When the call fails, the function specified in the `errorCallback` is
    invoked with an object as its sole argument; this
    object is modeled on `DOMException`.

### Return value

None (`undefined`).

## Examples

### Width and height

Here's an example of using `getUserMedia()`, including code to cope with
various browsers' prefixes. Note that this is the deprecated way of doing it: See the
Examples section
under the `MediaDevices.getUserMedia()` for modern examples.

```js
navigator.getUserMedia =
  navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia;

if (navigator.getUserMedia) {
  navigator.getUserMedia(
    { audio: true, video: { width: 1280, height: 720 } },
    (stream) => {
      const video = document.querySelector("video");
      video.srcObject = stream;
      video.onloadedmetadata = (e) => {
        video.play();
      };
    },
    (err) => {
      console.error(`The following error occurred: ${err.name}`);
    },
  );
} else {
  console.log("getUserMedia not supported");
}
```

## See also

- `MediaDevices.getUserMedia()` that replaces this deprecated method.
- WebRTC - the introductory page to the API
- Media Capture and Streams API - the API for the
  media stream objects
- Taking webcam photos - a
  tutorial on using `getUserMedia()` for taking photos rather than video.
