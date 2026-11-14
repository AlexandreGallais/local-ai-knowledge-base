---
title: "XSLT Transformations"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/data/xml/xslt-transformations.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# XSLT Transformations

The Extensible Stylesheet Language Transformation (XSLT) lets you transform the content of a source XML document into another document that is different in format or structure. For example, you can use XSLT to transform XML into HTML for use on a Web site or to transform it into a document that contains only the fields required by an application. This transformation process is specified by the W3C XSL Transformations (XSLT) Version 1.0 recommendation.

 The `System.Xml.Xsl.XslCompiledTransform` class is the XSLT processor in .NET. The `System.Xml.Xsl.XslCompiledTransform` class supports the W3C XSLT 1.0 recommendation.

> **Note:**
> The `System.Xml.Xsl.XslTransform` class is obsolete in .NET Framework version 2.0. The `System.Xml.Xsl.XslCompiledTransform` class is a new implementation of the XSLT engine. It includes performance improvements and new security features. The recommended practice is to create XSLT applications using the `System.Xml.Xsl.XslCompiledTransform` class.

## In This Section

 Using the XslCompiledTransform Class
 Provides information on using the `System.Xml.Xsl.XslCompiledTransform` class.

 Migrating From the XslTransform Class
 Discusses how to migrate code from the `System.Xml.Xsl.XslTransform` class.

 XSLT Compiler (xsltc.exe)
 Provides information on using the XSLT compiler.

 XSLT Transformations with the XslTransform Class
 Provides information on using the `System.Xml.Xsl.XslTransform` class.

## Reference

 `System.Xml.Xsl.XslCompiledTransform`
 `System.Xml.Xsl.XsltArgumentList`
 `System.Xml.Xsl.XsltSettings`

## Related Sections

 XML Documents and Data
