---
title: "XmlLinkedNode class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/XmlLinkedNode.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlLinkedNode class

Namespace: `System.Xml`

```csharp
public abstract class XmlLinkedNode : System.Xml.XmlNode
```

Gets the node immediately preceding or following this node.

To be added.

## XmlLinkedNode.NextSibling property

```csharp
public override System.Xml.XmlNode? NextSibling { get; }
```

Gets the node immediately following this node.

Returns: The `XmlNode` immediately following this node or `null` if one does not exist.

#### Examples
The following example displays the first two book nodes.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlLinkedNode/NextSibling/source.cs._

## XmlLinkedNode.PreviousSibling property

```csharp
public override System.Xml.XmlNode? PreviousSibling { get; }
```

Gets the node immediately preceding this node.

Returns: The preceding `XmlNode` or `null` if one does not exist.

#### Examples
The following example displays the last two books.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlDocument/Overview/source5.cs._
