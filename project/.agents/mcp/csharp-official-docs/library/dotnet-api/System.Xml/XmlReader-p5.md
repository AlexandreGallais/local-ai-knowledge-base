---
title: "XmlReader class (part 5 of 16)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/XmlReader.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlReader class (part 5 of 16)

## XmlReader.Create(String) method

```csharp
public static System.Xml.XmlReader Create (string inputUri);
```

Creates a new `XmlReader` instance with specified URI.

Parameters:

- `inputUri`: The URI for the file that contains the XML data. The `XmlUrlResolver` class is used to convert the path to a canonical data representation.

Returns: An object that is used to read the XML data in the stream.

Exceptions:

- `ArgumentNullException`: The `inputUri` value is `null`.
- `SecurityException`: The `XmlReader` does not have sufficient permissions to access the location of the XML data.
- `FileNotFoundException`: The file identified by the URI does not exist.
- `UriFormatException`: The URI format is not correct.

#### Remarks
An `XmlReaderSettings` object with default settings is used to create the reader. If you wish to specify the features to support on the created reader, use the overload that takes an `XmlReaderSettings` object as one of its arguments, and pass in an `XmlReaderSettings` object with the correct settings.

A default `XmlUrlResolver` with no credentials is used to access any external resources such as a document type definition (DTD), entities, schemas, and so on.

> **Important:**
> No default `XmlUrlResolver` is provided. Specify an `XmlResolver` using the `XmlResolver` property.

If the external resource is located on a network resource that requires authentication, specify an `XmlResolver` with the necessary credentials using the `XmlResolver` property.

The created `XmlReader` object expands entity references and performs XML normalization of new line characters.

#### Examples
The following example creates an `XmlReader` object that reads XML data file specified by the URI.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlParserContext/Overview/XmlReader_Create.cs._

## XmlReader.Create(Stream, XmlReaderSettings) method

```csharp
public static System.Xml.XmlReader Create (System.IO.Stream input, System.Xml.XmlReaderSettings? settings);
```

Creates a new `XmlReader` instance with the specified stream and settings.

Parameters:

- `input`: The stream that contains the XML data.

The `XmlReader` scans the first bytes of the stream looking for a byte order mark or other sign of encoding. When encoding is determined, the encoding is used to continue reading the stream, and processing continues parsing the input as a stream of (Unicode) characters.
- `settings`: The settings for the new `XmlReader` instance. This value can be `null`.

Returns: An object that is used to read the XML data in the stream.

Exceptions:

- `ArgumentNullException`: The `input` value is `null`.

#### Remarks
By default an `XmlUrlResolver` with no credentials is used to access any external resources such as a document type definition (DTD), entities, schemas, and so on.

> **Important:**
> No default `XmlUrlResolver` is provided. Specify an `XmlResolver` using the `XmlResolver` property.

If the external resource is located on a network resource that requires authentication, use the `XmlResolver` property to specify an `XmlResolver` with the necessary credentials.

> **Important:**
> You can use one of the following methods to control which resources the `XmlReader` can access:
>
>  - Restrict the resources that the `XmlReader` can access by using `ThrowingResolver`.
>  - Do not allow the `XmlReader` to open any external resources by setting the `XmlResolver` property to `null`.

The created `XmlReader` object expands entity references and performs XML normalization of new line characters.

## XmlReader.Create(TextReader, XmlReaderSettings) method

```csharp
public static System.Xml.XmlReader Create (System.IO.TextReader input, System.Xml.XmlReaderSettings? settings);
```

Creates a new `XmlReader` instance by using the specified text reader and settings.

Parameters:

- `input`: The text reader from which to read the XML data. A text reader returns a stream of Unicode characters, so the encoding specified in the XML declaration isn't used by the XML reader to decode the data stream.
- `settings`: The settings for the new `XmlReader`. This value can be `null`.

Returns: An object that is used to read the XML data in the stream.

Exceptions:

- `ArgumentNullException`: The `input` value is `null`.

#### Remarks
By default an `XmlUrlResolver` with no credentials is used to access any external resources such as a document type definition (DTD), entities, schemas, and so on.

> **Important:**
> No default `XmlUrlResolver` is provided. Specify an `XmlResolver` using the `XmlResolver` property.

If the external resource is located on a network resource that requires authentication, use the `XmlResolver` property to specify an `XmlResolver` with the necessary credentials.

> **Important:**
> You can use one of the following methods to control which resources the `XmlReader` can access:
>
>  - Restrict the resources that the `XmlReader` can access by using `ThrowingResolver`.
>  - Do not allow the `XmlReader` to open any external resources by setting the `XmlResolver` property to `null`.

The created `XmlReader` object expands entity references and performs XML normalization of new line characters.

## XmlReader.Create(String, XmlReaderSettings) method

```csharp
public static System.Xml.XmlReader Create (string inputUri, System.Xml.XmlReaderSettings? settings);
```

Creates a new `XmlReader` instance by using the specified URI and settings.

Parameters:

- `inputUri`: The URI for the file containing the XML data. The `XmlResolver` object on the `XmlReaderSettings` object is used to convert the path to a canonical data representation. If `XmlReaderSettings.XmlResolver` is `null`, a new `XmlUrlResolver` object is used.
- `settings`: The settings for the new `XmlReader` instance. This value can be `null`.

Returns: An object that is used to read the XML data in the stream.

Exceptions:

- `ArgumentNullException`: The `inputUri` value is `null`.
- `FileNotFoundException`: The file specified by the URI cannot be found.
- `UriFormatException`: The URI format is not correct.

#### Remarks
By default an `XmlUrlResolver` with no credentials is used to access any external resources such as a document type definition (DTD), entities, schemas, and so on.

> **Important:**
> No default `XmlUrlResolver` is provided. Specify an `XmlResolver` using the `XmlResolver` property.

This means that the `XmlReader` can access any locations that don't require authentication. If the external resource is located on a network resource that requires authentication, use the `XmlResolver` property to specify an `XmlResolver` with the necessary credentials.

> **Important:**
> You can restrict the resources that the `XmlReader` can access by using `ThrowingResolver`.

The created `XmlReader` object expands entity references and performs XML normalization of new line characters.

#### Examples
The following example creates an `XmlReader` object that supports document type definition (DTD) validation.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlParserContext/Overview/XmlReader_Create.cs._

## XmlReader.Create(XmlReader, XmlReaderSettings) method

```csharp
public static System.Xml.XmlReader Create (System.Xml.XmlReader reader, System.Xml.XmlReaderSettings? settings);
```

Creates a new `XmlReader` instance by using the specified XML reader and settings.

Parameters:

- `reader`: The object that you want to use as the underlying XML reader.
- `settings`: The settings for the new `XmlReader` instance.

The conformance level of the `XmlReaderSettings` object must either match the conformance level of the underlying reader, or it must be set to `ConformanceLevel.Auto`.

Returns: An object that is wrapped around the specified `XmlReader` object.

Exceptions:

- `ArgumentNullException`: The `reader` value is `null`.
- `InvalidOperationException`: If the `XmlReaderSettings` object specifies a conformance level that is not consistent with conformance level of the underlying reader.

-or-

The underlying `XmlReader` is in an `ReadState.Error` or `ReadState.Closed` state.

#### Remarks
This method allows you add additional features to an underlying `XmlReader` object. The underlying `XmlReader` object can be another `XmlReader` object created by the `XmlReader.Create` method, or an `XmlReader` object created using one of the concrete `XmlReader` implementations.

A default `XmlUrlResolver` with no credentials is used to access any external resources such as a schema.

> **Important:**
> No default `XmlUrlResolver` is provided. Specify an `XmlResolver` using the `XmlResolver` property.

If the external resource is located on a network resource that requires authentication, specify an `XmlResolver` with the necessary credentials using the `XmlResolver` property.

> **Important:**
> You can use one of the following methods to control which resources the `XmlReader` can access:
>
>  - Restrict the resources that the `XmlReader` can access by using `ThrowingResolver`.
>  - Do not allow the `XmlReader` to open any external resources by setting the `XmlResolver` property to `null`.

The created `XmlReader` object expands entity references and performs XML normalization of new line characters.

#### Examples
The following example creates a validating `XmlReader` object that is wrapped around an `XmlNodeReader` object.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlParserContext/Overview/XmlReader_Create.cs._

## XmlReader.Create(Stream, XmlReaderSettings, String) method

```csharp
public static System.Xml.XmlReader Create (System.IO.Stream input, System.Xml.XmlReaderSettings? settings, string? baseUri);
```

Creates a new `XmlReader` instance using the specified stream, base URI, and settings.

Parameters:

- `input`: The stream that contains the XML data.

The `XmlReader` scans the first bytes of the stream looking for a byte order mark or other sign of encoding. When encoding is determined, the encoding is used to continue reading the stream, and processing continues parsing the input as a stream of (Unicode) characters.
- `settings`: The settings for the new `XmlReader` instance. This value can be `null`.
- `baseUri`: The base URI for the entity or document being read. This value can be `null`.

**Security Note** The base URI is used to resolve the relative URI of the XML document. Do not use a base URI from an untrusted source.

Returns: An object that is used to read the XML data in the stream.

Exceptions:

- `ArgumentNullException`: The `input` value is `null`.

#### Remarks
By default an `XmlUrlResolver` with no credentials is used to access any external resources such as a document type definition (DTD), entities, schemas, and so on.

> **Important:**
> No default `XmlUrlResolver` is provided. Specify an `XmlResolver` using the `XmlResolver` property.

If the external resource is located on a network resource that requires authentication, use the `XmlResolver` property to specify an `XmlResolver` with the necessary credentials.

> **Important:**
> You can use one of the following methods to control which resources the `XmlReader` can access:
>
>  - Restrict the resources that the `XmlReader` can access by using `ThrowingResolver`.
>  - Do not allow the `XmlReader` to open any external resources by setting the `XmlResolver` property to `null`.

The created `XmlReader` object expands entity references and performs XML normalization of new line characters.

## XmlReader.Create(Stream, XmlReaderSettings, XmlParserContext) method

```csharp
public static System.Xml.XmlReader Create (System.IO.Stream input, System.Xml.XmlReaderSettings? settings, System.Xml.XmlParserContext? inputContext);
```

Creates a new `XmlReader` instance using the specified stream, settings, and context information for parsing.

Parameters:

- `input`: The stream that contains the XML data.

The `XmlReader` scans the first bytes of the stream looking for a byte order mark or other sign of encoding. When encoding is determined, the encoding is used to continue reading the stream, and processing continues parsing the input as a stream of (Unicode) characters.
- `settings`: The settings for the new `XmlReader` instance. This value can be `null`.
- `inputContext`: The context information required to parse the XML fragment. The context information can include the `XmlNameTable` to use, encoding, namespace scope, the current `xml:lang` and `xml:space` scope, base URI, and document type definition.

This value can be `null`.

Returns: An object that is used to read the XML data in the stream.

Exceptions:

- `ArgumentNullException`: The `input` value is `null`.

#### Remarks
By default an `XmlUrlResolver` with no credentials is used to access any external resources such as a document type definition (DTD), entities, schemas, and so on.

> **Important:**
> No default `XmlUrlResolver` is provided. Specify an `XmlResolver` using the `XmlResolver` property.

If the external resource is located on a network resource that requires authentication, use the `XmlResolver` property to specify an `XmlResolver` with the necessary credentials.

> **Important:**
> You can use one of the following methods to control which resources the `XmlReader` can access:
>
>  - Restrict the resources that the `XmlReader` can access by using `ThrowingResolver`.
>  - Do not allow the `XmlReader` to open any external resources by setting the `XmlResolver` property to `null`.

The created `XmlReader` object expands entity references and performs XML normalization of new line characters.
