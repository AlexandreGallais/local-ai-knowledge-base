---
title: "Element: namespaceURI property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/namespaceuri/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: namespaceURI property

The **`Element.namespaceURI`** read-only property returns the namespace URI of the element, or `null` if the element is not in a namespace.

## Value

A string, or `null`.

## Examples

In this snippet, an element is being examined for its `localName` and its `namespaceURI`. If the `namespaceURI` returns the XUL namespace and the `localName` returns "browser", then the node is understood to be a XUL `<browser/>`.

```js
if (
  element.localName === "browser" &&
  element.namespaceURI ===
    "http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul"
) {
  // this is a XUL browser
}
```

## Notes

This is not a computed value that is the result of a namespace lookup based on an examination of the namespace declarations in scope. The namespace URI of a node is frozen at the node creation time.

The namespace URI for HTML elements in HTML documents is `http://www.w3.org/1999/xhtml` as in XHTML.

You can create an element with the specified `namespaceURI` using the `document.createElementNS()` method.

The DOM does not handle or enforce namespace validation per se. It is up to the DOM application to do any validation necessary. Also note that the namespace prefix, once it is associated with a particular element, cannot be changed.

## See also

- `Element.localName`
- `Element.prefix`
- `Attr.namespaceURI`
