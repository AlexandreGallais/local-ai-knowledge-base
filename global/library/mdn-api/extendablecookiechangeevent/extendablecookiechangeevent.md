---
title: "ExtendableCookieChangeEvent: ExtendableCookieChangeEvent() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/extendablecookiechangeevent/extendablecookiechangeevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ExtendableCookieChangeEvent: ExtendableCookieChangeEvent() constructor

The **`ExtendableCookieChangeEvent()`** constructor creates a new `ExtendableCookieChangeEvent` object
which is the event type passed to `cookiechange` event fired at the `ServiceWorkerGlobalScope` when any cookie changes occur which match the service worker's cookie change subscription list.
This constructor is called by the browser when a change event occurs.

> **Note:**
> This event constructor is generally not needed for production websites. It's primary use is for tests that require an instance of this event.

## Syntax

```js
new ExtendableCookieChangeEvent(type)
new ExtendableCookieChangeEvent(type, options)
```

### Parameters

- `type`
    A string with the name of the event.
    It is case-sensitive and browsers always set it to `cookiechange`.
- `options` (optional)
    An object that, _in addition of the properties defined in `ExtendableEvent()`_, can have the following properties:
    - `changed` (optional)
        An array containing a changed cookie.
    - `deleted` (optional)
        An array containing a deleted cookie.

### Return value

A new `ExtendableCookieChangeEvent` object.
