---
title: "Extensions class (part 3 of 6)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Linq/Extensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Extensions class (part 3 of 6)

## Extensions.Attributes(XElement>) method

```csharp
public static System.Collections.Generic.IEnumerable<System.Xml.Linq.XAttribute> Attributes (this System.Collections.Generic.IEnumerable<System.Xml.Linq.XElement?> source);
```

Returns a collection of the attributes of every element in the source collection.

Parameters:

- `source`: An `IEnumerable<T>` of `XElement` that contains the source collection.

Returns: An `IEnumerable<T>` of `XAttribute` that contains the attributes of every element in the source collection.

#### Remarks
Note that unlike some other XML programming interfaces, in LINQ to XML, namespaces are surfaced as attributes.

Although Visual Basic users can use the integrated attribute axis to retrieve attributes with a specified name from a collection of elements, there is no integrated Visual Basic axis to retrieve all attributes of all elements in a collection.

This method uses deferred execution.

#### Examples
The following example retrieves a collection of elements, and then retrieves a collection of all attributes of all elements in the collection. Note that the resulting collection includes only the attributes of the `Child1` and `Child2` elements, and not the attributes of the `Root` element.

Note that the namespace attribute is returned by this method.

```csharp
XElement xmlTree = new XElement("Root",
    new XAttribute(XNamespace.Xmlns + "aw", "http://www.adventure-works.com"),
    new XAttribute("Att1", "content1"),
    new XAttribute("Att2", "content2"),
    new XElement("Child1",
        new XAttribute("Att1", "content3"),
        new XAttribute("Att2", "content4")
    ),
    new XElement("Child2",
        new XAttribute("Att1", "content5"),
        new XAttribute("Att2", "content6")
    )
);
Console.WriteLine(xmlTree);
Console.WriteLine("-----");

IEnumerable<XAttribute> attList =
    from att in xmlTree.DescendantsAndSelf().Attributes()
    select att;

foreach (XAttribute att in attList)
    Console.WriteLine(att);
```

```vb
Dim xmlTree As XElement = _
    <Root xmlns:aw="http://www.adventure-works.com" Att1="content1" Att2="content2">
        
        
    </Root>

Dim attList = _
    From att In xmlTree.DescendantsAndSelf.Attributes _
    Select att

Console.WriteLine(xmlTree)
Console.WriteLine("-----")

For Each att As XAttribute In attList
    Console.WriteLine(att)
Next
```

This example produces the following output:

```
<Root xmlns:aw="http://www.adventure-works.com" Att1="content1" Att2="content2">
  
  
</Root>
-----
xmlns:aw="http://www.adventure-works.com"
Att1="content1"
Att2="content2"
Att1="content3"
Att2="content4"
Att1="content5"
Att2="content6"
```

The following is the same example, but in this case the XML is in a namespace. For more information, see Work with XML Namespaces. Note that the namespace attribute is included in the returned collection.

```csharp
XNamespace aw = "http://www.adventure-works.com";
XElement xmlTree = new XElement(aw + "Root",
    new XAttribute(XNamespace.Xmlns + "aw", "http://www.adventure-works.com"),
    new XAttribute(aw + "Att1", "content1"),
    new XAttribute(aw + "Att2", "content2"),
    new XElement(aw + "Child1",
        new XAttribute(aw + "Att1", "content3"),
        new XAttribute(aw + "Att2", "content4")
    ),
    new XElement(aw + "Child2",
        new XAttribute(aw + "Att1", "content5"),
        new XAttribute(aw + "Att2", "content6")
    )
);
Console.WriteLine(xmlTree);
Console.WriteLine("-----");

IEnumerable<XAttribute> attList =
    from att in xmlTree.DescendantsAndSelf().Attributes()
    select att;

foreach (XAttribute att in attList)
    Console.WriteLine(att);
```

```vb
Imports <xmlns:aw="http://www.adventure-works.com">

Module Module1
    Sub Main()
        Dim xmlTree As XElement = _
            <aw:Root xmlns:aw="http://www.adventure-works.com" aw:Att1="content1" aw:Att2="content2">
                
                
            </aw:Root>

        Dim attList = _
            From att In xmlTree.DescendantsAndSelf.Attributes _
            Select att

        Console.WriteLine(xmlTree)
        Console.WriteLine("-----")

        For Each att As XAttribute In attList
            Console.WriteLine(att)
        Next
    End Sub
End Module
```

This example produces the following output:

```
<aw:Root xmlns:aw="http://www.adventure-works.com" aw:Att1="content1" aw:Att2="content2">
  
  
</aw:Root>
-----
xmlns:aw="http://www.adventure-works.com"
aw:Att1="content1"
aw:Att2="content2"
aw:Att1="content3"
aw:Att2="content4"
aw:Att1="content5"
aw:Att2="content6"
```

## Extensions.Attributes(XElement>, XName) method

```csharp
public static System.Collections.Generic.IEnumerable<System.Xml.Linq.XAttribute> Attributes (this System.Collections.Generic.IEnumerable<System.Xml.Linq.XElement?> source, System.Xml.Linq.XName? name);
```

Returns a filtered collection of the attributes of every element in the source collection. Only elements that have a matching `XName` are included in the collection.

Parameters:

- `source`: An `IEnumerable<T>` of `XElement` that contains the source collection.
- `name`: The `XName` to match.

Returns: An `IEnumerable<T>` of `XAttribute` that contains a filtered collection of the attributes of every element in the source collection. Only elements that have a matching `XName` are included in the collection.

#### Remarks
Note that unlike some other XML programming interfaces, in LINQ to XML, namespaces are surfaced as attributes.

This method uses deferred execution.

#### Examples
The following example retrieves a collection of elements, which in this case includes the `Child1` and `Child2` elements. It then retrieves all attributes of that child collection with a name of `Att1`.

```csharp
XElement xmlTree = new XElement("Root",
    new XAttribute("Att1", "content1"),
    new XAttribute("Att2", "content2"),
    new XElement("Child1",
        new XAttribute("Att1", "content3"),
        new XAttribute("Att2", "content4")
    ),
    new XElement("Child2",
        new XAttribute("Att1", "content5"),
        new XAttribute("Att2", "content6")
    )
);

IEnumerable<XAttribute> attList = from att in xmlTree.Elements().Attributes("Att1")
                                  select att;

foreach (XAttribute att in attList)
    Console.WriteLine(att);
```

```vb
Dim xmlTree As XElement = _
    <Root Att1="content1" Att2="content2">
        <Child1 Att1="content3" Att2="content4">
        </Child1>
        <Child2 Att1="content5" Att2="content6">
        </Child2>
    </Root>

Dim attList = From att In xmlTree.Elements.Attributes("Att1") _
                          Select att

For Each att As XAttribute In attList
    Console.WriteLine(att)
Next

```

This example produces the following output:

```
Att1="content3"
Att1="content5"
```

## Extensions.DescendantNodes<T>(IEnumerable<T>) method

```csharp
public static System.Collections.Generic.IEnumerable<System.Xml.Linq.XNode> DescendantNodes<T> (this System.Collections.Generic.IEnumerable<T?> source) where T : System.Xml.Linq.XContainer;
```

Returns a collection of the descendant nodes of every document and element in the source collection.

Parameters:

- `T`: The type of the objects in `source`, constrained to `XContainer`.
- `source`: An `IEnumerable<T>` of `XContainer` that contains the source collection.

Returns: An `IEnumerable<T>` of `XNode` of the descendant nodes of every document and element in the source collection.

#### Remarks
This axis extension method is used on `XDocument` and `XElement` objects. Both of these types derive from `XContainer`, so this method operates on an `IEnumerable<T>` of `XContainer` that contains the source collection.

Although Visual Basic has an integrated XML axis for descendant elements, there is no integrated axis for descendant nodes, so Visual Basic users must use this axis method explicitly.

This method uses deferred execution.

#### Examples
The following example retrieves a collection of two elements, and then retrieves a collection of all descendant nodes for every element in the source collection. Note that the attribute of the `GrandChild` element is not surfaced as a node.

```csharp
XElement xmlTree = XElement.Parse(
@"<Root>
    <Child>aaa<GrandChild anAttribute='xyz'>Text</GrandChild>
        <!--a comment-->
        <?xml-stylesheet type='text/xsl' href='test.xsl'?>
    </Child>
    <Child>ccc<GrandChild>Text</GrandChild>ddd</Child>
</Root>");
IEnumerable<XNode> nodes =
    from node in xmlTree.Elements("Child").DescendantNodes()
    select node;

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
        case XmlNodeType.Comment:
            Console.WriteLine("Comment: {0}", ((XComment)node).Value);
            break;
        case XmlNodeType.ProcessingInstruction:
            Console.WriteLine("PI: {0}", ((XProcessingInstruction)node).Data);
            break;
    }
}
```

```vb
Dim xmlTree As XElement = _
<Root>
    <Child>aaa<GrandChild anAttribute='xyz'>Text</GrandChild>
        <!--a comment-->
        <?xml-stylesheet type='text/xsl' href='test.xsl'?>
    </Child>
    <Child>ccc<GrandChild>Text</GrandChild>ddd</Child>
</Root>

Dim nodes As IEnumerable(Of XNode) = _
    From node In xmlTree.<Child>.DescendantNodes _
    Select node

For Each node As XNode In nodes
    Select Case node.NodeType
        Case XmlNodeType.Element
            Console.WriteLine("Element: {0}", DirectCast(node, XElement).Name)
        Case XmlNodeType.Text
            Console.WriteLine("Text: {0}", DirectCast(node, XText).Value)
        Case XmlNodeType.Comment
            Console.WriteLine("Comment: {0}", DirectCast(node, XComment).Value)
        Case XmlNodeType.ProcessingInstruction
            Console.WriteLine("PI: {0}", DirectCast(node, XProcessingInstruction).Data)
    End Select
Next
```

This example produces the following output:

```
Text: aaa
Element: GrandChild
Text: Text
Comment: a comment
PI: type='text/xsl' href='test.xsl'
Text: ccc
Element: GrandChild
Text: Text
Text: ddd
```

The following is the same example, but in this case the XML is in a namespace. For more information, see Work with XML Namespaces.

```csharp
XNamespace aw = "http://www.adventure-works.com";
XElement xmlTree = XElement.Parse(
@"<Root xmlns='http://www.adventure-works.com'>
    <Child>aaa<GrandChild anAttribute='xyz'>Text</GrandChild>
        <!--a comment-->
        <?xml-stylesheet type='text/xsl' href='test.xsl'?>
    </Child>
    <Child>ccc<GrandChild>Text</GrandChild>ddd</Child>
</Root>");
IEnumerable<XNode> nodes =
    from node in xmlTree.Elements(aw + "Child").DescendantNodes()
    select node;

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
        case XmlNodeType.Comment:
            Console.WriteLine("Comment: {0}", ((XComment)node).Value);
            break;
        case XmlNodeType.ProcessingInstruction:
            Console.WriteLine("PI: {0}", ((XProcessingInstruction)node).Data);
            break;
    }
}
```

```vb
Imports <xmlns="http://www.adventure-works.com">

Module Module1
    Sub Main()
        Dim xmlTree As XElement = _
        <Root>
            <Child>aaa<GrandChild anAttribute='xyz'>Text</GrandChild>
                <!--a comment-->
                <?xml-stylesheet type='text/xsl' href='test.xsl'?>
            </Child>
            <Child>ccc<GrandChild>Text</GrandChild>ddd</Child>
        </Root>

        Dim nodes As IEnumerable(Of XNode) = _
            From node In xmlTree.<Child>.DescendantNodes _
            Select node

        For Each node As XNode In nodes
            Select Case node.NodeType
                Case XmlNodeType.Element
                    Console.WriteLine("Element: {0}", DirectCast(node, XElement).Name)
                Case XmlNodeType.Text
                    Console.WriteLine("Text: {0}", DirectCast(node, XText).Value)
                Case XmlNodeType.Comment
                    Console.WriteLine("Comment: {0}", DirectCast(node, XComment).Value)
                Case XmlNodeType.ProcessingInstruction
                    Console.WriteLine("PI: {0}", DirectCast(node, XProcessingInstruction).Data)
            End Select
        Next
    End Sub
End Module
```

This example produces the following output:

```
Text: aaa
Element: {http://www.adventure-works.com}GrandChild
Text: Text
Comment: a comment
PI: type='text/xsl' href='test.xsl'
Text: ccc
Element: {http://www.adventure-works.com}GrandChild
Text: Text
Text: ddd
```

## Extensions.DescendantNodesAndSelf(XElement>) method

```csharp
public static System.Collections.Generic.IEnumerable<System.Xml.Linq.XNode> DescendantNodesAndSelf (this System.Collections.Generic.IEnumerable<System.Xml.Linq.XElement?> source);
```

Returns a collection of nodes that contains every element in the source collection, and the descendant nodes of every element in the source collection.

Parameters:

- `source`: An `IEnumerable<T>` of `XElement` that contains the source collection.

Returns: An `IEnumerable<T>` of `XNode` that contains every element in the source collection, and the descendant nodes of every element in the source collection.

#### Remarks
Although Visual Basic has an integrated XML axis for descendant elements, there is no integrated axis for descendant nodes, so Visual Basic users must use this axis method explicitly.

This method uses deferred execution.
