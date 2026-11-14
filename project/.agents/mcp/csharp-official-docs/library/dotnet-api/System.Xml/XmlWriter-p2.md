---
title: "XmlWriter class (part 2 of 11)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/XmlWriter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlWriter class (part 2 of 11)

## XmlWriter.Create(Stream) method

```csharp
public static System.Xml.XmlWriter Create (System.IO.Stream output);
```

Creates a new `XmlWriter` instance using the specified stream.

Parameters:

- `output`: The stream to which you want to write. The `XmlWriter` writes XML 1.0 text syntax and appends it to the specified stream.

Returns: An `XmlWriter` object.

Exceptions:

- `ArgumentNullException`: `output` is `null`.

#### Remarks
When you use this overload, an `XmlWriterSettings` object with the following default settings is used to create the XML writer:

|Setting|Default|
|-------------|-------------|
|`CheckCharacters`|`true`|
|`CloseOutput`|`false`|
|`ConformanceLevel`|`Document`|
|`Encoding`|`UTF8`|
|`Indent`|`false`|
|`IndentChars`|Two spaces|
|`NamespaceHandling`|`Default` (no removal)|
|`NewLineChars`|`\r\n` (carriage return, line feed) for non-Unix platforms, or `\n` (line feed) for Unix platforms|
|`NewLineHandling`|`Replace`|
|`NewLineOnAttributes`|`false`|
|`OmitXmlDeclaration`|`false`|
|`OutputMethod`|`Xml`|
|`WriteEndDocumentOnClose`|`true`|

If you want to specify the features to support on the created writer, use an overload that takes an `XmlWriterSettings` object as one of its arguments, and pass in an `XmlWriterSettings` object with your custom settings.

Also, XmlWriter always writes a Byte Order Mark (BOM) to the underlying data stream; however, some streams must not have a BOM. To omit the BOM, create a new `XmlWriterSettings` object and set the Encoding property to be a new `UTF8Encoding` object with the Boolean value in the constructor set to false.

#### Examples
The following example writes an XML fragment to a memory stream. (It uses the `Create` overload, which also configures the settings on the new XML writer instance.)

_Code sample not included: ~/snippets/csharp/System.Xml/XmlWriter/Create/writestream2.cs._

## XmlWriter.Create(TextWriter) method

```csharp
public static System.Xml.XmlWriter Create (System.IO.TextWriter output);
```

Creates a new `XmlWriter` instance using the specified `TextWriter`.

Parameters:

- `output`: The `TextWriter` to which you want to write. The `XmlWriter` writes XML 1.0 text syntax and appends it to the specified `TextWriter`.

Returns: An `XmlWriter` object.

Exceptions:

- `ArgumentNullException`: `output` is `null`.

#### Remarks
When you use this overload, an `XmlWriterSettings` object with default settings is used to create the XML writer.

|Setting|Default|
|-------------|-------------|
|`CheckCharacters`|`true`|
|`CloseOutput`|`false`|
|`ConformanceLevel`|`Document`|
|`Encoding`|`UTF8`|
|`Indent`|`false`|
|`IndentChars`|Two spaces|
|`NamespaceHandling`|`Default` (no removal)|
|`NewLineChars`|`\r\n` (carriage return, line feed) for non-Unix platforms, or `\n` (line feed) for Unix platforms|
|`NewLineHandling`|`Replace`|
|`NewLineOnAttributes`|`false`|
|`OmitXmlDeclaration`|`false`|
|`OutputMethod`|`Xml`|
|`WriteEndDocumentOnClose`|`true`|

If you want to specify the features to support on the created writer, use an overload that takes an `XmlWriterSettings` object as one of its arguments, and pass in an `XmlWriterSettings` object with your custom settings.

#### Examples
The following example creates a writer that outputs to the console.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlWriter/Overview/writer_v2.cs._

## XmlWriter.Create(String) method

```csharp
public static System.Xml.XmlWriter Create (string outputFileName);
```

Creates a new `XmlWriter` instance using the specified filename.

Parameters:

- `outputFileName`: The file to which you want to write. The `XmlWriter` creates a file at the specified path and writes to it in XML 1.0 text syntax. The `outputFileName` must be a file system path.

Returns: An `XmlWriter` object.

Exceptions:

- `ArgumentNullException`: `outputFileName` is `null`.

#### Remarks
When you use this overload, an `XmlWriterSettings` object with default settings is used to create the XML writer.

|Setting|Default|
|-------------|-------------|
|`CheckCharacters`|`true`|
|`CloseOutput`|`false`|
|`ConformanceLevel`|`Document`|
|`Encoding`|`UTF8`|
|`Indent`|`false`|
|`IndentChars`|Two spaces|
|`NamespaceHandling`|`Default` (no removal)|
|`NewLineChars`|`\r\n` (carriage return, line feed) for non-Unix platforms, or `\n` (line feed) for Unix platforms|
|`NewLineHandling`|`Replace`|
|`NewLineOnAttributes`|`false`|
|`OmitXmlDeclaration`|`false`|
|`OutputMethod`|`Xml`|
|`WriteEndDocumentOnClose`|`true`|

If you want to specify the features to support on the created XML writer, use an overload that takes an `XmlWriterSettings` object as one of its arguments, and pass in a `XmlWriterSettings` object with your custom settings.

#### Examples
The following example creates an `XmlWriter` object and writes a book node.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlWriter/Overview/writer_v2.cs._

## XmlWriter.Create(StringBuilder) method

```csharp
public static System.Xml.XmlWriter Create (System.Text.StringBuilder output);
```

Creates a new `XmlWriter` instance using the specified `StringBuilder`.

Parameters:

- `output`: The `StringBuilder` to which to write to. Content written by the `XmlWriter` is appended to the `StringBuilder`.

Returns: An `XmlWriter` object.

Exceptions:

- `ArgumentNullException`: `output` is `null`.

#### Remarks
When you use this overload, an `XmlWriterSettings` object with default settings is used to create the XML writer.

|Setting|Default|
|-------------|-------------|
|`CheckCharacters`|`true`|
|`CloseOutput`|`false`|
|`ConformanceLevel`|`Document`|
|`Encoding`|`UTF8`|
|`Indent`|`false`|
|`IndentChars`|Two spaces|
|`NamespaceHandling`|`Default` (no removal)|
|`NewLineChars`|`\r\n` (carriage return, line feed) for non-Unix platforms, or `\n` (line feed) for Unix platforms|
|`NewLineHandling`|`Replace`|
|`NewLineOnAttributes`|`false`|
|`OmitXmlDeclaration`|`false`|
|`OutputMethod`|`Xml`|
|`WriteEndDocumentOnClose`|`true`|

If you want to specify the features to support on the created XML writer, use an overload that takes an `XmlWriterSettings` object as one of its arguments, and pass in a `XmlWriterSettings` object with your custom settings.

## XmlWriter.Create(XmlWriter) method

```csharp
public static System.Xml.XmlWriter Create (System.Xml.XmlWriter output);
```

Creates a new `XmlWriter` instance using the specified `XmlWriter` object.

Parameters:

- `output`: The `XmlWriter` object that you want to use as the underlying writer.

Returns: An `XmlWriter` object that is wrapped around the specified `XmlWriter` object.

Exceptions:

- `ArgumentNullException`: `output` is `null`.

#### Remarks
This method allows you add features to an underlying `XmlWriter` object. The underlying `XmlWriter` object can be an object created by the `XmlWriter.Create` method, or an object created using the `XmlTextWriter` implementation.

When you use this overload, an `XmlWriterSettings` object with default settings is used to create the XML writer.

|Setting|Default|
|-------------|-------------|
|`CheckCharacters`|`true`|
|`CloseOutput`|`false`|
|`ConformanceLevel`|`Document`|
|`Encoding`|`UTF8`|
|`Indent`|`false`|
|`IndentChars`|Two spaces|
|`NamespaceHandling`|`Default` (no removal)|
|`NewLineChars`|`\r\n` (carriage return, line feed) for non-Unix platforms, or `\n` (line feed) for Unix platforms|
|`NewLineHandling`|`Replace`|
|`NewLineOnAttributes`|`false`|
|`OmitXmlDeclaration`|`false`|
|`OutputMethod`|`Xml`|
|`WriteEndDocumentOnClose`|`true`|

If you want to specify the features to support on the created XML writer, use an overload that takes an `XmlWriterSettings` object as one of its arguments, and pass in a `XmlWriterSettings` object with your custom settings.

## XmlWriter.Create(Stream, XmlWriterSettings) method

```csharp
public static System.Xml.XmlWriter Create (System.IO.Stream output, System.Xml.XmlWriterSettings? settings);
```

Creates a new `XmlWriter` instance using the stream and `XmlWriterSettings` object.

Parameters:

- `output`: The stream to which you want to write. The `XmlWriter` writes XML 1.0 text syntax and appends it to the specified stream.
- `settings`: The `XmlWriterSettings` object used to configure the new `XmlWriter` instance. If this is `null`, a `XmlWriterSettings` with default settings is used.

If the `XmlWriter` is being used with the `XslCompiledTransform.Transform` method, you should use the `XslCompiledTransform.OutputSettings` property to obtain an `XmlWriterSettings` object with the correct settings. This ensures that the created `XmlWriter` object has the correct output settings.

Returns: An `XmlWriter` object.

Exceptions:

- `ArgumentNullException`: `output` is `null`.

#### Remarks
XmlWriter always writes a Byte Order Mark (BOM) to the underlying data stream; however, some streams must not have a BOM. To omit the BOM, create a new `XmlWriterSettings` object and set the Encoding property to be a new `UTF8Encoding` object with the Boolean value in the constructor set to false.

#### Examples
The following example writes an XML fragment to a memory stream.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlWriter/Create/writestream2.cs._

## XmlWriter.Create(TextWriter, XmlWriterSettings) method

```csharp
public static System.Xml.XmlWriter Create (System.IO.TextWriter output, System.Xml.XmlWriterSettings? settings);
```

Creates a new `XmlWriter` instance using the `TextWriter` and `XmlWriterSettings` objects.

Parameters:

- `output`: The `TextWriter` to which you want to write. The `XmlWriter` writes XML 1.0 text syntax and appends it to the specified `TextWriter`.
- `settings`: The `XmlWriterSettings` object used to configure the new `XmlWriter` instance. If this is `null`, a `XmlWriterSettings` with default settings is used.

If the `XmlWriter` is being used with the `XslCompiledTransform.Transform` method, you should use the `XslCompiledTransform.OutputSettings` property to obtain an `XmlWriterSettings` object with the correct settings. This ensures that the created `XmlWriter` object has the correct output settings.

Returns: An `XmlWriter` object.

Exceptions:

- `ArgumentNullException`: `output` is `null`.

#### Examples
The following example writes out an XML string.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlWriter/Overview/writer_v2.cs._

## XmlWriter.Create(String, XmlWriterSettings) method

```csharp
public static System.Xml.XmlWriter Create (string outputFileName, System.Xml.XmlWriterSettings? settings);
```

Creates a new `XmlWriter` instance using the filename and `XmlWriterSettings` object.

Parameters:

- `outputFileName`: The file to which you want to write. The `XmlWriter` creates a file at the specified path and writes to it in XML 1.0 text syntax. The `outputFileName` must be a file system path.
- `settings`: The `XmlWriterSettings` object used to configure the new `XmlWriter` instance. If this is `null`, a `XmlWriterSettings` with default settings is used.

If the `XmlWriter` is being used with the `XslCompiledTransform.Transform` method, you should use the `XslCompiledTransform.OutputSettings` property to obtain an `XmlWriterSettings` object with the correct settings. This ensures that the created `XmlWriter` object has the correct output settings.

Returns: An `XmlWriter` object.

Exceptions:

- `ArgumentNullException`: `outputFileName` is `null`.

#### Examples
The following example creates an `XmlWriter` object with the defined settings.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlWriter/Create/writeindent.cs._

## XmlWriter.Create(StringBuilder, XmlWriterSettings) method

```csharp
public static System.Xml.XmlWriter Create (System.Text.StringBuilder output, System.Xml.XmlWriterSettings? settings);
```

Creates a new `XmlWriter` instance using the `StringBuilder` and `XmlWriterSettings` objects.

Parameters:

- `output`: The `StringBuilder` to which to write to. Content written by the `XmlWriter` is appended to the `StringBuilder`.
- `settings`: The `XmlWriterSettings` object used to configure the new `XmlWriter` instance. If this is `null`, a `XmlWriterSettings` with default settings is used.

If the `XmlWriter` is being used with the `XslCompiledTransform.Transform` method, you should use the `XslCompiledTransform.OutputSettings` property to obtain an `XmlWriterSettings` object with the correct settings. This ensures that the created `XmlWriter` object has the correct output settings.

Returns: An `XmlWriter` object.

Exceptions:

- `ArgumentNullException`: `output` is `null`.

To be added.

## XmlWriter.Create(XmlWriter, XmlWriterSettings) method

```csharp
public static System.Xml.XmlWriter Create (System.Xml.XmlWriter output, System.Xml.XmlWriterSettings? settings);
```

Creates a new `XmlWriter` instance using the specified `XmlWriter` and `XmlWriterSettings` objects.

Parameters:

- `output`: The `XmlWriter` object that you want to use as the underlying writer.
- `settings`: The `XmlWriterSettings` object used to configure the new `XmlWriter` instance. If this is `null`, a `XmlWriterSettings` with default settings is used.

If the `XmlWriter` is being used with the `XslCompiledTransform.Transform` method, you should use the `XslCompiledTransform.OutputSettings` property to obtain an `XmlWriterSettings` object with the correct settings. This ensures that the created `XmlWriter` object has the correct output settings.

Returns: An `XmlWriter` object that is wrapped around the specified `XmlWriter` object.

Exceptions:

- `ArgumentNullException`: `output` is `null`.

#### Remarks
This method allows you add additional features to an underlying `XmlWriter` object. The underlying `XmlWriter` object can be an object created by the `XmlWriter.Create` method, or an object created using the `XmlTextWriter` implementation.

## XmlWriter.Dispose() method

```csharp
public void Dispose ();
```

Releases all resources used by the current instance of the `XmlWriter` class.

Exceptions:

- `InvalidOperationException`: An `XmlWriter` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

To be added.

## XmlWriter.Dispose(Boolean) method

```csharp
protected virtual void Dispose (bool disposing);
```

Releases the unmanaged resources used by the `XmlWriter` and optionally releases the managed resources.

Parameters:

- `disposing`: `true` to release both managed and unmanaged resources; `false` to release only unmanaged resources.

Exceptions:

- `InvalidOperationException`: An `XmlWriter` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

To be added.
