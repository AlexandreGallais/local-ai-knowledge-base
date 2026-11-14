---
title: "XmlComment class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/XmlComment.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlComment class

Namespace: `System.Xml`

```csharp
public class XmlComment : System.Xml.XmlCharacterData
```

Represents the content of an XML comment.

To be added.

## XmlComment.XmlComment(String, XmlDocument) constructor

```csharp
protected internal XmlComment (string? comment, System.Xml.XmlDocument doc);
```

Initializes a new instance of the `XmlComment` class.

Parameters:

- `comment`: The content of the comment element.
- `doc`: The parent XML document.

#### Remarks
Do not instantiate a `XmlComment` directly; instead, use methods such as `XmlDocument.CreateNode`.

## XmlComment.LocalName property

```csharp
public override string LocalName { get; }
```

Gets the local name of the node.

Returns: For comment nodes, the value is `#comment`.

To be added.

## XmlComment.Name property

```csharp
public override string Name { get; }
```

Gets the qualified name of the node.

Returns: For comment nodes, the value is `#comment`.

To be added.

## XmlComment.NodeType property

```csharp
public override System.Xml.XmlNodeType NodeType { get; }
```

Gets the type of the current node.

Returns: For comment nodes, the value is XmlNodeType.Comment.

To be added.

## XmlComment.CloneNode(Boolean) method

```csharp
public override System.Xml.XmlNode CloneNode (bool deep);
```

Creates a duplicate of this node.

Parameters:

- `deep`: `true` to recursively clone the subtree under the specified node; `false` to clone only the node itself. Because comment nodes do not have children, the cloned node always includes the text content, regardless of the parameter setting.

Returns: The cloned node.

#### Remarks
`CloneNode` serves as a copy constructor for nodes. To see how this method behaves with other node types, see the `XmlNode.CloneNode` method in the `XmlNode` class.

The cloned node has no parent (`ParentNode` returns `null`).

## XmlComment.WriteContentTo(XmlWriter) method

```csharp
public override void WriteContentTo (System.Xml.XmlWriter w);
```

Saves all the children of the node to the specified `XmlWriter`. Because comment nodes do not have children, this method has no effect.

Parameters:

- `w`: The `XmlWriter` to which you want to save.

#### Remarks
This method is a Microsoft extension to the Document Object Model (DOM).

## XmlComment.WriteTo(XmlWriter) method

```csharp
public override void WriteTo (System.Xml.XmlWriter w);
```

Saves the node to the specified `XmlWriter`.

Parameters:

- `w`: The `XmlWriter` to which you want to save.

#### Remarks
This method is a Microsoft extension to the Document Object Model (DOM).
