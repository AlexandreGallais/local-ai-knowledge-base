---
title: "Document (part 2 of 2)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/document/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Document (part 2 of 2)

## Instance methods

_This interface also inherits from the `Node` and `EventTarget` interfaces._

- `Document.adoptNode()`
    Adopt node from an external document.
- `Document.append()`
    Inserts a set of `Node` objects or strings after the last child of the document.
- `Document.ariaNotify()`
    Specifies that a given string of text should be announced by a screen reader.
- `Document.browsingTopics()` (non-standard) (deprecated)
    Returns a promise that fulfills with an array of objects representing the top topics for the user, one from each of the last three epochs. By default, the method also causes the browser to record the current page visit as observed by the caller, so the page's hostname can later be used in topics calculation. See the Topics API for more details.
- `Document.captureEvents()` (deprecated)
    See `Window.captureEvents`.
- `Document.caretPositionFromPoint()`
    Returns a `CaretPosition` object containing the DOM node containing the caret, and caret's character offset within that node.
- `Document.caretRangeFromPoint()` (non-standard)
    Gets a `Range` object for the document fragment under the specified coordinates.
- `Document.createAttribute()`
    Creates a new `Attr` object and returns it.
- `Document.createAttributeNS()`
    Creates a new attribute node in a given namespace and returns it.
- `Document.createCDATASection()`
    Creates a new CDATA node and returns it.
- `Document.createComment()`
    Creates a new comment node and returns it.
- `Document.createDocumentFragment()`
    Creates a new document fragment.
- `Document.createElement()`
    Creates a new element with the given tag name.
- `Document.createElementNS()`
    Creates a new element with the given tag name and namespace URI.
- `Document.createEvent()` (deprecated)
    Creates an event object.
- `Document.createNodeIterator()`
    Creates a `NodeIterator` object.
- `Document.createProcessingInstruction()`
    Creates a new `ProcessingInstruction` object.
- `Document.createRange()`
    Creates a `Range` object.
- `Document.createTextNode()`
    Creates a text node.
- `Document.createTouch()` (deprecated) (non-standard)
    Creates a `Touch` object.
- `Document.createTouchList()` (deprecated) (non-standard)
    Creates a `TouchList` object.
- `Document.createTreeWalker()`
    Creates a `TreeWalker` object.
- `Document.elementFromPoint()`
    Returns the topmost element at the specified coordinates.
- `Document.elementsFromPoint()`
    Returns an array of all elements at the specified coordinates.
- `Document.enableStyleSheetsForSet()` (deprecated) (non-standard)
    Enables the style sheets for the specified style sheet set.
- `Document.exitFullscreen()`
    Stops document's fullscreen element from being displayed fullscreen.
- `Document.exitPictureInPicture()`
    Remove the video from the floating picture-in-picture window back to its original container.
- `Document.exitPointerLock()`
    Release the pointer lock.
- `Document.getAnimations()`
    Returns an array of all `Animation` objects currently in effect, whose target elements are descendants of the `document`.
- `Document.getBoxQuads()` (experimental)
    Returns a list of `DOMQuad` objects representing the CSS fragments of the node.
- `Document.getElementById()`
    Returns an object reference to the identified element.
- `Document.getElementsByClassName()`
    Returns a list of elements with the given class name.
- `Document.getElementsByTagName()`
    Returns a list of elements with the given tag name.
- `Document.getElementsByTagNameNS()`
    Returns a list of elements with the given tag name and namespace.
- `Document.getSelection()`
    Returns a `Selection` object representing the range of text selected by the user, or the current position of the caret.
- `Document.hasPrivateToken()` (experimental)
    Returns a promise that fulfills with a boolean indicating whether the browser has a private state token <example-value> from a particular issuer.
- `Document.hasRedemptionRecord()` (experimental)
    Returns a promise that fulfills with a boolean indicating whether the browser has a redemption record originating from a particular issuer.
- `Document.hasStorageAccess()`
    Returns a `Promise` that resolves with a boolean value indicating whether the document has access to unpartitioned cookies.
- `Document.hasUnpartitionedCookieAccess()`
    New name for `Document.hasStorageAccess()`.
- `Document.importNode()`
    Returns a clone of a node from an external document.
- `Document.moveBefore()`
    Moves a given `Node` inside the `Document` DOM node as a direct child, before a given reference node, without removing and then inserting the node.
- `Document.mozSetImageElement()` (non-standard)
    Allows you to change the element being used as the background image for a specified element ID.
- `Document.prepend()`
    Inserts a set of `Node` objects or strings before the first child of the document.
- `Document.querySelector()`
    Returns the first Element node within the document, in document order, that matches the specified selectors.
- `Document.querySelectorAll()`
    Returns a list of all the Element nodes within the document that match the specified selectors.
- `Document.releaseCapture()` (non-standard)
    Releases the current mouse capture if it's on an element in this document.
- `Document.releaseEvents()` (deprecated)
    See `Window.releaseEvents()`.
- `Document.replaceChildren()`
    Replaces the existing children of a document with a specified new set of children.
- `Document.requestStorageAccess()`
    Allows a document loaded in a third-party context (i.e., embedded in an ``) to request access to unpartitioned cookies, in cases where user agents by default block access to unpartitioned cookies by sites loaded in a third-party context to improve privacy.
- `Document.requestStorageAccessFor()` (deprecated) (non-standard)
    Allows top-level sites to request third-party cookie access on behalf of embedded content originating from another site in the same related website set.
- `Document.startViewTransition()`
    Starts a new `view transition` and returns a `ViewTransition` object to represent it.

The `Document` interface is extended with the `XPathEvaluator` interface:

- `Document.createExpression()`
    Compiles an `XPathExpression` which can then be used for (repeated) evaluations.
- `Document.createNSResolver()` (deprecated)
    Returns the input node as-is.
- `Document.evaluate()`
    Evaluates an XPath expression.

### Extension for HTML documents

The `Document` interface for HTML documents inherit from the `HTMLDocument` interface or is extended for such documents:

- `Document.clear()` (deprecated)
    This method does nothing.
- `Document.close()`
    Closes a document stream for writing.
- `Document.execCommand()` (deprecated) (non-standard)
    On an editable document, executes a formatting command.
- `Document.getElementsByName()`
    Returns a list of elements with the given name.
- `Document.hasFocus()`
    Returns `true` if the focus is currently located anywhere inside the specified document.
- `Document.open()`
    Opens a document stream for writing.
- `Document.queryCommandEnabled()` (deprecated) (non-standard)
    Returns true if the formatting command can be executed on the current range.
- `Document.queryCommandIndeterm()` (deprecated) (non-standard)
    Returns true if the formatting command is in an indeterminate state on the current range.
- `Document.queryCommandState()` (deprecated) (non-standard)
    Returns true if the formatting command has been executed on the current range.
- `Document.queryCommandSupported()` (deprecated) (non-standard)
    Returns true if the formatting command is supported on the current range.
- `Document.queryCommandValue()` (deprecated) (non-standard)
    Returns the current value of the current range for a formatting command.
- `Document.write()` (deprecated)
    Writes text in a document.
- `Document.writeln()` (deprecated)
    Writes a line of text in a document.

## Events

Listen to these events using `addEventListener()` or by assigning an event listener to the `oneventname` property of this interface. In addition to the events listed below, many events can bubble from `nodes` contained in the document tree.

- `afterscriptexecute` (non-standard) (deprecated)
    Fired when a static `<script>` element finishes executing its script
- `beforescriptexecute` (non-standard) (deprecated)
    Fired when a static `<script>` is about to start executing.
- `prerenderingchange` (experimental)
    Fired on a prerendered document when it is activated (i.e., the user views the page).
- `securitypolicyviolation`
    Fired when a content security policy is violated.
- `visibilitychange`
    Fired when the content of a tab has become visible or has been hidden.

### Fullscreen events

- `fullscreenchange`
    Fired when the `Document` transitions into or out of fullscreen mode.
- `fullscreenerror`
    Fired if an error occurs while attempting to switch into or out of fullscreen mode.

### Load & unload events

- `DOMContentLoaded`
    Fired when the document has been completely loaded and parsed, without waiting for stylesheets, images, and subframes to finish loading.
- `readystatechange`
    Fired when the `readyState` attribute of a document has changed.

### Pointer lock events

- `pointerlockchange`
    Fired when the pointer is locked/unlocked.
- `pointerlockerror`
    Fired when locking the pointer failed.

### Scroll events

- `scroll`
    Fired when the document view or an element has been scrolled.
- `scrollend`
    Fired when the document view or an element has completed scrolling.
- `scrollsnapchange` (experimental)
    Fired on the scroll container at the end of a scrolling operation when a new scroll snap target has been selected.
- `scrollsnapchanging` (experimental)
    Fired on the scroll container when the browser determines a new scroll snap target is pending, i.e., it will be selected when the current scroll gesture ends.

### Selection events

- `selectionchange`
    Fired when the current text selection on a document is changed.

### Bubbled events

Not all events that bubble can reach the `Document` object. Only the following do and can be listened for on the `Document` object:

- `abort`
- `auxclick`
- `beforeinput`
- `beforematch`
- `beforetoggle`
- `blur`
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
- `error`
- `focus`
- `formdata`
- `input`
- `invalid`
- `keydown`
- `keypress`
- `keyup`
- `load`
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
- `resize`
- `scroll`
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
