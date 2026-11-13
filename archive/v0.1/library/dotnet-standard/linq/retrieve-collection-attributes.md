---
title: "How to retrieve a collection of attributes - LINQ to XML"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/linq/retrieve-collection-attributes.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# How to retrieve a collection of attributes (LINQ to XML)

This article shows the use of the `System.Xml.Linq.XElement.Attributes*` method to retrieve the attributes of an element.

## Example: Iterate through the attributes of an element

The following example shows how to iterate through the collection of attributes of an element.

```csharp
XElement val = new XElement("Value",
    new XAttribute("ID", "1243"),
    new XAttribute("Type", "int"),
    new XAttribute("ConvertableTo", "double"),
    "100");
IEnumerable<XAttribute> listOfAttributes =
    from att in val.Attributes()
    select att;
foreach (XAttribute a in listOfAttributes)
    Console.WriteLine(a);
```

```vb
Dim val = _
    <Value ID="1243" Type="int" ConvertableTo="double">100</Value>
Dim listOfAttributes As IEnumerable(Of XAttribute) = _
    From att In val.Attributes() _
    Select att
For Each att As XAttribute In listOfAttributes
    Console.WriteLine(att)
Next
```

This example produces the following output:

```output
ID="1243"
Type="int"
ConvertableTo="double"
```

## See also

- LINQ to XML axes overview
