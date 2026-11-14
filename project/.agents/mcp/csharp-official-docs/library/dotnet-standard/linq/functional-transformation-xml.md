---
title: "Functional transformation of XML - LINQ to XML"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/linq/functional-transformation-xml.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Functional transformation of XML (LINQ to XML)

This article discusses the pure functional transformation approach to modifying XML documents, and contrasts it with a procedural approach.

## Modifying an XML document

One of the most common tasks for an XML programmer is transforming XML from one shape to another. The shape of an XML document is the structure of the document, which includes the following:

- The hierarchy expressed by the document.
- The element and attribute names.
- The data types of the elements and attributes.

In general, the most effective approach to transforming XML from one shape to another is that of pure functional transformation. In this approach, the primary programmer task is to create a transformation which is applied to the entire XML document (or to one or more strictly defined nodes). Functional transformation is arguably the easiest to code (after a programmer is familiar with the approach), yields the most maintainable code, and is often more compact than alternative approaches.

### XML functional transformational technologies

Microsoft offers two functional transformation technologies for use on XML documents: XSLT and LINQ to XML. XSLT is supported in the `System.Xml.Xsl` managed namespace and in the native COM implementation of MSXML. Although XSLT is a robust technology for manipulating XML documents, it requires expertise in a specialized domain, namely the XSLT language and its supporting APIs.

LINQ to XML provides the tools necessary to code pure functional transformations in an expressive and powerful way, within C# or Visual Basic code. For example, many of the examples in the LINQ to XML documentation use a pure functional approach. Also, in the Tutorial: Manipulating Content in a WordprocessingML Document tutorial, we use LINQ to XML in a functional approach to manipulate information in a Microsoft Word document.

For a more complete comparison of LINQ to XML with other Microsoft XML technologies, see LINQ to XML vs. other XML technologies.

XSLT is the recommended tool for  document-centric transformations when the source document has an irregular structure. However, LINQ to XML can also perform document-centric transforms. For more information, see How to use annotations to transform LINQ to XML trees in an XSLT style.

## See also

- Introduction to pure functional transformations
- Tutorial: Manipulate content in a WordprocessingML document
- LINQ to XML vs. other XML technologies
