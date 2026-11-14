---
title: "How to retrieve the value of an attribute - LINQ to XML"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/linq/retrieve-value-attribute.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# How to retrieve the value of an attribute (LINQ to XML)

This article shows how to obtain the value of attributes. There are two main ways: You can cast an `System.Xml.Linq.XAttribute` to the desired type; the explicit conversion operator then converts the contents of the element or attribute to the specified type. Alternatively, you can use the `System.Xml.Linq.XAttribute.Value` property. However, casting is generally the better approach. If you cast the attribute to a nullable value type, the code is simpler to write when retrieving the value of an attribute that might or might not exist. For examples of this technique, see How to retrieve the value of an element.

## Example: Use a cast to retrieve the value of an attribute

To retrieve the value of an attribute in C#, you cast the `System.Xml.Linq.XAttribute` object to your desired type. In Visual Basic, you can use the integrated attribute property to retrieve the value.

```csharp
XElement root = new XElement("Root",
                    new XAttribute("Attr", "abcde")
                );
Console.WriteLine(root);
string str = (string)root.Attribute("Attr");
Console.WriteLine(str);
```

```vb
Dim root As XElement = <Root Attr="abcde"/>
Console.WriteLine(root)
Dim str As String = root.@Attr
Console.WriteLine(str)
```

This example produces the following output:

```output
<Root Attr="abcde" />
abcde
```

## Example: Use a cast to retrieve from XML that's in a namespace

The following example shows how to retrieve the value of an attribute if the attribute is in a namespace. For more information, see Namespaces overview.

```csharp
XNamespace aw = "http://www.adventure-works.com";
XElement root = new XElement(aw + "Root",
                    new XAttribute(aw + "Attr", "abcde")
                );
string str = (string)root.Attribute(aw + "Attr");
Console.WriteLine(str);
```

```vb
Imports <xmlns:aw="http://www.adventure-works.com">

Module Module1
    Sub Main()
        Dim root As XElement = <aw:Root aw:Attr="abcde"/>
        Dim str As String = root.@aw:Attr
        Console.WriteLine(str)
    End Sub
End Module
```

This example produces the following output:

```output
abcde
```

## See also

- LINQ to XML axes overview
