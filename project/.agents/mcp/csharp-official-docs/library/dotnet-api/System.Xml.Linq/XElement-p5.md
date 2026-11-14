---
title: "XElement class (part 5 of 12)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Linq/XElement.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XElement class (part 5 of 12)

## XElement.Load(XmlReader) method

```csharp
public static System.Xml.Linq.XElement Load (System.Xml.XmlReader reader);
```

Loads an `XElement` from an `XmlReader`.

Parameters:

- `reader`: A `XmlReader` that will be read for the content of the `XElement`.

Returns: An `XElement` that contains the XML that was read from the specified `XmlReader`.

#### Remarks
By creating an `XmlNodeReader` from a DOM document, and then using the `XmlNodeReader` to create an `XElement`, this method can be used to create a copy of a DOM document in a LINQ to XML tree.

LINQ to XML's loading functionality is built upon `XmlReader`. Therefore, you might catch any exceptions that are thrown by the `XmlReader.Create` overload methods and the `XmlReader` methods that read and parse the document.

#### Examples
The following example creates a DOM document, creates an `XmlNodeReader` from the DOM document, instantiates a tree from the reader. This code effectively copies a DOM document into a LINQ to XML tree.

```csharp
// Create a DOM document with some content.
XmlDocument doc = new XmlDocument();
XmlElement child = doc.CreateElement("Child");
child.InnerText = "child contents";
XmlElement root = doc.CreateElement("Root");
root.AppendChild(child);
doc.AppendChild(root);

// Create a reader and move to the content.
using (XmlNodeReader nodeReader = new XmlNodeReader(doc)) {
    // the reader must be in the Interactive state in order to
    // Create a LINQ to XML tree from it.
    nodeReader.MoveToContent();

    XElement xRoot = XElement.Load(nodeReader);
    Console.WriteLine(xRoot);
}
```

```vb
' Create a DOM document with some content.
Dim doc As XmlDocument = New XmlDocument()
Dim child As XmlElement = doc.CreateElement("Child")
child.InnerText = "child contents"
Dim root As XmlElement = doc.CreateElement("Root")
root.AppendChild(child)
doc.AppendChild(root)

' Create a reader and move to the content.
Using nodeReader = New XmlNodeReader(doc)
    ' the reader must be in the Interactive state in order to
    ' Create a LINQ to XML tree from it.
    nodeReader.MoveToContent()

    Dim xRoot As XElement = XElement.Load(nodeReader)
    Console.WriteLine(xRoot)
End Using
```

This example produces the following output:

```xml
<Root>
  <Child>child contents</Child>
</Root>
```

## XElement.Load(Stream, LoadOptions) method

```csharp
public static System.Xml.Linq.XElement Load (System.IO.Stream stream, System.Xml.Linq.LoadOptions options);
```

Creates a new `XElement` instance by using the specified stream, optionally preserving white space, setting the base URI, and retaining line information.

Parameters:

- `stream`: The stream containing the XML data.
- `options`: A `LoadOptions` object that specifies whether to load base URI and line information.

Returns: An `XElement` object used to read the data that the stream contains.

#### Remarks
LINQ to XML's loading functionality is built upon `XmlReader`. Therefore, you might catch any exceptions that are thrown by the `XmlReader.Create` overload methods and the `XmlReader` methods that read and parse the document.

If you have to modify `XmlReaderSettings`, following these steps:

1.  Create an `XmlReader` by calling one of the `XmlReader.Create` overloads that take `XmlReaderSettings` as a parameter.

2.  Pass the `XmlReader` to one of the `XElement`'s `XElement.Load` overloads that takes `XmlReader` as a parameter.

## XElement.Load(TextReader, LoadOptions) method

```csharp
public static System.Xml.Linq.XElement Load (System.IO.TextReader textReader, System.Xml.Linq.LoadOptions options);
```

Loads an `XElement` from a `TextReader`, optionally preserving white space and retaining line information.

Parameters:

- `textReader`: A `TextReader` that will be read for the `XElement` content.
- `options`: A `LoadOptions` that specifies white space behavior, and whether to load base URI and line information.

Returns: An `XElement` that contains the XML that was read from the specified `TextReader`.

#### Remarks
If the source XML is indented, setting the `PreserveWhitespace` flag in `options` causes the reader to read all white space in the source XML. Nodes of type `XText` are created for both significant and insignificant white space.

If the source XML is indented, not setting the `PreserveWhitespace` flag in `options` causes the reader to ignore all of the insignificant white space in the source XML. The XML tree is created without any text nodes for insignificant white space.

If the source XML is not indented, setting the `PreserveWhitespace` flag in `options` has no effect. Significant white space is still preserved, and there are no spans of insignificant white space that could cause the creation of more white space text nodes.

For more information, see Preserve white space while loading or parsing XML and Preserve white space while serializing.

Use `XElement.Parse` to create an `XElement` from a string that contains XML.

Setting `SetBaseUri` will have no effect when loading from a `TextReader`.

There is a performance penalty if you set the `SetLineInfo` flag.

The line information is accurate immediately after loading the XML document. If you modify the XML tree after loading the document, the line information may become meaningless.

LINQ to XML's loading functionality is built upon `XmlReader`. Therefore, you might catch any exceptions that are thrown by the `XmlReader.Create` overload methods and the `XmlReader` methods that read and parse the document.

#### Examples
The following example loads an `XElement` from a `StringReader` in two different ways: preserving white space, and not preserving white space. It then uses a query to determine the number of white space nodes in the resulting XML tree.

```csharp
TextReader sr;
int whiteSpaceNodes;

sr = new StringReader("<Root> <Child> </Child> </Root>");
XElement xmlTree1 = XElement.Load(sr, LoadOptions.None);
sr.Close();
whiteSpaceNodes = xmlTree1
    .DescendantNodesAndSelf()
    .OfType<XText>()
    .Where(tNode => tNode.ToString().Trim().Length == 0)
    .Count();
Console.WriteLine("Count of white space nodes (not preserving whitespace): {0}", whiteSpaceNodes);

sr = new StringReader("<Root> <Child> </Child> </Root>");
XElement xmlTree2 = XElement.Load(sr, LoadOptions.PreserveWhitespace);
sr.Close();
whiteSpaceNodes = xmlTree2
    .DescendantNodesAndSelf()
    .OfType<XText>()
    .Where(tNode => tNode.ToString().Trim().Length == 0)
    .Count();
Console.WriteLine("Count of white space nodes (preserving whitespace): {0}", whiteSpaceNodes);
```

```vb
Dim sr As TextReader
Dim whiteSpaceNodes As Integer

sr = New StringReader("<Root> <Child> </Child> </Root>")
Dim xmlTree1 As XElement = XElement.Load(sr, LoadOptions.None)
sr.Close()
whiteSpaceNodes = xmlTree1 _
    .DescendantNodesAndSelf() _
    .OfType(Of XText)() _
    .Where(Function(ByVal tNode As XNode) tNode.ToString().Trim().Length = 0) _
    .Count()
Console.WriteLine("Count of white space nodes (not preserving whitespace): {0}", whiteSpaceNodes)

sr = New StringReader("<Root> <Child> </Child> </Root>")
Dim xmlTree2 As XElement = XElement.Load(sr, LoadOptions.PreserveWhitespace)
sr.Close()
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

The following example loads the line information as it loads from the `TextReader`. It then prints the line information.

```csharp
TextReader sr = new StringReader(
@"<Root>
  <Child>
    
    
  </Child>
</Root>");
XElement po = XElement.Load(sr,
    LoadOptions.SetLineInfo);
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
Dim sr As TextReader = New StringReader( _
    "<Root>" & Environment.NewLine & _
    "  <Child>" & Environment.NewLine & _
    "    " & Environment.NewLine & _
    "    " & Environment.NewLine & _
    "  </Child>" & Environment.NewLine & _
    "</Root>")
Dim po As XElement = XElement.Load(sr, LoadOptions.SetLineInfo)
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
        ("".PadRight(e.Ancestors().Count() * 2) & e.Name.ToString).PadRight(20), _
        (DirectCast(e, IXmlLineInfo)).LineNumber.ToString().PadRight(5), _
        (DirectCast(e, IXmlLineInfo)).LinePosition)
Next
```

This example produces the following output:

```txt
Element Name        Line Position
------------        ---- --------
Root                1    2
  Child             2    4
    GrandChild1     3    6
    GrandChild2     4    6
```
