---
title: "XmlReader class (part 9 of 16)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/XmlReader.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlReader class (part 9 of 16)

## XmlReader.ReadContentAsBinHexAsync(Byte[], Int32, Int32) method

```csharp
public virtual System.Threading.Tasks.Task<int> ReadContentAsBinHexAsync (byte[] buffer, int index, int count);
```

Asynchronously reads the content and returns the `BinHex` decoded binary bytes.

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
This is the asynchronous version of `XmlReader.ReadContentAsBinHex`, with the same functionality. To use this method, you must set the `Async` flag to `true`.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `ReadContentAsBinHex`.

## XmlReader.ReadContentAsBoolean() method

```csharp
public virtual bool ReadContentAsBoolean ();
```

Reads the text content at the current position as a `Boolean`.

Returns: The text content as a `Boolean` object.

Exceptions:

- `InvalidCastException`: The attempted cast is not valid.
- `FormatException`: The string format is not valid.
- `InvalidOperationException`: An `XmlReader` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

#### Remarks
This method concatenates text, white space, significant white space, and CDATA sections, and skips any comments or processing instructions. Entity references are automatically resolved.

If the content is typed `xsd:boolean`, the reader returns an unboxed `Boolean` object. If the content is not typed `xsd:boolean`, the reader attempts to convert it to a `Boolean` object according to the rules defined by the W3C XML Schema Part 2: Datatypes recommendation.

The following table describes how this method treats each node type.

|XmlNodeType|Return value|Reader behavior|
|-----------------|------------------|---------------------|
|`Text` `CDATA` `Whitespace` `SignificantWhitespace` `EntityReference` `EndEntity`|Concatenated content of text, CDATA, white space and significant white space nodes converted to the requested type.|Moves to the next start element or end element tag. Entity references are automatically expanded.|
|`Attribute`|Same as calling `XmlConvert.ToXxx` on the attribute value.|The reader remains in the current position.|
|`Comment` `ProcessingInstruction`|Ignores the processing instruction (PI) or comment and reads the concatenated text content that follows the PI or comment.|Moves to the next start element or end element tag. Entity references are automatically expanded.|
|`EndElement`|An empty string.|The reader remains in the current position.|
|`Element` `XmlDeclaration` `None` `Document` `DocumentType` `Notation` `Entity` `DocumentFragment`|An `InvalidOperationException` is thrown.|Undefined, although typically the reader remains in the current position.|

For more information, see the `XmlReader` reference page and the W3C XML Schema Part 2: Datatypes recommendation.

#### Examples
The following example uses the `XmlReader.ReadContentAsBoolean` method to read the attribute as a `Boolean` value.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlReader/ReadContentAs/readContentAs.cs._

The example uses the `dataFile_2.xml` file as input.

_Code sample not included: ~/snippets/xml/VS_Snippets_Data/XmlReader.ReadContentAs/XML/dataFile_2.xml._
## XmlReader.ReadContentAsDateTime() method

```csharp
public virtual DateTime ReadContentAsDateTime ();
```

Reads the text content at the current position as a `DateTime` object.

Returns: The text content as a `DateTime` object.

Exceptions:

- `InvalidCastException`: The attempted cast is not valid.
- `FormatException`: The string format is not valid.
- `InvalidOperationException`: An `XmlReader` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

#### Remarks
This method concatenates text, white space, significant white space, and CDATA sections, and skips any comments or processing instructions. Entity references are automatically resolved.

If the content is typed `xsd:dateTime`, the reader returns an unboxed `DateTime` object. If the content is not typed `xsd:dateTime`, the reader attempts to convert it to a `DateTime` object according to the rules defined by the W3C XML Schema Part 2: Datatypes recommendation.

> **Note:**
> You cannot rely on the `DateTime.Year` value when the content is typed as `xsd:gMonthDay`. `XmlReader` always sets the `DateTime.Year` value to 1904 in this case.

The following table describes how this method treats each node type.

|XmlNodeType|Return value|Reader behavior|
|-----------------|------------------|---------------------|
|`Text` `CDATA` `Whitespace` `SignificantWhitespace` `EntityReference` `EndEntity`|Concatenated content of text, CDATA, white space and significant white space nodes converted to the requested type.|Moves to the next start element or end element tag. Entity references are automatically expanded.|
|`Attribute`|Same as calling `XmlConvert.ToXxx` on the attribute value.|The reader remains in the current position.|
|`Comment` `ProcessingInstruction`|Ignores the processing instruction (PI) or comment and reads the concatenated text content that follows the PI or comment.|Moves to the next start element or end element tag. Entity references are automatically expanded.|
|`EndElement`|An empty string.|The reader remains in the current position.|
|`Element` `XmlDeclaration` `None` `Document` `DocumentType` `Notation` `Entity` `DocumentFragment`|An `InvalidOperationException` is thrown.|Undefined, although typically the reader remains in the current position.|

For more information, see the `XmlReader` reference page and the W3C XML Schema Part 2: Datatypes recommendation.

## XmlReader.ReadContentAsDateTimeOffset() method

```csharp
public virtual DateTimeOffset ReadContentAsDateTimeOffset ();
```

Reads the text content at the current position as a `DateTimeOffset` object.

Returns: The text content as a `DateTimeOffset` object.

Exceptions:

- `InvalidOperationException`: An `XmlReader` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

To be added.

## XmlReader.ReadContentAsDecimal() method

```csharp
public virtual decimal ReadContentAsDecimal ();
```

Reads the text content at the current position as a `Decimal` object.

Returns: The text content at the current position as a `Decimal` object.

Exceptions:

- `InvalidCastException`: The attempted cast is not valid.
- `FormatException`: The string format is not valid.
- `InvalidOperationException`: An `XmlReader` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

#### Remarks
This method concatenates text, white space, significant white space, and CDATA sections, and skips any comments or processing instructions. Entity references are automatically resolved.

If the content is typed `xsd:decimal`, the reader returns an unboxed `Decimal` object. If the content is not typed `xsd:decimal`, the reader attempts to convert it to a `Decimal` object according to the rules defined by the W3C XML Schema Part 2: Datatypes recommendation.

The following table describes how this method treats each node type.

|XmlNodeType|Return value|Reader behavior|
|-----------------|------------------|---------------------|
|`Text` `CDATA` `Whitespace` `SignificantWhitespace` `EntityReference` `EndEntity`|Concatenated content of text, CDATA, white space and significant white space nodes converted to the requested type.|Moves to the next start element or end element tag. Entity references are automatically expanded.|
|`Attribute`|Same as calling `XmlConvert.ToXxx` on the attribute value.|The reader remains in the current position.|
|`Comment` `ProcessingInstruction`|Ignores the processing instruction (PI) or comment and reads the concatenated text content that follows the PI or comment.|Moves to the next start element or end element tag. Entity references are automatically expanded.|
|`EndElement`|An empty string.|The reader remains in the current position.|
|`Element` `XmlDeclaration` `None` `Document` `DocumentType` `Notation` `Entity` `DocumentFragment`|An `InvalidOperationException` is thrown.|Undefined, although typically the reader remains in the current position.|

For more information, see the `XmlReader` reference page and the W3C XML Schema Part 2: Datatypes recommendation.

## XmlReader.ReadContentAsDouble() method

```csharp
public virtual double ReadContentAsDouble ();
```

Reads the text content at the current position as a double-precision floating-point number.

Returns: The text content as a double-precision floating-point number.

Exceptions:

- `InvalidCastException`: The attempted cast is not valid.
- `FormatException`: The string format is not valid.
- `InvalidOperationException`: An `XmlReader` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

#### Remarks
This method concatenates text, white space, significant white space, and CDATA sections, and skips any comments or processing instructions. Entity references are automatically resolved.

If the content is typed `xsd:double`, the reader returns a double-precision floating-point number. If the content is not typed `xsd:double`, the reader attempts to convert it to a double-precision floating-point number according to the rules defined by the W3C XML Schema Part 2: Datatypes recommendation.

The following table describes how this method treats each node type.

|XmlNodeType|Return value|Reader behavior|
|-----------------|------------------|---------------------|
|`Text` `CDATA` `Whitespace` `SignificantWhitespace` `EntityReference` `EndEntity`|Concatenated content of text, CDATA, white space and significant white space nodes converted to the requested type.|Moves to the next start element or end element tag. Entity references are automatically expanded.|
|`Attribute`|Same as calling `XmlConvert.ToXxx` on the attribute value.|The reader remains in the current position.|
|`Comment` `ProcessingInstruction`|Ignores the processing instruction (PI) or comment and reads the concatenated text content that follows the PI or comment.|Moves to the next start element or end element tag. Entity references are automatically expanded.|
|`EndElement`|An empty string.|The reader remains in the current position.|
|`Element` `XmlDeclaration` `None` `Document` `DocumentType` `Notation` `Entity` `DocumentFragment`|An `InvalidOperationException` is thrown.|Undefined, although typically the reader remains in the current position.|

For more information, see the `XmlReader` reference page and the W3C XML Schema Part 2: Datatypes recommendation.

## XmlReader.ReadContentAsFloat() method

```csharp
public virtual float ReadContentAsFloat ();
```

Reads the text content at the current position as a single-precision floating point number.

Returns: The text content at the current position as a single-precision floating point number.

Exceptions:

- `InvalidCastException`: The attempted cast is not valid.
- `FormatException`: The string format is not valid.
- `InvalidOperationException`: An `XmlReader` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

#### Remarks
This method concatenates text, white space, significant white space, and CDATA sections, and skips any comments or processing instructions. Entity references are automatically resolved.

If the content is typed `xsd:float`, the reader returns an unboxed a single-precision floating point number. If the content is not typed `xsd:float`, the reader attempts to convert it to a single-precision floating point number according to the rules defined by the W3C XML Schema Part 2: Datatypes recommendation.

The following table describes how this method treats each node type.

|XmlNodeType|Return value|Reader behavior|
|-----------------|------------------|---------------------|
|`Text` `CDATA` `Whitespace` `SignificantWhitespace` `EntityReference` `EndEntity`|Concatenated content of text, CDATA, white space and significant white space nodes converted to the requested type.|Moves to the next start element or end element tag. Entity references are automatically expanded.|
|`Attribute`|Same as calling `XmlConvert.ToXxx` on the attribute value.|The reader remains in the current position.|
|`Comment` `ProcessingInstruction`|Ignores the processing instruction (PI) or comment and reads the concatenated text content that follows the PI or comment.|Moves to the next start element or end element tag. Entity references are automatically expanded.|
|`EndElement`|An empty string.|The reader remains in the current position.|
|`Element` `XmlDeclaration` `None` `Document` `DocumentType` `Notation` `Entity` `DocumentFragment`|An `InvalidOperationException` is thrown.|Undefined, although typically the reader remains in the current position.|

For more information, see the Remarks section of the `XmlReader` reference page and the W3C XML Schema Part 2: Datatypes recommendation.
