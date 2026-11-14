---
title: "XmlEntityReference class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/XmlEntityReference.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlEntityReference class

Namespace: `System.Xml`

```csharp
public class XmlEntityReference : System.Xml.XmlLinkedNode
```

Represents an entity reference node.

To be added.

## XmlEntityReference.XmlEntityReference(String, XmlDocument) constructor

```csharp
protected internal XmlEntityReference (string name, System.Xml.XmlDocument doc);
```

Initializes a new instance of the `XmlEntityReference` class.

Parameters:

- `name`: The name of the entity reference; see the `XmlEntityReference.Name` property.
- `doc`: The parent XML document.

#### Remarks
Do not instantiate an `XmlEntityReference` directly; instead, use methods such as `XmlDocument.CreateEntityReference`.

## XmlEntityReference.BaseURI property

```csharp
public override string BaseURI { get; }
```

Gets the base Uniform Resource Identifier (URI) of the current node.

Returns: The location from which the node was loaded.

#### Remarks
A networked XML document is comprised of chunks of data aggregated using various World Wide Web Consortium (W3C) standard inclusion mechanisms and therefore contains nodes that come from different places. The `BaseURI` tells you where these nodes came from. If there is no base URI for the nodes being returned (maybe they were parsed from an in-memory string), `Empty` is returned.

`BaseURI` walks the node tree looking for entity reference boundaries, so if entities are expanded, this information is not preserved and this property returns the location of the XmlDocument in all cases.

For additional information on `BaseURI` and how it behaves with other node types, see `BaseURI`.

This property is a Microsoft extension to the Document Object Model (DOM).

#### Examples
The following example displays information on entity reference node, including its base URI.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlEntityReference/BaseURI/source.cs._

The sample uses the file, `uri.xml`, as input.

_Code sample not included: ~/snippets/xml/VS_Snippets_Data/Classic WebData XmlEntityReference.BaseURI Example/XML/source.xml._
The `style.xml` file contains the XML string ``.

## XmlEntityReference.IsReadOnly property

```csharp
public override bool IsReadOnly { get; }
```

Gets a value indicating whether the node is read-only.

Returns: `true` if the node is read-only; otherwise `false`.

Because `XmlEntityReference` nodes are read-only, this property always returns `true`.

#### Remarks
A read-only node is one whose properties, attributes, or children cannot be changed. However, you can remove a read-only node from the tree and insert it somewhere else.

This property is a Microsoft extension to the Document Object Model (DOM).

#### Examples
The following example shows how to use the `IsReadOnly` property.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlEntityReference/IsReadOnly/source.cs._

## XmlEntityReference.LocalName property

```csharp
public override string LocalName { get; }
```

Gets the local name of the node.

Returns: For `XmlEntityReference` nodes, this property returns the name of the entity referenced.

To be added.

## XmlEntityReference.Name property

```csharp
public override string Name { get; }
```

Gets the name of the node.

Returns: The name of the entity referenced.

#### Examples
The following example displays information on the entity reference node.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlEntityReference/Name/source.cs._

## XmlEntityReference.NodeType property

```csharp
public override System.Xml.XmlNodeType NodeType { get; }
```

Gets the type of the node.

Returns: The node type. For `XmlEntityReference` nodes, the value is XmlNodeType.EntityReference.

To be added.

## XmlEntityReference.Value property

```csharp
public override string? Value { get; set; }
```

Gets or sets the value of the node.

Returns: The value of the node. For `XmlEntityReference` nodes, this property returns `null`.

Exceptions:

- `ArgumentException`: Node is read-only.
- `InvalidOperationException`: Setting the property.

To be added.

## XmlEntityReference.CloneNode(Boolean) method

```csharp
public override System.Xml.XmlNode CloneNode (bool deep);
```

Creates a duplicate of this node.

Parameters:

- `deep`: `true` to recursively clone the subtree under the specified node; `false` to clone only the node itself. For `XmlEntityReference` nodes, this method always returns an entity reference node with no children. The replacement text is set when the node is inserted into a parent.

Returns: The cloned node.

#### Remarks
This method serves as a copy constructor for nodes. The cloned node has no parent (`ParentNode` returns `null`).

## XmlEntityReference.WriteContentTo(XmlWriter) method

```csharp
public override void WriteContentTo (System.Xml.XmlWriter w);
```

Saves all the children of the node to the specified `XmlWriter`.

Parameters:

- `w`: The `XmlWriter` to which you want to save.

#### Remarks
This method is a Microsoft extension to the Document Object Model (DOM).

## XmlEntityReference.WriteTo(XmlWriter) method

```csharp
public override void WriteTo (System.Xml.XmlWriter w);
```

Saves the node to the specified `XmlWriter`.

Parameters:

- `w`: The `XmlWriter` to which you want to save.

#### Remarks
This method is a Microsoft extension to the Document Object Model (DOM).
