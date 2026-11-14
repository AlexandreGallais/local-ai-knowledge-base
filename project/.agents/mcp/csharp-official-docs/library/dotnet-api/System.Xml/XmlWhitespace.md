---
title: "XmlWhitespace class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/XmlWhitespace.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlWhitespace class

Namespace: `System.Xml`

```csharp
public class XmlWhitespace : System.Xml.XmlCharacterData
```

Represents white space in element content.

#### Remarks
This class is a Microsoft extension to the Document Object Model (DOM).

## XmlWhitespace.XmlWhitespace(String, XmlDocument) constructor

```csharp
protected internal XmlWhitespace (string? strData, System.Xml.XmlDocument doc);
```

Initializes a new instance of the `XmlWhitespace` class.

Parameters:

- `strData`: The white space characters of the node.
- `doc`: The `XmlDocument` object.

#### Remarks
This constructor is called by derived class constructors to initialize state in this type.

## XmlWhitespace.LocalName property

```csharp
public override string LocalName { get; }
```

Gets the local name of the node.

Returns: For `XmlWhitespace` nodes, this property returns `#whitespace`.

To be added.

## XmlWhitespace.Name property

```csharp
public override string Name { get; }
```

Gets the qualified name of the node.

Returns: For `XmlWhitespace` nodes, this property returns `#whitespace`.

To be added.

## XmlWhitespace.NodeType property

```csharp
public override System.Xml.XmlNodeType NodeType { get; }
```

Gets the type of the node.

Returns: For `XmlWhitespace` nodes, the value is `XmlNodeType.Whitespace`.

#### Examples
The following example adds a white space node to the document.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlWhitespace/NodeType/source.cs._

## XmlWhitespace.ParentNode property

```csharp
public override System.Xml.XmlNode? ParentNode { get; }
```

Gets the parent of the current node.

Returns: The `XmlNode` parent node of the current node.

To be added.

## XmlWhitespace.PreviousText property

```csharp
public override System.Xml.XmlNode? PreviousText { get; }
```

Gets the text node that immediately precedes this node.

Returns: Returns `XmlNode`.

To be added.

## XmlWhitespace.Value property

```csharp
public override string? Value { get; set; }
```

Gets or sets the value of the node.

Returns: The white space characters found in the node.

Exceptions:

- `ArgumentException`: Setting `XmlWhitespace.Value` to invalid white space characters.

#### Remarks
When setting this property, valid white space characters must be specified. White space can consist of one or more space characters, carriage returns, line feeds, or tabs.

## XmlWhitespace.CloneNode(Boolean) method

```csharp
public override System.Xml.XmlNode CloneNode (bool deep);
```

Creates a duplicate of this node.

Parameters:

- `deep`: `true` to recursively clone the subtree under the specified node; `false` to clone only the node itself. For white space nodes, the cloned node always includes the data value, regardless of the parameter setting.

Returns: The cloned node.

#### Remarks
`XmlWhitespace.CloneNode` serves as a copy constructor for nodes. To see how this method behaves with other node types, see `XmlNode.CloneNode`.

The cloned node has no parent. `ParentNode` returns `null`.

## XmlWhitespace.WriteContentTo(XmlWriter) method

```csharp
public override void WriteContentTo (System.Xml.XmlWriter w);
```

Saves all the children of the node to the specified `XmlWriter`.

Parameters:

- `w`: The `XmlWriter` to which you want to save.

#### Remarks
This method is a Microsoft extension to the Document Object Model (DOM).

## XmlWhitespace.WriteTo(XmlWriter) method

```csharp
public override void WriteTo (System.Xml.XmlWriter w);
```

Saves the node to the specified `XmlWriter`.

Parameters:

- `w`: The `XmlWriter` to which you want to save.

#### Remarks
This method is a Microsoft extension to the Document Object Model (DOM).
