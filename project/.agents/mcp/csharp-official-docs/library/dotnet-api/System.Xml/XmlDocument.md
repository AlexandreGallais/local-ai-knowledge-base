---
title: "XmlDocument class (part 1 of 7)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/XmlDocument.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlDocument class

Namespace: `System.Xml`

```csharp
public class XmlDocument : System.Xml.XmlNode
```

Represents an XML document. You can use this class to load, validate, edit, add, and position XML in a document.

The `XmlDocument` class is an in-memory representation of an XML document. It implements the W3C XML Document Object Model (DOM) Level 1 Core and the Core DOM Level 2.

*DOM* stands for *document object model*. To read more about it, see XML Document Object Model (DOM).

You can load XML into the DOM by using the `XmlDocument` class, and then programmatically read, modify, and remove XML in the document.

If you want to pry open the `XmlDocument` class and see how it's implemented, see the Reference Source.

#### Load XML into the document object model

Start with an XML document like this one that has a few books in a collection. It contains the basic <example-value> that you'd find in any XML document, including a namespace, elements that represent data, and attributes that describe the data.

```xml
<?xml version="1.0" encoding="utf-8"?>
<books xmlns="http://www.contoso.com/books">
  <book genre="novel" ISBN="1-861001-57-8" publicationdate="1823-01-28">
    <title>Pride And Prejudice</title>
    <price>24.95</price>
  </book>
  <book genre="novel" ISBN="1-861002-30-1" publicationdate="1985-01-01">
    <title>The Handmaid's Tale</title>
    <price>29.95</price>
  </book>
  <book genre="novel" ISBN="1-861001-45-3" publicationdate="1811-01-01">
    <title>Sense and Sensibility</title>
    <price>19.95</price>
  </book>
</books>
```

Next, load this data into the DOM so that you can work with it in memory. The most popular way to do this is refer to a file on your local computer or on a network.

This example loads XML from a file. If the file doesn't exist, it just generates some XML and loads that.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlDocument/Overview/xmlhelpermethods.cs._

For more information, see Reading an XML Document into the DOM.

#### Validate it against a schema

Start with an XML schema like this one. This schema defines the data types in the XML and which attributes are required.

```xml
<?xml version="1.0" encoding="utf-8"?>
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema"
  attributeFormDefault="unqualified"
  elementFormDefault="qualified"
  targetNamespace="http://www.contoso.com/books">
  <xs:element name="books">
    <xs:complexType>
      <xs:sequence>
        <xs:element maxOccurs="unbounded" name="book">
          <xs:complexType>
            <xs:sequence>
              
              
            </xs:sequence>
            
            
            
          </xs:complexType>
        </xs:element>
      </xs:sequence>
    </xs:complexType>
  </xs:element>
</xs:schema>
```

Create an `XmlReader` object by using your schema, and then load that object into the DOM. Create an event handler that executes when code attempts to modify your XML file in ways that violate the rules of the schema.

These blocks of code show helper methods that do all of this.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlDocument/Overview/xmlhelpermethods.cs._

For more information, see Validating an XML Document in the DOM.

#### Navigate the document tree

You can use properties to navigate around an XML document. But before you use any of them, let's quickly review a few terms. Your document is composed of nodes. Each node has a single *parent* node directly above it. The only node that does not have a parent node is the document root, as it is the top-level node. Most nodes can have *child* nodes, which are nodes directly below them. Nodes that are at the same level are *siblings*.

The following examples show you how to obtain the root node, jump to the first child node of the root node, access any of its child nodes, get back out to the parent node, and then navigate across sibling nodes.

**Start with the root node**

This example gets the root node and then uses that node to output the contents of the document to the console.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlDocument/Overview/source.cs._

**Get child nodes**

This example jumps to the first child node of the root node and then iterates through the child nodes of that node if any exist.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlDocument/Overview/source2.cs._

**Get back to the parent node**

Use the `ParentNode` property.

**Refer to the last child node**

This example writes the price of a book to the console. The price node is the last child of a book node.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlDocument/Overview/source3.cs._

**Navigate forward across siblings**

This example moves forward from book to book. Book nodes are siblings to one another.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlDocument/Overview/source4.cs._

**Navigate backwards across siblings**

This example moves backwards from book to book.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlLinkedNode/PreviousSibling/source.cs._

#### Find nodes

The most popular way to find one or more nodes of data is to use an XPath query string, but there are also methods that don't require one.

**Get a single node**

This example locates a book by using the ISBN number.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlDocument/Overview/xmlhelpermethods.cs._

The string used in this example is an Xpath query. You can find more examples of them at XPath examples.

You can also use the `XmlDocument.GetElementById` to retrieve nodes. To use this approach, you'll have to define ID's in the document type definition declarations of your XML file.

After you get a node, you get the value of attributes or child nodes. This example does that with a book node.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlDocument/Overview/xmlhelpermethods.cs._

**Get a collection of nodes**

This example selects all books where the author's last name is **Austen**, and then changes the price of those books.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlDocument/Overview/source6.cs._

You can also get a collection of nodes by using the name of the node. For example, this example gets a collection of all book titles.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlDocument/Overview/source1.cs._

For more information, see Select Nodes Using XPath Navigation.

#### Edit nodes

This example edits a book node and its attributes.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlDocument/Overview/xmlhelpermethods.cs._

For more information, see Modifying Nodes, Content, and Values in an XML Document.

#### Add nodes

To add a node, use the `XmlDocument.CreateElement` method or the `XmlDocument.CreateNode` method.

To add a data node such as a book, use the `XmlDocument.CreateElement` method.

For any other type of node such as a comment, whitespace node, or CDATA node, use the `XmlDocument.CreateNode` method.

This example creates a book node, adds attributes to that node, and then adds that node to the document.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlDocument/Overview/xmlhelpermethods.cs._

For more information, see Inserting Nodes into an XML Document.

#### Remove nodes

To remove a node, use the `XmlNode.RemoveChild` method.

This example removes a book from the document and any whitespace that appears just before the book node.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlDocument/Overview/xmlhelpermethods.cs._

For more information, see Removing Nodes, Content, and Values from an XML Document.

#### Position nodes

You can choose where you want a node to appear in your document by using the `XmlNode.InsertBefore` and `XmlNode.InsertAfter` methods.

This example shows two helper methods. One of them moves a node higher in a list. The other one moves a node lower.

These methods could be used in an application that enables users to move books up and down in a list of books. When a user chooses a book and presses an up or down button, your code could call methods like these to position the corresponding book node before or after other book nodes.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlDocument/Overview/xmlhelpermethods.cs._

## XmlDocument.XmlDocument() constructor

```csharp
public XmlDocument ();
```

Initializes a new instance of the `XmlDocument` class.

#### Examples

The following is an example of load-time validation. A document type definition (DTD) validating `XmlReader` is passed to the `XmlDocument.Load` method and a `ValidationEventHandler` is provided to notify users of any validation errors. In this example a validation error is found, but the document is still loaded. Alternatively, you can define a validating `XmlReader` to throw an exception and stop the load process when a validation error is found by not specifying the `ValidationEventHandler`. For more information about validating XML data, see the Remarks section of the `XmlReader` reference page.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlDocument/.ctor/docload.cs._

The example uses the `bookDTD.xml` file as input.

_Code sample not included: ~/snippets/xml/VS_Snippets_Data/XmlDocument.cctor/XML/bookdtd.xml._

## XmlDocument.XmlDocument(XmlImplementation) constructor

```csharp
protected internal XmlDocument (System.Xml.XmlImplementation imp);
```

Initializes a new instance of the `XmlDocument` class with the specified `XmlImplementation`.

Parameters:

- `imp`: The `XmlImplementation` to use.

To be added.

## XmlDocument.XmlDocument(XmlNameTable) constructor

```csharp
public XmlDocument (System.Xml.XmlNameTable nt);
```

Initializes a new instance of the `XmlDocument` class with the specified `XmlNameTable`.

Parameters:

- `nt`: The `XmlNameTable` to use.

To be added.

## XmlDocument.BaseURI property

```csharp
public override string BaseURI { get; }
```

Gets the base URI of the current node.

Returns: The location from which the node was loaded.

#### Remarks
A networked XML document is comprised of chunks of data aggregated using various W3C standard inclusion mechanisms and therefore contains nodes that come from different places. The `BaseURI` tells you where these nodes came from.

For Document nodes, `BaseURI` returns the location of the XML document. For example, if the `XmlDocument` was loaded using the following call `doc.Load("http://server/mydata.xml")`, the `BaseURI` for the document node is `http://server/mydata.xml`. However, if the `XmlDocument.Load` method is redirected by server to a different URI, `BaseURI` returns the original URI passed to the `Load` method.

This property is a Microsoft extension to the Document Object Model (DOM). For additional information on `BaseURI` and how it behaves with other node types, see `BaseURI`.

## XmlDocument.DocumentElement property

```csharp
public System.Xml.XmlElement? DocumentElement { get; }
```

Gets the root `XmlElement` for the document.

Returns: The `XmlElement` that represents the root of the XML document tree. If no root exists, `null` is returned.

#### Examples

The following example displays the root element of the XML document.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlDocument/Overview/source.cs._
[!code-vbClassic WebData XmlDocument.DocumentElement Example#1]

**Output:**

```xml
<book genre="novel" ISBN="1-861001-57-5"><title>Pride And Prejudice</title></book>
```

## XmlDocument.DocumentType property

```csharp
public virtual System.Xml.XmlDocumentType? DocumentType { get; }
```

Gets the node containing the DOCTYPE declaration.

Returns: The `XmlNode` containing the DocumentType (DOCTYPE declaration).

#### Remarks
An `XmlDocument` can have one and only one child with `XmlNodeType` equal to DocumentType.

> **Note:**
> This property is read-only. To change the DocumentType node, delete the existing node, create a new one using the `XmlDocument.CreateDocumentType` method, and add the new node to the document.

#### Examples

The following example gets and displays the DOCTYPE declaration for the document.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlDocument/DocumentType/source.cs._
[!code-vbClassic WebData XmlDocument.DocumentType Example#1]

## XmlDocument.Implementation property

```csharp
public System.Xml.XmlImplementation Implementation { get; }
```

Gets the `XmlImplementation` object for the current document.

Returns: The `XmlImplementation` object for the current document.

#### Remarks
`XmlDocument` objects created from the same `XmlImplementation` share the same `XmlNameTable`. This allows users to compare attribute and element names as objects rather than strings.

Although the `XmlDocument` objects share the same implementation, to move nodes from one document to another you must use the `XmlDocument.ImportNode` method.

#### Examples

The following example creates a new `XmlDocument` using another document's implementation.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlDocument/Implementation/source.cs._
[!code-vbClassic WebData XmlDocument.Implementation Example#1]

## XmlDocument.InnerText property

```csharp
public override string InnerText { set; }
```

Throws an `InvalidOperationException` in all cases.

Returns: The values of the node and all its child nodes.

Exceptions:

- `InvalidOperationException`: In all cases.

#### Remarks
This property is not implemented.
