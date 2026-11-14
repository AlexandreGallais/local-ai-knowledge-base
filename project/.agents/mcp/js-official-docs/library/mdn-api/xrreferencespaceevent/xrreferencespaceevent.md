---
title: "XRReferenceSpaceEvent: XRReferenceSpaceEvent() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrreferencespaceevent/xrreferencespaceevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRReferenceSpaceEvent: XRReferenceSpaceEvent() constructor

The **`XRReferenceSpaceEvent()`**
constructor is used to create a new `XRReferenceSpaceEvent` object, which
represents an event regarding the state of a WebXR reference space object,
`XRReferenceSpace`.

## Syntax

```js
new XRReferenceSpaceEvent(type, options)
```

### Parameters

- `type`
    A string with the name of the event.
    It is case-sensitive and browsers always set it to `reset`.
- `options`
    An object that, _in addition of the properties defined in `Event()`_, can have the following properties:
    - `referenceSpace`
        The `XRReferenceSpace` from which the event originates.
    - `transform`
        An `XRRigidTransform` which maps the old coordinate system (from before the changes indicated by this event) to the new coordinate system.

### Return value

A new `XRReferenceSpaceEvent` object, initialized as defined by the input parameters.

## Examples

This simple snippet calls the constructor to create a new reference space event of type `reset`.

```js
let refSpaceEvent = new XRReferenceSpaceEvent("reset", {
  referenceSpace: myRefSpace,
  transform: myTransform,
});
```
