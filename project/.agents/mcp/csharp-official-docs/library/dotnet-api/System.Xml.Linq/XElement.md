---
title: "XElement class (part 1 of 12)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Linq/XElement.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XElement class

Namespace: `System.Xml.Linq`

```csharp
public class XElement : System.Xml.Linq.XContainer, System.Xml.Serialization.IXmlSerializable
```

Represents an XML element.  See XElement Class Overview and the Remarks section on this page for usage information and examples.

#### Remarks
This class represents an XML element, the fundamental XML construct.  See XElement Class Overview for other usage information.

An element has an `XName`, optionally one or more attributes, and can optionally contain content (for more information, see `XContainer.Nodes`).

An `XElement` can contain the following types of content:

-   `XElement`

-   `XComment`

-   `XProcessingInstruction`

-   `XText`

For details about the valid content of an `XElement`, see Valid Content of XElement and XDocument Objects.

`XElement` derives from `XContainer`, which derives from `XNode`.

Some `XElement` methods can be used from XAML. For more information, see LINQ to XML Dynamic Properties.

#### Thread safety

An `XElement` instance is safe for concurrent read operations as long as no thread modifies it. If the instance is modified, you must synchronize all access to it.

#### Examples
The following example creates an XML tree. The content of the new element comes from a LINQ query.

```csharp
XElement xmlTree1 = new XElement("Root",
    new XElement("Child1", 1),
    new XElement("Child2", 2),
    new XElement("Child3", 3),
    new XElement("Child4", 4),
    new XElement("Child5", 5),
    new XElement("Child6", 6)
);

XElement xmlTree2 = new XElement("Root",
    from el in xmlTree1.Elements()
    where((int)el >= 3 && (int)el <= 5)
    select el
);
Console.WriteLine(xmlTree2);
```

```vb
Dim xmlTree1 As XElement = _
        <Root>
            <Child1>1</Child1>
            <Child2>2</Child2>
            <Child3>3</Child3>
            <Child4>4</Child4>
            <Child5>5</Child5>
            <Child6>6</Child6>
        </Root>

Dim xmlTree2 As XElement = _
    <Root>
        <%= From el In xmlTree1.Elements() _
            Where el.Value >= 3 And el.Value <= 5 _
            Select el %>
    </Root>

Console.WriteLine(xmlTree2)
```

This example produces the following output:

```xml
<Root>
  <Child3>3</Child3>
  <Child4>4</Child4>
  <Child5>5</Child5>
</Root>
```

The following is the same example, but in this case the XML is in a namespace. For more information, see Work with XML Namespaces.

```csharp
XNamespace aw = "http://www.adventure-works.com";
XElement xmlTree1 = new XElement(aw + "Root",
    new XElement(aw + "Child1", 1),
    new XElement(aw + "Child2", 2),
    new XElement(aw + "Child3", 3),
    new XElement(aw + "Child4", 4),
    new XElement(aw + "Child5", 5),
    new XElement(aw + "Child6", 6)
);

XElement xmlTree2 = new XElement(aw + "Root",
    from el in xmlTree1.Elements()
    where((int)el >= 3 && (int)el <= 5)
    select el
);
Console.WriteLine(xmlTree2);
```

```vb
Imports <xmlns="http://www.adventure-works.com">

Module Module1
    Sub Main()
        Dim xmlTree1 As XElement = _
            <Root>
                <Child1>1</Child1>
                <Child2>2</Child2>
                <Child3>3</Child3>
                <Child4>4</Child4>
                <Child5>5</Child5>
                <Child6>6</Child6>
            </Root>

        Dim xmlTree2 As XElement = _
            <Root>
                <%= From el In xmlTree1.Elements() _
                    Where el.Value >= 3 And el.Value <= 5 _
                    Select el %>
            </Root>

        Console.WriteLine(xmlTree2)
    End SUb
End Module
```

This example produces the following output:

```xml
<Root xmlns="http://www.adventure-works.com">
  <Child3>3</Child3>
  <Child4>4</Child4>
  <Child5>5</Child5>
</Root>
```

## XElement.XElement(XElement) constructor

```csharp
public XElement (System.Xml.Linq.XElement other);
```

Initializes a new instance of the `XElement` class from another `XElement` object.

Parameters:

- `other`: An `XElement` object to copy from.

#### Remarks
This constructor makes a deep copy of an element.

#### Examples
The following example creates an XML tree, creates a clone of the tree, and then calls `XNode.DeepEquals`, which tests whether the two XML trees are equal.

```csharp
XElement xmlTree = new XElement("Root",
    new XAttribute("Att1", 1),
    new XElement("Child1", 1),
    new XElement("Child2", 2)
);

// Create a clone of the tree.
XElement treeClone = new XElement(xmlTree);

Console.WriteLine("xmlTree = treeClone: {0}", XNode.DeepEquals(xmlTree, treeClone));

// Do some work with xmlTree, perhaps pass it to other methods.
xmlTree.Add(new XElement("Child3", 3));

Console.WriteLine("xmlTree = treeClone: {0}", XNode.DeepEquals(xmlTree, treeClone));
```

```vb
Dim xmlTree As XElement = _
        <Root Att1="1">
            <Child1>1</Child1>
            <Child2>2</Child2>
        </Root>

' Create a clone of the tree.
Dim treeClone As XElement = New XElement(xmlTree)

Console.WriteLine("xmlTree = treeClone: {0}", XNode.DeepEquals(xmlTree, treeClone))

' Do some work with xmlTree, perhaps pass it to other methods.
xmlTree.Add(New XElement("Child3", 3))

Console.WriteLine("xmlTree = treeClone: {0}", XNode.DeepEquals(xmlTree, treeClone))
```

This example produces the following output:

```txt
xmlTree = treeClone: True
xmlTree = treeClone: False
```

## XElement.XElement(XName) constructor

```csharp
public XElement (System.Xml.Linq.XName name);
```

Initializes a new instance of the `XElement` class with the specified name.

Parameters:

- `name`: An `XName` that contains the name of the element.

#### Remarks
This constructor creates an element with no content and no attributes.

There is an implicit conversion from string to `XName`. Typical use of this constructor is to specify a string as the parameter instead of creating a new `XName`. When creating an element in a namespace, typical use is to use the addition operator overload with an `XNamespace` and a string to create an `XName`. For more information, see Work with XML Namespaces.

#### Examples
The following example creates an element with no content.

```csharp
XElement el = new XElement("Root");
Console.WriteLine(el);
```

```vb
Dim el As XElement = 
Console.WriteLine(el)
```

This example produces the following output:

```xml

```

The following example creates an element in a namespace with no content. For more information, see Work with XML Namespaces.

```csharp
XNamespace aw = "http://www.adventure-works.com";
XElement root = new XElement(aw + "Root");
Console.WriteLine(root);
```

```vb
Imports <xmlns="http://www.adventure-works.com">

Module Module1
    Sub Main()
        Dim root = 
        Console.WriteLine(root)
    End Sub
End Module
```

This example produces the following output:

```xml

```

## XElement.XElement(XStreamingElement) constructor

```csharp
public XElement (System.Xml.Linq.XStreamingElement other);
```

Initializes a new instance of the `XElement` class from an `XStreamingElement` object.

Parameters:

- `other`: An `XStreamingElement` that contains unevaluated queries that will be iterated for the contents of this `XElement`.

#### Remarks
This constructor iterates through the contents of the specified `XStreamingElement`, and creates an element with its contents.

#### Examples
The following example creates a source XML tree, and then creates an `XStreamingElement` from a query on the source XML tree. It then serializes the `XStreamingElement` to the console, adds a new element to the source XML tree, and then serializes the `XStreamingElement` again. You can see that element newly added to the source XML tree is not included in the first serialization, but is included in the second.

```csharp
XElement src = new XElement("Root",
                   new XElement("Child1", 1),
                   new XElement("Child2", 2),
                   new XElement("Child3", 3)
               );
XStreamingElement xse = new XStreamingElement("NewRoot",
                            from el in src.Elements()
                            where (int)el >= 2
                            select el
                        );
Console.WriteLine(xse);
src.Add(new XElement("Child4", 4));
Console.WriteLine("----");
Console.WriteLine(xse);
```

```vb
Dim src As XElement = _
        <Root>
            <Child1>1</Child1>
            <Child2>2</Child2>
            <Child3>3</Child3>
        </Root>
Dim xse As XStreamingElement = New XStreamingElement("NewRoot", _
        From el In src.Elements() _
        Where (CInt(el) >= 2) _
        Select el _
)
Console.WriteLine(xse)
src.Add(New XElement("Child4", 4))
Console.WriteLine("----")
Console.WriteLine(xse)
```

This example produces the following output:

```xml
<NewRoot>
  <Child2>2</Child2>
  <Child3>3</Child3>
</NewRoot>
----
<NewRoot>
  <Child2>2</Child2>
  <Child3>3</Child3>
  <Child4>4</Child4>
</NewRoot>
```
