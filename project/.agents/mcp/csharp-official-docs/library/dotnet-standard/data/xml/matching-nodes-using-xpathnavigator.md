---
title: "Matching Nodes using XPathNavigator"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/data/xml/matching-nodes-using-xpathnavigator.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Matching Nodes using XPathNavigator

The `System.Xml.XPath.XPathNavigator` class provides the `System.Xml.XPath.XPathNavigator.Matches*` method to determine if a node matches an XPath expression. The `System.Xml.XPath.XPathNavigator.Matches*` method takes an XPath expression as input and returns a `System.Boolean` that indicates if the current node matches the given XPath expression or the given compiled `System.Xml.XPath.XPathExpression` object.

## Matching Nodes

 The `System.Xml.XPath.XPathNavigator.Matches*` method returns `true` if the current node matches the XPath expression specified. For example, in the code example that follows, the `System.Xml.XPath.XPathNavigator.Matches*` method will return `true` if the current node is the element `b`, and element `b` has an attribute `c`.

> **Note:**
> The `System.Xml.XPath.XPathNavigator.Matches*` method does not change the state of the `System.Xml.XPath.XPathNavigator`.

```vb
Dim document as XPathDocument = New XPathDocument("input.xml")
Dim navigator as XPathNavigator = document.CreateNavigator()

navigator.Matches("b[@c]")
```

```csharp
XPathDocument document = new XPathDocument("input.xml");
XPathNavigator navigator = document.CreateNavigator();

navigator.Matches("b[@c]");
```

## See also

- `System.Xml.XmlDocument`
- `System.Xml.XPath.XPathDocument`
- `System.Xml.XPath.XPathNavigator`
- Process XML Data Using the XPath Data Model
- Select XML Data Using XPathNavigator
- Evaluate XPath Expressions using XPathNavigator
- Node Types Recognized with XPath Queries
- XPath Queries and Namespaces
- Compiled XPath Expressions
