---
title: "ScreenDetails: currentscreenchange event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/screendetails/currentscreenchange_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ScreenDetails: currentscreenchange event

The **`currentscreenchange`** event of the `ScreenDetails` interface is fired when the `ScreenDetails.currentScreen` changes in one of the following ways:

- The current screen changes to a different screen, i.e., the current browser window is moved to a different screen.
- One or more of the following properties change on the current screen:
  - `width`
  - `height`
  - `availWidth`
  - `availHeight`
  - `colorDepth`
  - `orientation`
- One or more of the following values change:
  - The screen's **position** ((x,y) coordinates of the top-left corner) inside the OS virtual screen arrangement, relative to the multi-screen origin
  - The screen's **available position** ((x,y) coordinates of the top-left corner) inside the OS virtual screen arrangement, relative to the multi-screen origin. This is equal to the screen position, plus the width/height of any OS UI elements drawn on the top-left of the screen — windows cannot be placed in those areas
  - `devicePixelRatio`
  - `label`
  - The screen's designation as primary or secondary (see `isPrimary`)
  - The screen's designation as internal or external (see `isInternal`)

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("currentscreenchange", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
oncurrentscreenchange = (event) => { }
```

## Event type

A generic `Event`.

## Examples

```js
const screenDetails = await window.getScreenDetails();
screenDetails.addEventListener("currentscreenchange", (event) => {
  const details = screenDetails.currentScreen;
  console.log("The current screen has changed.", event, details);
});
```

## See also

- Window Management API
