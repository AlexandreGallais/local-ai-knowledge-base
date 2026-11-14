---
title: "EditContext"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/editcontext/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# EditContext

The **`EditContext`** interface represents the text edit context of an element that was made editable by using the `EditContext API`.

The `EditContext API` can be used to build rich text editors on the web that support advanced text input experiences, such as Input Method Editor (IME) composition, emoji picker, or any other platform-specific editing-related UI surfaces.

## Constructor

- `EditContext()` (experimental)
    Returns a new `EditContext` instance.

## Instance properties

- `EditContext.text` (read-only) (experimental)
    The editable content of the element.
- `EditContext.selectionStart` (read-only) (experimental)
    The offset, within the editable text content, of the start of the current selection.
- `EditContext.selectionEnd` (read-only) (experimental)
    The offset, within the editable text content, of the end of the current selection.
- `EditContext.characterBoundsRangeStart` (read-only) (experimental)
    The offset, within the editable text content, where the last IME composition started.

## Instance methods

_`EditContext` is based on the `EventTarget` interface, and includes its methods._

- `EditContext.attachedElements()` (experimental)
    An `Array` containing one `HTMLElement` object which is the element that's associated with the `EditContext` object.
- `EditContext.characterBounds()` (experimental)
    The list of bounding rectangles for the characters in the `EditContext` object.
- `EditContext.updateText()` (experimental)
    Updates the internal text content of the `EditContext` object.
- `EditContext.updateSelection()` (experimental)
    Updates the internal state of the selection within the editable text context.
- `EditContext.updateControlBounds()` (experimental)
    Informs the operating system about the position and size of the editable text region.
- `EditContext.updateSelectionBounds()` (experimental)
    Informs the operating system about the position and size of the selection within the editable text region.
- `EditContext.updateCharacterBounds()` (experimental)
    Informs the operating system about the position and size of the characters in the `EditContext` object.

## Events

- `textupdate` (experimental)
    Fired when the user has made changes to the text or selection.
- `textformatupdate` (experimental)
    Fired when composition using an Input Method Editor (IME) window is happening and the IME decides that certain parts of the text being composed should be formatted differently to indicate the composition state.
- `characterboundsupdate` (experimental)
    Fired when the operating system needs to know the size and position of certain characters within the editable text region of the `EditContext` object, in order to display an IME window.
- `compositionstart` (experimental)
    Fired when composition using an IME window is starting.
- `compositionend` (experimental)
    Fired when composition using an IME window is ending.
