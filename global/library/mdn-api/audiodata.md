---
title: "AudioData"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/audiodata/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AudioData

The **`AudioData`** interface of the WebCodecs API represents an audio sample.

`AudioData` is a transferable object.

## Constructor

- `AudioData()`
    Creates a new `AudioData` object.

## Instance properties

- `AudioData.format` (read-only)
    Returns the sample format of the audio.
- `AudioData.sampleRate` (read-only)
    Returns the sample rate of the audio in Hz.
- `AudioData.numberOfFrames` (read-only)
    Returns the number of frames.
- `AudioData.numberOfChannels` (read-only)
    Returns the number of audio channels.
- `AudioData.duration` (read-only)
    Returns the duration of the audio in microseconds.
- `AudioData.timestamp` (read-only)
    Returns the timestamp of the audio in microseconds.

## Instance methods

- `AudioData.allocationSize()`
    Returns the number of bytes required to hold the sample as filtered by options passed into the method.
- `AudioData.copyTo()`
    Copies the samples from the specified plane of the `AudioData` object to the destination.
- `AudioData.clone()`
    Creates a new `AudioData` object with reference to the same media resource as the original.
- `AudioData.close()`
    Clears all states and releases the reference to the media resource.

## Description

An audio track consists of a stream of audio samples, each sample representing a captured moment of sound. An `AudioData` object is a representation of such a sample. Working alongside the interfaces of the Insertable Streams API, you can break a stream into individual `AudioData` objects with `MediaStreamTrackProcessor`, or construct an audio track from a stream of frames with `MediaStreamTrackGenerator`.

> **Note:**
> Find out more about audio on the web in Digital audio concepts.

### The media resource

An `AudioData` object contains a reference to an attached **media resource**. This media resource contains the actual audio sample data described by the object. A media resource is maintained by the user agent until it is no longer referenced by an `AudioData` object, for example when `AudioData.close()` is called.

### Planes and audio format

To return the sample format of an `AudioData` use the `AudioData.format` property. The format may be described as **interleaved** or **planar**. In interleaved formats, the audio samples from the different channels are laid out in a single buffer, described as a **plane**. This plane contains a number of elements equal to `AudioData.numberOfFrames` \* `AudioData.numberOfChannels`.

In planar format, the number of planes is equal to `AudioData.numberOfChannels`, and each plane is a buffer containing a number of elements equal to `AudioData.numberOfFrames`.
