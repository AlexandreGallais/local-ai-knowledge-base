---
title: "Process XML Data Using the XPath Data Model"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/data/xml/process-xml-data-using-the-xpath-data-model.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Process XML Data Using the XPath Data Model

The `System.Xml` namespace provides a programmatic representation of XML documents, fragments, nodes, or node-sets in-memory, using the `System.Xml.XmlDocument` or `System.Xml.XPath.XPathDocument` classes.

 The `System.Xml.XPath.XPathDocument` class provides a fast, read-only, in-memory representation of an XML document using the XPath data model. The `System.Xml.XmlDocument` class provides an editable in-memory representation of an XML document implementing W3C Document Object Model (DOM) Level 1 Core and Core DOM Level 2. Both classes implement the `System.Xml.XPath.IXPathNavigable` interface and return an `System.Xml.XPath.XPathNavigator` object used to select, evaluate, navigate, and in some cases, edit the underlying XML data.

 The following sections describe the functionality of the `System.Xml.XPath.XPathNavigator` class based on the class that returns it.

## In This Section

 Reading XML Data using XPathDocument and XmlDocument
 Describes how to create a read-only `System.Xml.XPath.XPathDocument` class object to read an XML document and how to create an editable `System.Xml.XmlDocument` class object to read and edit an XML document. This topic also describes how return an `System.Xml.XPath.XPathNavigator` object from each class to navigate and edit an XML document.

 Selecting, Evaluating and Matching XML Data using XPathNavigator
 Describes the methods of the `System.Xml.XPath.XPathNavigator` class used to select nodes in an `System.Xml.XPath.XPathDocument` or `System.Xml.XmlDocument` object using an XPath query, evaluate and examine the results of an XPath expression, and determine if a node in an XML document matches a given XPath expression.

 Accessing XML Data using XPathNavigator
 Describes the methods of the `System.Xml.XPath.XPathNavigator` class used to navigate nodes, extract XML data and access strongly typed XML data in an `System.Xml.XPath.XPathDocument` or `System.Xml.XmlDocument` object.

 Editing XML Data using XPathNavigator
 Describes the methods of the `System.Xml.XPath.XPathNavigator` class used to insert, modify and remove nodes and values from an XML document contained in an `System.Xml.XmlDocument` object.

 Schema Validation using XPathNavigator
 Describes the ways to validate the XML content contained in an `System.Xml.XPath.XPathDocument` or `System.Xml.XmlDocument` object.

## See also

- `System.Xml.XmlDocument`
- `System.Xml.XPath.XPathDocument`
- `System.Xml.XPath.XPathNavigator`
- Process XML Data Using the DOM Model
