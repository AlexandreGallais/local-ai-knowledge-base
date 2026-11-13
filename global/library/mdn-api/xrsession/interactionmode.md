---
title: "XRSession: interactionMode property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrsession/interactionmode/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRSession: interactionMode property

The `XRSession` interface's _read-only_ **`interactionMode`** property
describes the best space (according to the user agent) for the application to draw an interactive UI for the current session.

## Value

A string describing the best space (according to the user agent) for the application to draw an interactive UI
for the current session.

Possible values are:

- `screen-space`
    Indicates that the UI should be drawn directly to the screen without projection. This is typically the mode reported from handheld devices.
- `world-space`
    Indicates that the UI should be drawn in the world, some distance from the user, so that they may interact with it using controllers. This is typically the mode reported from headworn devices.

## Examples

```js
if (xrSession.interactionMode === "world-space") {
  // draw UI in the world
} else {
  // draw UI directly to the screen
}
```
