---
title: "ClipboardItem: types property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/clipboarditem/types/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ClipboardItem: types property

The read-only **`types`** property of the `ClipboardItem` interface returns an `Array` of MIME types available within the `ClipboardItem`.

## Value

An `Array` of available MIME types.

## Examples

In the below example, we're returning all items on the clipboard via the `Clipboard.read()` method, then checking the `types` property for available types before utilizing the `ClipboardItem.getType()` method to return each data item as a `Blob`. If no clipboard contents is found for the specified type, an error is returned.

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
