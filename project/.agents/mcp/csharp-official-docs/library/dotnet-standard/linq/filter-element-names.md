---
title: "How to filter on element names - LINQ to XML"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/linq/filter-element-names.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# How to filter on element names (LINQ to XML)

When you call one of the methods that return `System.Collections.Generic.IEnumerable`1` of `System.Xml.Linq.XElement`, you can filter on the element name.

## Example: Retrieve descendants filtered to a specified name

This example retrieves a collection of descendants that's filtered to contain only descendants with the specified name.

This example uses XML document Sample XML file: Typical purchase order.

```csharp
XElement po = XElement.Load("PurchaseOrder.xml");
IEnumerable<XElement> items =
    from el in po.Descendants("ProductName")
    select el;
foreach(XElement prdName in items)
    Console.WriteLine(prdName.Name + ":" + (string) prdName);
```

```vb
Dim po As XElement = XElement.Load("PurchaseOrder.xml")
Dim items As IEnumerable(Of XElement) = _
    From el In po...<ProductName> _
    Select el
For Each prdName As XElement In items
    Console.WriteLine(prdName.Name.ToString & ":" & prdName.Value)
Next
```

This example produces the following output:

```output
ProductName:Lawnmower
ProductName:Baby Monitor
```

The other methods that return `System.Collections.Generic.IEnumerable`1` of `System.Xml.Linq.XElement` collections follow the same pattern. Their signatures are similar to `System.Xml.Linq.XContainer.Elements*` and `System.Xml.Linq.XContainer.Descendants*`. The following is the complete list of methods that have similar method signatures:

- `System.Xml.Linq.XNode.Ancestors*`
- `System.Xml.Linq.XContainer.Descendants*`
- `System.Xml.Linq.XContainer.Elements*`
- `System.Xml.Linq.XNode.ElementsAfterSelf*`
- `System.Xml.Linq.XNode.ElementsBeforeSelf*`
- `System.Xml.Linq.XElement.AncestorsAndSelf*`
- `System.Xml.Linq.XElement.DescendantsAndSelf*`

## Example: Retrieve from XML that's in a namespace

The following example shows the same query for XML that's in a namespace. For more information, see Namespaces overview.

The example uses XML document Sample XML file: Typical purchase order in a namespace.

```csharp
XNamespace aw = "http://www.adventure-works.com";
XElement po = XElement.Load("PurchaseOrderInNamespace.xml");
IEnumerable<XElement> items =
    from el in po.Descendants(aw + "ProductName")
    select el;
foreach (XElement prdName in items)
    Console.WriteLine(prdName.Name + ":" + (string)prdName);
```

```vb
Imports <xmlns:aw="http://www.adventure-works.com">

Module Module1
    Sub Main()
        Dim po As XElement = XElement.Load("PurchaseOrderInNamespace.xml")
        Dim items As IEnumerable(Of XElement) = _
            From el In po...<aw:ProductName> _
            Select el
        For Each prdName As XElement In items
            Console.WriteLine(prdName.Name.ToString & ":" & prdName.Value)
        Next
    End Sub
End Module
```

This example produces the following output:

```output
{http://www.adventure-works.com}ProductName:Lawnmower
{http://www.adventure-works.com}ProductName:Baby Monitor
```

## See also

- LINQ to XML axes overview
