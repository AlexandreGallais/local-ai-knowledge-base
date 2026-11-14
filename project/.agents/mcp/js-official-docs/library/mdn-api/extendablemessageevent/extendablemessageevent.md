---
title: "ExtendableMessageEvent: ExtendableMessageEvent() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/extendablemessageevent/extendablemessageevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ExtendableMessageEvent: ExtendableMessageEvent() constructor

The **`ExtendableMessageEvent()`** constructor creates a new `ExtendableMessageEvent` object.

## Syntax

```js
new ExtendableMessageEvent(type)
new ExtendableMessageEvent(type, options)
```

### Parameters

- `type`
    A string with the name of the event.
    It is case-sensitive and browsers set it to `messageerror` or `message`.
- `options` (optional)
    An object that, _in addition of the properties defined in `ExtendableEvent()`_, can have the following properties:
    - `data` (optional)
        The event's data; this can be any data type. It defaults to `null`.
    - `origin` (optional)
        A string that defines the origin of the corresponding service worker's environment settings object.
        It defaults to `""`.
    - `lastEventId` (optional)
        A string that defines the last event ID of the event source. It defaults to `""`.
    - `source` (optional)
        The `Client`, `ServiceWorker` or `MessagePort` that sent the message.
        It defaults to `null`.
    - `ports` (optional)
        An array containing the `MessagePort` objects connected to the channel sending the message.
        It defaults to an empty array.

### Return value

A new `ExtendableMessageEvent` object.

## Examples

```js
const options = {
  data: "hello message",
  source: MessagePortReference,
  ports: MessagePortListReference,
};

const myEME = new ExtendableMessageEvent("message", init);
```

## See also

- Using Service Workers
- Service workers basic code example
- Channel Messaging
