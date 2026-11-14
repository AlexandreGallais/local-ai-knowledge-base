---
title: "XmlReader class (part 6 of 16)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/XmlReader.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlReader class (part 6 of 16)

## XmlReader.Create(TextReader, XmlReaderSettings, String) method

```csharp
public static System.Xml.XmlReader Create (System.IO.TextReader input, System.Xml.XmlReaderSettings? settings, string? baseUri);
```

Creates a new `XmlReader` instance by using the specified text reader, settings, and base URI.

Parameters:

- `input`: The text reader from which to read the XML data. A text reader returns a stream of Unicode characters, so the encoding specified in the XML declaration isn't used by the `XmlReader` to decode the data stream.
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

## XmlReader.Create(TextReader, XmlReaderSettings, XmlParserContext) method

```csharp
public static System.Xml.XmlReader Create (System.IO.TextReader input, System.Xml.XmlReaderSettings? settings, System.Xml.XmlParserContext? inputContext);
```

Creates a new `XmlReader` instance by using the specified text reader, settings, and context information for parsing.

Parameters:

- `input`: The text reader from which to read the XML data. A text reader returns a stream of Unicode characters, so the encoding specified in the XML declaration isn't used by the XML reader to decode the data stream.
- `settings`: The settings for the new `XmlReader` instance. This value can be `null`.
- `inputContext`: The context information required to parse the XML fragment. The context information can include the `XmlNameTable` to use, encoding, namespace scope, the current `xml:lang` and `xml:space` scope, base URI, and document type definition.

This value can be `null`.

Returns: An object that is used to read the XML data in the stream.

Exceptions:

- `ArgumentNullException`: The `input` value is `null`.
- `ArgumentException`: The `XmlReaderSettings.NameTable` and `XmlParserContext.NameTable` properties both contain values. (Only one of these `NameTable` properties can be set and used.)

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

#### Examples
The following example creates an `XmlReader` object that reads an XML fragment.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlParserContext/Overview/XmlReader_Create.cs._

## XmlReader.Create(String, XmlReaderSettings, XmlParserContext) method

```csharp
public static System.Xml.XmlReader Create (string inputUri, System.Xml.XmlReaderSettings? settings, System.Xml.XmlParserContext? inputContext);
```

Creates a new `XmlReader` instance by using the specified URI, settings, and context information for parsing.

Parameters:

- `inputUri`: The URI for the file containing the XML data. The `XmlResolver` object on the `XmlReaderSettings` object is used to convert the path to a canonical data representation. If `XmlReaderSettings.XmlResolver` is `null`, a new `XmlUrlResolver` object is used.
- `settings`: The settings for the new `XmlReader` instance. This value can be `null`.
- `inputContext`: The context information required to parse the XML fragment. The context information can include the `XmlNameTable` to use, encoding, namespace scope, the current `xml:lang` and `xml:space` scope, base URI, and document type definition.

This value can be `null`.

Returns: An object that is used to read the XML data in the stream.

Exceptions:

- `ArgumentNullException`: The `inputUri` value is `null`.
- `SecurityException`: The `XmlReader` does not have sufficient permissions to access the location of the XML data.
- `ArgumentException`: The `XmlReaderSettings.NameTable` and `XmlParserContext.NameTable` properties both contain values. (Only one of these `NameTable` properties can be set and used).
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

## XmlReader.Dispose() method

```csharp
public void Dispose ();
```

Releases all resources used by the current instance of the `XmlReader` class.

Exceptions:

- `InvalidOperationException`: An `XmlReader` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

To be added.

## XmlReader.Dispose(Boolean) method

```csharp
protected virtual void Dispose (bool disposing);
```

Releases the unmanaged resources used by the `XmlReader` and optionally releases the managed resources.

Parameters:

- `disposing`: `true` to release both managed and unmanaged resources; `false` to release only unmanaged resources.

Exceptions:

- `InvalidOperationException`: An `XmlReader` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

To be added.

## XmlReader.GetAttribute(Int32) method

```csharp
public abstract string GetAttribute (int i);
```

When overridden in a derived class, gets the value of the attribute with the specified index.

Parameters:

- `i`: The index of the attribute. The index is zero-based. (The first attribute has index 0.)

Returns: The value of the specified attribute. This method does not move the reader.

Exceptions:

- `ArgumentOutOfRangeException`: `i` is out of range. It must be non-negative and less than the size of the attribute collection.
- `InvalidOperationException`: An `XmlReader` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

#### Examples
The following example gets the value of the third attribute.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlReader/Overview/XmlReader_Basic.cs._

## XmlReader.GetAttribute(String) method

```csharp
public abstract string? GetAttribute (string name);
```

When overridden in a derived class, gets the value of the attribute with the specified `XmlReader.Name`.

Parameters:

- `name`: The qualified name of the attribute.

Returns: The value of the specified attribute. If the attribute is not found, `null` is returned. If the attribute is present but has an empty value, `String.Empty` is returned.

Exceptions:

- `ArgumentNullException`: `name` is `null`.
- `InvalidOperationException`: An `XmlReader` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

#### Remarks
This method does not move the reader.

If the reader is positioned on a `DocumentType` node, this method can be used to get the PUBLIC and SYSTEM literals, for example, `reader.GetAttribute("PUBLIC")`

#### Examples
The following example gets the value of the ISBN attribute.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlReader/Overview/XmlReader_Basic.cs._

## XmlReader.GetAttribute(String, String) method

```csharp
public abstract string? GetAttribute (string name, string? namespaceURI);
```

When overridden in a derived class, gets the value of the attribute with the specified `XmlReader.LocalName` and `XmlReader.NamespaceURI`.

Parameters:

- `name`: The local name of the attribute.
- `namespaceURI`: The namespace URI of the attribute.

Returns: The value of the specified attribute. If the attribute is not found, `null` is returned. This method does not move the reader.

Exceptions:

- `ArgumentNullException`: `name` is `null`.
- `InvalidOperationException`: An `XmlReader` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

#### Remarks
The following XML contains an attribute in a specific namespace:

```xml

```

You can lookup the `dt:type` attribute using one argument (prefix and local name) or two arguments (local name and namespace URI):

```csharp
String dt = reader.GetAttribute("dt:type");
String dt2 = reader.GetAttribute("type","urn:datatypes");
```

To lookup the `xmlns:dt` attribute, use one of the following arguments:

```csharp
String dt3 = reader.GetAttribute("xmlns:dt");
String dt4 = reader.GetAttribute("dt",http://www.w3.org/2000/xmlns/);
```

You can also get this information using the `Prefix` property.

## XmlReader.GetValueAsync() method

```csharp
public virtual System.Threading.Tasks.Task<string> GetValueAsync ();
```

Asynchronously gets the value of the current node.

Returns: The value of the current node.

Exceptions:

- `InvalidOperationException`: An `XmlReader` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress".

-or-

An `XmlReader` asynchronous method was called without setting the `XmlReaderSettings.Async` flag to `true`. In this case, `InvalidOperationException` is thrown with the message "Set XmlReaderSettings.Async to true if you want to use Async Methods."

#### Remarks
To use this method, you must set the `Async` flag to `true`.

## XmlReader.IsName(String) method

```csharp
public static bool IsName (string str);
```

Returns a value indicating whether the string argument is a valid XML name.

Parameters:

- `str`: The name to validate.

Returns: `true` if the name is valid; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: The `str` value is `null`.

#### Remarks
This method uses the W3C XML 1.0 Recommendation to determine whether the name is valid.

## XmlReader.IsNameToken(String) method

```csharp
public static bool IsNameToken (string str);
```

Returns a value indicating whether or not the string argument is a valid XML name token.

Parameters:

- `str`: The name token to validate.

Returns: `true` if it is a valid name token; otherwise `false`.

Exceptions:

- `ArgumentNullException`: The `str` value is `null`.

#### Remarks
This method uses the W3C XML 1.0 Recommendation to determine whether the name token is valid.

## XmlReader.IsStartElement() method

```csharp
public virtual bool IsStartElement ();
```

Calls `XmlReader.MoveToContent` and tests if the current content node is a start tag or empty element tag.

Returns: `true` if `XmlReader.MoveToContent` finds a start tag or empty element tag; `false` if a node type other than `XmlNodeType.Element` was found.

Exceptions:

- `XmlException`: Incorrect XML is encountered in the input stream.
- `InvalidOperationException`: An `XmlReader` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

#### Remarks
This method skips white space, comments, and processing instructions until the reader is positioned on a content node. The method then tests if the current node is an element.

#### Examples
The following example displays the text content of each element.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlReader/Overview/XmlReader_Basic.cs._

The example uses the file, `elems.xml`, as input.

_Code sample not included: ~/snippets/xml/VS_Snippets_Data/XML_Core_Files/XML/elems.xml._
