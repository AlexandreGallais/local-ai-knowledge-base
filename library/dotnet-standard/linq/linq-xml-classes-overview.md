---
title: "LINQ to XML classes overview"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/linq/linq-xml-classes-overview.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# LINQ to XML classes overview

This article provides a list of the LINQ to XML classes in the `System.Xml.Linq` namespace, and a short description of each.

## LINQ to XML classes

### XAttribute class

`System.Xml.Linq.XAttribute` represents an XML attribute. For detailed information and examples, see XAttribute class overview.

### XCData class

`System.Xml.Linq.XCData` represents a CDATA text node.

### XComment class

`System.Xml.Linq.XComment` represents an XML comment.

### XContainer class

`System.Xml.Linq.XContainer` is an abstract base class for all nodes that can have child nodes. The following classes derive from the `System.Xml.Linq.XContainer` class:

- `System.Xml.Linq.XElement`
- `System.Xml.Linq.XDocument`

### XDeclaration class

`System.Xml.Linq.XDeclaration` represents an XML declaration. An XML declaration is used to declare the XML version and the encoding of a document. In addition, an XML declaration specifies whether the XML document is stand-alone. If a document is stand-alone, there are no external markup declarations, either in an external DTD, or in an external parameter entity referenced from the internal subset.

### XDocument class

`System.Xml.Linq.XDocument` represents an XML document. For detailed information and examples, see XDocument class overview.

### XDocumentType class

`System.Xml.Linq.XDocumentType` represents an XML Document Type Definition (DTD).

### XElement class

`System.Xml.Linq.XElement` represents an XML element. For detailed information and examples, see XElement class overview.

### XName class

`System.Xml.Linq.XName` represents names of elements (`System.Xml.Linq.XElement`) and attributes (`System.Xml.Linq.XAttribute`). For detailed information and examples, see XDocument class overview.

LINQ to XML is designed to make XML names as straightforward as possible. Due to their complexity, XML names are often considered to be an advanced article in XML. Arguably, this complexity comes not from namespaces, which developers use regularly in programming, but from namespace prefixes. Namespace prefixes can be useful to reduce the keystrokes required when you input XML, or to make XML easier to read. However, prefixes are often just a shortcut for using the full XML namespace, and aren't required in most cases. LINQ to XML simplifies XML names by resolving all prefixes to their corresponding XML namespace. Prefixes are available, if they're required, through the `System.Xml.Linq.XElement.GetPrefixOfNamespace*` method.

it's possible, if necessary, to control namespace prefixes. In some circumstances, if you're working with other XML systems, such as XSLT or XAML, you need to control namespace prefixes. For example, if you have an XPath expression that uses namespace prefixes and is embedded in an XSLT stylesheet, you must make sure that your XML document is serialized with namespace prefixes that match those used in the XPath expression.

### XNamespace class

`System.Xml.Linq.XNamespace` represents a namespace for an `System.Xml.Linq.XElement` or `System.Xml.Linq.XAttribute`. Namespaces are a component of an `System.Xml.Linq.XName`.

### XNode class

`System.Xml.Linq.XNode` is an abstract class that represents the nodes of an XML tree. The following classes derive from the `System.Xml.Linq.XNode` class:

- `System.Xml.Linq.XText`
- `System.Xml.Linq.XContainer`
- `System.Xml.Linq.XComment`
- `System.Xml.Linq.XProcessingInstruction`
- `System.Xml.Linq.XDocumentType`

### XNodeDocumentOrderComparer class

`System.Xml.Linq.XNodeDocumentOrderComparer` provides functionality to compare nodes for their document order.

### XNodeEqualityComparer class

`System.Xml.Linq.XNodeEqualityComparer` provides functionality to compare nodes for value equality.

### XObject class

`System.Xml.Linq.XObject` is an abstract base class of `System.Xml.Linq.XNode` and `System.Xml.Linq.XAttribute`. It provides annotation and event functionality.

### XObjectChange class

`System.Xml.Linq.XObjectChange` specifies the event type when an event is raised for an `System.Xml.Linq.XObject`.

### XObjectChangeEventArgs class

`System.Xml.Linq.XObjectChangeEventArgs` provides data for the `System.Xml.Linq.XObject.Changing` and `System.Xml.Linq.XObject.Changed` events.

### XProcessingInstruction class

`System.Xml.Linq.XProcessingInstruction` represents an XML processing instruction. A processing instruction communicates information to an application that processes the XML.

### XText class

`System.Xml.Linq.XText` represents a text node. In most cases, you don't have to use this class. This class is primarily used for mixed content.
