---
title: "Selection"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/selection/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Selection

A **`Selection`** object represents the range of text selected by the user or the current position of the caret. Each `document` is associated with a unique selection object, which can be retrieved by `document.getSelection()` or `window.getSelection()` and then be examined and modified.

For general concepts related to selections, see Selection API.

## Instance properties

- `Selection.anchorNode` (read-only)
    Returns the `Node` in which the selection begins. Can return `null` if selection never existed in the document (e.g., an iframe that was never clicked on).
- `Selection.anchorOffset` (read-only)
    Returns a number representing the offset of the selection's anchor within the `anchorNode`. If `anchorNode` is a text node, this is the number of characters within anchorNode preceding the anchor. If `anchorNode` is an element, this is the number of child nodes of the `anchorNode` preceding the anchor.
- `Selection.direction` (read-only)
    A string describing the direction of the current selection.
- `Selection.focusNode` (read-only)
    Returns the `Node` in which the selection ends. Can return `null` if selection never existed in the document (e.g., an iframe that was never clicked on).
- `Selection.focusOffset` (read-only)
    Returns a number representing the offset of the selection's focus within the `focusNode`. If `focusNode` is a text node, this is the number of characters within `focusNode` preceding the focus. If `focusNode` is an element, this is the number of child nodes of the `focusNode` preceding the focus.
- `Selection.isCollapsed` (read-only)
    Returns a Boolean indicating whether the selection's start and end points are at the same position.
- `Selection.rangeCount` (read-only)
    Returns the number of ranges in the selection.
- `Selection.type` (read-only)
    Returns a string describing the type of the current selection.

## Instance methods

- `Selection.addRange()`
    A `Range` object that will be added to the selection.
- `Selection.collapse()`
    Collapses the current selection to a single point.
- `Selection.collapseToEnd()`
    Collapses the selection to the end of the last range in the selection.
- `Selection.collapseToStart()`
    Collapses the selection to the start of the first range in the selection.
- `Selection.containsNode()`
    Indicates if a certain node is part of the selection.
- `Selection.deleteFromDocument()`
    Deletes the selection's content from the document.
- `Selection.empty()`
    Removes all ranges from the selection, leaving the `anchorNode` and `focusNode` properties equal to `null` and nothing selected.
- `Selection.extend()`
    Moves the focus of the selection to a specified point.
- `Selection.getComposedRanges()`
    Returns an array of `StaticRange` objects, each that represents a selection that might cross shadow DOM boundaries.
- `Selection.getRangeAt()`
    Returns a `Range` object representing one of the ranges currently selected.
- `Selection.modify()`
    Changes the current selection.
- `Selection.removeRange()`
    Removes a range from the selection.
- `Selection.removeAllRanges()`
    Removes all ranges from the selection.
- `Selection.selectAllChildren()`
    Adds all the children of the specified node to the selection.
- `Selection.setBaseAndExtent()`
    Sets the selection to be a range including all or parts of two specified DOM nodes, and any content located between them.
- `Selection.setPosition()`
    Collapses the current selection to a single point.
- `Selection.toString()`
    Returns a string currently being represented by the selection object, i.e., the currently selected text.

## See also

- `Window.getSelection`, `Document.getSelection`, `Range`
- Selection-related events: `selectionchange` and `selectstart`
- HTML inputs provide simpler helper APIs for working with selection (see `HTMLInputElement.setSelectionRange()`)
- `Document.activeElement`, `HTMLElement.focus`, and `HTMLElement.blur`
