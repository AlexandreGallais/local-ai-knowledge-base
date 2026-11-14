---
title: "XmlCDataSection class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/XmlCDataSection.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlCDataSection class

Namespace: `System.Xml`

```csharp
public class XmlCDataSection : System.Xml.XmlCharacterData
```

Represents a CDATA section.

#### Remarks
CDATA sections are used to quote or escape blocks of text to keep that text from being interpreted as markup language.

## XmlCDataSection.XmlCDataSection(String, XmlDocument) constructor

```csharp
protected internal XmlCDataSection (string? data, System.Xml.XmlDocument doc);
```

Initializes a new instance of the `XmlCDataSection` class.

Parameters:

- `data`: `String` that contains character data.
- `doc`: `XmlDocument` object.

To be added.

## XmlCDataSection.LocalName property

```csharp
public override string LocalName { get; }
```

Gets the local name of the node.

Returns: For CDATA nodes, the local name is `#cdata-section`.

To be added.

## XmlCDataSection.Name property

```csharp
public override string Name { get; }
```

Gets the qualified name of the node.

Returns: For CDATA nodes, the name is `#cdata-section`.

To be added.

## XmlCDataSection.NodeType property

```csharp
public override System.Xml.XmlNodeType NodeType { get; }
```

Gets the type of the current node.

Returns: The node type. For CDATA nodes, the value is XmlNodeType.CDATA.

To be added.

## XmlCDataSection.ParentNode property

```csharp
public override System.Xml.XmlNode? ParentNode { get; }
```

Gets the parent of this node (for nodes that can have parents).

Returns: The `XmlNode` that is the parent of the current node. If a node has just been created and not yet added to the tree, or if it has been removed from the tree, the parent is `null`. For all other nodes, the value returned depends on the `XmlNode.NodeType` of the node. The following table describes the possible return values for the `ParentNode` property.

To be added.

## XmlCDataSection.PreviousText property

```csharp
public override System.Xml.XmlNode? PreviousText { get; }
```

Gets the text node that immediately precedes this node.

Returns: Returns `XmlNode`.

To be added.

## XmlCDataSection.CloneNode(Boolean) method

```csharp
public override System.Xml.XmlNode CloneNode (bool deep);
```

Creates a duplicate of this node.

Parameters:

- `deep`: `true` to recursively clone the subtree under the specified node; `false` to clone only the node itself. Because CDATA nodes do not have children, regardless of the parameter setting, the cloned node will always include the data content.

Returns: The cloned node.

#### Remarks
`CloneNode` serves as a copy constructor for nodes. To see how this method behaves with other node types, see the `XmlNode.CloneNode` method in the `XmlNode` class.

The cloned node has no parent (`ParentNode` returns `null`).

## XmlCDataSection.WriteContentTo(XmlWriter) method

```csharp
public override void WriteContentTo (System.Xml.XmlWriter w);
```

Saves the children of the node to the specified `XmlWriter`.

Parameters:

- `w`: The `XmlWriter` to which you want to save.

#### Remarks
Because CDATA nodes do not have children, `WriteContentTo` has no effect.

This method is a Microsoft extension to the Document Object Model (DOM).

## XmlCDataSection.WriteTo(XmlWriter) method

```csharp
public override void WriteTo (System.Xml.XmlWriter w);
```

Saves the node to the specified `XmlWriter`.

Parameters:

- `w`: The `XmlWriter` to which you want to save.

#### Remarks
This method is a Microsoft extension to the Document Object Model (DOM).
