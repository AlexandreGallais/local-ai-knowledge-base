---
title: "HTMLInputElement: accept property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlinputelement/accept/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLInputElement: accept property

The **`accept`** property of the `HTMLInputElement` interface reflects the `` element's `accept` attribute, generally a comma-separated list of unique file type specifiers providing a hint for the expected file type for an `` of type `file`. If the attribute is not explicitly set, the `accept` property is an empty string.

## Value

A string representing the element's `accept` value or an empty string if no `accept` is explicitly set.

## Example

```js
const inputElement = document.querySelector("#time");
console.log(inputElement.accept); // the current value of the accept attribute
inputElement.accept = ".doc,.docx,.xml,application/msword"; // sets the accept value
```

## See also

- `HTMLInputElement.type`
- `HTMLInputElement.multiple`
- `HTMLInputElement.capture`
- File type specifiers
- Using files from web applications
- File API
