---
title: "UIEvent: initUIEvent() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/uievent/inituievent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# UIEvent: initUIEvent() method

The **`UIEvent.initUIEvent()`** method initializes a UI event
once it's been created.

Events initialized in this way must have been created with the `Document.createEvent()` method. This method must be called to set the event
before it is dispatched, using `EventTarget.dispatchEvent()`. Once
dispatched, it doesn't do anything anymore.

> **Warning:**
> Do not use this method anymore as it is deprecated.
>
> Instead use specific event constructors, like `UIEvent()`. The page on Creating and dispatching events gives more information about the way to use these.

## Syntax

```js
initUIEvent(type, canBubble, cancelable, view, detail)
```

### Parameters

- `type`
    A string defining the type of event.
- `canBubble`
    A boolean value deciding whether the event should bubble up through the
    event chain or not. Once set, the read-only property `Event.bubbles`
    will give its value.
- `cancelable`
    A boolean value defining whether the event can be canceled. Once set, the
    read-only property `Event.cancelable` will give its value.
- `view`
    Is the WindowProxy associated with the event.
- `detail`
    An `unsigned long` specifying some detail information about the
    event, depending on the type of event. For mouse events, it indicates how many times
    the mouse has been clicked on a given screen location.

### Return value

None (`undefined`).

## Examples

```js
const e = document.createEvent("UIEvent");
// creates a click event that bubbles, can be canceled,
// and with its view and detail property initialized to window and 1,
// respectively
e.initUIEvent("click", true, true, window, 1);
```

## See also

- `UIEvent`
- The constructor to use instead of this deprecated method:
  `UIEvent()`. More specific constructors can be used
  too.
