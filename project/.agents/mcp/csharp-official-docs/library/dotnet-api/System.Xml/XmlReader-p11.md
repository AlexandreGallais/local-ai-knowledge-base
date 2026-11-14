---
title: "XmlReader class (part 11 of 16)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/XmlReader.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlReader class (part 11 of 16)

## XmlReader.ReadElementContentAs(Type, IXmlNamespaceResolver, String, String) method

```csharp
public virtual object ReadElementContentAs (Type returnType, System.Xml.IXmlNamespaceResolver namespaceResolver, string localName, string namespaceURI);
```

Checks that the specified local name and namespace URI matches that of the current element, then reads the element content as the requested type.

Parameters:

- `returnType`: The type of the value to be returned. The value can be the `DateTimeOffset` type.
- `namespaceResolver`: An `IXmlNamespaceResolver` object that is used to resolve any namespace prefixes related to type conversion.
- `localName`: The local name of the element.
- `namespaceURI`: The namespace URI of the element.

Returns: The element content converted to the requested typed object.

Exceptions:

- `InvalidOperationException`: The `XmlReader` is not positioned on an element.

-or-

An `XmlReader` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."
- `XmlException`: The current element contains child elements.

-or-

The element content cannot be converted to the requested type.
- `ArgumentNullException`: The method is called with `null` arguments.
- `ArgumentException`: The specified local name and namespace URI do not match that of the current element being read.
- `OverflowException`: Read `Decimal.MaxValue`.

#### Remarks
This method reads the start tag, the contents of the element, and moves the reader past the end element tag. It expands entities and ignores processing instructions and comments. The element can only contain simple content. That is, it cannot have child elements.

For more information, see the Remarks section of the `XmlReader` reference page and the W3C XML Schema Part 2: Datatypes recommendation.

## XmlReader.ReadElementContentAsAsync(Type, IXmlNamespaceResolver) method

```csharp
public virtual System.Threading.Tasks.Task<object> ReadElementContentAsAsync (Type returnType, System.Xml.IXmlNamespaceResolver namespaceResolver);
```

Asynchronously reads the element content as the requested type.

Parameters:

- `returnType`: The type of the value to be returned.
- `namespaceResolver`: An `IXmlNamespaceResolver` object that is used to resolve any namespace prefixes related to type conversion.

Returns: The element content converted to the requested typed object.

Exceptions:

- `InvalidOperationException`: An `XmlReader` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."
-or-

An `XmlReader` asynchronous method was called without setting the `XmlReaderSettings.Async` flag to `true`. In this case, `InvalidOperationException` is thrown with the message "Set XmlReaderSettings.Async to true if you want to use Async Methods."

#### Remarks
This is the asynchronous version of `XmlReader.ReadElementContentAs`, with the same functionality. To use this method, you must set the `Async` flag to `true`.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `ReadElementContentAs`.

## XmlReader.ReadElementContentAsBase64(Byte[], Int32, Int32) method

```csharp
public virtual int ReadElementContentAsBase64 (byte[] buffer, int index, int count);
```

Reads the element and decodes the `Base64` content.

Parameters:

- `buffer`: The buffer into which to copy the resulting text. This value cannot be `null`.
- `index`: The offset into the buffer where to start copying the result.
- `count`: The maximum number of bytes to copy into the buffer. The actual number of bytes copied is returned from this method.

Returns: The number of bytes written to the buffer.

Exceptions:

- `ArgumentNullException`: The `buffer` value is `null`.
- `InvalidOperationException`: The current node is not an element node.

-or-

An `XmlReader` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."
- `ArgumentOutOfRangeException`: The index into the buffer or index + count is larger than the allocated buffer size.
- `NotSupportedException`: The `XmlReader` implementation does not support this method.
- `XmlException`: The element contains mixed-content.
- `FormatException`: The content cannot be converted to the requested type.

#### Remarks
This method reads the element content, decodes it using `Base64` encoding, and returns the decoded binary bytes (for example, an inline `Base64`-encoded GIF image) into the buffer. For more information, see RFC 1521, "MIME (Multipurpose Internet Mail Extensions) Part One: Mechanisms for Specifying and Describing the Format of Internet Message Bodies". You can obtain RFCs from the Request for Comments web site.

`XmlReader.ReadElementContentAsBase64` can only read simple-content elements. The element can contain text, white space, significant white space, CDATA sections, comments and processing instructions. It can also contain entity references, which are automatically expanded. The element cannot have child elements.

This method is very similar to the `XmlReader.ReadContentAsBase64` method except that it can only be called on element node types.

If the `count` value is higher than the number of bytes in the document, or if it is equal to the number of bytes in the document, the `XmlReader` reads all the remaining bytes in the document and returns the number of bytes read. The next `XmlReader` method call returns a zero and moves the reader to the node following the `EndElement`.

If you call `XmlReader.Read` before all of the element content is consumed, the reader may behave as if the first content was consumed and then the `XmlReader.Read` method was called. This means that the reader will read all the text until the end element is encountered. It will then read the end tag node, read the next node, and then position itself on the next subsequent node.

For the asynchronous version of this method, see `XmlReader.ReadElementContentAsBase64Async`.

#### Examples
The following example reads an inline `Base64` encoded image. The `Base64` data is embedded within the `<image>` element. A `BinaryWriter` is used to create a new binary data file.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlReader/ReadElementContentAsBase64/readBinary.cs._

## XmlReader.ReadElementContentAsBase64Async(Byte[], Int32, Int32) method

```csharp
public virtual System.Threading.Tasks.Task<int> ReadElementContentAsBase64Async (byte[] buffer, int index, int count);
```

Asynchronously reads the element and decodes the `Base64` content.

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
This is the asynchronous version of `XmlReader.ReadElementContentAsBase64`, with the same functionality. To use this method, you must set the `Async` flag to `true`.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `ReadElementContentAsBase64`.

## XmlReader.ReadElementContentAsBinHex(Byte[], Int32, Int32) method

```csharp
public virtual int ReadElementContentAsBinHex (byte[] buffer, int index, int count);
```

Reads the element and decodes the `BinHex` content.

Parameters:

- `buffer`: The buffer into which to copy the resulting text. This value cannot be `null`.
- `index`: The offset into the buffer where to start copying the result.
- `count`: The maximum number of bytes to copy into the buffer. The actual number of bytes copied is returned from this method.

Returns: The number of bytes written to the buffer.

Exceptions:

- `ArgumentNullException`: The `buffer` value is `null`.
- `InvalidOperationException`: The current node is not an element node.

-or-

An `XmlReader` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."
- `ArgumentOutOfRangeException`: The index into the buffer or index + count is larger than the allocated buffer size.
- `NotSupportedException`: The `XmlReader` implementation does not support this method.
- `XmlException`: The element contains mixed-content.
- `FormatException`: The content cannot be converted to the requested type.

#### Remarks
This method reads the element content, decodes it using `BinHex` encoding, and returns the decoded binary bytes (for example, an inline `BinHex`-encoded GIF image) into the buffer.

This method can only read simple-content elements. The element can contain text, white space, significant white space, CDATA sections, comments and processing instructions. It can also contain entity references, which are automatically expanded. The element cannot have child elements.

This method is very similar to the `XmlReader.ReadContentAsBinHex` method except that it can only be called on element node types.

If the `count` value is higher than the number of bytes in the document, or if it is equal to the number of bytes in the document, the `XmlReader` reads all the remaining bytes in the document and returns the number of bytes read. The next `XmlReader` method call returns a zero and moves the reader to the node following the `EndElement`.

If you call `XmlReader.Read` before all of the element content is consumed, the reader may behave as if the first content was consumed and then the `XmlReader.Read` method was called. This means that the reader will read all the text until the end element is encountered. It will then read the end tag node, read the next node, and then position itself on the next subsequent node.

For the asynchronous version of this method, see `XmlReader.ReadElementContentAsBinHexAsync`.

#### Examples
The following example reads an inline `BinHex` encoded image. The `BinHex` data is embedded within the `<image>` element. A `BinaryWriter` is used to create a new binary data file.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlReader/ReadElementContentAsBase64/readBinary.cs._

## XmlReader.ReadElementContentAsBinHexAsync(Byte[], Int32, Int32) method

```csharp
public virtual System.Threading.Tasks.Task<int> ReadElementContentAsBinHexAsync (byte[] buffer, int index, int count);
```

Asynchronously reads the element and decodes the `BinHex` content.

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
This is the asynchronous version of `XmlReader.ReadElementContentAsBinHex`, with the same functionality. To use this method, you must set the `Async` flag to `true`.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `ReadElementContentAsBinHex`.

## XmlReader.ReadElementContentAsBoolean() method

```csharp
public virtual bool ReadElementContentAsBoolean ();
```

Reads the current element and returns the contents as a `Boolean` object.

Returns: The element content as a `Boolean` object.

Exceptions:

- `InvalidOperationException`: The `XmlReader` is not positioned on an element.

-or-

An `XmlReader` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."
- `XmlException`: The current element contains child elements.

-or-

The element content cannot be converted to a `Boolean` object.
- `ArgumentNullException`: The method is called with `null` arguments.

#### Remarks
This method reads the start tag, the contents of the element, and moves the reader past the end element tag. It expands entities and ignores processing instructions and comments. The element can only contain simple content. That is, it cannot have child elements.

If the element content is typed `xsd:boolean`, the reader returns an unboxed `Boolean` object. If the content is not typed `xsd:boolean`, the reader attempts to convert it to a `Boolean` object according to the rules defined by the W3C XML Schema Part 2: Datatypes recommendation.

For more information, see the Remarks section of the `XmlReader` reference page.
