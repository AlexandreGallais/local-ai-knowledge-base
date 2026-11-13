---
title: "TimeEvent: initTimeEvent() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/timeevent/inittimeevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TimeEvent: initTimeEvent() method

The **`TimeEvent.initTimeEvent()`** method initializes the value of a `TimeEvent` created using `Document.createEvent()`.

This method may only be called before the event has been dispatched via `EventTarget.dispatchEvent()`. If called multiple times, the final call takes precedence.

> **Note:**
> `Document.createEvent()` is deprecated in favor of event constructors, but `TimeEvent` has no dedicated constructor. `CustomEvent` is not a valid replacement, as it does not produce a `TimeEvent` instance with the interface's `view` and `detail` attributes.

## Syntax

```js
initTimeEvent(type)
initTimeEvent(type, view)
initTimeEvent(type, view, detail)
```

### Parameters

- `type`
    A string specifying the event type.
- `view` (optional)
    The `Window` from which the event was generated. If `null` or omitted, the `TimeEvent.view` attribute of the event will be `null`. Defaults to `null`.
- `detail` (optional)
    A `long` providing contextual information about the event. Defaults to `0`.

### Return value

None (`undefined`).

## Examples

### Dispatching a repeatEvent

```js
const evt = document.createEvent("TimeEvent");
evt.initTimeEvent("repeatEvent", window, 2);
svgElement.dispatchEvent(evt);
```

## See also

- `TimeEvent`
- `Document.createEvent()`
- `EventTarget.dispatchEvent()`
