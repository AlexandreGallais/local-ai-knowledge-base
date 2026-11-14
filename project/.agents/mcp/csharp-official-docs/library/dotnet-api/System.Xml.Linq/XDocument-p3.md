---
title: "XDocument class (part 3 of 5)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Linq/XDocument.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XDocument class (part 3 of 5)

## XDocument.Load(String, LoadOptions) method

```csharp
public static System.Xml.Linq.XDocument Load (string uri, System.Xml.Linq.LoadOptions options);
```

Creates a new `XDocument` from a file, optionally preserving white space, setting the base URI, and retaining line information.

Parameters:

- `uri`: A URI string that references the file to load into a new `XDocument`.
- `options`: A `LoadOptions` that specifies white space behavior, and whether to load base URI and line information.

Returns: An `XDocument` that contains the contents of the specified file.

#### Remarks
If the source XML is indented, setting the `PreserveWhitespace` flag in `options` causes the reader to read all white space in the source XML. Nodes of type `XText` are created for both significant and insignificant white space.

If the source XML is indented, not setting the `PreserveWhitespace` flag in `options` causes the reader to ignore all of the insignificant white space in the source XML. The XML tree is created without any text nodes for insignificant white space.

If the source XML is not indented, setting the `PreserveWhitespace` flag in `options` has no effect. Significant white space is still preserved, and there are no spans of insignificant white space that could cause the creation of more white space text nodes.

For more information, see Preserve white space while loading or parsing XML and Preserve white space while serializing.

Use `XDocument.Parse` to create an `XDocument` from a string that contains XML.

There is a performance penalty if you set the `SetBaseUri` and the `SetLineInfo` flags.

The base URI and the line information are accurate immediately after loading the XML document. If you modify the XML tree after loading the document, the base URI and line information may become meaningless.

LINQ to XML's loading functionality is built upon `XmlReader`. Therefore, you might catch any exceptions that are thrown by the `XmlReader.Create` overload methods and the `XmlReader` methods that read and parse the document.

#### Examples
The following example shows how to load an `XDocument` from a file.

This example uses the following XML document:

Sample XML File: Typical Purchase Order (LINQ to XML)

```csharp
XDocument doc1 = XDocument.Load("PurchaseOrder.xml", LoadOptions.None);
Console.WriteLine("nodes if not preserving whitespace: {0}", doc1.DescendantNodes().Count());

XDocument doc2 = XDocument.Load("PurchaseOrder.xml", LoadOptions.PreserveWhitespace);
Console.WriteLine("nodes if preserving whitespace: {0}", doc2.DescendantNodes().Count());
```

```vb
Dim doc1 As XDocument = XDocument.Load("PurchaseOrder.xml", LoadOptions.None)
Console.WriteLine("nodes if not preserving whitespace: {0}", doc1.DescendantNodes().Count())

Dim doc2 As XDocument = XDocument.Load("PurchaseOrder.xml", LoadOptions.PreserveWhitespace)
Console.WriteLine("nodes if preserving whitespace: {0}", doc2.DescendantNodes().Count())
```

This example produces the following output:

```txt
nodes if not preserving whitespace: 48
nodes if preserving whitespace: 82
```

## XDocument.Load(XmlReader, LoadOptions) method

```csharp
public static System.Xml.Linq.XDocument Load (System.Xml.XmlReader reader, System.Xml.Linq.LoadOptions options);
```

Loads an `XDocument` from an `XmlReader`, optionally setting the base URI, and retaining line information.

Parameters:

- `reader`: A `XmlReader` that will be read for the content of the `XDocument`.
- `options`: A `LoadOptions` that specifies whether to load base URI and line information.

Returns: An `XDocument` that contains the XML that was read from the specified `XmlReader`.

#### Remarks
By creating an `XmlNodeReader` from a DOM document, and then using the `XmlNodeReader` to create an `XElement`, this method can be used to create a copy of a DOM document in a LINQ to XML tree.

Use `XDocument.Parse` to create an `XDocument` from a string that contains XML.

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

    XDocument xRoot = XDocument.Load(nodeReader, LoadOptions.SetLineInfo);
    Console.WriteLine("{0}{1}{2}",
        "Element Name".PadRight(20),
        "Line".PadRight(5),
        "Position");
    Console.WriteLine("{0}{1}{2}",
        "------------".PadRight(20),
        "----".PadRight(5),
        "--------");
    foreach (XElement e in xRoot.Elements("Root").DescendantsAndSelf())
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

    ' The reader must be in the Interactive state in order to
    ' create a LINQ to XML tree from it.
    nodeReader.MoveToContent()

    Dim xRoot As XDocument = XDocument.Load(nodeReader, LoadOptions.SetLineInfo)
    Console.WriteLine("{0}{1}{2}", _
        "Element Name".PadRight(20), _
        "Line".PadRight(5), _
        "Position")
    Console.WriteLine("{0}{1}{2}", _
        "------------".PadRight(20), _
        "----".PadRight(5), _
        "--------")
    For Each e As XElement In xRoot.Elements("Root").DescendantsAndSelf()
        Console.WriteLine("{0}{1}{2}", _
            ("".PadRight(e.Ancestors().Count() * 2) & e.Name.ToString()).PadRight(20), _
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

## XDocument.LoadAsync(Stream, LoadOptions, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task<System.Xml.Linq.XDocument> LoadAsync (System.IO.Stream stream, System.Xml.Linq.LoadOptions options, System.Threading.CancellationToken <example-value>);
```

Asynchronously creates a new `XDocument` and initializes its underlying XML tree from the specified stream, optionally preserving white space.

Parameters:

- `stream`: A stream containing the raw XML to read into the newly created `XDocument`.
- `options`: A set of load options.
- `cancellationToken`: A cancellation token.

Returns: A new XDocument containing the contents of the specified `Stream`.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks

If `PreserveWhitespace` is set, the underlying `IgnoreWhitespace` property is set to `false`.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `Load`.

## XDocument.LoadAsync(TextReader, LoadOptions, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task<System.Xml.Linq.XDocument> LoadAsync (System.IO.TextReader textReader, System.Xml.Linq.LoadOptions options, System.Threading.CancellationToken <example-value>);
```

Creates a new `XDocument` and initializes its underlying XML tree using the specified `TextReader` parameter, optionally preserving white space.

Parameters:

- `textReader`: A reader that contains the raw XML to read into the newly created `XDocument`.
- `options`: A set of load options.
- `cancellationToken`: A cancellation token.

Returns: A new XDocument containing the contents of the specified `TextReader`.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks

If `PreserveWhitespace` is set, the `IgnoreWhitespace` property is set to `false`.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `Load`.

## XDocument.LoadAsync(XmlReader, LoadOptions, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task<System.Xml.Linq.XDocument> LoadAsync (System.Xml.XmlReader reader, System.Xml.Linq.LoadOptions options, System.Threading.CancellationToken <example-value>);
```

Creates a new `XDocument` containing the contents of the specified `XmlReader`.

Parameters:

- `reader`: A reader containing the XML to be read into the new `XDocument`.
- `options`: A set of load options.
- `cancellationToken`: A cancellation token.

Returns: A new XDocument containing the contents of the specified `XmlReader`.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `XDocument.Load`.

## XDocument.Parse(String) method

```csharp
public static System.Xml.Linq.XDocument Parse (string text);
```

Creates a new `XDocument` from a string.

Parameters:

- `text`: A string that contains XML.

Returns: An `XDocument` populated from the string that contains XML.

#### Remarks
This method does not preserve white space. If you want to preserve white space in the XML tree, use the overload of `XDocument.Parse` that takes `LoadOptions` as a parameter.

For more information, see Preserve white space while loading or parsing XML and Preserve white space while serializing.

LINQ to XML's loading functionality is built upon `XmlReader`. Therefore, you might catch any exceptions that are thrown by the `XmlReader.Create` overload methods and the `XmlReader` methods that read and parse the document.

#### Examples
The following example creates a string that contains XML. It then parses the string into an `XDocument`.

```csharp
string str =
@"<?xml version=""1.0""?>
<!-- comment at the root level -->
<Root>
    <Child>Content</Child>
</Root>";
XDocument doc = XDocument.Parse(str);
Console.WriteLine(doc);
```

```vb
Dim str As String = _
    "<?xml version= '1.0'?>" & _
    "<!-- comment at the root level -->" & _
    "<Root>" & _
    "  <Child>Content</Child>" & _
    "</Root>"

Dim doc As XDocument = XDocument.Parse(str)
Console.WriteLine(doc)
```

This example produces the following output:

```xml
<!-- comment at the root level -->
<Root>
  <Child>Content</Child>
</Root>
```
