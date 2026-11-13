---
title: "CookieChangeEvent: CookieChangeEvent() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cookiechangeevent/cookiechangeevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CookieChangeEvent: CookieChangeEvent() constructor

The **`CookieChangeEvent()`** constructor creates a new `CookieChangeEvent` object
which is the event type of the `change` event fired at a `CookieStore` when any cookie changes occur.
This constructor is called by the browser when a change event occurs.

> **Note:**
> This event constructor is generally not needed for production websites. It's primary use is for tests that require an instance of this event.

## Syntax

```js
new CookieChangeEvent(type)
new CookieChangeEvent(type, options)
```

### Parameters

- `type`
    A string with the name of the event. It is case-sensitive and browsers always set it to `change`.
- `options` (optional)
    An object that, _in addition of the properties defined in `Event()`_, can have the following properties:
    - `changed` (optional)
        An array containing the changed cookies.
    - `deleted` (optional)
        An array containing the deleted cookies.

### Return value

A new `CookieChangeEvent` object.
