---
title: "Clipboard: writeText() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/clipboard/writetext/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Clipboard: writeText() method

The **`writeText()`** method of the `Clipboard` interface writes the specified text to the system clipboard, returning a `Promise` that is resolved once the system clipboard has been updated.

## Syntax

```js
writeText(newClipText)
```

### Parameters

- `newClipText`
    The string to be written to the clipboard.

### Return value

A `Promise` that is resolved once the clipboard's contents have been updated.

### Exceptions

- `NotAllowedError` `DOMException`
    Thrown if writing to the clipboard is not allowed.

## Security considerations

Writing to the clipboard can only be done in a secure context.

Additional security requirements are covered in the Security consideration section of the API overview topic.

## Examples

This example sets the clipboard's contents to the string "\<empty clipboard>".

```js
button.addEventListener("click", () => writeClipboardText("<empty clipboard>"));

async function writeClipboardText(text) {
  try {
    await navigator.clipboard.writeText(text);
  } catch (error) {
    console.error(error.message);
  }
}
```

## See also

- Clipboard API
- Image support for Async Clipboard article
- `Clipboard.write()`
- `Clipboard.read()`
- `Clipboard.readText()`
