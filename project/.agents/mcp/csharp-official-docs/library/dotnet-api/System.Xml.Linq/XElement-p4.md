---
title: "XElement class (part 4 of 12)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Linq/XElement.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XElement class (part 4 of 12)

## XElement.Attributes(XName) method

```csharp
public System.Collections.Generic.IEnumerable<System.Xml.Linq.XAttribute> Attributes (System.Xml.Linq.XName? name);
```

Returns a filtered collection of attributes of this element. Only attributes that have a matching `XName` are included in the collection.

Parameters:

- `name`: The `XName` to match.

Returns: An `IEnumerable<T>` of `XAttribute` that contains the attributes of this element. Only attributes that have a matching `XName` are included in the collection.

#### Remarks
Attribute names must be unique within an element. Therefore, this  can return either a collection that contains only one attribute, or it can return an empty collection.

This method uses deferred execution.

#### Examples
The following example uses this .

```csharp
XElement xmlTree = new XElement("Root",
    new XAttribute("Att1", "content1"),
    new XAttribute("Att2", "content2")
);
IEnumerable<XAttribute> attList = xmlTree.Attributes("Att1");
foreach (XAttribute att in attList)
    Console.WriteLine(att);
```

```vb
Dim xmlTree As XElement = 

Dim attList As IEnumerable(Of XAttribute) = xmlTree.Attributes("Att1")

For Each att In attList
    Console.WriteLine(att)
Next
```

This example produces the following output:

```txt
Att1="content1"
```

The following is the same example, but in this case the XML is in a namespace. For more information, see Work with XML Namespaces.

```csharp
XNamespace aw = "http://www.adventure-works.com";
XElement xmlTree = new XElement(aw + "Root",
    new XAttribute(XNamespace.Xmlns + "aw", "http://www.adventure-works.com"),
    new XAttribute(aw + "Att1", "content1"),
    new XAttribute(aw + "Att2", "content2")
);
IEnumerable<XAttribute> attList = xmlTree.Attributes(aw + "Att1");
foreach (XAttribute att in attList)
    Console.WriteLine(att);
```

```vb
Imports <xmlns:aw="http://www.adventure-works.com">

Module Module1
    Sub Main()
        Dim xmlTree As XElement = 

        Dim attList As IEnumerable(Of XAttribute) = xmlTree.Attributes(GetXmlNamespace(aw) + "Att1")

        For Each att In attList
            Console.WriteLine(att)
        Next
    End Sub
End Module
```

This example produces the following output:

```txt
aw:Att1="content1"
```

## XElement.DescendantNodesAndSelf() method

```csharp
public System.Collections.Generic.IEnumerable<System.Xml.Linq.XNode> DescendantNodesAndSelf ();
```

Returns a collection of nodes that contain this element, and all descendant nodes of this element, in document order.

Returns: An `IEnumerable<T>` of `XNode` that contain this element, and all descendant nodes of this element, in document order.

#### Remarks
This method uses deferred execution.

#### Examples
The following example creates an XML tree, and then uses this .

```csharp
XElement xmlTree = new XElement("Root",
    // Attributes are not nodes, so will not be returned by DescendantNodesAndSelf.
    new XAttribute("Att1", "AttributeContent"),
    new XElement("Child",
        new XText("Some text"),
        new XElement("GrandChild", "element content")
    )
);
IEnumerable<XNode> dnas =
    from node in xmlTree.DescendantNodesAndSelf()
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
Dim xmlTree As XElement = _
    <Root Att1="AttributeContent">
        <Child>Some text<GrandChild>element content</GrandChild>
        </Child>
    </Root>

Dim dnas As IEnumerable(Of XNode) = _
    From node In xmlTree.DescendantNodesAndSelf() _
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

```txt
Root
Child
Some text
GrandChild
element content
```

## XElement.DescendantsAndSelf() method

```csharp
public System.Collections.Generic.IEnumerable<System.Xml.Linq.XElement> DescendantsAndSelf ();
```

Returns a collection of elements that contain this element, and all descendant elements of this element, in document order.

Returns: An `IEnumerable<T>` of `XElement` of elements that contain this element, and all descendant elements of this element, in document order.

#### Remarks
This method uses deferred execution.

#### Examples
The following example creates an XML tree, and then uses this .

```csharp
XElement xmlTree = new XElement("Root",
    new XAttribute("Att1", "AttributeContent"),
    new XElement("Child",
        new XText("Some text"),
        new XElement("GrandChild", "element content")
    )
);
IEnumerable<XElement> das =
    from el in xmlTree.DescendantsAndSelf()
    select el;
foreach (XElement el in das)
    Console.WriteLine(el.Name);
```

```vb
Dim xmlTree As XElement = _
    <Root Att1="AttributeContent">
        <Child>Some text
            <GrandChild>element content</GrandChild>
        </Child>
    </Root>

Dim das As IEnumerable(Of XElement) = _
    From el In xmlTree.DescendantsAndSelf() _
    Select el

For Each el In das
    Console.WriteLine(el.Name)
Next
```

This example produces the following output:

```txt
Root
Child
GrandChild
```

## XElement.DescendantsAndSelf(XName) method

```csharp
public System.Collections.Generic.IEnumerable<System.Xml.Linq.XElement> DescendantsAndSelf (System.Xml.Linq.XName? name);
```

Returns a filtered collection of elements that contain this element, and all descendant elements of this element, in document order. Only elements that have a matching `XName` are included in the collection.

Parameters:

- `name`: The `XName` to match.

Returns: An `IEnumerable<T>` of `XElement` that contain this element, and all descendant elements of this element, in document order. Only elements that have a matching `XName` are included in the collection.

#### Remarks
This method uses deferred execution.

#### Examples
The following example creates an XML tree, and then uses this .

```csharp
XElement xmlTree = new XElement("Root",
    new XAttribute("Att1", "AttributeContent"),
    new XElement("Child",
        new XText("Some text"),
        new XElement("GrandChild", "element content")
    )
);
IEnumerable<XElement> das = xmlTree.DescendantsAndSelf("Child");
foreach (XElement el in das)
    Console.WriteLine(el.Name);
```

```vb
Dim xmlTree As XElement = _
    <Root Att1="AttributeContent">
        <Child>Some text
            <GrandChild>element content</GrandChild>
        </Child>
    </Root>

Dim das As IEnumerable(Of XElement) = xmlTree.DescendantsAndSelf("Child")

For Each el In das
    Console.WriteLine(el.Name)
Next
```

This example produces the following output:

```txt
Child
```

## XElement.GetDefaultNamespace() method

```csharp
public System.Xml.Linq.XNamespace GetDefaultNamespace ();
```

Gets the default `XNamespace` of this `XElement`.

Returns: An `XNamespace` that contains the default namespace of this `XElement`.

#### Remarks
Namespace declarations may be persisted as attributes in the XML tree. These special attributes declare namespaces, including default namespaces. This method finds the namespace declaration that declares the default namespace, if there is one, and returns the `XNamespace` for the default namespace.

If there is no attribute that declares the default namespace, then this method returns `None`.

When creating XML trees using C#, even if an XML tree would be serialized with a default namespace, if the namespace is not persisted in the XML tree as an attribute, this method will not report the namespace as the default namespace.

When creating XML trees using Visual Basic and XML literals, if you create the XML in a default namespace using the Imports statement, then a namespace attribute will be created in the tree by the Visual Basic <example-value>, and this method will report that namespace.

#### Examples
The following example creates an XML tree that has a default namespace. It then uses this method to retrieve the default namespace.

```csharp
String xml = "";
XElement e = XElement.Parse(xml);
Console.WriteLine("Default namespace: {0}", e.GetDefaultNamespace());
```

```vb
Imports <xmlns="http://www.adventure-works.com">

Module Module1
    Sub Main()
        Dim e As XElement = 
        Console.WriteLine("Default namespace: {0}", e.GetDefaultNamespace())
    End Sub
End Module
```

This example produces the following output:

```txt
Default namespace: http://www.adventure-works.com
```

## XElement.GetNamespaceOfPrefix(String) method

```csharp
public System.Xml.Linq.XNamespace? GetNamespaceOfPrefix (string prefix);
```

Gets the namespace associated with a particular prefix for this `XElement`.

Parameters:

- `prefix`: A string that contains the namespace prefix to look up.

Returns: An `XNamespace` for the namespace associated with the prefix for this `XElement`.

#### Remarks
This method looks through the XML tree for namespace attributes that are in scope for this element. Namespace prefixes are specified in namespace attributes that are in the XML tree.

#### Examples
The following example creates an XML tree that has a namespace with an associated prefix. It then uses this method to retrieve the `XNamespace` for the prefix.

```csharp
XElement xmlTree = XElement.Parse("");
XNamespace awNamespace = xmlTree.GetNamespaceOfPrefix("aw");
Console.WriteLine("Namespace: {0}", awNamespace);
```

When using Visual Basic, you would typically use the GetXmlNamespace Operator operator, as follows

```vb
Imports <xmlns:aw="http://www.adventure-works.com">

Module Module1
    Sub Main()
        Dim xmlTree As XElement = 
        Dim awNamespace As XNamespace = GetXmlNamespace(aw)
        Console.WriteLine("Namespace: {0}", awNamespace)
    End Sub
End Module
```

This example produces the following output:

```txt
Namespace: http://www.adventure-works.com
```

## XElement.GetPrefixOfNamespace(XNamespace) method

```csharp
public string? GetPrefixOfNamespace (System.Xml.Linq.XNamespace ns);
```

Gets the prefix associated with a namespace for this `XElement`.

Parameters:

- `ns`: An `XNamespace` to look up.

Returns: A `String` that contains the namespace prefix.

#### Remarks
This method looks through the XML tree for namespace attributes that are in scope for this element. Namespace prefixes are specified in namespace attributes that are in the XML tree.

If the namespace is the default namespace, and there is no prefix for the namespace, then this method returns null.

#### Examples
The following example creates an XML tree that contains a namespace with a prefix. It then uses this method to retrieve the prefix for the namespace. Notice that this example uses the implicit conversion from string to `XNamespace` when calling this method.

```csharp
XElement xmlTree = XElement.Parse("");
string prefix = xmlTree.GetPrefixOfNamespace("http://www.adventure-works.com");
Console.WriteLine("Prefix: {0}", prefix);
```

```vb
Imports <xmlns:aw="http://www.adventure-works.com">

Module Module1
    Sub Main()
        Dim xmlTree As XElement = 
        Dim prefix As String = xmlTree.GetPrefixOfNamespace("http://www.adventure-works.com")
        Console.WriteLine("Prefix: {0}", prefix)
    End Sub
End Module
```

This example produces the following output:

```txt
Prefix: aw
```

## XElement.Load(Stream) method

```csharp
public static System.Xml.Linq.XElement Load (System.IO.Stream stream);
```

Creates a new `XElement` instance by using the specified stream.

Parameters:

- `stream`: The stream that contains the XML data.

Returns: An `XElement` object used to read the data that is contained in the stream.

#### Remarks
If you want to control load options, use the `XElement.Load` overload that takes `LoadOptions` as a parameter.

LINQ to XML's loading functionality is built upon `XmlReader`. Therefore, you might catch any exceptions that are thrown by the `XmlReader.Create` overload methods and the `XmlReader` methods that read and parse the document.

If you have to modify `XmlReaderSettings`, following these steps:

1.  Create an `XmlReader` by calling one of the `XmlReader.Create` overloads that take `XmlReaderSettings` as a parameter.

2.  Pass the `XmlReader` to one of the `XElement`'s `XElement.Load` overloads that takes `XmlReader` as a parameter.

## XElement.Load(TextReader) method

```csharp
public static System.Xml.Linq.XElement Load (System.IO.TextReader textReader);
```

Loads an `XElement` from a `TextReader`.

Parameters:

- `textReader`: A `TextReader` that will be read for the `XElement` content.

Returns: An `XElement` that contains the XML that was read from the specified `TextReader`.

#### Remarks
This method reads the raw XML into the XML tree. It discards all insignificant white space in the file.

LINQ to XML's loading functionality is built upon `XmlReader`. Therefore, you might catch any exceptions that are thrown by the `XmlReader.Create` overload methods and the `XmlReader` methods that read and parse the document.

#### Examples
The following example loads an element from a `StringReader`.

```csharp
TextReader sr = new StringReader("<Root></Root>");
XElement xmlTree = XElement.Load(sr);
sr.Close();
Console.WriteLine(xmlTree);
```

```vb
Dim sr As TextReader = New StringReader("<Root></Root>")
Dim xmlTree As XElement = XElement.Load(sr)
sr.Close()
Console.WriteLine(xmlTree)
```

This example produces the following output:

```xml
<Root>
  
</Root>
```

## XElement.Load(String) method

```csharp
public static System.Xml.Linq.XElement Load (string uri);
```

Loads an `XElement` from a file.

Parameters:

- `uri`: A URI string referencing the file to load into a new `XElement`.

Returns: An `XElement` that contains the contents of the specified file.

#### Remarks
This method reads the raw XML into the XML tree. It discards all insignificant white space in the file.

LINQ to XML's loading functionality is built upon `XmlReader`. Therefore, you might catch any exceptions that are thrown by the `XmlReader.Create` overload methods and the `XmlReader` methods that read and parse the document.

#### Examples
The following example creates an XML tree, saves it to a file, and then uses this method to load the `XElement` from the file.

```csharp
XElement xmlTree1 = new XElement("Root",
    new XElement("Child", "content")
);
xmlTree1.Save("Tree.xml");

XElement xmlTree2 = XElement.Load("Tree.xml");
Console.WriteLine(xmlTree2.Name);
```

```vb
Dim xmlTree1 As XElement = _
        <Root>
            <Child>Content</Child>
        </Root>
xmlTree1.Save("Tree.xml")

Dim xmlTree2 As XElement = XElement.Load("Tree.xml")
Console.WriteLine(xmlTree2.Name)
```

This example produces the following output:

```txt
Root
```
