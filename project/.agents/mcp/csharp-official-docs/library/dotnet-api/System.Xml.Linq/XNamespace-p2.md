---
title: "XNamespace class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Linq/XNamespace.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XNamespace class (part 2 of 2)

## XNamespace.GetName(String) method

```csharp
public System.Xml.Linq.XName GetName (string localName);
```

Returns an `XName` object created from this `XNamespace` and the specified local name.

Parameters:

- `localName`: A `String` that contains a local name.

Returns: An `XName` created from this `XNamespace` and the specified local name.

#### Remarks
The returned `XName` object is guaranteed to be atomic (that is, it is the only one in the system for a specific expanded name).

#### Examples
The following example uses this property to retrieve an `XName`.

```csharp
XNamespace aw = "http://www.adventure-works.com";
XName name = aw.GetName("Root");
Console.WriteLine("{0}", name);
```

```vb
Imports <xmlns:aw="http://www.adventure-works.com">

Module Module1
    Sub Main()
        Dim aw As XNamespace = GetXmlNamespace(aw)
        Dim name As XName = aw.GetName("Root")
        Console.WriteLine("{0}", name)
    End Sub
End Module
```

This example produces the following output:

```txt
{http://www.adventure-works.com}Root
```

## XNamespace.op_Addition(XNamespace, String) method

```csharp
public static System.Xml.Linq.XName operator + (System.Xml.Linq.XNamespace ns, string localName);
```

Combines an `XNamespace` object with a local name to create an `XName`.

Parameters:

- `ns`: An `XNamespace` that contains the namespace.
- `localName`: A `String` that contains the local name.

Returns: The new `XName` constructed from the namespace and local name.

#### Remarks
This operator enables the common idiom of combining a namespace and a local name in the construction of an element or attribute. This idiom provides some of the benefits of having namespace prefixes, in that you can refer to a namespace using a variable that is short. This eliminates syntactic noise in the code that creates XML trees.

#### Examples
The following example shows the use of the `+` operator to create an `XName` from an `XNamespace` and a local name.

```csharp
XNamespace aw = "http://www.adventure-works.com";
XElement root = new XElement(aw + "Root",
    new XElement(aw + "Child")
);
Console.WriteLine(root);
```

```vb
Dim aw As XNamespace = "http://www.adventure-works.com"
Dim root As XElement = New XElement(aw + "Root", _
    New XElement(aw + "Child") _
)
Console.WriteLine(root)
```

In Visual Basic, this is the preferred idiom:

```vb
Imports <xmlns="http://www.adventure-works.com">

Module Module1
    Sub Main()
        Dim aw As XNamespace = GetXmlNamespace()
        Dim root As XElement = _
            <Root>
                
            </Root>
        Console.WriteLine(root)
    End Sub
End Module
```

This example produces the following output:

```xml
<Root xmlns="http://www.adventure-works.com">
  
</Root>
```

## XNamespace.op_Equality(XNamespace, XNamespace) method

```csharp
public static bool operator == (System.Xml.Linq.XNamespace? left, System.Xml.Linq.XNamespace? right);
```

Returns a value indicating whether two instances of `XNamespace` are equal.

Parameters:

- `left`: The first `XNamespace` to compare.
- `right`: The second `XNamespace` to compare.

Returns: A `Boolean` that indicates whether `left` and `right` are equal.

#### Remarks
The operator overloads `==` and `!=` are provided to enable comparisons between `XNamespace` and string (for example, `element.Name.Namespace == "http://www.adventure-works.com"`). The predefined reference equality operators in C# require one operand to be convertible to the type of the other through reference conversions only, and do not consider the implicit conversion from string to `XNamespace`.

#### Examples
The following example shows the comparison of an `XNamespace` and a string.

```csharp
XNamespace aw = "http://www.adventure-works.com";
Console.WriteLine(aw == "http://www.adventure-works.com");
```

```vb
Imports <xmlns="http://www.adventure-works.com">

Module Module1
    Sub Main()
        Dim aw As XNamespace = GetXmlNamespace()
        Console.WriteLine(aw = "http://www.adventure-works.com")
    End Sub
End Module
```

This example produces the following output:

```txt
True
```

## XNamespace.op_Implicit(String) method

```csharp
public static implicit operator System.Xml.Linq.XNamespace? (string? namespaceName);
```

Converts a string containing a Uniform Resource Identifier (URI) to an `XNamespace`.

Parameters:

- `namespaceName`: A `String` that contains the namespace URI.

Returns: An `XNamespace` constructed from the URI string.

#### Examples
The following example shows the initialization of an `XNamespace` variable by assigning a string to it.

```csharp
XNamespace aw = "http://www.adventure-works.com";
Console.WriteLine(aw);
```

```vb
Imports <xmlns="http://www.adventure-works.com">

Module Module1
    Sub Main()
        Dim aw As XNamespace = GetXmlNamespace()
        Console.WriteLine(aw)
    End Sub
End Module
```

This example produces the following output:

```txt
http://www.adventure-works.com
```

## XNamespace.op_Inequality(XNamespace, XNamespace) method

```csharp
public static bool operator != (System.Xml.Linq.XNamespace? left, System.Xml.Linq.XNamespace? right);
```

Returns a value indicating whether two instances of `XNamespace` are not equal.

Parameters:

- `left`: The first `XNamespace` to compare.
- `right`: The second `XNamespace` to compare.

Returns: A `Boolean` that indicates whether `left` and `right` are not equal.

#### Remarks
The operator overloads `==` and `!=` are provided to enable comparisons between `XNamespace` and string (for example, `element.Name.Namespace == "http://www.adventure-works.com"`). The predefined reference equality operators in C# require one operand to be convertible to the type of the other through reference conversions only, and do not consider the implicit conversion from string to `XNamespace`.

#### Examples
The following example shows a comparison of a `XNamespace` to a string.

```csharp
XNamespace aw = "http://www.adventure-works.com";
Console.WriteLine(aw != "http://www.adventure-works.com");
```

```vb
Imports <xmlns="http://www.adventure-works.com">

Module Module1
    Sub Main()
        Dim aw As XNamespace = GetXmlNamespace()
        Console.WriteLine(aw <> "http://www.adventure-works.com")
    End Sub
End Module
```

This example produces the following output:

```txt
False
```

## XNamespace.ToString() method

```csharp
public override string ToString ();
```

Returns the URI of this `XNamespace`.

Returns: The URI of this `XNamespace`.

#### Examples
The following example uses this method to print a namespace on the console.

```csharp
XNamespace aw = "http://www.adventure-works.com";
Console.WriteLine("{0}", aw.ToString());
```

```vb
Imports <xmlns="http://www.adventure-works.com">

Module Module1
    Sub Main()
        Dim aw As XNamespace = GetXmlNamespace()
        Console.WriteLine("{0}", aw)
    End Sub
End Module
```

This example produces the following output:

```txt
http://www.adventure-works.com
```
