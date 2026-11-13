---
title: "ScreenDetails: screenschange event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/screendetails/screenschange_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ScreenDetails: screenschange event

The **`screenschange`** event of the `ScreenDetails` interface is fired when the set of screens available to the system has changed: that is, a new screen has become available or an existing screen has become unavailable. This will be reflected in a change in the `screens` array.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("screenschange", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onscreenschange = (event) => { }
```

## Event type

A generic `Event`.

## Examples

You could use the `screenschange` event to detect when the available screens have changed, report the change, close all windows, and then reopen them all to suit the new configuration:

```js
const screenDetails = await window.getScreenDetails();

// Return the number of screens
let noOfScreens = screenDetails.screens.length;

screenDetails.addEventListener("screenschange", () => {
  // If the new number of screens is different to the old number of screens, report the difference
  if (screenDetails.screens.length !== noOfScreens) {
    console.log(
      `The screen count changed from ${noOfScreens} to ${screenDetails.screens.length}`,
    );

    // Update noOfScreens value
    noOfScreens = screenDetails.screens.length;
  }

  // Open, close, or rearrange windows as needed, to fit the new screen configuration
  updateWindows();
});
```

## See also

- Window Management API
