---
title: "Window Management API"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/window_management_api/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Window Management API

The **Window Management API** allows you to get detailed information on the displays connected to your device and more easily place windows on specific screens, paving the way towards more effective multi-screen applications.

## Concepts and usage

Historically, we have used `Window.open()` to manage browser windows related to the current application — opening new windows, resizing and closing existing windows, etc. For example, to open a 400×300 window 50 pixels from the left and top of your screen:

```js
const myWindow = window.open(
  "https://example.com/",
  "myWindow",
  "left=50,top=50,width=400,height=300",
);
```

You can retrieve information about your screen from the `Window.screen` property, such as how much screen space you have available to place windows in.

However, the above features are limited. `Window.screen` only returns data about the primary screen, and not secondary displays available to a device. To move a window to a secondary display, you could use `Window.moveTo()`, but you'd have to guess what coordinates to use based on where it is placed in your setup relative to the primary display.

The Window Management API provides more robust, flexible window management. It allows you to query whether your display is extended with multiple screens and get information on each screen separately: windows can then be placed on each screen as desired. It also provides event handlers to allow you to respond to changes in the available screens, new fullscreen functionality to choose which screen to put into fullscreen mode (if any), and permissions functionality to control access to the API.

For details on how to use it, see Using the Window Management API.

> **Note:**
> In modern browsers, a separate user gesture event is required for each `Window.open()` call, for security purposes. This prevents sites from spamming users with lots of windows. However, this poses an issue for multi-window applications. To work around this limitation, you can design your applications to open no more than one new window at once, reuse existing windows to display different pages, or advise users on how to update their browser settings to allow multiple windows.

### Use cases

The Window Management API is useful in cases such as:

- Multi-window graphics editors and audio processors that may wish to arrange editing tools and panels across different screens.
- Virtual trading desks that want to show market trends in multiple windows and put specific windows of interest in fullscreen mode.
- Slideshow apps that want to show speaker notes on the internal primary screen and the presentation on an external projector.

## Permissions policy integration

The `window-management` Permissions-Policy can be used to control permission to use the Window Management API. Specifically:

- Usage of the `Window.getScreenDetails()` method. If blocked, its `Promise` will reject with a `NotAllowedError` exception.
- Querying the `Window.screen.isExtended` property. If blocked, it will always return `false`.

Developers can explicitly grant permission for an `` to use Window Management via the `allow` attribute:

```html
<iframe src="3rd-party.example" allow="window-management"></iframe>
```

## Interfaces

- `ScreenDetails` (secure context)
    Represents the details of all the screens available to the user's device.
- `ScreenDetailed` (secure context)
    Represents detailed information about one specific screen available to the user's device.

### Extensions to other interfaces

- The `Screen` `change` event (secure context)
    Fired on a specific screen when it changes in some way — for example available width or height, or orientation.
- `Screen.isExtended` (secure context)
    A boolean property that returns `true` if the user's device has multiple screens, and `false` if not.
- `Element.requestFullscreen()`, the `screen` option
    Specifies on which screen you want to put the element in fullscreen mode.
- `Window.getScreenDetails()` (secure context)
    Returns a `Promise` that fulfills with a `ScreenDetails` object instance.

## Examples

You can find full examples here:

- Basic <example-value> learning environment (see the source code).
- Multi-window Platformer Game (see the source code).
- Window placement demo (see the source code).
