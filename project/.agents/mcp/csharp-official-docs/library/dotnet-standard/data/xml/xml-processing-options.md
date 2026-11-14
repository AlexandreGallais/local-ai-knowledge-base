---
title: "XML Processing Options"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/data/xml/xml-processing-options.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# XML Processing Options

See the following tables for a list of Microsoft technologies you can use to process XML data.

## .NET Framework Options

|**Option**|**Processing type**|**Description**|
|----------------|-------------------------|---------------------|
|LINQ to XML (C#)  LINQ to XML (Visual Basic) (`System.Xml.Linq` namespace)|In-memory|-   Based on the .NET Framework Language-Integrated Query (LINQ) technology.-   Provides query experience that is similar to SQL for objects, relational data, and XML data.-   Provides intuitive document creation and transformation capabilities.-   Use this option if you're writing new code.|
|`System.Xml.XmlReader`|Stream-based|-   Provides a fast, non-cached, forward-only way to access XML data.-   You can create objects by using the `System.Xml.XmlReader.Create*` method, and specify the set of features to enable on the object by using the `System.Xml.XmlReaderSettings` class.|
|`System.Xml.XmlWriter`|Stream-based|-   Provides a fast, non-cached, forward-only way to generate XML data.-   You can create objects by using the `System.Xml.XmlWriter.Create*` method, and specify the set of features to enable on the object by using the `System.Xml.XmlWriterSettings` class.|
|`System.Xml.XmlDocument`|In-memory|-   Implements the W3C Document Object Model (DOM) Level 1 Core and DOM Level 2 Core recommendations.-   You can create, insert, remove, and modify nodes by using methods and properties based on the familiar DOM model.-   Use this option if you're modifying existing code that utilizes the W3C DOM.|
|`System.Xml.XPath.XPathNavigator`|In-memory|-   Offers several editing options and navigation capabilities using a cursor model.-   XML documents can be contained in an `System.Xml.XPath.XPathDocument` or `System.Xml.XmlDocument` object.-   Provides excellent performance for read-only processing of XML.-   Use this option if you're modifying existing code with XPath queries or XSLT transformations.|
|`System.Xml.Xsl.XslCompiledTransform`|In-memory|-   Provides options for transforming XML data using XSL transformations.-   The XSLT Compiler (xsltc.exe) lets you reference pre-compiled transformations in your app.|

## Win32 and COM-based Options

|**Option**|**Description**|
|----------------|---------------------|
|XmlLite|-   A fast, secure, non-caching, forward-only XML parser that helps you build high-performance XML apps.-   Works with any language that can use dynamic link libraries (DLLs); we recommend using C++.|
|MSXML|-   COM-based technology for processing XML that is included with the Windows operating system.-   Provides a native implementation of the DOM with support for XPath and XSLT.-   Contains the SAX2 event-based parser.|

## See also

- Process XML Data Using the DOM Model
- Process XML Data Using the XPath Data Model
- XSLT Compiler (xsltc.exe)
