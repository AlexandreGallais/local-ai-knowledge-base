---
title: "Using the Screen Capture API (part 1 of 2)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/screen_capture_api/using_screen_capture/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Using the Screen Capture API

In this article, we will examine how to use the Screen Capture API and its `getDisplayMedia()` method to capture part or all of a screen for streaming, recording, or sharing during a WebRTC conference session.

> **Note:**
> It may be useful to note that recent versions of the WebRTC adapter.js shim include implementations of `getDisplayMedia()` to enable screen sharing on browsers that support it but do not implement the current standard API. This works with at least Chrome, Edge, and Firefox.

## Capturing screen contents

Capturing screen contents as a live `MediaStream` is initiated by calling `navigator.mediaDevices.getDisplayMedia()`, which returns a promise that resolves to a stream containing the live screen contents. The `displayMediaOptions` object referenced in the below examples might look something like this:

```js
const displayMediaOptions = {
  video: {
    displaySurface: "browser",
  },
  audio: {
    suppressLocalAudioPlayback: false,
  },
  preferCurrentTab: false,
  selfBrowserSurface: "exclude",
  systemAudio: "include",
  surfaceSwitching: "include",
  monitorTypeSurfaces: "include",
};
```

### Starting screen capture: `async`/`await` style

```js
async function startCapture(displayMediaOptions) {
  let captureStream = null;

  try {
    captureStream =
      await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
  } catch (err) {
    console.error(`Error: ${err}`);
  }
  return captureStream;
}
```

You can write this code either using an asynchronous function and the `await` operator, as shown above, or using the `Promise` directly, as seen below.

### Starting screen capture: `Promise` style

```js
function startCapture(displayMediaOptions) {
  return navigator.mediaDevices
    .getDisplayMedia(displayMediaOptions)
    .catch((err) => {
      console.error(err);
      return null;
    });
}
```

Either way, the user agent responds by presenting a user interface that prompts the user to choose the screen area to share. Both of these implementations of `startCapture()` return the `MediaStream` containing the captured display imagery.

See Options and constraints, below, for more on both how to specify the type of surface you want and other ways to adjust the resulting stream.

### Example of a window allowing the user to select a display surface to capture

You can then use the captured stream, `captureStream`, for anything that accepts a stream as input. The examples below show a few ways to make use of the stream.

### Visible vs. logical display surfaces

For the purposes of the Screen Capture API, a **display surface** is any content object that can be selected by the API for sharing purposes. Sharing surfaces include the contents of a browser tab, a complete window, and a monitor (or group of monitors combined together into one surface).

There are two types of display surface. A **visible display surface** is a surface which is entirely visible on the screen, such as the frontmost window or tab, or the entire screen.

A **logical display surface** is one which is in part or completely obscured, either by being overlapped by another object to some extent, or by being entirely hidden or offscreen. How these are handled by the Screen Capture API varies. Generally, the browser will provide an image which obscures the hidden portion of the logical display surface in some way, such as by blurring or replacing with a color or pattern. This is done for security reasons, as the content that cannot be seen by the user may contain data which they do not want to share.

A user agent might allow the capture of the entire content of an obscured window after gaining permission from the user to do so. In this case, the user agent may include the obscured content, either by getting the current contents of the hidden portion of the window or by presenting the most-recently-visible contents if the current contents are not available.

### Options and constraints

The options object passed into `getDisplayMedia()` is used to set options for the resulting stream.

The `video` and `audio` objects passed into the options object can also hold additional constraints particular to those media tracks. See Properties of shared screen tracks for details about additional constraints for configuring a screen-capture stream that are added to `MediaTrackConstraints`, supported constraints returned by `MediaDevices.getSupportedConstraints()`, and current settings returned by `MediaStreamTrack.getSettings()`.

None of the constraints are applied in any way until after the content to capture has been selected. The constraints alter what you see in the resulting stream. For example, if you specify a `width` constraint for the video, it's applied by scaling the video after the user selects the area to share. It doesn't establish a restriction on the size of the source itself.

> **Note:**
> Constraints _never_ cause changes to the list of sources available for capture by the Screen Sharing API. This ensures that web applications can't force the user to share specific content by restricting the source list until only one item is left.

While display capture is in effect, the machine which is sharing screen contents will display some form of indicator so the user is aware that sharing is taking place.

> **Note:**
> For privacy and security reasons, screen sharing sources are not enumerable using `enumerateDevices()`. Related to this, the `devicechange` event is never sent when there are changes to the sources available for `getDisplayMedia()`.

### Capturing shared audio

`getDisplayMedia()` is most commonly used to capture video of a user's screen (or parts thereof). However, user agents may allow the capture of audio along with the video content. The source of this audio might be the selected window, the entire computer's audio system, or the user's microphone (or a combination of all of the above).

Before starting a project that will require sharing of audio, be sure to check the browser compatibility for `getDisplayMedia()` to see if the browsers you wish compatibility with have support for audio in captured screen streams.

To request that the screen be shared with included audio, the options passed into `getDisplayMedia()` might look like this:

```js
const displayMediaOptions = {
  video: true,
  audio: true,
};
```

This allows the user total freedom to select whatever they want, within the limits of what the user agent supports. This could be refined further by specifying additional options, and constraints inside the `audio` and `video` objects:

```js
const displayMediaOptions = {
  video: {
    displaySurface: "window",
  },
  audio: {
    echoCancellation: true,
    noiseSuppression: true,
    sampleRate: 44100,
    suppressLocalAudioPlayback: true,
  },
  surfaceSwitching: "include",
  selfBrowserSurface: "exclude",
  systemAudio: "exclude",
};
```

In this example the display surface captured is to be the whole window. The audio track should ideally have noise suppression and echo cancellation features enabled, as well as an ideal audio sample rate of 44.1kHz, and suppression of local audio playback.

In addition, the app is hinting to the user agent that it should:

- Provide a control during screen sharing to allow the user to dynamically switch the shared tab.
- Hide the current tab from the list of options presented to the user when capture is requested.
- Not include the system audio among the possible audio sources offered to the user.

Capturing audio is always optional, and even when web content requests a stream with both audio and video, the returned `MediaStream` may still have only one video track, with no audio.

## Using the captured stream

The `Promise` returned by `getDisplayMedia()` resolves to a `MediaStream` that contains at least one video stream that contains the screen or screen area, and which is adjusted or filtered based upon the constraints specified when `getDisplayMedia()` was called.

### Potential risks

Privacy and security issues surrounding screen sharing are usually not overly serious, but they do exist. The largest potential issue is users inadvertently sharing content they did not wish to share.

For example, privacy and/or security violations can easily occur if the user is sharing their screen and a visible background window happens to contain personal information, or if their password <example-value> is visible in the shared stream. This effect can be amplified when capturing logical display surfaces, which may contain content that the user doesn't know about at all, let alone see.

User agents which take privacy seriously should obfuscate content that is not actually visible onscreen, unless authorization has been given to share that content specifically.

### Authorizing capture of display contents

Before streaming of captured screen contents can begin, the user agent will ask the user to confirm the sharing request, and to select the content to share.
