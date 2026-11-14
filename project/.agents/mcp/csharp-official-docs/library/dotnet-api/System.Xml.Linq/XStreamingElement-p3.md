---
title: "XStreamingElement class (part 3 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Linq/XStreamingElement.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XStreamingElement class (part 3 of 4)

## XStreamingElement.Save(String) method

```csharp
public void Save (string fileName);
```

Serialize this streaming element to a file.

Parameters:

- `fileName`: A `String` that contains the name of the file.

#### Remarks
The serialized XML will be indented. All insignificant white space will be removed, and additional white space will be added so that the XML will be properly indented. The behavior of this method is that insignificant white space nodes in the XML tree will not be preserved.

If you want to control white space, use one of the overloads of `XStreamingElement.Save` that take `SaveOptions` as a parameter. For more information, see Preserve white space while loading or parsing XML and Preserve white space while serializing.

#### Examples
The following example creates a streaming XML tree. It then serializes the streaming XML tree to a file.

```csharp
XElement srcTree = new XElement("Root",
                       new XElement("Child", 1),
                       new XElement("Child", 2),
                       new XElement("Child", 3),
                       new XElement("Child", 4),
                       new XElement("Child", 5)
                   );

XStreamingElement dstTree = new XStreamingElement("NewRoot",
                        from el in srcTree.Elements()
                        where (int)el >= 3
                        select new XElement("DifferentChild", (int)el)
                    );

dstTree.Save("Test.xml");
Console.WriteLine(File.ReadAllText("Test.xml"));
```

```vb
Dim srcTree As XElement = _
    <Root>
        <Child>1</Child>
        <Child>2</Child>
        <Child>3</Child>
        <Child>4</Child>
        <Child>5</Child>
    </Root>

Dim dstTree As XStreamingElement = New XStreamingElement("NewRoot", _
                        From el In srcTree.Elements() _
                        Where el.Value >= 3 _
                        Select <DifferentChild><%= el.Value %></DifferentChild> _
                    )

dstTree.Save("Test.xml")
Console.WriteLine(File.ReadAllText("Test.xml"))
```

This example produces the following output:

```xml
<?xml version="1.0" encoding="utf-8"?>
<NewRoot>
  <DifferentChild>3</DifferentChild>
  <DifferentChild>4</DifferentChild>
  <DifferentChild>5</DifferentChild>
</NewRoot>
```

## XStreamingElement.Save(XmlWriter) method

```csharp
public void Save (System.Xml.XmlWriter writer);
```

Serialize this streaming element to an `XmlWriter`.

Parameters:

- `writer`: A `XmlWriter` that the `XElement` will be written to.

#### Examples
The following example creates an `XStreamingElement` and writes it to an `XmlWriter`.

```csharp
XElement srcTree = new XElement("Root",
                       new XElement("Child", 1),
                       new XElement("Child", 2),
                       new XElement("Child", 3),
                       new XElement("Child", 4),
                       new XElement("Child", 5)
                   );

StringBuilder sb = new StringBuilder();
XmlWriterSettings xws = new XmlWriterSettings();
xws.OmitXmlDeclaration = true;
using (XmlWriter xw = XmlWriter.Create(sb, xws))
{
    XStreamingElement dstTree = new XStreamingElement("NewRoot",
                            from el in srcTree.Elements()
                            where (int)el == 5
                            select new XElement("DifferentChild", (int)el)
                        );

    dstTree.Save(xw);
}
Console.WriteLine(sb.ToString());
```

```vb
Dim srcTree As XElement = _
    <Root>
        <Child>1</Child>
        <Child>2</Child>
        <Child>3</Child>
        <Child>4</Child>
        <Child>5</Child>
    </Root>

Dim sb As StringBuilder = New StringBuilder()
Dim xws As XmlWriterSettings = New XmlWriterSettings()
xws.OmitXmlDeclaration = True
Using xw As XmlWriter = XmlWriter.Create(sb, xws)
    Dim dstTree As XStreamingElement = New XStreamingElement("NewRoot", _
                            From el In srcTree.Elements() _
                            Where el.Value = 5 _
                            Select <DifferentChild><%= el.Value %></DifferentChild> _
                        )
    dstTree.Save(xw)
End Using
Console.WriteLine(sb.ToString())
```

This example produces the following output:

```xml
<NewRoot><DifferentChild>5</DifferentChild></NewRoot>
```

## XStreamingElement.Save(Stream, SaveOptions) method

```csharp
public void Save (System.IO.Stream stream, System.Xml.Linq.SaveOptions options);
```

Outputs this `XStreamingElement` to the specified `Stream`, optionally specifying formatting behavior.

Parameters:

- `stream`: The stream to output this `XDocument` to.
- `options`: A `SaveOptions` object that specifies formatting behavior.

#### Remarks
By default the `options` are set to `None`. This option will remove all extraneous insignificant white space, and add appropriate insignificant white space so that the XML is properly indented.

If you want to save unindented XML, specify the `DisableFormatting` flag for `options`. This will cause the writer to write all white spaces exactly as represented in the XML tree.

Use `OmitDuplicateNamespaces` option if you want to remove duplicate namespace declarations.

## XStreamingElement.Save(TextWriter, SaveOptions) method

```csharp
public void Save (System.IO.TextWriter textWriter, System.Xml.Linq.SaveOptions options);
```

Serialize this streaming element to a `TextWriter`, optionally disabling formatting.

Parameters:

- `textWriter`: The `TextWriter` to output the XML to.
- `options`: A `SaveOptions` that specifies formatting behavior.

#### Remarks
If you want to save unindented XML, specify the `DisableFormatting` flag for `options`. This will cause the writer to write all white space exactly as represented in the XML tree.

If you want to save indented XML, do not specify the `DisableFormatting` flag for `options`. This will remove all extraneous insignificant white space, and add appropriate insignificant white space so that the XML is properly indented. This is the default behavior, and the behavior of the overloads of the `XElement.Save` methods that do not take `options` as a parameter.

For more information, see Preserve white space while loading or parsing XML and Preserve white space while serializing.

#### Examples
The following example shows two uses of this method. The first use preserves white space. The second one serializes the `XStreamingElement` with formatting.

```csharp
XElement srcTree = new XElement("Root",
                       new XElement("Child", 1),
                       new XElement("Child", 2),
                       new XElement("Child", 3),
                       new XElement("Child", 4),
                       new XElement("Child", 5)
                   );

XStreamingElement dstTree = new XStreamingElement("NewRoot",
                        from el in srcTree.Elements()
                        where (int)el == 3
                        select new XElement("DifferentChild", (int)el)
                    );

StringBuilder sb = new StringBuilder();
dstTree.Save(new StringWriter(sb), SaveOptions.DisableFormatting);
Console.WriteLine(sb.ToString());
Console.WriteLine("------");
sb = new StringBuilder();
dstTree.Save(new StringWriter(sb), SaveOptions.None);
Console.WriteLine(sb.ToString());
```

```vb
Dim srcTree As XElement = _
    <Root>
        <Child>1</Child>
        <Child>2</Child>
        <Child>3</Child>
        <Child>4</Child>
        <Child>5</Child>
    </Root>

Dim dstTree As XStreamingElement = New XStreamingElement("NewRoot", _
                        From el In srcTree.Elements() _
                        Where el.Value = 3 _
                        Select <DifferentChild><%= el.Value %></DifferentChild> _
                    )

Dim sb As StringBuilder = New StringBuilder()
dstTree.Save(New StringWriter(sb), SaveOptions.DisableFormatting)
Console.WriteLine(sb.ToString())
Console.WriteLine("------")
sb = New StringBuilder()
dstTree.Save(New StringWriter(sb), SaveOptions.None)
Console.WriteLine(sb.ToString())
```

This example produces the following output:

```xml
<?xml version="1.0" encoding="utf-16"?><NewRoot><DifferentChild>3</DifferentChild></NewRoot>
------
<?xml version="1.0" encoding="utf-16"?>
<NewRoot>
  <DifferentChild>3</DifferentChild>
</NewRoot>
```

## XStreamingElement.Save(String, SaveOptions) method

```csharp
public void Save (string fileName, System.Xml.Linq.SaveOptions options);
```

Serialize this streaming element to a file, optionally disabling formatting.

Parameters:

- `fileName`: A `String` that contains the name of the file.
- `options`: A `SaveOptions` object that specifies formatting behavior.

#### Remarks
If you want to save unindented XML, specify the `DisableFormatting` flag for `options`. This will cause the writer to write all white space exactly as represented in the XML tree.

If you want to save indented XML, do not specify the `DisableFormatting` flag for `options`. This will remove all extraneous insignificant white space, and add appropriate insignificant white space so that the XML is properly indented. This is the default behavior, and the behavior of the overloads of the `XElement.Save` methods that do not take `options` as a parameter.

For more information, see Preserve white space while loading or parsing XML and Preserve white space while serializing.

#### Examples
The following example shows two uses of this method. The first use preserves white space. The second one serializes the `XStreamingElement` with formatting.

```csharp
XElement srcTree = new XElement("Root",
                       new XElement("Child", 1),
                       new XElement("Child", 2),
                       new XElement("Child", 3),
                       new XElement("Child", 4),
                       new XElement("Child", 5)
                   );

XStreamingElement dstTree = new XStreamingElement("NewRoot",
                        from el in srcTree.Elements()
                        where (int)el == 3
                        select new XElement("DifferentChild", (int)el)
                    );

dstTree.Save("Test1.xml", SaveOptions.DisableFormatting);
dstTree.Save("Test2.xml", SaveOptions.None);
Console.WriteLine(File.ReadAllText("Test1.xml"));
Console.WriteLine("------");
Console.WriteLine(File.ReadAllText("Test2.xml"));
```

```vb
Dim srcTree As XElement = _
    <Root>
        <Child>1</Child>
        <Child>2</Child>
        <Child>3</Child>
        <Child>4</Child>
        <Child>5</Child>
    </Root>

Dim dstTree As XStreamingElement = New XStreamingElement("NewRoot", _
                        From el In srcTree.Elements() _
                        Where el.Value = 3 _
                        Select <DifferentChild><%= el.Value %></DifferentChild> _
                    )

dstTree.Save("Test1.xml", SaveOptions.DisableFormatting)
dstTree.Save("Test2.xml", SaveOptions.None)
Console.WriteLine(File.ReadAllText("Test1.xml"))
Console.WriteLine("------")
Console.WriteLine(File.ReadAllText("Test2.xml"))
```

This example produces the following output:

```txt
<?xml version="1.0" encoding="utf-8"?><NewRoot><DifferentChild>3</DifferentChild></NewRoot>
------
<?xml version="1.0" encoding="utf-8"?>
<NewRoot>
  <DifferentChild>3</DifferentChild>
</NewRoot>
```

## XStreamingElement.ToString() method

```csharp
public override string ToString ();
```

Returns the formatted (indented) XML for this streaming element.

Returns: A `String` containing the indented XML.

#### Remarks
Note that when debugging a program that uses `XStreamingElement`, displaying the value of an object causes its `XStreamingElement.ToString` method to be called. This causes the XML to be serialized. If the semantics of your streaming element query are such that the streaming element can only be streamed once, this may cause undesirable behavior in your debugging experience.

#### Examples
The following example shows two uses of `XStreamingElement.ToString`. The first use preserves white space. The second one serializes the `XStreamingElement` with formatting.

```csharp
XElement srcTree = new XElement("Root",
                       new XElement("Child", 1),
                       new XElement("Child", 2),
                       new XElement("Child", 3),
                       new XElement("Child", 4),
                       new XElement("Child", 5)
                   );

XStreamingElement dstTree = new XStreamingElement("NewRoot",
                        from el in srcTree.Elements()
                        where (int)el == 3
                        select new XElement("DifferentChild", (int)el)
                    );

Console.WriteLine(dstTree.ToString(SaveOptions.DisableFormatting));
Console.WriteLine("------");
Console.WriteLine(dstTree.ToString());
```

```vb
Dim srcTree As XElement = _
    <Root>
        <Child>1</Child>
        <Child>2</Child>
        <Child>3</Child>
        <Child>4</Child>
        <Child>5</Child>
    </Root>

Dim dstTree As XStreamingElement = New XStreamingElement("NewRoot", _
                        From el In srcTree.Elements() _
                        Where el.Value = 3 _
                        Select <DifferentChild><%= el.Value %></DifferentChild> _
                    )

Console.WriteLine(dstTree.ToString(SaveOptions.DisableFormatting))
Console.WriteLine("------")
Console.WriteLine(dstTree.ToString())
```

This example produces the following output:

```txt
<NewRoot><DifferentChild>3</DifferentChild></NewRoot>
------
<NewRoot>
  <DifferentChild>3</DifferentChild>
</NewRoot>
```
