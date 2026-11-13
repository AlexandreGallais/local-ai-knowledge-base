---
title: "TextEvent: initTextEvent() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/textevent/inittextevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TextEvent: initTextEvent() method

The **`initTextEventEvent()`** method of the `TextEvent` interface initializes the value of a `TextEvent` after it has been created.

This method must be called to set the event before it is dispatched, using `EventTarget.dispatchEvent()`.

> **Note:**
> In general, you won't create these events yourself; they are created by the browser.

## Syntax

```js
initTextEvent(type)
initTextEvent(type, bubbles)
initTextEvent(type, bubbles, cancelable)
initTextEvent(type, bubbles, cancelable, view)
initTextEvent(type, bubbles, cancelable, view, data)
```

### Parameters

- `type`
    A string to set the event's `type` to.
    There is only one event type for a `TextEvent`: `textInput`.
- `bubbles` (optional)
    A boolean indicating whether or not the event can bubble. `false` by default. Sets the value of `Event.bubbles`.
- `cancelable` (optional)
    A boolean indicating whether or not the event's default action can be prevented. `false` by default. Sets the value of `Event.cancelable`.
- `view` (optional)
    The WindowProxy object from which the event was generated. `null` by default.
- `data` (optional)
    A string to set event's data attribute.

### Return value

None (`undefined`).
