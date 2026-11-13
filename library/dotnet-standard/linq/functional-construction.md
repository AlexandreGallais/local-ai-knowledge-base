---
title: "Functional construction - LINQ to XML"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/linq/functional-construction.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Functional construction (LINQ to XML)

LINQ to XML provides a powerful way to create XML elements called *functional construction*. Functional construction enables you to create an XML tree in a single statement.

Several key features of the LINQ to XML programming interface are used in functional construction:

- The `System.Xml.Linq.XElement` constructor takes various types of arguments for content. For example, you can pass another `System.Xml.Linq.XElement` object, which becomes a child element. You can pass an `System.Xml.Linq.XAttribute` object, which becomes an attribute of the element. Or you can pass any other type of object, which is converted to a string and becomes the text content of the element.
- The `System.Xml.Linq.XElement` constructor takes a `params` array of type `System.Object`, so that you can pass any number of objects to the constructor. This enables you to create an element that has complex content.
- If an object implements `System.Collections.Generic.IEnumerable`1`, the collection in the object is enumerated, and all items in the collection are added. If the collection contains `System.Xml.Linq.XElement` or `System.Xml.Linq.XAttribute` objects, each item in the collection is added separately. This is important because it lets you pass the results of a LINQ query to the constructor.

## Example: Create an XML tree

You can use functional construction to write code to create an XML tree. The following is an example:

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

## Example: Create an XML tree using LINQ query results

These features also enable you to write code that uses the results of LINQ queries when you create an XML tree, as in the following example:

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

In Visual Basic, the same thing is accomplished with XML literals:

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
            Where CInt(el) > 2 _
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

## See also

- Create XML Trees in C#
- XML literals in Visual Basic
