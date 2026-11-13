---
title: "FocusEvent: FocusEvent() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/focusevent/focusevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# FocusEvent: FocusEvent() constructor

The **`FocusEvent()`** constructor returns a newly created
`FocusEvent` object with an optional `EventTarget`. When the
event has both a source and a destination, the `relatedTarget` value must be
set to the other target.

## Syntax

```js
new FocusEvent(type)
new FocusEvent(type, options)
```

### Parameters

_The `FocusEvent()` constructor also inherits arguments from
`UIEvent()` and from `Event()`._

- `type`
    A string with the name of the event.
    It is case-sensitive and browsers set it to `blur`, `focus`, `focusin`, or `focusout`.
- `options` (optional)
    An object that, in addition of the properties defined in `UIEvent()`, can have the following properties:
    - `relatedTarget` (optional)
        An `EventTarget` representing the secondary target of a `FocusEvent`. It defaults to `null`.

## See also

- The `FocusEvent` interface it belongs to.
