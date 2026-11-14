---
title: "XRSession: domOverlayState property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrsession/domoverlaystate/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRSession: domOverlayState property

The _read-only_ **`domOverlayState`** property of an `immersive-ar`
`XRSession` provides information about the DOM overlay, if the feature is enabled.

## Value

Returns `null` if the DOM overlay feature is not supported or not enabled or an object containing information about the DOM overlay state with the following properties:

- `type`
    A string indicating how the DOM overlay is being displayed. Possible values:
    - `screen`
        The overlay is drawn on the entire screen-based device (for handheld AR devices).
    - `head-locked`
        The overlay is drawn at a head-locked UI that fills the renderable viewport and follows the user's head movement.
    - `floating`
        The overlay appears as a rectangle floating in space that's kept in front of the user. It doesn't necessarily fill up the entire space and/or is strictly head-locked.

## Examples

### Checking which DOM overlay got enabled

```js
if (session.domOverlayState) {
  console.log(session.domOverlayState.type);
} else {
  console.log("DOM overlay not supported or enabled!");
}
```

## See also

- `beforexrselect`
