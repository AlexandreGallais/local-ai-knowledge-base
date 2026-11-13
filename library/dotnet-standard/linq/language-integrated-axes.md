---
title: "Language-integrated axes in Visual Basic - LINQ to XML"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/linq/language-integrated-axes.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Language-integrated axes in Visual Basic (LINQ to XML)

Axis features are integrated into Visual Basic, making it easy to access XML. Many of the examples in the LINQ to XML documentation use these features, which are described in the articles listed in this table:

|Article|Description|
|-----------|-----------------|
|XML Child Axis Property|Provides access to the children of one of the following: an `System.Xml.Linq.XElement` object, an `System.Xml.Linq.XDocument` object, a collection of `System.Xml.Linq.XElement` objects, or a collection of `System.Xml.Linq.XDocument` objects. This axis is equivalent to the `System.Xml.Linq.XContainer.Elements*` axis.|
|XML Descendant Axis Property|Provides access to the descendants of the following: an `System.Xml.Linq.XElement` object, an `System.Xml.Linq.XDocument` object, or a collection of `System.Xml.Linq.XElement` objects. This axis is equivalent to the `System.Xml.Linq.XContainer.Descendants*` axis.|
|XML Attribute Axis Property|Provides access to an attribute of an `System.Xml.Linq.XElement` object. This axis is roughly equivalent to the `System.Xml.Linq.XElement.Attribute*` axis. This axis differs from the `System.Xml.Linq.XElement.Attribute*` axis in that it returns the value of the attribute, not an `System.Xml.Linq.XAttribute` object.|
|Extension Indexer Property|Provides access to individual elements in a collection.|

## See also

- LINQ to XML axes overview
