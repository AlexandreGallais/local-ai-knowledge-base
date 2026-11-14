---
title: "FetchEvent: FetchEvent() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/fetchevent/fetchevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# FetchEvent: FetchEvent() constructor

The **`FetchEvent()`** constructor creates a new `FetchEvent` object.

## Syntax

```js
new FetchEvent(type, options)
```

### Parameters

- `type`
    A string with the name of the event.
    It is case-sensitive and browsers always set it to `fetch`.
- `options`
    An object that, _in addition of the properties defined in `ExtendableEvent()`_, can have the following properties:
    - `request`
        The `Request` object that would have triggered the event handler.
    - `preloadResponse`
        A `Promise` which returns a previously-loaded response to the client.
    - `clientId` (optional)
        The `Client` that the current service worker is controlling. It defaults to `""`.
    - `isReload` (deprecated) (optional)
        A boolean value that signifies whether the page was reloaded or not when
        the event was dispatched. `true` if yes, and `false` if not.
        Typically, pressing the refresh button in a browser is a reload, while clicking a
        link and pressing the back button is not. If not present, it defaults to
        `false`.
    - `resultingClientId` (optional)
        A string containing the new `clientId` if the client changes as a result of the page load. It defaults to `""`
    - `handled`
        A _pending_ promise that will be fulfilled once the event has been handled.

### Return value

A new `FetchEvent` object.

## See also

- `Promise`
- Fetch API
