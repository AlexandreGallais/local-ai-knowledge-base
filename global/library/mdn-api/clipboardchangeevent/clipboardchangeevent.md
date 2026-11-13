---
title: "ClipboardChangeEvent: ClipboardChangeEvent() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/clipboardchangeevent/clipboardchangeevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ClipboardChangeEvent: ClipboardChangeEvent() constructor

The **`ClipboardChangeEvent()`** constructor creates a new `ClipboardChangeEvent` object instance when a `clipboardchange` event occurs. The `clipboardchange` event fires whenever the system clipboard contents are changed either by a web app or any other system application.

> **Note:**
> This event constructor is generally not needed for production websites. Its primary use is for tests that require an instance of this event.

## Syntax

```js
new ClipboardChangeEvent(type)
new ClipboardChangeEvent(type, options)
```

### Parameters

- `type`
    A string with the name of the event. It should always be set to `clipboardchange`.
- `options` (optional)
    An object that, _in addition to the properties defined in `Event()`_, can have the following properties:
    - `types`
        An array of strings representing the data types available on the system clipboard.
    - `changeId`
        An integer representing a unique identifier for the clipboard change operation.

### Return value

A new `ClipboardChangeEvent` object.
