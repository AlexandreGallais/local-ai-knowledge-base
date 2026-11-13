---
title: "SpeechGrammarList: addFromString() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/speechgrammarlist/addfromstring/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SpeechGrammarList: addFromString() method

The **`addFromString()`** method of the
`SpeechGrammarList` interface takes a grammar present in a specific
string within the code base (e.g., stored in a variable) and adds it to
the `SpeechGrammarList` as a new `SpeechGrammar` object.

## Syntax

```js
addFromString(string)
addFromString(string, weight)
```

### Parameters

- `string`
    A string representing the grammar to be added.
- `weight` (optional)
    A float representing the weight of the grammar relative to other grammars present in
    the `SpeechGrammarList`. The weight means the importance of this grammar,
    or the likelihood that it will be recognized by the speech recognition service. The
    value can be between `0.0` and `1.0`; If not specified, the
    default used is `1.0`.

### Return value

None (`undefined`).

## See also

- Web Speech API
