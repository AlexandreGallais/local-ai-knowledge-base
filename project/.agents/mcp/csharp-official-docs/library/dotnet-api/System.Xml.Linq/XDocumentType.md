---
title: "XDocumentType class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Linq/XDocumentType.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XDocumentType class

Namespace: `System.Xml.Linq`

```csharp
public class XDocumentType : System.Xml.Linq.XNode
```

Represents an XML Document Type Definition (DTD).

#### Remarks
Data Type Definitions (DTD) in XML are a way to do the following:

- Validate XML trees to a limited extent.

- Expand entities, which is a form of text replacement.

- Supply default attributes.

This class represents the XML concept of a DTD.

DTD support in LINQ to XML is limited.

LINQ to XML will expand internal entities by default, but it will not resolve external entity references unless an `XmlReader` with an associated `XmlResolver` is used to load the XML tree.

LINQ to XML will not validate a document against a DTD, but you can use a validating `XmlReader` to perform DTD validation if necessary.

To validate an LINQ to XML tree against an XML schema, use the `Extensions.Validate` method.

When a document contains entity references that are defined in a DTD, the references are expanded upon creation of the XML tree. However, when you serialize or save the XML tree, the content of the expanded entities is preserved; the entity references are not.

Default attributes from the DTD will be materialized as regular attributes in the XML tree. After a default attribute from the DTD is materialized, there is no way to determine that the attribute was a default attribute from the DTD.

You can populate an XML tree with an XML document that contains an internal DTD. The XML tree will then contain a `DocumentType` node. When you serialize or save the tree, the internal DTD will also be saved as part of the document.

## XDocumentType.XDocumentType(XDocumentType) constructor

```csharp
public XDocumentType (System.Xml.Linq.XDocumentType other);
```

Initializes an instance of the `XDocumentType` class from another `XDocumentType` object.

Parameters:

- `other`: An `XDocumentType` object to copy from.

#### Remarks
This constructor is primarily used internally when making a deep copy of an XML tree.

## XDocumentType.XDocumentType(String, String, String, String) constructor

```csharp
public XDocumentType (string name, string? publicId, string? systemId, string? internalSubset);
```

Initializes an instance of the `XDocumentType` class.

Parameters:

- `name`: A `String` that contains the qualified name of the DTD, which is the same as the qualified name of the root element of the XML document.
- `publicId`: A `String` that contains the public identifier of an external public DTD.
- `systemId`: A `String` that contains the system identifier of an external private DTD.
- `internalSubset`: A `String` that contains the internal subset for an internal DTD.

#### Examples
The following example creates a document with an internal DTD. When it creates the `XDocumentType` object, it specifies the qualified name of the DTD (Pubs), and a string that contains the internal subset. Because the document does not use a public or private external DTD, the `publicId` and `systemId` are set to `null`.

```csharp
string internalSubset = @"<!ELEMENT Pubs (Book+)>
<!ELEMENT Book (Title, Author)>
<!ELEMENT Title (#PCDATA)>
<!ELEMENT Author (#PCDATA)>";

string target = "xml-stylesheet";
string data = "href=\"mystyle.css\" title=\"Compact\" type=\"text/css\"";

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
    <?xml-stylesheet href="mystyle.css" title="Compact" type="text/css"?>
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

doc.FirstNode.NextNode.AddAfterSelf(new XDocumentType("Pubs", Nothing, Nothing, internalSubset))

Console.WriteLine(doc)
```

This example produces the following output:

```xml
<!--This is a comment.-->
<?xml-stylesheet href="mystyle.css" title="Compact" type="text/css"?>
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

## XDocumentType.InternalSubset property

```csharp
public string? InternalSubset { get; set; }
```

Gets or sets the internal subset for this Document Type Definition (DTD).

Returns: A `String` that contains the internal subset for this Document Type Definition (DTD).

#### Examples
The following example creates a document with a DTD that contains an internal subset.

```csharp
string internalSubset = @"<!ELEMENT Pubs (Book+)>
<!ELEMENT Book (Title, Author)>
<!ELEMENT Title (#PCDATA)>
<!ELEMENT Author (#PCDATA)>";

string target = "xml-stylesheet";
string data = "href=\"mystyle.css\" title=\"Compact\" type=\"text/css\"";

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

Console.WriteLine(doc.DocumentType.InternalSubset);
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

doc.FirstNode.AddAfterSelf(new XDocumentType("Pubs", Nothing, Nothing, internalSubset))

Console.WriteLine(doc.DocumentType.InternalSubset)
```

This example produces the following output:

```
<!ELEMENT Pubs (Book+)>
<!ELEMENT Book (Title, Author)>
<!ELEMENT Title (#PCDATA)>
<!ELEMENT Author (#PCDATA)>
```

## XDocumentType.Name property

```csharp
public string Name { get; set; }
```

Gets or sets the name for this Document Type Definition (DTD).

Returns: A `String` that contains the name for this Document Type Definition (DTD).

#### Examples
The following example creates an XML document that contains a DTD. After creating the document, it retrieves the qualified name of the DTD using this property.

```csharp
string internalSubset = @"<!ELEMENT Pubs (Book+)>
<!ELEMENT Book (Title, Author)>
<!ELEMENT Title (#PCDATA)>
<!ELEMENT Author (#PCDATA)>";

string target = "xml-stylesheet";
string data = "href=\"mystyle.css\" title=\"Compact\" type=\"text/css\"";

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

Console.WriteLine(doc.DocumentType.Name);
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

doc.FirstNode.AddAfterSelf(new XDocumentType("Pubs", Nothing, Nothing, internalSubset))

Console.WriteLine(doc.DocumentType.Name)
```

This example produces the following output:

```
Pubs
```

## XDocumentType.NodeType property

```csharp
public override System.Xml.XmlNodeType NodeType { get; }
```

Gets the node type for this node.

Returns: The node type. For `XDocumentType` objects, this value is `XmlNodeType.DocumentType`.

#### Remarks
Because all classes that derive from `XObject` contain a `NodeType` property, you can write code that operates on collections of concrete subclass of `XObject`. Your code can then test for the node type of each node in the collection.

#### Examples
The following example shows the use of this property to retrieve the node type for an `XDocumentType` object.

```csharp
string internalSubset = @"<!ELEMENT Pubs (Book+)>
<!ELEMENT Book (Title, Author)>
<!ELEMENT Title (#PCDATA)>
<!ELEMENT Author (#PCDATA)>";

string target = "xml-stylesheet";
string data = "href=\"mystyle.css\" title=\"Compact\" type=\"text/css\"";

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

Console.WriteLine(doc.DocumentType.NodeType);
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

doc.FirstNode.AddAfterSelf(new XDocumentType("Pubs", Nothing, Nothing, internalSubset))

Console.WriteLine(doc.DocumentType.NodeType.ToString())
```

This example produces the following output:

```
DocumentType
```

## XDocumentType.PublicId property

```csharp
public string? PublicId { get; set; }
```

Gets or sets the public identifier for this Document Type Definition (DTD).

Returns: A `String` that contains the public identifier for this Document Type Definition (DTD).

#### Remarks
If an XML document uses an external public DTD, this property will contain the public identifier of the external DTD.
