---
title: "Using the WebCodecs API (part 2 of 2)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webcodecs_api/using_the_webcodecs_api/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Using the WebCodecs API (part 2 of 2)

## Audio

WebCodecs supports encoding and decoding audio via `AudioEncoder` and `AudioDecoder`, using the Opus and AAC codecs. Before working with audio, there are a few important caveats to be aware of:

- **Pass-through**: If you are transcoding video and do not need to modify the audio, you do not need to decode and re-encode the audio at all. `EncodedAudioChunk` objects can be passed directly from a demuxing library to a muxing library, which is significantly more efficient.
- **Playback**: The WebCodecs API has no built-in audio playback. For playback, use the Web Audio API.
- **Format support**: WebCodecs only supports encoding Opus and AAC. For MP3 or other formats, a third-party library is required.

### Playback

There is no direct bridge between WebCodecs and the Web Audio API. `AudioData` objects cannot be passed directly to the Web Audio API, which uses `AudioBuffer` to represent raw audio.

The recommended approach for playback is to mux `EncodedAudioChunk` objects into an in-memory buffer using a muxing library, then decode that buffer via `AudioContext.decodeAudioData()`:

```js
// mux encoded chunks to an ArrayBuffer using a muxing library
const buffer = await muxAudioToBuffer(encodedChunks);
const audioBuffer = await audioContext.decodeAudioData(buffer);
const source = audioContext.createBufferSource();
source.buffer = audioBuffer;
source.connect(audioContext.destination);
source.start();
```

Alternatively, you can extract raw samples from `AudioData` via `copyTo()` and construct an `AudioBuffer` manually, but this requires a CPU-side data copy for each chunk and is slower.

### Encoding

Audio encoding is simpler than video encoding — there are no key <example-value>, no hardware acceleration concerns, and each `AudioData` produces exactly one `EncodedAudioChunk`. The encoder can be treated as a straightforward async pipeline.

```js
const encoder = new AudioEncoder({
  output(chunk) {
    // send to muxer
  },
  error(e) {
    console.error(e);
  },
});

encoder.configure({
  codec: "opus",
  sampleRate: 48000,
  numberOfChannels: 2,
});

for (const audioData of rawAudio) {
  encoder.encode(audioData);
  audioData.close();
}

await encoder.flush();
```

See the Codec selection guide for guidance on choosing between Opus and AAC.

### Decoding

Audio decoding follows the same pattern as encoding. The decoder configuration is typically provided by the demuxing library rather than chosen by the developer.

```js
const decoder = new AudioDecoder({
  output(audioData) {
    // process AudioData
    audioData.close();
  },
  error(e) {
    console.error(e);
  },
});

// config comes from demuxer library
decoder.configure(decoderConfig);

for (const chunk of encodedChunks) {
  decoder.decode(chunk);
}

await decoder.flush();
```

### AudioData

An `AudioData` object represents a segment of raw audio, typically covering 0.2–0.5 seconds. Raw samples are extracted as `Float32Array` data using the `AudioData.copyTo()` method. The extraction pattern depends on the `format` property of the `AudioData` object.

The most common format is `f32-planar`, where each channel is stored in a separate plane. Use `planeIndex` to copy each channel independently:

```js
// f32-planar: each channel stored separately
const leftChannel = new Float32Array(audioData.numberOfFrames);
audioData.copyTo(leftChannel, { planeIndex: 0 });

const rightChannel = new Float32Array(audioData.numberOfFrames);
audioData.copyTo(rightChannel, { planeIndex: 1 });
```

The less common `f32` format stores all channels interleaved in a single array (`[L, R, L, R, ...]`). In this case, copy the full interleaved buffer and de-interleave manually:

```js
// f32: channels interleaved in a single array
const interleaved = new Float32Array(
  audioData.numberOfFrames * audioData.numberOfChannels,
);
audioData.copyTo(interleaved, { planeIndex: 0 });

const leftChannel = new Float32Array(audioData.numberOfFrames);
const rightChannel = new Float32Array(audioData.numberOfFrames);

for (let i = 0; i < audioData.numberOfFrames; i++) {
  leftChannel[i] = interleaved[i * 2];
  rightChannel[i] = interleaved[i * 2 + 1];
}
```

To handle both formats:

```js
if (audioData.format.includes("planar")) {
  // f32-planar: copy each channel by planeIndex
} else {
  // f32: copy interleaved, then de-interleave
}
```

To construct an `AudioData` from raw samples, the data for all channels must be concatenated into a single `Float32Array` with each channel's samples placed sequentially (matching `f32-planar` layout), and the `numberOfFrames` set to the number of samples per channel:

```js
const framesPerChunk = 1024;
const data = new Float32Array(framesPerChunk * 2); // 2 channels
data.set(leftChannel, 0);
data.set(rightChannel, framesPerChunk);

const audioData = new AudioData({
  format: "f32-planar",
  sampleRate: 48000,
  numberOfFrames: framesPerChunk,
  numberOfChannels: 2,
  timestamp: sourceAudioData.timestamp,
  data,
});
```

Note that certain AAC codec strings (`mp4a.40.5`, `mp4a.40.05` and `mp4a.40.29`) correspond to configurations that use a technique called Spectral Band Replication (SBR), which causes the decoder to output audio at double the sample rate specified in the decoder configuration. Always read `audioData.sampleRate` directly rather than assuming it matches the configured value.

Like `VideoFrame`, `AudioData` objects must be explicitly closed to free memory:

```js
audioData.close();
```

While `AudioData` requires much less memory than a `VideoFrame`, raw audio still has a significant memory footprint — an hour of stereo audio at 48kHz is approximately 1.4 GB. For large files, audio should be decoded and processed in batches rather than all at once.

## See also

- Video processing concepts
- Codec selection
- `VideoEncoder`
- `VideoDecoder`
- `AudioEncoder`
- `AudioDecoder`
- `VideoFrame`
- `AudioData`
- `EncodedVideoChunk`
- `EncodedAudioChunk`
