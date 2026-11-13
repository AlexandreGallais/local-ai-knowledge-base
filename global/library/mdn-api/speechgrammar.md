---
title: "SpeechGrammar"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/speechgrammar/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SpeechGrammar

The **`SpeechGrammar`** interface of the Web Speech API represents a set of words or patterns of words for the recognition service to recognize.

Grammar is defined using JSpeech Grammar Format (**JSGF**).

> **Note:**
> The concept of grammar has been removed from the Web Speech API. Related features remain in the specification and are still recognized by supporting browsers for backwards compatibility, but they have no effect on speech recognition services.

## Constructor

- `SpeechGrammar()` (non-standard) (deprecated)
    Creates a new `SpeechGrammar` object.

## Instance properties

- `SpeechGrammar.src` (deprecated)
    Sets and returns a string containing the grammar from within in the `SpeechGrammar` object instance.
- `SpeechGrammar.weight` (optional) (deprecated)
    Sets and returns the weight of the `SpeechGrammar` object.

## Examples

```js
const grammar =
  "#JSGF V1.0; grammar colors; public <color> = aqua | azure | beige | bisque | black | blue | brown | chocolate | coral | crimson | cyan | fuchsia | ghostwhite | gold | goldenrod | gray | green | indigo | ivory | khaki | lavender | lime | linen | magenta | maroon | moccasin | navy | olive | orange | orchid | peru | pink | plum | purple | red | salmon | sienna | silver | snow | tan | teal | thistle | tomato | turquoise | violet | white | yellow ;";
const recognition = new SpeechRecognition();
const speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;

console.log(speechRecognitionList[0].src); // should return the same as the contents of the grammar variable
console.log(speechRecognitionList[0].weight); // should return 1 - the same as the weight set in addFromString.
```

## See also

- Web Speech API
