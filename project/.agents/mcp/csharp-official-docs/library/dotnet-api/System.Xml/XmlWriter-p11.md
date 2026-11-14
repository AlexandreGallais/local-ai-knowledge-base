---
title: "XmlWriter class (part 11 of 11)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/XmlWriter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlWriter class (part 11 of 11)

## XmlWriter.WriteValue(Object) method

```csharp
public virtual void WriteValue (object value);
```

Writes the object value.

Parameters:

- `value`: The object value to write. This method accepts `DateTimeOffset` values.

Exceptions:

- `ArgumentException`: An invalid value was specified.
- `ArgumentNullException`: The `value` is `null`.
- `InvalidOperationException`: The writer is closed or in error state.

-or-

An `XmlWriter` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

#### Remarks
This method takes the common language runtime (CLR) object and converts the input value to the desired output type using the XML Schema definition language (XSD) data type conversion rules.

If the CLR object is a list type such as `IEnumerable`, `IList`, or `ICollection`, it is treated as an array of the value type. The `XmlWriter` converts the value to its string representations according to the XML Schema (XSD) data type rules and writes it out using the `XmlWriter.WriteString` method.

If this method is called on an `XmlWriter` instance that outputs text-only, the typed value is serialized to text.

For asynchronous operations, convert the return value of this method to a string and use the `XmlWriter.WriteStringAsync` method.

## XmlWriter.WriteValue(Single) method

```csharp
public virtual void WriteValue (float value);
```

Writes a single-precision floating-point number.

Parameters:

- `value`: The single-precision floating-point number to write.

Exceptions:

- `ArgumentException`: An invalid value was specified.
- `InvalidOperationException`: An `XmlWriter` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

#### Remarks
This method takes the common language runtime object and converts the input value to the desired output type using the XML Schema definition language (XSD) data type conversion rules.

When the `XmlWriter.WriteValue` method is called, the `XmlWriter` converts the value to its string representations according to the XML Schema (XSD) data type rules and writes it out using the `XmlWriter.WriteString` method.

If `XmlWriter.WriteValue` is called multiple times in succession, the values are not delimited by a space. You must call `XmlWriter.WriteWhitespace` between calls to `XmlWriter.WriteValue` to insert white space. Pass an array type to the `WriteValue` overload to write out an array of distinct values.

If this method is called on an `XmlWriter` instance that outputs text-only, the typed value is serialized to text.

For asynchronous operations, convert the return value of this method to a string and use the `XmlWriter.WriteStringAsync` method.

## XmlWriter.WriteValue(String) method

```csharp
public virtual void WriteValue (string? value);
```

Writes a `String` value.

Parameters:

- `value`: The `String` value to write.

Exceptions:

- `ArgumentException`: An invalid value was specified.
- `InvalidOperationException`: An `XmlWriter` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

#### Remarks
This method takes the common language runtime object and converts the input value to the desired output type using the XML Schema definition language (XSD) data type conversion rules.

If `XmlWriter.WriteValue` is called multiple times in succession, the values are not delimited by a space. You must call `XmlWriter.WriteWhitespace` between calls to `XmlWriter.WriteValue` to insert white space. Pass an array type to the `WriteValue` overload to write out an array of distinct values.

If this method is called on an `XmlWriter` instance that outputs text-only, the typed value is serialized to text.

For asynchronous operations, use the `XmlWriter.WriteStringAsync` method.

## XmlWriter.WriteWhitespace(String) method

```csharp
public abstract void WriteWhitespace (string? ws);
```

When overridden in a derived class, writes out the given white space.

Parameters:

- `ws`: The string of white space characters.

Exceptions:

- `ArgumentException`: The string contains non-white space characters.
- `InvalidOperationException`: An `XmlWriter` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

#### Remarks
This method is used to manually format your document.

For the asynchronous version of this method, see `XmlWriter.WriteWhitespaceAsync`.

## XmlWriter.WriteWhitespaceAsync(String) method

```csharp
public virtual System.Threading.Tasks.Task WriteWhitespaceAsync (string? ws);
```

Asynchronously writes out the given white space.

Parameters:

- `ws`: The string of white space characters.

Returns: The task that represents the asynchronous `WriteWhitespace` operation.

Exceptions:

- `InvalidOperationException`: An `XmlWriter` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

-or-

An `XmlWriter` asynchronous method was called without setting the `XmlWriterSettings.Async` flag to `true`. In this case, `InvalidOperationException` is thrown with the message "Set XmlWriterSettings.Async to true if you want to use Async Methods."

#### Remarks
This is the asynchronous version of `XmlWriter.WriteWhitespace`, with the same functionality. To use this method, you must set the `Async` flag to `true`.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `WriteWhitespace`.
