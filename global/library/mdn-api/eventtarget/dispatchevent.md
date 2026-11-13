---
title: "EventTarget: dispatchEvent() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/eventtarget/dispatchevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# EventTarget: dispatchEvent() method

The **`dispatchEvent()`** method of the `EventTarget` sends an `Event` to the object, (synchronously) invoking the affected
event listeners in the appropriate order. The normal event processing
rules (including the capturing and optional bubbling phase) also apply to events
dispatched manually with `dispatchEvent()`.

Calling `dispatchEvent()` is the last step to _firing an event_. The event
should have already been created and initialized using an `Event()` constructor.

> **Note:**
> When calling this method, the `Event.target` property is initialized to the current `EventTarget`.

Unlike "native" events, which the browser fires by queuing a task on the event loop, `dispatchEvent()` invokes all applicable event handlers synchronously before returning. The read-only `isTrusted` property is `true` for native events and `false` for events dispatched with `dispatchEvent()`.

## Syntax

```js
dispatchEvent(event)
```

### Parameters

- `event`
    The `Event` object to dispatch. Its `Event.target` property will be set to the current `EventTarget`.

### Return value

`false` if `event` is cancelable, and at least one of the event handlers which received `event` called `Event.preventDefault()`. Otherwise `true`.

### Exceptions

- `InvalidStateError` `DomException`
    Thrown if the event's type was not specified during event initialization.

> **Warning:**
> Exceptions thrown by event handlers are reported as uncaught exceptions. The event
> handlers run on a nested callstack; they block the caller until they complete, but
> exceptions do not propagate to the caller.

## Example

See Creating and dispatching events.

## See also

- The Event object reference
