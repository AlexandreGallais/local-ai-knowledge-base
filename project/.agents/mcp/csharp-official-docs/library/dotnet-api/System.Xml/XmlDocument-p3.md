---
title: "XmlDocument class (part 3 of 7)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/XmlDocument.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlDocument class (part 3 of 7)

## XmlDocument.CreateCDataSection(String) method

```csharp
public virtual System.Xml.XmlCDataSection CreateCDataSection (string? data);
```

Creates an `XmlCDataSection` containing the specified data.

Parameters:

- `data`: The content of the new `XmlCDataSection`.

Returns: The new `XmlCDataSection`.

#### Remarks
Although this method creates the new object in the context of the document, it does not automatically add the new object to the document tree. To add the new object, you must explicitly call one of the node insert methods.

According to the W3C Extensible Markup Language (XML) 1.0 recommendation, CDataSection nodes are allowed within Element nodes and in EntityReference nodes when the EntityReference node is not a child of an Attribute node.

#### Examples

The following example creates a CDATA node and adds it to the document.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlDocument/CreateCDataSection/source.cs._

## XmlDocument.CreateComment(String) method

```csharp
public virtual System.Xml.XmlComment CreateComment (string? data);
```

Creates an `XmlComment` containing the specified data.

Parameters:

- `data`: The content of the new `XmlComment`.

Returns: The new `XmlComment`.

#### Remarks
Although this method creates the new object in the context of the document, it does not automatically add the new object to the document tree. To add the new object, you must explicitly call one of the node insert methods.

According to the W3C Extensible Markup Language (XML) 1.0 recommendation, Comment nodes are only allowed within Document, Element and EntityReference nodes, when the EntityReference node is not a child of an Attribute node.

#### Examples

The following example creates a comment and adds it to an XML document.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlDocument/CreateComment/source.cs._

## XmlDocument.CreateDefaultAttribute(String, String, String) method

```csharp
protected internal virtual System.Xml.XmlAttribute CreateDefaultAttribute (string? prefix, string localName, string? namespaceURI);
```

Creates a default attribute with the specified prefix, local name and namespace URI.

Parameters:

- `prefix`: The prefix of the attribute (if any).
- `localName`: The local name of the attribute.
- `namespaceURI`: The namespace URI of the attribute (if any).

Returns: The new `XmlAttribute`.

#### Remarks
This method is a Microsoft extension to the Document Object Model (DOM).

## XmlDocument.CreateDocumentFragment() method

```csharp
public virtual System.Xml.XmlDocumentFragment CreateDocumentFragment ();
```

Creates an `XmlDocumentFragment`.

Returns: The new `XmlDocumentFragment`.

#### Remarks
DocumentFragment nodes cannot be inserted into a document. However, you can insert children of the DocumentFragment node into a document.

#### Examples

The following example adds new nodes to an XML document.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlDocument/CreateDocumentFragment/source.cs._
[!code-vbClassic WebData XmlDocument.CreateDocumentFragment Example#1]

## XmlDocument.CreateDocumentType(String, String, String, String) method

```csharp
public virtual System.Xml.XmlDocumentType CreateDocumentType (string name, string? publicId, string? systemId, string? internalSubset);
```

Returns a new `XmlDocumentType` object.

Parameters:

- `name`: The name of the document type.
- `publicId`: The public identifier of the document type or `null`. You can specify a public URI and also a system identifier to identify the location of the external DTD subset.
- `systemId`: The system identifier of the document type or `null`. Specifies the URL of the file location for the external DTD subset.
- `internalSubset`: The DTD internal subset of the document type or `null`.

Returns: The new `XmlDocumentType`.

#### Remarks
The returned node will have parsed `Entities` and `Notations` collections.

Although this method creates the new object in the context of the document, it does not automatically add the new object to the document tree. To add the new object, you must explicitly call one of the node insert methods.

According to the W3C Extensible Markup Language (XML) 1.0 recommendation, DocumentType nodes are only allowed within Document nodes. Each `XmlDocument` can have only one DocumentType node. The DocumentType node must also be inserted before the root element of the `XmlDocument` (if the document already has a root element, you cannot add a DocumentType node).
If the passed parameters do not combine to build a valid `XmlDocumentType`, an exception is thrown.

#### Examples

The following example creates a DocumentType node and adds it to an XML document.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlDocument/CreateDocumentType/source.cs._
[!code-vbClassic WebData XmlDocument.CreateDocumentType Example#1]

## XmlDocument.CreateElement(String) method

```csharp
public System.Xml.XmlElement CreateElement (string name);
```

Creates an element with the specified name.

Parameters:

- `name`: The qualified name of the element. If the name contains a colon then the `XmlNode.Prefix` property reflects the part of the name preceding the colon and the `XmlDocument.LocalName` property reflects the part of the name after the colon. The qualified name cannot include a prefix of 'xmlns'.

Returns: The new `XmlElement`.

#### Remarks
Note that the instance returned implements the `XmlElement` interface, so default attributes would be created directly on the returned object.

Although this method creates the new object in the context of the document, it does not automatically add the new object to the document tree. To add the new object, you must explicitly call one of the node insert methods.

According to the W3C Extensible Markup Language (XML) 1.0 recommendation, Element nodes are allowed within Document and Element nodes, and in EntityReference nodes when the EntityReference node is not a child of an Attribute node.

#### Examples

The following example creates a new element and adds it to the document.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlDocument/CreateElement/source.cs._
[!code-vbClassic WebData XmlDocument.CreateElement Example#1]

The example produces the following output:

```output
Display the modified XML...
<?xml version="1.0" encoding="utf-8"?>
<book genre="novel" ISBN="1-861001-57-5">
  <title>Pride And Prejudice</title>
  <price>19.95</price>
</book>
```

## XmlDocument.CreateElement(String, String) method

```csharp
public System.Xml.XmlElement CreateElement (string qualifiedName, string? namespaceURI);
```

Creates an `XmlElement` with the qualified name and `XmlNode.NamespaceURI`.

Parameters:

- `qualifiedName`: The qualified name of the element. If the name contains a colon then the `XmlNode.Prefix` property will reflect the part of the name preceding the colon and the `XmlDocument.LocalName` property will reflect the part of the name after the colon. The qualified name cannot include a prefix of 'xmlns'.
- `namespaceURI`: The namespace URI of the element.

Returns: The new `XmlElement`.

#### Remarks

The following C# code:

```csharp
XmlElement elem;
elem=doc.CreateElement("xy:item", "urn:abc");
```

...results in an element that's equivalent to the following XML.

```xml

```

Although this method creates the new object in the context of the document, it does not automatically add the new object to the document tree. To add the new object, you must explicitly call one of the node insert methods.

According to the W3C Extensible Markup Language (XML) 1.0 recommendation, Element nodes are allowed within Document and Element nodes, and in EntityReference nodes when the EntityReference node is not a child of an Attribute node.

## XmlDocument.CreateElement(String, String, String) method

```csharp
public virtual System.Xml.XmlElement CreateElement (string? prefix, string localName, string? namespaceURI);
```

Creates an element with the specified `XmlNode.Prefix`, `XmlDocument.LocalName`, and `XmlNode.NamespaceURI`.

Parameters:

- `prefix`: The prefix of the new element (if any). String.Empty and `null` are equivalent.
- `localName`: The local name of the new element.
- `namespaceURI`: The namespace URI of the new element (if any). String.Empty and `null` are equivalent.

Returns: The new `XmlElement`.

#### Remarks

The following C# code:

```csharp
XmlElement elem;
elem=doc.CreateElement("xy", "item", "urn:abc");
```

...creates an element equivalent to the following XML:

```xml

```

Although this method creates the new object in the context of the document, it does not automatically add the new object to the document tree. To add the new object, you must explicitly call one of the node insert methods.

According to the W3C Extensible Markup Language (XML) 1.0 recommendation, Element nodes are allowed within Document and Element nodes, and in EntityReference nodes when the EntityReference is outside an Attribute node.

This method is a Microsoft extension to the Document Object Model (DOM).

#### Examples

The following example adds a new element to the existing XML document.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlDocument/CreateElement/source1.cs._
[!code-vbClassic WebData XmlDocument.CreateElement2 Example#1]

## XmlDocument.CreateEntityReference(String) method

```csharp
public virtual System.Xml.XmlEntityReference CreateEntityReference (string name);
```

Creates an `XmlEntityReference` with the specified name.

Parameters:

- `name`: The name of the entity reference.

Returns: The new `XmlEntityReference`.

Exceptions:

- `ArgumentException`: The name is invalid (for example, names starting with'#' are invalid.)

#### Remarks
If the referenced entity is known, the child list of the `XmlEntityReference` node is made the same as that of the corresponding `XmlEntity` node.

The namespaces used in the replacement text for the entity reference are bound at the time the parent of the entity reference node is first set (for example, when the entity reference node is inserted into the document). For example, given the following entity:

```dtd
<!ENTITY a "test">
```

If you call `CreateEntityReference("a")`, you get back a single node of type EntityReference with no children. If you append this node as a child of the following node, ``, then, at the time of calling `XmlNode.AppendChild`, the parent of the newly created entity reference node is set and the children are expanded in this namespace context. The child element node `b` will have NamespaceURI equal to `urn:1`. The child nodes of the entity reference remain the same even if you move the entity reference to a place in the document that has a different default namespace context. This does not happen for existing entity reference nodes when you remove and insert them or for entity references that you clone with `XmlDocument.CloneNode`. It only happens for newly created entity references.

If the corresponding entity is not defined in the DocumentType when the entity reference node is added, because the entity reference is not defined, its only child node will be an empty text node.

The built-in entities amp, lt, gt, apos, and quot are also allowed, and they will have a child text node with the appropriate expanded character value.

Although this method creates the new object in the context of the document, it does not automatically add the new object to the document tree. To add the new object, you must explicitly call one of the node insert methods.

According to the W3C Extensible Markup Language (XML) 1.0 recommendation, EntityReference nodes are only allowed within Element, Attribute and EntityReference nodes.

#### Examples

The following example creates two entity reference nodes and inserts them into an XML document.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlDocument/CreateEntityReference/source.cs._
[!code-vbClassic WebData XmlDocument.CreateEntityReference Example#1]

## XmlDocument.CreateNavigator() method

```csharp
public override System.Xml.XPath.XPathNavigator? CreateNavigator ();
```

Creates a new `XPathNavigator` object for navigating this document.

Returns: An `XPathNavigator` object.

#### Remarks
This method is a Microsoft extension to the Document Object Model (DOM).

#### Examples
See `XmlNode.CreateNavigator` for an example using this method.

## XmlDocument.CreateNavigator(XmlNode) method

```csharp
protected internal virtual System.Xml.XPath.XPathNavigator? CreateNavigator (System.Xml.XmlNode node);
```

Creates an `XPathNavigator` object for navigating this document positioned on the `XmlNode` specified.

Parameters:

- `node`: The `XmlNode` you want the navigator initially positioned on.

Returns: An `XPathNavigator` object.

#### Remarks
This method is a Microsoft extension to the Document Object Model (DOM).

#### Examples
See `XmlNode.CreateNavigator` for an example using this method.
