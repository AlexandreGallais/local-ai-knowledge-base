---
title: "MediaDevices: getUserMedia() method (part 2 of 2)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mediadevices/getusermedia/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MediaDevices: getUserMedia() method (part 2 of 2)

## Examples

### Using getUserMedia()

Generally, you will access the `MediaDevices` singleton object using `navigator.mediaDevices`, like this:

```js
async function getMedia(constraints) {
  let stream = null;

  try {
    stream = await navigator.mediaDevices.getUserMedia(constraints);
    /* use the stream */
  } catch (err) {
    /* handle the error */
  }
}
```

Similarly, using the raw promises directly, the code looks like this:

```js
navigator.mediaDevices
  .getUserMedia(constraints)
  .then((stream) => {
    /* use the stream */
  })
  .catch((err) => {
    /* handle the error */
  });
```

> **Note:**
> If the current document isn't loaded securely, `navigator.mediaDevices` will be `undefined`, and you cannot use `getUserMedia()`.
> See Security for more information on this and other security issues related to using `getUserMedia()`.

Below are some examples of the `constraints` parameter.

The following requests both audio and video without any specific requirements:

```js
getUserMedia({
  audio: true,
  video: true,
});
```

While information about a user's cameras and microphones are inaccessible for privacy reasons, an application can request the camera and microphone capabilities it needs and wants, using additional constraints.
The following expresses a preference for 1280x720 camera resolution:

```js
getUserMedia({
  audio: true,
  video: { width: 1280, height: 720 },
});
```

The browser will try to honor the constraints, and will return a matching track if supported by the underlying hardware.
If not supported, the browser may attempt to crop and downscale a higher resolution stream from the underlying hardware in order to match the constraint (and might also reduce the frame rate if that was constrained).
This behavior can be forced by setting the `resizeMode` constraint to `crop-and-scale` (or disabled by setting it to `none`):

```js
getUserMedia({
  audio: true,
  video: { width: 1280, height: 720, resizeMode: "crop-and-scale" },
});
```

The browser may return another resolution if an exact match is not available and the source is not to be scaled.

To _require_ a capability and fail if it is not available, use the keywords `min`, `max`, or `exact` (a.k.a. `min === max`).
The following demands a minimum resolution of 1280x720:

```js
getUserMedia({
  audio: true,
  video: {
    width: { min: 1280 },
    height: { min: 720 },
  },
});
```

If no camera exists with this resolution or higher, then the returned promise will be rejected with `OverconstrainedError`, and the user will not be prompted.

The reason for the difference in behavior is that the keywords `min`, `max`, and `exact` are inherently mandatory — whereas plain values and a keyword called `ideal` are not.
Here's a full example:

```js
getUserMedia({
  audio: true,
  video: {
    width: { min: 1024, ideal: 1280, max: 1920 },
    height: { min: 576, ideal: 720, max: 1080 },
  },
});
```

An `ideal` value, when used, has gravity — which means that the browser will try to find the setting (and camera, if you have more than one), with the smallest fitness distance from the ideal values given.

Plain values are inherently ideal, which means that the first of our resolution examples above could have been written like this:

```js
getUserMedia({
  audio: true,
  video: {
    width: { ideal: 1280 },
    height: { ideal: 720 },
  },
});
```

Not all constraints are numbers.
For example, on mobile devices, the following will prefer the front camera (if one is available) over the rear one:

```js
getUserMedia({
  audio: true,
  video: { facingMode: "user" },
});
```

To _require_ the rear camera, use:

```js
getUserMedia({
  audio: true,
  video: {
    facingMode: { exact: "environment" },
  },
});
```

Another non-number constraint is the `deviceId` constraint.
If you have a `deviceId` from `mediaDevices.enumerateDevices()`, you can use it to request a specific device:

```js
getUserMedia({
  video: {
    deviceId: myPreferredCameraDeviceId,
  },
});
```

The above will return the camera you requested, or a different camera if that specific camera is no longer available.
Browsers' internally-available information, such as user preference, may also override your request.
For example, when the user was asked for camera permissions, the camera they selected may take priority over the one you requested.
Again, to _require_ the specific camera, you would use:

```js
getUserMedia({
  video: {
    deviceId: {
      exact: myExactCameraOrBustDeviceId,
    },
  },
});
```

### Width and height

This example gives a preference for camera resolution, and assigns the resulting `MediaStream` object to a video element.

```js
// Prefer camera resolution nearest to 1280x720.
const constraints = {
  audio: true,
  video: { width: 1280, height: 720 },
};

navigator.mediaDevices
  .getUserMedia(constraints)
  .then((mediaStream) => {
    const video = document.querySelector("video");
    video.srcObject = mediaStream;
    video.onloadedmetadata = () => {
      video.play();
    };
  })
  .catch((err) => {
    // always check for errors at the end.
    console.error(`${err.name}: ${err.message}`);
  });
```

### Frame rate

Lower frame-rates may be desirable in some cases, like WebRTC transmissions with bandwidth restrictions.

```js
const constraints = {
  video: { frameRate: { ideal: 10, max: 15 } },
};
```

### Front and back camera

On mobile phones.

```js
let front = false;
document.getElementById("flip-button").onclick = () => {
  front = !front;
};

const constraints = {
  video: { facingMode: front ? "user" : "environment" },
};
```

> **Note:**
> In certain cases, it may be necessary to release the current camera facing mode before you can switch to a different one.
> To ensure the camera switch, it is advisable to free up the media resources by invoking the "stop()" method on the track before requesting a different facing mode.

## See also

- The older `Navigator.getUserMedia()` legacy API
- `MediaDevices.enumerateDevices()`: Listing available media devices
- `WebRTC API`
- `Media Capture and Streams API`
- `Screen Capture API`: Capturing screen contents as a `MediaStream`
- `MediaDevices.getDisplayMedia()`: Getting a stream containing screen contents
- `Taking webcam photos`: A tutorial on using `getUserMedia()` to take still photos rather than video
