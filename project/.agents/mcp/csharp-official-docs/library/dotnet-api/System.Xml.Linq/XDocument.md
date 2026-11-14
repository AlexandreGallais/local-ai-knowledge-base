---
title: "XDocument class (part 1 of 5)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Linq/XDocument.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XDocument class

Namespace: `System.Xml.Linq`

```csharp
public class XDocument : System.Xml.Linq.XContainer
```

Represents an XML document. For the components and usage of an `XDocument` object, see XDocument Class Overview.

#### Remarks
For details about the valid content of an `XDocument`, see Valid Content of XElement and XDocument Objects.

#### Thread safety

An `XDocument` instance is safe for concurrent read operations as long as no thread modifies it. If the instance is modified, you must synchronize all access to it.

#### Examples
The following example creates a document, and then adds a comment and an element to it. It then composes another document using the results of a query.

```csharp
XDocument srcTree = new XDocument(
    new XComment("This is a comment"),
    new XElement("Root",
        new XElement("Child1", "data1"),
        new XElement("Child2", "data2"),
        new XElement("Child3", "data3"),
        new XElement("Child2", "data4"),
        new XElement("Info5", "info5"),
        new XElement("Info6", "info6"),
        new XElement("Info7", "info7"),
        new XElement("Info8", "info8")
    )
);

XDocument doc = new XDocument(
    new XComment("This is a comment"),
    new XElement("Root",
        from el in srcTree.Element("Root").Elements()
        where ((string)el).StartsWith("data")
        select el
    )
);
Console.WriteLine(doc);
```

```vb
Dim srcTree As XDocument = _
    <?xml version="1.0" encoding="utf-8" standalone="yes"?>
        <!--This is a comment-->
        <Root>
            <Child1>data1</Child1>
            <Child2>data2</Child2>
            <Child3>data3</Child3>
            <Child2>data4</Child2>
            <Info5>info5</Info5>
            <Info6>info6</Info6>
            <Info7>info7</Info7>
            <Info8>info8</Info8>
        </Root>
Dim doc As XDocument = _
    <?xml version="1.0" encoding="utf-8" standalone="yes"?>
        <!--This is a comment-->
        <Root>
            <%= From el In srcTree.<Root>.Elements _
                Where CStr(el).StartsWith("data") _
                Select el %>
        </Root>
Console.WriteLine(doc)
```

This example produces the following output:

```xml
<!--This is a comment-->
<Root>
  <Child1>data1</Child1>
  <Child2>data2</Child2>
  <Child3>data3</Child3>
  <Child2>data4</Child2>
</Root>
```

## XDocument.XDocument() constructor

```csharp
public XDocument ();
```

Initializes a new instance of the `XDocument` class.

#### Remarks
There are not many scenarios that require you to create an `XDocument`. Instead, you can usually create your XML trees with an `XElement` root node. Unless you have a specific requirement to create a document (for example, because you have to create processing instructions and comments at the top level, or you have to support document types), it is often more convenient to use `XElement` as your root node.

For details about the valid content of an `XDocument`, see Valid Content of XElement and XDocument Objects.

#### Examples
The following example creates a new document, and then adds a comment and an element to it.

```csharp
XDocument doc = new XDocument();
doc.Add(new XComment("This is a comment"));
doc.Add(new XElement("Root", "content"));
Console.WriteLine(doc);
```

```vb
Dim doc As XDocument = New XDocument()
doc.Add(<!--This is a comment-->)
doc.Add(<Root>content</Root>)
Console.WriteLine(doc)
```

This example produces the following output:

```xml
<!--This is a comment-->
<Root>content</Root>
```

## XDocument.XDocument(Object[]) constructor

```csharp
public XDocument (params object?[] content);
```

Initializes a new instance of the `XDocument` class with the specified content.

Parameters:

- `content`: A parameter list of content objects to add to this document.

#### Remarks
There are not many scenarios that require you to create an `XDocument`. Instead, you can usually create your XML trees with an `XElement` root node. Unless you have a specific requirement to create a document (for example, because you have to create processing instructions and comments at the top level, or you have to support document types), it is often more convenient to use `XElement` as your root node.

For details about the valid content of an `XDocument`, see Valid Content of XElement and XDocument Objects.

#### Examples
The following example creates a document, and then adds a comment and an element to it. It then composes another document using the results of a query.

```csharp
XDocument srcTree = new XDocument(
    new XComment("This is a comment"),
    new XElement("Root",
        new XElement("Child1", "data1"),
        new XElement("Child2", "data2"),
        new XElement("Child3", "data3"),
        new XElement("Child2", "data4"),
        new XElement("Info5", "info5"),
        new XElement("Info6", "info6"),
        new XElement("Info7", "info7"),
        new XElement("Info8", "info8")
    )
);

XDocument doc = new XDocument(
    new XComment("This is a comment"),
    new XElement("Root",
        from el in srcTree.Element("Root").Elements()
        where ((string)el).StartsWith("data")
        select el
    )
);
Console.WriteLine(doc);
```

```vb
Dim srcTree As XDocument = _
    <?xml version="1.0" encoding="utf-8" standalone="yes"?>
        <!--This is a comment-->
        <Root>
            <Child1>data1</Child1>
            <Child2>data2</Child2>
            <Child3>data3</Child3>
            <Child2>data4</Child2>
            <Info5>info5</Info5>
            <Info6>info6</Info6>
            <Info7>info7</Info7>
            <Info8>info8</Info8>
        </Root>
Dim doc As XDocument = _
    <?xml version="1.0" encoding="utf-8" standalone="yes"?>
        <!--This is a comment-->
        <Root>
            <%= From el In srcTree.<Root>.Elements _
                Where CStr(el).StartsWith("data") _
                Select el %>
        </Root>
Console.WriteLine(doc)
```

This example produces the following output:

```xml
<!--This is a comment-->
<Root>
  <Child1>data1</Child1>
  <Child2>data2</Child2>
  <Child3>data3</Child3>
  <Child2>data4</Child2>
</Root>
```

## XDocument.XDocument(XDocument) constructor

```csharp
public XDocument (System.Xml.Linq.XDocument other);
```

Initializes a new instance of the `XDocument` class from an existing `XDocument` object.

Parameters:

- `other`: The `XDocument` object that will be copied.

#### Remarks
You use this constructor to make a deep copy of an `XDocument`.

This constructor traverses all nodes and attributes in the document specified in the `other` parameter, and creates copies of all nodes as it assembles the newly initialized `XDocument`.

## XDocument.XDocument(XDeclaration, Object[]) constructor

```csharp
public XDocument (System.Xml.Linq.XDeclaration? declaration, params object?[] content);
```

Initializes a new instance of the `XDocument` class with the specified `XDeclaration` and content.

Parameters:

- `declaration`: An `XDeclaration` for the document.
- `content`: The content of the document.

#### Remarks
There are not many scenarios that require you to create an `XDocument`. Instead, you can usually create your XML trees with an `XElement` root node. Unless you have a specific requirement to create a document (for example, because you have to create processing instructions and comments at the top level, or you have to support document types), it is often more convenient to use `XElement` as your root node.

For details about the valid content of an `XDocument`, see Valid Content of XElement and XDocument Objects.

#### Examples
The following example uses this constructor to create a document.

```csharp
XDocument srcTree = new XDocument(
    new XComment("This is a comment"),
    new XElement("Root",
        new XElement("Child1", "data1"),
        new XElement("Child2", "data2"),
        new XElement("Child3", "data3"),
        new XElement("Child2", "data4"),
        new XElement("Info5", "info5"),
        new XElement("Info6", "info6"),
        new XElement("Info7", "info7"),
        new XElement("Info8", "info8")
    )
);

XDocument doc = new XDocument(
    new XDeclaration("1.0", "utf-8", "yes"),
    new XComment("This is a new comment"),
    new XElement("Root",
        from el in srcTree.Element("Root").Elements()
        where ((string)el).StartsWith("data")
        select el
    )
);
doc.Save("Test.xml");
Console.WriteLine(File.ReadAllText("Test.xml"));
```

```vb
Dim srcTree As XDocument = _
    <?xml version="1.0" encoding="utf-8" standalone="yes"?>
        <!--This is a comment-->
        <Root>
            <Child1>data1</Child1>
            <Child2>data2</Child2>
            <Child3>data3</Child3>
            <Child2>data4</Child2>
            <Info5>info5</Info5>
            <Info6>info6</Info6>
            <Info7>info7</Info7>
            <Info8>info8</Info8>
        </Root>
Dim doc As XDocument = _
    <?xml version="1.0" encoding="utf-8" standalone="yes"?>
        <!--This is a new comment-->
        <Root>
            <%= From el In srcTree.<Root>.Elements _
                Where CStr(el).StartsWith("data") _
                Select el %>
        </Root>
doc.Save("Test.xml")
Console.WriteLine(File.ReadAllText("Test.xml"))
```

This example produces the following output:

```xml
<?xml version="1.0" encoding="utf-8" standalone="yes"?>
<!--This is a new comment-->
<Root>
  <Child1>data1</Child1>
  <Child2>data2</Child2>
  <Child3>data3</Child3>
  <Child2>data4</Child2>
</Root>
```

## XDocument.Declaration property

```csharp
public System.Xml.Linq.XDeclaration? Declaration { get; set; }
```

Gets or sets the XML declaration for this document.

Returns: An `XDeclaration` that contains the XML declaration for this document.

#### Remarks
Sometimes you have to create an XML declaration for a document. If you want to indicate that a document is standalone, you must use this property. If you want to encode your document with an encoding other than utf-8, you can specify an encoding through the `XDeclaration`. Another approach for encoding a document is to specify the encoding on an `XmlWriter` that you pass to LINQ to XML for writing.

#### Examples
The following example uses this property to retrieve the XML declaration of a document.

```csharp
XDocument doc = new XDocument(
    new XDeclaration("1.0", "utf-8", "yes"),
    new XComment("This is a comment"),
    new XElement("Root", "content")
);

Console.WriteLine(doc.Declaration);
```

```vb
Dim doc As XDocument = _
    <?xml version="1.0" encoding="utf-8" standalone="yes"?>
        <!--This is a comment-->
        <Root>content</Root>

Console.WriteLine(doc.Declaration)
```

This example produces the following output:

```xml
<?xml version="1.0" encoding="utf-8" standalone="yes"?>
```

## XDocument.DocumentType property

```csharp
public System.Xml.Linq.XDocumentType? DocumentType { get; }
```

Gets the Document Type Definition (DTD) for this document.

Returns: A `XDocumentType` that contains the DTD for this document.

#### Remarks
LINQ to XML provides limited support for DTDs.

You can populate an XML tree with an XML document that contains a DTD. The XML tree will then contain a `DocumentType` node. When you serialize or save the tree, the DTD will also be serialized. LINQ to XML will expand any entities in the DTD. When you serialize or save the XML tree, the entity references are not saved; instead, the nodes are saved with the entity references replaced by the text of the entity.

If the DTD contains default attributes, the attributes are created in the XML tree as ordinary attributes.

By default, LINQ to XML does not validate a document based on its DTD. To validate a document based on a DTD, create an `XmlReader` that will validate based on a DTD, and then create an XML tree from the `XmlReader`.

#### Examples
The following example creates a document that contains an `XDocumentType`.

Visual Basic does not support document types within XML literals. However, it is possible to create a document that contains a document type by first creating the document using XML literals, and then creating and adding an `XDocumentType` node in the appropriate place in the XML tree.

```csharp
string internalSubset = @"<!ELEMENT Pubs (Book+)>
<!ELEMENT Book (Title, Author)>
<!ELEMENT Title (#PCDATA)>
<!ELEMENT Author (#PCDATA)>";

string target = "xml-stylesheet";
string data = "href='mystyle.css' title='Compact' type='text/css'";

XDocument doc = new XDocument(
    new XComment("This is a comment."),
    new XProcessingInstruction(target, data),
    new XDocumentType("Pubs", null, null, internalSubset),
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
doc.Declaration = new XDeclaration("1.0", "utf-8", "true");
Console.WriteLine(doc);

doc.Save("test.xml");
```

```vb
Dim internalSubset = _
        "<!ELEMENT Pubs (Book+)>" & Environment.NewLine & _
        "<!ELEMENT Book (Title, Author)>" & Environment.NewLine & _
        "<!ELEMENT Title (#PCDATA)>" & Environment.NewLine & _
        "<!ELEMENT Author (#PCDATA)>"

Dim doc As XDocument = _
    <?xml version="1.0" encoding="utf-8" standalone="yes"?>
    <!--This is a comment.-->
    <?xml-stylesheet href='mystyle.css' title='Compact' type='text/css'?>
    <Pubs>
        <Book>
            <Title>Artifacts of Roman Civilization</Title>
            <Author>Moreno, Jordao</Author>
        </Book>
        <Book>
            <Title>Midieval Tools and Implements</Title>
            <Author>Gazit, Inbar</Author>
        </Book>
    </Pubs>
    <!--This is another comment.-->

doc.Nodes().Skip(1).First().AddAfterSelf(New XDocumentType("Pubs", Nothing, Nothing, internalSubset))
Console.WriteLine(doc)
```

This example produces the following output:

```xml
<!--This is a comment.-->
<?xml-stylesheet href='mystyle.css' title='Compact' type='text/css'?>
<!DOCTYPE Pubs [<!ELEMENT Pubs (Book+)>
<!ELEMENT Book (Title, Author)>
<!ELEMENT Title (#PCDATA)>
<!ELEMENT Author (#PCDATA)>]>
<Pubs>
  <Book>
    <Title>Artifacts of Roman Civilization</Title>
    <Author>Moreno, Jordao</Author>
  </Book>
  <Book>
    <Title>Midieval Tools and Implements</Title>
    <Author>Gazit, Inbar</Author>
  </Book>
</Pubs>
<!--This is another comment.-->
```
