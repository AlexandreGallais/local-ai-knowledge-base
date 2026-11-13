---
title: "Basic Queries (LINQ to XML)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/linq/basic-queries-linq-to-xml.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Basic Queries (LINQ to XML)

This section provides examples of basic LINQ to XML queries.

## In this section

|Topic|Description|
|-----------|-----------------|
|How to find an element with a specific attribute (C#)|Shows how to find a particular element that has an attribute that has a specific value.|
|How to find an element with a specific child element (C#)|Shows how to find a particular element that has a child element that has a specific value.|
|Querying an XDocument vs. Querying an XElement (C#)|Explains the differences between writing queries on an XML tree that is rooted in `System.Xml.Linq.XElement` and writing queries on an XML tree that is rooted in `System.Xml.Linq.XDocument`.|
|How to find descendants with a specific element name (C#)|Shows how to find all the descendants of an element that have a specific name. This example uses the `System.Xml.Linq.XContainer.Descendants*` axis.|
|How to find a single descendant using the descendants method (C#)|Shows how to use the `System.Xml.Linq.XContainer.Descendants*` axis method to find a single uniquely named element.|
|How to write queries with complex filtering (C#)|Shows how to write a query with a more complex filter.|
|How to filter on an optional element (C#)|Shows how to find nodes in an irregularly shaped tree.|
|How to find all nodes in a namespace (C#)|Shows how to find all nodes that are in a specific namespace.|
|How to sort elements (C#)|Shows how to write a query that sorts its results.|
|How to sort elements on multiple keys (C#)|Shows how to sort on multiple keys.|
|How to calculate intermediate values (C#)|Shows how to use the `Let` clause to calculate intermediate values in a LINQ to XML query.|
|How to write a query that finds elements based on context (C#)|Shows how to select elements based on other elements in the tree.|
|How to debug empty query results sets (C#)|Shows the appropriate fix when debugging queries on XML that is in a default namespace.|

## See also

- Querying XML Trees
