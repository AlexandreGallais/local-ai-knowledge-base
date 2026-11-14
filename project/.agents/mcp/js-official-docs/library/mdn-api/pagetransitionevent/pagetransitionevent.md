---
title: "PageTransitionEvent: PageTransitionEvent() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/pagetransitionevent/pagetransitionevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PageTransitionEvent: PageTransitionEvent() constructor

The **`PageTransitionEvent()`** constructor creates a new `PageTransitionEvent` object, that is used by the `pageshow` or `pagehide` events, fired at the `window` object when a page is loaded or unloaded.

> **Note:**
> A web developer doesn't typically need to call this constructor, as the browser creates these objects itself when firing `pageshow` or `pagehide` events.

## Syntax

```js
new PageTransitionEvent(type, options)
```

### Parameters

- `type`
    A string with the name of the event.
    It is case-sensitive and browsers set it to `pageshow` or `pagehide`.
- `options` (optional)
    An object that, _in addition to the properties defined in `Event()`_, has the following property:
    - `persisted` (optional)
        A boolean indicating if the document is loading from a cache.

### Return value

A new `PageTransitionEvent` object.

## See also

- `pageshow` event
- `pagehide` event
