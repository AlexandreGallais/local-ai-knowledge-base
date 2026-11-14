---
title: "TextFormatUpdateEvent: TextFormatUpdateEvent() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/textformatupdateevent/textformatupdateevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TextFormatUpdateEvent: TextFormatUpdateEvent() constructor

The **`TextFormatUpdateEvent()`** constructor returns a new `TextFormatUpdateEvent` object.

## Syntax

```js
new TextFormatUpdateEvent(type)
new TextFormatUpdateEvent(type, options)
```

### Parameters

- `type`
    A string representing the type of the event. Possible values: `"textformatupdate"`.
- `options` (optional)
    An optional object with the following properties:
    - `textFormats`
        An `Array` of `TextFormat` objects representing the text formats that need to be applied with this event.

## See also

- The `TextFormatUpdateEvent` interface it belongs to.
