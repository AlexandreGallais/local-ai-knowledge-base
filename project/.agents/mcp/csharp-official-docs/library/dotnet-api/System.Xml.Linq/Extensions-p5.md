---
title: "Extensions class (part 5 of 6)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Linq/Extensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Extensions class (part 5 of 6)

## Extensions.Elements<T>(IEnumerable<T>) method

```csharp
public static System.Collections.Generic.IEnumerable<System.Xml.Linq.XElement> Elements<T> (this System.Collections.Generic.IEnumerable<T?> source) where T : System.Xml.Linq.XContainer;
```

Returns a collection of the child elements of every element and document in the source collection.

Parameters:

- `T`: The type of the objects in `source`, constrained to `XContainer`.
- `source`: An `IEnumerable<T>` of `XElement` that contains the source collection.

Returns: An `IEnumerable<T>` of `XElement` of the child elements of every element or document in the source collection.

#### Remarks
Although Visual Basic <example-value> an integrated elements axis that allows you to find all child elements with a specified `XName` for every element in the source collection, there is no integrated elements axis that allows you to retrieve a collection of every child element for every element in the source collection.

This method uses deferred execution.

#### Examples
The following example retrieves a collection of elements with the element name of `Child`. It then uses this axis method to retrieve all child elements of the collection.

```csharp
XElement xmlTree = new XElement("Root",
    new XElement("Child",
        new XElement("GrandChild1", 1),
        new XElement("GrandChild2", 2)
    ),
    new XElement("Child",
        new XElement("GrandChild3", 3),
        new XElement("GrandChild4", 4)
    ),
    new XElement("Child",
        new XElement("GrandChild5", 5),
        new XElement("GrandChild6", 6)
    )
);

IEnumerable<XElement> allGrandChildren =
    from el in xmlTree.Elements("Child").Elements()
    select el;

foreach (XElement el in allGrandChildren)
    Console.WriteLine(el);
```

```vb
Dim xmlTree As XElement = _
     <Root>
          <Child>
              <GrandChild1>1</GrandChild1>
              <GrandChild2>2</GrandChild2>
          </Child>

          <Child>
              <GrandChild3>3</GrandChild3>
              <GrandChild4>4</GrandChild4>
          </Child>

          <Child>
              <GrandChild5>5</GrandChild5>
              <GrandChild6>6</GrandChild6>
          </Child>
      </Root>

Dim allGrandChildren = From el In xmlTree.<Child>.Elements _
                       Select el

For Each el As XElement In allGrandChildren
    Console.WriteLine(el)
Next

```

This example produces the following output:

```
<GrandChild1>1</GrandChild1>
<GrandChild2>2</GrandChild2>
<GrandChild3>3</GrandChild3>
<GrandChild4>4</GrandChild4>
<GrandChild5>5</GrandChild5>
<GrandChild6>6</GrandChild6>
```

The following is the same example, but in this case the XML is in a namespace. For more information, see Work with XML Namespaces.

```csharp
XNamespace aw = "http://www.adventure-works.com";
XElement xmlTree = new XElement(aw + "Root",
    new XElement(aw + "Child",
        new XElement(aw + "GrandChild1", 1),
        new XElement(aw + "GrandChild2", 2)
    ),
    new XElement(aw + "Child",
        new XElement(aw + "GrandChild3", 3),
        new XElement(aw + "GrandChild4", 4)
    ),
    new XElement(aw + "Child",
        new XElement(aw + "GrandChild5", 5),
        new XElement(aw + "GrandChild6", 6)
    )
);

IEnumerable<XElement> allGrandChildren =
    from el in xmlTree.Elements(aw + "Child").Elements()
    select el;

foreach (XElement el in allGrandChildren)
    Console.WriteLine(el);
```

```vb
Imports <xmlns="http://www.adventure-works.com">

Module Module1
    Sub Main()
        Dim xmlTree As XElement = _
             <Root>
                 <Child>
                     <GrandChild1>1</GrandChild1>
                     <GrandChild2>2</GrandChild2>
                 </Child>

                 <Child>
                     <GrandChild3>3</GrandChild3>
                     <GrandChild4>4</GrandChild4>
                 </Child>

                 <Child>
                     <GrandChild5>5</GrandChild5>
                     <GrandChild6>6</GrandChild6>
                 </Child>
             </Root>

        Dim allGrandChildren = From el In xmlTree.<Child>.Elements _
                               Select el

        For Each el As XElement In allGrandChildren
            Console.WriteLine(el)
        Next
    End Sub
End Module

```

This example produces the following output:

```
<GrandChild1 xmlns="http://www.adventure-works.com">1</GrandChild1>
<GrandChild2 xmlns="http://www.adventure-works.com">2</GrandChild2>
<GrandChild3 xmlns="http://www.adventure-works.com">3</GrandChild3>
<GrandChild4 xmlns="http://www.adventure-works.com">4</GrandChild4>
<GrandChild5 xmlns="http://www.adventure-works.com">5</GrandChild5>
<GrandChild6 xmlns="http://www.adventure-works.com">6</GrandChild6>
```

## Extensions.Elements<T>(IEnumerable<T>, XName) method

```csharp
public static System.Collections.Generic.IEnumerable<System.Xml.Linq.XElement> Elements<T> (this System.Collections.Generic.IEnumerable<T?> source, System.Xml.Linq.XName? name) where T : System.Xml.Linq.XContainer;
```

Returns a filtered collection of the child elements of every element and document in the source collection. Only elements that have a matching `XName` are included in the collection.

Parameters:

- `T`: The type of the objects in `source`, constrained to `XContainer`.
- `source`: An `IEnumerable<T>` of `XElement` that contains the source collection.
- `name`: The `XName` to match.

Returns: An `IEnumerable<T>` of `XElement` of the child elements of every element and document in the source collection. Only elements that have a matching `XName` are included in the collection.

#### Remarks
Visual Basic users can use the integrated elements axis to retrieve the child elements of every element in a collection.

This method uses deferred execution.

#### Examples
This extension method is useful when you want to retrieve all elements with a specified name at a particular depth. This is easy if the document is very regular, but if the document is irregular, it can be a bit more difficult. In the following example, we want to retrieve all `aaa` elements that are children of `Item` elements. A given `Item` element may or may not contain an `aaa` element. This is easily accomplished using this extension method, as follows:

```csharp
XElement xmlTree = new XElement("Root",
    new XElement("Item",
        new XElement("aaa", 1),
        new XElement("bbb", 2)
    ),
    new XElement("Item",
        new XElement("ccc", 3),
        new XElement("aaa", 4)
    ),
    new XElement("Item",
        new XElement("ddd", 5),
        new XElement("eee", 6)
    )
);

IEnumerable<XElement> allGrandChildren =
    from el in xmlTree.Elements("Item").Elements("aaa")
    select el;

foreach (XElement el in allGrandChildren)
    Console.WriteLine(el);
```

```vb
Dim xmlTree As XElement = _
    <Root>
        <Item>
            <aaa>1</aaa>
            <bbb>2</bbb>
        </Item>

        <Item>
            <ccc>3</ccc>
            <aaa>4</aaa>
        </Item>

        <Item>
            <ddd>5</ddd>
            <eee>6</eee>
        </Item>
    </Root>

Dim allGrandChildren = From el In xmlTree.<Item>.<aaa> _
                       Select el

For Each el As XElement In allGrandChildren
    Console.WriteLine(el)
Next

```

This example produces the following output:

```
<aaa>1</aaa>
<aaa>4</aaa>
```

The following is the same example, but in this case the XML is in a namespace. For more information, see Work with XML Namespaces.

```csharp
XNamespace aw = "http://www.adventure-works.com";
XElement xmlTree = new XElement(aw + "Root",
    new XElement(aw + "Item",
        new XElement(aw + "aaa", 1),
        new XElement(aw + "bbb", 2)
    ),
    new XElement(aw + "Item",
        new XElement(aw + "ccc", 3),
        new XElement(aw + "aaa", 4)
    ),
    new XElement(aw + "Item",
        new XElement(aw + "ddd", 5),
        new XElement(aw + "eee", 6)
    )
);

IEnumerable<XElement> allGrandChildren =
    from el in xmlTree.Elements(aw + "Item").Elements(aw + "aaa")
    select el;

foreach (XElement el in allGrandChildren)
    Console.WriteLine(el);
```

```vb
Imports <xmlns="http://www.adventure-works.com">

Module Module1
    Sub Main()
        Dim xmlTree As XElement = _
            <Root>
                <Item>
                    <aaa>1</aaa>
                    <bbb>2</bbb>
                </Item>

                <Item>
                    <ccc>3</ccc>
                    <aaa>4</aaa>
                </Item>

                <Item>
                    <ddd>5</ddd>
                    <eee>6</eee>
                </Item>
            </Root>

        Dim allGrandChildren = From el In xmlTree.<Item>.<aaa> _
                               Select el

        For Each el As XElement In allGrandChildren
            Console.WriteLine(el)
        Next
    End Sub
End Module

```

This example produces the following output:

```
<aaa xmlns="http://www.adventure-works.com">1</aaa>
<aaa xmlns="http://www.adventure-works.com">4</aaa>
```

## Extensions.InDocumentOrder<T>(IEnumerable<T>) method

```csharp
public static System.Collections.Generic.IEnumerable<T> InDocumentOrder<T> (this System.Collections.Generic.IEnumerable<T> source) where T : System.Xml.Linq.XNode;
```

Returns a collection of nodes that contains all nodes in the source collection, sorted in document order.

Parameters:

- `T`: The type of the objects in `source`, constrained to `XNode`.
- `source`: An `IEnumerable<T>` of `XNode` that contains the source collection.

Returns: An `IEnumerable<T>` of `XNode` that contains all nodes in the source collection, sorted in document order.

#### Remarks
This axis method uses deferred execution. However, it first enumerates its source collection, the sorts the nodes in document order, and then yields the results.

#### Examples
The following example creates a collection of nodes that are not in document order, and then uses this axis to create a new collection where the nodes are in document order.

```csharp
XElement xmlTree = new XElement("Root",
    new XElement("Item",
        new XElement("aaa", 1),
        new XElement("bbb", 2)
    ),
    new XElement("Item",
        new XElement("ccc", 3),
        new XElement("aaa", 4)
    ),
    new XElement("Item",
        new XElement("ddd", 5),
        new XElement("eee", 6)
    )
);

XElement[] elementList = {
    xmlTree.Descendants("ddd").First(),
    xmlTree.Descendants("ccc").First(),
    xmlTree.Descendants("aaa").First()
};

IEnumerable<XElement> inDocOrder = elementList.InDocumentOrder();

foreach (XElement el in inDocOrder)
    Console.WriteLine(el);
```

```vb
Dim xmlTree As XElement = _
    <Root>
        <Item>
            <aaa>1</aaa>
            <bbb>2</bbb>
        </Item>

        <Item>
            <ccc>3</ccc>
            <aaa>4</aaa>
        </Item>

        <Item>
            <ddd>5</ddd>
            <eee>6</eee>
        </Item>
    </Root>

Dim elementList() As XElement = _
    { _
        xmlTree...<ddd>(0), _
        xmlTree...<ccc>(0), _
        xmlTree...<aaa>(0) _
    }

Dim inDocOrder = elementList.InDocumentOrder

For Each el As XElement In inDocOrder
    Console.WriteLine(el)
Next

```

This example produces the following output:

```
<aaa>1</aaa>
<ccc>3</ccc>
<ddd>5</ddd>
```

## Extensions.Nodes<T>(IEnumerable<T>) method

```csharp
public static System.Collections.Generic.IEnumerable<System.Xml.Linq.XNode> Nodes<T> (this System.Collections.Generic.IEnumerable<T?> source) where T : System.Xml.Linq.XContainer;
```

Returns a collection of the child nodes of every document and element in the source collection.

Parameters:

- `T`: The type of the objects in `source`, constrained to `XContainer`.
- `source`: An `IEnumerable<T>` of `XNode` that contains the source collection.

Returns: An `IEnumerable<T>` of `XNode` of the child nodes of every document and element in the source collection.

#### Remarks
This method uses deferred execution.

#### Examples
The following example retrieves all of the child nodes for every node in a collection of elements with the name of `Child`.

```csharp
XElement xmlTree = XElement.Parse(
    @"<Root><Child>aaa<GrandChild>Text</GrandChild>bbb</Child>" +
    @"<Child>ccc<GrandChild>Text</GrandChild>ddd</Child></Root>");
IEnumerable<XNode> nodes = xmlTree.Elements("Child").Nodes();

foreach (XNode node in nodes)
{
    switch (node.NodeType)
    {
        case XmlNodeType.Element:
            Console.WriteLine("Element: {0}", ((XElement)node).Name);
            break;
        case XmlNodeType.Text:
            Console.WriteLine("Text: {0}", ((XText)node).Value);
            break;
    }
}
```

```vb
Dim xmlTree As XElement = _
    <Root>
        <Child>aaa<GrandChild>Text</GrandChild>bbb</Child>
        <Child>ccc<GrandChild>Text</GrandChild>ddd</Child>
    </Root>

Dim nodes = xmlTree.<Child>.Nodes()

' Note that XNode uses XmlNodeType, which is in the System.Xml namespace.
For Each node As XNode In nodes
    Select Case node.NodeType
        Case XmlNodeType.Element
            Console.WriteLine("Element: {0}", DirectCast(node, XElement).Name)
        Case XmlNodeType.Text
            Console.WriteLine("Text: {0}", DirectCast(node, XText).Value)
    End Select
Next

```

This example produces the following output:

```
Text: aaa
Element: GrandChild
Text: bbb
Text: ccc
Element: GrandChild
Text: ddd
```

## Extensions.Remove(XAttribute>) method

```csharp
public static void Remove (this System.Collections.Generic.IEnumerable<System.Xml.Linq.XAttribute?> source);
```

Removes every attribute in the source collection from its parent element.

Parameters:

- `source`: An `IEnumerable<T>` of `XAttribute` that contains the source collection.

#### Remarks
This method uses snapshot semantics - that is, it copies the attributes in the source collection to a `List<T>` before disconnecting them from their parents. This is required to avoid issues with mixed imperative/declarative code. For more information, see Mixed Declarative Code/Imperative Code Bugs (LINQ to XML).

#### Examples
The following example retrieves a collection of attributes, and then calls this method to remove them from their parent elements.

```csharp
XElement root = new XElement("Root",
    new XAttribute("Att1", 1),
    new XAttribute("Att2", 2),
    new XAttribute("Att3", 3),
    new XAttribute("Att4", 4),
    new XAttribute("Att5", 5)
);

IEnumerable<XAttribute> atList =
    from at in root.Attributes()
    where (int)at >= 3
    select at;

atList.Remove();

Console.WriteLine(root);
```

```vb
Dim root As XElement = 

Dim atList = From at In root.Attributes _
             Where at.Value >= 3 _
             Select at

atList.Remove()

Console.WriteLine(root)

```

This example produces the following output:

```

```
