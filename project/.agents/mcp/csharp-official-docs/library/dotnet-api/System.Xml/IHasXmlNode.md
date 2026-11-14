---
title: "IHasXmlNode interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/IHasXmlNode.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IHasXmlNode interface

Namespace: `System.Xml`

```csharp
public interface IHasXmlNode
```

Enables a class to return an `XmlNode` from the current context or position.

#### Remarks
The `IHasXmlNode` interface provides an interface that enables a class to return an `XmlNode` from the current context or position. It is implemented by `XPathNavigator` objects that operate over classes that have `XmlNode` nodes. For example, if the `XPathNavigator` object is created by an `XmlDocument`, you can use the `IHasXmlNode.GetNode` method to return the `XmlNode` representing the current position of the navigator.

#### Examples
The following example uses the `GetNode` method to retrieve and modify the selected node.

_Code sample not included: ~/snippets/csharp/System.Xml/IHasXmlNode/Overview/hasxmlnode.cs._

The example uses the file `books.xml` as input.

_Code sample not included: ~/snippets/xml/VS_Snippets_Data/IHasXmlNode.GetNode/XML/books.xml._
## IHasXmlNode.GetNode() method

```csharp
public System.Xml.XmlNode GetNode ();
```

Returns the `XmlNode` for the current position.

Returns: The `XmlNode` for the current position.

#### Remarks
The following C# code uses `GetNode` to access a node the `XPathNavigator` is currently positioned on.

```csharp
XmlDocument doc = new XmlDocument();
doc.Load("books.xml");
XPathNavigator nav =  doc.CreateNavigator();
XmlNode node = ((IHasXmlNode)nav).GetNode();
Console.WriteLine(node.LocalName);
//You can edit the returned XmlNode.
```
