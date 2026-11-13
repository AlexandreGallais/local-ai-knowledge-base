---
title: "ClipboardChangeEvent: changeId property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/clipboardchangeevent/changeid/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ClipboardChangeEvent: changeId property

The **`changeId`** read-only property of the `ClipboardChangeEvent` interface returns an integer representing a unique identifier for this specific clipboard change operation.

The identifier is consistent across all windows and tabs with the same storage key for the same clipboard change, enabling applications to deduplicate events when multiple windows receive the same clipboard change notification.

## Value

An integer. A cryptographically derived 128-bit integer that, after something is written to the clipboard, is guaranteed to yield a different value than it did before the write operation.

## Examples

In this example, when the contents of the clipboard change, the event listener uses the `ClipboardChangeEvent.changeId` property to log to the console the unique ID representing the clipboard change operation that fired the event.

```js
navigator.clipboard.addEventListener("clipboardchange", (event) => {
  console.log(event.changeId);
});
```

## See also

- `ClipboardChangeEvent.types`
- `ClipboardChangeEvent`
- `ClipboardEvent`
- Clipboard API
