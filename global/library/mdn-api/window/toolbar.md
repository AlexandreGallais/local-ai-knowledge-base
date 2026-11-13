---
title: "Window: toolbar property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/window/toolbar/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Window: toolbar property

The **`toolbar`** read-only property of the `Window` interface returns the `toolbar` object.

This is one of a group of `Window` properties that contain a boolean `visible` property, that used to represent whether or not a particular part of a web browser's user interface was visible.

For privacy and interoperability reasons, the value of the `visible` property is now `false` if this `Window` is a popup, and `true` otherwise.

## Value

An object containing a single property:

- `visible` (read-only)
    A boolean property, `false` if this `Window` is a popup, and `true` otherwise.

## See also

- `window.locationbar`
- `window.menubar`
- `window.personalbar`
- `window.scrollbars`
- `window.statusbar`
