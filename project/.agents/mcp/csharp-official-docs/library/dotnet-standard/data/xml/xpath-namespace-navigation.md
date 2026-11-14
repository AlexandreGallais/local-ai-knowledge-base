---
title: "XPath Namespace Navigation"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/data/xml/xpath-namespace-navigation.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# XPath Namespace Navigation

To use XPath queries with XML documents, you have to correctly address XML namespaces and the elements contained by namespaces. Namespaces prevent ambiguities that can occur when names are used in more than one context; for example, the name `ID` may refer to more than one identifier associated with different elements of an XML document. Namespace syntax specifies URIs, names, and prefixes that distinguish the elements of an XML document.

 The example in this topic demonstrates the use of prefixes in navigating an XML document with `System.Xml.XPath.XPathNavigator`. For more information about namespaces and syntax, see XML Files: Understanding XML Namespaces.

## Namespace Declarations

 Namespace declarations make the elements of an XML document distinguishable and addressable when using an instance of `System.Xml.XPath.XPathNavigator`. Namespace prefixes provide a brief syntax for addressing namespaces.

 Prefixes are defined by the form: `<e:Envelope xmlns:e=http://schemas.xmlsoap.org/soap/envelope/>.` In this syntax the prefix "`e`" is an abbreviation for the formal URI of the namespace. You can identify the `Body` element as a member of the `Envelope` namespace by using the syntax: `e:Body`.

 The following XML document will be referenced as `response.xml` in the navigation example in the next section.

```xml
<?xml version="1.0" encoding="utf-8" ?>
<e:Envelope xmlns:e="http://schemas.xmlsoap.org/soap/envelope/">
  <e:Body>
    <s:Search xmlns:s="http://schemas.microsoft.com/v1/Search">
      <r:request xmlns:r="http://schemas.microsoft.com/v1/Search/metadata"
                 xmlns:i="http://www.w3.org/2001/XMLSchema-instance">
      </r:request>
    </s:Search>
  </e:Body>
</e:Envelope>
```

## Navigation by Namespace Prefix

 The code in this section uses `System.Xml.XPath.XPathNavigator` and `System.Xml.XmlNamespaceManager` objects to select the `Search` element from the XML document in the previous section. The query `xpath` includes namespace prefixes on each element in the path. Specifying the precise identity of the namespaces that contain each element assures correct navigation to the `Search` element by the `System.Xml.XPath.XPathNavigator.SelectSingleNode*` method.

```csharp
using (XmlReader reader = XmlReader.Create("response.xml"))
{
    XPathDocument doc = new XPathDocument(reader);
    XPathNavigator nav = doc.CreateNavigator();

    XmlNamespaceManager nsmgr = new XmlNamespaceManager(nav.NameTable);
    nsmgr.AddNamespace("e", @"http://schemas.xmlsoap.org/soap/envelope/");
    nsmgr.AddNamespace("s", @"http://schemas.microsoft.com/v1/Search");
    nsmgr.AddNamespace("r", @"http://schemas.microsoft.com/v1/Search/metadata");
    nsmgr.AddNamespace("i", @"http://www.w3.org/2001/XMLSchema-instance");

    string xpath = "/e:Envelope/e:Body/s:Search";

    XPathNavigator element = nav.SelectSingleNode(xpath, nsmgr);

    Console.WriteLine("Element Prefix:" + element.Prefix +
    " Local name:" + element.LocalName);
    Console.WriteLine("Namespace URI: " + element.NamespaceURI);
}
```

 The precision of fully qualifying namespaces and names is more than a convenience. A little experimentation with the document definition and code in the previous examples will verify that navigation without fully qualified element names throws exceptions. For example, the element definition: `<Search xmlns="http://schemas.microsoft.com/v1/Search">`, and query: string `xpath = "/s:Envelope/s:Body/Search";` without the namespace prefix on the `Search` element returns `null` instead of the `Search` element.

## See also

- Accessing XML Data using XPathNavigator
- Selecting, Evaluating and Matching XML Data using XPathNavigator
