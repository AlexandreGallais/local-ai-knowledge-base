---
title: "Element (part 3 of 3)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element (part 3 of 3)

## Events

Listen to these events using `addEventListener()` or by assigning an event listener to the `oneventname` property of this interface.

- `afterscriptexecute` (non-standard) (deprecated)
    Fired when a script has been executed.
- `beforeinput`
    Fired when the value of an input element is about to be modified.
- `beforematch`
    Fires on an element that is in the _hidden until found_ state, when the browser is about to reveal its content because the user has found the content through the "find in page" feature or through fragment navigation.
- `beforescriptexecute` (non-standard) (deprecated)
    Fired when a script is about to be executed.
- `beforexrselect` (experimental)
    Fired before WebXR select events (`select`, `selectstart`, `selectend`) are dispatched.
- `contentvisibilityautostatechange`
    Fires on any element with `content-visibility: auto` set on it when it starts or stops being relevant to the user and skipping its contents.
- `input`
    Fires when an element's value is changed as a direct result of a user action.
- `securitypolicyviolation`
    Fired when a Content Security Policy is violated.
- `wheel`
    Fired when the user rotates a wheel button on a pointing device (typically a mouse).

### Animation events

- `animationcancel`
    Fired when an animation unexpectedly aborts.
- `animationend`
    Fired when an animation has completed normally.
- `animationiteration`
    Fired when an animation iteration has completed.
- `animationstart`
    Fired when an animation starts.

### Clipboard events

- `copy`
    Fired when the user initiates a copy action through the browser's user interface.
- `cut`
    Fired when the user initiates a cut action through the browser's user interface.
- `paste`
    Fired when the user initiates a paste action through the browser's user interface.

### Composition events

- `compositionend`
    Fired when a text composition system such as an input method editor completes or cancels the current composition session.
- `compositionstart`
    Fired when a text composition system such as an input method editor starts a new composition session.
- `compositionupdate`
    Fired when a new character is received in the context of a text composition session controlled by a text composition system such as an input method editor.

### Focus events

- `blur`
    Fired when an element has lost focus.
- `focus`
    Fired when an element has gained focus.
- `focusin`
    Fired when an element has gained focus, after `focus`.
- `focusout`
    Fired when an element has lost focus, after `blur`.

### Fullscreen events

- `fullscreenchange`
    Sent to an `Element` when it transitions into or out of fullscreen mode.
- `fullscreenerror`
    Sent to an `Element` if an error occurs while attempting to switch it into or out of fullscreen mode.

### Keyboard events

- `keydown`
    Fired when a key is pressed.
- `keypress` (deprecated)
    Fired when a key that produces a character value is pressed down.
- `keyup`
    Fired when a key is released.

### Mouse events

- `auxclick`
    Fired when a non-primary pointing device button (e.g., any mouse button other than the left button) has been pressed and released on an element.
- `click`
    Fired when a pointing device button (e.g., a mouse's primary button) is pressed and released on a single element.
- `contextmenu`
    Fired when the user attempts to open a context menu.
- `dblclick`
    Fired when a pointing device button (e.g., a mouse's primary button) is clicked twice on a single element.
- `DOMActivate` (deprecated)
    Occurs when an element is activated, for instance, through a mouse click or a keypress.
- `DOMMouseScroll` (deprecated) (non-standard)
    Occurs when mouse wheel or similar device is operated and the accumulated scroll amount is over 1 line or 1 page since last event.
- `mousedown`
    Fired when a pointing device button is pressed on an element.
- `mouseenter`
    Fired when a pointing device (usually a mouse) is moved over the element that has the listener attached.
- `mouseleave`
    Fired when the pointer of a pointing device (usually a mouse) is moved out of an element that has the listener attached to it.
- `mousemove`
    Fired when a pointing device (usually a mouse) is moved while over an element.
- `mouseout`
    Fired when a pointing device (usually a mouse) is moved off the element to which the listener is attached or off one of its children.
- `mouseover`
    Fired when a pointing device is moved onto the element to which the listener is attached or onto one of its children.
- `mouseup`
    Fired when a pointing device button is released on an element.
- `mousewheel` (deprecated) (non-standard)
    Fired when a mouse wheel or similar device is operated.
- `MozMousePixelScroll` (deprecated) (non-standard)
    Fired when a mouse wheel or similar device is operated.
- `webkitmouseforcechanged` (non-standard)
    Fired each time the amount of pressure changes on the trackpad touch screen.
- `webkitmouseforcedown` (non-standard)
    Fired after the mousedown event as soon as sufficient pressure has been applied to qualify as a "force click".
- `webkitmouseforcewillbegin` (non-standard)
    Fired before the `mousedown` event.
- `webkitmouseforceup` (non-standard)
    Fired after the `webkitmouseforcedown` event as soon as the pressure has been reduced sufficiently to end the "force click".

### Pointer events

- `gotpointercapture`
    Fired when an element captures a pointer using `setPointerCapture()`.
- `lostpointercapture`
    Fired when a captured pointer is released.
- `pointercancel`
    Fired when a pointer event is canceled.
- `pointerdown`
    Fired when a pointer becomes active.
- `pointerenter`
    Fired when a pointer is moved into the hit test boundaries of an element or one of its descendants.
- `pointerleave`
    Fired when a pointer is moved out of the hit test boundaries of an element.
- `pointermove`
    Fired when a pointer changes coordinates.
- `pointerout`
    Fired when a pointer is moved out of the _hit test_ boundaries of an element (among other reasons).
- `pointerover`
    Fired when a pointer is moved into an element's hit test boundaries.
- `pointerrawupdate`
    Fired when a pointer changes any properties that don't fire `pointerdown` or `pointerup` events.
- `pointerup`
    Fired when a pointer is no longer active.

### Scroll events

- `scroll`
    Fired when the document view or an element has been scrolled.
- `scrollend`
    Fires when the document view has completed scrolling.
- `scrollsnapchange` (experimental)
    Fired on the scroll container at the end of a scrolling operation when a new scroll snap target has been selected.
- `scrollsnapchanging` (experimental)
    Fired on the scroll container when the browser determines a new scroll snap target is pending, i.e., it will be selected when the current scroll gesture ends.

### Touch events

- `gesturechange` (non-standard)
    Fired when digits move during a touch gesture.
- `gestureend` (non-standard)
    Fired when there are no longer multiple fingers contacting the touch surface, thus ending the gesture.
- `gesturestart` (non-standard)
    Fired when multiple fingers contact the touch surface, thus starting a new gesture.
- `touchcancel`
    Fired when one or more touch points have been disrupted in an implementation-specific manner (for example, too many touch points are created).
- `touchend`
    Fired when one or more touch points are removed from the touch surface.
- `touchmove`
    Fired when one or more touch points are moved along the touch surface.
- `touchstart`
    Fired when one or more touch points are placed on the touch surface.

### Transition events

- `transitioncancel`
    An `Event` fired when a CSS transition has been canceled.
- `transitionend`
    An `Event` fired when a CSS transition has finished playing.
- `transitionrun`
    An `Event` fired when a CSS transition is created (i.e., when it is added to a set of running transitions), though not necessarily started.
- `transitionstart`
    An `Event` fired when a CSS transition has started transitioning.
