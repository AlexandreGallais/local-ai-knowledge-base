---
title: "BackgroundFetchUpdateUIEvent: BackgroundFetchUpdateUIEvent() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/backgroundfetchupdateuievent/backgroundfetchupdateuievent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# BackgroundFetchUpdateUIEvent: BackgroundFetchUpdateUIEvent() constructor

The **`BackgroundFetchUpdateUIEvent()`** constructor creates a new `BackgroundFetchUpdateUIEvent` object. This constructor is not typically used as the browser creates these objects itself and provides them to background fetch event callbacks.

## Syntax

```js
new BackgroundFetchEvent(type, options)
```

### Parameters

- `type`
    A string with the name of the event.
    It is case-sensitive and browsers set it to `backgroundfetchsuccess` or `backgroundfetchfail`.
- `options`
    An object that, _in addition of the properties defined in `ExtendableEvent()`_, has the following properties:
    - `registration`
        A `BackgroundFetchRegistration` object.

### Return value

A new `BackgroundFetchUpdateUIEvent` object.
