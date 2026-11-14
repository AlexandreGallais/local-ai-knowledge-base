---
title: "PopStateEvent: PopStateEvent() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/popstateevent/popstateevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PopStateEvent: PopStateEvent() constructor

The **`PopStateEvent()`** constructor creates a new `PopStateEvent` object.

> **Note:**
> A web developer doesn't typically need to call this constructor, as the browser creates these objects itself when firing `popstate` events.

## Syntax

```js
new PopStateEvent(type, options)
```

### Parameters

- `type`
    A string with the name of the event.
    It is case-sensitive and browsers set it to `popstate`.
- `options` (optional)
    An object that, _in addition to the properties defined in `Event()`_, has the following property:
    - `state` (optional)
        An object representing the state. Practically it is a value provided by the call to `history.pushState()` or `history.replaceState()`. If not set, it defaults to `null`.

### Return value

A new `PopStateEvent` object.

## See also

- `history.pushState()`
- `history.replaceState()`
- `popstate` event
