---
title: "XDocument class (part 2 of 5)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Linq/XDocument.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XDocument class (part 2 of 5)

## XDocument.NodeType property

```csharp
public override System.Xml.XmlNodeType NodeType { get; }
```

Gets the node type for this node.

Returns: The node type. For `XDocument` objects, this value is `XmlNodeType.Document`.

#### Remarks
Because all classes that derive from `XObject` contain a `NodeType` property, you can write code that operates on collections of objects where the type of each is a subclass of `XObject`. Your code can then test for the node type of each object in the collection.

#### Examples
The following example shows the use of this property.

```csharp
// Note that this property uses XmlNodeType, which is in the System.Xml namespace.
XDocument xmlTree = new XDocument(
    new XDeclaration("1.0", "utf-8", "yes"),
    new XElement("Root", "content")
);
Console.WriteLine(xmlTree.NodeType);
```

```vb
' Note that this property uses XmlNodeType, which is in the System.Xml namespace.
Dim xmlTree As XDocument = _
    <?xml version='1.0' encoding='utf-8' standalone='yes'?>
        <Root>content</Root>
Console.WriteLine("{0}", xmlTree.NodeType)
```

This example produces the following output:

```txt
Document
```

## XDocument.Root property

```csharp
public System.Xml.Linq.XElement? Root { get; }
```

Gets the root element of the XML Tree for this document.

Returns: The root `XElement` of the XML tree.

#### Remarks
This property is useful when you want to compose LINQ to XML queries in the same context as when composing them for a tree rooted in `XElement`. See Query an XDocument vs. query an XElement for more details.

#### Examples
The following example uses this property to get the root element of a document.

```csharp
XDocument doc = new XDocument(
    new XComment("This is a comment."),
    new XElement("Pubs",
        new XElement("Book",
            new XElement("Title", "Artifacts of Roman Civilization"),
            new XElement("Author", "Moreno, Jordao")
        ),
        new XElement("Book",
            new XElement("Title", "Midieval Tools and Implements"),
            new XElement("Author", "Gazit, Inbar")
        )
    ),
    new XComment("This is another comment.")
);
Console.WriteLine(doc.Root.Name.ToString());
```

```vb
Dim doc As XDocument = _
    <?xml version="1.0" encoding="utf-8" standalone="yes"?>
    <!--This is a comment.-->
    <Pubs>
        <Book>
            <Title>Artifacts of Roman Civilization</Title>
            <Author>Moreno, Jordao</Author>
        </Book>
        <Book>
            <Title>Midieval Tools and Implements</Title>
            <Author>Gazit, Inbar</Author>
        </Book>
        <!--This is another comment.-->
    </Pubs>

Console.WriteLine(doc.Root.Name.ToString())
```

This example produces the following output:

```txt
Pubs
```

## XDocument.Load(Stream) method

```csharp
public static System.Xml.Linq.XDocument Load (System.IO.Stream stream);
```

Creates a new `XDocument` instance by using the specified stream.

Parameters:

- `stream`: The stream that contains the XML data.

Returns: An `XDocument` object that reads the data that is contained in the stream.

#### Remarks
If you want to control load options, use the `XDocument.Load` overload that takes `LoadOptions` as a parameter.

The loading functionality of LINQ to XML is built upon `XmlReader`. Therefore, you might catch any exceptions that are thrown by the `XmlReader.Create` overload methods and the `XmlReader` methods that read and parse the document.

If you have to modify `XmlReaderSettings`, follow these steps:

1.  Create an `XmlReader` by calling one of the `XmlReader.Create` overloads that take `XmlReaderSettings` as a parameter.

2.  Pass the `XmlReader` to one of the `XDocument.Load` overloads of `XDocument` that takes `XmlReader` as a parameter.

## XDocument.Load(TextReader) method

```csharp
public static System.Xml.Linq.XDocument Load (System.IO.TextReader textReader);
```

Creates a new `XDocument` from a `TextReader`.

Parameters:

- `textReader`: A `TextReader` that contains the content for the `XDocument`.

Returns: An `XDocument` that contains the contents of the specified `TextReader`.

#### Remarks
LINQ to XML's loading functionality is built upon `XmlReader`. Therefore, you might catch any exceptions that are thrown by the `XmlReader.Create` overload methods and the `XmlReader` methods that read and parse the document.

#### Examples
The following example creates a document from a `StringReader`.

```csharp
TextReader tr = new StringReader("<Root>Content</Root>");
XDocument doc = XDocument.Load(tr);
Console.WriteLine(doc);
```

```vb
Dim tr As TextReader = New StringReader("<Root>Content</Root>")
Dim doc As XDocument = XDocument.Load(tr)
Console.WriteLine(doc)
```

This example produces the following output:

```xml
<Root>Content</Root>
```

## XDocument.Load(String) method

```csharp
public static System.Xml.Linq.XDocument Load (string uri);
```

Creates a new `XDocument` from a file.

Parameters:

- `uri`: A URI string that references the file to load into a new `XDocument`.

Returns: An `XDocument` that contains the contents of the specified file.

#### Remarks
This method uses an underlying `XmlReader` to read the XML into an XML tree.

Use `XDocument.Parse` to create an `XDocument` from a string that contains XML.

LINQ to XML's loading functionality is built upon `XmlReader`. Therefore, you might catch any exceptions that are thrown by the `XmlReader.Create` overload methods and the `XmlReader` methods that read and parse the document.

#### Examples
The following example shows how to load an `XDocument` from a file.

This example uses the following XML document:

Sample XML File: Typical Purchase Order (LINQ to XML)

```csharp
XDocument doc = XDocument.Load("PurchaseOrder.xml");
Console.WriteLine(doc);
```

```vb
Dim doc As XDocument = XDocument.Load("PurchaseOrder.xml")
Console.WriteLine(doc)
```

This example produces the following output:

```xml
<PurchaseOrder PurchaseOrderNumber="99503" OrderDate="1999-10-20">
  <Address Type="Shipping">
    <Name>Ellen Adams</Name>
    <Street>123 Maple Street</Street>
    <City>Mill Valley</City>
    <State>CA</State>
    <Zip>10999</Zip>
    <Country>USA</Country>
  </Address>
  <Address Type="Billing">
    <Name>Tai Yee</Name>
    <Street>8 Oak Avenue</Street>
    <City>Old Town</City>
    <State>PA</State>
    <Zip>95819</Zip>
    <Country>USA</Country>
  </Address>
  <DeliveryNotes>Please leave packages in shed by driveway.</DeliveryNotes>
  <Items>
    <Item PartNumber="872-AA">
      <ProductName>Lawnmower</ProductName>
      <Quantity>1</Quantity>
      <USPrice>148.95</USPrice>
      <Comment>Confirm this is electric</Comment>
    </Item>
    <Item PartNumber="926-AA">
      <ProductName>Baby Monitor</ProductName>
      <Quantity>2</Quantity>
      <USPrice>39.98</USPrice>
      <ShipDate>1999-05-21</ShipDate>
    </Item>
  </Items>
</PurchaseOrder>
```

## XDocument.Load(XmlReader) method

```csharp
public static System.Xml.Linq.XDocument Load (System.Xml.XmlReader reader);
```

Creates a new `XDocument` from an `XmlReader`.

Parameters:

- `reader`: A `XmlReader` that contains the content for the `XDocument`.

Returns: An `XDocument` that contains the contents of the specified `XmlReader`.

#### Remarks
One possible use for this method is to create a copy of a DOM document in a LINQ to XML tree. To do this, you create an `XmlNodeReader` from a DOM document, and then use the `XmlNodeReader` to create an `XDocument`.

LINQ to XML's loading functionality is built upon `XmlReader`. Therefore, you might catch any exceptions that are thrown by the `XmlReader.Create` overload methods and the `XmlReader` methods that read and parse the document.

#### Examples
The following example creates a DOM document, creates an `XmlNodeReader` from the DOM document, creates an `XDocument` using the `XmlNodeReader`.

```csharp
// Create a DOM document with some content.
XmlDocument doc = new XmlDocument();
XmlElement child = doc.CreateElement("Child");
child.InnerText = "child contents";
XmlElement root = doc.CreateElement("Root");
root.AppendChild(child);
doc.AppendChild(root);

// create a reader and move to the content
using (XmlNodeReader nodeReader = new XmlNodeReader(doc)) {
    // the reader must be in the Interactive state in order to
    // create a LINQ to XML tree from it.
    nodeReader.MoveToContent();

    XDocument xRoot = XDocument.Load(nodeReader);
    Console.WriteLine(xRoot);
}
```

```vb
' Create a DOM document with some content.
Dim doc As XmlDocument = New XmlDocument()
Dim child As XmlElement = doc.CreateElement("Child")
child.InnerText = "child contents"
Dim root As XmlElement = doc.CreateElement("Root")
root.AppendChild(child)
doc.AppendChild(root)

' create a reader and move to the content
Using nodeReader = New XmlNodeReader(doc)
    ' the reader must be in the Interactive state in order to
    ' create a LINQ to XML tree from it.
    nodeReader.MoveToContent()

    Dim xRoot As XDocument = XDocument.Load(nodeReader)
    Console.WriteLine(xRoot)
End Using
```

This example produces the following output:

```xml
<Root>
  <Child>child contents</Child>
</Root>
```

## XDocument.Load(Stream, LoadOptions) method

```csharp
public static System.Xml.Linq.XDocument Load (System.IO.Stream stream, System.Xml.Linq.LoadOptions options);
```

Creates a new `XDocument` instance by using the specified stream, optionally preserving white space, setting the base URI, and retaining line information.

Parameters:

- `stream`: The stream containing the XML data.
- `options`: A `LoadOptions` that specifies whether to load base URI and line information.

Returns: An `XDocument` object that reads the data that is contained in the stream.

#### Remarks
The loading functionality of LINQ to XML is built upon `XmlReader`. Therefore, you might catch any exceptions that are thrown by the `XmlReader.Create` overload methods and the `XmlReader` methods that read and parse the document.

If you have to modify `XmlReaderSettings`, follow these steps:

1.  Create an `XmlReader` by calling one of the `XmlReader.Create` overloads that takes `XmlReaderSettings` as a parameter.

2.  Pass the `XmlReader` to one of the `XDocument.Load` overloads of `XDocument` that takes `XmlReader` as a parameter.

## XDocument.Load(TextReader, LoadOptions) method

```csharp
public static System.Xml.Linq.XDocument Load (System.IO.TextReader textReader, System.Xml.Linq.LoadOptions options);
```

Creates a new `XDocument` from a `TextReader`, optionally preserving white space, setting the base URI, and retaining line information.

Parameters:

- `textReader`: A `TextReader` that contains the content for the `XDocument`.
- `options`: A `LoadOptions` that specifies white space behavior, and whether to load base URI and line information.

Returns: An `XDocument` that contains the XML that was read from the specified `TextReader`.

#### Remarks
If the source XML is indented, setting the `PreserveWhitespace` flag in `options` causes the reader to read all white space in the source XML. Nodes of type `XText` are created for both significant and insignificant white space.

If the source XML is indented, not setting the `PreserveWhitespace` flag in `options` causes the reader to ignore all of the insignificant white space in the source XML. The XML tree is created without any text nodes for insignificant white space.

If the source XML is not indented, setting the `PreserveWhitespace` flag in `options` has no effect. Significant white space is still preserved, and there are no spans of insignificant white space that could cause the creation of more white space text nodes.

For more information, see Preserve white space while loading or parsing XML and Preserve white space while serializing.

Use `XDocument.Parse` to create an `XElement` from a string that contains XML.

Setting `SetBaseUri` is not valid when loading from a `TextReader`.

There is a performance penalty if you set the `SetLineInfo` flag.

The line information is accurate immediately after loading the XML document. If you modify the XML tree after loading the document, the line information may become meaningless.

LINQ to XML's loading functionality is built upon `XmlReader`. Therefore, you might catch any exceptions that are thrown by the `XmlReader.Create` overload methods and the `XmlReader` methods that read and parse the document.

#### Examples
The following example creates a document from a `StringReader`.

```csharp
TextReader sr;
int whiteSpaceNodes;

sr = new StringReader("<Root> <Child> </Child> </Root>");
XDocument xmlTree1 = XDocument.Load(sr, LoadOptions.None);
sr.Close();
whiteSpaceNodes = xmlTree1
    .Element("Root")
    .DescendantNodesAndSelf()
    .OfType<XText>()
    .Where(tNode => tNode.ToString().Trim().Length == 0)
    .Count();
Console.WriteLine("Count of white space nodes (not preserving whitespace): {0}", whiteSpaceNodes);

sr = new StringReader("<Root> <Child> </Child> </Root>");
XDocument xmlTree2 = XDocument.Load(sr, LoadOptions.PreserveWhitespace);
sr.Close();
whiteSpaceNodes = xmlTree2
    .Element("Root")
    .DescendantNodesAndSelf()
    .OfType<XText>()
    .Where(tNode => tNode.ToString().Trim().Length == 0)
    .Count();
Console.WriteLine("Count of white space nodes (preserving whitespace): {0}", whiteSpaceNodes);
```

```vb
Dim sr As TextReader
Dim whiteSpaceNodes As Integer

sr = New StringReader("<Root> <Child> </Child> </Root>")
Dim xmlTree1 As XDocument = XDocument.Load(sr, LoadOptions.None)
sr.Close()
whiteSpaceNodes = xmlTree1 _
              .Element("Root") _
              .DescendantNodesAndSelf() _
              .OfType(Of XText)() _
              .Where(Function(ByVal tNode As XNode) tNode. _
                  ToString().Trim().Length = 0).Count()
Console.WriteLine("Count of white space nodes (not preserving whitespace): {0}", whiteSpaceNodes)

sr = New StringReader("<Root> <Child> </Child> </Root>")
Dim xmlTree2 As XDocument = XDocument.Load(sr, LoadOptions.PreserveWhitespace)
sr.Close()
whiteSpaceNodes = xmlTree2 _
              .Element("Root") _
              .DescendantNodesAndSelf() _
              .OfType(Of XText)() _
              .Where(Function(ByVal tNode As XNode) tNode. _
                  ToString().Trim().Length = 0).Count()
Console.WriteLine("Count of white space nodes (preserving whitespace): {0}", whiteSpaceNodes)
```

This example produces the following output:

```txt
Count of white space nodes (not preserving whitespace): 0
Count of white space nodes (preserving whitespace): 3
```
