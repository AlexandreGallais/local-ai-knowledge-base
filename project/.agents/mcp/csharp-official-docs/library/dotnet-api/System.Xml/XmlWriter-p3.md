---
title: "XmlWriter class (part 3 of 11)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/XmlWriter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlWriter class (part 3 of 11)

## XmlWriter.DisposeAsync() method

```csharp
public System.Threading.Tasks.ValueTask DisposeAsync ();
```

Performs application-defined tasks associated with freeing, releasing, or resetting unmanaged resources asynchronously.

Returns: A task that represents the asynchronous dispose operation.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `XmlWriter.Dispose`.

## XmlWriter.DisposeAsyncCore() method

```csharp
protected virtual System.Threading.Tasks.ValueTask DisposeAsyncCore ();
```

Performs application-defined tasks associated with freeing, releasing, or resetting managed resources asynchronously.

Returns: A task that represents the asynchronous dispose operation.

To be added.

## XmlWriter.Flush() method

```csharp
public abstract void Flush ();
```

When overridden in a derived class, flushes whatever is in the buffer to the underlying streams and also flushes the underlying stream.

Exceptions:

- `InvalidOperationException`: An `XmlWriter` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

#### Remarks
This is called instead of `XmlWriter.Close` when you want to write more to the underlying stream without losing what is still in the buffer.

For the asynchronous version of this method, see `XmlWriter.FlushAsync`.

#### Examples
The following example writes two XML fragments.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlWriter/Flush/write2docs_v2.cs._

## XmlWriter.FlushAsync() method

```csharp
public virtual System.Threading.Tasks.Task FlushAsync ();
```

Asynchronously flushes whatever is in the buffer to the underlying streams and also flushes the underlying stream.

Returns: The task that represents the asynchronous `Flush` operation.

Exceptions:

- `InvalidOperationException`: An `XmlWriter` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

-or-

An `XmlWriter` asynchronous method was called without setting the `XmlWriterSettings.Async` flag to `true`. In this case, `InvalidOperationException` is thrown with the message "Set XmlWriterSettings.Async to true if you want to use Async Methods."

#### Remarks
This is the asynchronous version of `XmlWriter.Flush`, with the same functionality. To use this method, you must set the `Async` flag to `true`.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `Flush`.

## XmlWriter.LookupPrefix(String) method

```csharp
public abstract string? LookupPrefix (string ns);
```

When overridden in a derived class, returns the closest prefix defined in the current namespace scope for the namespace URI.

Parameters:

- `ns`: The namespace URI whose prefix you want to find.

Returns: The matching prefix or `null` if no matching namespace URI is found in the current scope.

Exceptions:

- `ArgumentException`: `ns` is either `null` or `String.Empty`.
- `InvalidOperationException`: An `XmlWriter` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

#### Examples
The following example writes out a book.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlWriter/LookupPrefix/writeelemstring_v2.cs._

## XmlWriter.WriteAttributes(XmlReader, Boolean) method

```csharp
public virtual void WriteAttributes (System.Xml.XmlReader reader, bool defattr);
```

When overridden in a derived class, writes out all the attributes found at the current position in the `XmlReader`.

Parameters:

- `reader`: The `XmlReader` from which to copy the attributes.
- `defattr`: `true` to copy the default attributes from the `XmlReader`; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `reader` is `null`.
- `XmlException`: The reader is not positioned on an `element`, `attribute` or `XmlDeclaration` node.
- `InvalidOperationException`: An `XmlWriter` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

#### Remarks
If the reader is positioned on an `element` node `WriteAttributes` copies all the contained attributes. If the reader is positioned on an `attribute` node, this method writes the current attribute, then the rest of the attributes until the element closing tag. If the reader is positioned on an `XmlDeclaration` node, this method writes all the attributes in the declaration. If the reader is positioned on any other node type this method throws an `XmlException`.

If this method is called using `XmlValidatingReader`, to ensure well-formed XML any content (which has been expanded from the entities) that could result in an invalid document is replaced when written. For example, if an attribute includes an `>` entity that has been expanded, to ensure a well-formed document the expanded > is replaced when written out with `>`.

For the asynchronous version of this method, see `XmlWriter.WriteAttributesAsync`.

#### Examples
The following example copies all the elements to the output, changes the tag names to upper case, and copies all the attributes unchanged.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlWriter/WriteAttributes/writeattrs_v2.cs._

The example uses the file, `test1.xml`, as input.

_Code sample not included: ~/snippets/xml/VS_Snippets_Data/XmlWriter.WriteAttributes/XML/test1.xml._
## XmlWriter.WriteAttributesAsync(XmlReader, Boolean) method

```csharp
public virtual System.Threading.Tasks.Task WriteAttributesAsync (System.Xml.XmlReader reader, bool defattr);
```

Asynchronously writes out all the attributes found at the current position in the `XmlReader`.

Parameters:

- `reader`: The `XmlReader` from which to copy the attributes.
- `defattr`: `true` to copy the default attributes from the `XmlReader`; otherwise, `false`.

Returns: The task that represents the asynchronous `WriteAttributes` operation.

Exceptions:

- `InvalidOperationException`: An `XmlWriter` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

-or-

An `XmlWriter` asynchronous method was called without setting the `XmlWriterSettings.Async` flag to `true`. In this case, `InvalidOperationException` is thrown with the message "Set XmlWriterSettings.Async to true if you want to use Async Methods."

#### Remarks
This is the asynchronous version of `XmlWriter.WriteAttributes`, with the same functionality. To use this method, you must set the `Async` flag to `true`.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `WriteAttributes`.

## XmlWriter.WriteAttributeString(String, String) method

```csharp
public void WriteAttributeString (string localName, string? value);
```

When overridden in a derived class, writes out the attribute with the specified local name and value.

Parameters:

- `localName`: The local name of the attribute.
- `value`: The value of the attribute.

Exceptions:

- `InvalidOperationException`: The state of writer is not `WriteState.Element` or writer is closed.

-or-

An `XmlWriter` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."
- `ArgumentException`: The `xml:space` or `xml:lang` attribute value is invalid.

#### Remarks
`WriteAttributeString` does the following:

- If the attribute value includes double or single quotes, they are replaced with `"` and `'` respectively.

- If writing an `xml:space` attribute, the writer verifies the attribute value is valid. (Valid values are `preserve` or `default`.)

- If writing an `xml:lang` attribute, the writer does not verify that the attribute value is valid according to the W3C XML 1.0 recommendation.

For the asynchronous version of this method, see `XmlWriter.WriteAttributeStringAsync`.

#### Examples
The following example writes out a book.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlWriter/LookupPrefix/writeelemstring_v2.cs._

## XmlWriter.WriteAttributeString(String, String, String) method

```csharp
public void WriteAttributeString (string localName, string? ns, string? value);
```

When overridden in a derived class, writes an attribute with the specified local name, namespace URI, and value.

Parameters:

- `localName`: The local name of the attribute.
- `ns`: The namespace URI to associate with the attribute.
- `value`: The value of the attribute.

Exceptions:

- `InvalidOperationException`: The state of writer is not `WriteState.Element` or writer is closed.

-or-

An `XmlWriter` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."
- `ArgumentException`: The `xml:space` or `xml:lang` attribute value is invalid.

#### Remarks
This method writes out the attribute with a user defined namespace prefix and associates it with the given namespace. If `localName` is "xmlns" then this method also treats this as a namespace declaration. In this case, the `ns` argument can be `null`.

`WriteAttributeString` does the following:

- If the attribute value includes double or single quotes, they are replaced with `"` and `'` respectively.

- If writing an `xml:space` attribute, the writer verifies the attribute value is valid. (Valid values are `preserve` or `default`.)

- If writing an `xml:lang` attribute, the writer does not verify that the attribute value is valid according to the W3C XML 1.0 recommendation.

For the asynchronous version of this method, see `XmlWriter.WriteAttributeStringAsync`.

#### Examples
The following example uses the `XmlWriter.WriteAttributeString` method to write a namespace declaration.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlWriter/WriteAttributeString/writeattrstring.cs._

## XmlWriter.WriteAttributeString(String, String, String, String) method

```csharp
public void WriteAttributeString (string? prefix, string localName, string? ns, string? value);
```

When overridden in a derived class, writes out the attribute with the specified prefix, local name, namespace URI, and value.

Parameters:

- `prefix`: The namespace prefix of the attribute.
- `localName`: The local name of the attribute.
- `ns`: The namespace URI of the attribute.
- `value`: The value of the attribute.

Exceptions:

- `InvalidOperationException`: The state of writer is not `WriteState.Element` or writer is closed.

-or-

An `XmlWriter` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."
- `ArgumentException`: The `xml:space` or `xml:lang` attribute value is invalid.
- `XmlException`: The `localName` or `ns` is `null`.

#### Remarks
This method writes out the attribute with a user defined namespace prefix and associates it with the given namespace. If the prefix is "xmlns" then this method also treats this as a namespace declaration and associates the declared prefix with the namespace URI provided in the given attribute value. In this case the `ns` argument can be `null`.

`WriteAttributeString` does the following:

- If the attribute value includes double or single quotes, they are replaced with `"` and `'` respectively.

- If writing an `xml:space` attribute, the writer verifies the attribute value is valid. (Valid values are `preserve` or `default`.)

- If writing an `xml:lang` attribute, the writer does not verify that the attribute value is valid according to the W3C XML 1.0 recommendation.

For the asynchronous version of this method, see `XmlWriter.WriteAttributeStringAsync`.

#### Examples
The following example uses the `XmlWriter.WriteAttributeString` method to write a namespace declaration.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlWriter/WriteAttributeString/writeattrstring.cs._

## XmlWriter.WriteAttributeStringAsync(String, String, String, String) method

```csharp
public System.Threading.Tasks.Task WriteAttributeStringAsync (string? prefix, string localName, string? ns, string? value);
```

Asynchronously writes out the attribute with the specified prefix, local name, namespace URI, and value.

Parameters:

- `prefix`: The namespace prefix of the attribute.
- `localName`: The local name of the attribute.
- `ns`: The namespace URI of the attribute.
- `value`: The value of the attribute.

Returns: The task that represents the asynchronous `WriteAttributeString` operation.

Exceptions:

- `InvalidOperationException`: An `XmlWriter` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

-or-

An `XmlWriter` asynchronous method was called without setting the `XmlWriterSettings.Async` flag to `true`. In this case, `InvalidOperationException` is thrown with the message "Set XmlWriterSettings.Async to true if you want to use Async Methods."

#### Remarks
This is the asynchronous version of `XmlWriter.WriteAttributeString`, with the same functionality. To use this method, you must set the `Async` flag to `true`.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `WriteAttributeString`.
