---
title: "SpeechSynthesisEvent: charLength property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/speechsynthesisevent/charlength/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SpeechSynthesisEvent: charLength property

The read-only **`charLength`** property of the `SpeechSynthesisEvent` interface returns the number of characters left to be spoken after the character at the `charIndex` position.

If the speech engine can't determine it, it returns 0.

## Value

An integer.

## Examples

```js
utterThis.onpause = (event) => {
  const char = event.utterance.text.charAt(event.charIndex);
  const charLeft = event.charLength;
  if (charLeft) {
    console.log(
      `Speech paused. There are still ${charLeft} characters to be spoken.`,
    );
  } else {
    console.log(
      "Speech paused. The underlying speech engine can't tell how many characters are left.",
    );
  }
};
```
