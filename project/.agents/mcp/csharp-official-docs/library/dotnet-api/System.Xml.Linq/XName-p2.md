---
title: "XName class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Linq/XName.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XName class (part 2 of 2)

## XName.op_Implicit(String) method

```csharp
public static implicit operator System.Xml.Linq.XName? (string? expandedName);
```

Converts a string formatted as an expanded XML name (that is,`{namespace}localname`) to an `XName` object.

Parameters:

- `expandedName`: A string that contains an expanded XML name in the format `{namespace}localname`.

Returns: An `XName` object constructed from the expanded name.

#### Remarks
You are using this implicit operator when you create an `XElement` or `XAttribute` by passing a string to the appropriate constructor.

#### Examples
The following example creates an `XName` by assigning a string to it, which invokes this implicit conversion operator.

```csharp
XElement el = new XElement("{http://www.adventure-works.com}Root", "content");
Console.WriteLine(el);

// The preferred approach is to initialize an XNamespace object
// and use the overload of the addition operator.
XNamespace aw = "http://www.adventure-works.com";
XElement root = new XElement(aw + "Root", "content");
Console.WriteLine(root);
```

```vb
Imports <xmlns="http://www.adventure-works.com">

Module Module1
    Sub Main()
        Dim el As XElement = New XElement("{http://www.adventure-works.com}Root", "content")
        Console.WriteLine(el)

        ' The preferred approach is to import a global namespace and
        ' use an XML literal.
        Dim root As XElement = <Root>content</Root>
        Console.WriteLine(root)
    End Sub
End Module
```

This example produces the following output:

```txt
<Root xmlns="http://www.adventure-works.com">content</Root>
<Root xmlns="http://www.adventure-works.com">content</Root>
```

## XName.op_Inequality(XName, XName) method

```csharp
public static bool operator != (System.Xml.Linq.XName? left, System.Xml.Linq.XName? right);
```

Returns a value indicating whether two instances of `XName` are not equal.

Parameters:

- `left`: The first `XName` to compare.
- `right`: The second `XName` to compare.

Returns: `true` if `left` and `right` are not equal; otherwise `false`.

#### Remarks
The operator overloads `==` and `!=` are included to enable comparisons between `XName` and a string, such as`element.Name == "SomeElementName"`. The predefined reference equality operators in C# require one operand to be convertible to the type of the other through reference conversions only. These operators do not consider the implicit conversion from string to `XName`.

#### Examples
The following C# example compares an `XName` object to a string, which invokes this operator.

```csharp
XNamespace aw = "http://www.adventure-works.com";
XElement root = new XElement(aw + "Root", "content");

Console.WriteLine(root.Name != "{http://www.adventure-works.com}Root");

// the following is the preferred idiom
Console.WriteLine(root.Name != aw + "Root");
```

```vb
Imports <xmlns="http://www.adventure-works.com">

Module Module1
    Sub Main()
        Dim root As XElement = <Root>content</Root>
        Console.WriteLine(root.Name <> "{http://www.adventure-works.com}Root")

        ' the following is the preferred idiom
        Console.WriteLine(root.Name <> GetXmlNamespace() + "Root")
    End Sub
End Module
```

This example produces the following output:

```txt
False
False
```

## XName.System.IEquatable<System.Xml.Linq.XName>.Equals(XName) method

```csharp
bool IEquatable<XName>.Equals (System.Xml.Linq.XName other);
```

Indicates whether the current `XName` is equal to the specified `XName`.

Parameters:

- `other`: The `XName` to compare with this `XName`.

Returns: `true` if this `XName` is equal to the specified `XName`, otherwise `false`.

To be added.

## XName.System.Runtime.Serialization.ISerializable.GetObjectData(SerializationInfo, StreamingContext) method

```csharp
void ISerializable.GetObjectData (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Populates a `SerializationInfo` with the data required to serialize the target object.

Parameters:

- `info`: The `SerializationInfo` to populate with data.
- `context`: The destination (see `StreamingContext`) for this serialization.

#### Remarks
This method is used internally to serialize object graphs that contain LINQ to XML objects.

## XName.ToString() method

```csharp
public override string ToString ();
```

Returns the expanded XML name in the format `{namespace}localname`.

Returns: A `String` that contains the expanded XML name in the format `{namespace}localname`.

#### Examples
The following example calls `Console.WriteLine`, passing an `XName`. This causes the `XName.ToString` method to be called.

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
        Dim root As XElement = <Root>content</Root>
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
