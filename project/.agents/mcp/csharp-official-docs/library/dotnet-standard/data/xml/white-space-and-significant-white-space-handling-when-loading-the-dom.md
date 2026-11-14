---
title: "White Space and Significant White Space Handling when Loading the DOM"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/data/xml/white-space-and-significant-white-space-handling-when-loading-the-dom.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# White Space and Significant White Space Handling when Loading the DOM

When loading the document, you can set the option to preserve white space and create **XmlWhitespace** nodes in the document tree. To create white space nodes, set the **PreserveWhitespace** property to true. If the property is set to **false**, which is the default, white space nodes are not created. Significant white spaces nodes are always preserved, and **XmlSignificantWhitespace** nodes are always created in memory to represent this data, regardless of the setting of the **PreserveWhitespace** flag.

 If the document is loaded from a reader, then setting of the **PreserveWhitespace** flag property on the **XmlDocument** class affects the creation of **XmlWhitespace** nodes only when the **WhitespaceHandling** property on the **XmlTextReader** is not set to **WhitespaceHandling.None**. It is the value of the **WhitespaceHandling** property on the reader that takes precedence over the setting of that flag on the **XmlDocument**. For more information on **XmlSignificantWhitespace**, see `System.Xml.XmlSignificantWhitespace`.

## See also

- XML Document Object Model (DOM)
