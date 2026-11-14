---
title: "PresentationConnectionAvailableEvent: PresentationConnectionAvailableEvent() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/presentationconnectionavailableevent/presentationconnectionavailableevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PresentationConnectionAvailableEvent: PresentationConnectionAvailableEvent() constructor

The **`PresentationConnectionAvailableEvent()`** constructor creates a new `PresentationConnectionAvailableEvent` object.

## Syntax

```js
new PresentationConnectionAvailableInit(type, options)
```

### Parameters

- `type`
    A string with the name of the event.
    It is case-sensitive and browsers set it to `connectionavailable`.
- `options`
    An object that, _in addition of the properties defined in `Event()`_, can have the following properties:
    - `connection`
        The association `PresentationConnection` object.

### Return value

A new `PresentationConnectionAvailableEvent` object.
