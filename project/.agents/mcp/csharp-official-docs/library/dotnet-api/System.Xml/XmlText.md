---
title: "XmlText class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/XmlText.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlText class

Namespace: `System.Xml`

```csharp
public class XmlText : System.Xml.XmlCharacterData
```

Represents the text content of an element or attribute.

To be added.

## XmlText.XmlText(String, XmlDocument) constructor

```csharp
protected internal XmlText (string? strData, System.Xml.XmlDocument doc);
```

Initializes a new instance of the `XmlText` class.

Parameters:

- `strData`: The content of the node; see the `XmlText.Value` property.
- `doc`: The parent XML document.

#### Remarks
Do not instantiate an `XmlText` directly; instead, use methods such as `XmlDocument.CreateTextNode`.

## XmlText.LocalName property

```csharp
public override string LocalName { get; }
```

Gets the local name of the node.

Returns: For text nodes, this property returns `#text`.

To be added.

## XmlText.Name property

```csharp
public override string Name { get; }
```

Gets the qualified name of the node.

Returns: For text nodes, this property returns `#text`.

To be added.

## XmlText.NodeType property

```csharp
public override System.Xml.XmlNodeType NodeType { get; }
```

Gets the type of the current node.

Returns: For text nodes, this value is XmlNodeType.Text.

To be added.

## XmlText.ParentNode property

```csharp
public override System.Xml.XmlNode? ParentNode { get; }
```

Gets the parent of this node (for nodes that can have parents).

Returns: The `XmlNode` that is the parent of the current node. If a node has just been created and not yet added to the tree, or if it has been removed from the tree, the parent is `null`. For all other nodes, the value returned depends on the `XmlNode.NodeType` of the node. The following table describes the possible return values for the `ParentNode` property.

To be added.

## XmlText.PreviousText property

```csharp
public override System.Xml.XmlNode? PreviousText { get; }
```

Gets the text node that immediately precedes this node.

Returns: Returns `XmlNode`.

To be added.

## XmlText.Value property

```csharp
public override string? Value { get; set; }
```

Gets or sets the value of the node.

Returns: The content of the text node.

To be added.

## XmlText.CloneNode(Boolean) method

```csharp
public override System.Xml.XmlNode CloneNode (bool deep);
```

Creates a duplicate of this node.

Parameters:

- `deep`: `true` to recursively clone the subtree under the specified node; `false` to clone only the node itself.

Returns: The cloned node.

#### Remarks
`CloneNode` serves as a copy constructor for nodes. For text nodes, the cloned node always includes the data value. To see how this method behaves with other node types, see the `XmlNode.CloneNode` method in the `XmlNode` class.

The cloned node has no parent (`ParentNode` returns `null`).

## XmlText.SplitText(Int32) method

```csharp
public virtual System.Xml.XmlText SplitText (int offset);
```

Splits the node into two nodes at the specified offset, keeping both in the tree as siblings.

Parameters:

- `offset`: The offset at which to split the node.

Returns: The new node.

#### Remarks
After `SplitText` is called, the original node contains all the content up to the offset point. A new node of the same type contains all the content at and after the offset point and is inserted as the next sibling of the original node. When the offset is equal to the length of this node, the new node has no data.

## XmlText.WriteContentTo(XmlWriter) method

```csharp
public override void WriteContentTo (System.Xml.XmlWriter w);
```

Saves all the children of the node to the specified `XmlWriter`. `XmlText` nodes do not have children, so this method has no effect.

Parameters:

- `w`: The `XmlWriter` to which you want to save.

#### Remarks
This method is a Microsoft extension to the Document Object Model (DOM).

## XmlText.WriteTo(XmlWriter) method

```csharp
public override void WriteTo (System.Xml.XmlWriter w);
```

Saves the node to the specified `XmlWriter`.

Parameters:

- `w`: The `XmlWriter` to which you want to save.

#### Remarks
This method is a Microsoft extension to the Document Object Model (DOM).
