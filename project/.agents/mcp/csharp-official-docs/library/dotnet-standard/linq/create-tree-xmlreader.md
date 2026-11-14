---
title: "How to create a tree from an XmlReader - LINQ to XML"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/linq/create-tree-xmlreader.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# How to create a tree from an XmlReader (LINQ to XML)

This article shows how to create an XML tree directly from an `System.Xml.XmlReader` in C# or Visual Basic. To create an `System.Xml.Linq.XElement` from an `System.Xml.XmlReader`, you position the `System.Xml.XmlReader` on an element node. The `System.Xml.XmlReader` will skip comments and processing instructions, but if the `System.Xml.XmlReader` is positioned on a text node, an error will be thrown. To avoid such errors, position the `System.Xml.XmlReader` on an element before you create an XML tree from the `System.Xml.XmlReader`.

## Example: Load XElement object from an XmlReader object

This example uses the XML document Sample XML file: Books.

The following code creates a `System.Xml.XmlReader` object, reads nodes until it finds the first element node, and loads the `System.Xml.Linq.XElement` object.

```csharp
XmlReader r = XmlReader.Create("books.xml");
while (r.NodeType != XmlNodeType.Element)
    r.Read();
XElement e = XElement.Load(r);
Console.WriteLine(e);
```

```vb
Dim r As XmlReader = XmlReader.Create("books.xml")
Do While r.NodeType <> XmlNodeType.Element
    r.Read()
Loop
Dim e As XElement = XElement.Load(r)
Console.WriteLine(e)
```

This example produces the following output:

```xml
<Catalog>
   <Book id="bk101">
      <Author>Garghentini, Davide</Author>
      <Title>XML Developer's Guide</Title>
      <Genre>Computer</Genre>
      <Price>44.95</Price>
      <PublishDate>2000-10-01</PublishDate>
      <Description>An in-depth look at creating applications
      with XML.</Description>
   </Book>
   <Book id="bk102">
      <Author>Garcia, Debra</Author>
      <Title>Midnight Rain</Title>
      <Genre>Fantasy</Genre>
      <Price>5.95</Price>
      <PublishDate>2000-12-16</PublishDate>
      <Description>A former architect battles corporate zombies,
      an evil sorceress, and her own childhood to become queen
      of the world.</Description>
   </Book>
</Catalog>
```

## See also

- Parse XML
