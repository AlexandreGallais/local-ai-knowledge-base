---
title: "XNamespace class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Linq/XNamespace.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XNamespace class

Namespace: `System.Xml.Linq`

```csharp
public sealed class XNamespace
```

Represents an XML namespace. This class cannot be inherited.

This class represents the XML construct of namespaces.

Every `XName` contains an `XNamespace`. Even if an element is not in a namespace, the element's `XName` still contains a namespace, `None`. The `Namespace` property is guaranteed to not be `null`.

#### Create an XNamespace object

The most common way to create an `XNamespace` object is to simply assign a string to it. You can then combine the namespace with a local name by using the override of the addition operator. The following example shows this idiom:

```csharp
XNamespace aw = "http://www.adventure-works.com";
XElement root = new XElement(aw + "Root", "Content");
Console.WriteLine(root);
```

```vb
Dim aw As XNamespace = "http://www.adventure-works.com"
Dim root As XElement = New XElement(aw + "Root", "Content")
Console.WriteLine(root)
```

However, in Visual Basic, you would typically declare a global default namespace, as follows:

```vb
Imports <xmlns='http://www.adventure-works.com'>

Module Module1
    Sub Main()
        Dim root As XElement = _
            <Root>Content</Root>
        Console.WriteLine(root)
    End Sub
End Module
```

This example produces the following output:

```xml
<Root xmlns="http://www.adventure-works.com">Content</Root>
```

Assigning a string to an `XNamespace` uses the implicit conversion from `String`.

See How to create a document with namespaces in C# (LINQ to XML) for more information and examples.

See Work with XML namespaces for more information on using namespaces in Visual Basic.

#### Control namespace prefixes

If you create an attribute that declares a namespace, the prefix specified in the attribute will be persisted in the serialized XML. To create an attribute that declares a namespace with a prefix, you create an attribute where the namespace of the name of the attribute is `Xmlns`, and the name of the attribute is the namespace prefix. The value of the attribute is the URI of the namespace. The following example shows this idiom:

```csharp
XNamespace aw = "http://www.adventure-works.com";
XElement root = new XElement(aw + "Root",
    new XAttribute(XNamespace.Xmlns + "aw", "http://www.adventure-works.com"),
    "Content");
Console.WriteLine(root);
```

```vb
Dim aw As XNamespace = "http://www.adventure-works.com"
Dim root As XElement = New XElement(aw + "Root", _
    New XAttribute(XNamespace.Xmlns + "aw", "http://www.adventure-works.com"), _
    "Content")
Console.WriteLine(root)
```

In Visual Basic, instead of creating a namespace node to control namespace prefixes, you would typically use a global namespace declaration:

```vb
Imports <xmlns:aw='http://www.adventure-works.com'>

Module Module1
    Sub Main()
        Dim root As XElement = _
            <aw:Root>Content</aw:Root>
        Console.WriteLine(root)
    End Sub
End Module
```

This example produces the following output:

```
<aw:Root xmlns:aw="http://www.adventure-works.com">Content</aw:Root>
```

For more information, see How to control namespace prefixes.

#### Create a default namespace

When constructing an attribute that will be a namespace, if the attribute name has the special value of "xmlns", then when the XML tree is serialized, the namespace will be declared as the default namespace. The special attribute with the name of "xmlns" itself is not in any namespace. The value of the attribute is the namespace URI.

The following example creates an XML tree that contains an attribute that is declared in such a way that the namespace will become the default namespace:

```csharp
XNamespace aw = "http://www.adventure-works.com";
XElement root = new XElement(aw + "Root",
    new XAttribute("xmlns", "http://www.adventure-works.com"),
    new XElement(aw + "Child", "content")
);
Console.WriteLine(root);
```

```vb
Dim aw As XNamespace = "http://www.adventure-works.com"
Dim root As XElement = New XElement(aw + "Root", _
    New XAttribute("xmlns", "http://www.adventure-works.com"), _
    New XElement(aw + "Child", "content") _
)
Console.WriteLine(root)
```

In Visual Basic, instead of creating a namespace node to create a default namespace, you would typically use a global default namespace declaration:

```vb
Imports <xmlns='http://www.adventure-works.com'>

Module Module1
    Sub Main()
        Dim root As XElement = _
            <Root>
                <Child>content</Child>
            </Root>
        Console.WriteLine(root)
    End Sub
End Module
```

This example produces the following output:

```
<Root xmlns="http://www.adventure-works.com">
  <Child>content</Child>
</Root>
```

#### XNamespace atomization

`XNamespace` objects are guaranteed to be atomized; that is, if two `XNamespace` objects have exactly the same URI, they will share the same instance. The equality and comparison operators are provided explicitly for this purpose.

#### Use expanded names

Another way to specify a namespace and a local name is to use an expanded name in the form `{namespace}name`:

```csharp
XElement e = new XElement("{http://www.adventure-works.com}Root",
     new XAttribute("{http://www.adventure-works.com}Att", "content")
);
Console.WriteLine(e);
```

```vb
Dim e As XElement = New XElement("{http://www.adventure-works.com}Root", _
     New XAttribute("{http://www.adventure-works.com}Att", "content") _
)
Console.WriteLine(e)
```

This example produces the following output:

```

```

This approach has performance implications. Each time that you pass a string that contains an expanded name to LINQ to XML, it must parse the name, find the atomized namespace, and find the atomized name. This process takes CPU time. If performance is important, you may want to use a different approach.

With Visual Basic, the recommended approach is to use XML literals, which does not involve the use of expanded names.

## XNamespace.NamespaceName property

```csharp
public string NamespaceName { get; }
```

Gets the Uniform Resource Identifier (URI) of this namespace.

Returns: A `String` that contains the URI of the namespace.

#### Examples
The following example shows how to use this property:

```csharp
string markup =
@"";
XElement root = XElement.Parse(markup);
Console.WriteLine(root.Name.Namespace.NamespaceName);
```

```vb
Imports <xmlns:aw="http://www.adventure-works.com">

Module Module1
    Sub Main()
        Dim aw As XNamespace = GetXmlNamespace(aw)
        Dim root As XElement = 
        Console.WriteLine(root.Name.Namespace.NamespaceName)
    End Sub
End Module
```

This example produces the following output:

```txt
http://www.adventure-works.com
```

## XNamespace.None property

```csharp
public static System.Xml.Linq.XNamespace None { get; }
```

Gets the `XNamespace` object that corresponds to no namespace.

Returns: The `XNamespace` that corresponds to no namespace.

#### Remarks
If an element or attribute is in no namespace, its namespace will be set to the namespace returned by this property.

#### Examples
The following example shows uses this property to determine which elements are in no namespace.

```csharp
XNamespace aw = "http://www.adventure-works.com";

XElement root = new XElement("Root",
    new XElement(aw + "ChildInNamespace", "content"),
    new XElement("ChildInNoNamespace", "content")
);

if (root.Name.Namespace == XNamespace.None)
    Console.WriteLine("Root element is in no namespace");
else
    Console.WriteLine("Root element is in a namespace");

if (root.Element(aw + "ChildInNamespace").Name.Namespace == XNamespace.None)
    Console.WriteLine("ChildInNamespace element is in no namespace");
else
    Console.WriteLine("ChildInNamespace element is in a namespace");

if (root.Element("ChildInNoNamespace").Name.Namespace == XNamespace.None)
    Console.WriteLine("ChildInNoNamespace element is in no namespace");
else
    Console.WriteLine("ChildInNoNamespace element is in a namespace");
```

```vb
Imports <xmlns:aw="http://www.adventure-works.com">

Module Module1
    Sub Main()
        Dim root As XElement = _
            <Root>
                <aw:ChildInNamespace>content</aw:ChildInNamespace>
                <ChildInNoNamespace>content</ChildInNoNamespace>
            </Root>

        If (root.Name.Namespace Is XNamespace.None) Then
            Console.WriteLine("Root element is in no namespace")
        Else
            Console.WriteLine("Root element is in a namespace")
        End If

        If (root.Element(GetXmlNamespace(aw) + "ChildInNamespace") _
                .Name.Namespace Is XNamespace.None) Then
            Console.WriteLine("ChildInNamespace element is in no namespace")
        Else
            Console.WriteLine("ChildInNamespace element is in a namespace")
        End If

        If (root.Element("ChildInNoNamespace") _
                .Name.Namespace Is XNamespace.None) Then
            Console.WriteLine("ChildInNoNamespace element is in no namespace")
        Else
            Console.WriteLine("ChildInNoNamespace element is in a namespace")
        End If
    End Sub
End Module
```

This example produces the following output:

```txt
Root element is in no namespace
ChildInNamespace element is in a namespace
ChildInNoNamespace element is in no namespace
```

## XNamespace.Xml property

```csharp
public static System.Xml.Linq.XNamespace Xml { get; }
```

Gets the `XNamespace` object that corresponds to the XML URI (`http://www.w3.org/XML/1998/namespace`).

Returns: The `XNamespace` that corresponds to the XML URI (`http://www.w3.org/XML/1998/namespace`).

#### Remarks
Certain standardized attributes, such as `space`, are in the `http://www.w3.org/XML/1998/namespace` namespace. The W3C standard specifies that this namespace does not have to be declared as an attribute in the XML tree. It is a reserved namespace that is always automatically available in the XML parser.

#### Examples
The following example shows how to create an `xml:space="preserve"` attribute in an XML tree:

```csharp
XElement root = new XElement("Root",
    new XAttribute(XNamespace.Xml + "space", "preserve"),
    new XElement("Child", "content")
);
Console.WriteLine(root);
```

```vb
Dim root As XElement = _
    <Root xml:space="preserve">
        <Child>content</Child>
    </Root>
Console.WriteLine(root)
```

This example produces the following output:

```xml
<Root xml:space="preserve">
  <Child>content</Child>
</Root>
```

## XNamespace.Xmlns property

```csharp
public static System.Xml.Linq.XNamespace Xmlns { get; }
```

Gets the `XNamespace` object that corresponds to the xmlns URI (`http://www.w3.org/2000/xmlns/`).

Returns: The `XNamespace` that corresponds to the **xmlns** URI (`http://www.w3.org/2000/xmlns/`).

#### Remarks
When you declare namespaces, the namespace attributes themselves are in the **xmlns** namespace. The W3C standard specifies that this namespace does not have to be declared as an attribute in the XML tree. It is a reserved namespace that is always automatically available in the XML parser.

#### Examples
The following example shows how to add a namespace to an XML tree. The namespace for the attribute that declares the namespace is the namespace returned by this property.

```csharp
XNamespace aw = "http://www.adventure-works.com";
XElement root = new XElement(aw + "Root",
    new XAttribute(XNamespace.Xmlns + "aw", "http://www.adventure-works.com"),
    new XElement(aw + "Child", "content")
);
Console.WriteLine(root);
```

```vb
Dim root = <aw:Root xmlns:aw="http://www.adventure-works.com">
               <aw:Child>content</aw:Child>
           </aw:Root>
Console.WriteLine(root)
```

In Visual Basic, the preferred idiom is:

```vb
Imports <xmlns:aw='http://www.adventure-works.com'>

Module Module1
    Sub Main()
        Dim root As XElement = _
            <aw:Root>
                <aw:Child>content</aw:Child>
            </aw:Root>
        Console.WriteLine(root)
    End Sub
End Module
```

This example produces the following output:

```xml
<aw:Root xmlns:aw="http://www.adventure-works.com">
  <aw:Child>content</aw:Child>
</aw:Root>
```

## XNamespace.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Determines whether the specified `XNamespace` is equal to the current `XNamespace`.

Parameters:

- `obj`: The `XNamespace` to compare to the current `XNamespace`.

Returns: A `Boolean` that indicates whether the specified `XNamespace` is equal to the current `XNamespace`.

#### Remarks
For two `XNamespace` objects to be equal, they must have the same URI.

#### Examples
The following example compares two namespaces that refer to the same URI.

```csharp
XNamespace aw = "http://www.adventure-works.com";
Console.WriteLine(aw == "http://www.adventure-works.com");
```

```vb
Imports <xmlns:aw="http://www.adventure-works.com">

Module Module1
    Sub Main()
        Console.WriteLine(GetXmlNamespace(aw) = "http://www.adventure-works.com")
    End Sub
End Module
```

This example produces the following output:

```txt
True
```

## XNamespace.Get(String) method

```csharp
public static System.Xml.Linq.XNamespace Get (string namespaceName);
```

Gets an `XNamespace` for the specified Uniform Resource Identifier (URI).

Parameters:

- `namespaceName`: A `String` that contains a namespace URI.

Returns: An `XNamespace` created from the specified URI.

#### Remarks
The returned `XNamespace` object is guaranteed to be atomic (that is, it is the only one in the system for that particular URI).

#### Examples
The following example gets a `XNamespace` from a specified URI.

```csharp
XNamespace aw = XNamespace.Get("http://www.adventure-works.com");

// This is the preferred form.
XNamespace aw2 = "http://www.adventure-works.com";
Console.WriteLine(aw);
Console.WriteLine(aw2);
```

```vb
Imports <xmlns:aw="http://www.adventure-works.com">

Module Module1
    Sub Main()
        Dim aw As XNamespace = XNamespace.Get("http://www.adventure-works.com")

        ' This is the preferred form.
        Dim aw2 As XNamespace = GetXmlNamespace(aw)
        Console.WriteLine(aw)
        Console.WriteLine(aw2)
    End Sub
End Module
```

This example produces the following output:

```txt
http://www.adventure-works.com
http://www.adventure-works.com
```

## XNamespace.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Gets a hash code for this `XNamespace`.

Returns: An `Int32` that contains the hash code for the `XNamespace`.

#### Remarks
This method serves as a hash function for `XNamespace`. You can use `XNamespace.GetHashCode` in hashing algorithms and data structures like a hash table.
