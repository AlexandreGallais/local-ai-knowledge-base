---
title: "XRInputSourcesChangeEvent: XRInputSourcesChangeEvent() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrinputsourceschangeevent/xrinputsourceschangeevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRInputSourcesChangeEvent: XRInputSourcesChangeEvent() constructor

The **`XRInputSourcesChangeEvent()`**
constructor creates and returns a new `XRInputSourcesChangeEvent` object,
representing an update to the list of available WebXR input devices. You
won't typically call this constructor yourself, as these events are created and sent to
you by the WebXR system.

## Syntax

```js
new XRInputSourcesChangeEvent(type, options)
```

### Parameters

- `type`
    A string with the name of the event.
    It is case-sensitive and browsers always set it to `inputsourceschange`.
- `options`
    An object that, _in addition of the properties defined in `Event()`_, can have the following properties:
    - `added`
        An array of zero or more `XRInputSource` objects, each representing one input device which is newly available to use.
    - `removed`
        An array of zero or more `XRInputSource` objects representing the input devices which are no longer available.
    - `session`
        The `XRSession` to which the event applies.

### Return value

A new `XRInputSourcesChangeEvent` object configured based upon
the input parameters provided.

## Examples

The following snippet of code creates a new `XRInputSourcesChangeEvent`
object indicating that a single new input source, described by an
`XRInputSource` object named `newInputSource`, has been added to
the system.

```js
let iscEvent = new XRInputSourcesChangeEvent("inputsourceschange", {
  session: xrSession,
  added: [newInputSource],
  removed: [],
});
```
