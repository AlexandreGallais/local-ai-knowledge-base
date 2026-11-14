---
title: "XmlWriter class (part 6 of 11)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/XmlWriter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlWriter class (part 6 of 11)

## XmlWriter.WriteEndAttributeAsync() method

```csharp
protected internal virtual System.Threading.Tasks.Task WriteEndAttributeAsync ();
```

Asynchronously closes the previous `XmlWriter.WriteStartAttribute` call.

Returns: The task that represents the asynchronous `WriteEndAttribute` operation.

Exceptions:

- `InvalidOperationException`: An `XmlWriter` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

-or-

An `XmlWriter` asynchronous method was called without setting the `XmlWriterSettings.Async` flag to `true`. In this case, `InvalidOperationException` is thrown with the message "Set XmlWriterSettings.Async to true if you want to use Async Methods."

#### Remarks
This is the asynchronous version of `XmlWriter.WriteEndAttribute`, with the same functionality. To use this method, you must set the `Async` flag to `true`.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `WriteEndAttribute`.

## XmlWriter.WriteEndDocument() method

```csharp
public abstract void WriteEndDocument ();
```

When overridden in a derived class, closes any open elements or attributes and puts the writer back in the Start state.

Exceptions:

- `ArgumentException`: The XML document is invalid.
- `InvalidOperationException`: An `XmlWriter` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

#### Remarks

> **Note:**
> When you use the `XmlWriter` methods to output XML, the elements and attributes will not be written until you call the `XmlWriter.Close` method. For example, if you are using the XmlWriter to populate an `XmlDocument`, until you close the `XmlWriter`, you will not be able to observe the written elements and attributes in the target document.

For the asynchronous version of this method, see `XmlWriter.WriteEndDocumentAsync`.

#### Examples
The following example writes an XML file representing a book.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlWriter/WriteCData/writerbook_v2.cs._

## XmlWriter.WriteEndDocumentAsync() method

```csharp
public virtual System.Threading.Tasks.Task WriteEndDocumentAsync ();
```

Asynchronously closes any open elements or attributes and puts the writer back in the Start state.

Returns: The task that represents the asynchronous `WriteEndDocument` operation.

Exceptions:

- `InvalidOperationException`: An `XmlWriter` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

-or-

An `XmlWriter` asynchronous method was called without setting the `XmlWriterSettings.Async` flag to `true`. In this case, `InvalidOperationException` is thrown with the message "Set XmlWriterSettings.Async to true if you want to use Async Methods."

#### Remarks
This is the asynchronous version of `XmlWriter.WriteEndDocument`, with the same functionality. To use this method, you must set the `Async` flag to `true`.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `WriteEndDocument`.

## XmlWriter.WriteEndElement() method

```csharp
public abstract void WriteEndElement ();
```

When overridden in a derived class, closes one element and pops the corresponding namespace scope.

Exceptions:

- `InvalidOperationException`: This results in an invalid XML document.

-or-

An `XmlWriter` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

#### Remarks
If the element contains no content, a short end tag "/>" is written; otherwise, a full end tag is written.

> **Note:**
> When you use the `XmlWriter` methods to output XML, the elements and attributes will not be written until you call the `XmlWriter.Close` method. For example, if you are using the XmlWriter to populate an `XmlDocument`, until you close the `XmlWriter`, you will not be able to observe the written elements and attributes in the target document.

For the asynchronous version of this method, see `XmlWriter.WriteEndElementAsync`.

#### Examples
The following example uses the `XmlWriter.WriteEndElement` and the `XmlWriter.WriteFullEndElement` methods.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlWriter/WriteEndElement/writerfullend_v2.cs._

## XmlWriter.WriteEndElementAsync() method

```csharp
public virtual System.Threading.Tasks.Task WriteEndElementAsync ();
```

Asynchronously closes one element and pops the corresponding namespace scope.

Returns: The task that represents the asynchronous `WriteEndElement` operation.

Exceptions:

- `InvalidOperationException`: An `XmlWriter` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

-or-

An `XmlWriter` asynchronous method was called without setting the `XmlWriterSettings.Async` flag to `true`. In this case, `InvalidOperationException` is thrown with the message "Set XmlWriterSettings.Async to true if you want to use Async Methods."

#### Remarks
This is the asynchronous version of `XmlWriter.WriteEndElement`, with the same functionality. To use this method, you must set the `Async` flag to `true`.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `WriteEndElement`.

## XmlWriter.WriteEntityRef(String) method

```csharp
public abstract void WriteEntityRef (string name);
```

When overridden in a derived class, writes out an entity reference as `&name;`.

Parameters:

- `name`: The name of the entity reference.

Exceptions:

- `ArgumentException`: `name` is either `null` or `String.Empty`.
- `InvalidOperationException`: An `XmlWriter` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

#### Remarks
For the asynchronous version of this method, see `XmlWriter.WriteEntityRefAsync`.

#### Examples
The following example writes an XML file representing a book.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlWriter/WriteCData/writerbook_v2.cs._

## XmlWriter.WriteEntityRefAsync(String) method

```csharp
public virtual System.Threading.Tasks.Task WriteEntityRefAsync (string name);
```

Asynchronously writes out an entity reference as `&name;`.

Parameters:

- `name`: The name of the entity reference.

Returns: The task that represents the asynchronous `WriteEntityRef` operation.

Exceptions:

- `InvalidOperationException`: An `XmlWriter` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

-or-

An `XmlWriter` asynchronous method was called without setting the `XmlWriterSettings.Async` flag to `true`. In this case, `InvalidOperationException` is thrown with the message "Set XmlWriterSettings.Async to true if you want to use Async Methods."

#### Remarks
This is the asynchronous version of `XmlWriter.WriteEntityRef`, with the same functionality. To use this method, you must set the `Async` flag to `true`.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `WriteEntityRef`.

## XmlWriter.WriteFullEndElement() method

```csharp
public abstract void WriteFullEndElement ();
```

When overridden in a derived class, closes one element and pops the corresponding namespace scope.

Exceptions:

- `InvalidOperationException`: An `XmlWriter` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

#### Remarks
This method always writes the full end tag. This is useful when dealing with elements that must include a full end tag. For example, browsers expect HTML script blocks to be closed with "\</script>".

For the asynchronous version of this method, see `XmlWriter.WriteFullEndElementAsync`.

#### Examples
The following example uses the `XmlWriter.WriteEndElement` and the `XmlWriter.WriteFullEndElement` methods.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlWriter/WriteEndElement/writerfullend_v2.cs._

## XmlWriter.WriteFullEndElementAsync() method

```csharp
public virtual System.Threading.Tasks.Task WriteFullEndElementAsync ();
```

Asynchronously closes one element and pops the corresponding namespace scope.

Returns: The task that represents the asynchronous `WriteFullEndElement` operation.

Exceptions:

- `InvalidOperationException`: An `XmlWriter` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

-or-

An `XmlWriter` asynchronous method was called without setting the `XmlWriterSettings.Async` flag to `true`. In this case, `InvalidOperationException` is thrown with the message "Set XmlWriterSettings.Async to true if you want to use Async Methods."

#### Remarks
This is the asynchronous version of `XmlWriter.WriteFullEndElement`, with the same functionality. To use this method, you must set the `Async` flag to `true`.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `WriteFullEndElement`.

## XmlWriter.WriteName(String) method

```csharp
public virtual void WriteName (string name);
```

When overridden in a derived class, writes out the specified name, ensuring it is a valid name according to the W3C XML 1.0 recommendation (https://www.w3.org/TR/1998/REC-xml-19980210#NT-Name).

Parameters:

- `name`: The name to write.

Exceptions:

- `ArgumentException`: `name` is not a valid XML name; or `name` is either `null` or `String.Empty`.
- `InvalidOperationException`: An `XmlWriter` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

#### Remarks
If `Namespaces` is set to `true`, `WriteName` also checks that the name is also valid according to the W3C Namespaces in XML recommendation.

For the asynchronous version of this method, see `XmlWriter.WriteNameAsync`.

## XmlWriter.WriteNameAsync(String) method

```csharp
public virtual System.Threading.Tasks.Task WriteNameAsync (string name);
```

Asynchronously writes out the specified name, ensuring it is a valid name according to the W3C XML 1.0 recommendation (https://www.w3.org/TR/1998/REC-xml-19980210#NT-Name).

Parameters:

- `name`: The name to write.

Returns: The task that represents the asynchronous `WriteName` operation.

Exceptions:

- `InvalidOperationException`: An `XmlWriter` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

-or-

An `XmlWriter` asynchronous method was called without setting the `XmlWriterSettings.Async` flag to `true`. In this case, `InvalidOperationException` is thrown with the message "Set XmlWriterSettings.Async to true if you want to use Async Methods."

#### Remarks
This is the asynchronous version of `XmlWriter.WriteName`, with the same functionality. To use this method, you must set the `Async` flag to `true`.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `WriteName`.

## XmlWriter.WriteNmToken(String) method

```csharp
public virtual void WriteNmToken (string name);
```

When overridden in a derived class, writes out the specified name, ensuring it is a valid NmToken <example-value> to the W3C XML 1.0 recommendation (https://www.w3.org/TR/1998/REC-xml-19980210#NT-Name).

Parameters:

- `name`: The name to write.

Exceptions:

- `ArgumentException`: `name` is not a valid NmToken; or `name` is either `null` or `String.Empty`.
- `InvalidOperationException`: An `XmlWriter` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

#### Remarks
For the asynchronous version of this method, see `XmlWriter.WriteNmTokenAsync`.
