---
title: "SpeechSynthesisVoice: default property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/speechsynthesisvoice/default/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SpeechSynthesisVoice: default property

The **`default`** read-only property of the
`SpeechSynthesisVoice` interface returns a boolean value
indicating whether the voice is the default voice for the current app
(`true`), or not (`false`.)

> **Note:**
> For some devices, it might be the default voice for the
> voice's language. The spec is not very clear on which it should be, so some
> implementations may differ.

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

  option.setAttribute("data-lang", voice.lang);
  option.setAttribute("data-name", voice.name);
  voiceSelect.appendChild(option);
}
```

## See also

- Web Speech API
