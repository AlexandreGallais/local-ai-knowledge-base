---
title: "Document Object Model (DOM) (part 1 of 2)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/document_object_model/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

The **Document Object Model** (**DOM**) connects web pages to scripts or programming languages by representing the structure of a document—such as the HTML representing a web page—in memory. Usually it refers to JavaScript, even though modeling HTML, SVG, or XML documents as objects are not part of the core JavaScript language.

The DOM represents a document with a logical tree. Each branch of the tree ends in a node, and each node contains objects. DOM methods allow programmatic access to the tree. With them, you can change the document's structure, style, or content.

Nodes can also have event handlers attached to them. Once an event is triggered, the event handlers get executed.

## Concepts and usage

The Document Object Model (DOM) is a programming interface for web documents.
It represents the page so that programs can change the document structure, style, and content.
The DOM represents the document as nodes and objects;
that way, programming languages can interact with the page.

A web page is a document that can be either displayed in the browser window or as the HTML source. In both cases, it is the same document but the Document Object Model (DOM) representation allows it to be manipulated. As an object-oriented representation of the web page, it can be modified with a scripting language such as JavaScript.

For example, the DOM specifies that the `querySelectorAll` method in this code snippet must return a list of all the `` elements in the document:

```js
const paragraphs = document.querySelectorAll("p");
// paragraphs[0] is the first <p> element
// paragraphs[1] is the second <p> element, etc.
alert(paragraphs[0].nodeName);
```

All of the properties, methods, and events available for manipulating and creating web pages are organized into objects. For example, the `document` object that represents the document itself, any `table` objects that implement the `HTMLTableElement` DOM interface for accessing HTML tables, and so forth, are all objects.

The DOM is built using multiple APIs that work together.
The core DOM defines the entities
describing any document and the objects within it.
This is expanded upon as needed by other APIs that add new features and capabilities to the DOM.
For example, the HTML DOM API adds support for representing HTML documents to the core DOM,
and the SVG API adds support for representing SVG documents.

### What is a DOM tree?

A **DOM tree** is a tree structure whose nodes represent an HTML or XML document's contents. Each HTML or XML document has a DOM tree representation. For example, consider the following document:

```html
<html lang="en">
  <head>
    <title>My Document</title>
  </head>
  <body>
    <h1>Header</h1>
    <p>Paragraph</p>
  </body>
</html>
```

It has a DOM tree that looks like this:

Although the above tree is similar to the above document's DOM tree, they're not identical, as the actual DOM tree preserves whitespace.

When a web browser parses an HTML document, it builds a DOM tree and then uses it to display the document.

### DOM and JavaScript

The previous short example, like nearly all examples, is JavaScript. That is to say, it is _written_ in JavaScript, but _uses_ the DOM to access the document and its elements. The DOM is not a programming language, but without it, the JavaScript language wouldn't have any model or notion of web pages, HTML documents, SVG documents, and their component parts. The document as a whole, the head, tables within the document, table headers, text within the table cells, and all other elements in a document are parts of the document object model for that document. They can all be accessed and manipulated using the DOM and a scripting language like JavaScript.

The DOM is not part of the JavaScript language,
but is instead a Web API used to build websites.
JavaScript can also be used in other contexts.
For example, Node.js runs JavaScript programs on a computer,
but provides a different set of APIs,
and the DOM API is not a core part of the Node.js runtime.

The DOM was designed to be independent of any particular programming language, making the structural representation of the document available from a single, consistent API.
Even if most web developers will only use the DOM through JavaScript, implementations of the DOM can be built for any language, as this Python example demonstrates:

```python
# Python DOM example
import xml.dom.minidom as m
doc = m.parse(r"C:\Projects\Py\chap1.xml")
doc.nodeName # DOM property of document object
p_list = doc.getElementsByTagName("para")
```

For more information on what technologies are involved in writing JavaScript on the web, see JavaScript technologies overview.

### Accessing the DOM

You don't have to do anything special to begin using the DOM.
You use the API directly in JavaScript from within what is called a _script_, a program run by a browser.

When you create a script, whether inline in a `<script>` element or included in the web page, you can immediately begin using the API for the `document` or `window` objects to manipulate the document itself, or any of the various elements in the web page (the descendant elements of the document). Your DOM programming may be something as simple as the following example, which displays a message on the console by using the `console.log()` function:

```html
<body onload="console.log('Welcome to my home page!');">
  …
</body>
```

As it is generally not recommended to mix the structure of the page (written in HTML)
and manipulation of the DOM (written in JavaScript),
the JavaScript parts will be grouped together here,
and separated from the HTML.

For example, the following function creates a new `<h1>` element,
adds text to that element,
and then adds it to the tree for the document:

```html
<html lang="en">
  <head> </head>
  <body>
    <script>
      // create a couple of elements in an otherwise empty HTML page
      const heading = document.createElement("h1");
      const headingText = document.createTextNode("Big Head!");
      heading.appendChild(headingText);
      document.body.appendChild(heading);
    </script>
  </body>
</html>
```

## DOM interfaces

The following are all interfaces defined by the DOM specification:

- `AbortController`
- `AbortSignal`
- `AbstractRange`
- `Attr`
- `CDATASection`
- `CharacterData`
- `Comment`
- `CustomEvent`
- `Document`
- `DocumentFragment`
- `DocumentType`
- `DOMError` (deprecated)
- `DOMException`
- `DOMImplementation`
- `DOMParser`
- `DOMTokenList`
- `Element`
- `Event`
- `EventTarget`
- `HTMLCollection`
- `MutationObserver`
- `MutationRecord`
- `NamedNodeMap`
- `Node`
- `NodeIterator`
- `NodeList`
- `ProcessingInstruction`
- `QuotaExceededError`
- `Range`
- `ShadowRoot`
- `StaticRange`
- `Text`
- `TreeWalker`
- `XMLDocument`
- `XPathEvaluator`
- `XPathExpression`
- `XPathResult`
- `XSLTProcessor`

This guide is about the objects and the actual _things_ you can use to manipulate the DOM hierarchy. There are many points where understanding how these work can be confusing. For example, the object representing the HTML `form` element gets its `name` property from the `HTMLFormElement` interface but its `className` property from the `HTMLElement` interface. In both cases, the property you want is in that form object.

But the relationship between objects and the interfaces that they implement in the DOM can be confusing, and so this section attempts to say a little something about the actual interfaces in the DOM specification and how they are made available.

### Interfaces and objects

Many objects implement several different interfaces. The table object, for example, implements a specialized `HTMLTableElement` interface, which includes such methods as `createCaption` and `insertRow`. But since it's also an HTML element, `table` implements the `Element` interface described in the DOM `Element` Reference chapter. And finally, since an HTML element is also, as far as the DOM is concerned, a node in the tree of nodes that make up the object model for an HTML or XML page, the table object also implements the more basic `Node` interface, from which `Element` derives.

When you get a reference to a `table` object, as in the following example, you routinely use all three of these interfaces interchangeably on the object, perhaps without knowing it.

```js
const table = document.getElementById("table");
const tableAttrs = table.attributes; // Node/Element interface
for (const attr of tableAttrs) {
  // HTMLTableElement interface: border attribute
  if (attr.nodeName.toLowerCase() === "border") {
    table.border = "1";
  }
}
// HTMLTableElement interface: summary attribute
table.summary = "note: increased border";
```

### Fundamental data types

This page tries to describe the various objects and types in simple terms. But there are a number of different data types being passed around the API that you should be aware of.

> **Note:**
> Because the vast majority of code that uses the DOM revolves around manipulating HTML documents, it's common to refer to the nodes in the DOM as **elements**, although strictly speaking not every node is an element.

The following table briefly describes these data types.

       | Data type (Interface)
       | Description

       | `Document`
       |
        When a member returns an object of type `document` (e.g., the
        `ownerDocument` property of an element returns the
        `document` to which it belongs), this object is the root
        `document` object itself. The
        DOM `document` Reference
        chapter describes the `document` object.

       | `Node`
       |
        Every object located within a document is a node of some kind. In an
        HTML document, an object can be an element node but also a text node or
        attribute node.

       | `Element`
       |
        The `element` type is based on `node`. It refers
        to an element or a node of type `element` returned by a
        member of the DOM API. Rather than saying, for example, that the
        `document.createElement()` method returns an
        object reference to a `node`, we just say that this method
        returns the `element` that has just been created in the DOM.
        `element` objects implement the DOM
        `Element` interface and also the more basic
        `Node` interface, both of which are included together in this
        reference. In an HTML document, elements are further enhanced by the
        HTML DOM API's `HTMLElement` interface as well as
        other interfaces describing capabilities of specific kinds of elements
        (for instance, `HTMLTableElement` for
        `` elements).

       | `Attr`
       |
        When an `attribute` is returned by a member (e.g., by the
        `createAttribute()` method), it is an object reference that
        exposes a special (albeit small) interface for attributes. Attributes
        are nodes in the DOM just like elements are, though you may rarely use
        them as such.

There are also some common terminology considerations to keep in mind. It's common to refer to any `Attr` node as an `attribute`, for example, and to refer to an array of DOM nodes as a `nodeList`. You'll find these terms and others to be introduced and used throughout the documentation.

The `document` and `window` objects are the objects whose interfaces you generally use most often in DOM programming. In simple terms, the `window` object represents something like the browser, and the `document` object is the root of the document itself. `Element` inherits from the generic `Node` interface, and together these two interfaces provide many of the methods and properties you use on individual elements. These elements may also have specific interfaces for dealing with the kind of data those elements hold, as in the `table` object example in the previous section.

### Obsolete DOM interfaces

The Document Object Model has been highly simplified. To achieve this, the following interfaces in the different DOM level 3 or earlier specifications have been removed. They are no longer available to web developers.

- `DOMConfiguration`
- `DOMErrorHandler`
- `DOMImplementationList`
- `DOMImplementationRegistry`
- `DOMImplementationSource`
- `DOMLocator`
- `DOMObject`
- `DOMSettableTokenList`
- `DOMUserData`
- `ElementTraversal`
- `Entity`
- `EntityReference`
- `NameList`
- `Notation`
- `TypeInfo`
- `UserDataHandler`

## HTML DOM

A document containing HTML is described using the `Document` interface, which is extended by the HTML specification to include various HTML-specific features. In particular, the `Element` interface is enhanced to become `HTMLElement` and various subclasses, each representing one of (or a family of closely related) elements.

The HTML DOM API provides access to various browser features such as tabs and windows, CSS styles and stylesheets, browser history, etc. These interfaces are discussed further in the HTML DOM API documentation.

## SVG DOM

Similarly, a document containing SVG is also described using the `Document` interface, which is extended by the SVG specification to include various SVG-specific features. In particular, the `Element` interface is enhanced to become `SVGElement` and various subclasses, each representing an element or a family of closely related elements. These interfaces are discussed further in the SVG API documentation.
