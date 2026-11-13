---
title: "NotificationEvent: NotificationEvent() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/notificationevent/notificationevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# NotificationEvent: NotificationEvent() constructor

The **`NotificationEvent()`** constructor creates a new `NotificationEvent` object.

## Syntax

```js
new NotificationEvent(type, options)
```

### Parameters

- `type`
    A string with the name of the event.
    It is case-sensitive and browsers set it to `notificationclick` or `notificationclose`.
- `options`
    An object that, _in addition of the properties defined in `ExtendableEvent()`_, can have the following properties:
    - `notification`
        A `Notification` object to be used as the notification the event is dispatched on.
    - `action` (optional)
        An action associated with the notification. It defaults to `""`.

### Return value

A new `NotificationEvent()` object.

## Examples

```js
const n = new Notification("Hello");
const myNotificationEvent = new NotificationEvent(type, { notification: n });
```
