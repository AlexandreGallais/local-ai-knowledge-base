---
title: "XmlDocumentType class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/XmlDocumentType.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlDocumentType class

Namespace: `System.Xml`

```csharp
public class XmlDocumentType : System.Xml.XmlLinkedNode
```

Represents the document type declaration.

#### Remarks
The `XmlDocumentType` class can be used to return information about a document type declaration. Use the `XmlDocument.CreateDocumentType` method to create an `XmlDocumentType` object.

## XmlDocumentType.XmlDocumentType(String, String, String, String, XmlDocument) constructor

```csharp
protected internal XmlDocumentType (string name, string? publicId, string? systemId, string? internalSubset, System.Xml.XmlDocument doc);
```

Initializes a new instance of the `XmlDocumentType` class.

Parameters:

- `name`: The qualified name; see the `XmlDocumentType.Name` property.
- `publicId`: The public identifier; see the `XmlDocumentType.PublicId` property.
- `systemId`: The system identifier; see the `XmlDocumentType.SystemId` property.
- `internalSubset`: The DTD internal subset; see the `XmlDocumentType.InternalSubset` property.
- `doc`: The parent document.

#### Remarks
Do not instantiate an `XmlDocumentType` directly; instead, use members such as `DocumentType` to obtain one.

## XmlDocumentType.Entities property

```csharp
public System.Xml.XmlNamedNodeMap Entities { get; }
```

Gets the collection of `XmlEntity` nodes declared in the document type declaration.

Returns: An `XmlNamedNodeMap` containing the `XmlEntity` nodes. The returned `XmlNamedNodeMap` is read-only.

#### Remarks
The order in which the entities are returned is not based on the order in which these items may appear in the document. The order is also not guaranteed to be the same between similar documents, or between different implementations or versions of the class.

#### Examples
The following example displays information about the entities declared in the XML document.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlDocumentType/Entities/entities.cs._

The example uses the file `doment.xml` as input.

_Code sample not included: ~/snippets/xml/VS_Snippets_Data/XmlEntity/XML/doment.xml._
## XmlDocumentType.InternalSubset property

```csharp
public string? InternalSubset { get; }
```

Gets the value of the document type definition (DTD) internal subset on the DOCTYPE declaration.

Returns: The DTD internal subset on the DOCTYPE. If there is no DTD internal subset, String.Empty is returned.

#### Examples
The following example displays information about the DocumentType node.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlDocumentType/InternalSubset/source.cs._

## XmlDocumentType.IsReadOnly property

```csharp
public override bool IsReadOnly { get; }
```

Gets a value indicating whether the node is read-only.

Returns: `true` if the node is read-only; otherwise, `false`.

Because DocumentType nodes are read-only, this property always returns `true`.

#### Remarks
A read-only node is one whose properties, attributes, or children cannot be changed. However, you can remove a read-only node from the tree and insert it somewhere else.

You can remove a `XmlDocumentType` from a document and reinsert it back into the document as long as the document does not have an element node. Once a document has a root element, its `XmlDocumentType` cannot be changed.

This property is a Microsoft extension to the Document Object Model (DOM).

#### Examples
The following example displays information about the DocumentType node.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlDocumentType/IsReadOnly/source.cs._

## XmlDocumentType.LocalName property

```csharp
public override string LocalName { get; }
```

Gets the local name of the node.

Returns: For DocumentType nodes, this property returns the name of the document type.

To be added.

## XmlDocumentType.Name property

```csharp
public override string Name { get; }
```

Gets the qualified name of the node.

Returns: For DocumentType nodes, this property returns the name of the document type.

#### Examples
The following example displays information about the DocumentType node.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlDocumentType/InternalSubset/source.cs._

## XmlDocumentType.NodeType property

```csharp
public override System.Xml.XmlNodeType NodeType { get; }
```

Gets the type of the current node.

Returns: For DocumentType nodes, this value is XmlNodeType.DocumentType.

To be added.

## XmlDocumentType.Notations property

```csharp
public System.Xml.XmlNamedNodeMap Notations { get; }
```

Gets the collection of `XmlNotation` nodes present in the document type declaration.

Returns: An `XmlNamedNodeMap` containing the `XmlNotation` nodes. The returned `XmlNamedNodeMap` is read-only.

#### Remarks
The order in which the notations are returned is not based on the order in which these items may appear in the document. The order is also not guaranteed to be the same between similar documents, or between different implementations or versions of the class.

#### Examples
The following example displays information about the notations declared in the XML document.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlDocumentType/Notations/notation.cs._

The example uses the file `doment.xml` as input.

_Code sample not included: ~/snippets/xml/VS_Snippets_Data/XmlNotation/XML/doment.xml._
## XmlDocumentType.PublicId property

```csharp
public string? PublicId { get; }
```

Gets the value of the public identifier on the DOCTYPE declaration.

Returns: The public identifier on the DOCTYPE. If there is no public identifier, `null` is returned.

To be added.

## XmlDocumentType.SystemId property

```csharp
public string? SystemId { get; }
```

Gets the value of the system identifier on the DOCTYPE declaration.

Returns: The system identifier on the DOCTYPE. If there is no system identifier, `null` is returned.

To be added.

## XmlDocumentType.CloneNode(Boolean) method

```csharp
public override System.Xml.XmlNode CloneNode (bool deep);
```

Creates a duplicate of this node.

Parameters:

- `deep`: `true` to recursively clone the subtree under the specified node; `false` to clone only the node itself. For document type nodes, the cloned node always includes the subtree, regardless of the parameter setting.

Returns: The cloned node.

#### Remarks
This method serves as a copy constructor for nodes. The cloned node has no parent (`ParentNode` returns `null`).

To see how this method behaves with other node types, see `XmlNode.CloneNode`.

## XmlDocumentType.WriteContentTo(XmlWriter) method

```csharp
public override void WriteContentTo (System.Xml.XmlWriter w);
```

Saves all the children of the node to the specified `XmlWriter`. For `XmlDocumentType` nodes, this method has no effect.

Parameters:

- `w`: The `XmlWriter` to which you want to save.

To be added.

## XmlDocumentType.WriteTo(XmlWriter) method

```csharp
public override void WriteTo (System.Xml.XmlWriter w);
```

Saves the node to the specified `XmlWriter`.

Parameters:

- `w`: The `XmlWriter` to which you want to save.

To be added.
