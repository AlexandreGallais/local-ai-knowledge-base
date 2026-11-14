---
title: "CharacterBoundsUpdateEvent: CharacterBoundsUpdateEvent() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/characterboundsupdateevent/characterboundsupdateevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CharacterBoundsUpdateEvent: CharacterBoundsUpdateEvent() constructor

The **`CharacterBoundsUpdateEvent()`** constructor returns a new `CharacterBoundsUpdateEvent` object.

## Syntax

```js
new CharacterBoundsUpdateEvent(type)
new CharacterBoundsUpdateEvent(type, options)
```

### Parameters

- `type`
    A string representing the type of the event. Possible values: `"characterboundsupdate"`.
- `options` (optional)
    An optional object with the following properties:
    - `rangeStart`
        A number to set the offset of the first character within the editable text region which this event applies to.
    - `rangeEnd`
        A number to set the offset of the last character within the editable text region which this event applies to.

## See also

- The `CharacterBoundsUpdateEvent` interface it belongs to.
