---
title: "XName class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Linq/XName.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XName class

Namespace: `System.Xml.Linq`

```csharp
public sealed class XName : IEquatable<System.Xml.Linq.XName>, System.Runtime.Serialization.ISerializable
```

Represents a name of an XML element or attribute.

XML names include a namespace and a local name. A *fully qualified name* is the combination of the namespace and local name.

#### Create an XName object

`XName` does not contain any public constructors. Instead, this class provides an implicit conversion from `String` that allows you to create an `XName`. The most common place you use this conversion is when constructing an element or attribute: The first argument to the `XElement` constructor is an `XName`. By passing a string, you take advantage of the implicit conversion. The following code creates an element with a name that is in no namespace:

```csharp
XElement root = new XElement("ElementName", "content");
Console.WriteLine(root);
```

In Visual Basic, it's more appropriate to use XML literals:

```vb
Dim root As XElement = <ElementName>content</ElementName>
Console.WriteLine(root)
```

This example produces the following output:

```xml
<ElementName>content</ElementName>
```

Assigning a string to an `XName` uses the implicit conversion from `String`.

The Visual Basic <example-value> creates the `XElement` using XML literals. Even though XML literals are used, an `XName` object is created for the `XElement`.

In addition, you can call the `XName.Get` method for an `XName` object. However, the recommended way is to use the implicit conversion from string.

#### Create an XName in a namespace

As with XML, an `XName` can be in a namespace, or it can be in no namespace.

For C#, the recommended approach for creating an `XName` in a namespace is to declare the `XNamespace` object, then use the override of the addition operator.

For Visual Basic, the recommended approach is to use XML literals and global namespace declarations to create XML that is in a namespace.

```csharp
XNamespace aw = "http://www.adventure-works.com";
XElement root = new XElement(aw + "ElementName", "content");
Console.WriteLine(root);
```

```vb
Imports <xmlns="http://www.adventure-works.com">

Module Module1
    Sub Main()
        Dim root As XElement = <ElementName>content</ElementName>
        Console.WriteLine(root)
    End Sub
End Module
```

This example produces the following output:

```xml
<ElementName xmlns="http://www.adventure-works.com">content</ElementName>
```

#### Create an XName in no namespace

The `Namespace` property of an `XName` object is guaranteed to not be null. If the `XName` is in no namespace, then the `Namespace` property will be set to `None`. The following code demonstrates this:

```csharp
XElement root = new XElement("ElementName", "content");
if (root.Name.Namespace == XNamespace.None)
    Console.WriteLine("The element is in no namespace.");
else
    Console.WriteLine("The element is in a namespace.");
```

```vb
Dim root As XElement = <ElementName>content</ElementName>
If (root.Name.Namespace Is XNamespace.None) Then
    Console.WriteLine("The element is in no namespace.")
Else
    Console.WriteLine("The element is in a namespace.")
End If
```

This example produces the following output:

```
The element is in no namespace.
```

#### Use expanded names

You can also create an `XName` from a expanded XML name in the form `{namespace}localname`:

```csharp
XElement root = new XElement("{http://www.adventure-works.com}ElementName", "content");
Console.WriteLine(root);
```

```vb
Dim root As XElement = New XElement("{http://www.adventure-works.com}ElementName", "content")
Console.WriteLine(root)
```

This example produces the following output:

```xml
<ElementName xmlns="http://www.adventure-works.com">content</ElementName>
```

Be aware that creating an `XName` through an expanded name is less efficient than creating an `XNamespace` object and using the override of the addition operator. It is also less efficient than importing a global namespace and using XML literals in Visual Basic.

If you create an `XName` using an expanded name, LINQ to XML must find the atomized instance of a namespace. This work must be repeated for every use of an expanded name. This additional time is likely to be negligible when writing LINQ queries; however, it might be significant when creating a large XML tree.

#### XName objects are atomized

`XName` objects are guaranteed to be atomized; that is, if two `XName` objects have exactly the same namespace and exactly the same local name, they will share the same instance. The equality and comparison operators are also provided explicitly for this purpose.

Among other benefits, this feature allows for faster execution of queries. When filtering on the name of elements or attributes, the comparisons expressed in predicates use identity comparison, not value comparison. It is much faster to determine that two references actually refer to the same object than to compare two strings.

## XName.LocalName property

```csharp
public string LocalName { get; }
```

Gets the local (unqualified) part of the name.

Returns: A `String` that contains the local (unqualified) part of the name.

#### Remarks
This property is guaranteed to not be `null`.

#### Examples
The following example shows the use of this property.

```csharp
XNamespace ns = "http://www.adventure-works.com";
XElement root = new XElement(ns + "Root", "content");
Console.WriteLine(root.Name);
Console.WriteLine(root.Name.LocalName);
Console.WriteLine(root.Name.Namespace);
```

```vb
Imports <xmlns="http://www.adventure-works.com">

Module Module1
    Sub Main()
        Dim root As XElement = 
        Console.WriteLine(root.Name)
        Console.WriteLine(root.Name.LocalName)
        Console.WriteLine(root.Name.Namespace)
    End Sub
End Module
```

This example produces the following output:

```txt
{http://www.adventure-works.com}Root
Root
http://www.adventure-works.com
```

## XName.Namespace property

```csharp
public System.Xml.Linq.XNamespace Namespace { get; }
```

Gets the namespace part of the fully qualified name.

Returns: An `XNamespace` that contains the namespace part of the name.

#### Remarks
The `Namespace` property is guaranteed to not be `null`. If an `XName` is in no namespace, this property returns `None`.

#### Examples
The following example shows the use of this property.

```csharp
XNamespace ns = "http://www.adventure-works.com";
XElement root = new XElement(ns + "Root", "content");
Console.WriteLine(root.Name);
Console.WriteLine(root.Name.LocalName);
Console.WriteLine(root.Name.Namespace);
```

```vb
Imports <xmlns="http://www.adventure-works.com">

Module Module1
    Sub Main()
        Dim root As XElement = 
        Console.WriteLine(root.Name)
        Console.WriteLine(root.Name.LocalName)
        Console.WriteLine(root.Name.Namespace)
    End Sub
End Module
```

This example produces the following output:

```txt
{http://www.adventure-works.com}Root
Root
http://www.adventure-works.com
```

## XName.NamespaceName property

```csharp
public string NamespaceName { get; }
```

Returns the URI of the `XNamespace` for this `XName`.

Returns: The URI of the `XNamespace` for this `XName`.

#### Remarks
This is a convenience property to get the namespace name from an `XName`.

#### Examples
This example creates an element in a namespace, and then prints the element's namespace.

```csharp
XNamespace aw = "http://www.adventure-works.com";
XElement root = new XElement(aw + "Root");
Console.WriteLine(root.Name.NamespaceName);
```

```vb
Imports <xmlns="http://www.adventure-works.com">

Module Module1
    Sub Main()
        Dim root As XElement = 
        Console.WriteLine(root.Name.NamespaceName)
    End Sub
End Module
```

This example produces the following output:

```txt
http://www.adventure-works.com
```

## XName.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Determines whether the specified `XName` is equal to this `XName`.

Parameters:

- `obj`: The `XName` to compare to the current `XName`.

Returns: `true` if the specified `XName` is equal to the current `XName`; otherwise `false`.

#### Remarks
For two `XName` objects to be equal, they must have the same expanded name.

## XName.Get(String) method

```csharp
public static System.Xml.Linq.XName Get (string expandedName);
```

Gets an `XName` object from an expanded name.

Parameters:

- `expandedName`: A `String` that contains an expanded XML name in the format `{namespace}localname`.

Returns: An `XName` object constructed from the expanded name.

#### Remarks
This method contains overloads that allow you to create an `XName`. You can create it from a expanded XML name in the form `{namespace}localname`, or from a namespace and a local name, specified separately.

A much more common and easier way to create an `XName` is to use the implicit conversion from string.

Because `XName` are atomized, if there is an existing `XName` with exactly the same name, the assigned variable will refer to the existing `XName`. If there is no existing `XName`, a new one will be created and initialized.

#### Examples
The following example shows the use of this method.

```csharp
XName name = XName.Get("{http://www.adventure-works.com}Root");
XElement el = new XElement(name, "content");
Console.WriteLine(el);

// This is the preferred approach for specifying the XName in the
// constructor of XElement.
XNamespace aw = "http://www.adventure-works.com";
XElement el2 = new XElement(aw + "Root", "content");
Console.WriteLine(el2);
```

```vb
Imports <xmlns="http://www.adventure-works.com">

Module Module1
    Sub Main()
        Dim name As XName = XName.Get("{http://www.adventure-works.com}Root")
        Dim el As XElement = New XElement(name, "content")
        Console.WriteLine(el)

        ' The preferred approach for specifying an XName in a namespace
        ' for Visual Basic is to import a global namespace.
        Dim el2 As XElement = <Root>content</Root>
        Console.WriteLine(el2)
    End Sub
End Module
```

This example produces the following output:

```txt
<Root xmlns="http://www.adventure-works.com">content</Root>
<Root xmlns="http://www.adventure-works.com">content</Root>
```

## XName.Get(String, String) method

```csharp
public static System.Xml.Linq.XName Get (string localName, string namespaceName);
```

Gets an `XName` object from a local name and a namespace.

Parameters:

- `localName`: A local (unqualified) name.
- `namespaceName`: An XML namespace.

Returns: An `XName` object created from the specified local name and namespace.

#### Remarks
This method contains overloads that allow you to create an `XName`. You can create it from an expanded XML name in the form `{namespace}localname`, or from a namespace and a local name, specified separately.

A much more common and easier way to create an `XName` is to use the implicit conversion from string.

Because `XName` are atomized, if there is an existing `XName` with exactly the same name, the assigned variable will refer to the existing `XName`. If there is no existing `XName`, a new one will be created and initialized.

#### Examples
The following example shows the use of this method.

```csharp
XName name = XName.Get("Root", "http://www.adventure-works.com");
XElement el = new XElement(name, "content");
Console.WriteLine(el);

// This is the preferred form.
XNamespace aw = "http://www.adventure-works.com";
XElement el2 = new XElement(aw + "Root", "content");
Console.WriteLine(el2);
```

```vb
Imports <xmlns="http://www.adventure-works.com">

Module Module1
    Sub Main()
        Dim name As XName = XName.Get("{http://www.adventure-works.com}Root")
        Dim el As XElement = New XElement(name, "content")
        Console.WriteLine(el)

        ' The preferred approach for specifying an XName in a namespace
        ' for Visual Basic is to import a global namespace.
        Dim el2 As XElement = <Root>content</Root>
        Console.WriteLine(el2)
    End Sub
End Module
```

This example produces the following output:

```txt
<Root xmlns="http://www.adventure-works.com">content</Root>
<Root xmlns="http://www.adventure-works.com">content</Root>
```

## XName.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Gets a hash code for this `XName`.

Returns: An `Int32` that contains the hash code for the `XName`.

#### Remarks
This method serves as a hash function for `XName`. You can use `XName.GetHashCode` in hashing algorithms, or in data structures such as a hash table.

## XName.op_Equality(XName, XName) method

```csharp
public static bool operator == (System.Xml.Linq.XName? left, System.Xml.Linq.XName? right);
```

Returns a value indicating whether two instances of `XName` are equal.

Parameters:

- `left`: The first `XName` to compare.
- `right`: The second `XName` to compare.

Returns: `true` if `left` and `right` are equal; otherwise `false`.

#### Remarks
The operator overloads `==` and `!=` are included to enable comparisons between `XName` and a `string`, such as`element.Name == "SomeElementName"`. The predefined reference equality operators in C# require one operand to be convertible to the type of the other through reference conversions only. These operators do not consider the implicit conversion from string to `XName`.

#### Examples
The following example shows some comparisons between `XName` objects and strings.

```csharp
XName xn;
xn = XName.Get("Root");
Console.WriteLine(xn == "Root");

xn = XName.Get("Root", "http://www.adventure-works.com");
Console.WriteLine(xn == "{http://www.adventure-works.com}Root");

XElement root = new XElement("Root", "content");
Console.WriteLine(root.Name == "Root");
```

```vb
Dim xn As XName
xn = XName.Get("Root")
Console.WriteLine(xn = "Root")

xn = XName.Get("Root", "http://www.adventure-works.com")
Console.WriteLine(xn = "{http://www.adventure-works.com}Root")

Dim root As XElement = New XElement("Root", "content")
Console.WriteLine(root.Name = "Root")
```

This example produces the following output:

```txt
True
True
True
```
