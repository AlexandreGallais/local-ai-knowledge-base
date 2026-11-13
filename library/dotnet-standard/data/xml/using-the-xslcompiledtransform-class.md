---
title: "Using the XslCompiledTransform Class"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/data/xml/using-the-xslcompiledtransform-class.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Using the XslCompiledTransform Class

The `System.Xml.Xsl.XslCompiledTransform` class is the Microsoft .NET Framework XSLT processor. This class is used to compile style sheets and execute XSLT transformations.

> **Note:**
> Although the overall performance of the `System.Xml.Xsl.XslCompiledTransform` class is better than the `System.Xml.Xsl.XslTransform` class, the `System.Xml.Xsl.XslCompiledTransform.Load*` method of the `System.Xml.Xsl.XslCompiledTransform` class might perform more slowly than the `System.Xml.Xsl.XslTransform.Load*` method of the `System.Xml.Xsl.XslTransform` class the first time it is called on a transformation. This is because the XSLT file must be compiled before it is loaded. For more information, see the following blog post: XslCompiledTransform Slower than XslTransform?

## In This Section

 Inputs to the XslCompiledTransform Class
 Describes the available XSLT input options.

 Output Options on the XslCompiledTransform Class
 Describes the available XSLT output options.

 Resolving External Resources During XSLT Processing
 Discusses using the `System.Xml.XmlResolver` class to resolve external resources.

 Extending XSLT Style Sheets
 Discusses how XSLT extensions are supported.

| Article | Description |
|-|-|
|Recoverable XSLT Errors|Lists discretionary behaviors allowed by the World Wide Web Consortium (W3C) XSLT 1.0 recommendation and describes how these behaviors are handled by the `System.Xml.Xsl.XslCompiledTransform` class.|
|How to: Transform a Node Fragment|Describes how to transform a node fragment.|

## Related Sections

 Migrating From the XslTransform Class
 Discusses how to migrate code from the `System.Xml.Xsl.XslTransform` class

## See also

- `System.Xml.Xsl.XsltSettings`
- `System.Xml.Xsl.XsltMessageEncounteredEventArgs`
