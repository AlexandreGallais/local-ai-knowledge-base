---
title: "PushEvent: PushEvent() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/pushevent/pushevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PushEvent: PushEvent() constructor

The **`PushEvent()`** constructor creates a new
`PushEvent` object. Note that this constructor is exposed only to a
service worker context.

## Syntax

```js
new PushEvent(type)
new PushEvent(type, options)
```

### Parameters

- `type`
    A string with the name of the event.
    It is case-sensitive and browsers set it to `push` or `pushsubscriptionchange`.
- `options` (optional)
    An object that, _in addition of the properties defined in `ExtendableEvent()`_, can have the following properties:
    - `data`
        The data you want the `PushEvent` to contain, if any.
        When the constructor is invoked, the `PushEvent.data` property of the resulting object will be set
        to a new `PushMessageData` object containing these bytes.

### Return value

A new `PushEvent` object.

## Examples

```js
const dataInit = {
  data: "Some sample text",
};

const myPushEvent = new PushEvent("push", dataInit);

myPushEvent.data.text(); // should return 'Some sample text'
```

## See also

- Push API
- Service Worker API
