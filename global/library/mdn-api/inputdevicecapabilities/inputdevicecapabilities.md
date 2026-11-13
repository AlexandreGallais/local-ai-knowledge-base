---
title: "InputDeviceCapabilities: InputDeviceCapabilities() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/inputdevicecapabilities/inputdevicecapabilities/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# InputDeviceCapabilities: InputDeviceCapabilities() constructor

The `InputDeviceCapabilities()` constructor creates a new
`InputDeviceCapabilities` object provides information about the physical
device responsible for generating a touch event.

## Syntax

```js
new InputDeviceCapabilities()
new InputDeviceCapabilities(InputDeviceCapabilitiesInit)
```

### Parameters

- `InputDeviceCapabilitiesInit` (optional)
    A dictionary object containing a set of device capabilities. It contains the
    following property.
    - `fireTouchEvents`: A boolean value that indicates
      whether the device dispatches touch events.

### Return value

An instance of the `InputDeviceCapabilities` interface.
