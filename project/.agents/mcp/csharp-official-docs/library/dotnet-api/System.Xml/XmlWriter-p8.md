---
title: "XmlWriter class (part 8 of 11)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/XmlWriter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlWriter class (part 8 of 11)

## XmlWriter.WriteQualifiedName(String, String) method

```csharp
public virtual void WriteQualifiedName (string localName, string? ns);
```

When overridden in a derived class, writes out the namespace-qualified name. This method looks up the prefix that is in scope for the given namespace.

Parameters:

- `localName`: The local name to write.
- `ns`: The namespace URI for the name.

Exceptions:

- `ArgumentException`: `localName` is either `null` or `String.Empty`.

`localName` is not a valid name.
- `InvalidOperationException`: An `XmlWriter` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

#### Remarks
If `ns` maps to the current default namespace, no prefix is generated.

When writing attribute values, this method generates a prefix if `ns` is not found. When writing element content, it throws an exception if `ns` is not found.

> **Note:**
> If a class derived from the `XmlWriter` does not override this method `localName` is not checked to be a valid W3C XML name. In such case, before calling this method, the validity of the string can be checked by `XmlReader.IsName` method.

For the asynchronous version of this method, see `XmlWriter.WriteQualifiedNameAsync`.

#### Examples
The example writes the following element:

```xml
<root xmlns:x="urn:abc">
  
</root>
```

_Code sample not included: ~/snippets/csharp/System.Xml/XmlWriter/Overview/writer_v2.cs._

## XmlWriter.WriteQualifiedNameAsync(String, String) method

```csharp
public virtual System.Threading.Tasks.Task WriteQualifiedNameAsync (string localName, string? ns);
```

Asynchronously writes out the namespace-qualified name. This method looks up the prefix that is in scope for the given namespace.

Parameters:

- `localName`: The local name to write.
- `ns`: The namespace URI for the name.

Returns: The task that represents the asynchronous `WriteQualifiedName` operation.

Exceptions:

- `InvalidOperationException`: An `XmlWriter` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

-or-

An `XmlWriter` asynchronous method was called without setting the `XmlWriterSettings.Async` flag to `true`. In this case, `InvalidOperationException` is thrown with the message "Set XmlWriterSettings.Async to true if you want to use Async Methods."

#### Remarks
This is the asynchronous version of `XmlWriter.WriteQualifiedName`, with the same functionality. To use this method, you must set the `Async` flag to `true`.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `WriteQualifiedName`.

## XmlWriter.WriteRaw(String) method

```csharp
public abstract void WriteRaw (string data);
```

When overridden in a derived class, writes raw markup manually from a string.

Parameters:

- `data`: String containing the text to write.

Exceptions:

- `ArgumentException`: `data` is either `null` or `String.Empty`.
- `InvalidOperationException`: An `XmlWriter` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

#### Remarks
This method does not escape special characters.

> **Important:**
> The `XmlWriter` does not validate the data that is passed to the `XmlWriter.WriteRaw` method. You should not pass <example-value> data to this method.

For the asynchronous version of this method, see `XmlWriter.WriteRawAsync`.

#### Examples
See `XmlTextWriter.WriteRaw` for an example using this method.

## XmlWriter.WriteRaw(Char[], Int32, Int32) method

```csharp
public abstract void WriteRaw (char[] buffer, int index, int count);
```

When overridden in a derived class, writes raw markup manually from a character buffer.

Parameters:

- `buffer`: Character array containing the text to write.
- `index`: The position within the buffer indicating the start of the text to write.
- `count`: The number of characters to write.

Exceptions:

- `ArgumentNullException`: `buffer` is `null`.
- `ArgumentOutOfRangeException`: `index` or `count` is less than zero.

-or-

The buffer length minus `index` is less than `count`.
- `InvalidOperationException`: An `XmlWriter` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

#### Remarks
This method does not escape special characters.

> **Important:**
> The `XmlWriter` does not validate the data that is passed to the `XmlWriter.WriteRaw` method. You should not pass <example-value> data to this method.

For the asynchronous version of this method, see `XmlWriter.WriteRawAsync`.

## XmlWriter.WriteRawAsync(String) method

```csharp
public virtual System.Threading.Tasks.Task WriteRawAsync (string data);
```

Asynchronously writes raw markup manually from a string.

Parameters:

- `data`: String containing the text to write.

Returns: The task that represents the asynchronous `WriteRaw` operation.

Exceptions:

- `InvalidOperationException`: An `XmlWriter` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

-or-

An `XmlWriter` asynchronous method was called without setting the `XmlWriterSettings.Async` flag to `true`. In this case, `InvalidOperationException` is thrown with the message "Set XmlWriterSettings.Async to true if you want to use Async Methods."

#### Remarks
This is the asynchronous version of `XmlWriter.WriteRaw`, with the same functionality. To use this method, you must set the `Async` flag to `true`.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `WriteRaw`.

## XmlWriter.WriteRawAsync(Char[], Int32, Int32) method

```csharp
public virtual System.Threading.Tasks.Task WriteRawAsync (char[] buffer, int index, int count);
```

Asynchronously writes raw markup manually from a character buffer.

Parameters:

- `buffer`: Character array containing the text to write.
- `index`: The position within the buffer indicating the start of the text to write.
- `count`: The number of characters to write.

Returns: The task that represents the asynchronous `WriteRaw` operation.

Exceptions:

- `InvalidOperationException`: An `XmlWriter` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

-or-

An `XmlWriter` asynchronous method was called without setting the `XmlWriterSettings.Async` flag to `true`. In this case, `InvalidOperationException` is thrown with the message "Set XmlWriterSettings.Async to true if you want to use Async Methods."

#### Remarks
This is the asynchronous version of `XmlWriter.WriteRaw`, with the same functionality. To use this method, you must set the `Async` flag to `true`.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `WriteRaw`.

## XmlWriter.WriteStartAttribute(String) method

```csharp
public void WriteStartAttribute (string localName);
```

Writes the start of an attribute with the specified local name.

Parameters:

- `localName`: The local name of the attribute.

Exceptions:

- `InvalidOperationException`: The writer is closed.

-or-

An `XmlWriter` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."
- `EncoderFallbackException`: There is a character in the buffer that is a valid XML character but is not valid for the output encoding. For example, if the output encoding is ASCII, you should only use characters from the range of 0 to 127 for element and attribute names. The invalid character might be in the argument of this method or in an argument of previous methods that were writing to the buffer. Such characters are escaped by character entity references when possible (for example, in text nodes or attribute values). However, the character entity reference is not allowed in element and attribute names, comments, processing instructions, or CDATA sections.

#### Remarks
This method enables you to write a value using multiple Write methods.

For the asynchronous version of this method, see `XmlWriter.WriteStartAttributeAsync`.

## XmlWriter.WriteStartAttribute(String, String) method

```csharp
public void WriteStartAttribute (string localName, string? ns);
```

Writes the start of an attribute with the specified local name and namespace URI.

Parameters:

- `localName`: The local name of the attribute.
- `ns`: The namespace URI of the attribute.

Exceptions:

- `EncoderFallbackException`: There is a character in the buffer that is a valid XML character but is not valid for the output encoding. For example, if the output encoding is ASCII, you should only use characters from the range of 0 to 127 for element and attribute names. The invalid character might be in the argument of this method or in an argument of previous methods that were writing to the buffer. Such characters are escaped by character entity references when possible (for example, in text nodes or attribute values). However, the character entity reference is not allowed in element and attribute names, comments, processing instructions, or CDATA sections.
- `InvalidOperationException`: An `XmlWriter` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

#### Remarks
This is a more advanced version of `XmlWriter.WriteAttributeString` that allows you to write an attribute value using multiple write methods, such as `XmlWriter.WriteString`, `XmlWriter.WriteQualifiedName`, and so on.

For the asynchronous version of this method, see `XmlWriter.WriteStartAttributeAsync`.

#### Examples
See `XmlTextWriter.WriteStartAttribute` for an example using this method.

## XmlWriter.WriteStartAttribute(String, String, String) method

```csharp
public abstract void WriteStartAttribute (string? prefix, string localName, string? ns);
```

When overridden in a derived class, writes the start of an attribute with the specified prefix, local name, and namespace URI.

Parameters:

- `prefix`: The namespace prefix of the attribute.
- `localName`: The local name of the attribute.
- `ns`: The namespace URI for the attribute.

Exceptions:

- `EncoderFallbackException`: There is a character in the buffer that is a valid XML character but is not valid for the output encoding. For example, if the output encoding is ASCII, you should only use characters from the range of 0 to 127 for element and attribute names. The invalid character might be in the argument of this method or in an argument of previous methods that were writing to the buffer. Such characters are escaped by character entity references when possible (for example, in text nodes or attribute values). However, the character entity reference is not allowed in element and attribute names, comments, processing instructions, or CDATA sections.
- `InvalidOperationException`: An `XmlWriter` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

#### Remarks
This method enables you to write a value using multiple Write methods.

For the asynchronous version of this method, see `XmlWriter.WriteStartAttributeAsync`.

## XmlWriter.WriteStartAttributeAsync(String, String, String) method

```csharp
protected internal virtual System.Threading.Tasks.Task WriteStartAttributeAsync (string? prefix, string localName, string? ns);
```

Asynchronously writes the start of an attribute with the specified prefix, local name, and namespace URI.

Parameters:

- `prefix`: The namespace prefix of the attribute.
- `localName`: The local name of the attribute.
- `ns`: The namespace URI for the attribute.

Returns: The task that represents the asynchronous `WriteStartAttribute` operation.

Exceptions:

- `InvalidOperationException`: An `XmlWriter` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

-or-

An `XmlWriter` asynchronous method was called without setting the `XmlWriterSettings.Async` flag to `true`. In this case, `InvalidOperationException` is thrown with the message "Set XmlWriterSettings.Async to true if you want to use Async Methods."

#### Remarks
This is the asynchronous version of `XmlWriter.WriteStartAttribute`, with the same functionality. To use this method, you must set the `Async` flag to `true`.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `WriteStartAttribute`.
