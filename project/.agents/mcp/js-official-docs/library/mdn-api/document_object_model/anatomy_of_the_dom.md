---
title: "Anatomy of the DOM (part 1 of 2)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/document_object_model/anatomy_of_the_dom/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Anatomy of the DOM

The DOM represents an XML or HTML document as a tree. This page introduces the basic <example-value> of the DOM tree and the various properties and methods used to navigate it.

To begin with, we need to introduce some concepts related to trees. A tree is a data structure made up of _nodes_. Each node holds some _data_. The nodes are organized in a hierarchical way—every node has a single _parent node_ (except for the root node, which has no parent), and an ordered list of zero or more _child nodes_. Now we can define the following:

- A node with no parent is called the _root_ of the tree.
- A node with no children is called a _leaf_.
- Nodes that share the same parent are called _siblings_. Siblings belong to the same child node list of their parent, so they have a well-defined order.
- If we can go from node A to node B by repeatedly following parent links, then A is a _descendant_ of B, and B is an _ancestor_ of A.
- Nodes in a tree are listed in _tree order_ by first listing the node itself, then recursively listing each of its child nodes in order (preorder, depth-first traversal).

And here are a few important properties of trees:

- Every node is associated with a unique root node.
- If node A is the parent of node B, then node B is a child of node A.
- Cycles are not allowed: no node can be an ancestor or descendant of itself.

## The Node interface and its subclasses

All nodes in the DOM are represented by objects that implement the `Node` interface. The `Node` interface embodies many of the previously defined concepts:

- The `parentNode` property returns the parent node, or `null` if the node has no parent.
- The `childNodes` property returns a `NodeList` of the child nodes. The `firstChild` and `lastChild` properties return the first and last elements of this list, respectively, or `null` if there are no children.
- The `getRootNode()` method returns the root of the tree that contains the node, by repeatedly following parent links.
- The `hasChildNodes()` method returns `true` if it has any child nodes, i.e., it is not a leaf.
- The `previousSibling` and `nextSibling` properties return the previous and next sibling nodes, respectively, or `null` if there is no such sibling.
- The `contains()` method returns `true` if a given node is a descendant of the node.
- The `compareDocumentPosition()` method compares two nodes by tree order. The Comparing nodes section discusses this method in more detail.

You rarely work with plain `Node` objects—instead, all objects in the DOM implement one of the interfaces that inherit from `Node`, which represent additional semantics in the document. The node types restrict what data they contain, and what children types are valid. Consider how the following HTML document is represented in the DOM:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>Document</title>
  </head>
  <body>
    <h1>Hello, world!</h1>
    <p>This is a paragraph.</p>
  </body>
</html>
```

It produces the following DOM tree:

The root of this DOM tree is a `Document` node, which represents the entire document. This node is exposed globally as the `document` variable. This node has two important child nodes:

- An optional `DocumentType` node representing the doctype declaration. In our case, there is one. This node is also accessible via the `doctype` property of the `Document` node.
- An optional `Element` node representing the root element. For HTML documents (such as our case), this is typically the `HTMLHtmlElement`. For SVG documents, this is typically the `SVGSVGElement`. This node is also accessible via the `documentElement` property of the `Document` node.

The `DocumentType` node is always a leaf node. The `Element` node is where most of the document content is represented. Each element under it, such as `<head>`, `<body>`, and ``, is also represented by an `Element` node. In fact, each is a subclass of `Element` specific to that tag name, defined in the HTML specification, such as `HTMLHeadElement` and `HTMLBodyElement`, with additional properties and methods to represent the semantics of that element, but here we focus on the common behaviors of the DOM. The `Element` nodes can have other `Element` nodes as children, representing nested elements. For example, the `<head>` element has three children: two `<meta>` elements and a `<title>` element. Additionally, elements can also have `Text` nodes and `CDATASection` nodes as children, representing text content. For example, the `` element has a single child, a `Text` node containing the string "This is a paragraph.". `Text` nodes and `CDATASection` nodes are always leaf nodes.

All nodes that can have children (`Document`, `DocumentFragment`, and `Element`) allow two types of children: `Comment` and `ProcessingInstruction` nodes. These nodes are always leaf nodes.

Each element, in addition to having child nodes, can also have attributes, represented as `Attr` nodes. `Attr` extend the `Node` interface, but they are not part of the main tree structure, because they are not the child of any node and their parent node is `null`. Instead, they are stored in a separate named node map, accessible via the `attributes` property of the `Element` node.

The `Node` interface defines a `nodeType` property that indicates the type of the node. To summarize, we introduced the following node types:

| Node type                            | `nodeType` value                       | Valid children (besides `Comment` and `ProcessingInstruction`)           |
| ------------------------------------ | -------------------------------------- | ------------------------------------------------------------------------ |
| `Document`              | `Node.DOCUMENT_NODE` (9)               | `DocumentType`, `Element`                      |
| `DocumentType`          | `Node.DOCUMENT_TYPE_NODE` (10)         | None                                                                     |
| `Element`               | `Node.ELEMENT_NODE` (1)                | `Element`, `Text`, `CDATASection` |
| `Text`                  | `Node.TEXT_NODE` (3)                   | None                                                                     |
| `CDATASection`          | `Node.CDATA_SECTION_NODE` (4)          | None                                                                     |
| `Comment`               | `Node.COMMENT_NODE` (8)                | None                                                                     |
| `ProcessingInstruction` | `Node.PROCESSING_INSTRUCTION_NODE` (7) | None                                                                     |
| `Attr`                  | `Node.ATTRIBUTE_NODE` (2)              | None                                                                     |

> **Note:**
> You may notice we skipped some node types here. The `Node.ENTITY_REFERENCE_NODE` (5), `Node.ENTITY_NODE` (6), and `Node.NOTATION_NODE` (12) values are no longer used, while the `Node.DOCUMENT_FRAGMENT_NODE` (11) value will be introduced in Building and updating the DOM tree.

## Data of each node

Each node type has its own way of representing the data it holds. The `Node` interface itself defines three properties related to data, summarized in the following table:

| Node type                            | `nodeName`             | `nodeValue` | `textContent`               |
| ------------------------------------ | ---------------------------------------------------- | ------------------------------------------ | ------------------------------------------------------------ |
| `Document`              | `"#document"`                                        | `null`                                     | `null`                                                       |
| `DocumentType`          | Its `name` (e.g., `"html"`)         | `null`                                     | `null`                                                       |
| `Element`               | Its `tagName` (e.g., `"HTML"`, `"BODY"`) | `null`                                     | Concatenation of all its text node descendants in tree order |
| `Text`                  | `"#text"`                                            | Its `data`               | Its `data`                                 |
| `CDATASection`          | `"#cdata-section"`                                   | Its `data`               | Its `data`                                 |
| `Comment`               | `"#comment"`                                         | Its `data`               | Its `data`                                 |
| `ProcessingInstruction` | Its `target`                       | Its `data`               | Its `data`                                 |
| `Attr`                  | Its `name`                                  | Its `value`                       | Its `value`                                         |

### Document

The `Document` node does not hold any data itself, so its `nodeValue` and `textContent` are always `null`. Its `nodeName` is always `"#document"`.

The `Document` does define some metadata about the document, coming from the environment (for example, the HTTP response that served the document):

- The `URL` and `documentURI` properties return the document's URL.
- The `characterSet` property returns the character encoding used by the document, such as `"UTF-8"`.
- The `compatMode` property returns the rendering mode of the document, either `"CSS1Compat"` (standards mode) or `"BackCompat"` (quirks mode).
- The `contentType` property returns the media type of the document, such as `"text/html"` for HTML documents.

### DocumentType

A `DocumentType` in the document looks like this:

```xml
<!doctype name PUBLIC "publicId" "systemId">
```

There are three parts you can specify, which correspond to the three properties of the `DocumentType` node: `name`, `publicId`, and `systemId`. For HTML documents, the doctype is always `<!doctype html>`, so the `name` is `"html"` and both `publicId` and `systemId` are empty strings.

### Element

An `Element` in the document looks like this:

```html
<p class="note" id="intro">This is a paragraph.</p>
```

In addition to the contents, there are two parts you can specify: the tag name and the attributes. The tag name corresponds to the `tagName` property of the `Element` node, which is `"P"` in this case (note that it is always in uppercase for HTML elements). The attributes correspond to the `Attr` nodes stored in the `attributes` property of the `Element` node. We will discuss attributes in more detail in the Element and its attributes section.

The `Element` node does not hold any data itself, so its `nodeValue` is always `null`. Its `textContent` is the concatenation of all its text node descendants in tree order, which is `"This is a paragraph."` in this case. For the following element:

```html
<div>Hello, <span>world</span>!</div>
```

The `textContent` is `"Hello, world!"`, concatenating the text node `"Hello, "`, the text node `"world"` inside the `` element, and the text node `"!"`.

### CharacterData

`Text`, `CDATASection`, `Comment`, and `ProcessingInstruction` all inherit from the `CharacterData` interface, which is a subclass of `Node`. The `CharacterData` interface defines a single property, `data`, which holds the text content of the node. The `data` property is also used to implement the `nodeValue` and `textContent` properties of these nodes.

For `Text` and `CDATASection`, the `data` property holds the text content of the node. In the following document (note that we use an SVG document, because HTML does not allow CDATA sections):

```svg
<text>Some text</text>
<style><![CDATA[h1 { color: red; }]]></style>
```

The text node inside the `<text>` element has `"Some text"` as `data`, and the CDATA section inside the `<style>` element has `"h1 { color: red; }"` as `data`.

For `Comment`, the `data` property holds the content of the comment, starting after the ``. For example, in the following document:

```html
<!-- This is a comment -->
```

The comment node has `" This is a comment "` as `data`.

For `ProcessingInstruction`, the `data` property holds the content of the processing instruction, starting after the target and ending before the `?>`. For example, in the following document:

```xml
<?xml-stylesheet type="text/xsl" href="style.xsl"?>
```

The processing instruction node has `'type="text/xsl" href="style.xsl"'` as `data`, and `"xml-stylesheet"` as its `target`.

In addition, the `CharacterData` interface defines the `length` property, which returns the length of the `data` string, and the `substringData()` method, which returns a substring of the `data`.

### Attr

For the following element:

```html
<p class="note" id="intro">This is a paragraph.</p>
```

The `` element has two attributes, represented by two `Attr` nodes. Each attribute consists of a name and a value, corresponding to the `name` and `value` properties. The first attribute has `"class"` as `name` and `"note"` as `value`, while the second attribute has `"id"` as `name` and `"intro"` as `value`.

## Element and its attributes

As previously mentioned, the attributes of an `Element` node are represented by `Attr` nodes, which are stored in a separate named node map, accessible via the `attributes` property of the `Element` node. This `NamedNodeMap` interface defines three important properties:

- `length`, which returns the number of attributes.
- `item()` method, which returns the `Attr` at a given index.
- `getNamedItem()` method, which returns the `Attr` with a given name.

The `Element` interface also defines several methods to work with attributes directly, without needing to access the named node map:

- `element.getAttribute(name)` is equivalent to `element.attributes.getNamedItem(name).value`, if the attribute exists.
- `element.getAttributeNode(name)` is equivalent to `element.attributes.getNamedItem(name)`.
- `element.hasAttribute(name)` is equivalent to `element.attributes.getNamedItem(name) !== null`.
- `element.getAttributeNames()` returns an array of all attribute names.
- `element.hasAttributes()` is equivalent to `element.attributes.length > 0`.

You can also access the owner element of an attribute via the `ownerElement` property of the `Attr` node.

There are two special attributes, `id` and `class`, which have their own properties on the `Element` interface: `id` and `className`, that reflect the value of the corresponding attribute. In addition, the `classList` property returns a `DOMTokenList` representing the list of classes in the `class` attribute.
