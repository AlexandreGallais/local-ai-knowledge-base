---
title: "Insert XML Data using XPathNavigator (part 20 of 20)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/data/xml/insert-xml-data-using-xpathnavigator.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Insert XML Data using XPathNavigator (part 20 of 20)

## Namespace and xml:lang Conflicts

 Certain conflicts related to the scope of namespace and `xml:lang` declarations can occur when inserting XML data using the `System.Xml.XPath.XPathNavigator.InsertBefore*`, `System.Xml.XPath.XPathNavigator.InsertAfter*`, `System.Xml.XPath.XPathNavigator.AppendChild*` and `System.Xml.XPath.XPathNavigator.PrependChild*` methods of the `System.Xml.XPath.XPathNavigator` class that take `System.Xml.XmlReader` objects as parameters.

 The following are the possible namespace conflicts.

- If there is a namespace in-scope within the `System.Xml.XmlReader` object's context, where the prefix to namespace URI mapping is not in the `System.Xml.XPath.XPathNavigator` object's context, a new namespace declaration is added to the newly inserted node.

- If the same namespace URI is in-scope within both the `System.Xml.XmlReader` object's context and the `System.Xml.XPath.XPathNavigator` object's context, but has a different prefix mapped to it in both contexts, a new namespace declaration is added to the newly inserted node, with the prefix and namespace URI taken from the `System.Xml.XmlReader` object.

- If the same namespace prefix is in-scope within both the `System.Xml.XmlReader` object's context and the `System.Xml.XPath.XPathNavigator` object's context, but has a different namespace URI mapped to it in both contexts, a new namespace declaration is added to the newly inserted node which re-declares that prefix with the namespace URI taken from `System.Xml.XmlReader` object.

- If the prefix as well as the namespace URI in both the `System.Xml.XmlReader` object's context and the `System.Xml.XPath.XPathNavigator` object's context is the same, no new namespace declaration is added to the newly inserted node.

> **Note:**
> The description above also applies to namespace declarations with the empty `string` as a prefix (for example, the default namespace declaration).

 The following are the possible `xml:lang` conflicts.

- If there is an `xml:lang` attribute in-scope within the `System.Xml.XmlReader` object's context but not in the `System.Xml.XPath.XPathNavigator` object's context, an `xml:lang` attribute whose value is taken from the `System.Xml.XmlReader` object is added to the newly inserted node.

- If there is an `xml:lang` attribute in-scope within both the `System.Xml.XmlReader` object's context and the `System.Xml.XPath.XPathNavigator` object's context, but each has a different value, an `xml:lang` attribute whose value is taken from the `System.Xml.XmlReader` object is added to the newly inserted node.

- If there is an `xml:lang` attribute in-scope within both the `System.Xml.XmlReader` object's context and the `System.Xml.XPath.XPathNavigator` object's context, but each with the same value, no new `xml:lang` attribute is added on the newly inserted node.

- If there is an `xml:lang` attribute in-scope within the `System.Xml.XPath.XPathNavigator` object's context, but none existing in the `System.Xml.XmlReader` object's context, no `xml:lang` attribute is added to the newly inserted node.

## Inserting Nodes with XmlWriter

 The methods used to insert sibling, child and attribute nodes described in the "Inserting Nodes and Values" section are overloaded. The `System.Xml.XPath.XPathNavigator.InsertAfter*`, `System.Xml.XPath.XPathNavigator.InsertBefore*`, `System.Xml.XPath.XPathNavigator.AppendChild*`, `System.Xml.XPath.XPathNavigator.PrependChild*` and `System.Xml.XPath.XPathNavigator.CreateAttributes*` methods of the `System.Xml.XPath.XPathNavigator` class return an `System.Xml.XmlWriter` object used to insert nodes.

### Unsupported XmlWriter Methods

 Not all of the methods used for writing information to an XML document using the `System.Xml.XmlWriter` class are supported by the `System.Xml.XPath.XPathNavigator` class due to difference between the XPath data model and the Document Object Model (DOM).

 The following table describes the `System.Xml.XmlWriter` class methods not supported by the `System.Xml.XPath.XPathNavigator` class.

|Method|Description|
|------------|-----------------|
|`System.Xml.XmlWriter.WriteEntityRef*`|Throws a `System.NotSupportedException` exception.|
|`System.Xml.XmlWriter.WriteDocType*`|Ignored at the root level and throws a `System.NotSupportedException` exception if called at any other level in the XML document.|
|`System.Xml.XmlWriter.WriteCData*`|Treated as a call to the `System.Xml.XmlWriter.WriteString*` method for the equivalent character or characters.|
|`System.Xml.XmlWriter.WriteCharEntity*`|Treated as a call to the `System.Xml.XmlWriter.WriteString*` method for the equivalent character or characters.|
|`System.Xml.XmlWriter.WriteSurrogateCharEntity*`|Treated as a call to the `System.Xml.XmlWriter.WriteString*` method for the equivalent character or characters.|

 For more information about the `System.Xml.XmlWriter` class, see the `System.Xml.XmlWriter` class reference documentation.

### Multiple XmlWriter Objects

 It is possible to have multiple `System.Xml.XPath.XPathNavigator` objects pointing to different parts of an XML document with one or more open `System.Xml.XmlWriter` objects. Multiple `System.Xml.XmlWriter` objects are allowed and supported in single-threaded scenarios.

 The following are important notes to consider when using multiple `System.Xml.XmlWriter` objects.

- XML fragments written by `System.Xml.XmlWriter` objects are added to the XML document when the `System.Xml.XmlWriter.Close*` method of each `System.Xml.XmlWriter` object is called. Until that point, the `System.Xml.XmlWriter` object is writing a disconnected fragment. If an operation is performed on the XML document, any fragments being written by an `System.Xml.XmlWriter` object, before the `System.Xml.XmlWriter.Close*` has been called, are not affected.

- If there is an open `System.Xml.XmlWriter` object on a particular XML subtree and that subtree is deleted, the `System.Xml.XmlWriter` object may still add to the sub-tree. The subtree simply becomes a deleted fragment.

- If multiple `System.Xml.XmlWriter` objects are opened at the same point in the XML document, they are added to the XML document in the order in which the `System.Xml.XmlWriter` objects are closed, not in the order in which they were opened.

 The following example creates an `System.Xml.XmlDocument` object, creates an `System.Xml.XPath.XPathNavigator` object, and then uses the `System.Xml.XmlWriter` object returned by the `System.Xml.XPath.XPathNavigator.PrependChild*` method to create the structure of the first book in the `books.xml` file. The example then saves it as the `book.xml` file.

```vb
Dim document As XmlDocument = New XmlDocument()
Dim navigator As XPathNavigator = document.CreateNavigator()

Using writer As XmlWriter = navigator.PrependChild()

    writer.WriteStartElement("bookstore")
    writer.WriteStartElement("book")
    writer.WriteAttributeString("genre", "autobiography")
    writer.WriteAttributeString("publicationdate", "1981-03-22")
    writer.WriteAttributeString("ISBN", "1-861003-11-0")
    writer.WriteElementString("title", "The Autobiography of Benjamin Franklin")
    writer.WriteStartElement("author")
    writer.WriteElementString("first-name", "Benjamin")
    writer.WriteElementString("last-name", "Franklin")
    writer.WriteElementString("price", "8.99")
    writer.WriteEndElement()
    writer.WriteEndElement()
    writer.WriteEndElement()

End Using

document.Save("book.xml")
```

```csharp
XmlDocument document = new XmlDocument();
XPathNavigator navigator = document.CreateNavigator();

using (XmlWriter writer = navigator.PrependChild())
{
    writer.WriteStartElement("bookstore");
    writer.WriteStartElement("book");
    writer.WriteAttributeString("genre", "autobiography");
    writer.WriteAttributeString("publicationdate", "1981-03-22");
    writer.WriteAttributeString("ISBN", "1-861003-11-0");
    writer.WriteElementString("title", "The Autobiography of Benjamin Franklin");
    writer.WriteStartElement("author");
    writer.WriteElementString("first-name", "Benjamin");
    writer.WriteElementString("last-name", "Franklin");
    writer.WriteElementString("price", "8.99");
    writer.WriteEndElement();
    writer.WriteEndElement();
    writer.WriteEndElement();
}
document.Save("book.xml");
```

## Saving an XML Document

 Saving changes made to an `System.Xml.XmlDocument` object as the result of the methods described in this topic is performed using the methods of the `System.Xml.XmlDocument` class. For more information about saving changes made to an `System.Xml.XmlDocument` object, see Saving and Writing a Document.

## See also

- `System.Xml.XmlDocument`
- `System.Xml.XPath.XPathDocument`
- `System.Xml.XPath.XPathNavigator`
- Process XML Data Using the XPath Data Model
- Modify XML Data using XPathNavigator
- Remove XML Data using XPathNavigator
