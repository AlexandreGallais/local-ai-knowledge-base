---
title: "ClipboardItem: presentationStyle property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/clipboarditem/presentationstyle/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ClipboardItem: presentationStyle property

The read-only **`presentationStyle`** property of the `ClipboardItem` interface returns a string indicating how an item should be presented.

For example, in some contexts an image might be displayed inline, while in others it might be represented as an attachment.

## Value

One of either `"unspecified"`, `"inline"` or `"attachment"`.

## Examples

In the below example, we're returning all items on the clipboard via the `clipboard.read()` method, then logging the `presentationStyle` property.

```js
async function getClipboardContents() {
  try {
    const clipboardItems = await navigator.clipboard.read();

    for (const clipboardItem of clipboardItems) {
      console.log(clipboardItem.presentationStyle);
    }
  } catch (err) {
    console.error(err.name, err.message);
  }
}
```

## See also

- Clipboard API
- Image support for Async Clipboard article
