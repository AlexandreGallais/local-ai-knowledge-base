---
title: "ScreenDetails"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/screendetails/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ScreenDetails

The **`ScreenDetails`** interface of the Window Management API represents the details of all the screens available to the user's device.

This information is accessed via the `Window.getScreenDetails()` method.

> **Note:**
> `ScreenDetails` is a live object, meaning that it updates as the available screens change. You can therefore keep querying the same object to get updated values, rather than repeatedly calling `getScreenDetails()`.

## Instance properties

_Inherits properties from its parent, `EventTarget`._

- `currentScreen` (read-only) (experimental)
    A single `ScreenDetailed` object representing detailed information about the screen that the current browser window is displayed in.

- `screens` (read-only) (experimental)
    An array of `ScreenDetailed` objects, each one representing detailed information about one specific screen available to the user's device.

    > **Note:**
    > `screens` only includes "extended" displays, not those that mirror another display.

## Events

- `currentscreenchange` (experimental)
    Fired when the window's current screen changes in some way — for example available width or height, or orientation.
- `screenschange` (experimental)
    Fired when screens are connected to or disconnected from the system.

## Examples

> **Note:**
> See Multi-window learning environment for a full example (see the source code also).

### Basic <example-value> information access

When `Window.getScreenDetails()` is invoked, the user will be asked for permission to manage windows on all their displays (the status of this permission can be checked using `Permissions.query()` to query `window-management`). If the user grants permission, a `ScreenDetails` object is returned. This object contains details of all the screens available to the user's system.

The below example opens a full-size window on each available display.

```js
const screenDetails = await window.getScreenDetails();

// Open a window on each screen of the device
for (const screen of screenDetails.screens) {
  openWindow(
    screen.availLeft,
    screen.availTop,
    screen.availWidth,
    screen.availHeight,
    url,
  );
}
```

### Responding to changes in available screens

You could use the `screenschange` event to detect when the available screens have changed (perhaps when a screen is plugged in or unplugged), report the change, and update window arrangements to suit the new configuration:

```js
const screenDetails = await window.getScreenDetails();

// Return the number of screens
let noOfScreens = screenDetails.screens.length;

screenDetails.addEventListener("screenschange", () => {
  // If the new number of screens is different to the old number of screens,
  // report the difference
  if (screenDetails.screens.length !== noOfScreens) {
    console.log(
      `The screen count changed from ${noOfScreens} to ${screenDetails.screens.length}`,
    );

    // Update noOfScreens value
    noOfScreens = screenDetails.screens.length;
  }

  // Open, close, or rearrange windows as needed,
  // to fit the new screen configuration
  updateWindows();
});
```

## See also

- Window Management API
