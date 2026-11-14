---
title: "System.Xml Usage"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/design-guidelines/system-xml-usage.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# System.Xml Usage

> **Note:**
> This content is reprinted by permission of Pearson Education, Inc. from *Framework Design Guidelines: Conventions, Idioms, and Patterns for Reusable .NET Libraries, 2nd Edition*. That edition was published in 2008, and the book has since been fully revised in the third edition. Some of the information on this page may be out-of-date.

This section talks about usage of several types residing in `System.Xml` namespaces that can be used to represent XML data.

 ❌ DO NOT use `System.Xml.XmlNode` or `System.Xml.XmlDocument` to represent XML data. Favor using instances of `System.Xml.XPath.IXPathNavigable`, `System.Xml.XmlReader`, `System.Xml.XmlWriter`, or subtypes of `System.Xml.Linq.XNode` instead. `XmlNode` and `XmlDocument` are not designed for exposing in public APIs.

 ✔️ DO use `XmlReader`, `IXPathNavigable`, or subtypes of `XNode` as input or output of members that accept or return XML.

 Use these abstractions instead of `XmlDocument`, `XmlNode`, or `System.Xml.XPath.XPathDocument`, because this decouples the methods from specific implementations of an in-memory XML document and allows them to work with virtual XML data sources that expose `XNode`, `XmlReader`, or `System.Xml.XPath.XPathNavigator`.

 ❌ DO NOT subclass `XmlDocument` if you want to create a type representing an XML view of an underlying object model or data source.

 *Portions © 2005, 2009 Microsoft Corporation. All rights reserved.*

 *Reprinted by permission of Pearson Education, Inc. from Framework Design Guidelines: Conventions, Idioms, and Patterns for Reusable .NET Libraries, 2nd Edition by Krzysztof Cwalina and Brad Abrams, published Oct 22, 2008 by Addison-Wesley Professional as part of the Microsoft Windows Development Series.*

## See also

- Framework Design Guidelines
- Usage Guidelines
