---
title: "MediaRecorder: isTypeSupported() static method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mediarecorder/istypesupported_static/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MediaRecorder: isTypeSupported() static method

The **`isTypeSupported()`** static method of the `MediaRecorder` interface returns a `Boolean` which is `true` if the MIME media type specified is one the user agent should be able to successfully record.

## Syntax

```js
MediaRecorder.isTypeSupported(mimeType)
```

### Parameters

- `mimeType`
    The MIME media type to check.

### Return value

A `Boolean`, `true` if the `MediaRecorder` implementation is capable of recording `Blob` objects for the specified MIME type.
Recording may still fail if there are insufficient resources to support the recording and encoding process.
If the value is `false`, the user agent is incapable of recording the specified format.

## Examples

```js
const types = [
  "video/webm",
  "audio/webm",
  "video/webm;codecs=vp8",
  "video/webm;codecs=daala",
  "video/webm;codecs=h264",
  "audio/webm;codecs=opus",
  "video/mp4",
  "video/mp4;codecs=avc1.64003E,mp4a.40.2",
  "video/mp4;codecs=avc1.64003E,opus",
  "video/mp4;codecs=avc3.64003E,mp4a.40.2",
  "video/mp4;codecs=avc3.64003E,opus",
  "video/mp4;codecs=hvc1.1.6.L186.B0,mp4a.40.2",
  "video/mp4;codecs=hvc1.1.6.L186.B0,opus",
  "video/mp4;codecs=hev1.1.6.L186.B0,mp4a.40.2",
  "video/mp4;codecs=hev1.1.6.L186.B0,opus",
  "video/mp4;codecs=av01.0.19M.08,mp4a.40.2",
  "video/mp4;codecs=av01.0.19M.08,opus",
];

for (const type of types) {
  console.log(
    `Is ${type} supported? ${
      MediaRecorder.isTypeSupported(type) ? "Yes!" : "Nope :("
    }`,
  );
}
```

## See also

- MediaStream Recording API
- Using the MediaStream Recording API
- Guide to media types and formats on the web
- Codecs in common media types
- `MediaStreamTrack`
- `MediaStream`
- `MediaCapabilities`
