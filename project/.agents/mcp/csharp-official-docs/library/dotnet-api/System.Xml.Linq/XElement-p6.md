---
title: "XElement class (part 6 of 12)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Linq/XElement.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XElement class (part 6 of 12)

## XElement.Load(String, LoadOptions) method

```csharp
public static System.Xml.Linq.XElement Load (string uri, System.Xml.Linq.LoadOptions options);
```

Loads an `XElement` from a file, optionally preserving white space, setting the base URI, and retaining line information.

Parameters:

- `uri`: A URI string referencing the file to load into an `XElement`.
- `options`: A `LoadOptions` that specifies white space behavior, and whether to load base URI and line information.

Returns: An `XElement` that contains the contents of the specified file.

#### Remarks
If the source XML is indented, setting the `PreserveWhitespace` flag in `options` causes the reader to read all white space in the source XML. Nodes of type `XText` are created for both significant and insignificant white space.

If the source XML is indented, not setting the `PreserveWhitespace` flag in `options` causes the reader to ignore all of the insignificant white space in the source XML. The XML tree is created without any text nodes for insignificant white space.

If the source XML is not indented, setting the `PreserveWhitespace` flag in `options` has no effect. Significant white space is still preserved, and there are no spans of insignificant white space that could cause the creation of more white space text nodes.

For more information, see Preserve white space while loading or parsing XML and Preserve white space while serializing.

Use `XElement.Parse` to create an `XElement` from a string that contains XML.

There is a performance penalty if you set the `SetBaseUri` and the `SetLineInfo` flags.

The base URI and the line information are accurate immediately after loading the XML document. If you modify the XML tree after loading the document, the base URI and line information may become meaningless.

LINQ to XML's loading functionality is built upon `XmlReader`. Therefore, you might catch any exceptions that are thrown by the `XmlReader.Create` overload methods and the `XmlReader` methods that read and parse the document.

#### Examples
The following example loads an `XElement` from a file in two different ways: preserving white space, and not preserving white space. It then uses a query to determine the number of white space nodes in the resulting XML tree.

```csharp
XElement xmlTree1 = XElement.Parse("<Root> <Child>  </Child> </Root>", LoadOptions.PreserveWhitespace);
xmlTree1.Save("Tree.xml");
Console.WriteLine(xmlTree1);

int whiteSpaceNodes;
XElement xmlTree2 = XElement.Load("Tree.xml",
    LoadOptions.None);
whiteSpaceNodes = xmlTree2
    .DescendantNodesAndSelf()
    .OfType<XText>()
    .Where(tNode => tNode.ToString().Trim().Length == 0)
    .Count();
Console.WriteLine("Count of white space nodes (not preserving whitespace): {0}", whiteSpaceNodes);

XElement xmlTree3 = XElement.Load("Tree.xml",
    LoadOptions.PreserveWhitespace);
whiteSpaceNodes = xmlTree3
    .DescendantNodesAndSelf()
    .OfType<XText>()
    .Where(tNode => tNode.ToString().Trim().Length == 0)
    .Count();
Console.WriteLine("Count of white space nodes (preserving whitespace): {0}", whiteSpaceNodes);
```

```vb
Dim xmlTree1 As XElement = XElement.Parse("<Root> <Child>  </Child> </Root>", LoadOptions.PreserveWhitespace)
xmlTree1.Save("Tree.xml")
Console.WriteLine(xmlTree1)

Dim whiteSpaceNodes As Integer
Dim xmlTree2 As XElement = XElement.Load("Tree.xml", LoadOptions.None)
whiteSpaceNodes = xmlTree2 _
                  .DescendantNodesAndSelf() _
                  .OfType(Of XText)() _
                  .Where(Function(ByVal tNode As XNode) tNode.ToString().Trim().Length = 0) _
                  .Count()
Console.WriteLine("Count of white space nodes (not preserving whitespace): {0}", whiteSpaceNodes)

Dim xmlTree3 As XElement = XElement.Load("Tree.xml", LoadOptions.PreserveWhitespace)
whiteSpaceNodes = xmlTree3 _
                  .DescendantNodesAndSelf() _
                  .OfType(Of XText)() _
                  .Where(Function(ByVal tNode As XNode) tNode.ToString().Trim().Length = 0) _
                  .Count()
Console.WriteLine("Count of white space nodes (preserving whitespace): {0}", whiteSpaceNodes)
```

This example produces the following output:

```txt
<Root> <Child>  </Child> </Root>
Count of white space nodes (not preserving whitespace): 0
Count of white space nodes (preserving whitespace): 3
```

The following example loads the base URI and line information as it loads the file. It then prints the base URI and the line information.

This example uses the following resource file: Sample XML File: Typical Purchase Order (LINQ to XML).

```csharp
XElement po = XElement.Load("PurchaseOrder.xml",
    LoadOptions.SetBaseUri | LoadOptions.SetLineInfo);
string[] splitUri = po.BaseUri.Split('/');
Console.WriteLine("BaseUri: {0}", splitUri[splitUri.Length - 1]);
Console.WriteLine();
Console.WriteLine("{0}{1}{2}",
    "Element Name".PadRight(20),
    "Line".PadRight(5),
    "Position");
Console.WriteLine("{0}{1}{2}",
    "------------".PadRight(20),
    "----".PadRight(5),
    "--------");
foreach (XElement e in po.DescendantsAndSelf())
    Console.WriteLine("{0}{1}{2}",
        ("".PadRight(e.Ancestors().Count() * 2) + e.Name).PadRight(20),
        ((IXmlLineInfo)e).LineNumber.ToString().PadRight(5),
        ((IXmlLineInfo)e).LinePosition);
```

```vb
Dim po As XElement = XElement.Load("PurchaseOrder.xml", LoadOptions.SetBaseUri Or LoadOptions.SetLineInfo)
Dim splitUri() As String = po.BaseUri.Split("/")
Console.WriteLine("BaseUri: {0}", splitUri(splitUri.Length - 1))
Console.WriteLine()
Console.WriteLine("{0}{1}{2}", _
    "Element Name".PadRight(20), _
    "Line".PadRight(5), _
    "Position")
Console.WriteLine("{0}{1}{2}", _
    "------------".PadRight(20), _
    "----".PadRight(5), _
    "--------")
For Each e As XElement In po.DescendantsAndSelf()
    Console.WriteLine("{0}{1}{2}", _
        ("".PadRight(e.Ancestors().Count() * 2) & e.Name.ToString()).PadRight(20), _
        (DirectCast(e, IXmlLineInfo)).LineNumber.ToString().PadRight(5), _
        (DirectCast(e, IXmlLineInfo)).LinePosition)
Next
```

This example produces the following output:

```txt
BaseUri: PurchaseOrder.xml

Element Name        Line Position
------------        ---- --------
PurchaseOrder       2    2
  Address           3    4
    Name            4    6
    Street          5    6
    City            6    6
    State           7    6
    Zip             8    6
    Country         9    6
  Address           11   4
    Name            12   6
    Street          13   6
    City            14   6
    State           15   6
    Zip             16   6
    Country         17   6
  DeliveryNotes     19   4
  Items             20   4
    Item            21   6
      ProductName   22   8
      Quantity      23   8
      USPrice       24   8
      Comment       25   8
    Item            27   6
      ProductName   28   8
      Quantity      29   8
      USPrice       30   8
      ShipDate      31   8
```

## XElement.Load(XmlReader, LoadOptions) method

```csharp
public static System.Xml.Linq.XElement Load (System.Xml.XmlReader reader, System.Xml.Linq.LoadOptions options);
```

Loads an `XElement` from an `XmlReader`, optionally preserving white space, setting the base URI, and retaining line information.

Parameters:

- `reader`: A `XmlReader` that will be read for the content of the `XElement`.
- `options`: A `LoadOptions` that specifies white space behavior, and whether to load base URI and line information.

Returns: An `XElement` that contains the XML that was read from the specified `XmlReader`.

#### Remarks
By creating an `XmlNodeReader` from a DOM document, and then using the `XmlNodeReader` to create an `XElement`, this method can be used to create a copy of a DOM document in a LINQ to XML tree.

Use `XElement.Parse` to create an `XElement` from a string that contains XML.

Setting `PreserveWhitespace` is not valid when loading from a `XmlReader`. The `XmlReader` will be configured to either read whitespace or not. The LINQ to XML tree will be populated with the whitespace nodes that the reader surfaces. This will be the behavior regardless of whether `PreserveWhitespace` is set or not.

The `XmlReader` may have a valid base URI or not. If you set `SetBaseUri`, the base URI will be set in the XML tree from the base URI that is reported by the `XmlReader`.

The `XmlReader` may have a valid line information or not. If you set `SetLineInfo`, the line information will be set in the XML tree from the line information that is reported by the `XmlReader`.

There is a performance penalty if you set the `SetLineInfo` flag.

The line information is accurate immediately after loading the XML document. If you modify the XML tree after loading the document, the line information may become meaningless.

LINQ to XML's loading functionality is built upon `XmlReader`. Therefore, you might catch any exceptions that are thrown by the `XmlReader.Create` overload methods and the `XmlReader` methods that read and parse the document.

#### Examples
The following example loads the line information that it loads from the `XmlReader`. It then prints the line information.

```csharp
string markup =
@"<Root>
    <Child>
        
    </Child>
</Root>";

// Create a reader and move to the content.
using (XmlReader nodeReader = XmlReader.Create(new StringReader(markup)))
{
    // the reader must be in the Interactive state in order to
    // Create a LINQ to XML tree from it.
    nodeReader.MoveToContent();

    XElement xRoot = XElement.Load(nodeReader, LoadOptions.SetLineInfo);
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
}
```

```vb
Dim markup As String = _
    "<Root>" & Environment.NewLine & _
    "    <Child>" & Environment.NewLine & _
    "        " & Environment.NewLine & _
    "    </Child>" & Environment.NewLine & _
    "</Root>"

' Create a reader and move to the content.
Using nodeReader As XmlReader = XmlReader.Create(New StringReader(markup))

    ' the reader must be in the Interactive state in order to
    ' Create a LINQ to XML tree from it.
    nodeReader.MoveToContent()

    Dim xRoot As XElement = XElement.Load(nodeReader, LoadOptions.SetLineInfo)
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
            (DirectCast(e, IXmlLineInfo)).LineNumber.ToString().PadRight(5), _
            (DirectCast(e, IXmlLineInfo)).LinePosition)
    Next
End Using
```

This example produces the following output:

```txt
Element Name        Line Position
------------        ---- --------
Root                1    2
  Child             2    6
    GrandChild      3    10
```

## XElement.LoadAsync(Stream, LoadOptions, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task<System.Xml.Linq.XElement> LoadAsync (System.IO.Stream stream, System.Xml.Linq.LoadOptions options, System.Threading.CancellationToken <example-value>);
```

Asynchronously creates a new `XElement` and initializes its underlying XML tree using the specified stream, optionally preserving white space.

Parameters:

- `stream`: The stream containing the raw XML to read.
- `options`: A bitwise combination of the enumeration values that specify the load options to parse the XML.
- `cancellationToken`: A token that can be used to request cancellation of the asynchronous operation.

Returns: A new `XElement` containing the contents of the specified stream.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks

If `options` is set to `PreserveWhitespace`, then the `IgnoreWhitespace` property is set to `false`.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `Load`.

## XElement.LoadAsync(TextReader, LoadOptions, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task<System.Xml.Linq.XElement> LoadAsync (System.IO.TextReader textReader, System.Xml.Linq.LoadOptions options, System.Threading.CancellationToken <example-value>);
```

Asynchronously creates a new `XElement` and initializes its underlying XML tree using the specified text reader, optionally preserving white space.

Parameters:

- `textReader`: A reader containing the raw XML to read.
- `options`: A bitwise combination of the enumeration values that specify the load options to parse the XML.
- `cancellationToken`: A token that can be used to request cancellation of the asynchronous operation.

Returns: A new `XElement` containing the contents of the specified reader.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks

If `options` is set to `PreserveWhitespace`, then the `IgnoreWhitespace` property is set to `false`.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `Load`.
