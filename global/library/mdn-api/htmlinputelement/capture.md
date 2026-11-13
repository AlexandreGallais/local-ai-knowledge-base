---
title: "HTMLInputElement: capture property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlinputelement/capture/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLInputElement: capture property

The **`capture`** property of the `HTMLInputElement` interface reflects the `` element's `capture` attribute. Only relevant to the `` of type `file`, the property and attribute specify whether, a new file should be captured from a user-facing (`user`) or outward facing (`environment`) camera or microphone. The type of file is defined the `accept` attribute. If the attribute is not explicitly set, the `capture` property is an empty string.

## Value

A string; generally either `user` or `environment`, or an empty string (`""`).

## Example

```js
const inputElement = document.querySelector("avatar");
console.log(inputElement.capture); // the current value of the capture attribute
inputElement.capture = "user"; // sets the capture value
```

## See also

- `HTMLInputElement.type`
- `HTMLInputElement.multiple`
- `HTMLInputElement.accept`
- `HTMLInputElement.files`
- File type specifiers
- Using files from web applications
- File API
