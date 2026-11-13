---
title: "BrowserCaptureMediaStreamTrack"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/browsercapturemediastreamtrack/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# BrowserCaptureMediaStreamTrack

The **`BrowserCaptureMediaStreamTrack`** interface of the `Screen Capture API` represents a single video track. It extends the `MediaStreamTrack` class with methods to limit the part of a self-capture stream (for example, a user's screen or window) that is captured.

## Instance methods

- `clone()` (experimental)
    Returns an uncropped, unrestricted clone of the original `BrowserCaptureMediaStreamTrack`.
- `cropTo()` (experimental)
    Crops a self-capture stream to the area in which a specified DOM element is rendered.
- `restrictTo()` (experimental)
    Restricts a self-capture stream to a specific DOM element.

## Examples

See Using the Element Capture and Region Capture APIs for in-context example code.

## See also

- Screen Capture API
- Using the Element Capture and Region Capture APIs
