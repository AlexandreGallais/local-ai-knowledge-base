---
title: "XContainer class (part 2 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Linq/XContainer.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XContainer class (part 2 of 3)

## XContainer.CreateWriter() method

```csharp
public System.Xml.XmlWriter CreateWriter ();
```

Creates an `XmlWriter` that can be used to add nodes to the `XContainer`.

Returns: An `XmlWriter` that is ready to have content written to it.

#### Remarks
While serializing, namespace prefixes are inferred from the namespace attributes in the XML tree.

For more information, see Work with XML Namespaces.

#### Examples
You can use this method to perform an XSLT transformation. You can create an XML tree, create an `XmlReader` from the XML tree, create a new document, and create a `XmlWriter` that will write into the new document. Then, you can invoke the XSLT transformation, passing the `XmlReader` and `XmlWriter` to the transform. After the transformation successfully completes, the new XML tree is populated with the results of the transformation.

```csharp
string xslMarkup = @"<?xml version='1.0'?>
<xsl:stylesheet xmlns:xsl='http://www.w3.org/1999/XSL/Transform' version='1.0'>
    <xsl:template match='/Parent'>
        <Root>
            <C1></C1>
            <C2></C2>
        </Root>
    </xsl:template>
</xsl:stylesheet>";

XDocument xmlTree = new XDocument(
    new XElement("Parent",
        new XElement("Child1", "Child1 data"),
        new XElement("Child2", "Child2 data")
    )
);

XDocument newTree = new XDocument();
using (XmlWriter writer = newTree.CreateWriter()) {
    // Load the style sheet.
    XslCompiledTransform xslt = new XslCompiledTransform();
    xslt.Load(XmlReader.Create(new StringReader(xslMarkup)));

    // Execute the transform and output the results to a writer.
    xslt.Transform(xmlTree.CreateReader(), writer);
}

Console.WriteLine(newTree);
```

```vb
Dim xslMarkup As XDocument = _
    <?xml version='1.0'?>
    <xsl:stylesheet xmlns:xsl='http://www.w3.org/1999/XSL/Transform' version='1.0'>
        <xsl:template match='/Parent'>
            <Root>
                <C1></C1>
                <C2></C2>
            </Root>
        </xsl:template>
    </xsl:stylesheet>

Dim xmlTree As XElement = _
    <Parent>
        <Child1>Child1 data</Child1>
        <Child2>Child2 data</Child2>
    </Parent>

Dim newTree As XDocument = New XDocument()

Using writer As XmlWriter = newTree.CreateWriter()
    ' Load the style sheet.
    Dim xslt As XslCompiledTransform = _
        New XslCompiledTransform()
    xslt.Load(xslMarkup.CreateReader())

    ' Execute the transform and output the results to a writer.
    xslt.Transform(xmlTree.CreateReader(), writer)
End Using

Console.WriteLine(newTree)
```

This example produces the following output:

```xml
<Root>
  <C1>Child1 data</C1>
  <C2>Child2 data</C2>
</Root>
```

## XContainer.DescendantNodes() method

```csharp
public System.Collections.Generic.IEnumerable<System.Xml.Linq.XNode> DescendantNodes ();
```

Returns a collection of the descendant nodes for this document or element, in document order.

Returns: An `IEnumerable<T>` of `XNode` containing the descendant nodes of the `XContainer`, in document order.

#### Remarks
Note that attributes are not considered to be nodes in LINQ to XML, so they will not be part of the collection that is returned by this method.

This method uses deferred execution.

#### Examples
The following example creates an XML tree, and then iterates through the `XContainer.DescendantNodes` axis.

```csharp
XElement xmlTree = new XElement("Root",
    // Attributes are not nodes, so will not be returned by DescendantNodes.
    new XAttribute("Att1", "AttributeContent"),
    new XElement("Child",
        new XElement("GrandChild", "element content")
    )
);
IEnumerable<XNode> dnas =
    from node in xmlTree.DescendantNodes()
    select node;
foreach (XNode node in dnas)
{
    if (node is XElement)
        Console.WriteLine((node as XElement).Name);
    else
        Console.WriteLine(node);
}
```

```vb
' Attributes are not nodes, so will not be returned by DescendantNodes.
Dim xmlTree As XElement = _
    <Root Att1="AttributeContent">
        <Child>
            <GrandChild>element content</GrandChild>
        </Child>
    </Root>

Dim dnas = From node In xmlTree.DescendantNodes _
           Select node

For Each node In dnas
    If TypeOf node Is XElement Then
        Console.WriteLine(DirectCast(node, XElement).Name)
    Else
        Console.WriteLine(node)
    End If
Next
```

This example produces the following output:

```
Child
GrandChild
element content
```

## XContainer.Descendants() method

```csharp
public System.Collections.Generic.IEnumerable<System.Xml.Linq.XElement> Descendants ();
```

Returns a collection of the descendant elements for this document or element, in document order.

Returns: An `IEnumerable<T>` of `XElement` containing the descendant elements of the `XContainer`.

#### Remarks
Note that this method will not return itself in the resulting `IEnumerable<T>`. See `XElement.DescendantsAndSelf` if you need to include the current `XElement` in the results.

This method uses deferred execution.

#### Examples
The following example creates an XML tree, and then uses this axis method to retrieve the descendants.

```csharp
XElement xmlTree = new XElement("Root",
    new XAttribute("Att1", "AttributeContent"),
    new XElement("Child",
        new XText("Some text"),
        new XElement("GrandChild", "element content")
    )
);
IEnumerable<XElement> de =
    from el in xmlTree.Descendants()
    select el;
foreach (XElement el in de)
    Console.WriteLine(el.Name);
```

```vb
' Attributes are not nodes, so will not be returned by DescendantNodes.
Dim xmlTree As XElement = _
    <Root Att1="AttributeContent">
        <Child>Some text
            <GrandChild>element content</GrandChild>
        </Child>
    </Root>
Dim de = From el In xmlTree.Descendants _
         Select el

For Each el In de
    Console.WriteLine(el.Name)
Next
```

This example produces the following output:

```
Child
GrandChild
```

## XContainer.Descendants(XName) method

```csharp
public System.Collections.Generic.IEnumerable<System.Xml.Linq.XElement> Descendants (System.Xml.Linq.XName? name);
```

Returns a filtered collection of the descendant elements for this document or element, in document order. Only elements that have a matching `XName` are included in the collection.

Parameters:

- `name`: The `XName` to match.

Returns: An `IEnumerable<T>` of `XElement` containing the descendant elements of the `XContainer` that match the specified `XName`.

#### Remarks
This method uses deferred execution.

#### Examples
The following example prints all descendants of an element.

```csharp
// Attributes are not nodes, so will not be returned by DescendantNodes.
XElement xmlTree = new XElement("Root",
    new XAttribute("Att1", "AttributeContent"),
    new XElement("Child",
        new XText("Some text"),
        new XElement("GrandChild", "element content")
    )
);
IEnumerable<XElement> de =
    from el in xmlTree.Descendants("Child")
    select el;
foreach (XElement el in de)
    Console.WriteLine(el.Name);
```

```vb
' Attributes are not nodes, so will not be returned by the descendants axis.
Dim xmlTree As XElement = _
    <Root Att1="AttributeContent">
         <Child>Some text
             <GrandChild>element content</GrandChild>
         </Child>
     </Root>

Dim de = From el In xmlTree...<Child> _
         Select el

For Each el In de
    Console.WriteLine(el.Name)
Next
```

This example produces the following output:

```
Child
```

The following is the same example, but in this case the XML is in a namespace. For more information, see Work with XML Namespaces.

```csharp
// Attributes are not nodes, so will not be returned by DescendantNodes.
XNamespace aw = "http://www.adventure-works.com";
XElement xmlTree = new XElement(aw + "Root",
    new XAttribute(aw + "Att1", "AttributeContent"),
    new XElement(aw + "Child",
        new XText("Some text"),
        new XElement(aw + "GrandChild", "element content")
    )
);
IEnumerable<XElement> de =
    from el in xmlTree.Descendants(aw + "Child")
    select el;
foreach (XElement el in de)
    Console.WriteLine(el.Name);
```

```vb
Imports <xmlns:aw = "http://www.adventure-works.com">

Module Module1
    Sub Main()
        ' Attributes are not nodes, so will not be returned by the descendants axis.
        Dim xmlTree As XElement = _
            <aw:Root aw:Att1="AttributeContent">
                 <aw:Child>Some text
                     <aw:GrandChild>element content</aw:GrandChild>
                 </aw:Child>
             </aw:Root>

        Dim de = From el In xmlTree...<aw:Child> _
                 Select el

        For Each el In de
            Console.WriteLine(el.Name)
        Next
    End Sub
End Module
```

This example produces the following output:

```
{http://www.adventure-works.com}Child
```

## XContainer.Element(XName) method

```csharp
public System.Xml.Linq.XElement? Element (System.Xml.Linq.XName name);
```

Gets the first (in document order) child element with the specified `XName`.

Parameters:

- `name`: The `XName` to match.

Returns: A `XElement` that matches the specified `XName`, or `null`.

#### Remarks
Returns `null` if there is no element with the specified name.

Some axis methods return collections of elements or attributes. This method returns only a single element.

This method returns `null` if the element with the specified name is not found. All of the methods that allow you to construct elements (the constructor of `XElement`, `XContainer.Add`, and so on) accept `null` as a valid argument. This allows you to use a convenient idiom: you can call this method as part of functional construction, and the element is added to the XML tree being constructed if and only if the element exists in the source tree. The following example shows this idiom.

In contrast to `XContainer.Elements`, this method is not an axis method. It does not use deferred execution; it simply returns an element when called.

#### Examples
The following example shows two uses of this method. In one case, the method finds the element in `srcTree`. In the second case, the method does not find the element in the source tree, no element is added to `xmlTree`, and no exception is thrown.

Note that the Visual Basic <example-value> uses the child XML property. It is also allowable to use the `XContainer.Element` method directly in Visual Basic.

```csharp
XElement srcTree = new XElement("Root",
    new XElement("Element1", 1),
    new XElement("Element2", 2),
    new XElement("Element3", 3),
    new XElement("Element4", 4),
    new XElement("Element5", 5)
);
XElement xmlTree = new XElement("Root",
    new XElement("Child1", 1),
    new XElement("Child2", 2),
    new XElement("Child3", 3),
    new XElement("Child4", 4),
    new XElement("Child5", 5),
    srcTree.Element("Element3"),
    // Even though Element9 does not exist in srcTree, the following line
    // will not throw an exception.
    srcTree.Element("Element9")
);
Console.WriteLine(xmlTree);
```

```vb
Dim srcTree As XElement = _
        <Root>
            <Element1>1</Element1>
            <Element2>2</Element2>
            <Element3>3</Element3>
            <Element4>4</Element4>
            <Element5>5</Element5>
        </Root>

Dim xmlTree As XElement = _
        <Root>
            <Child1>1</Child1>
            <Child2>2</Child2>
            <Child3>3</Child3>
            <Child4>4</Child4>
            <Child5>5</Child5>
            <%= srcTree.<Element3> %>
            <%= srcTree.<Element9> %>
        </Root>

' Even though Element9 does not exist in srcTree, adding it to the tree
' will not throw an exception.

Console.WriteLine(xmlTree)
```

This example produces the following output:

```xml
<Root>
  <Child1>1</Child1>
  <Child2>2</Child2>
  <Child3>3</Child3>
  <Child4>4</Child4>
  <Child5>5</Child5>
  <Element3>3</Element3>
</Root>
```

The following is the same example, but in this case the XML is in a namespace. For more information, see Work with XML Namespaces.

```csharp
XNamespace aw = "http://www.adventure-works.com";
XElement srcTree = new XElement(aw + "Root",
    new XAttribute(XNamespace.Xmlns + "aw", "http://www.adventure-works.com"),
    new XElement(aw + "Element1", 1),
    new XElement(aw + "Element2", 2),
    new XElement(aw + "Element3", 3),
    new XElement(aw + "Element4", 4),
    new XElement(aw + "Element5", 5)
);
XElement xmlTree = new XElement(aw + "Root",
    new XAttribute(XNamespace.Xmlns + "aw", "http://www.adventure-works.com"),
    new XElement(aw + "Child1", 1),
    new XElement(aw + "Child2", 2),
    new XElement(aw + "Child3", 3),
    new XElement(aw + "Child4", 4),
    new XElement(aw + "Child5", 5),
    srcTree.Element(aw + "Element3"),
    // Even though Element9 does not exist in srcTree, the following line
    // will not throw an exception.
    srcTree.Element(aw + "Element9")
);
Console.WriteLine(xmlTree);
```

```vb
Imports <xmlns:aw="http://www.adventure-works.com">

Module Module1
    Sub Main()
        Dim srcTree As XElement = _
            <aw:Root>
                <aw:Element1>1</aw:Element1>
                <aw:Element2>2</aw:Element2>
                <aw:Element3>3</aw:Element3>
                <aw:Element4>4</aw:Element4>
                <aw:Element5>5</aw:Element5>
            </aw:Root>

        Dim xmlTree As XElement = _
            <aw:Root>
                <aw:Child1>1</aw:Child1>
                <aw:Child2>2</aw:Child2>
                <aw:Child3>3</aw:Child3>
                <aw:Child4>4</aw:Child4>
                <aw:Child5>5</aw:Child5>
                <%= srcTree.<aw:Element3> %>
                <%= srcTree.<aw:Element9> %>
            </aw:Root>

        ' Even though Element9 does not exist in srcTree, adding it to the tree
        ' will not throw an exception.

        Console.WriteLine(xmlTree)
    End Sub
End Module
```

This example produces the following output:

```xml
<aw:Root xmlns:aw="http://www.adventure-works.com">
  <aw:Child1>1</aw:Child1>
  <aw:Child2>2</aw:Child2>
  <aw:Child3>3</aw:Child3>
  <aw:Child4>4</aw:Child4>
  <aw:Child5>5</aw:Child5>
  <aw:Element3>3</aw:Element3>
</aw:Root>
```
