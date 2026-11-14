---
title: "ScreenOrientation"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/screenorientation/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ScreenOrientation

The **`ScreenOrientation`** interface of the Screen Orientation API provides information about the current orientation of the document.

A **`ScreenOrientation`** instance object can be retrieved using the `screen.orientation` property.

## Instance properties

- `ScreenOrientation.type` (read-only)
    Returns the document's current orientation type, one of `portrait-primary`, `portrait-secondary`, `landscape-primary`, or `landscape-secondary`.
- `ScreenOrientation.angle` (read-only)
    Returns the document's current orientation angle.

## Instance methods

- `ScreenOrientation.lock()`
    Locks the orientation of the containing document to its default orientation and returns a `Promise`.
- `ScreenOrientation.unlock()`
    Unlocks the orientation of the containing document from its default orientation.

## Events

Listen to these events using `addEventListener()` or by assigning an event listener to the `oneventname` property of this interface.

- `change`
    Fired whenever the screen changes orientation.

## Example

In the following example, we listen for an orientation `change` event and log the new `screen orientation type` and `angle`.

```js
screen.orientation.addEventListener("change", (event) => {
  const type = event.target.type;
  const angle = event.target.angle;
  console.log(`ScreenOrientation change: ${type}, ${angle} degrees.`);
});
```
