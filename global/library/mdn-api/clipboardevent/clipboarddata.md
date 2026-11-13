---
title: "ClipboardEvent: clipboardData property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/clipboardevent/clipboarddata/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ClipboardEvent: clipboardData property

The **`clipboardData`** property of the `ClipboardEvent` interface holds a `DataTransfer` object, which can be used to:

- specify what data should be put into the clipboard from the `cut` and `copy` event handlers, typically with a `setData(format, data)` call;
- obtain the data to be pasted from the `paste` event handler, typically with a `getData(format)` call.

See the `cut`, `copy`, and `paste` events documentation for more information.

## Value

A `DataTransfer` object.

The property can be `null` when the event is created using the constructor. It is never `null` when dispatched by the browser.

## See also

- Copy-related events: `copy`, `cut`, `paste`
- The `ClipboardEvent` interface it belongs to.
- Clipboard API
