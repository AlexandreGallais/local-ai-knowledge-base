---
title: "XContainer class (part 3 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Linq/XContainer.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XContainer class (part 3 of 3)

## XContainer.Elements() method

```csharp
public System.Collections.Generic.IEnumerable<System.Xml.Linq.XElement> Elements ();
```

Returns a collection of the child elements of this element or document, in document order.

Returns: An `IEnumerable<T>` of `XElement` containing the child elements of this `XContainer`, in document order.

#### Remarks
This method uses deferred execution.

#### Examples
The following example creates an XML tree, and then selects some elements using this axis method.

```csharp
XElement xmlTree = new XElement("Root",
    new XElement("Child1", 1),
    new XElement("Child2", 2),
    new XElement("Child3", 3),
    new XElement("Child4", 4),
    new XElement("Child5", 5)
);
IEnumerable<XElement> elements =
    from el in xmlTree.Elements()
    where (int)el <= 3
    select el;
foreach (XElement el in elements)
    Console.WriteLine(el);
```

```vb
Dim xmlTree As XElement = _
        <Root>
            <Child1>1</Child1>
            <Child2>2</Child2>
            <Child3>3</Child3>
            <Child4>4</Child4>
            <Child5>5</Child5>
        </Root>

Dim elements = From el In xmlTree.Elements _
               Where el.Value <= 3 _
               Select el

For Each el In elements
    Console.WriteLine(el)
Next
```

This example produces the following output:

```
<Child1>1</Child1>
<Child2>2</Child2>
<Child3>3</Child3>
```

The following is the same example, but in this case the XML is in a namespace. For more information, see Work with XML Namespaces.

```csharp
XNamespace aw = "http://www.adventure-works.com";
XElement xmlTree = new XElement(aw + "Root",
    new XAttribute(XNamespace.Xmlns + "aw", "http://www.adventure-works.com"),
    new XElement(aw + "Child1", 1),
    new XElement(aw + "Child2", 2),
    new XElement(aw + "Child3", 3),
    new XElement(aw + "Child4", 4),
    new XElement(aw + "Child5", 5)
);
IEnumerable<XElement> elements =
    from el in xmlTree.Elements()
    where (int)el <= 3
    select el;
foreach (XElement el in elements)
    Console.WriteLine(el);
```

```vb
Imports <xmlns:aw="http://www.adventure-works.com">

Module Module1
    Sub Main()
        Dim xmlTree As XElement = _
            <aw:Root>
                <aw:Child1>1</aw:Child1>
                <aw:Child2>2</aw:Child2>
                <aw:Child3>3</aw:Child3>
                <aw:Child4>4</aw:Child4>
                <aw:Child5>5</aw:Child5>
            </aw:Root>

        Dim elements = From el In xmlTree.Elements _
                       Where el.Value <= 3 _
                       Select el

        For Each el In elements
            Console.WriteLine(el)
        Next
    End Sub
End Module
```

This example produces the following output:

```
<aw:Child1 xmlns:aw="http://www.adventure-works.com">1</aw:Child1>
<aw:Child2 xmlns:aw="http://www.adventure-works.com">2</aw:Child2>
<aw:Child3 xmlns:aw="http://www.adventure-works.com">3</aw:Child3>
```

## XContainer.Elements(XName) method

```csharp
public System.Collections.Generic.IEnumerable<System.Xml.Linq.XElement> Elements (System.Xml.Linq.XName? name);
```

Returns a filtered collection of the child elements of this element or document, in document order. Only elements that have a matching `XName` are included in the collection.

Parameters:

- `name`: The `XName` to match.

Returns: An `IEnumerable<T>` of `XElement` containing the children of the `XContainer` that have a matching `XName`, in document order.

#### Remarks
This method uses deferred execution.

#### Examples
The following example creates an XML tree, and then selects several child elements using this axis method.

```csharp
XElement xmlTree = new XElement("Root",
    new XElement("Type1", 1),
    new XElement("Type1", 2),
    new XElement("Type2", 3),
    new XElement("Type2", 4),
    new XElement("Type2", 5)
);
IEnumerable<XElement> elements =
    from el in xmlTree.Elements("Type2")
    select el;
foreach (XElement el in elements)
    Console.WriteLine(el);
```

```vb
Dim xmlTree As XElement = _
        <Root>
            <Type1>1</Type1>
            <Type1>2</Type1>
            <Type2>3</Type2>
            <Type2>4</Type2>
            <Type2>5</Type2>
        </Root>

Dim elements = From el In xmlTree.<Type2> _
               Select el

For Each el In elements
    Console.WriteLine(el)
Next
```

This example produces the following output:

```
<Type2>3</Type2>
<Type2>4</Type2>
<Type2>5</Type2>
```

The following is the same example, but in this case the XML is in a namespace. For more information, see Work with XML Namespaces.

```csharp
XNamespace aw = "http://www.adventure-works.com";
XElement xmlTree = new XElement(aw + "Root",
    new XAttribute(XNamespace.Xmlns + "aw", "http://www.adventure-works.com"),
    new XElement(aw + "Type1", 1),
    new XElement(aw + "Type1", 2),
    new XElement(aw + "Type2", 3),
    new XElement(aw + "Type2", 4),
    new XElement(aw + "Type2", 5)
);
IEnumerable<XElement> elements =
    from el in xmlTree.Elements(aw + "Type2")
    select el;
foreach (XElement el in elements)
    Console.WriteLine(el);
```

```vb
Imports <xmlns:aw="http://www.adventure-works.com">

Module Module1
    Sub Main()
        Dim xmlTree As XElement = _
            <aw:Root>
                <aw:Type1>1</aw:Type1>
                <aw:Type1>2</aw:Type1>
                <aw:Type2>3</aw:Type2>
                <aw:Type2>4</aw:Type2>
                <aw:Type2>5</aw:Type2>
            </aw:Root>

        Dim elements = From el In xmlTree.<aw:Type2> _
                       Select el

        For Each el In elements
            Console.WriteLine(el)
        Next
    End Sub
End Module
```

This example produces the following output:

```
<aw:Type2 xmlns:aw="http://www.adventure-works.com">3</aw:Type2>
<aw:Type2 xmlns:aw="http://www.adventure-works.com">4</aw:Type2>
<aw:Type2 xmlns:aw="http://www.adventure-works.com">5</aw:Type2>
```

## XContainer.Nodes() method

```csharp
public System.Collections.Generic.IEnumerable<System.Xml.Linq.XNode> Nodes ();
```

Returns a collection of the child nodes of this element or document, in document order.

Returns: An `IEnumerable<T>` of `XNode` containing the contents of this `XContainer`, in document order.

#### Remarks
Note that the content does not include attributes. In LINQ to XML, attributes are not considered to be nodes of the tree. They are name/value pairs associated with an element.

This method uses deferred execution.

#### Examples
The following example creates an XML tree with a variety of types of nodes. It then queries this axis method to enumerate and print the nodes.

```csharp
XElement xmlTree = new XElement("Root",
    new XElement("Child1", 1),
    new XElement("Child2", 2),
    new XComment("a comment"),
    new XElement("Child3", 3),
    new XElement("Child4", 4),
    new XText("mixed content"),
    new XElement("Child5", 5)
);
IEnumerable<XNode> nodes =
    from nd in xmlTree.Nodes()
    select nd;
foreach (XNode node in nodes)
    Console.WriteLine(node);
```

```vb
Dim xmlTree As XElement = _
        <Root>
            <Child1>1</Child1>
            <Child2>2</Child2>
            <!--a comment-->
            <Child3>3</Child3>
            <Child4>4</Child4>mixed content<Child5>5</Child5>
            </Root>

Dim nodes = From nd In xmlTree.Nodes() _
            Select nd

For Each node In nodes
    Console.WriteLine(node)
Next
```

This example produces the following output:

```
<Child1>1</Child1>
<Child2>2</Child2>
<!--a comment-->
<Child3>3</Child3>
<Child4>4</Child4>
mixed content
<Child5>5</Child5>
```

The following example creates an XML tree that contains a variety of types of nodes. It then enumerates through portions of the tree, printing the node types.

```csharp
XDocument xmlTree = new XDocument(
    new XComment("a comment"),
    new XProcessingInstruction("xml-stylesheet", "type=\"text/xsl\" href=\"hello.xsl\""),
    new XElement("Root",
        new XAttribute("Att", "attContent"),
        new XElement("Child1",
            new XCData("CDATA content")
        ),
        new XElement("Child2",
            new XText("Text content")
        )
    )
);

foreach (XNode node in xmlTree.Nodes())
{
    Console.WriteLine(node.NodeType);
    if (node.NodeType == XmlNodeType.Element)
    {
        foreach (XAttribute att in ((XElement)node).Attributes())
            Console.WriteLine(att.NodeType);
        foreach (XNode node2 in ((XElement)node).Nodes())
        {
            Console.WriteLine(node2.NodeType);
            if (node2.NodeType == XmlNodeType.Element)
                foreach (XNode node3 in ((XElement)node2).Nodes())
                    Console.WriteLine(node3.NodeType);
        }
    }
}
```

```vb
Dim xmlTree As XDocument = _
    <?xml version="1.0" encoding="utf-8"?>
    <!--a comment-->
    <?xml-stylesheet type='text/xsl' href='hello.xsl'?>
    <Root Att="attContent">
        <Child1>CDATA content]<![CDATA[]></Child1>
        <Child2>Text content</Child2>
    </Root>

' Note that XNode uses XmlNodeType, which is in the System.Xml namespace
For Each node In xmlTree.Nodes
    Console.WriteLine(node.NodeType.ToString())
    If node.NodeType = XmlNodeType.Element Then
        For Each att In DirectCast(node, XElement).Attributes
            Console.WriteLine(att.NodeType.ToString())
        Next
        For Each node2 In DirectCast (node, XElement).Nodes()
            Console.WriteLine(node2.NodeType.ToString())
            If node2.NodeType = XmlNodeType.Element Then
                For Each node3 In DirectCast (node2, XElement).Nodes
                    Console.WriteLine(node3.NodeType.ToString())
                Next
            End If
        Next
    End If
Next
```

This example produces the following output:

```
Comment
ProcessingInstruction
Element
Attribute
Element
CDATA
Element
Text
```

## XContainer.RemoveNodes() method

```csharp
public void RemoveNodes ();
```

Removes the child nodes from this document or element.

#### Remarks
If you call this method on an element that contains attributes, this method will not remove the attributes. To remove the attributes of an element, use `XElement.RemoveAttributes`.

The `Extensions.Remove` method has related functionality. It removes the child nodes of every node in a collection.

This method will raise the `Changed` and the `Changing` events.

#### Examples
The following example creates an XML tree that contains some child nodes. It then calls this method to remove the child nodes.

```csharp
XElement xmlTree = new XElement("Root",
    new XElement("Child1", 1),
    new XElement("Child2", 2),
    new XComment("a comment"),
    new XElement("Child3", 3),
    new XElement("Child4", 4),
    new XText("mixed content"),
    new XElement("Child5", 5)
);
xmlTree.RemoveNodes();
Console.WriteLine(xmlTree);
```

```vb
Dim xmltree As XElement = _
    <Root>
        <Child1>1</Child1>
        <Child2>2</Child2>
        <!--a comment-->
        <Child3>3</Child3>
        <Child4>4</Child4>mixed content<Child5>5</Child5>
    </Root>

xmltree.RemoveNodes()
Console.WriteLine(xmltree)
```

This example produces the following output:

```xml

```

## XContainer.ReplaceNodes(Object) method

```csharp
public void ReplaceNodes (object? content);
```

Replaces the children nodes of this document or element with the specified content.

Parameters:

- `content`: A content object containing simple content or a collection of content objects that replace the children nodes.

#### Remarks
For details about the valid content that can be passed to this function, see Valid Content of XElement and XDocument Objects.

This method will raise the `Changed` and the `Changing` events.

This method has snapshot semantics. It first creates a copy of the new content. It then removes all children nodes of this node. Finally, it adds the new content as children nodes. This means that you can replace children nodes using a query on the children nodes themselves.

#### Examples
The following example creates an XML tree that contains children nodes. It then replaces all of the children nodes with a single element.

To see an example of replacing the children nodes with the results of a LINQ query, see `XContainer.ReplaceNodes`.

```csharp
XElement root = new XElement("Root",
    new XElement("Child", 1),
    new XElement("Child", 2),
    new XElement("Child", 3),
    new XElement("Child", 4),
    new XElement("Child", 5)
);
root.ReplaceNodes(
    from el in root.Elements()
    where (int)el >= 3
    select el
);
Console.WriteLine(root);
```

```vb
Dim root As XElement = _
    <Root>
        <Child>1</Child>
        <Child>2</Child>
        <Child>3</Child>
        <Child>4</Child>
        <Child>5</Child>
    </Root>
root.ReplaceNodes( _
    From el In root.Elements _
    Where el.Value >= 3 _
    Select el)
Console.WriteLine(root)
```

This example produces the following output:

```xml
<Root>
  <Child>3</Child>
  <Child>4</Child>
  <Child>5</Child>
</Root>
```

## XContainer.ReplaceNodes(Object[]) method

```csharp
public void ReplaceNodes (params object?[] content);
```

Replaces the children nodes of this document or element with the specified content.

Parameters:

- `content`: A parameter list of content objects.

#### Remarks
For details about the valid content that can be passed to this function, see Valid Content of XElement and XDocument Objects.

This method will raise the `Changed` and the `Changing` events.

This method has snapshot semantics. It first creates a copy of the new content. It then removes all children nodes of this node. Finally, it adds the new content as children nodes. This means that you can replace children nodes using a query on the children nodes themselves.

#### Examples
The following example creates a dictionary and an XML tree. It then queries the dictionary, projects the results to an `IEnumerable<T>` of `XElement`, and replaces the contents of the XML tree with the results of the query.

```csharp
XElement root = new XElement("Root",
    new XElement("Child", 1),
    new XElement("Child", 2),
    new XElement("Child", 3),
    new XElement("Child", 4),
    new XElement("Child", 5)
);
root.ReplaceNodes(
    from el in root.Elements()
    where (int)el >= 3
    select el
);
Console.WriteLine(root);
```

```vb
Dim root As XElement = _
    <Root>
        <Child>1</Child>
        <Child>2</Child>
        <Child>3</Child>
        <Child>4</Child>
        <Child>5</Child>
    </Root>
root.ReplaceNodes( _
    From el In root.Elements _
    Where el.Value >= 3 _
    Select el)
Console.WriteLine(root)
```

This example produces the following output:

```xml
<Root>
  <Child>3</Child>
  <Child>4</Child>
  <Child>5</Child>
</Root>
```
