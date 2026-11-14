---
title: "XRInputSourcesChangeEvent"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrinputsourceschangeevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRInputSourcesChangeEvent

The WebXR Device API interface **`XRInputSourcesChangeEvent`** is used to represent the `inputsourceschange` event sent to an `XRSession` when the set of available WebXR input controllers changes.

## Constructor

- `XRInputSourcesChangeEvent()`
    Creates and returns a new `XRInputSourcesChangeEvent` object. The specified type must be `inputsourceschange`, which is the only event that uses this interface.

## Instance properties

- `added` (read-only)
    An array of zero or more `XRInputSource` objects, each representing an input device which has been newly connected or enabled for use.
- `removed` (read-only)
    An array of zero or more `XRInputSource` objects representing the input devices newly connected or enabled for use.
- `session` (read-only)
    The `XRSession` to which this input source change event is being directed.

## Instance methods

_While `XRInputSourcesChangeEvent` defines no methods of its own, it inherits methods from its parent interface, `Event`._

## Event types

- `inputsourceschange`
    Delivered to the `XRSession` when the set of input devices available to it changes.

## Examples

The following example shows how to set up an event handler which uses `inputsourceschange` events to detect newly-available pointing devices and to load their models in preparation to display them in the next animation frame.

```js
xrSession.addEventListener("inputsourceschange", onInputSourcesChange);

function onInputSourcesChange(event) {
  for (const input of event.added) {
    if (input.targetRayMode === "tracked-pointer") {
      loadControllerMesh(input);
    }
  }
}
```

You can also add a handler for `inputsourceschange` events by setting the `oninputsourceschange` event handler:

```js
xrSession.oninputsourceschange = onInputSourcesChange;
```
