---
title: "UIEvent"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/uievent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# UIEvent

The **`UIEvent`** interface represents simple user interface events. It is part of the UI Events API, which includes various event types and interfaces related to user interactions.

`UIEvent` derives from `Event`. Although the `UIEvent.initUIEvent()` method is kept for backward compatibility, you should create a `UIEvent` object using the `UIEvent()` constructor.

Several interfaces are direct or indirect descendants of this one: `MouseEvent`, `TouchEvent`, `FocusEvent`, `KeyboardEvent`, `WheelEvent`, `InputEvent`, and `CompositionEvent`.

## Constructors

- `UIEvent()`
    Creates a `UIEvent` object.

## Instance properties

_This interface also inherits properties of its parent, `Event`._

- `UIEvent.detail` (read-only)
    Returns a `long` with details about the event, depending on the event type.
- `UIEvent.sourceCapabilities` (experimental) (read-only)
    Returns an instance of the `InputDeviceCapabilities` interface, which provides information about the physical device responsible for generating a touch event.
- `UIEvent.view` (read-only)
    Returns a WindowProxy that contains the view that generated the event.
- `UIEvent.which` (deprecated) (read-only)
    Returns the numeric `keyCode` of the key <example-value>, or the character code (`charCode`) for an alphanumeric key pressed.

## Instance methods

_This interface also inherits methods of its parent, `Event`._

- `UIEvent.initUIEvent()` (deprecated)
    Initializes a `UIEvent` object. If the event has already been dispatched, this method does nothing.

## See also

- UI Events API
- Introduction to events
- `Event`
