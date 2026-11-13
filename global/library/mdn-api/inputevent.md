---
title: "InputEvent"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/inputevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# InputEvent

The **`InputEvent`** interface represents an event notifying the user of editable content changes.

## Constructor

- `InputEvent()`
    Creates an `InputEvent` object.

## Instance properties

_This interface inherits properties from its parents, `UIEvent` and `Event`._

- `InputEvent.data` (read-only)
    Returns a string with the inserted characters. This may be an empty string if the change doesn't insert text (for example, when deleting characters).
- `InputEvent.dataTransfer` (read-only)
    Returns a `DataTransfer` object containing information about richtext or plaintext data being added to or removed from editable content.
- `InputEvent.inputType` (read-only)
    Returns the type of change for editable content such as, for example, inserting, deleting, or formatting text.
- `InputEvent.isComposing` (read-only)
    Returns a `Boolean` value indicating if the event is fired after `compositionstart` and before `compositionend`.

## Instance methods

_This interface inherits methods from its parents, `UIEvent` and `Event`._

- `InputEvent.getTargetRanges()`
    Returns an array of `StaticRange` objects that will be affected by a change to the DOM if the input event is not canceled.

## See also

- `beforeinput` event
- `input` event
