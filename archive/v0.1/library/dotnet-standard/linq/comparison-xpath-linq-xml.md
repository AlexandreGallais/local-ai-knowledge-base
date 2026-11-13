---
title: "Comparison of XPath and LINQ to XML - LINQ to XML"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/linq/comparison-xpath-linq-xml.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Comparison of XPath and LINQ to XML

XPath and LINQ to XML are similar in some ways. Both can be used to query an XML tree, returning such results as a collection of elements, a collection of attributes, a collection of nodes, or the value of an element or attribute. However, there are significant differences between the two options.

## Differences between XPath and LINQ to XML

XPath doesn't allow projection of new types. It can only return collections of nodes from the tree, whereas LINQ to XML can execute a query and project an object graph or an XML tree in a new shape. LINQ to XML queries can do much more than XPath expressions.

XPath expressions exist in isolation within a string. The C# compiler can't help parse the XPath expression at compile time. By contrast, LINQ to XML queries are parsed and compiled by the C# compiler. The compiler can catch many query errors.

XPath results aren't strongly typed. In a number of circumstances, the result of evaluating an XPath expression is an object, and it's up to the developer to determine the proper type and cast the result as necessary. By contrast, the projections from a LINQ to XML query are strongly typed.

## Result ordering

The XPath 1.0 Recommendation states that a collection that's the result of evaluating an XPath expression is unordered.

However, when iterating through a collection returned by a LINQ to XML XPath axis method, the nodes in the collection are returned in document order. This is the case even when accessing the XPath axes where predicates are expressed in terms of reverse document order, such as `preceding` and `preceding-sibling`.

By contrast, most of the LINQ to XML axes return collections in document order. However, two of them, `System.Xml.Linq.XNode.Ancestors*` and `System.Xml.Linq.XElement.AncestorsAndSelf*`, return collections in reverse document order. The following table enumerates the axes, and indicates the collection order for each:

|LINQ to XML axis|Ordering|
|----------------------|--------------|
|XContainer.DescendantNodes|Document order|
|XContainer.Descendants|Document order|
|XContainer.Elements|Document order|
|XContainer.Nodes|Document order|
|XContainer.NodesAfterSelf|Document order|
|XContainer.NodesBeforeSelf|Document order|
|XElement.AncestorsAndSelf|Reverse document order|
|XElement.Attributes|Document order|
|XElement.DescendantNodesAndSelf|Document order|
|XElement.DescendantsAndSelf|Document order|
|XNode.Ancestors|Reverse document order|
|XNode.ElementsAfterSelf|Document order|
|XNode.ElementsBeforeSelf|Document order|
|XNode.NodesAfterSelf|Document order|
|XNode.NodesBeforeSelf|Document order|

## Positional predicates

Within an XPath expression, positional predicates are expressed in terms of document order for many axes, but are expressed in reverse document order for reverse axes. The reverse axes are: `preceding`, `preceding-sibling`, `ancestor`, and `ancestor-or-self`. For example, the XPath expression `preceding-sibling::*[1]` returns the immediately preceding sibling. This is the case even though the final result set is presented in document order.

By contrast, all positional predicates in LINQ to XML are always expressed in terms of the order of the axis. For example, `anElement.ElementsBeforeSelf().ElementAt(0)` returns the first child element of the parent of the queried element, not the immediate preceding sibling. Another example: `anElement.Ancestors().ElementAt(0)` returns the parent element.

If you wanted to find the immediately preceding element in LINQ to XML, you would write the following expression:

```csharp
ElementsBeforeSelf().Last()
```

```vb
ElementsBeforeSelf().Last()
```

## Performance differences

XPath queries that use the XPath functionality in LINQ to XML will be slower than LINQ to XML queries.

## Comparison of composition

Composition of a LINQ to XML query is similar to composition of an XPath expression, but the syntax is very different.

For example, if you have an element in a variable named `customers`, and you want to find a grandchild element named `CompanyName` under all child elements named `Customer`, you would write this XPath expression:

```csharp
customers.XPathSelectElements("./Customer/CompanyName")
```

```vb
customers.XPathSelectElements("./Customer/CompanyName")
```

The equivalent LINQ to XML query is:

```csharp
customers.Elements("Customer").Elements("CompanyName")
```

```vb
customers.Elements("Customer").Elements("CompanyName")
```

There are similar parallels for each of the XPath axes.

|XPath axis|LINQ to XML axis|
|----------------|----------------------|
|child (the default axis)|`System.Xml.Linq.XContainer.Elements*`|
|Parent (..)|`System.Xml.Linq.XObject.Parent*`|
|attribute axis (@)|`System.Xml.Linq.XElement.Attribute*` or `System.Xml.Linq.XElement.Attributes*`|
|ancestor axis|`System.Xml.Linq.XNode.Ancestors*`|
|ancestor-or-self axis|`System.Xml.Linq.XElement.AncestorsAndSelf*`|
|descendant axis (//)|`System.Xml.Linq.XContainer.Descendants*` or `System.Xml.Linq.XContainer.DescendantNodes*`|
|descendant-or-self|`System.Xml.Linq.XElement.DescendantsAndSelf*` or `System.Xml.Linq.XElement.DescendantNodesAndSelf*`|
|following-sibling|`System.Xml.Linq.XNode.ElementsAfterSelf*` or `System.Xml.Linq.XNode.NodesAfterSelf*`|
|preceding-sibling|`System.Xml.Linq.XNode.ElementsBeforeSelf*` or `System.Xml.Linq.XNode.NodesBeforeSelf*`|
|following|No direct equivalent.|
|preceding|No direct equivalent.|
