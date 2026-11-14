---
title: "AudioDecoder: configure() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/audiodecoder/configure/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AudioDecoder: configure() method

The **`configure()`** method of the `AudioDecoder` interface enqueues a control message to configure the audio decoder for decoding chunks.

## Syntax

```js
configure(config)
```

### Parameters

- `config`
    A dictionary object containing the following members:
    - `codec`
        A string containing a valid codec string. See "codecs" parameter for details on codec string construction.
    - `sampleRate`
        An integer representing the number of frame samples per second.
    - `numberOfChannels`
        An integer representing the number of audio channels.
    - `description` (optional)
        An `ArrayBuffer`, a `TypedArray`, or a `DataView` containing a sequence of codec specific bytes, commonly known as extradata.

> **Note:**
> The registrations in the WebCodecs Codec Registry link to a specification detailing whether and how to populate the optional `description` member.

### Return value

None (`undefined`).

### Exceptions

- `TypeError`
    Thrown if the provided `config` is invalid.
- `InvalidStateError` `DOMException`
    Thrown if the `state` is `"closed"`.
- `NotSupportedError` `DOMException`
    Thrown if the provided `config` is valid but the user agent cannot provide a codec that can decode this profile.

## Examples

The following example configures the `audioDecoder` with the `opus` codec.

```js
audioDecoder.configure({
  codec: "opus",
  sampleRate: 44100,
  numberOfChannels: 2,
});
```
