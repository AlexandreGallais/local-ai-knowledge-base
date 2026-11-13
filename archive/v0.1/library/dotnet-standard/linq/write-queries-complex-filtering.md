---
title: "How to write queries with complex filtering - LINQ to XML"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/linq/write-queries-complex-filtering.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# How to write queries with complex filtering (LINQ to XML)

Sometimes you want to write LINQ to XML queries with complex filters. For example, you might have to find all elements that have a child element with a particular name and value. This article gives an example of writing a query with complex filtering.

## Example: Find with a nested query in the `Where` clause

This example shows how to find all `PurchaseOrder` elements that have:

- A child `Address` element whose `Type` attribute equals "Shipping".
- A child `State` element that equals "NY".

It uses a nested query in the `Where` clause, and the `Any` operator returns `true` if the collection has any elements in it. The example uses XML document Sample XML file: Multiple purchase orders.

For more information about the `Any` operator, see Quantifier Operations (C#) and Quantifier Operations (Visual Basic).

```csharp
XElement root = XElement.Load("PurchaseOrders.xml");
IEnumerable<XElement> purchaseOrders =
    from el in root.Elements("PurchaseOrder")
    where
        (from add in el.Elements("Address")
        where
            (string)add.Attribute("Type") == "Shipping" &&
            (string)add.Element("State") == "NY"
        select add)
        .Any()
    select el;
foreach (XElement el in purchaseOrders)
    Console.WriteLine((string)el.Attribute("PurchaseOrderNumber"));
```

```vb
Dim root As XElement = XElement.Load("PurchaseOrders.xml")
Dim purchaseOrders As IEnumerable(Of XElement) = _
    From el In root.<PurchaseOrder> _
    Where _
        (From add In el.<Address> _
        Where _
             add.@Type = "Shipping" And _
             add.<State>.Value = "NY" _
        Select add) _
    .Any() _
    Select el
For Each el As XElement In purchaseOrders
    Console.WriteLine(el.@PurchaseOrderNumber)
Next
```

This example produces the following output:

```output
99505
```

## Example: Find in XML that's in a namespace

The following example shows the same query as above, but for XML that's in a namespace. For more information, see Namespaces overview.

This example uses XML document Sample XML file: Multiple purchase orders in a namespace.

```csharp
XElement root = XElement.Load("PurchaseOrdersInNamespace.xml");
XNamespace aw = "http://www.adventure-works.com";
IEnumerable<XElement> purchaseOrders =
    from el in root.Elements(aw + "PurchaseOrder")
    where
        (from add in el.Elements(aw + "Address")
         where
             (string)add.Attribute(aw + "Type") == "Shipping" &&
             (string)add.Element(aw + "State") == "NY"
         select add)
        .Any()
    select el;
foreach (XElement el in purchaseOrders)
    Console.WriteLine((string)el.Attribute(aw + "PurchaseOrderNumber"));
```

```vb
Imports <xmlns:aw='http://www.adventure-works.com'>

Module Module1
    Sub Main()
        Dim root As XElement = XElement.Load("PurchaseOrdersInNamespace.xml")
        Dim purchaseOrders As IEnumerable(Of XElement) = _
            From el In root.<aw:PurchaseOrder> _
            Where _
                (From add In el.<aw:Address> _
                Where _
                     add.@aw:Type = "Shipping" And _
                     add.<aw:State>.Value = "NY" _
                Select add) _
            .Any() _
            Select el
        For Each el As XElement In purchaseOrders
            Console.WriteLine(el.@aw:PurchaseOrderNumber)
        Next
    End Sub
End Module
```

This example produces the following output:

```output
99505
```

## See also

- `System.Xml.Linq.XElement.Attribute*`
- `System.Xml.Linq.XContainer.Elements*`
- Projection Operations (C#)
- Quantifier Operations (C#)
- XML Child Axis Property (Visual Basic)
- XML Attribute Axis Property (Visual Basic)
- XML Value Property (Visual Basic)
- Projection Operations (Visual Basic)
- Quantifier Operations (Visual Basic)
