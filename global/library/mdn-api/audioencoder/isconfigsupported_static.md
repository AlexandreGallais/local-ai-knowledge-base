---
title: "AudioEncoder: isConfigSupported() static method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/audioencoder/isconfigsupported_static/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AudioEncoder: isConfigSupported() static method

The **`isConfigSupported()`** static method of the `AudioEncoder` interface checks if the given config is supported (that is, if `AudioEncoder` objects can be successfully configured with the given config).

## Syntax

```js
AudioEncoder.isConfigSupported(config)
```

### Parameters

- `config`
    The dictionary object accepted by `AudioEncoder.configure`

### Return value

A `Promise` that resolves with an object containing the following members:

- `supported`
    A boolean value which is `true` if the given config is supported by the encoder.
- `config`
    A copy of the given config with all the fields recognized by the encoder.

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
  const support = await AudioEncoder.isConfigSupported(config);
  console.log(
    `AudioEncoder's config ${JSON.stringify(support.config)} support: ${
      support.supported
    }`,
  );
}
```
