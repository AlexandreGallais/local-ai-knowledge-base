---
title: "XAttribute class (part 1 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Linq/XAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XAttribute class

Namespace: `System.Xml.Linq`

```csharp
public class XAttribute : System.Xml.Linq.XObject
```

Represents an XML attribute.

#### Remarks
An XML attribute is a name/value pair associated with an XML element.

Each `XElement` contains a list of the attributes for that element. Attributes must have a qualified name that is unique to the element. Attributes are not derived from `XNode`; they are not nodes in the XML tree. Instead, they are simply name/value pairs associated with an element.

Attributes are maintained in the XML tree in the order that they were added to the element. When a collection of attributes is returned by `XElement.Attributes`, they are returned in the order that they were added to the element, and are not sorted.

Technically, in XML, namespace declarations are not attributes proper. However, this distinction is not normally made by many XML programmers. Instead, because namespace declarations have exactly the same XML syntax as attributes, most XML programmers think of namespaces as attributes. To simplify the LINQ to XML programming interface, namespaces are represented in the XML tree as attributes. Such namespace attributes impact serialization of an XML tree. When serializing, LINQ to XML attempts to serialize with the namespace prefix specified in namespace attributes. You can use the `IsNamespaceDeclaration` to determine if an attribute is really a namespace declaration.

The `XAttribute` class derives from `XObject`. You can add annotations to attributes, and observe events for them.

Some `XAttribute` methods can be used from XAML. For more information, see LINQ to XML Dynamic Properties.

## XAttribute.XAttribute(XAttribute) constructor

```csharp
public XAttribute (System.Xml.Linq.XAttribute other);
```

Initializes a new instance of the `XAttribute` class from another `XAttribute` object.

Parameters:

- `other`: An `XAttribute` object to copy from.

Exceptions:

- `ArgumentNullException`: The `other` parameter is `null`.

#### Remarks
This constructor is primarily used internally when making a deep copy of an XML tree.

#### Examples
This example demonstrates that creating a deep copy of an XML tree creates a copy, not a clone, of an attribute in the tree.

```csharp
XElement root1 = XElement.Parse("");
// Make a deep copy.
XElement root2 = new XElement(root1);
if (root1.Attribute("Att1") == root2.Attribute("Att1"))
    Console.WriteLine("This will not be printed");
else
    Console.WriteLine("Creating a deep copy created a new attribute from the original.");
```

```vb
Dim root1 As XElement = 
' Make a deep copy.
Dim root2 As XElement = New XElement(root1)
If root1.Attribute("Att1") Is root2.Attribute("Att1") Then
    Console.WriteLine("This will not be printed")
Else
    Console.WriteLine("Creating a deep copy created a new attribute from the original.")
End If
```

This example produces the following output:

```txt
Creating a deep copy created a new attribute from the original.
```

## XAttribute.XAttribute(XName, Object) constructor

```csharp
public XAttribute (System.Xml.Linq.XName name, object value);
```

Initializes a new instance of the `XAttribute` class from the specified name and value.

Parameters:

- `name`: The `XName` of the attribute.
- `value`: An `Object` containing the value of the attribute.

Exceptions:

- `ArgumentNullException`: The `name` or `value` parameter is `null`.

#### Remarks
There is an implicit conversion from string to `XName`. Typical use of this constructor is to specify a string as the first parameter instead of creating a new `XName`, as follows:

```csharp
XElement root = new XElement("Root",
    new XAttribute("AnAttributeName", "Content")
);
```

You can also use the addition operator overload with an `XNamespace` and a string to create an `XName`, as follows:

```csharp
XNamespace aw = "http://www.adventure-works.com";
XElement root = new XElement(aw + "Root",
    new XAttribute(aw + "AnAttributeName", "Content")
);
```

For more information, see Work with XML Namespaces.

These same approaches will work for Visual Basic, however XML literals provide a better approach for creating XML trees.

The `value` parameter can be a `String`, `double`, `float`, `decimal`, `bool`, `DateTime`, or `TimeSpan`. If the value is a `DateTime` or `TimeSpan`, the value of the attribute is formatted correctly per the W3C specifications.

#### Examples
The following example uses this constructor to create attributes. It passes strings as the first argument to the `XAttribute` constructor, which are then implicitly converted to `XName` objects. The attributes are added to an element.

```csharp
XElement root;

double dbl = 12.345;
XAttribute[] attArray = {
    new XAttribute("Att4", 1),
    new XAttribute("Att5", 2),
    new XAttribute("Att6", 3)
};
DateTime dt = new DateTime(2006, 10, 6, 12, 30, 00);

// string content
root = new XElement("Root",
    new XAttribute("Att1", "Some text"),

    // double content
    new XAttribute("Att2", dbl),

    // DateTime content
    new XAttribute("Att3", dt),

    // XAttribute array content
    attArray
);

Console.WriteLine(root);
```

```vb
Dim dbl As Double = 12.345
Dim attArray As XAttribute() = { _
    New XAttribute("Att4", 1), _
    New XAttribute("Att5", 2), _
    New XAttribute("Att6", 3) _
}
Dim dt As DateTime = New DateTime(2006, 10, 6, 12, 30, 0)
Dim root As XElement = <Root Att1="Some text"
                           Att2=<%= dbl %>
                           Att3=<%= dt %>
                           <%= attArray %>
                       />
Console.WriteLine(root)
```

This example produces the following output:

```xml

```

## XAttribute.EmptySequence property

```csharp
public static System.Collections.Generic.IEnumerable<System.Xml.Linq.XAttribute> EmptySequence { get; }
```

Gets an empty collection of attributes.

Returns: An `IEnumerable<T>` of `XAttribute` containing an empty collection.

#### Remarks
This property is typically used by class implementers when writing a method that returns a collection of attributes. If the method needs to return an empty collection of attributes, it could use this property to get an empty collection of `XAttribute` objects.

## XAttribute.IsNamespaceDeclaration property

```csharp
public bool IsNamespaceDeclaration { get; }
```

Determines if this attribute is a namespace declaration.

Returns: `true` if this attribute is a namespace declaration; otherwise `false`.

#### Remarks
Technically, in XML, namespace declarations are not attributes proper. However, this distinction is not normally made by most XML programmers. Instead, because namespace declarations have exactly the same syntax as attributes, most XML programmers think of namespaces as attributes. To simplify the LINQ to XML programming interface, namespaces are represented in the XML tree as attributes. You can use this property to determine if a particular LINQ to XML attribute is really a namespace declaration.

#### Examples
The following example creates an attribute that is a namespace declaration and an attribute that is not. It then uses this property to display whether each attribute is a namespace declaration or not.

```csharp
XNamespace aw = "http://www.adventure-works.com";
XElement root = new XElement(aw + "Root",
    new XAttribute(XNamespace.Xmlns + "aw", "http://www.adventure-works.com"),
    new XAttribute(aw + "Att", "content")
);

foreach (XAttribute att in root.Attributes()) {
    if (att.IsNamespaceDeclaration)
        Console.WriteLine("{0} is a namespace declaration", att.Name);
    else
        Console.WriteLine("{0} is not a namespace declaration", att.Name);
}
```

```vb
Dim root As XElement = 

For Each att As XAttribute In root.Attributes()
    If (att.IsNamespaceDeclaration) Then
        Console.WriteLine("{0} is a namespace declaration", att.Name)
    Else
        Console.WriteLine("{0} is not a namespace declaration", att.Name)
    End If
Next
```

This example produces the following output:

```txt
{http://www.w3.org/2000/xmlns/}aw is a namespace declaration
{http://www.adventure-works.com}Att is not a namespace declaration
```

## XAttribute.Name property

```csharp
public System.Xml.Linq.XName Name { get; }
```

Gets the expanded name of this attribute.

Returns: An `XName` containing the name of this attribute.

#### Remarks
The expanded name returned by this property is in the form of `{namespace}localname`.

#### Examples
The following example creates an element with three attributes. It then uses this property to print out the name of each attribute. The example also shows creation of a new attribute using the name of an existing attribute.

```csharp
XNamespace aw = "http://www.adventure-works.com";
XElement root = new XElement(aw + "Root",
    new XAttribute(XNamespace.Xmlns + "aw", "http://www.adventure-works.com"),
    new XAttribute(aw + "Att", "content"),
    new XAttribute("Att2", "different content")
);

foreach (XAttribute att in root.Attributes())
    Console.WriteLine("{0}={1}", att.Name, att.Value);
Console.WriteLine("");

XElement newRoot = new XElement(aw + "Root",
    from att in root.Attributes("Att2")
    select new XAttribute(att.Name, "new content"));

foreach (XAttribute att in newRoot.Attributes())
    Console.WriteLine("{0}={1}", att.Name, att.Value);
```

```vb
Dim root As XElement = _
    

For Each att As XAttribute In root.Attributes()
    Console.WriteLine("{0}={1}", att.Name, att.Value)
Next
Console.WriteLine("")

Dim NewRoot As XElement = _
<Root
    <%= _
        From att In root.Attributes("Att2") _
        Select New XAttribute(att.Name, "new content") _
    %>>_
</Root>

For Each att As XAttribute In NewRoot.Attributes()
    Console.WriteLine("{0}={1}", att.Name, att.Value)
Next
```

This example produces the following output:

```txt
{http://www.w3.org/2000/xmlns/}aw=http://www.adventure-works.com
{http://www.adventure-works.com}Att=content
Att2=different content

Att2=new content
```

## XAttribute.NextAttribute property

```csharp
public System.Xml.Linq.XAttribute? NextAttribute { get; }
```

Gets the next attribute of the parent element.

Returns: An `XAttribute` containing the next attribute of the parent element.

#### Remarks
Attributes are maintained in the XML tree in the order that they were added to the element. When a collection of attributes is returned by `XElement.Attributes`, they are returned in the order that they were added, and are not sorted. When you request the next attribute through this property, this property returns the attribute that was added after this attribute.

If this attribute does not have a parent, or if there is no next attribute, then this property returns `null`.

#### Examples
The following example shows how to iterate through the attributes of an element using this property.

```csharp
XElement root = new XElement("Root",
    new XAttribute("Att1", 1),
    new XAttribute("Att2", 2),
    new XAttribute("Att3", 3),
    new XAttribute("Att4", 4)
);

XAttribute att = root.FirstAttribute;
do {
    Console.WriteLine(att);
}
while((att = att.NextAttribute) != null);
```

```vb
Dim root As XElement = 
Dim att As XAttribute = root.FirstAttribute
Dim val As Boolean = True
Do
    Console.WriteLine(att)
    att = att.NextAttribute
Loop While (Not (att Is Nothing))
```

This example produces the following output:

```txt
Att1="1"
Att2="2"
Att3="3"
Att4="4"
```

## XAttribute.NodeType property

```csharp
public override System.Xml.XmlNodeType NodeType { get; }
```

Gets the node type for this node.

Returns: The node type. For `XAttribute` objects, this value is `XmlNodeType.Attribute`.

#### Remarks
Because all classes that derive from `XObject` contain a `NodeType` property, you can write code that operates on collections of concrete subclass of `XObject`. Your code can then test for the node type of each node in the collection.

#### Examples
The following example creates an attribute, and then displays the node type using this property.

```csharp
XElement root = new XElement("Root",
    new XAttribute("Att", "content")
);

XAttribute att = root.FirstAttribute;
Console.WriteLine(att.NodeType);
```

```vb
Dim root As XElement = 
Dim att As XAttribute = root.FirstAttribute
Console.WriteLine(att.NodeType.ToString)
```

This example produces the following output:

```txt
Attribute
```

## XAttribute.PreviousAttribute property

```csharp
public System.Xml.Linq.XAttribute? PreviousAttribute { get; }
```

Gets the previous attribute of the parent element.

Returns: An `XAttribute` containing the previous attribute of the parent element.

#### Remarks
Attributes are maintained in the XML tree in the order that they were added to the element. When a collection of attributes is returned by `XElement.Attributes`, they are returned in the order that they were added, and are not sorted. When you request the previous attribute through this property, this property returns the attribute that was added before this attribute.

If this attribute does not have a parent, or if this attribute is the first attribute, then this property returns `null`.

The `XElement` class stores its attributes as a singly-linked list of `XAttribute` objects. This means that the `PreviousAttribute` property must traverse the list of attributes that belong to the element. Therefore, using this property might affect your performance.

#### Examples
The following example shows how to iterate through the attributes of an element using this property.

```csharp
XElement root = new XElement("Root",
    new XAttribute("Att1", 1),
    new XAttribute("Att2", 2),
    new XAttribute("Att3", 3),
    new XAttribute("Att4", 4)
);
XAttribute att = root.LastAttribute;
do {
    Console.WriteLine(att);
}
while((att = att.PreviousAttribute) != null);
```

```vb
Dim root As XElement = 
Dim att As XAttribute = root.LastAttribute
Dim val As Boolean = True
Do
    Console.WriteLine(att)
    att = att.PreviousAttribute
Loop While (Not (att Is Nothing))
```

This example produces the following output:

```txt
Att4="4"
Att3="3"
Att2="2"
Att1="1"
```
