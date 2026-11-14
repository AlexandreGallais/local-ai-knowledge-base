---
title: "User Defined Functions and Variables (part 1 of 5)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/data/xml/user-defined-functions-and-variables.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# User Defined Functions and Variables

The `System.Xml.XPath.XPathNavigator` class provides a set of methods that are used to interact with `System.Xml.XPath.XPathDocument` data. You can supplement the standard XPath functions by implementing extension functions and variables for use by XPath query expressions. The `System.Xml.XPath.XPathExpression.SetContext*` method can accept a user defined context derived from `System.Xml.Xsl.XsltContext`. User defined functions are resolved by the custom context.

 Extension functions and variables can be useful in prevention of XML injection attacks. In these scenarios user input is assigned to custom variables and processed by extension functions, not as raw input concatenated with processing instructions. Extension functions and variables contain user input so that it only acts on XML data as intended by the designer.

 To use extensions you implement a custom `System.Xml.Xsl.XsltContext` class along with the interfaces `System.Xml.Xsl.IXsltContextFunction` and `System.Xml.Xsl.IXsltContextVariable` that support extension functions and variables. An `System.Xml.XPath.XPathExpression` adds user input with its `System.Xml.Xsl.XsltArgumentList` to the custom `System.Xml.Xsl.XsltContext`.

 The `System.Xml.XPath.XPathExpression` represents a compiled query that `System.Xml.XPath.XPathNavigator` uses to find and process the nodes identified by the expression.

 The following example shows implementation of a custom context class derived from `System.Xml.Xsl.XsltContext`. Comments in the code describe class members and their use in custom functions. Function and variable implementations and a sample application that uses these implementations follow this code segment.
