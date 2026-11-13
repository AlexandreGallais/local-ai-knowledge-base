---
title: "InputDeviceCapabilities"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/inputdevicecapabilities/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# InputDeviceCapabilities

The **`InputDeviceCapabilities`** interface of the `Input Device Capabilities API` provides information about the physical device or a group of related devices responsible for generating input events. Events caused by the same physical input device get the same instance of this object, but the converse isn't true. For example, two mice with the same capabilities in a system may appear as a single `InputDeviceCapabilities` instance.

In some instances, `InputDeviceCapabilities` represents the capabilities of logical devices rather than physical devices. This allows, for example, touchscreen keyboards and physical keyboards to be represented the same way when they produce the same input.

## Constructors

- `InputDeviceCapabilities()` (experimental)
    Creates an `InputDeviceCapabilities` object.

## Instance properties

- `InputDeviceCapabilities.firesTouchEvents` (read-only) (experimental)
    A `Boolean` that indicates whether the device dispatches touch events.

## Instance methods

None.
