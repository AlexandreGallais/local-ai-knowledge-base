---
title: "XDocument class (part 4 of 5)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Linq/XDocument.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XDocument class (part 4 of 5)

## XDocument.Parse(String, LoadOptions) method

```csharp
public static System.Xml.Linq.XDocument Parse (string text, System.Xml.Linq.LoadOptions options);
```

Creates a new `XDocument` from a string, optionally preserving white space, setting the base URI, and retaining line information.

Parameters:

- `text`: A string that contains XML.
- `options`: A `LoadOptions` that specifies white space behavior, and whether to load base URI and line information.

Returns: An `XDocument` populated from the string that contains XML.

#### Remarks
If the source XML is indented, setting the `PreserveWhitespace` flag in `options` causes the reader to read all white space in the source XML. Nodes of type `XText` are created for both significant and insignificant white space.

If the source XML is indented, not setting the `PreserveWhitespace` flag in `options` causes the reader to ignore all of the insignificant white space in the source XML. The XML tree is created without any text nodes for insignificant white space.

If the source XML is not indented, setting the `PreserveWhitespace` flag in `options` has no effect. Significant white space is still preserved, and there are no spans of insignificant white space that could cause the creation of more white space text nodes.

For more information, see Preserve white space while loading or parsing XML and Preserve white space while serializing.

Setting `SetBaseUri` is not valid when parsing from a `String`.

There is a performance penalty if you set the `SetLineInfo` flag.

The line information is accurate immediately after loading the XML document. If you modify the XML tree after loading the document, the line information may become meaningless.

LINQ to XML's loading functionality is built upon `XmlReader`. Therefore, you might catch any exceptions that are thrown by the `XmlReader.Create` overload methods and the `XmlReader` methods that read and parse the document.

#### Examples
The following example parses a string into an `XDocument`.

```csharp
string str =
@"<?xml version=""1.0""?>
<!-- comment at the root level -->
<Root>
    <Child>Content</Child>
</Root>";
XDocument doc1 = XDocument.Parse(str, LoadOptions.PreserveWhitespace);
Console.WriteLine("nodes when preserving whitespace: {0}", doc1.DescendantNodes().Count());
XDocument doc2 = XDocument.Parse(str, LoadOptions.None);
Console.WriteLine("nodes when not preserving whitespace: {0}", doc2.DescendantNodes().Count());
```

```vb
Dim str As String = _
"<?xml version= '1.0'?>" & Environment.NewLine & _
"<!-- comment at the root level -->" & Environment.NewLine & _
"<Root>" & Environment.NewLine & _
"    <Child>Content</Child>"  & Environment.NewLine & _
"</Root>"

Dim doc1 As XDocument = XDocument.Parse(str, LoadOptions.PreserveWhitespace)
Console.WriteLine("nodes when preserving whitespace: {0}", doc1.DescendantNodes().Count())
Dim doc2 As XDocument = XDocument.Parse(str, LoadOptions.None)
Console.WriteLine("nodes when not preserving whitespace: {0}", doc2.DescendantNodes().Count())
```

This example produces the following output:

```txt
nodes when preserving whitespace: 8
nodes when not preserving whitespace: 4
```

## XDocument.Save(Stream) method

```csharp
public void Save (System.IO.Stream stream);
```

Outputs this `XDocument` to the specified `Stream`.

Parameters:

- `stream`: The stream to output this `XDocument` to.

#### Remarks
The serialized XML will be indented. All insignificant white space will be removed, and additional white space will be added so that the XML will be properly indented. The behavior of this method is that insignificant white space will not be preserved.

If you want to control white space, use the overload of `XDocument.Save` that takes `SaveOptions` as a parameter. Use the `DisableFormatting` option to save unindented XML. This will cause the writer to write all white spaces exactly as represented in the XML tree.

Use `OmitDuplicateNamespaces` option if you want to remove duplicate namespace declarations.

## XDocument.Save(TextWriter) method

```csharp
public void Save (System.IO.TextWriter textWriter);
```

Serialize this `XDocument` to a `TextWriter`.

Parameters:

- `textWriter`: A `TextWriter` that the `XDocument` will be written to.

#### Remarks
The serialized XML will be indented. All insignificant white space will be removed, and additional white space will be added so that the XML will be properly indented. The behavior of this method is that insignificant white space will not be preserved.

If you want to control white space, use the overload of `XDocument.Save` that takes `SaveOptions` as a parameter. For more information, see Preserve white space while loading or parsing XML and Preserve white space while serializing.

#### Examples
The following example creates an `XDocument`, saves the document to a `StringWriter`, and then prints the string to the console.

```csharp
StringBuilder sb = new StringBuilder();

XDocument doc = new XDocument(
    new XElement("Root",
        new XElement("Child", "content")
    )
);
TextWriter tr = new StringWriter(sb);
doc.Save(tr);
Console.WriteLine(sb.ToString());
```

```vb
Dim sb As StringBuilder = New StringBuilder()

Dim doc As XDocument = _
    <?xml version="1.0" encoding="utf-8"?>
        <Root><Child>content</Child></Root>

Dim tr As TextWriter = New StringWriter(sb)
doc.Save(tr)
Console.WriteLine(sb.ToString())
```

This example produces the following output:

```xml
<?xml version="1.0" encoding="utf-16"?>
<Root>
  <Child>content</Child>
</Root>
```

## XDocument.Save(String) method

```csharp
public void Save (string fileName);
```

Serialize this `XDocument` to a file, overwriting an existing file, if it exists.

Parameters:

- `fileName`: A string that contains the name of the file.

#### Remarks
The serialized XML will be indented. All insignificant white space will be removed, and additional white space will be added so that the XML will be properly indented. The behavior of this method is that insignificant white space will not be preserved.

If you want to control white space, use the overload of `XDocument.Save` that takes `SaveOptions` as a parameter. For more information, see Preserve white space while loading or parsing XML and Preserve white space while serializing.

#### Examples
The following example creates an `XDocument`, saves the document to a file, and then prints the file to the console.

```csharp
XDocument doc = new XDocument(
    new XElement("Root",
        new XElement("Child", "content")
    )
);
doc.Save("Root.xml");
Console.WriteLine(File.ReadAllText("Root.xml"));
```

```vb
Dim doc As XDocument = _
    <?xml version="1.0" encoding="utf-8"?>
        <Root><Child>content</Child></Root>

doc.Save("Root.xml")
Console.WriteLine(File.ReadAllText("Root.xml"))
```

This example produces the following output:

```xml
<?xml version="1.0" encoding="utf-8"?>
<Root>
  <Child>content</Child>
</Root>
```

## XDocument.Save(XmlWriter) method

```csharp
public void Save (System.Xml.XmlWriter writer);
```

Serialize this `XDocument` to an `XmlWriter`.

Parameters:

- `writer`: A `XmlWriter` that the `XDocument` will be written to.

#### Examples
The following example shows how to save an `XDocument` to an `XmlWriter`.

```csharp
StringBuilder sb = new StringBuilder();
XmlWriterSettings xws = new XmlWriterSettings();
xws.OmitXmlDeclaration = true;
xws.Indent = true;

using (XmlWriter xw = XmlWriter.Create(sb, xws)) {
    XDocument doc = new XDocument(
        new XElement("Child",
            new XElement("GrandChild", "some content")
        )
    );
    doc.Save(xw);
}

Console.WriteLine(sb.ToString());
```

```vb
Dim sb As StringBuilder = New StringBuilder()
Dim xws As XmlWriterSettings = New XmlWriterSettings()
xws.OmitXmlDeclaration = True
xws.Indent = True

Using xw = XmlWriter.Create(sb, xws)
    Dim doc As XDocument = New XDocument(<Child><GrandChild>some content</GrandChild></Child>)
    doc.Save(xw)

End Using

Console.WriteLine(sb.ToString())
```

This example produces the following output:

```xml
<Child>
  <GrandChild>some content</GrandChild>
</Child>
```

## XDocument.Save(Stream, SaveOptions) method

```csharp
public void Save (System.IO.Stream stream, System.Xml.Linq.SaveOptions options);
```

Outputs this `XDocument` to the specified `Stream`, optionally specifying formatting behavior.

Parameters:

- `stream`: The stream to output this `XDocument` to.
- `options`: A `SaveOptions` that specifies formatting behavior.

#### Remarks
By default the `options` are set to `None`. This option will remove all extraneous insignificant white space, and add appropriate insignificant white space so that the XML is properly indented.

If you want to save unindented XML, specify the `DisableFormatting` flag for `options`. This will cause the writer to write all white spaces exactly as represented in the XML tree.

Use `OmitDuplicateNamespaces` option if you want to remove duplicate namespace declarations.

## XDocument.Save(TextWriter, SaveOptions) method

```csharp
public void Save (System.IO.TextWriter textWriter, System.Xml.Linq.SaveOptions options);
```

Serialize this `XDocument` to a `TextWriter`, optionally disabling formatting.

Parameters:

- `textWriter`: The `TextWriter` to output the XML to.
- `options`: A `SaveOptions` that specifies formatting behavior.

#### Remarks
If you want to save unindented XML, specify the `DisableFormatting` flag for `options`. This will cause the writer to write all white space exactly as represented in the XML tree.

If you want to save indented XML, do not specify the `DisableFormatting` flag for `options`. This will remove all extraneous insignificant white space, and add appropriate insignificant white space so that the XML is properly indented. This is the default behavior, and the behavior of the overloads of the `XDocument.Save` methods that do not take `options` as a parameter.

For more information, see Preserve white space while loading or parsing XML and Preserve white space while serializing.

#### Examples
The following example shows two uses of this method. The first use serializes the `XDocument` with formatting. The second preserves white space. Because the document has no white space in it as constructed, preserving white space outputs the XML without any indenting.

```csharp
XDocument doc = new XDocument(
    new XElement("Root",
        new XElement("Child", "content")
    )
);
StringBuilder sb1 = new StringBuilder();
using (StringWriter sr1 = new StringWriter(sb1)) {
    doc.Save(sr1, SaveOptions.None);
    Console.WriteLine(sb1.ToString());
}

StringBuilder sb2 = new StringBuilder();
using (StringWriter sr2 = new StringWriter(sb2)) {
    doc.Save(sr2, SaveOptions.DisableFormatting);
    Console.WriteLine(sb2.ToString());
}
```

```vb
Dim doc As XDocument = _
    <?xml version="1.0" encoding="utf-8"?>
        <Root><Child>content</Child></Root>

Dim sb1 As StringBuilder = New StringBuilder()

Using sr1 = New StringWriter(sb1)
    doc.Save(sr1, SaveOptions.None)
    Console.WriteLine(sb1.ToString())
End Using

Dim sb2 As StringBuilder = New StringBuilder()

Using sr2 = New StringWriter(sb2)
    doc.Save(sr2, SaveOptions.DisableFormatting)
    Console.WriteLine(sb2.ToString())
End Using
```

This example produces the following output:

```txt
<?xml version="1.0" encoding="utf-16"?>
<Root>
  <Child>content</Child>
</Root>
<?xml version="1.0" encoding="utf-16"?><Root><Child>content</Child></Root>
```

## XDocument.Save(String, SaveOptions) method

```csharp
public void Save (string fileName, System.Xml.Linq.SaveOptions options);
```

Serialize this `XDocument` to a file, optionally disabling formatting.

Parameters:

- `fileName`: A string that contains the name of the file.
- `options`: A `SaveOptions` that specifies formatting behavior.

#### Remarks
If you want to save unindented XML, specify the `DisableFormatting` flag for `options`. This will cause the writer to write all white space exactly as represented in the XML tree.

If you want to save indented XML, do not specify the `DisableFormatting` flag for `options`. This will remove all extraneous insignificant white space, and add appropriate insignificant white space so that the XML is properly indented. This is the default behavior, and the behavior of the overloads of the `XDocument.Save` methods that do not take `options` as a parameter.

For more information, see Preserve white space while loading or parsing XML and Preserve white space while serializing.

#### Examples
The following example shows two uses of this method. The first use preserves white space. The second one serializes the `XDocument` with indenting.

```csharp
XDocument doc = new XDocument(
    new XElement("Root",
        new XElement("Child", "content")
    )
);
doc.Save("Root1.xml", SaveOptions.DisableFormatting);
Console.WriteLine(File.ReadAllText("Root1.xml"));
doc.Save("Root2.xml", SaveOptions.None);
Console.WriteLine(File.ReadAllText("Root2.xml"));
```

```vb
Dim doc As XDocument = _
    <?xml version="1.0" encoding="utf-8"?>
        <Root><Child>content</Child></Root>

doc.Save("Root1.xml", SaveOptions.DisableFormatting)
Console.WriteLine(File.ReadAllText("Root1.xml"))
doc.Save("Root2.xml", SaveOptions.None)
Console.WriteLine(File.ReadAllText("Root2.xml"))
```

This example produces the following output:

```xml
<?xml version="1.0" encoding="utf-8"?><Root><Child>content</Child></Root>
<?xml version="1.0" encoding="utf-8"?>
<Root>
  <Child>content</Child>
</Root>
```

## XDocument.SaveAsync(XmlWriter, CancellationToken) method

```csharp
public System.Threading.Tasks.Task SaveAsync (System.Xml.XmlWriter writer, System.Threading.CancellationToken <example-value>);
```

Writes this `XDocument` to an `XmlWriter`.

Parameters:

- `writer`: The writer to output the XML to.
- `cancellationToken`: A cancellation token.

Returns: A task representing the asynchronous save operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `XDocument.Save`.
