---
title: "Window (part 1 of 2)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/window/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Window

The **`Window`** interface represents a window containing a DOM document; the `document` property points to the DOM document loaded in that window.

A window for a given document can be obtained using the `document.defaultView` property.

A global variable, `window`, representing the window in which the script is running, is exposed to JavaScript code.

The `Window` interface is home to a variety of functions, namespaces, objects, and constructors which are not necessarily directly associated with the concept of a user interface window. However, the `Window` interface is a suitable place to include these items that need to be globally available. Many of these are documented in the JavaScript Reference and the DOM Reference.

In a tabbed browser, each tab is represented by its own `Window` object; the global `window` seen by JavaScript code running within a given tab always represents the tab in which the code is running. That said, even in a tabbed browser, some properties and methods still apply to the overall window that contains the tab, such as `resizeTo()` and `innerHeight`. Generally, anything that can't reasonably pertain to a tab pertains to the window instead.

## Instance properties

_This interface inherits properties from the `EventTarget` interface._

Note that properties which are objects (e.g., for overriding the prototype of built-in elements) are listed in a separate section below.

- `Window.caches` (read-only) (secure context)
    Returns the `CacheStorage` object associated with the current context. This object enables functionality such as storing assets for offline use, and generating custom responses to requests.
- `Window.clientInformation` (read-only)
    An alias for `Window.navigator`.
- `Window.closed` (read-only)
    This property indicates whether the current window is closed or not.
- `Window.cookieStore` (read-only) (secure context)
    Returns a reference to the `CookieStore` object for the current document context.
- `Window.crashReport` (read-only) (secure context) (experimental)
    Returns a `CrashReportContext` object that enables arbitrary data to be recorded for the current top-level browsing context, which is then added to a `CrashReport` and sent to a reporting endpoint when a browser crash occurs.
- `Window.credentialless` (read-only) (experimental)
    Returns a boolean that indicates whether the current document was loaded inside a credentialless ``. See IFrame credentialless for more details.
- `Window.crossOriginIsolated` (read-only)
    Returns a boolean value that indicates whether the website is in a cross-origin isolation state.
- `Window.crypto` (read-only)
    Returns the `Crypto` object associated to the global object.
- `Window.customElements` (read-only)
    Returns a reference to the `CustomElementRegistry` object, which can be used to register new custom elements and get information about previously registered custom elements.
- `Window.devicePixelRatio` (read-only)
    Returns the ratio between physical pixels and device independent pixels in the current display.
- `Window.document` (read-only)
    Returns a reference to the document that the window contains.
- `Window.documentPictureInPicture` (read-only) (secure context)
    Returns a reference to the document Picture-in-Picture window for the current document context.
- `Window.fence` (read-only) (deprecated)
    Returns a `Fence` object instance for the current document context. Available only to documents embedded inside a `<fencedframe>`.
- `Window.frameElement` (read-only)
    Returns the element in which the window is embedded, or null if the window is not embedded.
- `Window.frames` (read-only)
    Returns an array of the subframes in the current window.
- `Window.fullScreen` (non-standard)
    This property indicates whether the window is displayed in full screen or not.
- `Window.history` (read-only)
    Returns a reference to the history object.
- `Window.indexedDB` (read-only)
    Provides a mechanism for applications to asynchronously access capabilities of indexed databases; returns an `IDBFactory` object.
- `Window.innerHeight` (read-only)
    Gets the height of the content area of the browser window including, if rendered, the horizontal scrollbar.
- `Window.innerWidth` (read-only)
    Gets the width of the content area of the browser window including, if rendered, the vertical scrollbar.
- `Window.isSecureContext` (read-only)
    Returns a boolean indicating whether the current context is secure (`true`) or not (`false`).
- `Window.launchQueue` (read-only) (experimental)
    When a progressive web app (PWA) is launched with a `launch_handler` `client_mode` value of `focus-existing`, `navigate-new`, or `navigate-existing`, the `launchQueue` provides access to the `LaunchQueue` class, which allows custom launch navigation handling to be implemented for the PWA.
- `Window.length` (read-only)
    Returns the number of frames in the window. See also `window.frames`.
- `Window.localStorage` (read-only)
    Returns a reference to the local storage object used to store data that may only be accessed by the origin that created it.
- `Window.location`
    Gets/sets the location, or current URL, of the window object.
- `Window.locationbar` (read-only)
    Returns the locationbar object.
- `Window.menubar` (read-only)
    Returns the menubar object.
- `Window.mozInnerScreenX` (read-only) (non-standard)
    Returns the horizontal (X) coordinate of the top-left corner of the window's viewport, in screen coordinates. This value is reported in CSS pixels. See `mozScreenPixelsPerCSSPixel` in `nsIDOMWindowUtils` for a conversion factor to adapt to screen pixels if needed.
- `Window.mozInnerScreenY` (read-only) (non-standard)
    Returns the vertical (Y) coordinate of the top-left corner of the window's viewport, in screen coordinates. This value is reported in CSS pixels. See `mozScreenPixelsPerCSSPixel` for a conversion factor to adapt to screen pixels if needed.
- `Window.name`
    Gets/sets the name of the window.
- `Window.navigation` (read-only)
    Returns the current `window`'s associated `Navigation` object. The entry point for the Navigation API.
- `Window.navigator` (read-only)
    Returns a reference to the navigator object.
- `Window.opener`
    Returns a reference to the window that opened this current window.
- `Window.origin` (read-only)
    Returns the global object's origin, serialized as a string.
- `Window.originAgentCluster` (read-only)
    Returns `true` if this window belongs to an origin-keyed agent cluster.
- `Window.outerHeight` (read-only)
    Gets the height of the outside of the browser window.
- `Window.outerWidth` (read-only)
    Gets the width of the outside of the browser window.
- `Window.pageXOffset` (read-only)
    An alias for `window.scrollX`.
- `Window.pageYOffset` (read-only)
    An alias for `window.scrollY`.
- `Window.parent` (read-only)
    Returns a reference to the parent of the current window or subframe.
- `Window.performance` (read-only)
    Returns a `Performance` object, which includes the `timing` and `navigation` attributes, each of which is an object providing performance-related data. See also Using Navigation Timing for additional information and examples.
- `Window.personalbar` (read-only)
    Returns the personalbar object.
- `Window.scheduler` (read-only)
    Returns the `Scheduler` object associated with the current context. This is the entry point for using the Prioritized Task Scheduling API.
- `Window.screen` (read-only)
    Returns a reference to the screen object associated with the window.
- `Window.screenX` and `Window.screenLeft` (read-only)
    Both properties return the horizontal distance from the left border of the user's browser window to the left side of the screen.
- `Window.screenY` and `Window.screenTop` (read-only)
    Both properties return the vertical distance from the top border of the user's browser window to the top side of the screen.
- `Window.scrollbars` (read-only)
    Returns the scrollbars object.
- `Window.scrollMaxX` (non-standard) (read-only)
    The maximum offset that the window can be scrolled to horizontally, that is the document width minus the viewport width.
- `Window.scrollMaxY` (non-standard) (read-only)
    The maximum offset that the window can be scrolled to vertically (i.e., the document height minus the viewport height).
- `Window.scrollX` (read-only)
    Returns the number of pixels that the document has already been scrolled horizontally.
- `Window.scrollY` (read-only)
    Returns the number of pixels that the document has already been scrolled vertically.
- `Window.self` (read-only)
    Returns an object reference to the window object itself.
- `Window.sessionStorage` (read-only)
    Returns a reference to the session storage object used to store data that may only be accessed by the origin that created it.
- `Window.sharedStorage` (read-only) (secure context) (deprecated) (non-standard)
    Returns the `WindowSharedStorage` object for the current origin. This is the main entry point for writing data to shared storage using the Shared Storage API.
- `Window.speechSynthesis` (read-only)
    Returns a `SpeechSynthesis` object, which is the entry point into using Web Speech API speech synthesis functionality.
- `Window.statusbar` (read-only)
    Returns the statusbar object.
- `Window.toolbar` (read-only)
    Returns the toolbar object.
- `Window.top` (read-only)
    Returns a reference to the topmost window in the window hierarchy. This property is read only.
- `Window.trustedTypes` (read-only)
    Returns the `TrustedTypePolicyFactory` object associated with the global object, providing the entry point for using the `Trusted Types API`.
- `Window.viewport` (experimental) (read-only)
    Returns a `Viewport` object instance, which provides information about the current state of the device's viewport.
- `Window.visualViewport` (read-only)
    Returns a `VisualViewport` object which represents the visual viewport for a given window.
- `Window.window` (read-only)
    Returns a reference to the current window.
- `window[0]`, `window[1]`, etc.
    Returns a reference to the `window` object in the frames. See `Window.frames` for more details.
- Named properties
    Some elements in the document are also exposed as window properties:
    - For each ``, `<form>`, ``, ``, and `<object>` element, its `name` (if non-empty) is exposed.
      For example, if the document contains `<form name="my_form">`, then `window["my_form"]` (and its equivalent `window.my_form`) returns a reference to that element.
    - For each HTML element, its `id` (if non-empty) is exposed.

    If a property corresponds to a single element, that element is directly returned. If the property corresponds to multiple elements, then an `HTMLCollection` is returned containing all of them. If any of the elements is a navigable `` or `<object>`, then the `contentWindow` of first such iframe is returned instead.

### Deprecated properties

- `Window.event` (deprecated) (read-only)
    Returns the **current event**, which is the event currently being handled by the JavaScript code's context, or `undefined` if no event is currently being handled. The `Event` object passed directly to event handlers should be used instead whenever possible.
- `Window.external` (deprecated) (read-only)
    Returns an object with functions for adding external search providers to the browser.
- `Window.orientation` (deprecated) (read-only)
    Returns the orientation in degrees (in 90 degree increments) of the viewport relative to the device's natural orientation.
- `Window.status` (deprecated)
    Gets/sets the text in the statusbar at the bottom of the browser.
