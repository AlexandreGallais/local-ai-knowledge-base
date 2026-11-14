---
title: "xml.dom --- The Document Object Model API (part 3 of 4)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/xml.dom.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# xml.dom --- The Document Object Model API (part 3 of 4)

### `NodeList.length`

The number of nodes in the sequence.

In addition, the Python DOM interface requires that some additional support is
provided to allow `NodeList` objects to be used as Python sequences.  All
`NodeList` implementations must include support for
`__len__()` and
`__getitem__()`; this allows iteration over the `NodeList` in
`for` statements and proper support for the `len()` built-in
function.

If a DOM implementation supports modification of the document, the
`NodeList` implementation must also support the
`__setitem__() and delitem__()` methods.

### class `DocumentType`

Information about the notations and entities declared by a document (including
the external subset if the parser uses it and can provide the information) is
available from a `DocumentType` object.  The `DocumentType` for a
document is available from the `Document` object's `doctype`
attribute; if there is no `DOCTYPE` declaration for the document, the
document's `doctype` attribute will be set to `None` instead of an
instance of this interface.

`DocumentType` is a specialization of `Node`, and adds the
following attributes:

### `DocumentType.publicId`

The public identifier for the external subset of the document type definition,
or `None` if the `DOCTYPE` declaration does not specify it.

### `DocumentType.systemId`

The system identifier, a URI, for the external subset of the document type
definition, or `None` if the `DOCTYPE` declaration does not specify it.

### `DocumentType.internalSubset`

A string giving the complete internal subset from the document. This does not
include the brackets which enclose the subset.  If the document has no internal
subset, this should be `None`.

### `DocumentType.name`

The name of the root element as given in the `DOCTYPE` declaration, if
present.

### `DocumentType.entities`

This is a `NamedNodeMap` of `Entity` nodes
giving the definitions of external entities.
For entity names defined more than once, only the first definition is provided
(others are ignored as required by the XML recommendation).  This may be
`None` if the information is not provided by the parser, or if no entities are
defined.

### `DocumentType.notations`

This is a `NamedNodeMap` of `Notation` nodes
giving the definitions of notations. For
notation names defined more than once, only the first definition is provided
(others are ignored as required by the XML recommendation).  This may be
`None` if the information is not provided by the parser, or if no notations
are defined.

### class `Document`

A `Document` represents an entire XML document, including its constituent
elements, attributes, processing instructions, comments etc.  Remember that it
inherits properties from `Node`.

### `Document.documentElement`

The one and only root element of the document.

### `Document.doctype`

The `DocumentType` node of the document, or `None`.
This is a read-only attribute.

### `Document.implementation`

The `DOMImplementation` object which created this document.
This is a read-only attribute.

### `Document.strictErrorChecking`

Whether error checking is enforced.

### `Document.documentURI`

The location of the document, or `None` if it is unknown.

### `Document.createDocumentFragment()`

Create and return an empty `DocumentFragment` node.

### `Document.createCDATASection(data)`

Create and return a `CDATASection` node containing *data*.

### `Document.importNode(importedNode, deep)`

Return a copy of *importedNode* which belongs to this document.
The original node is not removed from its document.
If *deep* is true, the descendants of the node are copied too.

### `Document.createElement(tagName)`

Create and return a new element node.  The element is not inserted into the
document when it is created.  You need to explicitly insert it with one of the
other methods such as `insertBefore()` or `appendChild()`.

### `Document.createElementNS(namespaceURI, tagName)`

Create and return a new element with a namespace.  The *tagName* may have a
prefix.  The element is not inserted into the document when it is created.  You
need to explicitly insert it with one of the other methods such as
`insertBefore()` or `appendChild()`.

### `Document.createTextNode(data)`

Create and return a text node containing the data passed as a parameter.  As
with the other creation methods, this one does not insert the node into the
tree.

### `Document.createComment(data)`

Create and return a comment node containing the data passed as a parameter.  As
with the other creation methods, this one does not insert the node into the
tree.

### `Document.createProcessingInstruction(target, data)`

Create and return a processing instruction node containing the *target* and
*data* passed as parameters.  As with the other creation methods, this one does
not insert the node into the tree.

### `Document.createAttribute(name)`

Create and return an attribute node.  This method does not associate the
attribute node with any particular element.  You must use
`setAttributeNode()` on the appropriate `Element` object
to use the newly created attribute instance.

### `Document.createAttributeNS(namespaceURI, qualifiedName)`

Create and return an attribute node with a namespace.  The *tagName* may have a
prefix.  This method does not associate the attribute node with any particular
element.  You must use `setAttributeNode()` on the appropriate
`Element` object to use the newly created attribute instance.

### `Document.getElementById(id)`

Return the element with the given ID, or `None`.
Only attributes declared as being of type ID in the DTD
or by `Element.setIdAttribute()` are searched.

### `Document.getElementsByTagName(tagName)`

Search for all descendants (direct children, children's children, etc.) with a
particular element type name.

### `Document.getElementsByTagNameNS(namespaceURI, localName)`

Search for all descendants (direct children, children's children, etc.) with a
particular namespace URI and localname.  The localname is the part of the
namespace after the prefix.

### `Document.renameNode(n, namespaceURI, name)`

Rename the element or attribute node *n*
and return it.
*namespaceURI* is the new namespace URI, or
`EMPTY_NAMESPACE` if the node does not belong to a namespace.
*name* is the new qualified name.

Raise `WrongDocumentErr` if *n* was created by another document,
and `NotSupportedErr` if it is neither an element nor an attribute.

### class `Element`

`Element` is a subclass of `Node`, so inherits all the attributes
of that class.

### `Element.tagName`

The element type name.  In a namespace-using document it may have colons in it.
The value is a string.

### `Element.setIdAttribute(name)`

Declare that the attribute *name* is of type ID,
so that the element is found by `Document.getElementById()`.
Raise `NotFoundErr` if the element has no such attribute.

### `Element.setIdAttributeNS(namespaceURI, localName)`

The same as `setIdAttribute()`,
but for an attribute specified by its namespace URI and local name.

### `Element.setIdAttributeNode(idAttr)`

The same as `setIdAttribute()`,
but for an already retrieved attribute node.

### `Element.getElementsByTagName(tagName)`

Same as equivalent method in the `Document` class.

### `Element.getElementsByTagNameNS(namespaceURI, localName)`

Same as equivalent method in the `Document` class.

### `Element.hasAttribute(name)`

Return `True` if the element has an attribute named by *name*.

### `Element.hasAttributeNS(namespaceURI, localName)`

Return `True` if the element has an attribute named by *namespaceURI* and
*localName*.

### `Element.getAttribute(name)`

Return the value of the attribute named by *name* as a string. If no such
attribute exists, an empty string is returned, as if the attribute had no value.

### `Element.getAttributeNode(attrname)`

Return the `Attr` node for the attribute named by *attrname*.

### `Element.getAttributeNS(namespaceURI, localName)`

Return the value of the attribute named by *namespaceURI* and *localName* as a
string. If no such attribute exists, an empty string is returned, as if the
attribute had no value.

### `Element.getAttributeNodeNS(namespaceURI, localName)`

Return an attribute value as a node, given a *namespaceURI* and *localName*.

### `Element.removeAttribute(name)`

Remove an attribute by name.

### `Element.removeAttributeNode(oldAttr)`

Remove and return *oldAttr* from the attribute list, if present. If *oldAttr* is
not present, `NotFoundErr` is raised.

### `Element.removeAttributeNS(namespaceURI, localName)`

Remove an attribute by name.  Note that it uses a localName, not a qname.

### `Element.setAttribute(name, value)`

Set an attribute value from a string.

### `Element.setAttributeNode(newAttr)`

Add a new attribute node to the element, replacing an existing attribute if
necessary if the `name` attribute matches.  If a replacement
occurs, the old attribute node will be returned.  If *newAttr* is already in use,
`InuseAttributeErr` will be raised.

### `Element.setAttributeNodeNS(newAttr)`

Add a new attribute node to the element, replacing an existing attribute if
necessary if the `namespaceURI` and `localName`
attributes match.  If a replacement occurs, the old attribute node will be
returned.  If *newAttr* is already in use, `InuseAttributeErr` will be
raised.

### `Element.setAttributeNS(namespaceURI, qname, value)`

Set an attribute value from a string, given a *namespaceURI* and a *qname*.
Note that a qname is the whole attribute name.  This is different than above.

### class `Attr`

`Attr` inherits from `Node`, so inherits all its attributes.

Attribute nodes are not part of the document tree.
They are contained in the `attributes` map of an element,
not in its children,
and their `parentNode`, `previousSibling`
and `nextSibling` are always `None`.

### `Attr.name`

The attribute name.
In a namespace-using document it may include a colon.

### `Attr.localName`

The part of the name following the colon if there is one, else the
entire name.
This is a read-only attribute.

### `Attr.prefix`

The part of the name preceding the colon if there is one, else the
empty string.

### `Attr.isId`

Whether this attribute is of type ID,
either because it is declared as such in the DTD
or because `Element.setIdAttribute()` was used.
This is a read-only attribute.

### `Attr.ownerElement`

The `Element` node to which this attribute belongs,
or `None` if it is not used.
This is a read-only attribute.

### `Attr.specified`

Whether the value of the attribute was explicitly set in the document,
as opposed to being defaulted from the DTD.
This is a read-only attribute.

### `Attr.value`

The text value of the attribute.  This is a synonym for the
`nodeValue` attribute.

### class `NamedNodeMap`

`NamedNodeMap` does *not* inherit from `Node`.

### `NamedNodeMap.length`

The length of the attribute list.

### `NamedNodeMap.item(index)`

Return an attribute with a particular index.  The order you get the attributes
in is arbitrary but will be consistent for the life of a DOM.  Each item is an
attribute node.  Get its value with the `value` attribute.

### `NamedNodeMap.getNamedItem(name)`

Return the node with the given `name`,
or `None` if there is no such node.

### `NamedNodeMap.getNamedItemNS(namespaceURI, localName)`

Return the node with the given namespace URI and local name,
or `None` if there is no such node.

### `NamedNodeMap.setNamedItem(node)`

Add *node* to the map, using its `name` as the key.
Return the node which it replaces, or `None` if it replaces no node.

### `NamedNodeMap.setNamedItemNS(node)`

Add *node* to the map,
using its namespace URI and local name as the key.
Return the node which it replaces, or `None` if it replaces no node.

### `NamedNodeMap.removeNamedItem(name)`

Remove and return the node with the given `name`.
Raise `NotFoundErr` if there is no such node.

### `NamedNodeMap.removeNamedItemNS(namespaceURI, localName)`

Remove and return the node with the given namespace URI and local name.
Raise `NotFoundErr` if there is no such node.

You can also use the standardized `getAttribute*()` family of methods
on the `Element` objects.

### class `DocumentFragment`

`DocumentFragment` is a lightweight container of nodes.
It is a subclass of `Node`.
When it is inserted into the document tree,
its children are inserted instead of it,
and it becomes empty.

### class `CharacterData`

`CharacterData` represents text-like data in the XML document.
It is a subclass of `Node`, and the base class
of `Text`, `CDATASection` and `Comment`.
Such nodes cannot have child nodes.

### `CharacterData.data`

The content of the node as a string.

### `CharacterData.length`

The number of characters in `data`.
This is a read-only attribute.

### `CharacterData.substringData(offset, count)`

Return the substring of `data`
of *count* characters starting at *offset*.

### `CharacterData.appendData(arg)`

Append the string *arg* to `data`.

### `CharacterData.insertData(offset, arg)`

Insert the string *arg* into `data` at *offset*.

### `CharacterData.deleteData(offset, count)`

Remove *count* characters from `data`
starting at *offset*.

### `CharacterData.replaceData(offset, count, arg)`

Replace *count* characters of `data`
starting at *offset* with the string *arg*.

### class `Comment`

`Comment` represents a comment in the XML document.
It is a subclass of `CharacterData`.

### `Comment.data`

The content of the comment as a string.  The attribute contains all characters
between the leading `<!-``-` and trailing `-``->`, but does not
include them.

### class `CDATASection`

The `Text` interface represents text in the XML document.  If the parser
and DOM implementation support the DOM's XML extension, portions of the text
enclosed in CDATA marked sections are stored in `CDATASection` objects.
These two interfaces are identical, but provide different values for the
`nodeType` attribute.

`Text` extends the `CharacterData` interface,
and `CDATASection` extends `Text`.

### `Text.data`

The content of the text node as a string.

### `Text.wholeText`

The text of all `Text` nodes logically adjacent to this node,
concatenated in document order.
This is a read-only attribute.

### `Text.replaceWholeText(content)`

Replace the text of all `Text` nodes logically adjacent
to this node with *content*, removing the other nodes.
Return this node, or `None` if *content* is empty.

### `Text.splitText(offset)`

Split this node into two nodes at *offset*,
keeping the first part in this node
and returning a new sibling node with the rest.

> **Note:** The use of a `CDATASection` node does not indicate that the node
> represents a complete CDATA marked section, only that the content of the node
> was part of a CDATA section.  A single CDATA section may be represented by more
> than one node in the document tree.  There is no way to determine whether two
> adjacent `CDATASection` nodes represent different CDATA marked sections.
