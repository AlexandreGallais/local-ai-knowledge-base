---
title: "ClipboardChangeEvent"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/clipboardchangeevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ClipboardChangeEvent

The **`ClipboardChangeEvent`** interface of the `Clipboard API` represents events fired whenever the contents of the system clipboard are changed.

## Constructor

- `ClipboardChangeEvent()` (experimental)
    Creates a new `ClipboardChangeEvent` event with the given parameters.

## Instance properties

_Also inherits properties from its parent `Event`_.

- `ClipboardChangeEvent.types` (read-only) (experimental)
    An array of strings representing the mandatory data types available on the system clipboard when the event was fired.
- `ClipboardChangeEvent.changeId` (read-only) (experimental)
    A 128-bit integer representing a unique identifier for this specific clipboard change operation.

## Instance methods

_No specific methods; inherits methods from its parent `Event`_.

## Examples

In this example, when the clipboard's contents are changed, the event listener logs the data types, change id, and the entire event object to the console. This is a `ClipboardChangeEvent` object of type `clipboardchange`.

```js
navigator.clipboard.addEventListener("clipboardchange", (event) => {
  console.log(`MIME types: ${event.types}`);
  console.log(`ID: ${event.changeId}`);
  console.dir(event);
});
```

## See also

- Copy-related events: `copy`, `cut`, `paste`
- `ClipboardEvent`
- Clipboard API
