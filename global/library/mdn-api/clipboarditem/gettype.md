---
title: "ClipboardItem: getType() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/clipboarditem/gettype/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ClipboardItem: getType() method

The **`getType()`** method of the `ClipboardItem` interface returns a `Promise` that resolves with a `Blob` of the requested MIME type or an error if the MIME type is not found.

## Syntax

```js
getType(type)
```

### Parameters

- `type`
    A valid MIME type.

### Return value

A `Promise` that resolves with a `Blob` object.

### Exceptions

- `NotFoundError` `DOMException`
    The `type` does not match a known MIME type.
- `TypeError`
    No parameter is specified or the `type` is not that of the `ClipboardItem`.

## Examples

In the following example, we're returning all items on the clipboard via the `clipboard.read()` method. For each one, we pass the `ClipboardItem.types` property to the `getType()` method, which returns the corresponding `Blob` object.

```js
async function getClipboardContents() {
  try {
    const clipboardItems = await navigator.clipboard.read();

    for (const clipboardItem of clipboardItems) {
      for (const type of clipboardItem.types) {
        const blob = await clipboardItem.getType(type);
        // we can now use blob here
      }
    }
  } catch (err) {
    console.error(err.name, err.message);
  }
}
```

## See also

- Clipboard API
- Image support for Async Clipboard article
