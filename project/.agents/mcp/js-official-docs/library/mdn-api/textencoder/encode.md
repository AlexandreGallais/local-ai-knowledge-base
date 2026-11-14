---
title: "TextEncoder: encode() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/textencoder/encode/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TextEncoder: encode() method

The **`TextEncoder.encode()`** method takes a string as input, and returns a `Uint8Array` containing the string encoded using UTF-8.

## Syntax

```js
encode(string)
```

### Parameters

- `string`
    A string containing the text to encode.

### Return value

A `Uint8Array` object containing the UTF-8 encoding of the input string.

## Examples

```html
<p class="source">Sample paragraph.</p>
<p class="result">Encoded result:</p>
```

```js
const sourcePara = document.querySelector(".source");
const resultPara = document.querySelector(".result");
const string = sourcePara.textContent;

const textEncoder = new TextEncoder();

const encoded = textEncoder.encode(string);
resultPara.textContent = `${resultPara.textContent} ${encoded}`;
```

## See also

- The `TextEncoder` interface it belongs to.
