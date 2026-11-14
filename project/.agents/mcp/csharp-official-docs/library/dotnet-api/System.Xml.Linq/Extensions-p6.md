---
title: "Extensions class (part 6 of 6)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Linq/Extensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Extensions class (part 6 of 6)

## Extensions.Remove<T>(IEnumerable<T>) method

```csharp
public static void Remove<T> (this System.Collections.Generic.IEnumerable<T?> source) where T : System.Xml.Linq.XNode;
```

Removes every node in the source collection from its parent node.

Parameters:

- `T`: The type of the objects in `source`, constrained to `XNode`.
- `source`: An `IEnumerable<T>` of `XNode` that contains the source collection.

#### Remarks
This method uses snapshot semantics - that is, it copies the attributes in the source collection to a `List<T>` before disconnecting them from their parents. This is required to avoid issues with mixed imperative/declarative code. For more information, see Mixed Declarative Code/Imperative Code Bugs (LINQ to XML).

#### Examples
The following example retrieves a collection of elements. It then calls this method to remove the elements from their parent element.

```csharp
XElement root = new XElement("Root",
    new XElement("Data", 1),
    new XElement("Data", 2),
    new XElement("Data", 3),
    new XElement("Data", 4),
    new XElement("Data", 5)
);

IEnumerable<XElement> elList =
    from el in root.Elements()
    where (int)el >= 3
    select el;

elList.Remove();

Console.WriteLine(root);
```

```vb
Dim root As XElement = _
    <Root>
        <Data>1</Data>
        <Data>2</Data>
        <Data>3</Data>
        <Data>4</Data>
        <Data>5</Data>
    </Root>

Dim elList = From el In root.Elements _
             Where el.Value >= 3 _
             Select el

elList.Remove()

Console.WriteLine(root)

```

This example produces the following output:

```
<Root>
  <Data>1</Data>
  <Data>2</Data>
</Root>
```
