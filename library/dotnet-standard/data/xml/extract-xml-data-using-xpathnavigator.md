---
title: "Extract XML Data Using XPathNavigator"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/data/xml/extract-xml-data-using-xpathnavigator.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Extract XML Data Using XPathNavigator

There are several different ways to represent an XML document in the Microsoft .NET Framework. This includes using a `System.String`, or by using the `System.Xml.XmlReader`, `System.Xml.XmlWriter`, `System.Xml.XmlDocument`, or `System.Xml.XPath.XPathDocument` classes. To facilitate moving between these different representations of an XML document, the `System.Xml.XPath.XPathNavigator` class provides a number of methods and properties for extracting the XML as a `System.String`, `System.Xml.XmlReader` object or `System.Xml.XmlWriter` object.

## Convert an XPathNavigator to a String

 The `System.Xml.XPath.XPathNavigator.OuterXml` property of the `System.Xml.XPath.XPathNavigator` class is used to get the markup of the entire XML document or just the markup of a single node and its child nodes.

> **Note:**
> The `System.Xml.XPath.XPathNavigator.InnerXml` property gets the markup of just the child nodes of a node.

 The following code example shows how to save an entire XML document contained in an `System.Xml.XPath.XPathNavigator` object as a `System.String`, as well as a single node and its child nodes.

```vb
Dim document As XPathDocument = New XPathDocument("input.xml")
Dim navigator As XPathNavigator = document.CreateNavigator()

' Save the entire input.xml document to a string.
Dim xml As String = navigator.OuterXml

' Now save the Root element and its child nodes to a string.
navigator.MoveToChild(XPathNodeType.Element)
Dim root As String = navigator.OuterXml
```

```csharp
XPathDocument document = new XPathDocument("input.xml");
XPathNavigator navigator = document.CreateNavigator();

// Save the entire input.xml document to a string.
string xml = navigator.OuterXml;

// Now save the Root element and its child nodes to a string.
navigator.MoveToChild(XPathNodeType.Element);
string root = navigator.OuterXml;
```

## Convert an XPathNavigator to an XmlReader

 The `System.Xml.XPath.XPathNavigator.ReadSubtree*` method is used to stream the entire contents of an XML document or just a single node and its child nodes to an `System.Xml.XmlReader` object.

 When the `System.Xml.XmlReader` object is created with the current node and its child nodes, the `System.Xml.XmlReader` object's `System.Xml.XmlReader.ReadState` property is set to `System.Xml.ReadState.Initial`. When the `System.Xml.XmlReader` object's `System.Xml.XmlReader.Read*` method is called for the first time, the `System.Xml.XmlReader` is moved to the current node of the `System.Xml.XPath.XPathNavigator`. The new `System.Xml.XmlReader` object continues to read until the end of the XML tree is reached. At this point, the `System.Xml.XmlReader.Read*` method returns `false` and the `System.Xml.XmlReader` object's `System.Xml.XmlReader.ReadState` property is set to `System.Xml.ReadState.EndOfFile`.

 The `System.Xml.XPath.XPathNavigator` object's position is unchanged by the creation or movement of the `System.Xml.XmlReader` object. The `System.Xml.XPath.XPathNavigator.ReadSubtree*` method is only valid when positioned on an element or root node.

 The following example shows how to get an `System.Xml.XmlReader` object containing the entire XML document in an `System.Xml.XPath.XPathDocument` object as well as a single node and its child nodes.

```vb
Dim document As XPathDocument = New XPathDocument("books.xml")
Dim navigator As XPathNavigator = document.CreateNavigator()

' Stream the entire XML document to the XmlReader.
Dim xml As XmlReader = navigator.ReadSubtree()

While xml.Read()
    Console.WriteLine(xml.ReadInnerXml())
End While

xml.Close()

' Stream the book element and its child nodes to the XmlReader.
navigator.MoveToChild("bookstore", "")
navigator.MoveToChild("book", "")

Dim book As XmlReader = navigator.ReadSubtree()

While book.Read()
    Console.WriteLine(book.ReadInnerXml())
End While

book.Close()
```

```csharp
XPathDocument document = new XPathDocument("books.xml");
XPathNavigator navigator = document.CreateNavigator();

// Stream the entire XML document to the XmlReader.
XmlReader xml = navigator.ReadSubtree();

while (xml.Read())
{
    Console.WriteLine(xml.ReadInnerXml());
}

xml.Close();

// Stream the book element and its child nodes to the XmlReader.
navigator.MoveToChild("bookstore", "");
navigator.MoveToChild("book", "");

XmlReader book = navigator.ReadSubtree();

while (book.Read())
{
    Console.WriteLine(book.ReadInnerXml());
}

book.Close();
```

 The example takes the `books.xml` file as input.

 _Code sample not included: ../../../../samples/snippets/xml/VS_Snippets_Data/XPathXMLExamples/XML/books.xml._

## Converting an XPathNavigator to an XmlWriter

 The `System.Xml.XPath.XPathNavigator.WriteSubtree*` method is used to stream the entire contents of an XML document or just a single node and its child nodes to an `System.Xml.XmlWriter` object.

 The `System.Xml.XPath.XPathNavigator` object's position is unchanged by the creation of the `System.Xml.XmlWriter` object.

 The following example shows how to get an `System.Xml.XmlWriter` object containing the entire XML document in an `System.Xml.XPath.XPathDocument` object as well as a single node and its child nodes.

```vb
Dim document As XPathDocument = New XPathDocument("books.xml")
Dim navigator As XPathNavigator = document.CreateNavigator()

' Stream the entire XML document to the XmlWriter.
Dim xml As XmlWriter = XmlWriter.Create("newbooks.xml")
navigator.WriteSubtree(xml)
xml.Close()

' Stream the book element and its child nodes to the XmlWriter.
navigator.MoveToChild("bookstore", "")
navigator.MoveToChild("book", "")

Dim book As XmlWriter = XmlWriter.Create("book.xml")
navigator.WriteSubtree(book)
book.Close()
```

```csharp
XPathDocument document = new XPathDocument("books.xml");
XPathNavigator navigator = document.CreateNavigator();

// Stream the entire XML document to the XmlWriter.
XmlWriter xml = XmlWriter.Create("newbooks.xml");
navigator.WriteSubtree(xml);
xml.Close();

// Stream the book element and its child nodes to the XmlWriter.
navigator.MoveToChild("bookstore", "");
navigator.MoveToChild("book", "");

XmlWriter book = XmlWriter.Create("book.xml");
navigator.WriteSubtree(book);
book.Close();
```

 The example takes the `books.xml` file found earlier in this topic as input.

## See also

- `System.Xml.XmlDocument`
- `System.Xml.XPath.XPathDocument`
- `System.Xml.XPath.XPathNavigator`
- Process XML Data Using the XPath Data Model
- Node Set Navigation Using XPathNavigator
- Attribute and Namespace Node Navigation Using XPathNavigator
- Accessing Strongly Typed XML Data Using XPathNavigator
