---
title: "XML Documents and Data"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/data/xml/index.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# XML Documents and Data

.NET provides a comprehensive and integrated set of classes that enable you to build XML-aware apps easily. The classes in the following namespaces support parsing and writing XML, editing XML data in memory, data validation, and XSLT transformation.

- `System.Xml`

- `System.Xml.XPath`

- `System.Xml.Xsl`

- `System.Xml.Schema`

- `System.Xml.Linq`

For a full list, search for "System.Xml" on the .NET API browser.

The classes in these namespaces support World Wide Web Consortium (W3C) recommendations. For example:

- The `System.Xml.XmlDocument` class implements the W3C Document Object Model (DOM) Level 1 Core and DOM Level 2 Core recommendations.

- The `System.Xml.XmlReader` and `System.Xml.XmlWriter` classes support the W3C XML 1.0 and the Namespaces in XML recommendations.

- Schemas in the `System.Xml.Schema.XmlSchemaSet` class support the W3C XML Schema Part 1: Structures and XML Schema Part 2: Datatypes recommendations.

- Classes in the `System.Xml.Xsl` namespace support XSLT transformations that conform to the W3C XSLT 1.0 recommendation.

The XML classes in the .NET Framework provide these benefits:

- **Productivity.** LINQ to XML (C#) and LINQ to XML (Visual Basic) makes it easier to program with XML and provides a query experience that is similar to SQL.

- **Extensibility.** The XML classes in the .NET Framework are extensible through the use of abstract base classes and virtual methods. For example, you can create a derived class of the `System.Xml.XmlUrlResolver` class that stores the cache stream to the local disk.

- **Pluggable architecture.** The .NET Framework provides an architecture in which components can utilize one another, and data can be streamed between components. For example, a data store, such as an `System.Xml.XPath.XPathDocument` or `System.Xml.XmlDocument` object, can be transformed with the `System.Xml.Xsl.XslCompiledTransform` class, and the output can then be streamed either into another store or returned as a stream from a web service.

- **Performance.** For better app performance, some of the XML classes in the .NET Framework support a streaming-based model with the following characteristics:

  - Minimal caching for forward-only, pull-model parsing (`System.Xml.XmlReader`).

  - Forward-only validation (`System.Xml.XmlReader`).

  - Cursor style navigation that minimizes node creation to a single virtual node while providing random access to the document (`System.Xml.XPath.XPathNavigator`).

  For better performance whenever XSLT processing is required, you can use the `System.Xml.XPath.XPathDocument` class, which is an optimized, read-only store for XPath queries designed to work efficiently with the `System.Xml.Xsl.XslCompiledTransform` class.

- **Integration with ADO.NET.** The XML classes and ADO.NET are tightly integrated to bring together relational data and XML. The `System.Data.DataSet` class is an in-memory cache of data retrieved from a database. The `System.Data.DataSet` class has the ability to read and write XML by using the `System.Xml.XmlReader` and `System.Xml.XmlWriter` classes, to persist its internal relational schema structure as XML schemas (XSD), and to infer the schema structure of an XML document.

## In This Section

XML Processing Options
Discusses options for processing XML data.

Processing XML Data In-Memory
Discusses the three models for processing XML data in-memory: LINQ to XML (C#) and LINQ to XML (Visual Basic), the `System.Xml.XmlDocument` class (based on the W3C Document Object Model), and the `System.Xml.XPath.XPathDocument` class (based on the XPath data model).

XSLT Transformations\
Describes how to use the XSLT processor.

XML Schema Object Model (SOM)\
Describes the classes used for building and manipulating XML Schemas (XSD) by providing an `System.Xml.Schema.XmlSchema` class to load and edit a schema.

XML Integration with Relational Data and ADO.NET\
Describes how the .NET Framework enables real-time, synchronous access to both the relational and hierarchical representations of data through the `System.Data.DataSet` object and the `System.Xml.XmlDataDocument` object.

Managing Namespaces in an XML Document\
Describes how the `System.Xml.XmlNamespaceManager` class is used to store and maintain namespace information.

Type Support in the System.Xml Classes\
Describes how XML data types map to CLR types, how to convert XML data types, and other type support features in the `System.Xml` classes.

## Related Sections

ADO.NET\
Provides information on how to access data using ADO.NET.

Security\
Provides an overview of the .NET Framework security system.
