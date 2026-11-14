---
title: "XmlTextReader class (part 1 of 6)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/XmlTextReader.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlTextReader class

Namespace: `System.Xml`

```csharp
public class XmlTextReader : System.Xml.XmlReader, System.Xml.IXmlLineInfo, System.Xml.IXmlNamespaceResolver
```

Represents a reader that provides fast, non-cached, forward-only access to XML data.

We recommend that you use the `XmlReader` class instead.

> **Note:**
> We recommend that you create `XmlReader` instances by using the `XmlReader.Create` method to take advantage of new functionality.

`XmlTextReader` provides forward-only, read-only access to a stream of XML data. The current node refers to the node on which the reader is positioned. The reader is advanced using any of the read methods and properties reflect the value of the current node.

This class implements `XmlReader` and conforms to the W3C Extensible Markup Language (XML) 1.0 and the Namespaces in XML recommendations. `XmlTextReader` provides the following functionality:

- Enforces the rules of well-formed XML.

- `XmlTextReader` does not provide data validation.

- Checks that `DocumentType` nodes are well-formed. `XmlTextReader` checks the DTD for well-formedness, but does not validate using the DTD.

- For nodes where `NodeType` is `XmlNodeType.EntityReference`, a single empty `EntityReference` node is returned (that is, the `Value` property is `String.Empty`).

> **Note:**
> The actual declarations of entities in the DTD are called `Entity` nodes. When you refer to these nodes in your data, they are called `EntityReference` nodes.

- Does not expand default attributes.

Because the `XmlTextReader` does not perform the extra checks required for data validation, it provides a fast well-formedness parser.

To perform data validation, use a validating `XmlReader`.

To read XML data from an `XmlDocument`, use `XmlNodeReader`.

`XmlTextReader` throws an `XmlException` on XML parse errors. After an exception is thrown the state of the reader is not predictable. For example, the reported node type may be different than the actual node type of the current node. Use the `ReadState` property to check whether a reader is in error state.

#### Security considerations

The following are things to consider when using the `XmlTextReader` class.

- Exceptions thrown by the `XmlTextReader` can disclose path information that you do not want bubbled up to the application. Your applications must catch exceptions and process them appropriately.

- DTD processing is enabled by default. Disable DTD processing if you are concerned about Denial of Service issues or if you are dealing with untrusted sources. Set the `DtdProcessing` property to `Prohibit` to disable DTD processing.

If you have DTD processing enabled, you can use `ThrowingResolver` to restrict the resources that the `XmlTextReader` can access. You can also design your application so that the XML processing is memory and time constrained. For example, configure time-out limits in your ASP.NET application.

- XML data can include references to external resources such as a DTD file. By default external resources are resolved using an `XmlUrlResolver` object with no user credentials. You can secure this further by doing one of the following:

- Restrict the resources that the `XmlTextReader` can access by using `ThrowingResolver`.
- Do not allow the `XmlReader` to open any external resources by setting the `XmlResolver` property to `null`.

- XML data can contain a large number of attributes, namespace declarations, nested elements and so on that require a substantial amount of time to process. To limit the size of the input that is sent to the `XmlTextReader`, create a custom IStream implementation and supply it the `XmlTextReader`.

- The `XmlReader.ReadValueChunk` method can be used to handle large streams of data. This method reads a small number of characters at a time instead of allocating a single string for the whole value.

- By default general entities are not expanded. General entities are expanded when you call the `XmlTextReader.ResolveEntity` method.

## XmlTextReader.XmlTextReader() constructor

```csharp
protected XmlTextReader ();
```

Initializes a new instance of the `XmlTextReader`.

To be added.

## XmlTextReader.XmlTextReader(Stream) constructor

```csharp
public XmlTextReader (System.IO.Stream input);
```

Initializes a new instance of the `XmlTextReader` class with the specified stream.

Parameters:

- `input`: The stream containing the XML data to read.

Exceptions:

- `ArgumentNullException`: `input` is `null`.

#### Remarks

> **Note:**
> We recommend that you create `XmlReader` instances by using the `XmlReader.Create` method to take advantage of new functionality.

The `XmlTextReader` decodes the stream using `Encoding`.

## XmlTextReader.XmlTextReader(TextReader) constructor

```csharp
public XmlTextReader (System.IO.TextReader input);
```

Initializes a new instance of the `XmlTextReader` class with the specified `TextReader`.

Parameters:

- `input`: The `TextReader` containing the XML data to read.

#### Remarks

> **Note:**
> We recommend that you create `XmlReader` instances by using the `XmlReader.Create` method to take advantage of new functionality.

It is assumed that the `TextReader` is already set to the correct encoding. This is used by clients that have already read some things from the stream in a multi-part MIME scenario.

#### Examples
The following example loads an XML string into the `XmlTextReader` object using the `StringReader` class.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlTextReader/.ctor/rdrcctor1.cs._

## XmlTextReader.XmlTextReader(String) constructor

```csharp
public XmlTextReader (string url);
```

Initializes a new instance of the `XmlTextReader` class with the specified file.

Parameters:

- `url`: The URL for the file containing the XML data. The `XmlTextReader.BaseURI` is set to this value.

Exceptions:

- `FileNotFoundException`: The specified file cannot be found.
- `DirectoryNotFoundException`: Part of the filename or directory cannot be found.
- `InvalidOperationException`: `url` is an empty string.
- `WebException`: The remote filename cannot be resolved.

-or-

An error occurred while processing the request.
- `UriFormatException`: `url` is not a valid URI.

#### Remarks

> **Note:**
> We recommend that you create `XmlReader` instances by using the `XmlReader.Create` method to take advantage of new functionality.

If the file is located on a resource that requires access credentials, use the `XmlResolver` property to specify the necessary credentials.

```csharp
// Create a resolver with the necessary credentials.
XmlUrlResolver resolver = new XmlUrlResolver();
NetworkCredential nc = new NetworkCredential(SecurelyStoredUserName, SecurelyStoredPassword, SecurelyStoredDomain);
resolver.Credentials = nc;
// Get a Stream object containing the XML file.
Uri myUri = new Uri ("http://myServer/data/books.xml");
Stream s=(Stream)resolver.GetEntity(myUri, null, typeof(Stream));
// Construct a reader using the Stream object.
XmlTextReader reader = new XmlTextReader(s);
```

#### Examples
The following example reads an XML file and displays each of the nodes.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlTextReader/.ctor/source.cs._

The example uses the file, `items.xml`, as input.

_Code sample not included: ~/snippets/xml/VS_Snippets_Data/Classic WebData XmlTextReader.Name Example/XML/source.xml._
## XmlTextReader.XmlTextReader(XmlNameTable) constructor

```csharp
protected XmlTextReader (System.Xml.XmlNameTable nt);
```

Initializes a new instance of the `XmlTextReader` class with the specified `XmlNameTable`.

Parameters:

- `nt`: The `XmlNameTable` to use.

#### Remarks

> **Note:**
> We recommend that you create `XmlReader` instances by using the `XmlReader.Create` method to take advantage of new functionality.

## XmlTextReader.XmlTextReader(Stream, XmlNameTable) constructor

```csharp
public XmlTextReader (System.IO.Stream input, System.Xml.XmlNameTable nt);
```

Initializes a new instance of the `XmlTextReader` class with the specified stream and `XmlNameTable`.

Parameters:

- `input`: The stream containing the XML data to read.
- `nt`: The `XmlNameTable` to use.

Exceptions:

- `NullReferenceException`: The `input` or `nt` value is `null`.

#### Remarks

> **Note:**
> We recommend that you create `XmlReader` instances by using the `XmlReader.Create` method to take advantage of new functionality.

The `XmlTextReader` decodes the stream using `Encoding`.

If you specify a name table, this constructor uses the names defined already in that table.

## XmlTextReader.XmlTextReader(TextReader, XmlNameTable) constructor

```csharp
public XmlTextReader (System.IO.TextReader input, System.Xml.XmlNameTable nt);
```

Initializes a new instance of the `XmlTextReader` class with the specified `TextReader` and `XmlNameTable`.

Parameters:

- `input`: The `TextReader` containing the XML data to read.
- `nt`: The `XmlNameTable` to use.

Exceptions:

- `NullReferenceException`: The `nt` value is `null`.

#### Remarks

> **Note:**
> We recommend that you create `XmlReader` instances by using the `XmlReader.Create` method to take advantage of new functionality.

It is assumed that the `TextReader` is already set to the correct encoding. This is used by clients that have already read some things from the stream in a multi-part MIME scenario.

## XmlTextReader.XmlTextReader(String, Stream) constructor

```csharp
public XmlTextReader (string url, System.IO.Stream input);
```

Initializes a new instance of the `XmlTextReader` class with the specified URL and stream.

Parameters:

- `url`: The URL to use for resolving external resources. The `XmlTextReader.BaseURI` is set to this value.
- `input`: The stream containing the XML data to read.

Exceptions:

- `ArgumentNullException`: `input` is `null`.

#### Remarks

> **Note:**
> We recommend that you create `XmlReader` instances by using the `XmlReader.Create` method to take advantage of new functionality.

## XmlTextReader.XmlTextReader(String, TextReader) constructor

```csharp
public XmlTextReader (string url, System.IO.TextReader input);
```

Initializes a new instance of the `XmlTextReader` class with the specified URL and `TextReader`.

Parameters:

- `url`: The URL to use for resolving external resources. The `XmlTextReader.BaseURI` is set to this value.
- `input`: The `TextReader` containing the XML data to read.

#### Remarks

> **Note:**
> We recommend that you create `XmlReader` instances by using the `XmlReader.Create` method to take advantage of new functionality.

It is assumed that the `TextReader` is already set to the correct encoding. This is used by clients that have already read some things from the stream in a multi-part MIME scenario.

## XmlTextReader.XmlTextReader(String, XmlNameTable) constructor

```csharp
public XmlTextReader (string url, System.Xml.XmlNameTable nt);
```

Initializes a new instance of the `XmlTextReader` class with the specified file and `XmlNameTable`.

Parameters:

- `url`: The URL for the file containing the XML data to read.
- `nt`: The `XmlNameTable` to use.

Exceptions:

- `NullReferenceException`: The `nt` value is `null`.
- `FileNotFoundException`: The specified file cannot be found.
- `DirectoryNotFoundException`: Part of the filename or directory cannot be found.
- `InvalidOperationException`: `url` is an empty string.
- `WebException`: The remote filename cannot be resolved.

-or-

An error occurred while processing the request.
- `UriFormatException`: `url` is not a valid URI.

#### Remarks

> **Note:**
> We recommend that you create `XmlReader` instances by using the `XmlReader.Create` method to take advantage of new functionality.

## XmlTextReader.XmlTextReader(Stream, XmlNodeType, XmlParserContext) constructor

```csharp
public XmlTextReader (System.IO.Stream xmlFragment, System.Xml.XmlNodeType fragType, System.Xml.XmlParserContext? context);
```

Initializes a new instance of the `XmlTextReader` class with the specified stream, `XmlNodeType`, and `XmlParserContext`.

Parameters:

- `xmlFragment`: The stream containing the XML fragment to parse.
- `fragType`: The `XmlNodeType` of the XML fragment. This also determines what the fragment can contain. (See table below.)
- `context`: The `XmlParserContext` in which the `xmlFragment` is to be parsed. This includes the `XmlNameTable` to use, encoding, namespace scope, the current `xml:lang`, and the `xml:space` scope.

Exceptions:

- `XmlException`: `fragType` is not an Element, Attribute, or Document `XmlNodeType`.
- `ArgumentNullException`: `xmlFragment` is `null`.

#### Remarks

> **Note:**
> We recommend that you create `XmlReader` instances by using the `XmlReader.Create` method to take advantage of new functionality.

This constructor parses the given string as a fragment of XML. If the XML fragment is an element or attribute, you can bypass the root level rules for well-formed XML documents.

The following table lists valid values for `fragType`.

|XmlNodeType|Fragment May Contain|
|-----------------|--------------------------|
|`Element`|Any valid element content (for example, any combination of elements, comments, processing instructions, CDATA sections, text, and entity references). An XML declaration can also be supplied. This allows you to specify the encoding for the XML fragment, rather than having to set it on the `XmlParserContext` object.|
|`Attribute`|The value of an attribute (the part inside the quotes).|
|`Document`|The contents of an entire XML document. This enforces document level rules.|

The reader uses the following to determine the encoding of the stream.

1.  Checks the `Encoding` property to determine the encoding.

2.  If the `Encoding` property is `null`, the reader checks for a byte-order mark at the beginning of the stream.

3.  If the `Encoding` property is `null`, and no byte-order mark is found, the reader assumes the stream is encoded in UTF-8.

## XmlTextReader.XmlTextReader(String, Stream, XmlNameTable) constructor

```csharp
public XmlTextReader (string url, System.IO.Stream input, System.Xml.XmlNameTable nt);
```

Initializes a new instance of the `XmlTextReader` class with the specified URL, stream and `XmlNameTable`.

Parameters:

- `url`: The URL to use for resolving external resources. The `XmlTextReader.BaseURI` is set to this value. If `url` is `null`, `BaseURI` is set to `String.Empty`.
- `input`: The stream containing the XML data to read.
- `nt`: The `XmlNameTable` to use.

Exceptions:

- `NullReferenceException`: The `input` or `nt` value is `null`.

#### Remarks

> **Note:**
> We recommend that you create `XmlReader` instances by using the `XmlReader.Create` method to take advantage of new functionality.
