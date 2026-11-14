---
title: "XmlProcessingInstruction class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/XmlProcessingInstruction.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlProcessingInstruction class

Namespace: `System.Xml`

```csharp
public class XmlProcessingInstruction : System.Xml.XmlLinkedNode
```

Represents a processing instruction, which XML defines to keep processor-specific information in the text of the document.

To be added.

## XmlProcessingInstruction.XmlProcessingInstruction(String, String, XmlDocument) constructor

```csharp
protected internal XmlProcessingInstruction (string target, string? data, System.Xml.XmlDocument doc);
```

Initializes a new instance of the `XmlProcessingInstruction` class.

Parameters:

- `target`: The target of the processing instruction; see the `XmlProcessingInstruction.Target` property.
- `data`: The content of the instruction; see the `XmlProcessingInstruction.Data` property.
- `doc`: The parent XML document.

#### Remarks
Do not instantiate an `XmlProcessingInstruction` directly; instead, use methods such as `XmlDocument.CreateProcessingInstruction`.

## XmlProcessingInstruction.Data property

```csharp
public string Data { get; set; }
```

Gets or sets the content of the processing instruction, excluding the target.

Returns: The content of the processing instruction, excluding the target.

#### Examples
The following example creates a processing instruction node and adds it to a document.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlDocument/CreateProcessingInstruction/source.cs._

## XmlProcessingInstruction.InnerText property

```csharp
public override string InnerText { get; set; }
```

Gets or sets the concatenated values of the node and all its children.

Returns: The concatenated values of the node and all its children.

#### Remarks
This property is a Microsoft extension to the Document Object Model (DOM).

## XmlProcessingInstruction.LocalName property

```csharp
public override string LocalName { get; }
```

Gets the local name of the node.

Returns: For processing instruction nodes, this property returns the target of the processing instruction.

To be added.

## XmlProcessingInstruction.Name property

```csharp
public override string Name { get; }
```

Gets the qualified name of the node.

Returns: For processing instruction nodes, this property returns the target of the processing instruction.

To be added.

## XmlProcessingInstruction.NodeType property

```csharp
public override System.Xml.XmlNodeType NodeType { get; }
```

Gets the type of the current node.

Returns: For `XmlProcessingInstruction` nodes, this value is XmlNodeType.ProcessingInstruction.

To be added.

## XmlProcessingInstruction.Target property

```csharp
public string Target { get; }
```

Gets the target of the processing instruction.

Returns: The target of the processing instruction.

#### Examples
The following example creates a processing instruction node and adds it to a document.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlDocument/CreateProcessingInstruction/source.cs._

## XmlProcessingInstruction.Value property

```csharp
public override string Value { get; set; }
```

Gets or sets the value of the node.

Returns: The entire content of the processing instruction, excluding the target.

Exceptions:

- `ArgumentException`: Node is read-only.

To be added.

## XmlProcessingInstruction.CloneNode(Boolean) method

```csharp
public override System.Xml.XmlNode CloneNode (bool deep);
```

Creates a duplicate of this node.

Parameters:

- `deep`: `true` to recursively clone the subtree under the specified node; `false` to clone only the node itself.

Returns: The duplicate node.

#### Remarks
`CloneNode` serves as a copy constructor for nodes. For processing instruction nodes, the cloned node always includes the target and data. To see how this method behaves with other node types, see the `XmlNode.CloneNode` method in the `XmlNode` class.

The cloned node has no parent (`ParentNode` returns `null`).

## XmlProcessingInstruction.WriteContentTo(XmlWriter) method

```csharp
public override void WriteContentTo (System.Xml.XmlWriter w);
```

Saves all the children of the node to the specified `XmlWriter`. Because ProcessingInstruction nodes do not have children, this method has no effect.

Parameters:

- `w`: The `XmlWriter` to which you want to save.

#### Remarks
This method is a Microsoft extension to the Document Object Model (DOM).

## XmlProcessingInstruction.WriteTo(XmlWriter) method

```csharp
public override void WriteTo (System.Xml.XmlWriter w);
```

Saves the node to the specified `XmlWriter`.

Parameters:

- `w`: The `XmlWriter` to which you want to save.

#### Remarks
This method is a Microsoft extension to the Document Object Model (DOM).
