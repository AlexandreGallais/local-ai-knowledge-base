---
title: "AudioDecoder: isConfigSupported() static method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/audiodecoder/isconfigsupported_static/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AudioDecoder: isConfigSupported() static method

The **`isConfigSupported()`** static method of the `AudioDecoder` interface checks if the given config is supported (that is, if `AudioDecoder` objects can be successfully configured with the given config).

## Syntax

```js
AudioDecoder.isConfigSupported(config)
```

### Parameters

- `config`
    The dictionary object accepted by `AudioDecoder.configure`

### Return value

A `Promise` that resolves with an object containing the following members:

- `supported`
    A boolean value which is `true` if the given config is supported by the decoder.
- `config`
    A copy of the given config with all the fields recognized by the decoder.

### Exceptions

- `TypeError`
    Thrown if the provided `config` is invalid; that is, if doesn't have required values (such as an empty `codec` field) or has invalid values (such as a negative `sampleRate`).

## Examples

The following example tests if the browser supports several audio codecs.

```js
const codecs = ["mp4a.40.2", "mp3", "alaw", "ulaw"];
const configs = [];
for (const codec of codecs) {
  configs.push({
    codec,
    sampleRate: 48000,
    numberOfChannels: 1,
    not_supported_field: 123,
  });
}
for (const config of configs) {
  const support = await AudioDecoder.isConfigSupported(config);
  console.log(
    `AudioDecoder's config ${JSON.stringify(support.config)} support: ${
      support.supported
    }`,
  );
}
```
