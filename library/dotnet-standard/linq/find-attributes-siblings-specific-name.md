---
title: "How to find attributes of siblings with a specific name - LINQ to XML"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/linq/find-attributes-siblings-specific-name.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# How to find attributes of siblings with a specific name (LINQ to XML)

This article shows how to use `System.Xml.XPath.Extensions.XPathEvaluate*` to find every attribute that has a specific name and that also belongs to a sibling of the context node. The article also shows how to use LINQ to XML query to do the same thing.

## Example: Find all sibling elements named `Book`, and then find all attributes named `id`

This example finds a `Book` element in XML document Sample XML file: Books. It then finds all sibling elements named `Book`, and all attributes named `id` of those elements. The result is a collection of attributes.

The XPath expression is `../Book/@id`.

```csharp
XDocument books = XDocument.Load("Books.xml");

XElement book =
    books
    .Root
    .Element("Book");

// LINQ to XML query
IEnumerable<XAttribute> list1 =
    from el in book.Parent.Elements("Book")
    select el.Attribute("id");

// XPath expression
IEnumerable<XAttribute> list2 =
  ((IEnumerable)book.XPathEvaluate("../Book/@id")).Cast<XAttribute>();

if (list1.Count() == list2.Count() &&
        list1.Intersect(list2).Count() == list1.Count())
    Console.WriteLine("Results are identical");
else
    Console.WriteLine("Results differ");
foreach (XAttribute el in list1)
    Console.WriteLine(el);
```

```vb
Dim books as XDocument = XDocument.Load("Books.xml")
Dim book As XElement = books.Root.<Book>(0)

' LINQ to XML query
Dim list1 As IEnumerable(Of XAttribute) = _
    From el In book.Parent.<Book> _
    Select el.Attribute("id")

' XPath expression
Dim list2 As IEnumerable(Of XAttribute) = DirectCast(book. _
    XPathEvaluate("../Book/@id"), IEnumerable).Cast(Of XAttribute)()

If list1.Count() = list2.Count() And _
        (list1.Intersect(list2)).Count() = list1.Count() Then
    Console.WriteLine("Results are identical")
Else
    Console.WriteLine("Results differ")
End If

For Each el As XAttribute In list1
    Console.WriteLine(el)
Next
```

This example produces the following output:

```output
Results are identical
id="bk101"
id="bk102"
```

## See also

- LINQ to XML for XPath Users (Visual Basic)
