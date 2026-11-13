---
title: "MessageEvent: MessageEvent() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/messageevent/messageevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MessageEvent: MessageEvent() constructor

The **`MessageEvent()`** constructor creates a new `MessageEvent` object.

## Syntax

```js
new MessageEvent(type)
new MessageEvent(type, options)
```

### Parameters

- `type`
    A string with the name of the event.
    It is case-sensitive and browsers always set it to `message`.
- `options` (optional)
    An object that, _in addition of the properties defined in `Event()`_, can have the following properties:
    - `data` (optional)
        The data you want contained in the MessageEvent.
        This can be of any data type, and will default to `null` if not specified.
    - `origin` (optional)
        A string representing the origin of the message emitter.
        This defaults to an empty string (`''`) if not specified.
    - `lastEventId` (optional)
        A string representing a unique ID for the event.
        This defaults to an empty string ("") if not specified.
    - `source` (optional)
        A `MessageEventSource` (which can be a `Window`, a `MessagePort`,
        or a `ServiceWorker` object) representing the message emitter.
        This defaults to `null` if not set.
    - `ports` (optional)
        An array of `MessagePort` objects containing all `MessagePort` objects sent with the message, in order.
        This defaults to an empty array (`[]`) if not specified.

### Return value

A new `MessageEvent` object.

## Examples

```js
const myMessage = new MessageEvent("message", {
  data: "hello",
});
```

## See also

- `ExtendableMessageEvent` — similar to this interface but used in interfaces that needs to give more flexibility to authors.
