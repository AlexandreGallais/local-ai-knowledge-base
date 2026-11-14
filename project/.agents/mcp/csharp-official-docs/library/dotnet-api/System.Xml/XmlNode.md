---
title: "XmlNode class (part 1 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/XmlNode.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlNode class

Namespace: `System.Xml`

```csharp
public abstract class XmlNode : ICloneable, System.Collections.IEnumerable, System.Xml.XPath.IXPathNavigable
```

Represents a single node in the XML document.

#### Remarks
This class implements the W3C Document Object Model (DOM) Level 1 Core and the Core DOM Level 2. The DOM is an in-memory (cache) tree representation of an XML document. `XmlNode` is the base class in the .NET implementation of the DOM. It supports XPath selections and provides editing capabilities. The `XmlDocument` class extends `XmlNode` and represents an XML document. You can use `XmlDocument` to load and save XML data. It also includes methods for node creation. See XML Document Object Model (DOM) for more information.

> **Important:**
> Exceptions raised as a result of using the `XmlNode` class, such as the `XmlException` class may contain sensitive information that should not be exposed in untrusted scenarios. Exceptions should be properly handled so that this sensitive information is not exposed in untrusted scenarios.

## XmlNode.Attributes property

```csharp
public virtual System.Xml.XmlAttributeCollection? Attributes { get; }
```

Gets an `XmlAttributeCollection` containing the attributes of this node.

Returns: An `XmlAttributeCollection` containing the attributes of the node.

If the node is of type XmlNodeType.Element, the attributes of the node are returned. Otherwise, this property returns `null`.

#### Examples
The following example adds a new attribute to the XML document.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlNode/Attributes/source.cs._

## XmlNode.BaseURI property

```csharp
public virtual string BaseURI { get; }
```

Gets the base URI of the current node.

Returns: The location from which the node was loaded or String.Empty if the node has no base URI.

#### Remarks
A networked XML document is comprised of chunks of data aggregated using various W3C standard inclusion mechanisms and therefore contains nodes that come from different places. The `BaseURI` tells you where these nodes came from.

The value of this property varies depending on the node type. For example, Document nodes return the location of the `XmlDocument` object. Nodes which are child nodes of external EntityReference nodes return the location of the entity itself. For example, consider the following XML document:

```xml
<!DOCTYPE item [
<!ENTITY xyz SYSTEM "a/b.xml">
]>
&xyz;
```

where the external entity `a/b.xml` contains the XML text: `<test>123</test>`.

If the document is loaded from `http://server/mydata.xml`, `BaseURI` returns the following:

|NodeType|Name|BaseURI|
|--------------|----------|-------------|
|Attribute|num|`http://server/mydata.xml`|
|Document|#document|`http://server/mydata.xml`|
|DocumentType|item|`http://server/mydata.xml`|
|Entity|xyz|`http://server/mydata.xml`|
|Element|item|`http://server/mydata.xml`|
|EntityReference|xyz|`http://server/mydata.xml`|
|Element|test|`http://server/a/b.xml`|
|Text|#text|`http://server/a/b.xml`|

`BaseURI` looks for entity reference boundaries, so if entities are expanded this information is not preserved and this property returns the location of the `XmlDocument` object in all cases.

As a second example, given the following XML document:

```xml
<!DOCTYPE Mydata SYSTEM "http://localhost/doctype.dtd">
<baa>&xyz;</baa>
```

Where the DTD file contains the following:

```dtd
<!ENTITY xyz <E1>My Data</E1>
<!ELEMENT baa #PCDATA>
<!ATTLIST baa attr1 "woof">
```

If the XML document is loaded from `http://localhost/mydata.xml`, `BaseURI` returns the following for each of the nodes:

|NodeType|Name|BaseURI|
|--------------|----------|-------------|
|Document|#document|`http://localhost/mydata.xml`|
|DocumentType|Mydata|`http://localhost/mydata.xml` The `SystemId` or `PublicId` properties can be used to identify where the DTD file was loaded from.|
|Element|baa|`http://localhost/mydata.xml`|
|Entity|xyz|`http://localhost/doctype.dtd`|
|EntityReference|xyz|`http://localhost/mydata.xml`|
|Attribute|woof|`http://localhost/mydata.xml`|

> **Note:**
> The base URI of a default attribute is the same as the base URI of the element to which they belong.

This property is a Microsoft extension to the Document Object Model (DOM).

## XmlNode.ChildNodes property

```csharp
public virtual System.Xml.XmlNodeList ChildNodes { get; }
```

Gets all the child nodes of the node.

Returns: An object that contains all the child nodes of the node.

If there are no child nodes, this property returns an empty `XmlNodeList`.

#### Remarks
For information about child nodes, see the W3C DOM (Core) Level 1 specification

#### Examples
The following example displays all the child nodes of the root element.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlDocument/Overview/source2.cs._

## XmlNode.FirstChild property

```csharp
public virtual System.Xml.XmlNode? FirstChild { get; }
```

Gets the first child of the node.

Returns: The first child of the node. If there is no such node, `null` is returned.

#### Remarks
For information about child nodes, see the W3C DOM (Core) Level 1 specification

#### Examples
The following example displays the title element.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlNode/FirstChild/source.cs._

## XmlNode.HasChildNodes property

```csharp
public virtual bool HasChildNodes { get; }
```

Gets a value indicating whether this node has any child nodes.

Returns: `true` if the node has child nodes; otherwise, `false`.

#### Remarks
For information about child nodes, see the W3C DOM (Core) Level 1 specification

#### Examples
The following example displays all the child nodes of the root element.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlDocument/Overview/source2.cs._

## XmlNode.InnerText property

```csharp
public virtual string InnerText { get; set; }
```

Gets or sets the concatenated values of the node and all its child nodes.

Returns: The concatenated values of the node and all its child nodes.

#### Remarks
Setting this property replaces all the child nodes with the parsed contents of the given string.

For leaf nodes, `InnerText` returns the same content as the `Value` property.

This property is a Microsoft extension to the Document Object Model (DOM).

#### Examples
The following example compares the `InnerText` and `InnerXml` properties.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlNode/InnerText/source.cs._

**Output:**

```txt
Display the InnerText of the element...
some textmore text
Display the InnerXml of the element...
some textmore text
<elem>Text containing <markup/> will have char(<) and char(>) escape
d.</elem>
<elem>Text containing .</elem>
```

## XmlNode.InnerXml property

```csharp
public virtual string InnerXml { get; set; }
```

Gets or sets the markup representing only the child nodes of this node.

Returns: The markup of the child nodes of this node, not including default attributes.

Exceptions:

- `InvalidOperationException`: Setting this property on a node that cannot have child nodes.
- `XmlException`: The XML specified when setting this property is not well-formed.

#### Remarks
Attempting to set this property from a node that cannot have child nodes, for example a Text node, throws an exception. Otherwise, setting `InnerXml` replaces the child nodes of the node with the parsed contents of the given string. The parsing is done in the current namespace context.

This property is a Microsoft extension to the Document Object Model (DOM).

> **Note:**
> `InnerXml` is not an efficient way to modify the DOM. There may be performance issues when replacing complex nodes. It is more efficient to construct nodes and use methods such as `InsertBefore`, `InsertAfter`, `AppendChild`, and `RemoveChild` to modify the Xml document.

#### Examples
The following example compares the `InnerText` and `InnerXml` properties.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlNode/InnerText/source.cs._

## XmlNode.IsReadOnly property

```csharp
public virtual bool IsReadOnly { get; }
```

Gets a value indicating whether the node is read-only.

Returns: `true` if the node is read-only; otherwise, `false`.

#### Remarks
A read-only node is one whose properties, attributes, or child nodes cannot be changed. You can remove a read-only node from the tree and insert it somewhere else. For example, Entity nodes are always read-only.

This property is a Microsoft extension to the Document Object Model (DOM).

## XmlNode.Item property

```csharp
public virtual System.Xml.XmlElement? this[string name] { get; }
```

Gets the first child element with the specified `XmlNode.Name`.

Parameters:

- `name`: The qualified name of the element to retrieve.

Returns: The first `XmlElement` that matches the specified name. It returns a null reference (`Nothing` in Visual Basic) if there is no match.

#### Remarks
This property is a Microsoft extension to the Document Object Model (DOM).

#### Examples
The following example displays the title element.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlNode/Item/source.cs._

## XmlNode.Item property

```csharp
public virtual System.Xml.XmlElement? this[string localname, string ns] { get; }
```

Gets the first child element with the specified `XmlNode.LocalName` and `XmlNode.NamespaceURI`.

Parameters:

- `localname`: The local name of the element.
- `ns`: The namespace URI of the element.

Returns: The first `XmlElement` with the matching `localname` and `ns`. It returns a null reference (`Nothing` in Visual Basic) if there is no match.

#### Remarks
This property is a Microsoft extension to the Document Object Model (DOM).

## XmlNode.LastChild property

```csharp
public virtual System.Xml.XmlNode? LastChild { get; }
```

Gets the last child of the node.

Returns: The last child of the node. If there is no such node, `null` is returned.

#### Examples
The following example displays the price element.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlDocument/Overview/source3.cs._

## XmlNode.LocalName property

```csharp
public abstract string LocalName { get; }
```

Gets the local name of the node, when overridden in a derived class.

Returns: The name of the node with the prefix removed. For example, `LocalName` is book for the element <bk:book>.

The name returned is dependent on the `XmlNode.NodeType` of the node:

-  Attribute

:  The local name of the attribute.

-  CDATA

:  #cdata-section

-  Comment

:  #comment

-  Document

:  #document

-  DocumentFragment

:  #document-fragment

-  DocumentType

:  The document type name.

-  Element

:  The local name of the element.

-  Entity

:  The name of the entity.

-  EntityReference

:  The name of the entity referenced.

-  Notation

:  The notation name.

-  ProcessingInstruction

:  The target of the processing instruction.

-  Text

:  #text

-  Whitespace

:  #whitespace

-  SignificantWhitespace

:  #significant-whitespace

-  XmlDeclaration

:  #xml-declaration

#### Remarks
If the node does not have a prefix, LocalName is the same as `Name`.

## XmlNode.Name property

```csharp
public abstract string Name { get; }
```

Gets the qualified name of the node, when overridden in a derived class.

Returns: The qualified name of the node. The name returned is dependent on the `XmlNode.NodeType` of the node:

-  Attribute

:  The qualified name of the attribute.

-  CDATA

:  #cdata-section

-  Comment

:  #comment

-  Document

:  #document

-  DocumentFragment

:  #document-fragment

-  DocumentType

:  The document type name.

-  Element

:  The qualified name of the element.

-  Entity

:  The name of the entity.

-  EntityReference

:  The name of the entity referenced.

-  Notation

:  The notation name.

-  ProcessingInstruction

:  The target of the processing instruction.

-  Text

:  #text

-  Whitespace

:  #whitespace

-  SignificantWhitespace

:  #significant-whitespace

-  XmlDeclaration

:  #xml-declaration

To be added.

## XmlNode.NamespaceURI property

```csharp
public virtual string NamespaceURI { get; }
```

Gets the namespace URI of this node.

Returns: The namespace URI of this node. If there is no namespace URI, this property returns String.Empty.

#### Remarks
This is the namespace URI specified at creation time. For example, `NamespaceURI` is urn:samples for the element \<bk:book xmlns:bk= "urn:samples">

An attribute does not inherit its namespace from the element it is attached to. If an attribute is not explicitly given a namespace, it simply has no namespace.

## XmlNode.NextSibling property

```csharp
public virtual System.Xml.XmlNode? NextSibling { get; }
```

Gets the node immediately following this node.

Returns: The next `XmlNode`. If there is no next node, `null` is returned.

#### Examples
The following example displays all the books in the XML document.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlDocument/Overview/source4.cs._

## XmlNode.NodeType property

```csharp
public abstract System.Xml.XmlNodeType NodeType { get; }
```

Gets the type of the current node, when overridden in a derived class.

Returns: One of the `XmlNodeType` values.

#### Remarks
This property never returns the `XmlNodeType` EndElement, EndEntity or None.

## XmlNode.OuterXml property

```csharp
public virtual string OuterXml { get; }
```

Gets the markup containing this node and all its child nodes.

Returns: The markup containing this node and all its child nodes, not including default attributes.

#### Remarks
This property is a Microsoft extension to the Document Object Model (DOM).

#### Examples
The following example compares output from the `InnerXml` and `OuterXml` properties.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlNode/OuterXml/source.cs._

## XmlNode.OwnerDocument property

```csharp
public virtual System.Xml.XmlDocument? OwnerDocument { get; }
```

Gets the `XmlDocument` to which this node belongs.

Returns: The `XmlDocument` to which this node belongs.

If the node is an `XmlDocument` (NodeType equals XmlNodeType.Document), this property returns `null`.

#### Remarks
When adding nodes to the current node, use the `XmlDocument` returned by the `OwnerDocument` property to create the node.

#### Examples
See `OwnerDocument` (in the XmlElement class) for an example using this property.
