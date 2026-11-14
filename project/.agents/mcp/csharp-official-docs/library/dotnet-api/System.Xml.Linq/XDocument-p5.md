---
title: "XDocument class (part 5 of 5)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Linq/XDocument.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XDocument class (part 5 of 5)

## XDocument.SaveAsync(Stream, SaveOptions, CancellationToken) method

```csharp
public System.Threading.Tasks.Task SaveAsync (System.IO.Stream stream, System.Xml.Linq.SaveOptions options, System.Threading.CancellationToken <example-value>);
```

Output this `XDocument` to a `Stream`.

Parameters:

- `stream`: The stream to write the XML to.
- `options`: A set of load options.
- `cancellationToken`: A cancellation token.

Returns: A task representing the asynchronous save operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks

If `DisableFormatting` is set, the output is not indented. If `OmitDuplicateNamespaces` is set, duplicate namespace declarations will be removed.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `Save`.

## XDocument.SaveAsync(TextWriter, SaveOptions, CancellationToken) method

```csharp
public System.Threading.Tasks.Task SaveAsync (System.IO.TextWriter textWriter, System.Xml.Linq.SaveOptions options, System.Threading.CancellationToken <example-value>);
```

Writes this `XDocument` to a `TextWriter`.

Parameters:

- `textWriter`: The text writer to output the XML to.
- `options`: A set of load options.
- `cancellationToken`: A cancellation token.

Returns: A task representing the asynchronous save operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks

If `DisableFormatting` is set, the output is not indented. If `OmitDuplicateNamespaces` is set, duplicate namespace declarations will be removed.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `Save`.

## XDocument.WriteTo(XmlWriter) method

```csharp
public override void WriteTo (System.Xml.XmlWriter writer);
```

Write this document to an `XmlWriter`.

Parameters:

- `writer`: An `XmlWriter` into which this method will write.

#### Examples
The following example shows how to write an `XDocument` to an `XmlWriter`. Note that the example did not write an XML declaration.

```csharp
StringBuilder sb = new StringBuilder();
XmlWriterSettings xws = new XmlWriterSettings();
xws.OmitXmlDeclaration = true;
xws.Indent = true;

using (XmlWriter xw = XmlWriter.Create(sb, xws))
{
    XDocument doc = new XDocument(
        new XElement("Child",
            new XElement("GrandChild", "some content")
        )
    );
    doc.WriteTo(xw);
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
    doc.WriteTo(xw)
End Using

Console.WriteLine(sb.ToString())
```

This example produces the following output:

```xml
<Child>
  <GrandChild>some content</GrandChild>
</Child>
```

## XDocument.WriteToAsync(XmlWriter, CancellationToken) method

```csharp
public override System.Threading.Tasks.Task WriteToAsync (System.Xml.XmlWriter writer, System.Threading.CancellationToken <example-value>);
```

Writes this XDocument's underlying XML tree to the specified `XmlWriter`.

Parameters:

- `writer`: The writer to output the content of this `XDocument`.
- `cancellationToken`: A cancellation token.

Returns: A task representing the asynchronous write operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `XDocument.WriteTo`.
