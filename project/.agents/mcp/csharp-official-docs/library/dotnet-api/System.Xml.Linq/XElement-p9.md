---
title: "XElement class (part 9 of 12)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Linq/XElement.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XElement class (part 9 of 12)

## XElement.op_Explicit(XElement) method

```csharp
public static explicit operator ulong? (System.Xml.Linq.XElement? element);
```

Cast the value of this `XElement` to a `Nullable<T>` of `UInt64`.

Parameters:

- `element`: The `XElement` to cast to `Nullable<T>` of `UInt64`.

Returns: A `Nullable<T>` of `UInt64` that contains the content of this `XElement`.

Exceptions:

- `FormatException`: The element is not `null` and does not contain a valid `UInt64` value.

#### Examples
The following example creates an element with unsigned long integer content. It then retrieves the value by casting to `Nullable<T>` of `UInt64`.

```csharp
XElement root = new XElement("Root",
    new XElement("Value", 9223372036854775807)
);
ulong? value = (ulong?)root.Element("Value");
Console.WriteLine("Nullable ulong: value={0}", value == null ? "null" : value.ToString());
```

```vb
Dim root As XElement = _
        <Root>
            <Value>9223372036854775807</Value>
        </Root>

Dim value As Nullable(Of ULong) = CType(root.Element("Value"), Nullable(Of ULong))
Console.WriteLine("Nullable ulong: value={0}", IIf(value.HasValue, value.ToString(), "null"))
```

This example produces the following output:

```txt
Nullable ulong: value=9223372036854775807
```

## XElement.op_Explicit(XElement) method

```csharp
public static explicit operator float (System.Xml.Linq.XElement element);
```

Cast the value of this `XElement` to a `Single`.

Parameters:

- `element`: The `XElement` to cast to `Single`.

Returns: A `Single` that contains the content of this `XElement`.

Exceptions:

- `FormatException`: The element does not contain a valid `Single` value.
- `ArgumentNullException`: The `element` parameter is `null`.
- `InvalidOperationException`: `element` is `null`.

#### Examples
The following example creates an element with single precision floating point content. It then retrieves the value by casting to `Single`.

```csharp
XElement root = new XElement("Root", 3.402823e38);
float value = (float)root;
Console.WriteLine("value={0}", value);
```

```vb
Dim root As XElement = <Root>3.402823E+38</Root>
Dim value As Single = CSng(root)
Console.WriteLine("value={0}", value)
```

This example produces the following output:

```txt
value=3.402823E+38
```

## XElement.op_Explicit(XElement) method

```csharp
public static explicit operator string? (System.Xml.Linq.XElement? element);
```

Cast the value of this `XElement` to a `String`.

Parameters:

- `element`: The `XElement` to cast to `String`.

Returns: A `String` that contains the content of this `XElement`.

#### Remarks
If the `XElement` has children, the concatenated string value of all of the element's text and descendant's text is returned.

#### Examples
The following example creates an element with string content. It then retrieves the value by casting to `String`.

```csharp
XElement root = XElement.Parse("<Root>abc def ghi</Root>");
Console.WriteLine("(string)root={0}", (string)root);
```

```vb
Dim root As XElement = <Root>abc def ghi</Root>
Console.WriteLine("(string)root={0}", root.Value)
```

This example produces the following output:

```txt
(string)root=abc def ghi
```

## XElement.op_Explicit(XElement) method

```csharp
public static explicit operator TimeSpan (System.Xml.Linq.XElement element);
```

Cast the value of this `XElement` to a `TimeSpan`.

Parameters:

- `element`: The `XElement` to cast to `TimeSpan`.

Returns: A `TimeSpan` that contains the content of this `XElement`.

Exceptions:

- `FormatException`: The element does not contain a valid `TimeSpan` value.
- `ArgumentNullException`: The `element` parameter is `null`.

#### Remarks
The value space of an attribute or element that contains time span content is closely related to duration content as described in ISO 8601. When creating an attribute or element that contains time span content, the attribute or element values are formatted per the W3C specification. Please see the W3C specification for more details.

Behavior is lax when casting to a `TimeSpan` from an attribute or element. Even if the attribute or element value is not formatted exactly per the W3C specification, the value is appropriately converted to a `TimeSpan`.

#### Examples
The following example creates an element with time span content. It then retrieves the value by casting to `TimeSpan`.

```csharp
XElement root = new XElement("Root", new TimeSpan(1, 5, 30));
TimeSpan value = (TimeSpan)root;
Console.WriteLine("value={0}", value);
```

```vb
Dim root As XElement = <Root><%= New TimeSpan(1, 5, 30) %></Root>
Dim value As TimeSpan = CType(root, TimeSpan)
Console.WriteLine("value={0}", value)
```

This example produces the following output:

```txt
value=01:05:30
```

## XElement.op_Explicit(XElement) method

```csharp
public static explicit operator uint (System.Xml.Linq.XElement element);
```

Cast the value of this `XElement` to a `UInt32`.

Parameters:

- `element`: The `XElement` to cast to `UInt32`.

Returns: A `UInt32` that contains the content of this `XElement`.

Exceptions:

- `FormatException`: The element does not contain a valid `UInt32` value.
- `ArgumentNullException`: The `element` parameter is `null`.

#### Examples
The following example creates an element with unsigned integer content. It then retrieves the value by casting to `UInt32`.

```csharp
XElement root = new XElement("Root", 4294967295);
uint value = (uint)root;
Console.WriteLine("value={0}", value);
```

```vb
Dim root As XElement = <Root>4294967295</Root>
Dim value As UInteger = CUInt(root)
Console.WriteLine("value={0}", value)
```

This example produces the following output:

```txt
value=4294967295
```

## XElement.op_Explicit(XElement) method

```csharp
public static explicit operator ulong (System.Xml.Linq.XElement element);
```

Cast the value of this `XElement` to a `UInt64`.

Parameters:

- `element`: The `XElement` to cast to `UInt64`.

Returns: A `UInt64` that contains the content of this `XElement`.

Exceptions:

- `FormatException`: The element does not contain a valid `UInt64` value.
- `ArgumentNullException`: The `element` parameter is `null`.
- `InvalidOperationException`: `element` is `null`.

#### Examples
The following example creates an element with unsigned long integer content. It then retrieves the value by casting to `UInt64`.

```csharp
XElement root = new XElement("Root", 18446744073709551615);
ulong value = (ulong)root;
Console.WriteLine("value={0}", value);
```

```vb
Dim root As XElement = <Root>18446744073709551615</Root>
Dim value As ULong = CULng(root)
Console.WriteLine("value={0}", value)
```

This example produces the following output:

```txt
value=18446744073709551615
```

## XElement.Parse(String) method

```csharp
public static System.Xml.Linq.XElement Parse (string text);
```

Load an `XElement` from a string that contains XML.

Parameters:

- `text`: A `String` that contains XML.

Returns: An `XElement` populated from the string that contains XML.

#### Remarks
This method does not preserve white space. If you want to preserve white space in the XML tree, use the overload of the `XElement.Parse` method that takes `LoadOptions` as a parameter. For more information, see Preserve white space while loading or parsing XML and Preserve white space while serializing.

LINQ to XML's loading functionality is built upon `XmlReader`. Therefore, you might catch any exceptions that are thrown by the `XmlReader.Create` overload methods and the `XmlReader` methods that read and parse the document.

#### Examples
The following example creates a string that contains XML. It then parses the string into an `XElement`.

```csharp
XElement xmlTree = XElement.Parse("<Root> <Child> </Child> </Root>");
Console.WriteLine(xmlTree);
```

```vb
Dim xmlTree As XElement = <Root><Child></Child></Root>
Console.WriteLine(xmlTree)
```

This example produces the following output:

```xml
<Root>
  <Child></Child>
</Root>
```

## XElement.Parse(String, LoadOptions) method

```csharp
public static System.Xml.Linq.XElement Parse (string text, System.Xml.Linq.LoadOptions options);
```

Load an `XElement` from a string that contains XML, optionally preserving white space and retaining line information.

Parameters:

- `text`: A `String` that contains XML.
- `options`: A `LoadOptions` that specifies white space behavior, and whether to load base URI and line information.

Returns: An `XElement` populated from the string that contains XML.

#### Remarks
If the source XML is indented, setting the `PreserveWhitespace` flag in `options` causes the reader to read all white space in the source XML. Nodes of type `XText` are created for both significant and insignificant white space.

If the source XML is indented, not setting the `PreserveWhitespace` flag in `options` causes the reader to ignore all of the insignificant white space in the source XML. The XML tree is created without any text nodes for insignificant white space.

If the source XML is not indented, setting the `PreserveWhitespace` flag in `options` has no effect. Significant white space is still preserved, and there are no spans of insignificant white space that could cause the creation of more white space text nodes.

For more information, see Preserve white space while loading or parsing XML and Preserve white space while serializing.

Setting `SetBaseUri` will have no effect when parsing from a `String`.

The `XmlReader` may have a valid line information or not. If you set `SetLineInfo`, the line information will be set in the XML tree from the line information that is reported by the `XmlReader`.

There is a performance penalty if you set the `SetLineInfo` flag.

The line information is accurate immediately after loading the XML document. If you modify the XML tree after loading the document, the line information may become meaningless.

LINQ to XML's loading functionality is built upon `XmlReader`. Therefore, you might catch any exceptions that are thrown by the `XmlReader.Create` overload methods and the `XmlReader` methods that read and parse the document.

#### Examples
The following example parses a string into an `XElement` in two different ways: preserving white space, and not preserving white space. It then uses a query to determine the number of white space nodes in the resulting XML tree.

```csharp
int whiteSpaceNodes;

XElement xmlTree1 = XElement.Parse("<Root> <Child> </Child> </Root>",
    LoadOptions.None);
whiteSpaceNodes = xmlTree1
    .DescendantNodesAndSelf()
    .OfType<XText>()
    .Where(tNode => tNode.ToString().Trim().Length == 0)
    .Count();
Console.WriteLine("Count of white space nodes (not preserving whitespace): {0}",
    whiteSpaceNodes);

XElement xmlTree2 = XElement.Parse("<Root> <Child> </Child> </Root>",
    LoadOptions.PreserveWhitespace);
whiteSpaceNodes = xmlTree2
    .DescendantNodesAndSelf()
    .OfType<XText>()
    .Where(tNode => tNode.ToString().Trim().Length == 0)
    .Count();
Console.WriteLine("Count of white space nodes (preserving whitespace): {0}",
    whiteSpaceNodes);
```

```vb
Dim whiteSpaceNodes As Integer

Dim xmlTree1 As XElement = XElement.Parse("<Root> <Child> </Child> </Root>", LoadOptions.None)
whiteSpaceNodes = xmlTree1 _
    .DescendantNodesAndSelf() _
    .OfType(Of XText)() _
    .Where(Function(ByVal tNode As XNode) tNode.ToString().Trim().Length = 0) _
    .Count()
Console.WriteLine("Count of white space nodes (not preserving whitespace): {0}", whiteSpaceNodes)

Dim xmlTree2 As XElement = XElement.Parse("<Root> <Child> </Child> </Root>", LoadOptions.PreserveWhitespace)
whiteSpaceNodes = xmlTree2 _
    .DescendantNodesAndSelf() _
    .OfType(Of XText)() _
    .Where(Function(ByVal tNode As XNode) tNode.ToString().Trim().Length = 0) _
    .Count()
Console.WriteLine("Count of white space nodes (preserving whitespace): {0}", whiteSpaceNodes)
```

This example produces the following output:

```txt
Count of white space nodes (not preserving whitespace): 0
Count of white space nodes (preserving whitespace): 3
```

The following example retains line information as it parses the string.

```csharp
string markup =
@"<Root>
    <Child>
        
    </Child>
</Root>";

XElement xRoot = XElement.Parse(markup, LoadOptions.SetLineInfo);
Console.WriteLine("{0}{1}{2}",
    "Element Name".PadRight(20),
    "Line".PadRight(5),
    "Position");
Console.WriteLine("{0}{1}{2}",
    "------------".PadRight(20),
    "----".PadRight(5),
    "--------");
foreach (XElement e in xRoot.DescendantsAndSelf())
    Console.WriteLine("{0}{1}{2}",
        ("".PadRight(e.Ancestors().Count() * 2) + e.Name).PadRight(20),
        ((IXmlLineInfo)e).LineNumber.ToString().PadRight(5),
        ((IXmlLineInfo)e).LinePosition);
```

```vb
Dim markup As String = _
"<Root>" & Environment.NewLine & _
"    <Child>" & Environment.NewLine & _
"        " & Environment.NewLine & _
"    </Child>" & Environment.NewLine & _
"</Root>"

Dim xRoot As XElement = XElement.Parse(markup, LoadOptions.SetLineInfo)
Console.WriteLine("{0}{1}{2}", _
    "Element Name".PadRight(20), _
    "Line".PadRight(5), _
    "Position")
Console.WriteLine("{0}{1}{2}", _
    "------------".PadRight(20), _
    "----".PadRight(5), _
    "--------")
For Each e As XElement In xRoot.DescendantsAndSelf()
    Console.WriteLine("{0}{1}{2}", _
        ("".PadRight(e.Ancestors().Count() * 2) & e.Name.ToString).PadRight(20), _
        DirectCast(e, IXmlLineInfo).LineNumber.ToString().PadRight(5), _
        DirectCast(e, IXmlLineInfo).LinePosition)
Next
```

This example produces the following output:

```txt
Element Name        Line Position
------------        ---- --------
Root                1    2
  Child             2    6
    GrandChild      3    10
```

## XElement.RemoveAll() method

```csharp
public void RemoveAll ();
```

Removes nodes and attributes from this `XElement`.

#### Remarks
This method will raise the `Changed` and the `Changing` events.

#### Examples
The following example creates an element with attributes and child elements. It then calls this method to remove both the attributes and the child elements.

```csharp
XElement root = new XElement("Root",
    new XAttribute("Att1", 1),
    new XAttribute("Att2", 2),
    new XAttribute("Att3", 3),
    new XElement("Child1", 1),
    new XElement("Child2", 2),
    new XElement("Child3", 3)
);
root.RemoveAll();   // removes children elements and attributes of root
Console.WriteLine(root);
```

```vb
Dim root As XElement = _
        <Root Attr1="1" Attr2="2" Attr3="3">
            <Child1>1</Child1>
            <Child2>2</Child2>
            <Child3>3</Child3>
        </Root>

root.RemoveAll()   ' removes children elements and attributes of root
Console.WriteLine(root)
```

This example produces the following output:

```xml

```
