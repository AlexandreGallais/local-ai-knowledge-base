---
title: "XmlAttribute class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/XmlAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlAttribute class (part 2 of 2)

## XmlAttribute.PrependChild(XmlNode) method

```csharp
public override System.Xml.XmlNode? PrependChild (System.Xml.XmlNode newChild);
```

Adds the specified node to the beginning of the list of child nodes for this node.

Parameters:

- `newChild`: The `XmlNode` to add. If it is an `XmlDocumentFragment`, the entire contents of the document fragment are moved into the child list of this node.

Returns: The `XmlNode` added.

Exceptions:

- `InvalidOperationException`: This node is of a type that does not allow child nodes of the type of the `newChild` node.

The `newChild` is an ancestor of this node.
- `ArgumentException`: The `newChild` was created from a different document than the one that created this node.

This node is read-only.

#### Remarks
If the `newChild` is already in the tree, it is first removed.

If the node being inserted was created from another document, you can use `XmlDocument.ImportNode` to import the node to the current document. The imported node can then be inserted into the current document.

This method is a Microsoft extension to the Document Object Model (DOM).

#### Examples
For an example of the `XmlAttribute.PrependChild` method, see the `XmlNode.PrependChild` method.

## XmlAttribute.RemoveChild(XmlNode) method

```csharp
public override System.Xml.XmlNode RemoveChild (System.Xml.XmlNode oldChild);
```

Removes the specified child node.

Parameters:

- `oldChild`: The `XmlNode` to remove.

Returns: The `XmlNode` removed.

Exceptions:

- `ArgumentException`: The `oldChild` is not a child of this node. Or this node is read-only.

#### Examples
For an example of the `XmlAttribute.RemoveChild` method, see the `XmlNode.RemoveChild` method.

## XmlAttribute.ReplaceChild(XmlNode, XmlNode) method

```csharp
public override System.Xml.XmlNode ReplaceChild (System.Xml.XmlNode newChild, System.Xml.XmlNode oldChild);
```

Replaces the child node specified with the new child node specified.

Parameters:

- `newChild`: The new child `XmlNode`.
- `oldChild`: The `XmlNode` to replace.

Returns: The `XmlNode` replaced.

Exceptions:

- `InvalidOperationException`: This node is of a type that does not allow child nodes of the type of the `newChild` node.

The `newChild` is an ancestor of this node.
- `ArgumentException`: The `newChild` was created from a different document than the one that created this node.

This node is read-only.

The `oldChild` is not a child of this node.

#### Remarks
If the `newChild` is already in the tree, it is first removed.

If the `newChild` was created from another document, you can use `XmlDocument.ImportNode` to import the node to the current document.

#### Examples
For an example of the `XmlAttribute.ReplaceChild` method, see the `XmlNode.ReplaceChild` method.

## XmlAttribute.WriteContentTo(XmlWriter) method

```csharp
public override void WriteContentTo (System.Xml.XmlWriter w);
```

Saves all the children of the node to the specified `XmlWriter`.

Parameters:

- `w`: The `XmlWriter` to which you want to save.

#### Remarks
This method is a Microsoft extension to the Document Object Model (DOM). It is functionally equivalent to the `InnerXml` property.

## XmlAttribute.WriteTo(XmlWriter) method

```csharp
public override void WriteTo (System.Xml.XmlWriter w);
```

Saves the node to the specified `XmlWriter`.

Parameters:

- `w`: The `XmlWriter` to which you want to save.

#### Remarks
This method is a Microsoft extension to the Document Object Model (DOM). It is functionally equivalent to the `OuterXml` property.
