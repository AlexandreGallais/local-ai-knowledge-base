---
title: "HashChangeEvent: HashChangeEvent() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/hashchangeevent/hashchangeevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HashChangeEvent: HashChangeEvent() constructor

The **`HashChangeEvent()`** constructor creates a new `HashChangeEvent` object, that is used by the `hashchange` event fired at the `window` object when the fragment of the URL changes.

> **Note:**
> A web developer doesn't typically need to call this constructor, as the browser creates these objects itself when firing `hashchange` events.

## Syntax

```js
new HashChangeEvent(type, options)
```

### Parameters

- `type`
    A string with the name of the event.
    It is case-sensitive and browsers set it to `hashchange`.
- `options` (optional)
    An object that, _in addition to the properties defined in `Event()`_, has the following properties:
    - `oldURL` (optional)
        A string containing the old URL. Its default value is the empty string (`""`).
    - `newURL` (optional)
        A string containing the new URL. Its default value is the empty string (`""`).

### Return value

A new `HashChangeEvent` object.

## See also

- `hashchange` event
