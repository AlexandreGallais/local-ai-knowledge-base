---
title: "Compiled XPath Expressions"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/data/xml/compiled-xpath-expressions.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Compiled XPath Expressions

An `System.Xml.XPath.XPathExpression` object represents a compiled XPath query returned from either the static `System.Xml.XPath.XPathExpression.Compile*` method of the `System.Xml.XPath.XPathExpression` class or the `System.Xml.XPath.XPathNavigator.Compile*` method of the `System.Xml.XPath.XPathNavigator` class.

## The XPathExpression Class

 A compiled XPath query represented by an `System.Xml.XPath.XPathExpression` object is useful if the same XPath query is being used more than once.

 For example, when calling the `System.Xml.XPath.XPathNavigator.Select*` method multiple times, instead of using a string representing the XPath query each time, use the `System.Xml.XPath.XPathExpression.Compile*` method of the `System.Xml.XPath.XPathExpression` class or the `System.Xml.XPath.XPathNavigator.Compile*` method of the `System.Xml.XPath.XPathNavigator` class to compile and cache the XPath query in an `System.Xml.XPath.XPathExpression` object for reuse and improved performance.

 Once compiled, the `System.Xml.XPath.XPathExpression` object may be used as input to the following `System.Xml.XPath.XPathNavigator` class methods depending on the type returned from the XPath query.

- `System.Xml.XPath.XPathNavigator.Evaluate*`

- `System.Xml.XPath.XPathNavigator.Evaluate*`

- `System.Xml.XPath.XPathNavigator.Matches*`

- `System.Xml.XPath.XPathNavigator.Select*`

- `System.Xml.XPath.XPathNavigator.SelectSingleNode*`

 The following table describes each of the W3C XPath return types, their Microsoft .NET Framework equivalencies, and what methods the `System.Xml.XPath.XPathExpression` object may be used with based on its return type.

|W3C XPath Return Type|.NET Framework Equivalent Type|Description|Methods|
|---------------------------|------------------------------------|-----------------|-------------|
|`Node set`|`System.Xml.XPath.XPathNodeIterator`|An unordered collection of nodes without duplicates created in document order.|`System.Xml.XPath.XPathNavigator.Select*` or `System.Xml.XPath.XPathNavigator.Evaluate*`|
|`Boolean`|`System.Boolean`|A `true` or `false` value.|`System.Xml.XPath.XPathNavigator.Evaluate*` or `System.Xml.XPath.XPathNavigator.Matches*`|
|`Number`|`System.Double`|A floating-point number.|`System.Xml.XPath.XPathNavigator.Evaluate*`|
|`String`|`System.String`|A sequence of UCS characters.|`System.Xml.XPath.XPathNavigator.Evaluate*`|

> **Note:**
> The `System.Xml.XPath.XPathNavigator.Matches*` method accepts an XPath expression as its parameter. The `System.Xml.XPath.XPathNavigator.SelectSingleNode*` method returns an `System.Xml.XPath.XPathNavigator` object, not one of the W3C XPath return types.

### The ReturnType Property

 After an XPath query has been compiled into an `System.Xml.XPath.XPathExpression` object, you can use the `System.Xml.XPath.XPathExpression.ReturnType` property of the `System.Xml.XPath.XPathExpression` object to determine what the XPath query returns.

 The `System.Xml.XPath.XPathExpression.ReturnType` property returns one of the following `System.Xml.XPath.XPathResultType` enumeration values representing the W3C XPath return types.

- `System.Xml.XPath.XPathResultType.Any`

- `System.Xml.XPath.XPathResultType.Boolean`

- `System.Xml.XPath.XPathResultType.Error`

- `System.Xml.XPath.XPathResultType.Navigator`

- `System.Xml.XPath.XPathResultType.NodeSet`

- `System.Xml.XPath.XPathResultType.Number`

- `System.Xml.XPath.XPathResultType.String`

 The following example uses the `System.Xml.XPath.XPathExpression` object to return a number and a node set from the `books.xml` file. The `System.Xml.XPath.XPathExpression.ReturnType` property of each `System.Xml.XPath.XPathExpression` object as well as the results from the `System.Xml.XPath.XPathNavigator.Evaluate*` and `System.Xml.XPath.XPathNavigator.Select*` methods are written to the console.

```vb
Dim document As XPathDocument = New XPathDocument("books.xml")
Dim navigator As XPathNavigator = document.CreateNavigator()

' Returns a number.
Dim query1 As XPathExpression = navigator.Compile("bookstore/book/price/text()*10")
Console.WriteLine(query1.ReturnType)

Dim number As Double = CType(navigator.Evaluate(query1), Double)
Console.WriteLine(number)

' Returns a node set.
Dim query2 As XPathExpression = navigator.Compile("bookstore/book/price")
Console.WriteLine(query2.ReturnType)

Dim nodes As XPathNodeIterator = navigator.Select(query2)
nodes.MoveNext()
Console.WriteLine(nodes.Current.Value)
```

```csharp
XPathDocument document = new XPathDocument("books.xml");
XPathNavigator navigator = document.CreateNavigator();

// Returns a number.
XPathExpression query1 = navigator.Compile("bookstore/book/price/text()*10");
Console.WriteLine(query1.ReturnType);

Double number = (Double)navigator.Evaluate(query1);
Console.WriteLine(number);

// Returns a node set.
XPathExpression query2 = navigator.Compile("bookstore/book/price");
Console.WriteLine(query2.ReturnType);

XPathNodeIterator nodes = navigator.Select(query2);
nodes.MoveNext();
Console.WriteLine(nodes.Current.Value);
```

 The example takes the `books.xml` file as input.

 _Code sample not included: ../../../../samples/snippets/xml/VS_Snippets_Data/XPathXMLExamples/XML/books.xml._

### Higher Performance XPath Expressions

 For better performance, use the most specific XPath expression possible in your queries. For example, if the `book` node is a child node of the `bookstore` node and the `bookstore` node is the top-most element in an XML document, using the XPath expression `/bookstore/book` is faster than using `//book`. The `//book` XPath expression will scan every node in the XML tree to identify matching nodes.

 Additionally, using the node set navigation methods supplied by the `System.Xml.XPath.XPathNavigator` class may result in improved performance over the selection methods supplied by the `System.Xml.XPath.XPathNavigator` class in cases where your selection criteria are simple. For example, if you need to select the first child of the current node, it is faster to use the `System.Xml.XPath.XPathNavigator.MoveToFirst*` method than to use the `child::*[1]` XPath expression and the `System.Xml.XPath.XPathNavigator.Select*` method.

 For more information about the node set navigation methods of the `System.Xml.XPath.XPathNavigator` class, see Node Set Navigation Using XPathNavigator.

## See also

- `System.Xml.XmlDocument`
- `System.Xml.XPath.XPathDocument`
- `System.Xml.XPath.XPathNavigator`
- Process XML Data Using the XPath Data Model
- Select XML Data Using XPathNavigator
- Evaluate XPath Expressions using XPathNavigator
- Matching Nodes using XPathNavigator
- Node Types Recognized with XPath Queries
- XPath Queries and Namespaces
