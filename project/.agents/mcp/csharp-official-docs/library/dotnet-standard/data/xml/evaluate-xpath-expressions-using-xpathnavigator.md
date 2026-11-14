---
title: "Evaluate XPath Expressions using XPathNavigator"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/data/xml/evaluate-xpath-expressions-using-xpathnavigator.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Evaluate XPath Expressions using XPathNavigator

The `System.Xml.XPath.XPathNavigator` class provides the `System.Xml.XPath.XPathNavigator.Evaluate*` method to evaluate an XPath expression. The `System.Xml.XPath.XPathNavigator.Evaluate*` method takes an XPath expression, evaluates it and returns a W3C XPath type of Boolean, Number, String, or Node Set based on the result of the XPath expression.

## The Evaluate Method

 The `System.Xml.XPath.XPathNavigator.Evaluate*` method takes an XPath expression, evaluates it, and returns a typed result of Boolean (`System.Boolean`), Number (`System.Double`), String (`System.String`), or Node Set (`System.Xml.XPath.XPathNodeIterator`). For example, the `System.Xml.XPath.XPathNavigator.Evaluate*` method could be used in a mathematical method. The following example code calculates the total price of all the books in the `books.xml` file.

```vb
Dim document As XPathDocument = New XPathDocument("books.xml")
Dim navigator As XPathNavigator = document.CreateNavigator()

Dim query As XPathExpression = navigator.Compile("sum(//price/text())")
Dim total As Double = CType(navigator.Evaluate(query), Double)
Console.WriteLine(total)
```

```csharp
XPathDocument document = new XPathDocument("books.xml");
XPathNavigator navigator = document.CreateNavigator();

XPathExpression query = navigator.Compile("sum(//price/text())");
Double total = (Double)navigator.Evaluate(query);
Console.WriteLine(total);
```

 The example takes the `books.xml` file as input.

 _Code sample not included: ../../../../samples/snippets/xml/VS_Snippets_Data/XPathXMLExamples/XML/books.xml._

### position and last Functions

 The `System.Xml.XPath.XPathNavigator.Evaluate*` method is overloaded. One of the `System.Xml.XPath.XPathNavigator.Evaluate*` methods takes an `System.Xml.XPath.XPathNodeIterator` object as a parameter. This particular `System.Xml.XPath.XPathNavigator.Evaluate*` method is identical to the `System.Xml.XPath.XPathNavigator.Evaluate*` method that takes only an `System.Xml.XPath.XPathExpression` object as a parameter, except that it allows a node set argument to specify the current context to perform the evaluation on. This context is required for the XPath `position()` and `last()` functions as they are relative to the current context node. Unless used as a predicate in a location step, the `position()` and `last()` functions require a reference to a node set in order to be evaluated otherwise, the `position` and `last` functions return `0`.

## See also

- `System.Xml.XmlDocument`
- `System.Xml.XPath.XPathDocument`
- `System.Xml.XPath.XPathNavigator`
- Process XML Data Using the XPath Data Model
- Select XML Data Using XPathNavigator
- Matching Nodes using XPathNavigator
- Node Types Recognized with XPath Queries
- XPath Queries and Namespaces
- Compiled XPath Expressions
