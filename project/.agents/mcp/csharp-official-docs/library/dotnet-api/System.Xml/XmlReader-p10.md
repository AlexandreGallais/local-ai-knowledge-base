---
title: "XmlReader class (part 10 of 16)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/XmlReader.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlReader class (part 10 of 16)

## XmlReader.ReadContentAsInt() method

```csharp
public virtual int ReadContentAsInt ();
```

Reads the text content at the current position as a 32-bit signed integer.

Returns: The text content as a 32-bit signed integer.

Exceptions:

- `InvalidCastException`: The attempted cast is not valid.
- `FormatException`: The string format is not valid.
- `InvalidOperationException`: An `XmlReader` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

#### Remarks
This method concatenates text, white space, significant white space, and CDATA sections, and skips any comments or processing instructions. Entity references are automatically resolved.

If the content is typed `xsd:integer`, the reader returns an unboxed 32-bit signed integer. If the content is not typed `xsd:integer`, the reader attempts to convert it to a 32-bit signed integer according to the rules defined by the W3C XML Schema Part 2: Datatypes recommendation.

The following table describes how this method treats each node type.

|XmlNodeType|Return value|Reader behavior|
|-----------------|------------------|---------------------|
|`Text` `CDATA` `Whitespace` `SignificantWhitespace` `EntityReference` `EndEntity`|Concatenated content of text, CDATA, white space and significant white space nodes converted to the requested type.|Moves to the next start element or end element tag. Entity references are automatically expanded.|
|`Attribute`|Same as calling `XmlConvert.ToXxx` on the attribute value.|The reader remains in the current position.|
|`Comment` `ProcessingInstruction`|Ignores the processing instruction (PI) or comment and reads the concatenated text content that follows the PI or comment.|Moves to the next start element or end element tag. Entity references are automatically expanded.|
|`EndElement`|An empty string.|The reader remains in the current position.|
|`Element` `XmlDeclaration` `None` `Document` `DocumentType` `Notation` `Entity` `DocumentFragment`|An `InvalidOperationException` is thrown.|Undefined, although typically the reader remains in the current position.|

For more information, see the Remarks section of the `XmlReader` reference page and the W3C XML Schema Part 2: Datatypes recommendation.

## XmlReader.ReadContentAsLong() method

```csharp
public virtual long ReadContentAsLong ();
```

Reads the text content at the current position as a 64-bit signed integer.

Returns: The text content as a 64-bit signed integer.

Exceptions:

- `InvalidCastException`: The attempted cast is not valid.
- `FormatException`: The string format is not valid.
- `InvalidOperationException`: An `XmlReader` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

#### Remarks
This method concatenates text, white space, significant white space, and CDATA sections, and skips any comments or processing instructions. Entity references are automatically resolved.

If the content is typed `xsd:long`, the reader returns an unboxed 64-bit signed integer. If the content is not typed `xsd:long`, the reader attempts to convert it to a 64-bit signed integer according to the rules defined by the W3C XML Schema Part 2: Datatypes recommendation.

The following table describes this method treats each node type.

|XmlNodeType|Return value|Reader behavior|
|-----------------|------------------|---------------------|
|`Text` `CDATA` `Whitespace` `SignificantWhitespace` `EntityReference` `EndEntity`|Concatenated content of text, CDATA, white space and significant white space nodes converted to the requested type.|Moves to the next start element or end element tag. Entity references are automatically expanded.|
|`Attribute`|Same as `XmlConvert.ToXxx` on attribute value.|The reader remains in the current position|
|`Comment` `ProcessingInstruction`|Ignores the processing instruction (PI) or comment and reads the concatenated text content that follows the PI or comment.|Moves to the next start element or end element tag. Entity references are automatically expanded.|
|`EndElement`|An empty string.|The reader remains in the current position.|
|`Element` `XmlDeclaration` `None` `Document` `DocumentType` `Notation` `Entity` `DocumentFragment`|An `InvalidOperationException` is thrown.|Undefined, although typically the reader remains in the current position.|

For more information, see the Remarks section of the `XmlReader` reference page.

## XmlReader.ReadContentAsObject() method

```csharp
public virtual object ReadContentAsObject ();
```

Reads the text content at the current position as an `Object`.

Returns: The text content as the most appropriate common language runtime (CLR) object.

Exceptions:

- `InvalidCastException`: The attempted cast is not valid.
- `FormatException`: The string format is not valid.
- `InvalidOperationException`: An `XmlReader` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

#### Remarks
This method concatenates text, white space, significant white space, and CDATA sections, and skips any comments or processing instructions. Entity references are automatically resolved.

If the content is typed, the reader returns a boxed CLR of the most appropriate type, specified by the `ValueType` property. If the content is a list type, the reader returns an array of boxed objects of the appropriate type.

> **Note:**
> If a validation error occurs while parsing the content and the reader is an `XmlReader` object created by the `XmlReader.Create` method, the reader returns the content as a string. In other words when a validation error or warning occurs, the content is considered to be untyped.

If the content is not typed, the reader returns the content as a string.

The following table describes how this method treats each node type.

|XmlNodeType|Return value|Reader behavior|
|-----------------|------------------|---------------------|
|`Text` `CDATA` `Whitespace` `SignificantWhitespace` `EntityReference` `EndEntity`|Concatenated content of text, CDATA, white space and significant white space nodes converted to the requested type.|Moves to the next start element or end element tag. Entity references are automatically expanded.|
|`Attribute`|Same as calling `XmlConvert.ToXxx` on the attribute value.|The reader remains in the current position|
|`Comment` `ProcessingInstruction`|Ignores the processing instruction (PI) or comment and reads the concatenated text content that follows the PI or comment.|Moves to the next start element or end element tag. Entity references are automatically expanded.|
|`EndElement`|The value of the element if the reader is a schema validating reader (`ValidationType` is set to `Schema`); otherwise an empty string.|The reader remains in the current position.|
|`Element` `XmlDeclaration` `None` `Document` `DocumentType` `Notation` `Entity` `DocumentFragment`|An `InvalidOperationException` is thrown.|Undefined, although typically the reader remains in the current position.|

For more information, see the Remarks section of the `XmlReader` reference page and the W3C XML Schema Part 2: Datatypes recommendation.

For the asynchronous version of this method, see `XmlReader.ReadContentAsObjectAsync`.

## XmlReader.ReadContentAsObjectAsync() method

```csharp
public virtual System.Threading.Tasks.Task<object> ReadContentAsObjectAsync ();
```

Asynchronously reads the text content at the current position as an `Object`.

Returns: The text content as the most appropriate common language runtime (CLR) object.

Exceptions:

- `InvalidOperationException`: An `XmlReader` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

-or-

An `XmlReader` asynchronous method was called without setting the `XmlReaderSettings.Async` flag to `true`. In this case, `InvalidOperationException` is thrown with the message "Set XmlReaderSettings.Async to true if you want to use Async Methods."

#### Remarks
This is the asynchronous version of `XmlReader.ReadContentAsObject`, with the same functionality. To use this method, you must set the `Async` flag to `true`.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `ReadContentAsObject`.

## XmlReader.ReadContentAsString() method

```csharp
public virtual string ReadContentAsString ();
```

Reads the text content at the current position as a `String` object.

Returns: The text content as a `String` object.

Exceptions:

- `InvalidCastException`: The attempted cast is not valid.
- `FormatException`: The string format is not valid.
- `InvalidOperationException`: An `XmlReader` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

#### Remarks
This method concatenates text, white space, significant white space, and CDATA sections, and skips any comments or processing instructions. Entity references are automatically resolved.

This method can be used convert typed values to a string, or to read the text content while skipping comments and processing instructions.

The following table describes how this method treats each node type.

|XmlNodeType|Return value|Reader behavior|
|-----------------|------------------|---------------------|
|`Text` `CDATA` `Whitespace` `SignificantWhitespace` `EntityReference` `EndEntity`|Concatenated content of text, CDATA, white space and significant white space nodes converted to the requested type.|Moves to the next start element or end element tag. Entity references are automatically expanded.|
|`Attribute`|Same as calling `XmlConvert.ToXxx` on the attribute value.|The reader remains in the current position.|
|`Comment` `ProcessingInstruction`|Ignores the processing instruction (PI) or comment and reads the concatenated text content that follows the PI or comment.|Moves to the next start element or end element tag. Entity references are automatically expanded.|
|`EndElement`|An empty string.|The reader remains in the current position.|
|`Element` `XmlDeclaration` `None` `Document` `DocumentType` `Notation` `Entity` `DocumentFragment`|An `InvalidOperationException` is thrown.|Undefined, although typically the reader remains in the current position.|

For more information, see the Remarks section of the `XmlReader` reference page and the W3C XML Schema Part 2: Datatypes recommendation.

For the asynchronous version of this method, see `XmlReader.ReadContentAsStringAsync`.

## XmlReader.ReadContentAsStringAsync() method

```csharp
public virtual System.Threading.Tasks.Task<string> ReadContentAsStringAsync ();
```

Asynchronously reads the text content at the current position as a `String` object.

Returns: The text content as a `String` object.

Exceptions:

- `InvalidOperationException`: An `XmlReader` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

-or-

An `XmlReader` asynchronous method was called without setting the `XmlReaderSettings.Async` flag to `true`. In this case, `InvalidOperationException` is thrown with the message "Set XmlReaderSettings.Async to true if you want to use Async Methods."

#### Remarks
This is the asynchronous version of `XmlReader.ReadContentAsString`, with the same functionality. To use this method, you must set the `Async` flag to `true`.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `ReadContentAsString`.

## XmlReader.ReadElementContentAs(Type, IXmlNamespaceResolver) method

```csharp
public virtual object ReadElementContentAs (Type returnType, System.Xml.IXmlNamespaceResolver namespaceResolver);
```

Reads the element content as the requested type.

Parameters:

- `returnType`: The type of the value to be returned. The value can be the `DateTimeOffset` type.
- `namespaceResolver`: An `IXmlNamespaceResolver` object that is used to resolve any namespace prefixes related to type conversion.

Returns: The element content converted to the requested typed object.

Exceptions:

- `InvalidOperationException`: The `XmlReader` is not positioned on an element.

-or-

An `XmlReader` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."
- `XmlException`: The current element contains child elements.

-or-

The element content cannot be converted to the requested type.
- `ArgumentNullException`: The method is called with `null` arguments.
- `OverflowException`: Read `Decimal.MaxValue`.

#### Remarks
This method reads the start tag, the contents of the element, and moves the reader past the end element tag. It expands entities and ignores processing instructions and comments. The element can only contain simple content. That is, it cannot have child elements.

For more information, see the Remarks section of the `XmlReader` reference page and the W3C XML Schema Part 2: Datatypes recommendation.

For the asynchronous version of this method, see `XmlReader.ReadElementContentAsAsync`.

#### Examples
The following example uses the `XmlReader.ReadElementContentAs` method to read the content of the `date` node.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlReader/Overview/readElementContentAs.cs._

The example uses the `dataFile.xml` file as input.

_Code sample not included: ~/snippets/xml/VS_Snippets_Data/XmlReader.ReadElementContentAs/XML/dataFile.xml._
