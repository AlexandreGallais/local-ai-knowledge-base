---
title: "HTMLTextAreaElement: defaultValue property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmltextareaelement/defaultvalue/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLTextAreaElement: defaultValue property

The **`defaultValue`** property of the `HTMLTextAreaElement` interface represents the default text content of this text area. Getting and setting this value is equivalent to getting and setting `textContent` on the `<textarea>`.

## Value

A string.

## Examples

In the example below, the `defaultValue` still returns the value originally written in the HTML. If a default value is set, either via HTML or the `defaultValue` property, user input will update the `value` but will not overwrite the `defaultValue`.

```js
const textareaElement = document.getElementById("comment");
console.log(textArea.defaultValue);
textArea.defaultValue = "This is the default text now!";
```

## See also

- `<textarea>`
- `HTMLTextAreaElement.value`
