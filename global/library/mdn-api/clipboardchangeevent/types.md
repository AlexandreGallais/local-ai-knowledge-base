---
title: "ClipboardChangeEvent: types property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/clipboardchangeevent/types/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ClipboardChangeEvent: types property

The **`types`** read-only property of the `ClipboardChangeEvent` interface returns an array of strings representing the mandatory MIME types available on the system clipboard when the `ClipboardChangeEvent` event was fired. Optional types and custom formats are not included to limit fingerprinting.

## Value

An array of strings.

## Examples

In this example, when the contents of the clipboard change, the event listener logs to the console every string representing a mime type that is available in the array returned by the `ClipboardChangeEvent.types` property.

```js
navigator.clipboard.addEventListener("clipboardchange", (event) => {
  event.types.forEach((value) => {
    console.log(value);
  });
});
```

## See also

- `ClipboardChangeEvent.changeId`
- `ClipboardChangeEvent`
- `ClipboardEvent`
- Clipboard API
