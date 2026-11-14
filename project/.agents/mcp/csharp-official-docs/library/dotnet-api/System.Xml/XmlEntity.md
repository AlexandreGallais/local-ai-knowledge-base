---
title: "XmlEntity class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/XmlEntity.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlEntity class

Namespace: `System.Xml`

```csharp
public class XmlEntity : System.Xml.XmlNode
```

Represents an entity declaration, such as <!ENTITY... >.

To be added.

## XmlEntity.BaseURI property

```csharp
public override string BaseURI { get; }
```

Gets the base Uniform Resource Identifier (URI) of the current node.

Returns: The location from which the node was loaded.

#### Remarks
A networked XML document is comprised of chunks of data aggregated using various World Wide Web Consortium (W3C) standard inclusion mechanisms and therefore contains nodes that come from different places. The `BaseURI` tells you where these nodes came from.

The value of this property varies depending on the node type. Nodes which are children of external EntityReference nodes return the location of the entity itself. For example, consider the following XML document:

```xml
<!DOCTYPE item [
<!ENTITY xyz SYSTEM "a/b.xml">
]>
&xyz;
```

where the external entity `a/b.xml` contains the XML text `<test>123</test>`.

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

`BaseURI` looks for entity reference boundaries, so if entities are expanded, this information is not preserved and this property returns the location of the `XmlDocument` object in all cases.

As a second example, given the following XML document:

```xml
<!DOCTYPE Mydata SYSTEM "http://localhost/doctype.dtd">
<baa>&xyz;</baa>
```

where the document type definition (DTD) file contains the following:

```
<!ENTITY xyz "<E1>My Data</E1>">
<!ELEMENT baa #PCDATA>
<!ATTLIST baa attr1 "woof">
```

If the XML document is loaded from http://localhost/mydata.xml, `BaseURI` returns the following for each of the nodes:

|NodeType|Name|BaseURI|
|--------------|----------|-------------|
|Document|#document|http://localhost/mydata.xml|
|DocumentType|Mydata|http://localhost/doctype.dtd|
|Element|baa|http://localhost/mydata.xml|
|Entity|xyz|http://localhost/doctype.dtd|
|EntityReference|xyz|http://localhost/mydata.xml|
|Attribute|woof|http://localhost/mydata.xml|

> **Note:**
> The base URI of a default attribute is the same as the base URI of the element to which they belong.

This property is a Microsoft extension to the Document Object Model (DOM).

## XmlEntity.InnerText property

```csharp
public override string InnerText { get; set; }
```

Gets the concatenated values of the entity node and all its children.

Returns: The concatenated values of the node and all its children.

Exceptions:

- `InvalidOperationException`: Attempting to set the property.

#### Remarks
`XmlEntity` nodes are read-only. Setting this property throws an exception.

This property is a Microsoft extension to the Document Object Model (DOM).

## XmlEntity.InnerXml property

```csharp
public override string InnerXml { get; set; }
```

Gets the markup representing the children of this node.

Returns: For `XmlEntity` nodes, String.Empty is returned.

Exceptions:

- `InvalidOperationException`: Attempting to set the property.

#### Remarks
`XmlEntity` nodes are read-only. Setting this property throws an exception.

This property is a Microsoft extension to the Document Object Model (DOM).

## XmlEntity.IsReadOnly property

```csharp
public override bool IsReadOnly { get; }
```

Gets a value indicating whether the node is read-only.

Returns: `true` if the node is read-only; otherwise, `false`.

Because `XmlEntity` nodes are read-only, this property always returns `true`.

#### Remarks
A read-only node is one whose properties, attributes, or children cannot be changed. You can remove a read-only node from the tree and insert it somewhere else.

## XmlEntity.LocalName property

```csharp
public override string LocalName { get; }
```

Gets the name of the node without the namespace prefix.

Returns: For `XmlEntity` nodes, this property returns the name of the entity.

To be added.

## XmlEntity.Name property

```csharp
public override string Name { get; }
```

Gets the name of the node.

Returns: The name of the entity.

#### Examples
The following example displays information on the entities declared in the XML document.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlDocumentType/Entities/entities.cs._

The example uses the file `doment.xml` as input.

_Code sample not included: ~/snippets/xml/VS_Snippets_Data/XmlEntity/XML/doment.xml._
## XmlEntity.NodeType property

```csharp
public override System.Xml.XmlNodeType NodeType { get; }
```

Gets the type of the node.

Returns: The node type. For `XmlEntity` nodes, the value is XmlNodeType.Entity.

#### Examples
The following example displays information on the entities declared in the XML document.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlDocumentType/Entities/entities.cs._

The example uses the file `doment.xml` as input.

_Code sample not included: ~/snippets/xml/VS_Snippets_Data/XmlEntity/XML/doment.xml._
## XmlEntity.NotationName property

```csharp
public string? NotationName { get; }
```

Gets the name of the optional NDATA attribute on the entity declaration.

Returns: The name of the NDATA attribute. If there is no NDATA, `null` is returned.

#### Examples
The following example displays information on the entities declared in the XML document.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlDocumentType/Entities/entities.cs._

The example uses the file, `doment.xml`, as input.

_Code sample not included: ~/snippets/xml/VS_Snippets_Data/XmlEntity/XML/doment.xml._
## XmlEntity.OuterXml property

```csharp
public override string OuterXml { get; }
```

Gets the markup representing this node and all its children.

Returns: For `XmlEntity` nodes, String.Empty is returned.

#### Remarks
This property is a Microsoft extension to the Document Object Model (DOM).

## XmlEntity.PublicId property

```csharp
public string? PublicId { get; }
```

Gets the value of the public identifier on the entity declaration.

Returns: The public identifier on the entity. If there is no public identifier, `null` is returned.

#### Examples
The following example displays information on the entities declared in the XML document.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlDocumentType/Entities/entities.cs._

The example uses the file, `doment.xml`, as input.

_Code sample not included: ~/snippets/xml/VS_Snippets_Data/XmlEntity/XML/doment.xml._
## XmlEntity.SystemId property

```csharp
public string? SystemId { get; }
```

Gets the value of the system identifier on the entity declaration.

Returns: The system identifier on the entity. If there is no system identifier, `null` is returned.

#### Examples
The following example displays information on the entities declared in the XML document.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlDocumentType/Entities/entities.cs._

The example uses the file `doment.xml` as input.

_Code sample not included: ~/snippets/xml/VS_Snippets_Data/XmlEntity/XML/doment.xml._
## XmlEntity.CloneNode(Boolean) method

```csharp
public override System.Xml.XmlNode CloneNode (bool deep);
```

Creates a duplicate of this node. Entity nodes cannot be cloned. Calling this method on an `XmlEntity` object throws an exception.

Parameters:

- `deep`: `true` to recursively clone the subtree under the specified node; `false` to clone only the node itself.

Returns: A copy of the `XmlNode` from which the method is called.

Exceptions:

- `InvalidOperationException`: Entity nodes cannot be cloned. Calling this method on an `XmlEntity` object throws an exception.

To be added.

## XmlEntity.WriteContentTo(XmlWriter) method

```csharp
public override void WriteContentTo (System.Xml.XmlWriter w);
```

Saves all the children of the node to the specified `XmlWriter`. For `XmlEntity` nodes, this method has no effect.

Parameters:

- `w`: The `XmlWriter` to which you want to save.

#### Remarks
This method is a Microsoft extension to the Document Object Model (DOM).

## XmlEntity.WriteTo(XmlWriter) method

```csharp
public override void WriteTo (System.Xml.XmlWriter w);
```

Saves the node to the specified `XmlWriter`. For `XmlEntity` nodes, this method has no effect.

Parameters:

- `w`: The `XmlWriter` to which you want to save.

#### Remarks
This method is a Microsoft extension to the Document Object Model (DOM).
