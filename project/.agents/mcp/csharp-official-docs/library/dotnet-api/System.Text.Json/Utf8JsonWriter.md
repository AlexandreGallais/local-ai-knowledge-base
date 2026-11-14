---
title: "Utf8JsonWriter class (part 1 of 7)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.Json/Utf8JsonWriter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Utf8JsonWriter class

Namespace: `System.Text.Json`

```csharp
public sealed class Utf8JsonWriter : IAsyncDisposable, IDisposable
```

Provides a high-performance API for forward-only, non-cached writing of UTF-8 encoded JSON text.

#### Remarks

`Utf8JsonWriter` writes the text sequentially with no caching and by default adheres to the JSON RFC, with the exception of writing comments.

A method that attempts to write invalid JSON when validation is enabled throws an `InvalidOperationException` with a context-specific error message.

To be able to format the output with indentation and white space, to skip validation, OR to customize the escaping behavior, create an instance of `JsonWriterOptions` and pass it in to the writer.

For more information, see How to write custom serializers and deserializers with System.Text.Json.

## Utf8JsonWriter.Utf8JsonWriter(Byte>, JsonWriterOptions) constructor

```csharp
public Utf8JsonWriter (System.Buffers.IBufferWriter<byte> bufferWriter, System.Text.Json.JsonWriterOptions options = default);
```

Initializes a new instance of the `Utf8JsonWriter` class using the specified `IBufferWriter<T>` to write the output to and customization options.

Parameters:

- `bufferWriter`: The destination for writing JSON text.
- `options`: Defines the customized behavior of the `Utf8JsonWriter`. By default, it writes minimized JSON (with no extra white space) and validates that the JSON being written is structurally valid according to the JSON RFC.

Exceptions:

- `ArgumentNullException`: `bufferWriter` is `null`.

To be added.

## Utf8JsonWriter.Utf8JsonWriter(Stream, JsonWriterOptions) constructor

```csharp
public Utf8JsonWriter (System.IO.Stream utf8Json, System.Text.Json.JsonWriterOptions options = default);
```

Initializes a new instance of the `Utf8JsonWriter` class using the specified stream to write the output to and customization options.

Parameters:

- `utf8Json`: The destination for writing JSON text.
- `options`: Defines the customized behavior of the `Utf8JsonWriter`. By default, it writes minimized JSON (with no extra white space) and validates that the JSON being written is structurally valid according to the JSON RFC.

Exceptions:

- `ArgumentNullException`: `utf8Json` is `null`.

To be added.

## Utf8JsonWriter.BytesCommitted property

```csharp
public long BytesCommitted { get; }
```

Gets the total number of bytes committed to the output by the current instance so far.

Returns: The total number of bytes committed to the output by the `Utf8JsonWriter` so far.

<format>

## Remarks

In the case of an `IBufferWriter<T>`, this property indicates how much the IBufferWriter has advanced.

In the case of a `Stream`, this property indicates how much data has been written to the stream.

</format>

## Utf8JsonWriter.BytesPending property

```csharp
public int BytesPending { get; }
```

Gets the number of bytes written by the `Utf8JsonWriter` so far that have not yet been flushed to the output and committed.

Returns: The number of bytes written so far by the `Utf8JsonWriter` that have not yet been flushed to the output and committed.

To be added.

## Utf8JsonWriter.CurrentDepth property

```csharp
public int CurrentDepth { get; }
```

Gets the depth of the current token.

Returns: The depth of the current token.

#### Remarks

The `CurrentDepth` property tracks the recursive depth of the nested objects / arrays within the JSON text written so far.

## Utf8JsonWriter.Options property

```csharp
public System.Text.Json.JsonWriterOptions Options { get; }
```

Gets the custom behavior when writing JSON using this instance, which indicates whether to format the output while writing, whether to skip structural JSON validation, and which characters to escape.

Returns: The custom behavior of this instance of the writer for formatting, validating, and escaping.

To be added.

## Utf8JsonWriter.Dispose() method

```csharp
public void Dispose ();
```

Commits any leftover JSON text that has not yet been flushed and releases all resources used by the current instance.

<format>

## Remarks

In the case of IBufferWriter, this advances the underlying `IBufferWriter<T>` based on what has been written so far.

In the case of Stream, this writes the data to the stream and flushes it.

The `Utf8JsonWriter` instance cannot be reused after disposing.

</format>

## Utf8JsonWriter.DisposeAsync() method

```csharp
public System.Threading.Tasks.ValueTask DisposeAsync ();
```

Asynchronously commits any leftover JSON text that has not yet been flushed and releases all resources used by the current instance.

Returns: A task representing the asynchronous dispose operation.

<format>

## Remarks

In the case of IBufferWriter, this advances the underlying `IBufferWriter<T>` based on what has been written so far.

In the case of Stream, this writes the data to the stream and flushes it.

The `Utf8JsonWriter` instance cannot be reused after disposing.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `Dispose`.

</format>

## Utf8JsonWriter.Flush() method

```csharp
public void Flush ();
```

Commits the JSON text written so far, which makes it visible to the output destination.

Exceptions:

- `ObjectDisposedException`: This instance has been disposed.

<format>

## Remarks

In the case of IBufferWriter, this advances the underlying `IBufferWriter<T>` based on what has been written so far.

In the case of `Stream`, this writes the data to the stream and flushes it.

</format>

## Utf8JsonWriter.FlushAsync(CancellationToken) method

```csharp
public System.Threading.Tasks.Task FlushAsync (System.Threading.CancellationToken <example-value> = default);
```

Asynchronously commits the JSON text written so far, which makes it visible to the output destination.

Parameters:

- `cancellationToken`: The token to monitor for cancellation requests. The default value is `CancellationToken.None`.

Returns: A task representing the asynchronous flush operation.

Exceptions:

- `ObjectDisposedException`: This instance has been disposed.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

<format>

## Remarks

In the case of IBufferWriter, this advances the underlying `IBufferWriter<T>` based on what has been written so far.

In the case of `Stream`, this writes the data to the stream and flushes it asynchronously, while monitoring cancellation requests.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `Flush`.

</format>

## Utf8JsonWriter.Reset() method

```csharp
public void Reset ();
```

Resets the internal state of this instance so that it can be reused.

Exceptions:

- `ObjectDisposedException`: This instance has been disposed.

<format>

## Remarks

The `Utf8JsonWriter` will continue to use the original writer options and the original output (either `IBufferWriter<T>` or `Stream`) as the destination.

</format>

## Utf8JsonWriter.Reset(Byte>) method

```csharp
public void Reset (System.Buffers.IBufferWriter<byte> bufferWriter);
```

Resets the internal state of this instance so that it can be reused with a new instance of `IBufferWriter<T>`.

Parameters:

- `bufferWriter`: The destination for writing JSON text.

Exceptions:

- `ArgumentNullException`: `bufferWriter` is `null`.
- `ObjectDisposedException`: This instance has been disposed.

<format>

## Remarks

The `Utf8JsonWriter` will continue to use the original writer options but now writes to `bufferWriter` as the new destination.

</format>

## Utf8JsonWriter.Reset(Stream) method

```csharp
public void Reset (System.IO.Stream utf8Json);
```

Resets the internal state of this instance so that it can be reused with a new instance of `Stream`.

Parameters:

- `utf8Json`: The destination for writing JSON text.

Exceptions:

- `ArgumentNullException`: `utf8Json` is `null`.
- `ObjectDisposedException`: This instance has been disposed.

<format>

## Remarks

The `Utf8JsonWriter` will continue to use the original writer options but now writes to `utf8Json` as the new destination.

</format>

## Utf8JsonWriter.Reset(Byte>, JsonWriterOptions) method

```csharp
public void Reset (System.Buffers.IBufferWriter<byte> bufferWriter, System.Text.Json.JsonWriterOptions options);
```

To be added.

Parameters:

- `bufferWriter`: To be added.
- `options`: To be added.

To be added.

## Utf8JsonWriter.Reset(Stream, JsonWriterOptions) method

```csharp
public void Reset (System.IO.Stream utf8Json, System.Text.Json.JsonWriterOptions options);
```

To be added.

Parameters:

- `utf8Json`: To be added.
- `options`: To be added.

To be added.

## Utf8JsonWriter.WriteBase64String(Byte>, Byte>) method

```csharp
public void WriteBase64String (ReadOnlySpan<byte> utf8PropertyName, ReadOnlySpan<byte> bytes);
```

Writes the property name and raw bytes value (as a Base64 encoded JSON string) as part of a name/value pair of a JSON object.

Parameters:

- `utf8PropertyName`: The UTF-8 encoded name of the property to write.
- `bytes`: The binary data to write as Base64 encoded text.

Exceptions:

- `ArgumentException`: The specified property name or value is too large.
- `InvalidOperationException`: Validation is enabled, and this method would result in writing invalid JSON.

#### Remarks

The maximum allowed size of the binary data to write as Base64 is 125,000,000 bytes (or approximately 125 MB). Exceeding this limit results in an `ArgumentException` being thrown.

The property name is escaped and the bytes are encoded before writing.

## Utf8JsonWriter.WriteBase64String(Char>, Byte>) method

```csharp
public void WriteBase64String (ReadOnlySpan<char> propertyName, ReadOnlySpan<byte> bytes);
```

Writes the property name and raw bytes value (as a Base64 encoded JSON string) as part of a name/value pair of a JSON object.

Parameters:

- `propertyName`: The property name of the JSON object to be transcoded and written as UTF-8.
- `bytes`: The binary data to write as Base64 encoded text.

Exceptions:

- `ArgumentException`: The specified property name or value is too large.
- `InvalidOperationException`: Validation is enabled, and this method would result in writing invalid JSON.

#### Remarks

The maximum allowed size of the binary data to write as Base64 is 125,000,000 bytes (or approximately 125 MB). Exceeding this limit results in an `ArgumentException` being thrown.

The property name is escaped and the bytes are encoded before writing.

## Utf8JsonWriter.WriteBase64String(String, Byte>) method

```csharp
public void WriteBase64String (string propertyName, ReadOnlySpan<byte> bytes);
```

Writes the property name and raw bytes value (as a Base64 encoded JSON string) as part of a name/value pair of a JSON object.

Parameters:

- `propertyName`: The property name of the JSON object to be transcoded and written as UTF-8.
- `bytes`: The binary data to write as Base64 encoded text.

Exceptions:

- `ArgumentException`: The specified property name or value is too large.
- `InvalidOperationException`: Validation is enabled, and this method would result in writing invalid JSON.
- `ArgumentNullException`: The `propertyName` parameter is `null`.

#### Remarks

The maximum allowed size of the binary data to write as Base64 is 125,000,000 bytes (or approximately 125 MB). Exceeding this limit results in an `ArgumentException` being thrown.

The property name is escaped and the bytes are encoded before writing.

## Utf8JsonWriter.WriteBase64String(JsonEncodedText, Byte>) method

```csharp
public void WriteBase64String (System.Text.Json.JsonEncodedText propertyName, ReadOnlySpan<byte> bytes);
```

Writes the pre-encoded property name and raw bytes value (as a Base64 encoded JSON string) as part of a name/value pair of a JSON object.

Parameters:

- `propertyName`: The JSON-encoded name of the property to write.
- `bytes`: The binary data to write as Base64 encoded text.

Exceptions:

- `ArgumentException`: The specified value is too large.
- `InvalidOperationException`: Validation is enabled, and this method would result in writing invalid JSON.

#### Remarks

The maximum allowed size of the binary data to write as Base64 is 125,000,000 bytes (or approximately 125 MB). Exceeding this limit results in an `ArgumentException` being thrown.

The property name should already be escaped when the instance of `JsonEncodedText` was created.

The bytes are encoded before writing.

## Utf8JsonWriter.WriteBase64StringSegment(Byte>, Boolean) method

```csharp
public void WriteBase64StringSegment (ReadOnlySpan<byte> value, bool isFinalSegment);
```

Writes the input bytes as a partial JSON string.

Parameters:

- `value`: The bytes to be written as a JSON string element of a JSON array.
- `isFinalSegment`: Indicates that this is the final segment of the string.

Exceptions:

- `ArgumentException`: The specified value is too large.
- `InvalidOperationException`: When validation is enabled, this would result in invalid JSON being written, or if the previously written segment (if any) was not written with this same overload.

To be added.

## Utf8JsonWriter.WriteBase64StringValue(Byte>) method

```csharp
public void WriteBase64StringValue (ReadOnlySpan<byte> bytes);
```

Writes the raw bytes value as a Base64 encoded JSON string.

Parameters:

- `bytes`: The binary data to be written as a Base64 encoded JSON string.

Exceptions:

- `ArgumentException`: The specified value is too large.
- `InvalidOperationException`: Validation is enabled, and this method would result in writing invalid JSON.

#### Remarks

The maximum allowed size of the binary data to write as Base64 is 125,000,000 bytes (or approximately 125 MB). Exceeding this limit results in an `ArgumentException` being thrown.

The bytes are encoded before writing.
