---
title: "Event: initEvent() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/event/initevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Event: initEvent() method

The **`Event.initEvent()`** method is used to initialize the
value of an `event` created using `Document.createEvent()`.

Events initialized in this way must have been created with the
`Document.createEvent()` method.
This method must be called to set the event
before it is dispatched, using `EventTarget.dispatchEvent()`.
Once dispatched, it doesn't do anything anymore.

> **Note:**
> _Do not use this method anymore as it is deprecated._
> Instead use specific event constructors, like `Event()`.
> The section on Creating and dispatching events gives more information about the way to use these.

## Syntax

```js
initEvent(type, bubbles, cancelable)
```

### Parameters

- `type`
    A string defining the type of event.
- `bubbles`
    A boolean value deciding whether the event should bubble up through the
    event chain or not. Once set, the read-only property `Event.bubbles`
    will give its value.
- `cancelable`
    A boolean value defining whether the event can be canceled. Once set, the
    read-only property `Event.cancelable` will give its value.

### Return value

None.

## Example

```js
// Create the event.
const event = document.createEvent("Event");

// Create a click event that bubbles up and
// cannot be canceled
event.initEvent("click", true, false);

// Listen for the event.
elem.addEventListener("click", (e) => {
  // e.target matches elem
});

elem.dispatchEvent(event);
```

## See also

- The constructor to use instead of this deprecated method:
  `Event()`. To create more specific event interfaces than `Event`, use the constructor defined for the desired event interface.
