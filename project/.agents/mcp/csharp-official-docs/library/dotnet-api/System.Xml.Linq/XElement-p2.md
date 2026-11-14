---
title: "XElement class (part 2 of 12)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Linq/XElement.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XElement class (part 2 of 12)

## XElement.XElement(XName, Object) constructor

```csharp
public XElement (System.Xml.Linq.XName name, object? content);
```

Initializes a new instance of the `XElement` class with the specified name and content.

Parameters:

- `name`: An `XName` that contains the element name.
- `content`: The contents of the element.

#### Remarks
This constructor creates an element with the specified content and attributes.

There is an implicit conversion from string to `XName`. Typical use of this constructor is to specify a string as the parameter instead of creating a new `XName`.

When creating an element in a namespace, typical use is to use the addition operator overload with an `XNamespace` and a string to create an `XName`. For more information, see Work with XML Namespaces.

For details about the valid content that can be passed to this constructor, see Valid Content of XElement and XDocument Objects.

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

The following example creates an XML tree with a variety of types of content.

```csharp
XElement root;

// String content:
root = new XElement("Root", "Some text");
Console.WriteLine(root);

// XElement object content:
root = new XElement("Root",
    new XElement("NewChild", "n")
);
Console.WriteLine(root);

// XAttribute object content:
root = new XElement("Root",
    new XAttribute("NewAttribute", "n")
);
Console.WriteLine(root);

// Double content:
double dbl = 12.345;
root = new XElement("Root", dbl);
Console.WriteLine(root);

// DateTime content:
DateTime dt = new DateTime(2006, 10, 6, 12, 30, 00);
root = new XElement("Root", dt);
Console.WriteLine(root);

// String array content:
// Any collection other than a collection of XElement or XAttribute objects
// are converted to strings. The strings are concatenated and added.
string[] stringArray = {
    "abc",
    "def",
    "ghi"
};
root = new XElement("Root", stringArray);
Console.WriteLine(root);

// XElement object array content:
XElement[] ellArray = {
    new XElement("NewChild1", 1),
    new XElement("NewChild2", 2),
    new XElement("NewChild3", 3)
};
root = new XElement("Root", ellArray);
Console.WriteLine(root);

// XAttribute object array content:
XAttribute[] attArray = {
    new XAttribute("NewAtt1", 1),
    new XAttribute("NewAtt2", 2),
    new XAttribute("NewAtt3", 3)
};
root = new XElement("Root", attArray);
Console.WriteLine(root);
```

```vb
Dim root As XElement

' String content:
root = <Root>Some text</Root>
Console.WriteLine(root)

' XElement object content:
root = <Root>
           <NewChild>n</NewChild>
       </Root>
Console.WriteLine(root)

' XAttribute object content:
root = 
Console.WriteLine(root)

' Double content:
Dim dbl As Double = 12.345
root = <Root><%= dbl %></Root>
Console.WriteLine(root)

' DateTime content:
Dim dt As DateTime = New DateTime(2006, 10, 6, 12, 30, 0)
root = <Root><%= dt %></Root>
Console.WriteLine(root)

' String array content:
' Any collection other than a collection of XElement or XAttribute objects
' are converted to strings. The strings are concatenated and added.

Dim stringArray As String() = { _
    "abc", _
    "def", _
    "ghi" _
}
root = <Root><%= stringArray %></Root>
Console.WriteLine(root)

' XElement object array content:
Dim ellArray As XElement() = { _
    <NewChild1>1</NewChild1>, _
    <NewChild2>2</NewChild2>, _
    <NewChild3>3</NewChild3> _
}

root = <Root><%= ellArray %></Root>
Console.WriteLine(root)

' XAttribute object array content
Dim attArray As XAttribute() = { _
    New XAttribute("NewAtt1", 1), _
    New XAttribute("NewAtt2", 2), _
    New XAttribute("NewAtt3", 3) _
}
root = <Root><%= attArray %></Root>
Console.WriteLine(root)
```

This example produces the following output:

```xml
<Root>Some text</Root>
<Root>
  <NewChild>n</NewChild>
</Root>

<Root>12.345</Root>
<Root>2006-10-06T12:30:00</Root>
<Root>abcdefghi</Root>
<Root>
  <NewChild1>1</NewChild1>
  <NewChild2>2</NewChild2>
  <NewChild3>3</NewChild3>
</Root>

```

The following example creates an XML tree in a namespace.

```csharp
// Create an XML tree in a namespace.
XNamespace aw = "http://www.adventure-works.com";
XElement root = new XElement(aw + "Root",
    new XElement(aw + "Child", "child content")
);
Console.WriteLine(root);
```

```vb
' Create an XML tree in a namespace.
Dim root As XElement = _
    <Root xmlns='http://www.adventure-works.com'>
        <Child>child content</Child>
    </Root>
Console.WriteLine(root)
```

This example produces the following output:

```xml
<Root xmlns="http://www.adventure-works.com">
  <Child>child content</Child>
</Root>
```

The following example creates an XML tree with nested namespaces.

```csharp
// Create an XML tree with nested namespaces.
XNamespace aw = "http://www.adventure-works.com";
XNamespace fc = "www.fourthcoffee.com";
XDocument root = new XDocument(
    new XDeclaration("1.0", "utf-8", "yes"),
    new XElement(aw + "Root",
        new XElement(fc + "Child",
            new XElement(aw + "DifferentChild", "other content")
        )
    )
);
Console.WriteLine(root);
```

```vb
' Create an XML tree with nested namespaces.
Dim root As XDocument = _
    <?xml version='1.0'?>
    <Root xmlns='http://www.adventure-works.com'>
        <Child xmlns='www.fourthcoffee.com'>
        <DifferentChild xmlns='http://www.adventure-works.com'>other content</DifferentChild>
        </Child>
    </Root>
Console.WriteLine(root)
```

This example produces the following output:

```xml
<Root xmlns="http://www.adventure-works.com">
  <Child xmlns="www.fourthcoffee.com">
    <DifferentChild xmlns="http://www.adventure-works.com">other content</DifferentChild>
  </Child>
</Root>
```

## XElement.XElement(XName, Object[]) constructor

```csharp
public XElement (System.Xml.Linq.XName name, params object?[] content);
```

Initializes a new instance of the `XElement` class with the specified name and content.

Parameters:

- `name`: An `XName` that contains the element name.
- `content`: The initial content of the element.

#### Remarks
This constructor creates an element with the specified content and attributes.

There is an implicit conversion from string to `XName`. Typical use of this constructor is to specify a string as the parameter instead of creating a new `XName`.

When creating an element in a namespace, typical use is to use the addition operator overload with an `XNamespace` and a string to create an `XName`. For more information, see Work with XML Namespaces.

For details about the valid content that can be passed to this constructor, see Valid Content of XElement and XDocument Objects.

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

The following example creates an XML tree with a variety of types of content.

```csharp
XElement root;

// String content:
root = new XElement("Root", "Some text");
Console.WriteLine(root);

// XElement object content:
root = new XElement("Root",
    new XElement("NewChild", "n")
);
Console.WriteLine(root);

// XAttribute object content:
root = new XElement("Root",
    new XAttribute("NewAttribute", "n")
);
Console.WriteLine(root);

// Double content:
double dbl = 12.345;
root = new XElement("Root", dbl);
Console.WriteLine(root);

// DateTime content:
DateTime dt = new DateTime(2006, 10, 6, 12, 30, 00);
root = new XElement("Root", dt);
Console.WriteLine(root);

// String array content:
// Any collection other than a collection of XElement or XAttribute objects
// are converted to strings. The strings are concatenated and added.
string[] stringArray = {
    "abc",
    "def",
    "ghi"
};
root = new XElement("Root", stringArray);
Console.WriteLine(root);

// XElement object array content:
XElement[] ellArray = {
    new XElement("NewChild1", 1),
    new XElement("NewChild2", 2),
    new XElement("NewChild3", 3)
};
root = new XElement("Root", ellArray);
Console.WriteLine(root);

// XAttribute object array content:
XAttribute[] attArray = {
    new XAttribute("NewAtt1", 1),
    new XAttribute("NewAtt2", 2),
    new XAttribute("NewAtt3", 3)
};
root = new XElement("Root", attArray);
Console.WriteLine(root);
```

```vb
Dim root As XElement

' String content:
root = <Root>Some text</Root>
Console.WriteLine(root)

' XElement object content:
root = <Root>
           <NewChild>n</NewChild>
       </Root>
Console.WriteLine(root)

' XAttribute object content:
root = 
Console.WriteLine(root)

' Double content:
Dim dbl As Double = 12.345
root = <Root><%= dbl %></Root>
Console.WriteLine(root)

' DateTime content:
Dim dt As DateTime = New DateTime(2006, 10, 6, 12, 30, 0)
root = <Root><%= dt %></Root>
Console.WriteLine(root)

' String array content:
' Any collection other than a collection of XElement or XAttribute objects
' are converted to strings. The strings are concatenated and added.

Dim stringArray As String() = { _
    "abc", _
    "def", _
    "ghi" _
}
root = <Root><%= stringArray %></Root>
Console.WriteLine(root)

' XElement object array content:
Dim ellArray As XElement() = { _
    <NewChild1>1</NewChild1>, _
    <NewChild2>2</NewChild2>, _
    <NewChild3>3</NewChild3> _
}

root = <Root><%= ellArray %></Root>
Console.WriteLine(root)

' XAttribute object array content
Dim attArray As XAttribute() = { _
    New XAttribute("NewAtt1", 1), _
    New XAttribute("NewAtt2", 2), _
    New XAttribute("NewAtt3", 3) _
}
root = <Root><%= attArray %></Root>
Console.WriteLine(root)
```

This example produces the following output:

```xml
<Root>Some text</Root>
<Root>
  <NewChild>n</NewChild>
</Root>

<Root>12.345</Root>
<Root>2006-10-06T12:30:00</Root>
<Root>abcdefghi</Root>
<Root>
  <NewChild1>1</NewChild1>
  <NewChild2>2</NewChild2>
  <NewChild3>3</NewChild3>
</Root>

```

The following example creates an XML tree in a namespace.

```csharp
// Create an XML tree in a namespace.
XNamespace aw = "http://www.adventure-works.com";
XElement root = new XElement(aw + "Root",
    new XElement(aw + "Child", "child content")
);
Console.WriteLine(root);
```

```vb
' Create an XML tree in a namespace.
Dim root As XElement = _
    <Root xmlns='http://www.adventure-works.com'>
        <Child>child content</Child>
    </Root>
Console.WriteLine(root)
```

This example produces the following output:

```xml
<Root xmlns="http://www.adventure-works.com">
  <Child>child content</Child>
</Root>
```

The following example creates an XML tree with nested namespaces.

```csharp
// Create an XML tree with nested namespaces.
XNamespace aw = "http://www.adventure-works.com";
XNamespace fc = "www.fourthcoffee.com";
XElement root = new XElement(aw + "Root",
    new XElement(fc + "Child",
        new XElement(aw + "DifferentChild", "other content")
    )
);
Console.WriteLine(root);
```

```vb
' Create an XML tree with nested namespaces.
Dim root As XDocument = _
    <?xml version='1.0'?>
    <Root xmlns='http://www.adventure-works.com'>
        <Child xmlns='www.fourthcoffee.com'>
        <DifferentChild xmlns='http://www.adventure-works.com'>other content</DifferentChild>
        </Child>
    </Root>
Console.WriteLine(root)
```

This example produces the following output:

```xml
<Root xmlns="http://www.adventure-works.com">
  <Child xmlns="www.fourthcoffee.com">
    <DifferentChild xmlns="http://www.adventure-works.com">other content</DifferentChild>
  </Child>
</Root>
```

## XElement.EmptySequence property

```csharp
public static System.Collections.Generic.IEnumerable<System.Xml.Linq.XElement> EmptySequence { get; }
```

Gets an empty collection of elements.

Returns: An `IEnumerable<T>` of `XElement` that contains an empty collection.

#### Remarks
This property is typically used by class implementers when writing a method that returns a collection of elements. If the method must return no elements, it can use this property to get an empty collection of `XElement` objects.

## XElement.FirstAttribute property

```csharp
public System.Xml.Linq.XAttribute? FirstAttribute { get; }
```

Gets the first attribute of this element.

Returns: An `XAttribute` that contains the first attribute of this element.

#### Remarks
Attributes are stored in the element in the order that they were added to the element.

#### Examples
The following example uses this property.

```csharp
XElement xmlTree = new XElement("Root",
    new XAttribute("Att1", 1),
    new XAttribute("Att2", 2),
    new XAttribute("Att3", 3)
);
Console.WriteLine(xmlTree.FirstAttribute);
```

```vb
Dim xmlTree As XElement = 
Console.WriteLine(xmlTree.FirstAttribute)
```

This example produces the following output:

```txt
Att1="1"
```
