---
title: "XmlReader class (part 8 of 16)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/XmlReader.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlReader class (part 8 of 16)

## XmlReader.ReadAttributeValue() method

```csharp
public abstract bool ReadAttributeValue ();
```

When overridden in a derived class, parses the attribute value into one or more `Text`, `EntityReference`, or `EndEntity` nodes.

Returns: `true` if there are nodes to return.

`false` if the reader is not positioned on an attribute node when the initial call is made or if all the attribute values have been read.

An empty attribute, such as, `misc=""`, returns `true` with a single node with a value of `String.Empty`.

Exceptions:

- `InvalidOperationException`: An `XmlReader` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

#### Remarks
Use this method after calling `XmlReader.MoveToAttribute` to read through the text or entity reference nodes that make up the attribute value. The `Depth` of the attribute value nodes is one plus the depth of the attribute node; it increments and decrements by one when you step into and out of general entity references.

## XmlReader.ReadContentAs(Type, IXmlNamespaceResolver) method

```csharp
public virtual object ReadContentAs (Type returnType, System.Xml.IXmlNamespaceResolver? namespaceResolver);
```

Reads the content as an object of the type specified.

Parameters:

- `returnType`: The type of the value to be returned. The value can be the `DateTimeOffset` type.
- `namespaceResolver`: An `IXmlNamespaceResolver` object that is used to resolve any namespace prefixes related to type conversion. For example, this can be used when converting an `XmlQualifiedName` object to an `xs:string`.

This value can be `null`.

Returns: The concatenated text content or attribute value converted to the requested type.

Exceptions:

- `FormatException`: The content is not in the correct format for the target type.
- `InvalidCastException`: The attempted cast is not valid.
- `ArgumentNullException`: The `returnType` value is `null`.
- `InvalidOperationException`: The current node is not a supported node type. See the table below for details.

-or-

An `XmlReader` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."
- `OverflowException`: Read `Decimal.MaxValue`.

#### Remarks
This method reads the text content at the current reader position and converts it to the requested return type. Text, white space, significant white space and CDATA sections are concatenated. Comments and processing instructions are skipped and entity references are automatically resolved.

This method is used to read, convert if necessary, and return atomic value items from the current node content. If the input type is a valid mappings for the type of the current node then an instance of the target type containing the value of the current node is returned. See the Remarks section in the `XmlReader` reference page for a list of the default mappings.

For example, if you had the following XML text:

```xml
<elem>123 <!-- comment --> <?pi my_text?> 456 <?pi another_pi?></elem>
```

If the data is typed and a string array is supplied to the `XmlReader.ReadContentAs` method call, then the integer values are converted from strings according to the list of valid CLR type mappings.

If the data is untyped and a string array is supplied to the `XmlReader.ReadContentAs` method call, then the content is parsed into separate strings. An array containing two strings is returned with the values "123" and "456". The spaces are not preserved from the content.

In general when reading untyped data the content is parsed according to the supplied type. For example, if an integer array is supplied to the `XmlReader.ReadContentAs` method call then the string is parsed into an array of integers {123,456}.

In the following example the XML text is not separated by spaces

```xml
<elem>123<!-- comment --><?pi my_text?>456789<?pi another_pi?></elem>
```

If the content is untyped and a string array is supplied to the `XmlReader.ReadContentAs` method call then an array containing one concatenated string is returned with the value "123456789".

The following table describes how this method treats each node type.

|XmlNodeType|Return value|Reader behavior|
|-----------------|------------------|---------------------|
|`Text` `CDATA` `Whitespace` `SignificantWhitespace` `EntityReference` `EndEntity`|Concatenated content of text, CDATA, white space and significant white space nodes converted to the requested type.|Moves to the next start element or end element tag. Entity references are automatically expanded.|
|`Attribute`|Same as calling `XmlConvert.ToXxx` on the attribute value.|The reader remains in the current position.|
|`Comment` `ProcessingInstruction`|Ignores the processing instruction (PI) or comment and reads the concatenated text content that follows the PI or comment.|Moves to the next start element or end element tag. Entity references are automatically expanded.|
|`EndElement`|An empty string.|The reader remains in the current position.|
|`Element` `XmlDeclaration` `None` `Document` `DocumentType` `Notation` `Entity` `DocumentFragment`|An `InvalidOperationException` is thrown.|Undefined, although typically the reader remains in the current position.|

For more information, see the Remarks section of the `XmlReader` reference page and the W3C XML Schema Part 2: Datatypes recommendation.

For the asynchronous version of this method, see `XmlReader.ReadContentAsAsync`.

#### Examples
The following example uses the `XmlReader.ReadContentAs` method to return the contents of the colors element into an array of string objects.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlReader/ReadContentAs/readContentAs.cs._

The example uses the `dataFile_2.xml` file as input.

_Code sample not included: ~/snippets/xml/VS_Snippets_Data/XmlReader.ReadContentAs/XML/dataFile_2.xml._
## XmlReader.ReadContentAsAsync(Type, IXmlNamespaceResolver) method

```csharp
public virtual System.Threading.Tasks.Task<object> ReadContentAsAsync (Type returnType, System.Xml.IXmlNamespaceResolver? namespaceResolver);
```

Asynchronously reads the content as an object of the type specified.

Parameters:

- `returnType`: The type of the value to be returned.
- `namespaceResolver`: An `IXmlNamespaceResolver` object that is used to resolve any namespace prefixes related to type conversion.

Returns: The concatenated text content or attribute value converted to the requested type.

Exceptions:

- `InvalidOperationException`: An `XmlReader` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

-or-

An `XmlReader` asynchronous method was called without setting the `XmlReaderSettings.Async` flag to `true`. In this case, `InvalidOperationException` is thrown with the message "Set XmlReaderSettings.Async to true if you want to use Async Methods."

#### Remarks
This is the asynchronous version of `XmlReader.ReadContentAs`, with the same functionality. To use this method, you must set the `Async` flag to `true`.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `ReadContentAs`.

## XmlReader.ReadContentAsBase64(Byte[], Int32, Int32) method

```csharp
public virtual int ReadContentAsBase64 (byte[] buffer, int index, int count);
```

Reads the content and returns the Base64 decoded binary bytes.

Parameters:

- `buffer`: The buffer into which to copy the resulting text. This value cannot be `null`.
- `index`: The offset into the buffer where to start copying the result.
- `count`: The maximum number of bytes to copy into the buffer. The actual number of bytes copied is returned from this method.

Returns: The number of bytes written to the buffer.

Exceptions:

- `ArgumentNullException`: The `buffer` value is `null`.
- `InvalidOperationException`: `XmlReader.ReadContentAsBase64` is not supported on the current node.

-or-

An `XmlReader` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."
- `ArgumentOutOfRangeException`: The index into the buffer or index + count is larger than the allocated buffer size.
- `NotSupportedException`: The `XmlReader` implementation does not support this method.

#### Remarks
This method streams the content, decodes the `Base64` content, and returns the decoded binary bytes (for example, an inline `Base64` encoded GIF image) into the buffer. This method can be called successively to read large streams of embedded text. For more information, see RFC 1521, "MIME (Multipurpose Internet Mail Extensions) Part One: Mechanisms for Specifying and Describing the Format of Internet Message Bodies". You can obtain RFCs from the Request for Comments web site.

> **Note:**
> You should not access any of the reader properties between calls to the `XmlReader.ReadContentAsBase64` method until the method returns the value `0`.

This method has the following behavior:

- `XmlReader.ReadContentAsBase64` returns the value `0` when it has reached the end of the byte stream it was operating on. The reader is positioned on the first non-content node.

- If you ask for fewer, or the exact number of, bytes than are left in the stream the reader remains in its current position.

- `XmlReader.ReadContentAsBase64` is not supported on the following XML node types: `Element`, `XmlDeclaration`, `None`, `Document`, `DocumentType`, `Notation`, `Entity`, `DocumentFragment`.

For the asynchronous version of this method, see `XmlReader.ReadContentAsBase64Async`.

## XmlReader.ReadContentAsBase64Async(Byte[], Int32, Int32) method

```csharp
public virtual System.Threading.Tasks.Task<int> ReadContentAsBase64Async (byte[] buffer, int index, int count);
```

Asynchronously reads the content and returns the Base64 decoded binary bytes.

Parameters:

- `buffer`: The buffer into which to copy the resulting text. This value cannot be `null`.
- `index`: The offset into the buffer where to start copying the result.
- `count`: The maximum number of bytes to copy into the buffer. The actual number of bytes copied is returned from this method.

Returns: The number of bytes written to the buffer.

Exceptions:

- `InvalidOperationException`: An `XmlReader` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

-or-

An `XmlReader` asynchronous method was called without setting the `XmlReaderSettings.Async` flag to `true`. In this case, `InvalidOperationException` is thrown with the message "Set XmlReaderSettings.Async to true if you want to use Async Methods."

#### Remarks
This is the asynchronous version of `XmlReader.ReadContentAsBase64`, with the same functionality. To use this method, you must set the `Async` flag to `true`.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `ReadContentAsBase64`.

## XmlReader.ReadContentAsBinHex(Byte[], Int32, Int32) method

```csharp
public virtual int ReadContentAsBinHex (byte[] buffer, int index, int count);
```

Reads the content and returns the `BinHex` decoded binary bytes.

Parameters:

- `buffer`: The buffer into which to copy the resulting text. This value cannot be `null`.
- `index`: The offset into the buffer where to start copying the result.
- `count`: The maximum number of bytes to copy into the buffer. The actual number of bytes copied is returned from this method.

Returns: The number of bytes written to the buffer.

Exceptions:

- `ArgumentNullException`: The `buffer` value is `null`.
- `InvalidOperationException`: `XmlReader.ReadContentAsBinHex` is not supported on the current node.

-or-

An `XmlReader` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."
- `ArgumentOutOfRangeException`: The index into the buffer or index + count is larger than the allocated buffer size.
- `NotSupportedException`: The `XmlReader` implementation does not support this method.

#### Remarks
This method streams the content, decodes the `BinHex` content, and returns the decoded binary bytes (for example, an inline `BinHex` encoded GIF image) into the buffer. This method can be called successively to read large streams of embedded text.

> **Note:**
> You should not access any of the reader properties between calls to the `XmlReader.ReadContentAsBinHex` method until the method returns the value `0`.

This method has the following behavior:

- `XmlReader.ReadContentAsBinHex` returns the value `0` when it has reached the end of the byte stream it was operating on. The reader is positioned on the first non-content node.

- If you ask for fewer, or the exact number, of bytes than are left in the stream the reader remains in its current position.

- `XmlReader.ReadContentAsBinHex` is not supported on the following XML node types: `Element`, `XmlDeclaration`, `None`, `Document`, `DocumentType`, `Notation, Entity`, `DocumentFragment`.

For the asynchronous version of this method, see `XmlReader.ReadContentAsBinHexAsync`.
