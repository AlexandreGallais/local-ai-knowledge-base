---
title: "HttpContent class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Http/HttpContent.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HttpContent class (part 2 of 2)

## HttpContent.ReadAsByteArrayAsync(CancellationToken) method

```csharp
public System.Threading.Tasks.Task<byte[]> ReadAsByteArrayAsync (System.Threading.CancellationToken <example-value>);
```

Serializes the HTTP content to a byte array as an asynchronous operation.

Parameters:

- `cancellationToken`: The cancellation token to cancel the operation.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks
This operation will not block. The returned `Task<T>` object will complete after all of the content has been written as a byte array.

Once the operation completes, the `Result` property on the returned task object contains the byte array with the HTTP content.

Note that this method will internally buffer the content via `LoadIntoBufferAsync`.

## HttpContent.ReadAsStream() method

```csharp
public System.IO.Stream ReadAsStream ();
```

Serializes the HTTP content and returns a stream that represents the content.

Returns: The stream that represents the HTTP content.

To be added.

## HttpContent.ReadAsStream(CancellationToken) method

```csharp
public System.IO.Stream ReadAsStream (System.Threading.CancellationToken <example-value>);
```

Serializes the HTTP content and returns a stream that represents the content.

Parameters:

- `cancellationToken`: The cancellation token to cancel the operation.

Returns: The stream that represents the HTTP content.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.

## HttpContent.ReadAsStreamAsync() method

```csharp
public System.Threading.Tasks.Task<System.IO.Stream> ReadAsStreamAsync ();
```

Serializes the HTTP content and return a stream that represents the content as an asynchronous operation.

Returns: The task object representing the asynchronous operation.

#### Remarks
This operation will not block. The returned `Task<T>` object will complete after all of the stream that represents content has been read.

Once the operation completes, the `Result` property on the returned task object contains the stream that represents the HTTP content. The returned stream can then be used to read the content using various stream APIs.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `ReadAsStream`.

## HttpContent.ReadAsStreamAsync(CancellationToken) method

```csharp
public System.Threading.Tasks.Task<System.IO.Stream> ReadAsStreamAsync (System.Threading.CancellationToken <example-value>);
```

Serializes the HTTP content and return a stream that represents the content as an asynchronous operation.

Parameters:

- `cancellationToken`: The cancellation token to cancel the operation.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks
This operation will not block. The returned `Task<T>` object will complete after all of the stream that represents content has been read (unless `CreateContentReadStream` has been implemented to do otherwise).
For example, when using `HttpClient`, a method such as `HttpClient.SendAsync` returns a class derived from `HttpContent` that conditionally buffers based on what's passed for the `completionOption` parameter.

Once the operation completes, the `Result` property on the returned task object contains the stream that represents the HTTP content. The returned stream can then be used to read the content using various stream APIs.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `ReadAsStream`.

## HttpContent.ReadAsStringAsync() method

```csharp
public System.Threading.Tasks.Task<string> ReadAsStringAsync ();
```

Serializes the HTTP content to a string as an asynchronous operation.

Returns: The task object representing the asynchronous operation.

#### Remarks
This operation will not block. The returned `Task<T>` object will complete after all of the content has been written as a string.

Once the operation completes, the `Result` property on the returned task object contains the string with the HTTP content.

Note that this method will internally buffer the content via `LoadIntoBufferAsync`.

## HttpContent.ReadAsStringAsync(CancellationToken) method

```csharp
public System.Threading.Tasks.Task<string> ReadAsStringAsync (System.Threading.CancellationToken <example-value>);
```

Serializes the HTTP content to a string as an asynchronous operation.

Parameters:

- `cancellationToken`: The cancellation token to cancel the operation.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks
This operation will not block. The returned `Task<T>` object will complete after all of the content has been written as a string.

Once the operation completes, the `Result` property on the returned task object contains the string with the HTTP content.

Note that this method will internally buffer the content via `LoadIntoBufferAsync`.

## HttpContent.SerializeToStream(Stream, TransportContext, CancellationToken) method

```csharp
protected virtual void SerializeToStream (System.IO.Stream stream, System.Net.TransportContext? context, System.Threading.CancellationToken <example-value>);
```

When overridden in a derived class, serializes the HTTP content to a stream. Otherwise, throws a `NotSupportedException`.

Parameters:

- `stream`: The target stream.
- `context`: Information about the transport (for example, the channel binding token). This parameter may be `null`.
- `cancellationToken`: The cancellation token to cancel the operation.

Exceptions:

- `NotSupportedException`: The method is not overridden in the derived class.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.

## HttpContent.SerializeToStreamAsync(Stream, TransportContext) method

```csharp
protected abstract System.Threading.Tasks.Task SerializeToStreamAsync (System.IO.Stream stream, System.Net.TransportContext? context);
```

Serializes the HTTP content to a stream as an asynchronous operation.

Parameters:

- `stream`: The target stream.
- `context`: Information about the transport (channel binding token, for example). This parameter may be `null`.

Returns: The task object representing the asynchronous operation.

#### Remarks
This operation will not block. The returned `Task<T>` object will complete after all of the content has been serialized to the stream object passed in the `stream` parameter.

## HttpContent.SerializeToStreamAsync(Stream, TransportContext, CancellationToken) method

```csharp
protected virtual System.Threading.Tasks.Task SerializeToStreamAsync (System.IO.Stream stream, System.Net.TransportContext? context, System.Threading.CancellationToken <example-value>);
```

Serializes the HTTP content to a stream as an asynchronous operation.

Parameters:

- `stream`: The target stream.
- `context`: Information about the transport (channel binding token, for example). This parameter may be `null`.
- `cancellationToken`: The cancellation token to cancel the operation.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks
This operation will not block. The returned `Task<T>` object will complete after all of the content has been serialized to the stream object passed in the `stream` parameter.

## HttpContent.TryComputeLength(Int64) method

```csharp
protected internal abstract bool TryComputeLength (out long length);
```

Determines whether the HTTP content has a valid length in bytes.

Parameters:

- `length`: The length in bytes of the HTTP content.

Returns: `true` if `length` is a valid length; otherwise, `false`.

#### Remarks
The `HttpContent.TryComputeLength` method gives a HTTP content the ability to calculate the content length. This is useful for content types which are able to easily calculate the content length. If computing the content length is not possible or expensive (would require the system to buffer the whole content where the serialization would be expensive or require the system to allocate a lot of memory), this method can return `false`. If this method returns `false`, this implies that either chunked transfer is needed or the content must get buffered before being sent to the server.
