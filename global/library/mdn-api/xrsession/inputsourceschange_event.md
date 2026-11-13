---
title: "XRSession: inputsourceschange event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrsession/inputsourceschange_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRSession: inputsourceschange event

The **`inputsourceschange`** event is sent to an `XRSession` when the set of available WebXR input devices changes.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("inputsourceschange", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
oninputsourceschange = (event) => { }
```

## Event type

An `XRInputSourcesChangeEvent`. Inherits from `Event`.

## Description

### Trigger

Triggered when the set of available WebXR input devices changes.

### Use cases

You can use this event to detect newly-available devices or when devices have become unavailable.

## Examples

The following example shows how to set up an event handler which uses `inputsourceschange` events to detect newly-available pointing devices and to load their models in preparation for displaying them in the next animation frame.

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

You can also add a handler for `inputsourceschange` events by setting the `oninputsourceschange` event handler (but note that this replaces other event listeners added using `oninputsourceschange`, if any):

```js
xrSession.oninputsourceschange = onInputSourcesChange;
```
