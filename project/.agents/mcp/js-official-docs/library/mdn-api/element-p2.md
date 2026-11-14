---
title: "Element (part 2 of 3)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element (part 2 of 3)

## Instance methods

_`Element` inherits methods from its parents `Node`, and its own parent, `EventTarget`._

- `Element.after()`
    Inserts a set of `Node` objects or strings in the children list of the `Element`'s parent, just after the `Element`.
- `Element.animate()`
    A shortcut method to create and run an animation on an element. Returns the created Animation object instance.
- `Element.ariaNotify()`
    Specifies that a given string of text should be announced by a screen reader.
- `Element.append()`
    Inserts a set of `Node` objects or strings after the last child of the element.
- `Element.attachShadow()`
    Attaches a shadow DOM tree to the specified element and returns a reference to its `ShadowRoot`.
- `Element.before()`
    Inserts a set of `Node` objects or strings in the children list of the `Element`'s parent, just before the `Element`.
- `Element.checkVisibility()`
    Returns whether an element is expected to be visible or not based on configurable checks.
- `Element.closest()`
    Returns the `Element` which is the closest ancestor of the current element (or the current element itself) which matches the selectors given in parameter.
- `Element.computedStyleMap()`
    Returns a `StylePropertyMapReadOnly` interface which provides a read-only representation of a CSS declaration block that is an alternative to `CSSStyleDeclaration`.
- `Element.getAnimations()`
    Returns an array of Animation objects currently active on the element.
- `Element.getAttribute()`
    Retrieves the value of the named attribute from the current node and returns it as a string.
- `Element.getAttributeNames()`
    Returns an array of attribute names from the current element.
- `Element.getAttributeNode()`
    Retrieves the node representation of the named attribute from the current node and returns it as an `Attr`.
- `Element.getAttributeNodeNS()`
    Retrieves the node representation of the attribute with the specified name and namespace, from the current node and returns it as an `Attr`.
- `Element.getAttributeNS()`
    Retrieves the value of the attribute with the specified namespace and name from the current node and returns it as a string.
- `Element.getBoundingClientRect()`
    Returns the size of an element and its position relative to the viewport.
- `Element.getBoxQuads()` (experimental)
    Returns a list of `DOMQuad` objects representing the CSS fragments of the node.
- `Element.getClientRects()`
    Returns a collection of rectangles that indicate the bounding rectangles for each line of text in a client.
- `Element.getElementsByClassName()`
    Returns a live `HTMLCollection` that contains all descendants of the current element that possess the list of classes given in the parameter.
- `Element.getElementsByTagName()`
    Returns a live `HTMLCollection` containing all descendant elements, of a particular tag name, from the current element.
- `Element.getElementsByTagNameNS()`
    Returns a live `HTMLCollection` containing all descendant elements, of a particular tag name and namespace, from the current element.
- `Element.getHTML()`
    Returns the DOM content of the element as an HTML string, optionally including any shadow DOM.
- `Element.hasAttribute()`
    Returns a boolean value indicating if the element has the specified attribute or not.
- `Element.hasAttributeNS()`
    Returns a boolean value indicating if the element has the specified attribute, in the specified namespace, or not.
- `Element.hasAttributes()`
    Returns a boolean value indicating if the element has one or more HTML attributes present.
- `Element.hasPointerCapture()`
    Indicates whether the element on which it is invoked has pointer capture for the pointer identified by the given pointer ID.
- `Element.insertAdjacentElement()`
    Inserts a given element node at a given position relative to the element it is invoked upon.
- `Element.insertAdjacentHTML()`
    Parses the text as HTML or XML and inserts the resulting nodes into the tree in the position given.
- `Element.insertAdjacentText()`
    Inserts a given text node at a given position relative to the element it is invoked upon.
- `Element.matches()`
    Returns a boolean value indicating whether or not the element would be selected by the specified selector string.
- `Element.moveBefore()`
    Moves a given `Node` inside the invoking node as a direct child, before a given reference node, without removing and then inserting the node.
- `Element.prepend()`
    Inserts a set of `Node` objects or strings before the first child of the element.
- `Element.pseudo()` (experimental)
    Returns a `CSSPseudoElement` object representing the CSS pseudo-element of the specified type associated with the element.
- `Element.querySelector()`
    Returns the first `Node` which matches the specified selector string relative to the element.
- `Element.querySelectorAll()`
    Returns a `NodeList` of nodes which match the specified selector string relative to the element.
- `Element.releasePointerCapture()`
    Releases (stops) pointer capture that was previously set for a specific `PointerEvent`.
- `Element.remove()`
    Removes the element from the children list of its parent.
- `Element.removeAttribute()`
    Removes the named attribute from the current node.
- `Element.removeAttributeNode()`
    Removes the node representation of the named attribute from the current node.
- `Element.removeAttributeNS()`
    Removes the attribute with the specified name and namespace, from the current node.
- `Element.replaceChildren()`
    Replaces the existing children of a `Node` with a specified new set of children.
- `Element.replaceWith()`
    Replaces the element in the children list of its parent with a set of `Node` objects or strings.
- `Element.requestFullscreen()`
    Asynchronously asks the browser to make the element fullscreen.
- `Element.requestPointerLock()`
    Allows you to asynchronously ask for the pointer to be locked on the given element.
- `Element.scroll()`
    Scrolls to a particular set of coordinates inside a given element.
- `Element.scrollBy()`
    Scrolls an element by the given amount.
- `Element.scrollIntoView()`
    Scrolls the page until the element gets into the view.
- `Element.scrollIntoViewIfNeeded()` (non-standard)
    Scrolls the current element into the visible area of the browser window if it's not already within the visible area of the browser window. **Use the standard `Element.scrollIntoView()` instead.**
- `Element.scrollTo()`
    Scrolls to a particular set of coordinates inside a given element.
- `Element.setAttribute()`
    Sets the value of a named attribute of the current node.
- `Element.setAttributeNode()`
    Sets the node representation of the named attribute from the current node.
- `Element.setAttributeNodeNS()`
    Sets the node representation of the attribute with the specified name and namespace, from the current node.
- `Element.setAttributeNS()`
    Sets the value of the attribute with the specified name and namespace, from the current node.
- `Element.setCapture()` (non-standard) (deprecated)
    Sets up mouse event capture, redirecting all mouse events to this element.
- `Element.setHTML()` (secure context)
    Parses and sanitizes a string of HTML into a document fragment, which then replaces the element's original subtree in the DOM.
- `Element.setHTMLUnsafe()`
    Parses a string of HTML into a document fragment, without sanitization, which then replaces the element's original subtree in the DOM. The HTML string may include declarative shadow roots, which would be parsed as template elements if the HTML was set using `Element.innerHTML`.
- `Element.setPointerCapture()`
    Designates a specific element as the capture target of future pointer events.
- `Element.startViewTransition()` (experimental)
    Starts a new same-document (SPA) element-scoped view transition and returns a `ViewTransition` object to represent it.
- `Element.toggleAttribute()`
    Toggles a boolean attribute, removing it if it is present and adding it if it is not present, on the specified element.
