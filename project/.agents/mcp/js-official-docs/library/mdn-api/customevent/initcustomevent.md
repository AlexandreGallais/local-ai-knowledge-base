---
title: "CustomEvent: initCustomEvent() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/customevent/initcustomevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CustomEvent: initCustomEvent() method

The **`CustomEvent.initCustomEvent()`** method initializes a `CustomEvent` object.
If the event has already been dispatched, this method does nothing.

Events initialized in this way must have been created with the `Document.createEvent()` method.
This method must be called to set the event before it is dispatched using `EventTarget.dispatchEvent()`.
Once dispatched, it doesn't do anything anymore.

> **Note:**
> **Do not use this method anymore, as it is deprecated.**
>
> Rather than using the feature, instead use specific event constructors, like `CustomEvent()`.
> The section on Creating and dispatching events gives more information about the way to use those.

## Syntax

```js
initCustomEvent(type, canBubble, cancelable, detail)
```

### Parameters

- `type`
    A string containing the name of the event.
- `canBubble`
    A boolean value indicating whether the event bubbles up through the DOM
    or not.
- `cancelable`
    A boolean value indicating whether the event is cancelable.
- `detail`
    Any data that will be available to the handler through the `CustomEvent.detail` property.

### Return value

None (`undefined`).

## See also

- `CustomEvent`
- The constructor to use instead of this deprecated method: `CustomEvent()`.
