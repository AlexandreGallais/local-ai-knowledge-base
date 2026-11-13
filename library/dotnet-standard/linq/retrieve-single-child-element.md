---
title: "How to retrieve a single child element - LINQ to XML"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/linq/retrieve-single-child-element.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# How to retrieve a single child element (LINQ to XML)

This article explains how to retrieve a single child element, the first child element that has a specified name. In C# you do this with the `System.Xml.Linq.XContainer.Element*` method. In Visual Basic you do it with array indexer notation.

## Example: Retrieve the first element that has a specified name

The following example retrieves the first `DeliveryNotes` element from the XML document in Sample XML file: Typical purchase order.

```csharp
XElement po = XElement.Load("PurchaseOrder.xml");
XElement e = po.Element("DeliveryNotes");
Console.WriteLine(e);
```

```vb
Dim po As XElement = XElement.Load("PurchaseOrder.xml")
Dim e As XElement = po.<DeliveryNotes>(0)
Console.WriteLine(e)
```

This example produces the following output:

```xml
<DeliveryNotes>Please leave packages in shed by driveway.</DeliveryNotes>
```

## Example: Retrieve from XML that's in a namespace

The following example does the same thing as the one above, but for XML that's in a namespace. It uses the XML document Sample XML file: Typical purchase order in a namespace. For more information about namespaces, see Namespaces overview.

```csharp
XElement po = XElement.Load("PurchaseOrderInNamespace.xml");
XNamespace aw = "http://www.adventure-works.com";
XElement e = po.Element(aw + "DeliveryNotes");
Console.WriteLine(e);
```

```vb
Imports <xmlns:aw="http://www.adventure-works.com">

Module Module1
    Sub Main()
        Dim po As XElement = XElement.Load("PurchaseOrderInNamespace.xml")
        Dim e As XElement = po.<aw:DeliveryNotes>(0)
        Console.WriteLine(e)
    End Sub
End Module
```

This example produces the following output:

```xml
<aw:DeliveryNotes xmlns:aw="http://www.adventure-works.com">Please leave packages in shed by driveway.</aw:DeliveryNotes>
```

## See also

- LINQ to XML axes overview
