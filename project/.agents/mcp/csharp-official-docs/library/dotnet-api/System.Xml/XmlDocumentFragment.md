---
title: "XmlDocumentFragment class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/XmlDocumentFragment.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlDocumentFragment class

Namespace: `System.Xml`

```csharp
public class XmlDocumentFragment : System.Xml.XmlNode
```

Represents a lightweight object that is useful for tree insert operations.

To be added.

## XmlDocumentFragment.XmlDocumentFragment(XmlDocument) constructor

```csharp
protected internal XmlDocumentFragment (System.Xml.XmlDocument ownerDocument);
```

Initializes a new instance of the `XmlDocumentFragment` class.

Parameters:

- `ownerDocument`: The XML document that is the source of the fragment.

#### Remarks
Do not instantiate an `XmlDocumentFragment` directly; instead, use methods such as `XmlDocument.CreateDocumentFragment`.

## XmlDocumentFragment.InnerXml property

```csharp
public override string InnerXml { get; set; }
```

Gets or sets the markup representing the children of this node.

Returns: The markup of the children of this node.

Exceptions:

- `XmlException`: The XML specified when setting this property is not well-formed.

#### Remarks
Setting this property replaces the children of the node with the parsed contents of the given string. The parsing is done in the current namespace context.

This property is a Microsoft extension to the Document Object Model (DOM).

#### Examples
The following example uses the InnerXml property to set the contents of the document fragment.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlDocumentFragment/InnerXml/source.cs._

## XmlDocumentFragment.LocalName property

```csharp
public override string LocalName { get; }
```

Gets the local name of the node.

Returns: For `XmlDocumentFragment` nodes, the local name is `#document-fragment`.

To be added.

## XmlDocumentFragment.Name property

```csharp
public override string Name { get; }
```

Gets the qualified name of the node.

Returns: For `XmlDocumentFragment`, the name is `#document-fragment`.

To be added.

## XmlDocumentFragment.NodeType property

```csharp
public override System.Xml.XmlNodeType NodeType { get; }
```

Gets the type of the current node.

Returns: For `XmlDocumentFragment` nodes, this value is XmlNodeType.DocumentFragment.

To be added.

## XmlDocumentFragment.OwnerDocument property

```csharp
public override System.Xml.XmlDocument OwnerDocument { get; }
```

Gets the `XmlDocument` to which this node belongs.

Returns: The `XmlDocument` to which this node belongs.

#### Remarks
When adding nodes to the current node, use the `XmlDocument` returned by the `OwnerDocument` property to create the node.

#### Examples
The following example adds a new node to the document fragment.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlDocumentFragment/OwnerDocument/source.cs._

## XmlDocumentFragment.ParentNode property

```csharp
public override System.Xml.XmlNode? ParentNode { get; }
```

Gets the parent of this node (for nodes that can have parents).

Returns: The parent of this node.

For `XmlDocumentFragment` nodes, this property is always `null`.

To be added.

## XmlDocumentFragment.CloneNode(Boolean) method

```csharp
public override System.Xml.XmlNode CloneNode (bool deep);
```

Creates a duplicate of this node.

Parameters:

- `deep`: `true` to recursively clone the subtree under the specified node; `false` to clone only the node itself.

Returns: The cloned node.

#### Remarks
`CloneNode` serves as a copy constructor for nodes. To see how this method behaves with other node types, see `XmlNode.CloneNode`.

The cloned node has no parent (`ParentNode` returns `null`).

#### Examples
The following example shows the difference between a deep and shallow clone.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlDocumentFragment/CloneNode/source.cs._

## XmlDocumentFragment.WriteContentTo(XmlWriter) method

```csharp
public override void WriteContentTo (System.Xml.XmlWriter w);
```

Saves all the children of the node to the specified `XmlWriter`.

Parameters:

- `w`: The `XmlWriter` to which you want to save.

#### Remarks
This method is a Microsoft extension to the Document Object Model (DOM).

## XmlDocumentFragment.WriteTo(XmlWriter) method

```csharp
public override void WriteTo (System.Xml.XmlWriter w);
```

Saves the node to the specified `XmlWriter`.

Parameters:

- `w`: The `XmlWriter` to which you want to save.

#### Remarks
This method is a Microsoft extension to the Document Object Model (DOM).
