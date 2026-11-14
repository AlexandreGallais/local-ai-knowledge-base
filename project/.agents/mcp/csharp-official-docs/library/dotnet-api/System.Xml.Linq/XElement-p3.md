---
title: "XElement class (part 3 of 12)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Linq/XElement.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XElement class (part 3 of 12)

## XElement.HasAttributes property

```csharp
public bool HasAttributes { get; }
```

Gets a value indicating whether this element has at least one attribute.

Returns: `true` if this element has at least one attribute; otherwise `false`.

#### Examples
The following example uses this property.

```csharp
XElement xmlTree1 = new XElement("Root",
    new XAttribute("Att1", 1)
);
Console.WriteLine(xmlTree1.HasAttributes);
XElement xmlTree2 = new XElement("Root");
Console.WriteLine(xmlTree2.HasAttributes);
```

```vb
Dim xmlTree1 As XElement = 
Console.WriteLine(xmlTree1.HasAttributes)

Dim xmlTree2 As XElement = 
Console.WriteLine(xmlTree2.HasAttributes)
```

This example produces the following output:

```txt
True
False
```

## XElement.HasElements property

```csharp
public bool HasElements { get; }
```

Gets a value indicating whether this element has at least one child element.

Returns: `true` if this element has at least one child element; otherwise `false`.

#### Examples
The following example uses this property.

```csharp
XElement xmlTree1 = new XElement("Root",
    new XElement("Child", 1)
);
Console.WriteLine(xmlTree1.HasElements);
XElement xmlTree2 = new XElement("Root", "contents");
Console.WriteLine(xmlTree2.HasElements);
```

```vb
Dim xmlTree1 As XElement = _
        <Root>
            <Child>1</Child>
        </Root>
Console.WriteLine(xmlTree1.HasElements)

Dim xmlTree2 As XElement = <Root>contents</Root>
Console.WriteLine(xmlTree2.HasElements)
```

This example produces the following output:

```txt
True
False
```

## XElement.IsEmpty property

```csharp
public bool IsEmpty { get; }
```

Gets a value indicating whether this element contains no content.

Returns: `true` if this element contains no content; otherwise `false`.

#### Remarks
Note that an element that contains a start and end tag with no content between the tags is not considered to be an empty element. It has content with no length. Only an element that contains only a start tag, and is expressed as a terminated empty element, is considered to be empty.

#### Examples
The following example creates a variety of XML trees, and shows the value of this property with each tree.

```csharp
XElement el1 = new XElement("Root");
Console.WriteLine(el1);
Console.WriteLine(el1.IsEmpty);
Console.WriteLine();
XElement el2 = new XElement("Root", "content");
Console.WriteLine(el2);
Console.WriteLine(el2.IsEmpty);
Console.WriteLine();
XElement el3 = new XElement("Root", "");
Console.WriteLine(el3);
Console.WriteLine(el3.IsEmpty);
Console.WriteLine();
el3.ReplaceAll(null);
Console.WriteLine(el3);
Console.WriteLine(el3.IsEmpty);
```

```vb
Dim el1 As XElement = 
Console.WriteLine(el1)
Console.WriteLine(el1.IsEmpty)
Console.WriteLine()
Dim el2 As XElement = <Root>content</Root>
Console.WriteLine(el2)
Console.WriteLine(el2.IsEmpty)
Console.WriteLine()
Dim el3 As XElement = <Root></Root>
Console.WriteLine(el3)
Console.WriteLine(el3.IsEmpty)
Console.WriteLine()
el3.ReplaceAll(Nothing)
Console.WriteLine(el3)
Console.WriteLine(el3.IsEmpty)
```

This example produces the following output:

```txt

True

<Root>content</Root>
False

<Root></Root>
False

True
```

## XElement.LastAttribute property

```csharp
public System.Xml.Linq.XAttribute? LastAttribute { get; }
```

Gets the last attribute of this element.

Returns: An `XAttribute` that contains the last attribute of this element.

#### Remarks
Attributes are stored in the element in the order that they were added to the element.

#### Examples
The following example creates an XML tree with three attributes. It then writes the last attribute as output.

```csharp
XElement xmlTree = new XElement("Root",
    new XAttribute("Att1", 1),
    new XAttribute("Att2", 2),
    new XAttribute("Att3", 3)
);
Console.WriteLine(xmlTree.LastAttribute);
```

```vb
Dim xmlTree As XElement = 
Console.WriteLine(xmlTree.LastAttribute)
```

This example produces the following output:

```txt
Att3="3"
```

## XElement.Name property

```csharp
public System.Xml.Linq.XName Name { get; set; }
```

Gets or sets the name of this element.

Returns: An `XName` that contains the name of this element.

#### Remarks
Setting this property will raise the `Changed` and the `Changing` events.

#### Examples
The following example uses this property to determine the name of an element.

```csharp
XElement el1 = new XElement("Root", "content");
Console.WriteLine(el1.Name);

XNamespace ns = "http://www.adventure-works.com";
XElement el2 = new XElement(ns + "Root", "content");
Console.WriteLine(el2.Name);
Console.WriteLine(el2.Name.Namespace);
Console.WriteLine(el2.Name.LocalName);
el2.Name = ns + "NewName";
Console.WriteLine(el2.Name);
```

```vb
Imports <xmlns:aw="http://www.adventure-works.com">

Module Module1
    Sub Main()
        Dim el1 As XElement = <Root>content</Root>
        Console.WriteLine(el1.Name)

        Dim el2 As XElement = <aw:Root>content</aw:Root>
        Console.WriteLine(el2.Name)
        Console.WriteLine(el2.Name.Namespace)
        Console.WriteLine(el2.Name.LocalName)
        Dim aw as XNamespace = GetXmlNamespace(aw)
        el2.Name = aw + "NewName"
        Console.WriteLine(el2.Name)
    End Sub
End Module
```

This example produces the following output:

```txt
Root
{http://www.adventure-works.com}Root
http://www.adventure-works.com
Root
{http://www.adventure-works.com}NewName
```

## XElement.NodeType property

```csharp
public override System.Xml.XmlNodeType NodeType { get; }
```

Gets the node type for this node.

Returns: The node type. For `XElement` objects, this value is `XmlNodeType.Element`.

#### Remarks
Because all classes that derive from `XObject` contain a `NodeType` property, you can write code that operates on collections of concrete subclass of `XObject`. Your code can then test for the node type of each node in the collection.

#### Examples
The following example uses this property to print the node type of an element.

```csharp
XElement el1 = new XElement("Root", "content");
Console.WriteLine(el1.NodeType);
Console.WriteLine();
```

```vb
Dim el1 As XElement = <Root>content</Root>
Console.WriteLine(el1.NodeType.ToString())
Console.WriteLine()
```

This example produces the following output:

```txt
Element
```

## XElement.Value property

```csharp
public string Value { get; set; }
```

Gets or sets the concatenated text contents of this element.

Returns: A `String` that contains all of the text content of this element. If there are multiple text nodes, they will be concatenated.

#### Remarks
Using this property, you can get or set the value of an element.

Setting this property will raise the `Changed` and the `Changing` events.

If you want to get the value of an element but you are not sure that it exists, it is more convenient to use the explicit conversion operators, and assign the element to a nullable type such as `string` or `Nullable<T>` of `Int32`. If the element does not exist, the nullable type is set to `null`. By contrast, if you want to use this property, you must make sure that the `XContainer.Element` method does not return `null` before you access this property.

#### Examples
The following example uses this property to retrieve the text of an element with mixed content.

```csharp
XElement el = XElement.Parse("<Root>This is mixed content</Root>");
Console.WriteLine("{0}", el.Value);
```

```vb
Dim el As XElement = <Root>This is mixed content</Root>
Console.WriteLine("{0}", el.Value)
```

This example produces the following output:

```txt
This is mixed content
```

## XElement.AncestorsAndSelf() method

```csharp
public System.Collections.Generic.IEnumerable<System.Xml.Linq.XElement> AncestorsAndSelf ();
```

Returns a collection of elements that contain this element, and the ancestors of this element.

Returns: An `IEnumerable<T>` of `XElement` of elements that contain this element, and the ancestors of this element.

#### Remarks
The elements in the returned collection are in reverse document order.

This method uses deferred execution.

#### Examples
The following example creates an XML tree. It then finds the `GrandChild` element, and then prints the ancestors of it.

```csharp
XElement xmlTree = new XElement("Root",
    new XElement("Child",
        new XElement("GrandChild", "element content")
    )
);
XElement gc = xmlTree.Element("Child").Element("GrandChild");
IEnumerable<XElement> aas =
    from el in gc.AncestorsAndSelf()
    select el;
foreach (XElement el in aas)
    Console.WriteLine(el.Name);
```

```vb
Dim xmlTree As XElement = _
    <Root>
        <Child>
            <GrandChild>element content</GrandChild>
        </Child>
    </Root>

Dim GC As XElement = xmlTree.<Child>.<GrandChild>(0)

Dim aas As IEnumerable(Of XElement) = _
    From el In GC.AncestorsAndSelf() _
    Select el

For Each el In aas
    Console.WriteLine(el.Name)
Next
```

This example produces the following output:

```txt
GrandChild
Child
Root
```

## XElement.AncestorsAndSelf(XName) method

```csharp
public System.Collections.Generic.IEnumerable<System.Xml.Linq.XElement> AncestorsAndSelf (System.Xml.Linq.XName? name);
```

Returns a filtered collection of elements that contain this element, and the ancestors of this element. Only elements that have a matching `XName` are included in the collection.

Parameters:

- `name`: The `XName` to match.

Returns: An `IEnumerable<T>` of `XElement` that contain this element, and the ancestors of this element. Only elements that have a matching `XName` are included in the collection.

#### Remarks
The elements in the returned collection are in reverse document order.

This method uses deferred execution.

#### Examples
The following example uses this .

```csharp
XElement xmlTree = new XElement("Root",
    new XElement("Child",
        new XElement("GrandChild", "element content")
    )
);
XElement gc = xmlTree.Element("Child").Element("GrandChild");
IEnumerable<XElement> aas = gc.AncestorsAndSelf("Child");
foreach (XElement el in aas)
    Console.WriteLine(el.Name);
```

```vb
Dim xmlTree As XElement = _
    <Root>
        <Child>
            <GrandChild>element content</GrandChild>
        </Child>
    </Root>

Dim GC As XElement = xmlTree.<Child>.<GrandChild>(0)
Dim aas As IEnumerable(Of XElement) = GC.AncestorsAndSelf("Child")
For Each el In aas
    Console.WriteLine(el.Name)
Next
```

This example produces the following output:

```txt
Child
```

## XElement.Attribute(XName) method

```csharp
public System.Xml.Linq.XAttribute? Attribute (System.Xml.Linq.XName name);
```

Returns the `XAttribute` of this `XElement` that has the specified `XName`.

Parameters:

- `name`: The `XName` of the `XAttribute` to get.

Returns: An `XAttribute` that has the specified `XName`; `null` if there is no attribute with the specified name.

#### Remarks
Some axis methods return collections of elements or attributes. This method returns only a single attribute. Sometimes this is referred to as a *singleton* (in contrast to a *collection*).

Visual Basic users can use the integrated attribute axis to retrieve the value of an attribute with a specified name.

#### Examples
The following example creates an element with an attribute. It then retrieves the attribute using this method.

```csharp
XElement xmlTree = new XElement("Root",
    new XAttribute("Att", "attribute content")
);
XAttribute att = xmlTree.Attribute("Att");
Console.WriteLine(att);
```

```vb
Dim xmlTree As XElement = 

Dim att As XAttribute = xmlTree.Attribute("Att")
Console.WriteLine(att)
```

This example produces the following output:

```txt
Att="attribute content"
```

The following is the same example, but in this case the XML is in a namespace. For more information, see Work with XML Namespaces.

```csharp
XNamespace aw = "http://www.adventure-works.com";
XElement xmlTree = new XElement(aw + "Root",
    new XAttribute(XNamespace.Xmlns + "aw", "http://www.adventure-works.com"),
    new XAttribute(aw + "Att", "attribute content")
);
XAttribute att = xmlTree.Attribute(aw + "Att");
Console.WriteLine(att);
```

```vb
Imports <xmlns:aw="http://www.adventure-works.com">

Module Module1
    Sub Main()
        Dim xmlTree As XElement = 

        Dim att As XAttribute = xmlTree.Attribute(GetXmlNamespace(aw) + "Att")
        Console.WriteLine(att)
    End Sub
End Module
```

This example produces the following output:

```txt
aw:Att="attribute content"
```

## XElement.Attributes() method

```csharp
public System.Collections.Generic.IEnumerable<System.Xml.Linq.XAttribute> Attributes ();
```

Returns a collection of attributes of this element.

Returns: An `IEnumerable<T>` of `XAttribute` of attributes of this element.

#### Remarks
The attributes in the returned collection are in the order that they were added to the element. If the XML tree was parsed from XML, the attributes are returned in document order.

This method uses deferred execution.

#### Examples
The following example creates an element with two attributes. It then uses this  to retrieve all attributes of the element.

```csharp
XElement xmlTree = new XElement("Root",
    new XAttribute("Att1", "content1"),
    new XAttribute("Att2", "content2")
);
IEnumerable<XAttribute> attList =
    from at in xmlTree.Attributes()
    select at;
foreach (XAttribute att in attList)
    Console.WriteLine(att);
```

```vb
Dim xmlTree As XElement = 

Dim attList As IEnumerable(Of XAttribute) = _
From at In xmlTree.Attributes() _
Select at

For Each att In attList
    Console.WriteLine(att)
Next
```

This example produces the following output:

```txt
Att1="content1"
Att2="content2"
```

The following is the same example, but in this case the XML is in a namespace. For more information, see Work with XML Namespaces.

```csharp
XNamespace aw = "http://www.adventure-works.com";
XElement xmlTree = new XElement(aw + "Root",
    new XAttribute(aw + "Att1", "content1"),
    new XAttribute(aw + "Att2", "content2"),
    new XAttribute(XNamespace.Xmlns + "aw", "http://www.adventure-works.com")
);
IEnumerable<XAttribute> attList =
    from at in xmlTree.Attributes()
    select at;
foreach (XAttribute att in attList)
    Console.WriteLine(att);
```

```vb
Imports <xmlns:aw="http://www.adventure-works.com">

Module Module1
    Sub Main()
        Dim xmlTree As XElement = 

        Dim attList As IEnumerable(Of XAttribute) = _
            From at In xmlTree.Attributes() _
            Select at

        For Each att In attList
            Console.WriteLine(att)
        Next
    End Sub
End Module
```

This example produces the following output:

```txt
aw:Att1="content1"
aw:Att2="content2"
xmlns:aw="http://www.adventure-works.com"
```
