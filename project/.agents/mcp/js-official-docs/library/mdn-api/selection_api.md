---
title: "Selection API"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/selection_api/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Selection API

> **Note:**
> This API is _not available_ in Web Workers (not exposed via `WorkerNavigator`).

The **Selection API** enables developers to access and manipulate the portion of a document selected by the user.

The API includes capabilities to:

- Access the currently selected nodes
- Modify the current selection, expanding or collapsing it or selecting an entirely different part of the document
- Delete parts of the current selection from the DOM
- React to events indicating that a selection is started or changed

## Concepts and usage

The selection gesture is performed as follows:

- The mouse button is first pressed somewhere on the document. This point is the **_anchor_** of the selection. As the user changes the selection using the mouse or the keyboard, the anchor does not move.
- While holding down the button, another point, the **_focus_**, is moved around the document (starting at the anchor position), controlled by either the mouse or the keyboard.

  > **Note:**
  > This is not the same as the focused _element_ of the document, as returned by `document.activeElement`.

- The mouse button is released, and the selection is finalized. The focus is the position where the mouse button was released.

At each time, the selection consists of a contiguous part of a document, represented by a `Range` object. A range can contain entire nodes as well as portions of nodes (such as a portion of a text node). In supporting browsers, a selection can also contain multiple ranges.

Each `Range` object has two boundary points. The one that comes first in tree order is called the _start_ and the other is called the _end_. Because a selection can either be made in forward direction (for example, in a left-to-right document, by dragging the mouse to the right in the same line) or in backward direction, the start can be either the anchor or the focus of the selection, and similarly for the end.

### String representation of a selection

In JavaScript, when an object is passed to a function expecting a string (like `window.alert()` or `document.write()`), the object's `toString()` method is called and the returned value is passed to the function.
This can make the object appear to be a string when used with other functions when it is really an object with properties and methods.

```js
const selection = window.getSelection();
alert(selection); // Shows a string
```

However, not all functions call `toString()` automatically.
To convert a `Selection` object to a string, call its `toString()` method directly:

```js
const selectedText = selection.toString();
```

### Multiple ranges in a selection

The specification requires the `Selection` object to only hold at most one `Range`, accessed as follows:

```js
const selObj = window.getSelection();
const range = selObj.getRangeAt(0);
```

However, the `Selection` interface was designed as if it can hold multiple ranges. As the Selection API specification notes, the Selection API was initially created by Netscape and allowed multiple ranges, but there were many bugs, so this feature was deliberately restricted. Nevertheless, Firefox still has a fully functional multiple-selection UX: you can programmatically add/remove multiple ranges in Firefox, as well as select multiple ranges by holding the `Ctrl`/`Cmd` key.

### Selection and input focus

Selection and input focus (indicated by `Document.activeElement`) have a complex relationship that varies by browser. In cross-browser compatible code, it's better to handle them separately.

Safari and Chrome (unlike Firefox) currently focus the element containing selection when modifying the selection programmatically; it's possible that this may change in the future (see W3C bug 14383 and WebKit bug 38696).

### Behavior of Selection API in terms of editing host focus changes

An _editing host_ is an editable element (e.g., an HTML element with `contenteditable` set, or the HTML child of a document that has `designMode` enabled). The Selection API has a common behavior (i.e., shared between browsers) that governs how focus behavior changes for editing hosts after certain methods are called.

> **Note:**
> `` and `<textarea>` elements are not editing hosts. Their selections, managed by methods like `HTMLInputElement.setSelectionRange()`, are unrelated to the Selection API and the behavior introduced here doesn't apply.

The behavior is as follows:

1. An editing host gains focus if the previous selection was outside of it.
2. A Selection API method is called, causing a new selection to be made with the selection range inside the editing host.
3. Focus then moves to the editing host.

> **Note:**
> The Selection API methods may only move focus to an editing host, not to other focusable elements (e.g., ``).

The above behavior applies to selections made using the following methods:

- `Selection.collapse()`
- `Selection.collapseToStart()`
- `Selection.collapseToEnd()`
- `Selection.extend()`
- `Selection.selectAllChildren()`
- `Selection.addRange()`
- `Selection.setBaseAndExtent()`

And when the `Range` is modified using the following methods:

- `Range.setStart()`
- `Range.setEnd()`
- `Range.setStartBefore()`
- `Range.setStartAfter()`
- `Range.setEndBefore()`
- `Range.setEndAfter()`
- `Range.collapse()`
- `Range.selectNode()`
- `Range.selectNodeContents()`

## Interfaces

- `Selection`
    An interface which represents the part of the document selected by the user or the current position of the caret.

## Extensions to other interfaces

### Window

- `Window.getSelection()`
    A method returning a `Selection` object representing the current selection or current position of the caret.

### Document

- `Document.getSelection()`
    A method returning a `Selection` object representing the current selection or current position of the caret.
- `selectionchange`
    An event which is fired when the current selection is changed.

### Node

- `selectstart`
    An event which is fired when a user starts a new selection.
