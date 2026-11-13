---
title: "Modify XML Data using XPathNavigator (part 7 of 7)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/data/xml/modify-xml-data-using-xpathnavigator.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Modify XML Data using XPathNavigator (part 7 of 7)

## InnerXml and OuterXml Properties

 The `System.Xml.XPath.XPathNavigator.InnerXml*` and `System.Xml.XPath.XPathNavigator.OuterXml` properties of the `System.Xml.XPath.XPathNavigator` class change the XML markup of the nodes an `System.Xml.XPath.XPathNavigator` object is currently positioned on.

 The `System.Xml.XPath.XPathNavigator.InnerXml` property changes the XML markup of the child nodes an `System.Xml.XPath.XPathNavigator` object is currently positioned on with the parsed contents of the given XML `string`. Similarly, the `System.Xml.XPath.XPathNavigator.OuterXml` property changes the XML markup of the child nodes an `System.Xml.XPath.XPathNavigator` object is currently positioned on as well as the current node itself.

 The following example uses the `System.Xml.XPath.XPathNavigator.OuterXml` property to modify the value of the `price` element and insert a new `discount` attribute on the first `book` element in the `contosoBooks.xml` file.

```vb
Dim document As XmlDocument = New XmlDocument()
document.Load("contosoBooks.xml");
Dim navigator As XPathNavigator = document.CreateNavigator()

navigator.MoveToChild("bookstore", "http://www.contoso.com/books")
navigator.MoveToChild("book", "http://www.contoso.com/books")
navigator.MoveToChild("price", "http://www.contoso.com/books")

navigator.OuterXml = "<price discount=\"0\">10.99</price>"

navigator.MoveToRoot()
Console.WriteLine(navigator.OuterXml)
```

```csharp
XmlDocument document = new XmlDocument();
document.Load("contosoBooks.xml");
XPathNavigator navigator = document.CreateNavigator();

navigator.MoveToChild("bookstore", "http://www.contoso.com/books");
navigator.MoveToChild("book", "http://www.contoso.com/books");
navigator.MoveToChild("price", "http://www.contoso.com/books");

navigator.OuterXml = "<price discount=\"0\">10.99</price>";

navigator.MoveToRoot();
Console.WriteLine(navigator.OuterXml);
```

 The example takes the `contosoBooks.xml` file as an input.

 _Code sample not included: ../../../../samples/snippets/xml/VS_Snippets_Data/XPathXMLExamples/XML/contosoBooks.xml._

## Modifying Namespace Nodes

 In the Document Object Model (DOM), namespace declarations are treated as if they are regular attributes that can be inserted, updated and deleted. The `System.Xml.XPath.XPathNavigator` class does not allow such operations on namespace nodes because altering the value of a namespace node can change the identity of the elements and attributes within the scope of the namespace node as illustrated in the following example.

```xml
<root xmlns="http://www.contoso.com">
    <child />
</root>
```

 If the XML example above is changed in the following way, this effectively renames every element in the document because the value of each element's namespace URI is changed.

```xml
<root xmlns="urn:contoso.com">
    <child />
</root>
```

 Inserting namespace nodes that do not conflict with namespace declarations at the scope that they are inserted in is allowed by the `System.Xml.XPath.XPathNavigator` class. In this case, the namespace declarations are not declared at lower scopes in the XML document and does not result in renaming as illustrated in the following example.

```xml
<root xmlns:a="http://www.contoso.com">
    <parent>
        <a:child />
    </parent>
</root>
```

 If the XML example above is changed in the following way, the namespace declarations are correctly propagated across the XML document below the scope of the other namespace declaration.

```xml
<root xmlns:a="http://www.contoso.com">
    <parent a:parent-id="1234" xmlns:a="http://www.contoso.com/parent-id">
        <a:child xmlns:a="http://www.contoso.com/" />
    </parent>
</root>
```

 In the XML example above, the attribute `a:parent-id` is inserted on the `parent` element in the `http://www.contoso.com/parent-id` namespace. The `System.Xml.XPath.XPathNavigator.CreateAttribute*` method is used to insert the attribute while positioned on the `parent` element. The `http://www.contoso.com` namespace declaration is automatically inserted by the `System.Xml.XPath.XPathNavigator` class to preserve the consistency of the rest of the XML document.

## Modifying Entity Reference Nodes

 Entity reference nodes in an `System.Xml.XmlDocument` object are read-only and cannot be edited using either the `System.Xml.XPath.XPathNavigator` or `System.Xml.XmlNode` classes. Any attempt to modify an entity reference node results in an `System.InvalidOperationException`.

## Modifying xsi:nil Nodes

 The W3C XML Schema recommendation introduces the concept of an element being nillable. When an element is nillable, it is possible for the element to have no content and still be valid. The concept of an element being nillable is similar to the concept of an object being `null`. The main difference is that a `null` object cannot be accessed in any way, while an `xsi:nil` element still has properties such as attributes that can be accessed, but has no content (child elements or text). The existence of the `xsi:nil` attribute with a value of `true` on an element in an XML document is used to indicate that an element has no content.

 If an `System.Xml.XPath.XPathNavigator` object is used to add content to a valid element with an `xsi:nil` attribute with a value of `true`, the value of its `xsi:nil` attribute is set to `false`.

> **Note:**
> If the content of an element with an `xsi:nil` attribute set to `false` is deleted, the value of the attribute is not changed to `true`.

## Saving an XML Document

 Saving changes made to an `System.Xml.XmlDocument` object as the result of the editing methods described in this topic is performed using the methods of the `System.Xml.XmlDocument` class. For more information about saving changes made to an `System.Xml.XmlDocument` object, see Saving and Writing a Document.

## See also

- `System.Xml.XmlDocument`
- `System.Xml.XPath.XPathDocument`
- `System.Xml.XPath.XPathNavigator`
- Process XML Data Using the XPath Data Model
- Insert XML Data using XPathNavigator
- Remove XML Data using XPathNavigator
