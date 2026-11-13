---
title: "How to retrieve a collection of elements - LINQ to XML"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/linq/retrieve-collection-elements.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# How to retrieve a collection of elements (LINQ to XML)

This article demonstrates the `System.Xml.Linq.XContainer.Elements*` method, which retrieves a collection of the child elements of an element.

## Example: Iterate through the child elements of an element

This example iterates through the child elements of the `purchaseOrder` element. It uses XML document Sample XML file: Typical purchase order.

```csharp
XElement po = XElement.Load("PurchaseOrder.xml");
IEnumerable<XElement> childElements =
    from el in po.Elements()
    select el;
foreach (XElement el in childElements)
    Console.WriteLine("Name: " + el.Name);
```

```vb
Dim po As XElement = XElement.Load("PurchaseOrder.xml")
Dim childElements As IEnumerable(Of XElement)
childElements = _
    From el In po.Elements() _
    Select el
For Each el As XElement In childElements
    Console.WriteLine("Name: " & el.Name.ToString())
Next
```

This example produces the following output:

```output
Name: Address
Name: Address
Name: DeliveryNotes
Name: Items
```

## See also

- LINQ to XML axes overview
