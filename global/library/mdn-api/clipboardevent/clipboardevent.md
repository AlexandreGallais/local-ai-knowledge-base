---
title: "ClipboardEvent: ClipboardEvent() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/clipboardevent/clipboardevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ClipboardEvent: ClipboardEvent() constructor

The **`ClipboardEvent()`** constructor returns a new `ClipboardEvent`, representing an event providing information related to modification of the clipboard, that is `cut`, `copy`, and `paste` events.

## Syntax

```js
new ClipboardEvent(type)
new ClipboardEvent(type, options)
```

### Parameters

- `type`
    A string with the name of the type of the `ClipboardEvent`.
    It is case-sensitive and browsers set it to `copy`, `cut`, or `paste`.
- `options` (optional)
    An object that, _in addition of the properties defined in `Event()`_, has the following properties:
    - `clipboardData` (optional)
        A `DataTransfer` object containing the data concerned by the clipboard event. It defaults to `null`.
    - `dataType` (non-standard) (optional)
        A string containing the MIME-type of the data contained in the `data` argument. It defaults to `""`.
    - `data` (non-standard) (optional)
        A string containing the data concerned by the clipboard event. It defaults to `""`.

### Return value

A new `ClipboardEvent` object.

## See also

- Copy-related events: `copy`, `cut`, `paste`
- The `ClipboardEvent` interface it belongs to.
- Clipboard API
