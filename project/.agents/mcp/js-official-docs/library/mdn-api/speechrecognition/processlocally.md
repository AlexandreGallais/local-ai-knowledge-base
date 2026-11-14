---
title: "SpeechRecognition: processLocally property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/speechrecognition/processlocally/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SpeechRecognition: processLocally property

The **`processLocally`** property of the
`SpeechRecognition` interface specifies whether speech recognition must be performed locally on the user's device.

See On-device speech recognition for more information.

## Value

A boolean value.

- If set to `true`, speech recognition done via the `SpeechRecognition` object must be done locally.
- If set to `false` (the default), the user agent can choose whether to do the processing locally or remotely.

## Examples

### Basic usage

The following code creates a new `SpeechRecognition` object instance using the `SpeechRecognition()` constructor, then specifies that it should use local processing by setting `processLocally` to `true`:

```js
const recognition = new SpeechRecognition();
recognition.processLocally = true;
```

This code is excerpted from our on-device speech color changer (run the demo live). See Using the Web Speech API for a full explanation.

## See also

- Web Speech API
