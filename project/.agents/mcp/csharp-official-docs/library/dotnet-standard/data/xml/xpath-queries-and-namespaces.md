---
title: "XPath Queries and Namespaces"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/data/xml/xpath-queries-and-namespaces.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# XPath Queries and Namespaces

XPath queries are aware of namespaces in an XML document and can use namespace prefixes to qualify element and attribute names. Qualifying element and attribute names with a namespace prefix limits the nodes returned by an XPath query to only those nodes that belong to a specific namespace.

 For example if the prefix `books` maps to the namespace `http://www.contoso.com/books`, then the following XPath query `/books:books/books:book` selects only those `book` elements in the namespace `http://www.contoso.com/books`.

## The XmlNamespaceManager

 To use namespaces in an XPath query, an object derived from the `System.Xml.IXmlNamespaceResolver` interface like the `System.Xml.XmlNamespaceManager` class is constructed with the namespace URI and prefix to include in the XPath query.

 The `System.Xml.XmlNamespaceManager` object may be used in the query in each of the following ways.

- The `System.Xml.XmlNamespaceManager` object is associated with an existing `System.Xml.XPath.XPathExpression` object by using the `System.Xml.XPath.XPathExpression.SetContext*` method of the `System.Xml.XPath.XPathExpression` object. You may also compile a new `System.Xml.XPath.XPathExpression` object using the static `System.Xml.XPath.XPathExpression.Compile*` method which takes a string representing the XPath expression and an `System.Xml.XmlNamespaceManager` object as parameters and returns a new `System.Xml.XPath.XPathExpression` object.

- The `System.Xml.XmlNamespaceManager` object itself is passed as a parameter to an accepting `System.Xml.XPath.XPathNavigator` class method along with a string representing the XPath expression.

 The following are the methods of the `System.Xml.XPath.XPathNavigator` class that accept an object derived from the `System.Xml.IXmlNamespaceResolver` interface as a parameter.

- `System.Xml.XPath.XPathNavigator.Evaluate*`

- `System.Xml.XPath.XPathNavigator.Select*`

- `System.Xml.XPath.XPathNavigator.SelectSingleNode*`

### The Default Namespace

 In the XML document that follows, the default namespace with an empty prefix is used to declare the `http://www.contoso.com/books` namespace.

```xml
<books xmlns="http://www.contoso.com/books">
    <book>
        <title>Title</title>
        <author>Author Name</author>
        <price>5.50</price>
    </book>
</books>
```

 XPath treats the empty prefix as the `null` namespace. In other words, only prefixes mapped to namespaces can be used in XPath queries. This means that if you want to query against a namespace in an XML document, even if it is the default namespace, you need to define a prefix for it.

 For example, without defining a prefix for the XML document above, the XPath query `/books/book` would not return any results.

 A prefix must be bound to prevent ambiguity when querying documents with some nodes not in a namespace, and some in a default namespace.

 The following code defines a prefix for the default namespace and selects all the `book` elements from the `http://www.contoso.com/books` namespace.

```vb
Dim document As XPathDocument = New XPathDocument("books.xml")
Dim navigator As XPathNavigator = document.CreateNavigator()
Dim query As XPathExpression = navigator.Compile("/books:books/books:book")
Dim manager As XmlNamespaceManager = New XmlNamespaceManager(navigator.NameTable)
manager.AddNamespace("books", "http://www.contoso.com/books")
query.SetContext(manager)
Dim nodes As XPathNodeIterator = navigator.Select(query)
```

```csharp
XPathDocument document = new XPathDocument("books.xml");
XPathNavigator navigator = document.CreateNavigator();
XPathExpression query = navigator.Compile("/books:books/books:book");
XmlNamespaceManager manager = new XmlNamespaceManager(navigator.NameTable);
manager.AddNamespace("books", "http://www.contoso.com/books");
query.SetContext(manager);
XPathNodeIterator nodes = navigator.Select(query);
```

## See also

- `System.Xml.XmlDocument`
- `System.Xml.XPath.XPathDocument`
- `System.Xml.XPath.XPathNavigator`
- Process XML Data Using the XPath Data Model
- Select XML Data Using XPathNavigator
- Evaluate XPath Expressions using XPathNavigator
- Matching Nodes using XPathNavigator
- Node Types Recognized with XPath Queries
- Compiled XPath Expressions
