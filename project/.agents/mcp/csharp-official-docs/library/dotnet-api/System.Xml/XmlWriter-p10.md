---
title: "XmlWriter class (part 10 of 11)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/XmlWriter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlWriter class (part 10 of 11)

## XmlWriter.WriteStringAsync(String) method

```csharp
public virtual System.Threading.Tasks.Task WriteStringAsync (string? text);
```

Asynchronously writes the given text content.

Parameters:

- `text`: The text to write.

Returns: The task that represents the asynchronous `WriteString` operation.

Exceptions:

- `InvalidOperationException`: An `XmlWriter` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

-or-

An `XmlWriter` asynchronous method was called without setting the `XmlWriterSettings.Async` flag to `true`. In this case, `InvalidOperationException` is thrown with the message "Set XmlWriterSettings.Async to true if you want to use Async Methods."

#### Remarks
This is the asynchronous version of `XmlWriter.WriteString`, with the same functionality. To use this method, you must set the `Async` flag to `true`.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `WriteString`.

## XmlWriter.WriteSurrogateCharEntity(Char, Char) method

```csharp
public abstract void WriteSurrogateCharEntity (char lowChar, char highChar);
```

When overridden in a derived class, generates and writes the surrogate character entity for the surrogate character pair.

Parameters:

- `lowChar`: The low surrogate. This must be a value between 0xDC00 and 0xDFFF.
- `highChar`: The high surrogate. This must be a value between 0xD800 and 0xDBFF.

Exceptions:

- `ArgumentException`: An invalid surrogate character pair was passed.
- `InvalidOperationException`: An `XmlWriter` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

#### Remarks
This method is only applicable on systems that use UTF-16 encoding.

The surrogate character entity is written in hexadecimal format. The range for surrogate characters is #x10000 to #x10FFFF. The following formula is used to generate the surrogate character entity: (`highChar` -0xD800) * 0x400 + (`lowChar` -0xDC00) + 0x10000

For both HTML and XML, the document character set (and therefore the notation of numeric character references) is based on UCS [ISO-10646]. A single numeric character reference in a source document may therefore in some cases correspond to two 16-bit units in a string (a high surrogate and a low surrogate). These 16-bit units are referred to as a surrogate pair.

For more information regarding surrogates or characters, refer to section 3.7 of the Unicode 3.0/Unicode 2.0 standard located at <https://www.unicode.org>, or section 2.2 of the W3C XML 1.0 Recommendation.

For the asynchronous version of this method, see `XmlWriter.WriteSurrogateCharEntityAsync`.

## XmlWriter.WriteSurrogateCharEntityAsync(Char, Char) method

```csharp
public virtual System.Threading.Tasks.Task WriteSurrogateCharEntityAsync (char lowChar, char highChar);
```

Asynchronously generates and writes the surrogate character entity for the surrogate character pair.

Parameters:

- `lowChar`: The low surrogate. This must be a value between 0xDC00 and 0xDFFF.
- `highChar`: The high surrogate. This must be a value between 0xD800 and 0xDBFF.

Returns: The task that represents the asynchronous `WriteSurrogateCharEntity` operation.

Exceptions:

- `InvalidOperationException`: An `XmlWriter` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

-or-

An `XmlWriter` asynchronous method was called without setting the `XmlWriterSettings.Async` flag to `true`. In this case, `InvalidOperationException` is thrown with the message "Set XmlWriterSettings.Async to true if you want to use Async Methods."

#### Remarks
This is the asynchronous version of `XmlWriter.WriteSurrogateCharEntity`, with the same functionality. To use this method, you must set the `Async` flag to `true`.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `WriteSurrogateCharEntity`.

## XmlWriter.WriteValue(Boolean) method

```csharp
public virtual void WriteValue (bool value);
```

Writes a `Boolean` value.

Parameters:

- `value`: The `Boolean` value to write.

Exceptions:

- `ArgumentException`: An invalid value was specified.
- `InvalidOperationException`: An `XmlWriter` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

#### Remarks
This method takes the common language runtime object and converts the input value to the desired output type using the XML Schema definition language (XSD) data type conversion rules.

When the `XmlWriter.WriteValue` method is called, the `XmlWriter` converts the value to its string representations according to the XML Schema (XSD) data type rules and writes it out using the `XmlWriter.WriteString` method.

If `XmlWriter.WriteValue` is called multiple times in succession, the values are not delimited by a space. You must call `XmlWriter.WriteWhitespace` between calls to `XmlWriter.WriteValue` to insert white space. Pass an array type to the `WriteValue` overload to write out an array of distinct values.

If this method is called on an `XmlWriter` instance that outputs text-only, the typed value is serialized to text.

For asynchronous operations, convert the return value of this method to a string and use the `XmlWriter.WriteStringAsync` method.

## XmlWriter.WriteValue(DateTime) method

```csharp
public virtual void WriteValue (DateTime value);
```

Writes a `DateTime` value.

Parameters:

- `value`: The `DateTime` value to write.

Exceptions:

- `ArgumentException`: An invalid value was specified.
- `InvalidOperationException`: An `XmlWriter` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

#### Remarks
This method takes the common language runtime object and converts the input value to the desired output type using the XML Schema definition language (XSD) data type conversion rules.

When the `XmlWriter.WriteValue` method is called, the `XmlWriter` converts the value to its string representations according to the XML Schema (XSD) data type rules and writes it out using the `XmlWriter.WriteString` method.

If `XmlWriter.WriteValue` is called multiple times in succession, the values are not delimited by a space. You must call `XmlWriter.WriteWhitespace` between calls to `XmlWriter.WriteValue` to insert white space. Pass an array type to the `WriteValue` overload to write out an array of distinct values.

If this method is called on an `XmlWriter` instance that outputs text-only, the typed value is serialized to text.

For asynchronous operations, convert the return value of this method to a string and use the `XmlWriter.WriteStringAsync` method.

#### Examples
The following example writes a book node using typed data.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlWriter/Overview/writer_v2.cs._

## XmlWriter.WriteValue(DateTimeOffset) method

```csharp
public virtual void WriteValue (DateTimeOffset value);
```

Writes a `DateTimeOffset` value.

Parameters:

- `value`: The `DateTimeOffset` value to write.

Exceptions:

- `InvalidOperationException`: An `XmlWriter` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

#### Remarks
For asynchronous operations, convert the return value of this method to a string and use the `XmlWriter.WriteStringAsync` method.

## XmlWriter.WriteValue(Decimal) method

```csharp
public virtual void WriteValue (decimal value);
```

Writes a `Decimal` value.

Parameters:

- `value`: The `Decimal` value to write.

Exceptions:

- `ArgumentException`: An invalid value was specified.
- `InvalidOperationException`: An `XmlWriter` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

#### Remarks
This method takes the common language runtime object and converts the input value to the desired output type using the XML Schema definition language (XSD) data type conversion rules.

When the `XmlWriter.WriteValue` method is called, the `XmlWriter` converts the value to its string representations according to the XML Schema (XSD) data type rules and writes it out using the `XmlWriter.WriteString` method.

If `XmlWriter.WriteValue` is called multiple times in succession, the values are not delimited by a space. You must call `XmlWriter.WriteWhitespace` between calls to `XmlWriter.WriteValue` to insert white space. Pass an array type to the `WriteValue` overload to write out an array of distinct values.

If this method is called on an `XmlWriter` instance that outputs text-only, the typed value is serialized to text.

For asynchronous operations, convert the return value of this method to a string and use the `XmlWriter.WriteStringAsync` method.

## XmlWriter.WriteValue(Double) method

```csharp
public virtual void WriteValue (double value);
```

Writes a `Double` value.

Parameters:

- `value`: The `Double` value to write.

Exceptions:

- `ArgumentException`: An invalid value was specified.
- `InvalidOperationException`: An `XmlWriter` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

#### Remarks
This method takes the common language runtime object and converts the input value to the desired output type using the XML Schema definition language (XSD) data type conversion rules.

When the `XmlWriter.WriteValue` method is called, the `XmlWriter` converts the value to its string representations according to the XML Schema (XSD) data type rules and writes it out using the `XmlWriter.WriteString` method.

If `XmlWriter.WriteValue` is called multiple times in succession, the values are not delimited by a space. You must call `XmlWriter.WriteWhitespace` between calls to `XmlWriter.WriteValue` to insert white space. Pass an array type to the `WriteValue` overload to write out an array of distinct values.

If this method is called on an `XmlWriter` instance that outputs text-only, the typed value is serialized to text.

For asynchronous operations, convert the return value of this method to a string and use the `XmlWriter.WriteStringAsync` method.

#### Examples
The following example writes a book node using typed data.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlWriter/Overview/writer_v2.cs._

## XmlWriter.WriteValue(Int32) method

```csharp
public virtual void WriteValue (int value);
```

Writes a `Int32` value.

Parameters:

- `value`: The `Int32` value to write.

Exceptions:

- `ArgumentException`: An invalid value was specified.
- `InvalidOperationException`: An `XmlWriter` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

#### Remarks
This method takes the common language runtime object and converts the input value to the desired output type using the XML Schema definition language (XSD) data type conversion rules.

When the `XmlWriter.WriteValue` method is called, the `XmlWriter` converts the value to its string representations according to the XML Schema (XSD) data type rules and writes it out using the `XmlWriter.WriteString` method.

If `XmlWriter.WriteValue` is called multiple times in succession, the values are not delimited by a space. You must call `XmlWriter.WriteWhitespace` between calls to `XmlWriter.WriteValue` to insert white space. Pass an array type to the `WriteValue` overload to write out an array of distinct values.

If this method is called on an `XmlWriter` instance that outputs text-only, the typed value is serialized to text.

For asynchronous operations, convert the return value of this method to a string and use the `XmlWriter.WriteStringAsync` method.

## XmlWriter.WriteValue(Int64) method

```csharp
public virtual void WriteValue (long value);
```

Writes a `Int64` value.

Parameters:

- `value`: The `Int64` value to write.

Exceptions:

- `ArgumentException`: An invalid value was specified.
- `InvalidOperationException`: An `XmlWriter` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

#### Remarks
This method takes the common language runtime object and converts the input value to the desired output type using the XML Schema definition language (XSD) data type conversion rules.

When the `XmlWriter.WriteValue` method is called, the `XmlWriter` converts the value to its string representations according to the XML Schema (XSD) data type rules and writes it out using the `XmlWriter.WriteString` method.

If `XmlWriter.WriteValue` is called multiple times in succession, the values are not delimited by a space. You must call `XmlWriter.WriteWhitespace` between calls to `XmlWriter.WriteValue` to insert white space. Pass an array type to the `WriteValue` overload to write out an array of distinct values.

If this method is called on an `XmlWriter` instance that outputs text-only, the typed value is serialized to text.

For asynchronous operations, convert the return value of this method to a string and use the `XmlWriter.WriteStringAsync` method.
