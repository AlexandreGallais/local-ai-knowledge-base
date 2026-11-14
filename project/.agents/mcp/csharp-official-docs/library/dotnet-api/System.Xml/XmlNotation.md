---
title: "XmlNotation class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/XmlNotation.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlNotation class

Namespace: `System.Xml`

```csharp
public class XmlNotation : System.Xml.XmlNode
```

Represents a notation declaration, such as <!NOTATION... >.

To be added.

## XmlNotation.InnerXml property

```csharp
public override string InnerXml { get; set; }
```

Gets the markup representing the children of this node.

Returns: For `XmlNotation` nodes, String.Empty is returned.

Exceptions:

- `InvalidOperationException`: Attempting to set the property.

#### Remarks
`XmlNotation` nodes are read-only. Setting this property throws an exception.

This property is a Microsoft extension to the Document Object Model (DOM).

## XmlNotation.IsReadOnly property

```csharp
public override bool IsReadOnly { get; }
```

Gets a value indicating whether the node is read-only.

Returns: `true` if the node is read-only; otherwise, `false`.

Because `XmlNotation` nodes are read-only, this property always returns `true`.

#### Remarks
A read-only node is one whose properties, attributes, or children cannot be changed. You can remove a read-only node from the tree and insert it somewhere else.

This property is a Microsoft extension to the Document Object Model (DOM).

## XmlNotation.LocalName property

```csharp
public override string LocalName { get; }
```

Gets the name of the current node without the namespace prefix.

Returns: For `XmlNotation` nodes, this property returns the name of the notation.

To be added.

## XmlNotation.Name property

```csharp
public override string Name { get; }
```

Gets the name of the current node.

Returns: The name of the notation.

#### Examples
The following example displays information on the notations declared in the XML document.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlDocumentType/Notations/notation.cs._

The example uses the file `doment.xml` as input.

_Code sample not included: ~/snippets/xml/VS_Snippets_Data/XmlNotation/XML/doment.xml._
## XmlNotation.NodeType property

```csharp
public override System.Xml.XmlNodeType NodeType { get; }
```

Gets the type of the current node.

Returns: The node type. For `XmlNotation` nodes, the value is XmlNodeType.Notation.

#### Examples
The following example displays information on the notations declared in the XML document.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlDocumentType/Notations/notation.cs._

The example uses the file `doment.xml` as input.

_Code sample not included: ~/snippets/xml/VS_Snippets_Data/XmlNotation/XML/doment.xml._
## XmlNotation.OuterXml property

```csharp
public override string OuterXml { get; }
```

Gets the markup representing this node and all its children.

Returns: For `XmlNotation` nodes, String.Empty is returned.

#### Remarks
This property is a Microsoft extension to the Document Object Model (DOM).

## XmlNotation.PublicId property

```csharp
public string? PublicId { get; }
```

Gets the value of the public identifier on the notation declaration.

Returns: The public identifier on the notation. If there is no public identifier, `null` is returned.

#### Examples
The following example displays information on the notations declared in the XML document.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlDocumentType/Notations/notation.cs._

The example uses the file `doment.xml` as input.

_Code sample not included: ~/snippets/xml/VS_Snippets_Data/XmlNotation/XML/doment.xml._
## XmlNotation.SystemId property

```csharp
public string? SystemId { get; }
```

Gets the value of the system identifier on the notation declaration.

Returns: The system identifier on the notation. If there is no system identifier, `null` is returned.

#### Examples
The following example displays information on the notations declared in the XML document.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlDocumentType/Notations/notation.cs._

The example uses the file `doment.xml` as input.

_Code sample not included: ~/snippets/xml/VS_Snippets_Data/XmlNotation/XML/doment.xml._
## XmlNotation.CloneNode(Boolean) method

```csharp
public override System.Xml.XmlNode CloneNode (bool deep);
```

Creates a duplicate of this node. Notation nodes cannot be cloned. Calling this method on an `XmlNotation` object throws an exception.

Parameters:

- `deep`: `true` to recursively clone the subtree under the specified node; `false` to clone only the node itself.

Returns: A `XmlNode` copy of the node from which the method is called.

Exceptions:

- `InvalidOperationException`: Notation nodes cannot be cloned. Calling this method on an `XmlNotation` object throws an exception.

To be added.

## XmlNotation.WriteContentTo(XmlWriter) method

```csharp
public override void WriteContentTo (System.Xml.XmlWriter w);
```

Saves the children of the node to the specified `XmlWriter`. This method has no effect on `XmlNotation` nodes.

Parameters:

- `w`: The `XmlWriter` to which you want to save.

#### Remarks
This method is a Microsoft extension to the Document Object Model (DOM).

## XmlNotation.WriteTo(XmlWriter) method

```csharp
public override void WriteTo (System.Xml.XmlWriter w);
```

Saves the node to the specified `XmlWriter`. This method has no effect on `XmlNotation` nodes.

Parameters:

- `w`: The `XmlWriter` to which you want to save.

#### Remarks
This method is a Microsoft extension to the Document Object Model (DOM).
