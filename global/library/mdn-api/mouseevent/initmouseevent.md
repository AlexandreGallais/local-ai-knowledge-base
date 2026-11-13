---
title: "MouseEvent: initMouseEvent() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mouseevent/initmouseevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MouseEvent: initMouseEvent() method

The **`MouseEvent.initMouseEvent()`** method initializes the
value of a mouse event once it's been created (normally using the `Document.createEvent()` method).

> **Warning:**
> Do not use this method anymore as it is deprecated.
>
> Instead use specific event constructors, like `MouseEvent()`.
> The section on Creating and dispatching events gives more information about the way to use these.

Events initialized in this way must have been created with the `Document.createEvent()` method.
This method must be called to set the event
before it is dispatched, using `EventTarget.dispatchEvent()`.

## Syntax

```js
initMouseEvent(type, canBubble, cancelable, view,
                     detail, screenX, screenY, clientX, clientY,
                     ctrlKey, altKey, shiftKey, metaKey,
                     button, relatedTarget)
```

### Parameters

- `type`
    the string to set the event's `type` to. Possible types
    for mouse events include: `click`, `mousedown`,
    `mouseup`, `mouseover`, `mousemove`,
    `mouseout`.
- `canBubble`
    whether or not the event can bubble. Sets the value of `Event.bubbles`.
- `cancelable`
    whether or not the event's default action can be prevented. Sets the value of
    `Event.cancelable`.
- `view`
    the event's AbstractView. You should pass the `window` object here.
    Sets the value of `UIEvent.view`.
- `detail`
    the event's mouse click count. Sets the value of `UIEvent.detail`.
- `screenX`
    the event's screen x coordinate. Sets the value of
    `MouseEvent.screenX`.
- `screenY`
    the event's screen y coordinate. Sets the value of
    `MouseEvent.screenY`.
- `clientX`
    the event's client x coordinate. Sets the value of
    `MouseEvent.clientX`.
- `clientY`
    the event's client y coordinate. Sets the value of
    `MouseEvent.clientY`.
- `ctrlKey`
    whether or not `control` key was pressed during the Event. Sets the value
    of `MouseEvent.ctrlKey`.

- `altKey`
    whether or not `alt` key was pressed during the Event. Sets the value of
    `MouseEvent.altKey`.

- `shiftKey`
    whether or not `shift` key was pressed during the Event. Sets the value
    of `MouseEvent.shiftKey`.

- `metaKey`
    whether or not `meta` key was pressed during the Event. Sets the value of
    `MouseEvent.metaKey`.

- `button`
    the event's mouse `button`.
- `relatedTarget`
    the event's related EventTarget. Only used
    with some event types (e.g., `mouseover` and `mouseout`). In
    other cases, pass `null`.

### Return value

None (`undefined`).

## Examples

```js
const event = document.createEvent("MouseEvents");
event.initMouseEvent(
  "click",
  true,
  true,
  window,
  0,
  0,
  0,
  80,
  20,
  false,
  false,
  false,
  false,
  0,
  null,
);
document.body.dispatchEvent(event);
```

## See also

- `MouseEvent()` constructor, the modern
  standard way of creating a `MouseEvent`
- `Event.initEvent()` is a simpler method serving a similar purpose. It
  is also obsolete and shouldn't be used any more.
