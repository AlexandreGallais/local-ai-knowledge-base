---
title: "DragEvent: DragEvent() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/dragevent/dragevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DragEvent: DragEvent() constructor

This constructor is used to create a synthetic `DragEvent` object.

Although this interface has a constructor, it is not possible to create a
useful `DataTransfer` object from script, since `DataTransfer`
objects have a processing and security model that is coordinated by the browser during
drag-and-drops.

This interface inherits properties from `MouseEvent` and
`Event`.

## Syntax

```js
new DragEvent(type)
new DragEvent(type, dragEventInit)
```

### Parameters

- `type`
    A string representing the name of the event (see DragEvent event types).

- `eventInitDict` (optional)
    An object containing the following properties:
    - `dataTransfer` (optional)
        A `DataTransfer`. Defaults to `null`.
