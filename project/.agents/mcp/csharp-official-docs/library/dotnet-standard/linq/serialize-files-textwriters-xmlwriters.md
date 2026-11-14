---
title: "Serialize to files, TextWriters, and XmlWriters - LINQ to XML"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/linq/serialize-files-textwriters-xmlwriters.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Serialize to files, TextWriters, and XmlWriters (LINQ to XML)

You can serialize XML trees to a `System.IO.File`, a `System.IO.TextWriter`, or an `System.Xml.XmlWriter`.

You can serialize any XML component, including `System.Xml.Linq.XDocument` and `System.Xml.Linq.XElement`, to a string by using the `ToString` method.

If you want to suppress formatting when serializing to a string, you can use the `System.Xml.Linq.XNode.ToString*` method.

The default behavior when serializing to a file is to format (indent) the resulting XML document. When you indent, the insignificant white space in the XML tree isn't preserved. To serialize with formatting, use one of the overloads of the following methods that don't take `System.Xml.Linq.SaveOptions` as an argument:

- `System.Xml.Linq.XDocument.Save*`
- `System.Xml.Linq.XElement.Save*`

If you want the option not to indent and to preserve the insignificant white space in the XML tree, use one of the overloads of the following methods that takes `System.Xml.Linq.SaveOptions` as an argument:

- `System.Xml.Linq.XDocument.Save*`
- `System.Xml.Linq.XElement.Save*`

For examples, see the appropriate reference article.
