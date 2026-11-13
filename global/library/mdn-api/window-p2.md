---
title: "Window (part 2 of 2)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/window/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Window (part 2 of 2)

## Instance methods

_This interface inherits methods from the `EventTarget` interface._

- `Window.atob()`
    Decodes a string of data which has been encoded using base-64 encoding.
- `Window.alert()`
    Displays an alert dialog.
- `Window.blur()` (deprecated)
    Sets focus away from the window.
- `Window.btoa()`
    Creates a base-64 encoded ASCII string from a string of binary data.
- `Window.cancelAnimationFrame()`
    Enables you to cancel a callback previously scheduled with `Window.requestAnimationFrame`.
- `Window.cancelIdleCallback()`
    Enables you to cancel a callback previously scheduled with `Window.requestIdleCallback`.
- `Window.clearInterval()`
    Cancels the repeated execution set using `Window.setInterval()`.
- `Window.clearTimeout()`
    Cancels the delayed execution set using `Window.setTimeout()`.
- `Window.close()`
    Closes the current window.
- `Window.confirm()`
    Displays a dialog with a message that the user needs to respond to.
- `Window.createImageBitmap()`
    Accepts a variety of different image sources, and returns a `Promise` which resolves to an `ImageBitmap`. Optionally the source is cropped to the rectangle of pixels originating at _(sx, sy)_ with width sw, and height sh.
- `Window.dump()` (non-standard)
    Writes a message to the console.
- `Window.fetch()`
    Starts the process of fetching a resource from the network.
- `Window.fetchLater()` (experimental)
    Creates a deferred fetch, which is sent once the page is navigated away from (it is destroyed or enters the bfcache), or after a provided `activateAfter` timeout — whichever comes first.
- `Window.find()` (non-standard)
    Searches for a given string in a window.
- `Window.focus()`
    Sets focus on the current window.
- `Window.getComputedStyle()`
    Gets computed style for the specified element. Computed style indicates the computed values of all CSS properties of the element.
- `Window.getDefaultComputedStyle()` (non-standard)
    Gets default computed style for the specified element, ignoring author stylesheets.
- `Window.getScreenDetails()` (experimental) (secure context)
    Returns a `Promise` that fulfills with a `ScreenDetails` object instance representing the details of all the screens available to the user's device.
- `Window.getSelection()`
    Returns the selection object representing the selected item(s).
- `Window.matchMedia()`
    Returns a `MediaQueryList` object representing the specified media query string.
- `Window.moveBy()`
    Moves the current window by a specified amount.
- `Window.moveTo()`
    Moves the window to the specified coordinates.
- `Window.open()`
    Opens a new window.
- `Window.postMessage()`
    Provides a secure means for one window to send a string of data to another window, which need not be within the same domain as the first.
- `Window.print()`
    Opens the Print Dialog to print the current document.
- `Window.prompt()`
    Returns the text entered by the user in a prompt dialog.
- `Window.queryLocalFonts()` (experimental) (secure context)
    Returns a `Promise` that fulfills with an array of `FontData` objects representing the font faces available locally.
- `Window.queueMicrotask()`
    Queues a microtask to be executed at a safe time prior to control returning to the browser's event loop.
- `Window.reportError()`
    Reports an error in a script, emulating an unhandled exception.
- `Window.requestAnimationFrame()`
    Tells the browser that an animation is in progress, requesting that the browser schedule a repaint of the window for the next animation frame.
- `Window.requestIdleCallback()`
    Enables the scheduling of tasks during a browser's idle periods.
- `Window.requestResize()` (experimental)
    Updates the size information shared by an embedded document with its embedding parent, but only if the embedded document has opted in to sharing its size information.
- `Window.resizeBy()`
    Resizes the current window by a certain amount.
- `Window.resizeTo()`
    Dynamically resizes window.
- `Window.scroll()`
    Scrolls the window to a particular place in the document.
- `Window.scrollBy()`
    Scrolls the document in the window by the given amount.
- `Window.scrollByLines()` (non-standard)
    Scrolls the document by the given number of lines.
- `Window.scrollByPages()` (non-standard)
    Scrolls the current document by the specified number of pages.
- `Window.scrollTo()`
    Scrolls to a particular set of coordinates in the document.
- `Window.setInterval()`
    Schedules a function to execute every time a given number of milliseconds elapses.
- `Window.setTimeout()`
    Schedules a function to execute in a given amount of time.
- `Window.showDirectoryPicker()` (experimental) (secure context)
    Displays a directory picker which allows the user to select a directory.
- `Window.showOpenFilePicker()` (experimental) (secure context)
    Shows a file picker that allows a user to select a file or multiple files.
- `Window.showSaveFilePicker()` (experimental) (secure context)
    Shows a file picker that allows a user to save a file.
- `Window.sizeToContent()` (non-standard)
    Sizes the window according to its content.
- `Window.stop()`
    This method stops window loading.
- `Window.structuredClone()`
    Creates a deep clone of a given value using the structured clone algorithm.

### Deprecated methods

- `Window.captureEvents()` (deprecated)
    Registers the window to capture all events of the specified type.
- `Window.clearImmediate()` (non-standard) (deprecated)
    Cancels the repeated execution set using `setImmediate()`.
- `Window.releaseEvents()` (deprecated)
    Releases the window from trapping events of a specific type.
- `Window.requestFileSystem()` (non-standard) (deprecated)
    Lets a website or app gain access to a sandboxed file system for its own use.
- `Window.setImmediate()` (non-standard) (deprecated)
    Executes a function after the browser has finished other heavy tasks.
- `Window.setResizable()`
    Does nothing (no-op). Kept for backward compatibility with Netscape 4.x.
- `Window.webkitConvertPointFromNodeToPage()` (non-standard) (deprecated)
    Transforms a `WebKitPoint` from the node's coordinate system to the page's coordinate system.
- `Window.webkitConvertPointFromPageToNode()` (non-standard) (deprecated)
    Transforms a `WebKitPoint` from the page's coordinate system to the node's coordinate system.

## Events

Listen to these events using `addEventListener()` or by assigning an event listener to the `oneventname` property of this interface. In addition to the events listed below, many events can bubble from the `Document` contained in the window object.

- `error`
    Fired when a resource failed to load, or can't be used. For example, if a script has an execution error or an image can't be found or is invalid.
- `languagechange`
    Fired at the global scope object when the user's preferred language changes.
- `resize`
    Fired when the window has been resized.
- `storage`
    Fired when a storage area (`localStorage` or `sessionStorage`) has been modified in the context of another document.

### Connection events

- `offline`
    Fired when the browser has lost access to the network and the value of `navigator.onLine` has switched to `false`.
- `online`
    Fired when the browser has gained access to the network and the value of `navigator.onLine` has switched to `true`.

### Device orientation events

- `devicemotion` (secure context)
    Fired at a regular interval, indicating the amount of physical force of acceleration the device is receiving and the rate of rotation, if available.
- `deviceorientation` (secure context)
    Fired when fresh data is available from the magnetometer orientation sensor about the current orientation of the device as compared to the Earth coordinate frame.
- `deviceorientationabsolute` (secure context)
    Fired when fresh data is available from the magnetometer orientation sensor about the current absolute orientation of the device as compared to the Earth coordinate frame.

### Focus events

- `blur`
    Fired when the window has lost focus.
- `focus`
    Fired when the window has gained focus.

### Gamepad events

- `gamepadconnected`
    Fired when the browser detects that a gamepad has been connected or the first time a button/axis of the gamepad is used.
- `gamepaddisconnected`
    Fired when the browser detects that a gamepad has been disconnected.

### History events

- `hashchange`
    Fired when the fragment identifier of the URL has changed (the part of the URL beginning with and following the `#` symbol).
- `pagehide`
    Sent when the browser hides the current document while in the process of switching to displaying in its place a different document from the session's history. This happens, for example, when the user clicks the Back button or when they click the Forward button to move ahead in session history.
- `pagereveal`
    Fired when a document is first rendered, either when loading a fresh document from the network or activating a document (either from back/forward cache (bfcache) or prerender).
- `pageshow`
    Sent when the browser makes the document visible due to navigation tasks, including not only when the page is first loaded, but also situations such as the user navigating back to the page after having navigated to another within the same tab.
- `pageswap`
    Fired when a document is about to be unloaded due to a navigation.
- `popstate`
    Fired when the active history entry changes.

### Load & unload events

- `beforeunload`
    Fired when the window, the document and its resources are about to be unloaded.
- `load`
    Fired when the whole page has loaded, including all dependent resources such as stylesheets images.
- `unload`
    Fired when the document or a child resource is being unloaded.

### Manifest events

- `appinstalled`
    Fired when the browser has successfully installed a page as an application.
- `beforeinstallprompt`
    Fired when a user is about to be prompted to install a web application.

### Messaging events

- `message`
    Fired when the window receives a message, for example from a call to `Window.postMessage()` from another browsing context.
- `messageerror`
    Fired when a `Window` object receives a message that can't be deserialized.

### Print events

- `afterprint`
    Fired after the associated document has started printing or the print preview has been closed.
- `beforeprint`
    Fired when the associated document is about to be printed or previewed for printing.

### Promise rejection events

- `rejectionhandled`
    Sent every time a JavaScript `Promise` is rejected, regardless of whether or not there is a handler in place to catch the rejection.
- `unhandledrejection`
    Sent when a JavaScript `Promise` is rejected but there is no handler in place to catch the rejection.

### Scroll events

- `scrollsnapchange` (experimental)
    Fired on the scroll container at the end of a scrolling operation when a new scroll snap target has been selected.
- `scrollsnapchanging` (experimental)
    Fired on the scroll container when the browser determines a new scroll snap target is pending, i.e., it will be selected when the current scroll gesture ends.

### Deprecated events

- `orientationchange` (deprecated)
    Fired when the orientation of the device has changed.
- `vrdisplayactivate` (deprecated) (non-standard)
    Fired when a display is able to be presented to.
- `vrdisplayconnect` (deprecated) (non-standard)
    Fired when a compatible VR device has been connected to the computer.
- `vrdisplaydisconnect` (deprecated) (non-standard)
    Fired when a compatible VR device has been disconnected from the computer.
- `vrdisplaydeactivate` (deprecated) (non-standard)
    Fired when a display can no longer be presented to.
- `vrdisplaypresentchange` (deprecated) (non-standard)
    Fired when the presenting state of a VR device changes — i.e., goes from presenting to not presenting, or vice versa.

### Bubbled events

Not all events that bubble can reach the `Window` object. Only the following do and can be listened for on the `Window` object:

- `abort`
- `auxclick`
- `beforeinput`
- `beforematch`
- `beforetoggle`
- `cancel`
- `canplay`
- `canplaythrough`
- `change`
- `click`
- `close`
- `contextlost`
- `contextmenu`
- `contextrestored`
- `copy`
- `cuechange`
- `cut`
- `dblclick`
- `drag`
- `dragend`
- `dragenter`
- `dragleave`
- `dragover`
- `dragstart`
- `drop`
- `durationchange`
- `emptied`
- `ended`
- `formdata`
- `input`
- `invalid`
- `keydown`
- `keypress`
- `keyup`
- `loadeddata`
- `loadedmetadata`
- `loadstart`
- `mousedown`
- `mouseenter`
- `mouseleave`
- `mousemove`
- `mouseout`
- `mouseover`
- `mouseup`
- `paste`
- `pause`
- `play`
- `playing`
- `progress`
- `ratechange`
- `reset`
- `scrollend`
- `securitypolicyviolation`
- `seeked`
- `seeking`
- `select`
- `slotchange`
- `stalled`
- `submit`
- `suspend`
- `timeupdate`
- `toggle`
- `volumechange`
- `waiting`
- `wheel`

## Interfaces

See DOM Reference.

## Listening for events on Window

HTML elements have three ways to listen for events:

- Add an event listener to the element using the `EventTarget.addEventListener` method.
- Assign an event handler to the element's `oneventname` property in JavaScript.
- Add an `on`-prefixed attribute to the element in the HTML.

To listen for events on `Window` objects, in general, you can only use the first two methods, because `Window` has no corresponding HTML element. However, there's a specific group of events whose listeners can be added to the `<body>` (or the deprecated `<frameset>`) element that's owned by the `Window`'s document, using the second or third methods. These events are:

- `afterprint`
- `beforeprint`
- `beforeunload`
- `blur`
- `error`
- `focus`
- `hashchange`
- `languagechange`
- `load`
- `message`
- `messageerror`
- `offline`
- `online`
- `pagehide`
- `pagereveal`
- `pageshow`
- `pageswap`
- `popstate`
- `rejectionhandled`
- `resize`
- `scroll`
- `storage`
- `unhandledrejection`
- `unload`

This means the following are strictly equivalent:

```js
window.onresize = (e) => console.log(e.currentTarget);
document.body.onresize = (e) => console.log(e.currentTarget);
```

```html
<body onresize="console.log(event.currentTarget)"></body>
```

In all three cases, you see the `Window` object logged as `currentTarget`.
