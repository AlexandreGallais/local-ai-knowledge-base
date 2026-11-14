---
title: "SpeechSynthesisVoice: localService property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/speechsynthesisvoice/localservice/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SpeechSynthesisVoice: localService property

The **`localService`** read-only property of the
`SpeechSynthesisVoice` interface returns a boolean value
indicating whether the voice is supplied by a local speech synthesizer service
(`true`), or a remote speech synthesizer service (`false`.)

This property is provided to allow differentiation in the case that some voice options
are provided by a remote service; it is possible that remote voices might have extra
latency, bandwidth or cost associated with them, so such distinction may be useful.

## Value

A boolean value.

## Examples

```js
for (const voice of voices) {
  const option = document.createElement("option");
  option.textContent = `${voice.name} (${voice.lang})`;

  if (voice.default) {
    option.textContent += " — DEFAULT";
  }

  console.log(voice.localService);

  option.setAttribute("data-lang", voice.lang);
  option.setAttribute("data-name", voice.name);
  voiceSelect.appendChild(option);
}
```

## See also

- Web Speech API
