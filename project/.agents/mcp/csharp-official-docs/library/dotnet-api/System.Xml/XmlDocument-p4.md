---
title: "XmlDocument class (part 4 of 7)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/XmlDocument.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlDocument class (part 4 of 7)

## XmlDocument.CreateNode(String, String, String) method

```csharp
public virtual System.Xml.XmlNode CreateNode (string nodeTypeString, string name, string? namespaceURI);
```

Creates an `XmlNode` with the specified node type, `XmlDocument.Name`, and `XmlNode.NamespaceURI`.

Parameters:

- `nodeTypeString`: String version of the `XmlNodeType` of the new node. This parameter must be one of the values listed in the table below.
- `name`: The qualified name of the new node. If the name contains a colon, it is parsed into `XmlNode.Prefix` and `XmlDocument.LocalName` components.
- `namespaceURI`: The namespace URI of the new node.

Returns: The new `XmlNode`.

Exceptions:

- `ArgumentException`: The name was not provided and the `XmlNodeType` requires a name; or `nodeTypeString` is not one of the strings listed below.

#### Remarks

The `nodeTypeString` parameter is case sensitive and must be one of the values in the following table.

| nodeTypeString        | XmlNodeType           |
|-----------------------|-----------------------|
| attribute             | Attribute             |
| cdatasection          | CDATA                 |
| comment               | Comment               |
| document              | Document              |
| documentfragment      | DocumentFragment      |
| documenttype          | DocumentType          |
| element               | Element               |
| entityreference       | EntityReference       |
| processinginstruction | ProcessingInstruction |
| significantwhitespace | SignificantWhitespace |
| text                  | Text                  |
| whitespace            | Whitespace            |

Although this method creates the new object in the context of the document, it does not automatically add the new object to the document tree. To add the new object, you must explicitly call one of the node insert methods.

The following table shows you what NodeType[row] is allowed inside another NodeType[column] according to the W3C Extensible Markup Language (XML) 1.0 recommendation.

| Node type         | Document | DocumentType | XmlDeclaration | Element | Attribute | Text | CDATA | Markup | EntityReference |
|-------------------|----------|--------------|----------------|---------|-----------|------|-------|--------|-----------------|
| `Document`        | no       | no           | no             | no      | no        | no   | no    | no     | no              |
| `DocumentType`    | yes      | no           | no             | no      | no        | no   | no    | no     | no              |
| `XmlDeclaration`  | yes\*    | no           | no             | no      | no        | no   | no    | no     | no              |
| `Element`         | yes      | no           | no             | yes     | no        | no   | no    | no     | yes†            |
| `Attribute`       | no       | no           | no             | yes‡ | no | no  | no    | no     | no              |
| `Text`            | no       | no           | no             | yes     | yes       | no   | no    | no     | yes             |
| `CDATA`           | no       | no           | no             | yes     | no        | no   | no    | no     | yes†            |
| `Markup`§ | yes   | no           | no             | yes     | no        | no   | no    | no     | no              |
| `EntityReference` | no       | no           | no             | yes     | yes       | no   | no    | no     | yes             |

\* The `XmlDeclaration` node must be the first child of the Document node.

§ `Markup` includes `ProcessingInstruction` and `Comment` nodes.

† `Element` and `CDATA` nodes are only allowed in `EntityReference` nodes when the `EntityReference` node is not a child of an `Attribute` node.

‡ Attributes are not children of an `Element` node. Attributes are contained inside an attribute collection that belongs to an `Element` node.

This method is a Microsoft extension to the Document Object Model (DOM).

#### Examples

The following example creates a new element and inserts it into the document.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlDocument/CreateNode/source1.cs._
[!code-vbClassic WebData XmlDocument.CreateNode1 Example#1]

## XmlDocument.CreateNode(XmlNodeType, String, String) method

```csharp
public virtual System.Xml.XmlNode CreateNode (System.Xml.XmlNodeType type, string name, string? namespaceURI);
```

Creates an `XmlNode` with the specified `XmlNodeType`, `XmlDocument.Name`, and `XmlNode.NamespaceURI`.

Parameters:

- `type`: The `XmlNodeType` of the new node.
- `name`: The qualified name of the new node. If the name contains a colon then it is parsed into `XmlNode.Prefix` and `XmlDocument.LocalName` components.
- `namespaceURI`: The namespace URI of the new node.

Returns: The new `XmlNode`.

Exceptions:

- `ArgumentException`: The name was not provided and the `XmlNodeType` requires a name.

#### Remarks
Although this method creates the new object in the context of the document, it does not automatically add the new object to the document tree. To add the new object, you must explicitly call one of the node insert methods.

The following table shows you what NodeType[row] is allowed inside another NodeType[column] according to the W3C Extensible Markup Language (XML) 1.0 recommendation.

| Node type         | Document | DocumentType | XmlDeclaration | Element | Attribute | Text | CDATA | Markup | EntityReference |
|-------------------|----------|--------------|----------------|---------|-----------|------|-------|--------|-----------------|
| `Document`        | no       | no           | no             | no      | no        | no   | no    | no     | no              |
| `DocumentType`    | yes      | no           | no             | no      | no        | no   | no    | no     | no              |
| `XmlDeclaration`  | yes\*    | no           | no             | no      | no        | no   | no    | no     | no              |
| `Element`         | yes      | no           | no             | yes     | no        | no   | no    | no     | yes†            |
| `Attribute`       | no       | no           | no             | yes‡    | no        | no   | no    | no     | no              |
| `Text`            | no       | no           | no             | yes     | yes       | no   | no    | no     | yes             |
| `CDATA`           | no       | no           | no             | yes     | no        | no   | no    | no     | yes†            |
| `Markup`§         | yes      | no           | no             | yes     | no        | no   | no    | no     | no              |
| `EntityReference` | no       | no           | no             | yes     | yes       | no   | no    | no     | yes             |

\* The `XmlDeclaration` node must be the first child of the Document node.

§ `Markup` includes `ProcessingInstruction` and `Comment` nodes.

† `Element` and `CDATA` nodes are only allowed in `EntityReference` nodes when the `EntityReference` node is not a child of an `Attribute` node.

‡ Attributes are not children of an `Element` node. Attributes are contained inside an attribute collection that belongs to an `Element` node.

This method is a Microsoft extension to the Document Object Model (DOM).

#### Examples

The following example creates a new element and inserts it into an XML document.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlDocument/CreateNode/source.cs._
[!code-vbClassic WebData XmlDocument.CreateNode Example#1]

## XmlDocument.CreateNode(XmlNodeType, String, String, String) method

```csharp
public virtual System.Xml.XmlNode CreateNode (System.Xml.XmlNodeType type, string? prefix, string name, string? namespaceURI);
```

Creates a `XmlNode` with the specified `XmlNodeType`, `XmlNode.Prefix`, `XmlDocument.Name`, and `XmlNode.NamespaceURI`.

Parameters:

- `type`: The `XmlNodeType` of the new node.
- `prefix`: The prefix of the new node.
- `name`: The local name of the new node.
- `namespaceURI`: The namespace URI of the new node.

Returns: The new `XmlNode`.

Exceptions:

- `ArgumentException`: The name was not provided and the `XmlNodeType` requires a name.

#### Remarks
Although this method creates the new object in the context of the document, it does not automatically add the new object to the document tree. To add the new object, you must explicitly call one of the node insert methods.

The following table shows you what NodeType[row] is allowed inside another NodeType[column] according to the W3C Extensible Markup Language (XML) 1.0 recommendation.

|                   | Document | DocumentType | XmlDeclaration | Element | Attribute | Text | CDATA | Markup | EntityReference |
|-------------------|----------|--------------|----------------|---------|-----------|------|-------|--------|-----------------|
| `Document`        | no       | no           | no             | no      | no        | no   | no    | no     | no              |
| `DocumentType`    | yes      | no           | no             | no      | no        | no   | no    | no     | no              |
| `XmlDeclaration`  | yes\*    | no           | no             | no      | no        | no   | no    | no     | no              |
| `Element`         | yes      | no           | no             | yes     | no        | no   | no    | no     | yes†            |
| `Attribute`       | no       | no           | no             | yes‡    | no        | no   | no    | no     | no              |
| `Text`            | no       | no           | no             | yes     | yes       | no   | no    | no     | yes             |
| `CDATA`           | no       | no           | no             | yes     | no        | no   | no    | no     | yes†            |
| `Markup`§         | yes      | no           | no             | yes     | no        | no   | no    | no     | no              |
| `EntityReference` | no       | no           | no             | yes     | yes       | no   | no    | no     | yes             |

\* The XmlDeclaration node must be the first child of the Document node.

§ `Markup` includes `ProcessingInstruction` and `Comment` nodes.

† `Element` and `CDATA` nodes are only allowed in `EntityReference` nodes when the `EntityReference` node is not a child of an `Attribute` node.

‡ Attributes are not children of an `Element` node. Attributes are contained inside an attribute collection that belongs to an `Element` node.

This method is a Microsoft extension to the Document Object Model (DOM).

#### Examples

The following example adds a new element to the document.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlDocument/CreateNode/source2.cs._
[!code-vbClassic WebData XmlDocument.CreateNode2 Example#1]

## XmlDocument.CreateProcessingInstruction(String, String) method

```csharp
public virtual System.Xml.XmlProcessingInstruction CreateProcessingInstruction (string target, string? data);
```

Creates an `XmlProcessingInstruction` with the specified name and data.

Parameters:

- `target`: The name of the processing instruction.
- `data`: The data for the processing instruction.

Returns: The new `XmlProcessingInstruction`.

#### Remarks
Although this method creates the new object in the context of the document, it does not automatically add the new object to the document tree. To add the new object, you must explicitly call one of the node insert methods.

According to the W3C Extensible Markup Language (XML) 1.0 recommendation, ProcessingInstruction nodes are only allowed within Document, Element, and EntityReference nodes, when the EntityReference node is not a child of an Attribute node.

#### Examples

The following example creates a ProcessingInstruction node and adds it to the document.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlDocument/CreateProcessingInstruction/source.cs._
[!code-vbClassic WebData XmlDocument.CreateProcessingInstruction Example#1]

## XmlDocument.CreateSignificantWhitespace(String) method

```csharp
public virtual System.Xml.XmlSignificantWhitespace CreateSignificantWhitespace (string? text);
```

Creates an `XmlSignificantWhitespace` node.

Parameters:

- `text`: The string must contain only the following characters &#20; &#10; &#13; and &#9;.

Returns: A new `XmlSignificantWhitespace` node.

#### Remarks
This method is a Microsoft extension to the Document Object Model (DOM). It is used when you want to manually format your document.

Although this method creates the new object in the context of the document, it does not automatically add the new object to the document tree. To add the new object, you must explicitly call one of the node insert methods.

#### Examples

The following example adds significant white space to the document.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlDocument/CreateSignificantWhitespace/source.cs._
[!code-vbClassic WebData XmlDocument.CreateSignificantWhitespace Example#1]

## XmlDocument.CreateTextNode(String) method

```csharp
public virtual System.Xml.XmlText CreateTextNode (string? text);
```

Creates an `XmlText` with the specified text.

Parameters:

- `text`: The text for the Text node.

Returns: The new node.

#### Remarks

Although this method creates the new object in the context of the document, it does not automatically add the new object to the document tree. To add the new object, you must explicitly call one of the node insert methods.

According to the W3C Extensible Markup Language (XML) 1.0 recommendation, Text nodes are only allowed within Element, Attribute and EntityReference nodes.

#### Examples

The following example creates a new element and adds it to the document.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlDocument/CreateElement/source.cs._

## XmlDocument.CreateWhitespace(String) method

```csharp
public virtual System.Xml.XmlWhitespace CreateWhitespace (string? text);
```

Creates an `XmlWhitespace` node.

Parameters:

- `text`: The string must contain only the following characters &#20; &#10; &#13; and &#9;.

Returns: A new `XmlWhitespace` node.

#### Remarks
This method is a Microsoft extension to the Document Object Model (DOM). It is used when you want to manually format your document.

Although this method creates the new object in the context of the document, it does not automatically add the new object to the document tree. To add the new object, you must explicitly call one of the node insert methods.

#### Examples

The following example adds white space to the document.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlDocument/CreateWhitespace/source.cs._
[!code-vbClassic WebData XmlDocument.CreateWhitespace Example#1]
