---
title: "XNode class (part 2 of 5)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Linq/XNode.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XNode class (part 2 of 5)

## XNode.AddBeforeSelf(Object) method

```csharp
public void AddBeforeSelf (object? content);
```

Adds the specified content immediately before this node.

Parameters:

- `content`: A content object that contains simple content or a collection of content objects to be added before this node.

Exceptions:

- `InvalidOperationException`: The parent is `null`.

#### Remarks
For details about the valid content that can be passed to this method, see Valid Content of XElement and XDocument Objects.

This method will raise the `Changed` and the `Changing` events.

The `XContainer` stores its child nodes as a singly-linked list of `XNode` objects. This means that the `XNode.AddBeforeSelf` method must traverse the list of direct child nodes under the parent container. Therefore, using this method might  affect your performance.

#### Examples
The following example uses this method to add an element into the tree.

```csharp
XElement xmlTree = new XElement("Root",
    new XElement("Child1", 1),
    new XElement("Child2", 2),
    new XElement("Child3", 3),
    new XElement("Child4", 4),
    new XElement("Child5", 5)
);
XElement child1 = xmlTree.Element("Child1");
child1.AddBeforeSelf(
    new XElement("NewChild", 10)
);
Console.WriteLine(xmlTree);
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

Dim child1 As XElement = xmlTree.<Child1>(0)
child1.AddBeforeSelf(New XElement("NewChild", 10))
Console.WriteLine(xmlTree)
```

This example produces the following output:

```xml
<Root>
  <NewChild>10</NewChild>
  <Child1>1</Child1>
  <Child2>2</Child2>
  <Child3>3</Child3>
  <Child4>4</Child4>
  <Child5>5</Child5>
</Root>
```

## XNode.AddBeforeSelf(Object[]) method

```csharp
public void AddBeforeSelf (params object?[] content);
```

Adds the specified content immediately before this node.

Parameters:

- `content`: A parameter list of content objects.

Exceptions:

- `InvalidOperationException`: The parent is `null`.

#### Remarks
For details about the valid content that can be passed to this method, see Valid Content of XElement and XDocument Objects.

This method will raise the `Changed` and the `Changing` events.

The `XContainer` stores its child nodes as a singly-linked list of `XNode` objects. This means that the `XNode.AddBeforeSelf` method must traverse the list of direct child nodes under the parent container. Therefore, using this function might affect your performance.

#### Examples
The following example uses a LINQ query to create an `IEnumerable<T>` of `XElement`, which it then passes to this method. This adds the results of a query to the tree in the desired location.

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
    new XElement("Child5", 5)
);
XElement child1 = xmlTree.Element("Child1");
child1.AddBeforeSelf(
    from el in srcTree.Elements()
    where (int)el > 3
    select el
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
        </Root>

Dim child1 As XElement = xmlTree.<Child1>(0)
child1.AddBeforeSelf( _
    From el In srcTree.Elements() _
    Where CInt(el) > 3 _
    Select el)

Console.WriteLine(xmlTree)
```

This example produces the following output:

```xml
<Root>
  <Element4>4</Element4>
  <Element5>5</Element5>
  <Child1>1</Child1>
  <Child2>2</Child2>
  <Child3>3</Child3>
  <Child4>4</Child4>
  <Child5>5</Child5>
</Root>
```

## XNode.Ancestors() method

```csharp
public System.Collections.Generic.IEnumerable<System.Xml.Linq.XElement> Ancestors ();
```

Returns a collection of the ancestor elements of this node.

Returns: An `IEnumerable<T>` of `XElement` of the ancestor elements of this node.

#### Remarks
This method does not return itself in the results.

The nodes in the returned collection are in reverse document order.

This method uses deferred execution.

#### Examples
The following example uses this method to enumerate the ancestors of a node.

```csharp
XElement xmlTree = new XElement("Root",
    new XElement("Child",
        new XElement("GrandChild", "content")
    )
);
IEnumerable<XElement> grandChild = xmlTree.Descendants("GrandChild");
foreach (XElement el in grandChild.Ancestors())
    Console.WriteLine(el.Name);
```

```vb
Dim xmlTree As XElement = _
        <Root>
            <Child>
                <GrandChild>content</GrandChild>
            </Child>
        </Root>

Dim grandChild As IEnumerable(Of XElement) = xmlTree...<GrandChild>
For Each el In grandChild.Ancestors()
    Console.WriteLine(el.Name)
Next
```

This example produces the following output:

```
Child
Root
```

## XNode.Ancestors(XName) method

```csharp
public System.Collections.Generic.IEnumerable<System.Xml.Linq.XElement> Ancestors (System.Xml.Linq.XName? name);
```

Returns a filtered collection of the ancestor elements of this node. Only elements that have a matching `XName` are included in the collection.

Parameters:

- `name`: The `XName` to match.

Returns: An `IEnumerable<T>` of `XElement` of the ancestor elements of this node. Only elements that have a matching `XName` are included in the collection.

The nodes in the returned collection are in reverse document order.

This method uses deferred execution.

#### Remarks
This method will not return itself in the results.

#### Examples
The following example uses this method.

```csharp
XElement xmlTree = new XElement("Root",
    new XElement("Child",
        new XElement("GrandChild", "content")
    )
);
IEnumerable<XElement> grandChild = xmlTree.Descendants("GrandChild");
foreach (XElement el in grandChild.Ancestors("Child"))
    Console.WriteLine(el.Name);
```

```vb
Dim xmlTree As XElement = _
        <Root>
            <Child>
                <GrandChild>content</GrandChild>
            </Child>
        </Root>

Dim grandChild As IEnumerable(Of XElement) = xmlTree...<GrandChild>
For Each el In grandChild.Ancestors("Child")
    Console.WriteLine(el.Name)
Next
```

This example produces the following output:

```
Child
```

## XNode.CompareDocumentOrder(XNode, XNode) method

```csharp
public static int CompareDocumentOrder (System.Xml.Linq.XNode? n1, System.Xml.Linq.XNode? n2);
```

Compares two nodes to determine their relative XML document order.

Parameters:

- `n1`: First `XNode` to compare.
- `n2`: Second `XNode` to compare.

Returns: An `int` containing 0 if the nodes are equal; -1 if `n1` is before `n2`; 1 if `n1` is after `n2`.

Exceptions:

- `InvalidOperationException`: The two nodes do not share a common ancestor.

#### Remarks
The `XContainer` stores its child nodes as a singly-linked list of `XNode` objects. This means that the `XNode.CompareDocumentOrder` method must traverse the ancestors of the two nodes being compared until it finds the common parent. Then it must traverse the list of the common parent's child nodes to determine the order of the two nodes being compared. Therefore, using this method might affect your performance.

#### Examples
The following example uses this method.

```csharp
XElement xmlTree = new XElement("Root",
    new XElement("Child1",
        new XElement("GrandChild1", 1),
        new XElement("GrandChild2", 2),
        new XElement("GrandChild3", 3)
    ),
    new XElement("Child2",
        new XElement("GrandChild4", 4),
        new XElement("GrandChild5", 5),
        new XElement("GrandChild6", 6)
    )
);
XElement el1 = xmlTree.Descendants("GrandChild2").First();
XElement el2 = xmlTree.Descendants("GrandChild6").First();
if (XElement.CompareDocumentOrder(el1, el2) == 0)
    Console.WriteLine("Compared elements are the same element");
else if (XElement.CompareDocumentOrder(el1, el2) > 0)
    Console.WriteLine("el1 is after el2");
else
    Console.WriteLine("el1 is before el2");
```

```vb
Dim xmlTree As XElement = _
        <Root>
            <Child1>
                <GrandChild1>1</GrandChild1>
                <GrandChild2>2</GrandChild2>
                <GrandChild3>3</GrandChild3>
            </Child1>
            <Child2>
                <GrandChild4>4</GrandChild4>
                <GrandChild5>5</GrandChild5>
                <GrandChild6>6</GrandChild6>
            </Child2>
        </Root>

Dim el1 As XElement = xmlTree...<GrandChild2>(0)
Dim el2 As XElement = xmlTree...<GrandChild6>(0)

If (XElement.CompareDocumentOrder(el1, el2) = 0) Then
    Console.WriteLine("Compared elements are the same element")
ElseIf (XElement.CompareDocumentOrder(el1, el2) > 0) Then
    Console.WriteLine("el1 is after el2")
Else
    Console.WriteLine("el1 is before el2")
End If
```

This example produces the following output:

```
el1 is before el2
```

## XNode.CreateReader() method

```csharp
public System.Xml.XmlReader CreateReader ();
```

Creates an `XmlReader` for this node.

Returns: An `XmlReader` that can be used to read this node and its descendants.

#### Remarks
You typically use this method when you have to supply another component with an `XmlReader`. For example, you can create an `XmlReader` from a LINQ to XML tree, and then pass that reader to `XmlDocument.Load`.

All of the readers returned by `XmlReader.Create` are normalizing readers. They always perform line break normalization and full normalization of attributes. In contrast, the `XmlReader` returned by `XNode.CreateReader` is not a normalizing reader. It does not transform any white space. It also returns attributes in the order that they were added, not in attribute name order.

LINQ to XML does not keep information about whether attributes are default attributes. `IsDefault` will always return false regardless of whether the attribute was populated from a default value or not.

The `PUBLIC` and `SYSTEM` pseudo attributes on `XDocumentType` are not available through the `XmlReader.MoveToAttribute` method. They are only available through the `XmlReader.GetAttribute` method that takes the qualified name of the attribute as a parameter. If you have to retrieve the `PUBLIC` or `SYSTEM` attributes, you should use the `XmlReader.GetAttribute` method.

Base64 and BinHex data are not supported. If you attempt to retrieve these types of data (for example, by calling `XmlReader.ReadElementContentAsBase64`), the reader will throw `NotSupportedException`.

The `xml` declaration is not surfaced by the reader. While reading, you will not encounter a node of type `XmlDeclaration`.

#### Examples
The following example creates an XML tree, creates an `XmlReader` by using the `XNode.CreateReader` method, and creates an `XmlDocument` by using the reader.

```csharp
XDocument xmlTree = new XDocument(
    new XElement("Root",
        new XAttribute("Att1", "Attribute Content"),
        new XElement("Child1", 1),
        new XElement("Child2", 2)
    )
);
XmlReader reader = xmlTree.CreateReader();
reader.MoveToContent();
XmlDocument doc = new XmlDocument();
XmlNode cd = doc.ReadNode(reader);
doc.AppendChild(cd);
Console.WriteLine(doc.OuterXml);
```

```vb
Dim xmlTree As XDocument =  _
    <?xml version="1.0" encoding="utf-8" standalone="yes"?>
        <Root Att1="Attribute Content">
            <Child1>1</Child1>
            <Child2>2</Child2>
        </Root>
Dim reader As XmlReader = xmlTree.CreateReader()
reader.MoveToContent()
Dim doc As XmlDocument = New XmlDocument()
Dim cd As XmlNode = doc.ReadNode(reader)
doc.AppendChild(cd)
Console.WriteLine(doc.OuterXml)
```

This example produces the following output:

```xml
<Root Att1="Attribute Content"><Child1>1</Child1><Child2>2</Child2></Root>
```

Another use for this method is to do an XSLT transformation. You can create an XML tree, create an `XmlReader` from the XML tree, create a new document, and create an `XmlWriter` that will write into the new document. Then, you can invoke the XSLT transformation, passing the `XmlReader` and `XmlWriter` to the transformation. After the transformation successfully completes, the new XML tree is populated with the results of the transform.

```csharp
string xslMarkup = @"<?xml version='1.0'?>
<xsl:stylesheet xmlns:xsl='http://www.w3.org/1999/XSL/Transform' version='1.0'>
    <xsl:template match='/Parent'>
        <Root>
            <C1>
            
            </C1>
            <C2>
            
            </C2>
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
                <C1>
                    
                </C1>
                <C2>
                    
                </C2>
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
