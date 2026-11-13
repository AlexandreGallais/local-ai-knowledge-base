---
title: "Clipboard: readText() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/clipboard/readtext/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Clipboard: readText() method

The **`readText()`** method of the `Clipboard` interface returns a `Promise` which fulfills with a copy of the textual contents of the system clipboard.

> **Note:**
> To read non-text contents from the clipboard, use the `read()` method instead.
> You can write text to the clipboard using `writeText()`.

## Syntax

```js
readText()
```

### Parameters

None.

### Return value

A `Promise` that resolves with a string containing the textual contents of the clipboard.

Returns an empty string if the clipboard is empty, does not contain text, or does not include a textual representation among the objects representing the clipboard's contents.

### Exceptions

- `NotAllowedError` `DOMException`
    Thrown if the access to read the clipboard is not allowed.
- `NotFoundError` `DOMException`
    Thrown if the clipboard indicates that it contains data that can be represented as a text but is unable to provide a textual representation.

## Security considerations

Reading from the clipboard can only be done in a secure context.

Additional security requirements are covered in the Security consideration section of the API overview topic.

## Examples

This example retrieves the textual contents of the clipboard and inserts the returned text into a selected element's contents.

```js
const destination = document.getElementById("outbox");
destinationImage.addEventListener("click", () => {
  navigator.clipboard
    .readText()
    .then((clipText) => (destination.innerText = clipText));
});
```

## See also

- Clipboard API
- Image support for Async Clipboard article
- `Clipboard.read()`
- `Clipboard.writeText()`
- `Clipboard.write()`
