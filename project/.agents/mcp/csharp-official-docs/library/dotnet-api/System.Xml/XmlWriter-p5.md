---
title: "XmlWriter class (part 5 of 11)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/XmlWriter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlWriter class (part 5 of 11)

## XmlWriter.WriteComment(String) method

```csharp
public abstract void WriteComment (string? text);
```

When overridden in a derived class, writes out a comment  containing the specified text.

Parameters:

- `text`: Text to place inside the comment.

Exceptions:

- `ArgumentException`: The text would result in a non-well-formed XML document.
- `InvalidOperationException`: An `XmlWriter` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

#### Remarks
If `text` is either `null` or `String.Empty`, this method writes a comment with no data content, for example \.

If `text` contains an invalid sequence of two dashes "--" the `XmlWriter` can either throw an `ArgumentException` (`XmlTextWriter` objects) or insert a space between the dashes "- -" so that the text is a valid XML comment (`XmlWriter` objects created by the `XmlWriter.Create` method).

For the asynchronous version of this method, see `XmlWriter.WriteCommentAsync`.

#### Examples
The following example writes an XML file representing a book.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlWriter/WriteCData/writerbook_v2.cs._

## XmlWriter.WriteCommentAsync(String) method

```csharp
public virtual System.Threading.Tasks.Task WriteCommentAsync (string? text);
```

Asynchronously writes out a comment  containing the specified text.

Parameters:

- `text`: Text to place inside the comment.

Returns: The task that represents the asynchronous `WriteComment` operation.

Exceptions:

- `InvalidOperationException`: An `XmlWriter` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

-or-

An `XmlWriter` asynchronous method was called without setting the `XmlWriterSettings.Async` flag to `true`. In this case, `InvalidOperationException` is thrown with the message "Set XmlWriterSettings.Async to true if you want to use Async Methods."

#### Remarks
This is the asynchronous version of `XmlWriter.WriteComment`, with the same functionality. To use this method, you must set the `Async` flag to `true`.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `WriteComment`.

## XmlWriter.WriteDocType(String, String, String, String) method

```csharp
public abstract void WriteDocType (string name, string? pubid, string? sysid, string? subset);
```

When overridden in a derived class, writes the DOCTYPE declaration with the specified name and optional attributes.

Parameters:

- `name`: The name of the DOCTYPE. This must be non-empty.
- `pubid`: If non-null it also writes PUBLIC "pubid" "sysid" where `pubid` and `sysid` are replaced with the value of the given arguments.
- `sysid`: If `pubid` is `null` and `sysid` is non-null it writes SYSTEM "sysid" where `sysid` is replaced with the value of this argument.
- `subset`: If non-null it writes [subset] where subset is replaced with the value of this argument.

Exceptions:

- `InvalidOperationException`: This method was called outside the prolog (after the root element).

-or-

An `XmlWriter` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."
- `ArgumentException`: The value for `name` would result in invalid XML.

#### Remarks
This method does not check for invalid characters in `pubid`, `sysid` or `subset`. It also does not check that the internal subset is well-formed.

> **Important:**
> The `XmlWriter` does not validate the data that is passed to the `XmlWriter.WriteDocType` method. You should not pass <example-value> data to this method.

For the asynchronous version of this method, see `XmlWriter.WriteDocTypeAsync`.

#### Examples
The following example writes an XML file representing a book.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlWriter/WriteCData/writerbook_v2.cs._

## XmlWriter.WriteDocTypeAsync(String, String, String, String) method

```csharp
public virtual System.Threading.Tasks.Task WriteDocTypeAsync (string name, string? pubid, string? sysid, string? subset);
```

Asynchronously writes the DOCTYPE declaration with the specified name and optional attributes.

Parameters:

- `name`: The name of the DOCTYPE. This must be non-empty.
- `pubid`: If non-null it also writes PUBLIC "pubid" "sysid" where `pubid` and `sysid` are replaced with the value of the given arguments.
- `sysid`: If `pubid` is `null` and `sysid` is non-null it writes SYSTEM "sysid" where `sysid` is replaced with the value of this argument.
- `subset`: If non-null it writes [subset] where subset is replaced with the value of this argument.

Returns: The task that represents the asynchronous `WriteDocType` operation.

Exceptions:

- `InvalidOperationException`: An `XmlWriter` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

-or-

An `XmlWriter` asynchronous method was called without setting the `XmlWriterSettings.Async` flag to `true`. In this case, `InvalidOperationException` is thrown with the message "Set XmlWriterSettings.Async to true if you want to use Async Methods."

#### Remarks
This is the asynchronous version of `XmlWriter.WriteDocType`, with the same functionality. To use this method, you must set the `Async` flag to `true`.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `WriteDocType`.

## XmlWriter.WriteElementString(String, String) method

```csharp
public void WriteElementString (string localName, string? value);
```

Writes an element with the specified local name and value.

Parameters:

- `localName`: The local name of the element.
- `value`: The value of the element.

Exceptions:

- `ArgumentException`: The `localName` value is `null` or an empty string.

-or-

The parameter values are not valid.
- `EncoderFallbackException`: There is a character in the buffer that is a valid XML character but is not valid for the output encoding. For example, if the output encoding is ASCII, you should only use characters from the range of 0 to 127 for element and attribute names. The invalid character might be in the argument of this method or in an argument of previous methods that were writing to the buffer. Such characters are escaped by character entity references when possible (for example, in text nodes or attribute values). However, the character entity reference is not allowed in element and attribute names, comments, processing instructions, or CDATA sections.
- `InvalidOperationException`: An `XmlWriter` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

#### Remarks
For the asynchronous version of this method, see `XmlWriter.WriteElementStringAsync`.

#### Examples
The following example uses several write methods to create an XML fragment.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlWriter/LookupPrefix/writeelemstring_v2.cs._

## XmlWriter.WriteElementString(String, String, String) method

```csharp
public void WriteElementString (string localName, string? ns, string? value);
```

Writes an element with the specified local name, namespace URI, and value.

Parameters:

- `localName`: The local name of the element.
- `ns`: The namespace URI to associate with the element.
- `value`: The value of the element.

Exceptions:

- `ArgumentException`: The `localName` value is `null` or an empty string.

-or-

The parameter values are not valid.
- `EncoderFallbackException`: There is a character in the buffer that is a valid XML character but is not valid for the output encoding. For example, if the output encoding is ASCII, you should only use characters from the range of 0 to 127 for element and attribute names. The invalid character might be in the argument of this method or in an argument of previous methods that were writing to the buffer. Such characters are escaped by character entity references when possible (for example, in text nodes or attribute values). However, the character entity reference is not allowed in element and attribute names, comments, processing instructions, or CDATA sections.
- `InvalidOperationException`: An `XmlWriter` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

#### Remarks
For the asynchronous version of this method, see `XmlWriter.WriteElementStringAsync`.

#### Examples
The following example uses several write methods to create an XML fragment.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlWriter/LookupPrefix/writeelemstring_v2.cs._

## XmlWriter.WriteElementString(String, String, String, String) method

```csharp
public void WriteElementString (string? prefix, string localName, string? ns, string? value);
```

Writes an element with the specified prefix, local name, namespace URI, and value.

Parameters:

- `prefix`: The prefix of the element.
- `localName`: The local name of the element.
- `ns`: The namespace URI of the element.
- `value`: The value of the element.

Exceptions:

- `ArgumentException`: The `localName` value is `null` or an empty string.

-or-

The parameter values are not valid.
- `EncoderFallbackException`: There is a character in the buffer that is a valid XML character but is not valid for the output encoding. For example, if the output encoding is ASCII, you should only use characters from the range of 0 to 127 for element and attribute names. The invalid character might be in the argument of this method or in an argument of previous methods that were writing to the buffer. Such characters are escaped by character entity references when possible (for example, in text nodes or attribute values). However, the character entity reference is not allowed in element and attribute names, comments, processing instructions, or CDATA sections.
- `InvalidOperationException`: An `XmlWriter` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

#### Remarks
For the asynchronous version of this method, see `XmlWriter.WriteElementStringAsync`.

## XmlWriter.WriteElementStringAsync(String, String, String, String) method

```csharp
public System.Threading.Tasks.Task WriteElementStringAsync (string? prefix, string localName, string? ns, string value);
```

Asynchronously writes an element with the specified prefix, local name, namespace URI, and value.

Parameters:

- `prefix`: The prefix of the element.
- `localName`: The local name of the element.
- `ns`: The namespace URI of the element.
- `value`: The value of the element.

Returns: The task that represents the asynchronous `WriteElementString` operation.

Exceptions:

- `InvalidOperationException`: An `XmlWriter` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

-or-

An `XmlWriter` asynchronous method was called without setting the `XmlWriterSettings.Async` flag to `true`. In this case, `InvalidOperationException` is thrown with the message "Set XmlWriterSettings.Async to true if you want to use Async Methods."

#### Remarks
This is the asynchronous version of `XmlWriter.WriteElementString`, with the same functionality. To use this method, you must set the `Async` flag to `true`.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `WriteElementString`.

## XmlWriter.WriteEndAttribute() method

```csharp
public abstract void WriteEndAttribute ();
```

When overridden in a derived class, closes the previous `XmlWriter.WriteStartAttribute` call.

Exceptions:

- `InvalidOperationException`: An `XmlWriter` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

#### Remarks
If you call `WriteStartAttribute`, you can close the attribute with this method.

You can also close the attribute by calling `WriteStartAttribute` again, calling `XmlWriter.WriteAttributeString`, or calling `XmlWriter.WriteEndElement`.

> **Note:**
> When you use the `XmlWriter` methods to output XML, the elements and attributes will not be written until you call the `XmlWriter.Close` method. For example, if you are using the XmlWriter to populate an `XmlDocument`, until you close the `XmlWriter`, you will not be able to observe the written elements and attributes in the target document.

For the asynchronous version of this method, see `XmlWriter.WriteEndAttributeAsync`.
