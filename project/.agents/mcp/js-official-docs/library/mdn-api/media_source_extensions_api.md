---
title: "Media Source API"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/media_source_extensions_api/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Media Source API

The **Media Source API**, formally known as **Media Source Extensions** (**MSE**), provides functionality enabling plugin-free web-based streaming media. Using MSE, media streams can be created via JavaScript, and played using `<audio>` and `` elements.

## Concepts and usage

Playing video and audio has been available in web applications without plugins for a few years now, but the basic <example-value> offered have really only been useful for playing single whole tracks. We can't, for example, combine/split arraybuffers. Streaming media has up until recently been the domain of Flash, with technologies like Flash Media Server serving video streams using the RTMP protocol.

### The MSE standard

With Media Source Extensions (MSE), this is changing. MSE allows us to replace the usual single progressive `src` URI fed to media elements with a reference to a `MediaSource` object, which is a container for information like the ready state of the media for being played, and references to multiple `SourceBuffer` objects that represent the different chunks of media that make up the entire stream. MSE gives us finer-grained control over how much and how often content is fetched, and some control over memory usage details, such as when buffers are evicted. It lays the groundwork for adaptive bitrate streaming clients (such as those using DASH or HLS) to be built on its extensible API.

Creating assets that work with MSE in modern browsers is a laborious process, taking significant time, computing power, and energy. The usage of external utilities to massage the content into a suitable format is required. While browser support for the various media containers with MSE is spotty, usage of the H.264 video codec, AAC audio codec, and MP4 container format is a common baseline. MSE also provides an API for runtime detection of container and codec support.

If you do not require explicit control of video quality over time, the rate at which content is fetched, or the rate at which memory is evicted, then the `` and `` tags may well be a simple and adequate solution.

### DASH

Dynamic Adaptive Streaming over HTTP (DASH) is a protocol for specifying how adaptive content should be fetched. It is effectively a layer built on top of MSE for building adaptive bitrate streaming clients. While there are other protocols available (such as HTTP Live Streaming (HLS)), DASH has the most platform support.

DASH moves lots of logic out of the network protocol and into the client-side application logic, using the simpler HTTP protocol to fetch files. Indeed, one can support DASH with a simple static file server, which is also great for CDNs. This is in direct contrast with previous streaming solutions that required expensive licenses for proprietary non-standard client/server protocol implementations.

The two most common use cases for DASH involve watching content "on demand" or "live." On demand allows a developer to take their time transcoding the assets into multiple resolutions of various quality.

Live profile content can introduce latency due to its transcoding and broadcasting, so DASH is not suitable for real-time communication like WebRTC is. It can however support significantly more client connections than WebRTC.

There are numerous available free and open-source tools for transcoding content and preparing it for use with DASH, DASH file servers, and DASH client libraries written in JavaScript. The DASH Adaptive Streaming for HTML video article provides an example of how to use DASH with MSE.

### Availability in workers

Starting with Chrome 108, MSE features are available in dedicated `web workers`, which allows for improved performance when manipulating `MediaSource`s and `SourceBuffer`s. To play back the media, the `MediaSource.handle` property is used to get a reference to a `MediaSourceHandle` object, a proxy for the `MediaSource` that can be transferred back to the main thread and attached to a media element via its `HTMLMediaElement.srcObject` property.

See MSE-in-Workers Demo by Matt Wolenetz for a live example.

## Interfaces

- `MediaSource`
    Represents a media source to be played via an `HTMLMediaElement` object.
- `MediaSourceHandle`
    A proxy for a `MediaSource` that can be transferred from a dedicated worker back to the main thread and attached to a media element via its `HTMLMediaElement.srcObject` property.
- `SourceBuffer`
    Represents a chunk of media to be passed into an `HTMLMediaElement` via a `MediaSource` object.
- `SourceBufferList`
    A simple container list for multiple `SourceBuffer` objects.
- `ManagedMediaSource`
    A `MediaSource` that actively manages its memory content. Unlike a regular `MediaSource`, a `ManagedMediaSource` can evict content from its source buffers at any time for reasons such as memory or hardware limitations.
- `ManagedSourceBuffer`
    A `SourceBuffer` created by a `ManagedMediaSource`. Fires `bufferedchange` events to notify the application when buffered ranges are modified, including when the user agent evicts content.
- `BufferedChangeEvent`
    The event object for the `bufferedchange` event, which contains `TimeRanges` representing the added and removed buffered ranges.
- `VideoPlaybackQuality`
    Contains information about the quality of video being played by a `` element, such as number of dropped or corrupted frames. Returned by the `HTMLVideoElement.getVideoPlaybackQuality()` method.

### Extensions to other interfaces

- `HTMLMediaElement.buffered`
    Returns a `TimeRanges` object that indicates the ranges of the media source that the browser has buffered (if any) at the moment the `buffered` property is accessed.
- `HTMLMediaElement.seekable`
    Returns a `TimeRanges` object that contains the time ranges that the user is able to seek to, if any.
- `HTMLMediaElement.srcObject`
    A media provider object representing the media resource to play or that has played in the current `HTMLMediaElement`, or `null` if not assigned.
- `HTMLVideoElement.getVideoPlaybackQuality()`
    Returns a `VideoPlaybackQuality` object for the currently played video.
- `AudioTrack.sourceBuffer`, `VideoTrack.sourceBuffer`, `TextTrack.sourceBuffer`
    Returns the `SourceBuffer` that created the track in question.

## See also

- Transcoding assets for Media Source Extensions
- Using MSE to create a basic <example-value> service (TBD)
- Using MPEG DASH to create a streaming application (TBD)
- The `<audio>` and `` elements.
- `HTMLMediaElement`, `HTMLVideoElement`, `HTMLAudioElement`.
