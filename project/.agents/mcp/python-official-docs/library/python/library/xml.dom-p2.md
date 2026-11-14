---
title: "xml.dom --- The Document Object Model API (part 2 of 4)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/xml.dom.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# xml.dom --- The Document Object Model API (part 2 of 4)

## Objects in the DOM

The definitive documentation for the DOM is the DOM specification from the W3C.

The names documented in this section are DOM interfaces.
With the exception of `Node` and the exception classes,
they are not provided by the `xml.dom` module itself,
but by concrete DOM implementations, such as `xml.dom.minidom`.

Note that DOM attributes may also be manipulated as nodes instead of as simple
strings.  It is fairly rare that you must do this, however, so this usage is not
yet documented.

```text
+--------------------------------+-----------------------------------+---------------------------------+
| Interface                      | Section                           | Purpose                         |
+================================+===================================+=================================+
| :class:`DOMImplementation`     | :ref:`dom-implementation-objects` | Interface to the underlying     |
|                                |                                   | implementation.                 |
+--------------------------------+-----------------------------------+---------------------------------+
| :class:`Node`                  | :ref:`dom-node-objects`           | Base interface for most objects |
|                                |                                   | in a document.                  |
+--------------------------------+-----------------------------------+---------------------------------+
| :class:`NodeList`              | :ref:`dom-nodelist-objects`       | Interface for a sequence of     |
|                                |                                   | nodes.                          |
+--------------------------------+-----------------------------------+---------------------------------+
| :class:`DocumentType`          | :ref:`dom-documenttype-objects`   | Information about the           |
|                                |                                   | declarations needed to process  |
|                                |                                   | a document.                     |
+--------------------------------+-----------------------------------+---------------------------------+
| :class:`Document`              | :ref:`dom-document-objects`       | Object which represents an      |
|                                |                                   | entire document.                |
+--------------------------------+-----------------------------------+---------------------------------+
| :class:`Element`               | :ref:`dom-element-objects`        | Element nodes in the document   |
|                                |                                   | hierarchy.                      |
+--------------------------------+-----------------------------------+---------------------------------+
| :class:`Attr`                  | :ref:`dom-attr-objects`           | Attribute value nodes on        |
|                                |                                   | element nodes.                  |
+--------------------------------+-----------------------------------+---------------------------------+
| :class:`Comment`               | :ref:`dom-comment-objects`        | Representation of comments in   |
|                                |                                   | the source document.            |
+--------------------------------+-----------------------------------+---------------------------------+
| :class:`Text`                  | :ref:`dom-text-objects`           | Nodes containing textual        |
|                                |                                   | content from the document.      |
+--------------------------------+-----------------------------------+---------------------------------+
| :class:`ProcessingInstruction` | :ref:`dom-pi-objects`             | Processing instruction          |
|                                |                                   | representation.                 |
+--------------------------------+-----------------------------------+---------------------------------+
```

An additional section describes the exceptions defined for working with the DOM
in Python.

### class `DOMImplementation`

The `DOMImplementation` interface provides a way for applications to
determine the availability of particular features in the DOM they are using.
DOM Level 2 added the ability to create new `Document` and
`DocumentType` objects using the `DOMImplementation` as well.

### `DOMImplementation.hasFeature(feature, version)`

Return `True` if the feature identified by the pair of strings *feature* and
*version* is implemented.

### `DOMImplementation.createDocument(namespaceUri, qualifiedName, doctype)`

Return a new `Document` object (the root of the DOM), with a child
`Element` object having the given *namespaceUri* and *qualifiedName*. The
*doctype* must be a `DocumentType` object created by
`createDocumentType()`, or `None`. In the Python DOM API, the first two
arguments can also be `None` in order to indicate that no `Element`
child is to be created.

### `DOMImplementation.createDocumentType(qualifiedName, publicId, systemId)`

Return a new `DocumentType` object that encapsulates the given
*qualifiedName*, *publicId*, and *systemId* strings, representing the
information contained in an XML document type declaration.

### class `Node`

All of the components of an XML document are subclasses of `Node`.

Only nodes of the following types can have children,
and only children of the listed types:

`Document`
at most one `Element`, at most one `DocumentType`,
`ProcessingInstruction` and `Comment`

`DocumentFragment` and `Element`
`Element`, `Text`, `CDATASection`,
`ProcessingInstruction` and `Comment`

`Attr`
`Text`

Nodes of other types cannot have children.
Inserting a child of a not allowed type raises `HierarchyRequestErr`.

### `Node.nodeType`

An integer representing the node type.  Symbolic constants for the types are on
the `Node` object.
This is a read-only attribute.

### `Node.ELEMENT_NODE`

```python
Node.ATTRIBUTE_NODE
Node.TEXT_NODE
Node.CDATA_SECTION_NODE
Node.ENTITY_REFERENCE_NODE
Node.ENTITY_NODE
Node.PROCESSING_INSTRUCTION_NODE
Node.COMMENT_NODE
Node.DOCUMENT_NODE
Node.DOCUMENT_TYPE_NODE
Node.DOCUMENT_FRAGMENT_NODE
Node.NOTATION_NODE
```

Integer constants for the possible values
of the `nodeType` attribute.

### `Node.parentNode`

The parent of the current node, or `None` for the document node. The value is
always a `Node` object or `None`.  For `Element` nodes, this
will be the parent element, except for the root element, in which case it will
be the `Document` object. For `Attr` nodes, this is always
`None`. This is a read-only attribute.

### `Node.attributes`

A `NamedNodeMap` of attribute objects.  Only elements have actual values
for this; others provide `None` for this attribute. This is a read-only
attribute.

### `Node.previousSibling`

The node that immediately precedes this one with the same parent.  For
instance the element with an end-tag that comes just before the *self*
element's start-tag.  Of course, XML documents are made up of more than just
elements so the previous sibling could be text, a comment, or something else.
If this node is the first child of the parent, this attribute will be
`None`. This is a read-only attribute.

### `Node.nextSibling`

The node that immediately follows this one with the same parent.  See also
`previousSibling`.  If this is the last child of the parent, this
attribute will be `None`. This is a read-only attribute.

### `Node.childNodes`

A `NodeList` of the children of this node.
If the node has no children, the list is empty.
This is a read-only attribute.

### `Node.firstChild`

The first child of the node, if there are any, or `None`. This is a read-only
attribute.

### `Node.lastChild`

The last child of the node, if there are any, or `None`. This is a read-only
attribute.

### `Node.localName`

The part of the `tagName` following the colon if there is one,
else the entire `tagName`.  The value is a string.

### `Node.prefix`

The part of the `tagName` preceding the colon if there is one,
else the empty string.  The value is a string, or `None`.

### `Node.namespaceURI`

The namespace associated with the element name.  This will be a string or
`None`.  This is a read-only attribute.

### `Node.ownerDocument`

The `Document` object to which this node belongs, or `None`
for a document itself.
This is a read-only attribute.

### `Node.isSupported(feature, version)`

Return whether the DOM implementation supports a particular *feature*,
as `DOMImplementation.hasFeature()` does.

### `Node.setUserData(key, data, handler)`

Associate *data* with *key* on this node and return the data previously
associated with *key*, or `None`.
If *data* is `None`, the association is removed.
*handler* is called when the node is cloned, imported, renamed or deleted;
pass `None` if no notification is needed.

### `Node.getUserData(key)`

Return the data associated with *key* on this node
by `setUserData()`, or `None`.

### `Node.nodeName`

The name of this node, depending on its type; see the table below.
You can always get the information you would get here from another
property such as the `tagName` property for elements or the
`name` property for attributes.
This is a read-only attribute.

### `Node.nodeValue`

The value of this node, depending on its type; see the table below.
The value is a string or `None`.

The values of `nodeName` and `nodeValue`
for each node type are:

```text
+--------------------------------+---------------------------------------+-------------------------------------+
| Node type                      | nodeName                              | nodeValue                           |
+================================+=======================================+=====================================+
| :class:`Attr`                  | :attr:`~Attr.name`                    | :attr:`~Attr.value`                 |
+--------------------------------+---------------------------------------+-------------------------------------+
| :class:`CDATASection`          | ``'#cdata-section'``                  | the content                         |
+--------------------------------+---------------------------------------+-------------------------------------+
| :class:`Comment`               | ``'#comment'``                        | the content                         |
+--------------------------------+---------------------------------------+-------------------------------------+
| :class:`Document`              | ``'#document'``                       | ``None``                            |
+--------------------------------+---------------------------------------+-------------------------------------+
| :class:`DocumentFragment`      | ``'#document-fragment'``              | ``None``                            |
+--------------------------------+---------------------------------------+-------------------------------------+
| :class:`DocumentType`          | :attr:`~DocumentType.name`            | ``None``                            |
+--------------------------------+---------------------------------------+-------------------------------------+
| :class:`Element`               | :attr:`~Element.tagName`              | ``None``                            |
+--------------------------------+---------------------------------------+-------------------------------------+
| :class:`Entity`                | the name of the entity                | ``None``                            |
+--------------------------------+---------------------------------------+-------------------------------------+
| :class:`Notation`              | the name of the notation              | ``None``                            |
+--------------------------------+---------------------------------------+-------------------------------------+
| :class:`ProcessingInstruction` | :attr:`~ProcessingInstruction.target` | :attr:`~ProcessingInstruction.data` |
+--------------------------------+---------------------------------------+-------------------------------------+
| :class:`Text`                  | ``'#text'``                           | the content                         |
+--------------------------------+---------------------------------------+-------------------------------------+
```

### `Node.hasAttributes()`

Return `True` if the node has any attributes.

### `Node.hasChildNodes()`

Return `True` if the node has any child nodes.

### `Node.isSameNode(other)`

Return `True` if *other* refers to the same node as this node. This is especially
useful for DOM implementations which use any sort of proxy architecture (because
more than one object can refer to the same node).

> **Note:** This is based on a proposed DOM Level 3 API which is still in the "working
> draft" stage, but this particular interface appears uncontroversial.  Changes
> from the W3C will not necessarily affect this method in the Python DOM interface
> (though any new W3C API for this would also be supported).

### `Node.appendChild(newChild)`

Add a new child node to this node at the end of the list of
children, returning *newChild*. If the node was already in
the tree, it is removed first.

### `Node.insertBefore(newChild, refChild)`

Insert a new child node before an existing child.  It must be the case that
*refChild* is a child of this node; if not, `NotFoundErr` is raised.
*newChild* is returned. If *refChild* is `None`, it inserts *newChild* at the
end of the children's list.

### `Node.removeChild(oldChild)`

Remove a child node.  *oldChild* must be a child of this node; if not,
`NotFoundErr` is raised.  *oldChild* is returned on success.  If *oldChild*
will not be used further, its `unlink()` method
should be called.

### `Node.replaceChild(newChild, oldChild)`

Replace an existing node with a new node. It must be the case that  *oldChild*
is a child of this node; if not, `NotFoundErr` is raised.

### `Node.normalize()`

Join adjacent text nodes so that all stretches of text are stored as single
`Text` instances.  This simplifies processing text from a DOM tree for
many applications.

### `Node.cloneNode(deep)`

Clone this node.  Setting *deep* means to clone all child nodes as well.  This
returns the clone.

### class `NodeList`

A `NodeList` represents a sequence of nodes.  These objects are used in
two ways in the DOM Core recommendation:  an `Element` object provides
one as its list of child nodes, and the `getElementsByTagName()`
and `getElementsByTagNameNS()` methods of `Node` return
objects with this interface to represent query results.

`NodeList` does *not* inherit from `Node`.

The DOM Level 2 recommendation defines one method and one attribute for these
objects:

### `NodeList.item(i)`

Return the *i*'th item from the sequence,
or `None` if *i* is out of range.
Negative indices are not supported.
