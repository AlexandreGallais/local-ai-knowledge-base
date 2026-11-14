---
title: "XElement class overview"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/linq/xelement-class-overview.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# XElement class overview

The `System.Xml.Linq.XElement` class is one of the fundamental classes in LINQ to XML. It represents an XML element. The following list shows what you can use this class for:

- Create elements.
- Change the content of the element.
- Add, change, or delete child elements.
- Add attributes to an element.
- Serialize the contents of an element in text form.

You can also interoperate with other classes in `System.Xml`, such as `System.Xml.XmlReader`, `System.Xml.XmlWriter`, and `System.Xml.Xsl.XslCompiledTransform`.

This article describes the functionality provided by the `System.Xml.Linq.XElement` class.

## Construct XML trees

You can construct XML trees in different ways, including the following:

- You can construct an XML tree in code. For more information, see XML trees.
- You can parse XML from various sources, including a `System.IO.TextReader`, text files, or a Web address (URL). For more information, see Parse XML.
- You can use an `System.Xml.XmlReader` to populate the tree. For more information, see `System.Xml.Linq.XNode.ReadFrom*`.
- If you have a module that can write content to an `System.Xml.XmlWriter`, you can use the `System.Xml.Linq.XContainer.CreateWriter*` method to create a writer, pass the writer to the module, and then use the content that's written to the `System.Xml.XmlWriter` to populate the XML tree.

The following example creates a tree. The C# version uses nested element creations. You can use the same technique in Visual Basic, but this example uses XML literals.

```csharp
XElement contacts =
    new XElement("Contacts",
        new XElement("Contact",
            new XElement("Name", "Patrick Hines"),
            new XElement("Phone", "206-555-0144"),
            new XElement("Address",
                new XElement("Street1", "123 Main St"),
                new XElement("City", "Mercer Island"),
                new XElement("State", "WA"),
                new XElement("Postal", "68042")
            )
        )
    );
```

```vb
Dim contacts As XElement = _
    <Contacts>
        <Contact>
            <Name>Patrick Hines</Name>
            <Phone>206-555-0144</Phone>
            <Address>
                <Street1>123 Main St</Street1>
                <City>Mercer Island</City>
                <State>WA</State>
                <Postal>68042</Postal>
            </Address>
        </Contact>
    </Contacts>
```

You can also use a LINQ to XML query to populate an XML tree, as shown in the following example:

```csharp
XElement srcTree = new XElement("Root",
    new XElement("Element", 1),
    new XElement("Element", 2),
    new XElement("Element", 3),
    new XElement("Element", 4),
    new XElement("Element", 5)
);
XElement xmlTree = new XElement("Root",
    new XElement("Child", 1),
    new XElement("Child", 2),
    from el in srcTree.Elements()
    where (int)el > 2
    select el
);
Console.WriteLine(xmlTree);
```

```vb
Dim srcTree As XElement = _
    <Root>
        <Element>1</Element>
        <Element>2</Element>
        <Element>3</Element>
        <Element>4</Element>
        <Element>5</Element>
    </Root>
Dim xmlTree As XElement = _
    <Root>
        <Child>1</Child>
        <Child>2</Child>
        <%= From el In srcTree.Elements() _
            Where el.Value > 2 _
            Select el %>
    </Root>
Console.WriteLine(xmlTree)
```

This example produces the following output:

```xml
<Root>
  <Child>1</Child>
  <Child>2</Child>
  <Element>3</Element>
  <Element>4</Element>
  <Element>5</Element>
</Root>
```

## Serialize XML trees

You can serialize the XML tree to a `System.IO.File`, a `System.IO.TextWriter`, or an `System.Xml.XmlWriter`.

For more information, see Serialize XML trees.

## Retrieve XML data via axis methods

You can use axis methods to retrieve attributes, child elements, descendant elements, and ancestor elements. LINQ to XML queries operate on axis methods, and provide several flexible and powerful ways to navigate through and process an XML tree.

For more information, see LINQ to XML axes overview.

## Query XML trees

You can write LINQ to XML queries that extract data from an XML tree.

For more information, see Query XML trees overview.

## Modify XML trees

You can modify an element in different ways, including changing its content or attributes. You can also remove an element from its parent.

For more information, see Modify XML trees.

## See also

- LINQ to XML programming overview
