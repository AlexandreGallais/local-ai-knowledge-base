---
title: "Processing XML Data In-Memory"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/data/xml/processing-xml-data-in-memory.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Processing XML Data In-Memory

The Microsoft .NET Framework includes three models for processing XML data: the `System.Xml.XmlDocument` class, the `System.Xml.XPath.XPathDocument` class, and LINQ to XML (C#) and LINQ to XML (Visual Basic).

 The `System.Xml.XmlDocument` class implements the W3C document object model (DOM) level 1 core and the core DOM level 2 recommendations. The DOM is an in-memory (cache) tree representation of an XML document. With the `System.Xml.XmlDocument` and its related classes, you can construct XML documents, load and access data, modify data, and save changes.

 The `System.Xml.XPath.XPathDocument` class is a read-only, in-memory data store that is based on the XPath data model. The `System.Xml.XPath.XPathNavigator` class offers several editing options and navigation capabilities using a cursor model over XML documents contained in the read-only `System.Xml.XPath.XPathDocument` class as well as the `System.Xml.XmlDocument` class.

 LINQ to XML is a model introduced in the .NET Framework version 3.5 for processing XML data. It's an in-memory model that leverages Language-Integrated Query (LINQ). LINQ extends the language syntax of C# and Visual Basic to provide new query capabilities.

## In This Section

 Process XML Data Using the DOM Model
 Discusses using the `System.Xml.XmlDocument`, and its related classes to process XML data.

 Process XML Data Using the XPath Data Model
 Discusses using the `System.Xml.XPath.XPathDocument`, `System.Xml.XmlDocument`, and `System.Xml.XPath.XPathNavigator` classes to process XML data.

 Process XML Data Using LINQ to XML
 Provides a brief overview of LINQ to XML and provides links to the LINQ to XML documentation.

## Related Sections

 XML Documents and Data
