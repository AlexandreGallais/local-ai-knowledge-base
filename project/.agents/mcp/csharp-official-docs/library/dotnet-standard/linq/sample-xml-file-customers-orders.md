---
title: "Sample XML file: Customers and orders- LINQ to XML (part 1 of 4)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/linq/sample-xml-file-customers-orders.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Sample XML file: Customers and orders (LINQ to XML)

The following XML file is used in various examples in the LINQ to XML documentation. This file contains customers and orders.

The article Sample XSD file: Customers and orders contains an XSD that can be used to validate this document. It uses the `xs:key` and `xs:keyref` features of XSD to establish that the `CustomerID` attribute of the `Customer` element is a key, and to establish a relationship between the `CustomerID` element in each `Order` element and the `CustomerID` attribute in each `Customer` element.

For an example of writing LINQ queries that take advantage of this relationship using the `Join` clause, see How to join two collections.
