---
title: "Screen Capture API"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/screen_capture_api/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Screen Capture API

The Screen Capture API introduces additions to the existing Media Capture and Streams API to let the user select a screen or portion of a screen (such as a window) to capture as a media stream. This stream can then be recorded or shared with others over the network.

## Screen Capture API concepts and usage

The Screen Capture API is relatively simple to use. Its main method is `MediaDevices.getDisplayMedia()`, whose job is to ask the user to select a screen or portion of a screen to capture in the form of a `MediaStream`.

To start capturing video from the screen, you call `getDisplayMedia()` on `navigator.mediaDevices`:

```js
captureStream =
  await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
```

The `Promise` returned by `getDisplayMedia()` resolves to a `MediaStream` which streams the captured display surface.

See the article Using the Screen Capture API for a more in-depth look at how to use the API to capture screen contents as a stream.

### Screen capture extensions

The Screen Capture API has additional features that extend its capabilities:

#### Limiting the screen area captured in the stream

- The **Element Capture API** restricts the captured region to a specified rendered DOM element and its descendants.
- The **Region Capture API** crops the captured region to the area of the screen in which a specified DOM element is rendered.

See Using the Element Capture and Region Capture APIs to learn more.

#### Controlling the captured screen area

The **Captured Surface Control API** allows the capturing application to provide limited control over the captured display surface, for example zooming and scrolling its contents.

See Using the Captured Surface Control API to learn more.

## Interfaces

- `BrowserCaptureMediaStreamTrack`
    Represents a single video track; extends the `MediaStreamTrack` class with methods to limit the part of a self-capture stream (for example, a user's screen or window) that is captured.
- `CaptureController`
    Provides methods that can be used to further manipulate a captured display surface (captured via `MediaDevices.getDisplayMedia()`). A `CaptureController` object is associated with a captured display surface by passing it into a `getDisplayMedia()` call as the value of the options object's `controller` property.
- `CropTarget`
    Provides a static method, `fromElement()`, which returns a `CropTarget` instance that can be used to crop a captured video track to the area in which a specified element is rendered.
- `RestrictionTarget`
    Provides a static method, `fromElement()`, which returns a `RestrictionTarget` instance that can be used to restrict a captured video track to a specified DOM element.

## Additions to the MediaDevices interface

- `MediaDevices.getDisplayMedia()`
    The `getDisplayMedia()` method is added to the `MediaDevices` interface. Similar to `getUserMedia()`, this method creates a promise that resolves with a `MediaStream` containing the display area selected by the user, in a format that matches the specified options.

## Additions to existing dictionaries

The Screen Capture API adds properties to the following dictionaries defined by other specifications.

### MediaTrackConstraints

- `MediaTrackConstraints.displaySurface`
    A `ConstrainDOMString` indicating what type of display surface is to be captured. The value is one of `browser`, `monitor`, or `window`.
- `MediaTrackConstraints.logicalSurface`
    Indicates whether or not the video in the stream represents a logical display surface (that is, one which may not be entirely visible onscreen, or may be completely offscreen). A value of `true` indicates a logical display surface is to be captured.
- `MediaTrackConstraints.suppressLocalAudioPlayback`
    Controls whether the audio playing in a tab will continue to be played out of a user's local speakers when the tab is captured, or whether it will be suppressed. A value of `true` indicates that it will be suppressed.

### MediaStreamTrack.getSettings()

There are additional properties in the object returned by `MediaStreamTrack.getSettings()`.

- `cursor`
    A string which indicates whether or not the display surface currently being captured includes the mouse cursor, and if so, whether it's only visible while the mouse is in motion or if it's always visible. The value is one of `always`, `motion`, or `never`.
- `displaySurface`
    A string indicating what type of display surface is currently being captured. The value is one of `browser`, `monitor`, or `window`.
- `logicalSurface`
    A boolean value, which is `true` if the video being captured doesn't directly correspond to a single onscreen display area.
- `suppressLocalAudioPlayback`
    A boolean value, which is `true` if the audio being captured is not played out of the user's local speakers.
- `screenPixelRatio`
    A number representing the ratio of the physical size of a pixel on the captured display surface (displayed at its physical resolution) to the logical size of a CSS pixel on the capturing screen (displayed at its logical resolution). It cannot be used as a constraint or capability.

### MediaDevices.getSupportedConstraints()

There are three additional properties in the object returned by `MediaDevices.getSupportedConstraints()`.

- `displaySurface`
    A boolean, which is `true` if the current environment supports the `MediaTrackConstraints.displaySurface` constraint.
- `logicalSurface`
    A boolean, which is `true` if the current environment supports the constraint `MediaTrackConstraints.logicalSurface`.
- `suppressLocalAudioPlayback`
    A boolean, which is `true` if the current environment supports the constraint `MediaTrackConstraints.suppressLocalAudioPlayback`.

## Security considerations

Websites that support Permissions Policy (either using the HTTP `Permissions-Policy` header or the `` attribute `allow`) can specify a desire to use the Screen Capture API using the directive `display-capture`:

```html
<iframe allow="display-capture" src="/some-other-document.html">…</iframe>
```

A site can also specify a desire to use the Captured Surface Control API via the `captured-surface-control` directive. Specifically, the `forwardWheel()`, `increaseZoomLevel()`, `decreaseZoomLevel()`, and `resetZoomLevel()` methods are controlled by this directive.

The default allowlist for both directives is `self`, which permits any content within the same origin use Screen Capture.

These methods are considered _powerful features_, which means that even if permission is allowed via a `Permissions-Policy`, the user will still be prompted for permission to use them. The Permissions API can be used to query the aggregate permission (from both the website and the user) for using the listed features.

In addition, the specification requires that a user has recently interacted with the page to use these features — this means that transient activation is required. See the individual method pages for more details.

## See also

- Using the Screen Capture API
- Using the Element Capture and Region Capture APIs
- Using the Captured Surface Control API
- `MediaDevices.getDisplayMedia()`
