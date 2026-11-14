---
title: "XmlWriter class (part 4 of 11)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/XmlWriter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlWriter class (part 4 of 11)

## XmlWriter.WriteBase64(Byte[], Int32, Int32) method

```csharp
public abstract void WriteBase64 (byte[] buffer, int index, int count);
```

When overridden in a derived class, encodes the specified binary bytes as Base64 and writes out the resulting text.

Parameters:

- `buffer`: Byte array to encode.
- `index`: The position in the buffer indicating the start of the bytes to write.
- `count`: The number of bytes to write.

Exceptions:

- `ArgumentNullException`: `buffer` is `null`.
- `ArgumentOutOfRangeException`: `index` or `count` is less than zero.

-or-

The buffer length minus `index` is less than `count`.
- `InvalidOperationException`: An `XmlWriter` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

#### Remarks
For example, the byte buffer may contain the binary contents of a GIF image. This clearly would not be valid XML. The `Base64` encoding is designed to represent arbitrary byte sequences in a text form comprised of the 65 US-ASCII characters ([A-Za-z0-9+/=]) where each character encodes 6 bits of the binary data. For more information, see Requests for Comments (RFC) 1521 located on the Request for Comments Web site.

For the asynchronous version of this method, see `XmlWriter.WriteBase64Async`.

#### Examples
The following example uses the `XmlWriter.WriteBase64` method to write `Base64` data. The `Base64` data is embedded within an `<image>` element.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlReader/ReadElementContentAsBase64/readBinary.cs._

## XmlWriter.WriteBase64Async(Byte[], Int32, Int32) method

```csharp
public virtual System.Threading.Tasks.Task WriteBase64Async (byte[] buffer, int index, int count);
```

Asynchronously encodes the specified binary bytes as Base64 and writes out the resulting text.

Parameters:

- `buffer`: Byte array to encode.
- `index`: The position in the buffer indicating the start of the bytes to write.
- `count`: The number of bytes to write.

Returns: The task that represents the asynchronous `WriteBase64` operation.

Exceptions:

- `InvalidOperationException`: An `XmlWriter` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

-or-

An `XmlWriter` asynchronous method was called without setting the `XmlWriterSettings.Async` flag to `true`. In this case, `InvalidOperationException` is thrown with the message "Set XmlWriterSettings.Async to true if you want to use Async Methods."

#### Remarks
This is the asynchronous version of `XmlWriter.WriteBase64`, with the same functionality. To use this method, you must set the `Async` flag to `true`.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `WriteBase64`.

## XmlWriter.WriteBinHex(Byte[], Int32, Int32) method

```csharp
public virtual void WriteBinHex (byte[] buffer, int index, int count);
```

When overridden in a derived class, encodes the specified binary bytes as `BinHex` and writes out the resulting text.

Parameters:

- `buffer`: Byte array to encode.
- `index`: The position in the buffer indicating the start of the bytes to write.
- `count`: The number of bytes to write.

Exceptions:

- `ArgumentNullException`: `buffer` is `null`.
- `InvalidOperationException`: The writer is closed or in error state.
-or-

An `XmlWriter` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."
- `ArgumentOutOfRangeException`: `index` or `count` is less than zero.

-or-

The buffer length minus `index` is less than `count`.

#### Remarks
For the asynchronous version of this method, see `XmlWriter.WriteBinHexAsync`.

#### Examples
The following example uses the `XmlWriter.WriteBinHex` method to write `BinHex` data. The `BinHex` data is embedded within an `<image>` element.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlReader/ReadElementContentAsBase64/readBinary.cs._

## XmlWriter.WriteBinHexAsync(Byte[], Int32, Int32) method

```csharp
public virtual System.Threading.Tasks.Task WriteBinHexAsync (byte[] buffer, int index, int count);
```

Asynchronously encodes the specified binary bytes as `BinHex` and writes out the resulting text.

Parameters:

- `buffer`: Byte array to encode.
- `index`: The position in the buffer indicating the start of the bytes to write.
- `count`: The number of bytes to write.

Returns: The task that represents the asynchronous `WriteBinHex` operation.

Exceptions:

- `InvalidOperationException`: An `XmlWriter` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

-or-

An `XmlWriter` asynchronous method was called without setting the `XmlWriterSettings.Async` flag to `true`. In this case, `InvalidOperationException` is thrown with the message "Set XmlWriterSettings.Async to true if you want to use Async Methods."

#### Remarks
This is the asynchronous version of `XmlWriter.WriteBinHex`, with the same functionality. To use this method, you must set the `Async` flag to `true`.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `WriteBinHex`.

## XmlWriter.WriteCData(String) method

```csharp
public abstract void WriteCData (string? text);
```

When overridden in a derived class, writes out a <![CDATA[...]]> block containing the specified text.

Parameters:

- `text`: The text to place inside the CDATA block.

Exceptions:

- `ArgumentException`: The text would result in a non-well formed XML document.
- `InvalidOperationException`: An `XmlWriter` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

#### Remarks
If `text` is either `null` or `String.Empty`, this method writes an empty CDATA block, for example \]<![CDATA[]>.

For the asynchronous version of this method, see `XmlWriter.WriteCDataAsync`.

#### Examples
The following example writes an XML file representing a book.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlWriter/WriteCData/writerbook_v2.cs._

## XmlWriter.WriteCDataAsync(String) method

```csharp
public virtual System.Threading.Tasks.Task WriteCDataAsync (string? text);
```

Asynchronously writes out a <![CDATA[...]]> block containing the specified text.

Parameters:

- `text`: The text to place inside the CDATA block.

Returns: The task that represents the asynchronous `WriteCData` operation.

Exceptions:

- `InvalidOperationException`: An `XmlWriter` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

-or-

An `XmlWriter` asynchronous method was called without setting the `XmlWriterSettings.Async` flag to `true`. In this case, `InvalidOperationException` is thrown with the message "Set XmlWriterSettings.Async to true if you want to use Async Methods."

#### Remarks
This is the asynchronous version of `XmlWriter.WriteCData`, with the same functionality. To use this method, you must set the `Async` flag to `true`.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `WriteCData`.

## XmlWriter.WriteCharEntity(Char) method

```csharp
public abstract void WriteCharEntity (char ch);
```

When overridden in a derived class, forces the generation of a character entity for the specified Unicode character value.

Parameters:

- `ch`: The Unicode character for which to generate a character entity.

Exceptions:

- `ArgumentException`: The character is in the surrogate pair character range, `0xd800` - `0xdfff`.
- `InvalidOperationException`: An `XmlWriter` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

#### Remarks
This method writes the Unicode character in hexadecimal character entity reference format.

For the asynchronous version of this method, see `XmlWriter.WriteCharEntityAsync`.

#### Examples
See `XmlTextWriter.WriteCharEntity` for an example using this method.

## XmlWriter.WriteCharEntityAsync(Char) method

```csharp
public virtual System.Threading.Tasks.Task WriteCharEntityAsync (char ch);
```

Asynchronously forces the generation of a character entity for the specified Unicode character value.

Parameters:

- `ch`: The Unicode character for which to generate a character entity.

Returns: The task that represents the asynchronous `WriteCharEntity` operation.

Exceptions:

- `InvalidOperationException`: An `XmlWriter` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

-or-

An `XmlWriter` asynchronous method was called without setting the `XmlWriterSettings.Async` flag to `true`. In this case, `InvalidOperationException` is thrown with the message "Set XmlWriterSettings.Async to true if you want to use Async Methods."

#### Remarks
This is the asynchronous version of `XmlWriter.WriteCharEntity`, with the same functionality. To use this method, you must set the `Async` flag to `true`.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `WriteCharEntity`.

## XmlWriter.WriteChars(Char[], Int32, Int32) method

```csharp
public abstract void WriteChars (char[] buffer, int index, int count);
```

When overridden in a derived class, writes text one buffer at a time.

Parameters:

- `buffer`: Character array containing the text to write.
- `index`: The position in the buffer indicating the start of the text to write.
- `count`: The number of characters to write.

Exceptions:

- `ArgumentNullException`: `buffer` is `null`.
- `ArgumentOutOfRangeException`: `index` or `count` is less than zero.

-or-

The buffer length minus `index` is less than `count`; the call results in surrogate pair characters being split or an invalid surrogate pair being written.
- `ArgumentException`: The `buffer` parameter value is not valid.
- `InvalidOperationException`: An `XmlWriter` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

#### Remarks
This method can be used to write large amounts of text one buffer at a time.

Special handling must be done to ensure the `WriteChars` method does not split surrogate pair characters across multiple buffer writes. The XML specification defines the valid ranges for surrogate pairs.

For the asynchronous version of this method, see `XmlWriter.WriteCharsAsync`.

#### Examples
_Code sample not included: ~/snippets/csharp/System.Xml/XmlWriter/WriteChars/xmlwriterwritecharsexample.cs._
## XmlWriter.WriteCharsAsync(Char[], Int32, Int32) method

```csharp
public virtual System.Threading.Tasks.Task WriteCharsAsync (char[] buffer, int index, int count);
```

Asynchronously writes text one buffer at a time.

Parameters:

- `buffer`: Character array containing the text to write.
- `index`: The position in the buffer indicating the start of the text to write.
- `count`: The number of characters to write.

Returns: The task that represents the asynchronous `WriteChars` operation.

Exceptions:

- `InvalidOperationException`: An `XmlWriter` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

-or-

An `XmlWriter` asynchronous method was called without setting the `XmlWriterSettings.Async` flag to `true`. In this case, `InvalidOperationException` is thrown with the message "Set XmlWriterSettings.Async to true if you want to use Async Methods."

#### Remarks
This is the asynchronous version of `XmlWriter.WriteChars`, with the same functionality. To use this method, you must set the `Async` flag to `true`.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `WriteChars`.
