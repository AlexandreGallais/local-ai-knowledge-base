---
title: "MediaRecorder: MediaRecorder() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mediarecorder/mediarecorder/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MediaRecorder: MediaRecorder() constructor

The **`MediaRecorder()`** constructor creates a new `MediaRecorder` object that will record a specified `MediaStream`.

The object can optionally be configured to record using a specific media container (file type), and, further, can specify the exact codec and codec configuration(s) to use by specifying the `codecs` parameter.

## Syntax

```js
new MediaRecorder(stream)
new MediaRecorder(stream, options)
```

### Parameters

- `stream`
    The `MediaStream` that will be recorded.
    This source media can come from a stream created using `navigator.mediaDevices.getUserMedia()` or from an `<audio>`, `` or `<canvas>` element.
- `options` (optional)
    A dictionary object that can contain the following properties:
    - `mimeType` (optional)
        A MIME type specifying the format for the resulting media; you may specify the container format (the browser will select its preferred codecs for audio and/or video), or you may use the `codecs` parameter and/or the `profiles` parameter to provide detailed information about which codecs to use and how to configure them.
        Applications can check in advance if a `mimeType` is supported by the user agent by calling `MediaRecorder.isTypeSupported()`.
        Defaults to an empty string.
    - `audioBitsPerSecond` (optional)
        The chosen bitrate for the audio component of the media.
    - `videoBitsPerSecond` (optional)
        The chosen bitrate for the video component of the media.
    - `bitsPerSecond` (optional)
        The chosen bitrate for the audio and video components of the media.
        This can be specified instead of the above two properties.
        If this is specified along with one or the other of the above properties, this will be used for the one that isn't specified.
    - `audioBitrateMode` (optional)
        The bitrate mode that should be used to encode the audio.
        Can be `constant`, which indicates that the recorder should encode at a constant bitrate, or `variable`, which indicates that the recorder should encode using a variable bitrate, thus allowing more space to be used for complex signals and less space for less-complex signals.
        Defaults to `variable`.
    - `videoKeyFrameIntervalDuration` (optional)
        The nominal interval in time between key <example-value> in the encoded video stream.
        The user agent controls key-frame generation based on this option and the `videoKeyFrameIntervalCount` option.
    - `videoKeyFrameIntervalCount` (optional)
        The interval in number of frames between key <example-value> in the encoded video stream.
        The user agent controls key-frame generation considering this option as well as `videoKeyFrameIntervalDuration` option.

    > **Note:**
    > If bits per second values are not specified for video and/or audio, the default adopted for video is 2.5Mbps or 10 Mbps, depending on the browser.
    > The audio default is adaptive, depending upon the sample rate and the number of channels.

    > **Note:**
    > Video resolution, frame rate and similar settings are specified as constraints when calling `getUserMedia()`, not here in the MediaStream Recording API.

### Exceptions

- `NotSupportedError` `DOMException`
    Thrown if the specified MIME type is not supported by the user agent.

## Examples

This example shows how to create a media recorder for a specified stream, whose audio bit rate is set to 128 Kbit/sec and whose video bit rate is set to 2.5 Mbit/sec.
The recorded media data will be stored in an MP4 wrapper (so if you gather the chunks of media data and save them to disk, they will be in an MP4 file).

```js
if (navigator.mediaDevices.getUserMedia) {
  const constraints = { audio: true, video: true };
  const chunks = [];

  const onSuccess = (stream) => {
    const options = {
      audioBitsPerSecond: 128000,
      videoBitsPerSecond: 2500000,
      mimeType: "video/mp4",
    };
    const mediaRecorder = new MediaRecorder(stream, options);
    m = mediaRecorder;

    // …
  };
}
```

## See also

- Using the MediaStream Recording API
- Web Dictaphone: MediaRecorder +
  getUserMedia + Web Audio API visualization demo, by Chris Mills (source on GitHub.)
- simpl.info MediaStream Recording demo, by Sam Dutton.
- `MediaDevices.getUserMedia`
- MediaRecorder Video Bitrates
