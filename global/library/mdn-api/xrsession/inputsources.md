---
title: "XRSession: inputSources property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrsession/inputsources/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRSession: inputSources property

The read-only **`inputSources`** property of the
`XRSession` interface returns an `XRInputSourceArray` object
which lists all controllers and input devices which are expressly associated with the
XR device and are currently available. These controllers may include handheld
controllers, XR-equipped gloves, optically tracked hands, and gaze-based input methods.
Keyboards, gamepads, and mice are _not_ considered WebXR input sources.

> **Note:**
> Traditional gamepad controllers are supported using the Gamepad API.

## Value

An `XRInputSourceArray` object listing all of the currently-connected
input controllers which are linked specifically to the XR device currently in use. The
returned object is **live**; as devices are connected to and removed from
the user's system, the list's contents update to reflect the changes.

## Usage notes

You can add a handler for the `XRSession` event
`inputsourceschange` to be advised
when the contents of the session's connected devices list changes. You can then either
get the value of `inputSources` to examine the list, or you can refer to a
reference to the list that you've previously saved.

## See also

- `XRInputSource`
- The `inputsourceschange` event
- Gamepad API
