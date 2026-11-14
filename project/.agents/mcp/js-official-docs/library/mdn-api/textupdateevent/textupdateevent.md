---
title: "TextUpdateEvent: TextUpdateEvent() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/textupdateevent/textupdateevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TextUpdateEvent: TextUpdateEvent() constructor

The **`TextUpdateEvent()`** constructor returns a new `TextUpdateEvent` object.

## Syntax

```js
new TextUpdateEvent(type)
new TextUpdateEvent(type, options)
```

### Parameters

- `type`
    A string representing the type of the event. Possible values: `"textupdate"`.
- `options` (optional)
    An optional object with the following properties:
    - `updateRangeStart`
        A number representing the offset of the first character within the editable region text that needs to be updated.
    - `updateRangeEnd`
        A number representing the offset of the last character within the editable region text that needs to be updated.
    - `text`
        A string representing the text that needs to be inserted.
    - `selectionStart`
        A number representing the offset of the selection start within the editable region text.
    - `selectionEnd`
        A number representing the offset of the selection end within the editable region text.
    - `compositionStart`
        A number representing the offset of the start of the composition within the editable region text.
    - `compositionEnd`
        A number representing the offset of the end of the composition within the editable region text.

## See also

- The `TextUpdateEvent` interface it belongs to.
