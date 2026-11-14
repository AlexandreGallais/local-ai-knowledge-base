---
title: "HttpContent class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Http/HttpContent.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HttpContent class

Namespace: `System.Net.Http`

```csharp
public abstract class HttpContent : IDisposable
```

A base class representing an HTTP entity body and content headers.

#### Remarks
There are various HTTP contents that can be used. These include the following.

1.  `ByteArrayContent` - A content represented by a byte array, also serves as a base class for `StringContent` and `FormUrlEncodedContent`.

2.  `StringContent` - A string-based content, by default serialized as `text/plain` `Content-Type` with `UTF-8` encoding.

3.  `FormUrlEncodedContent` - A content with name/value tuples serialized as `application/x-www-form-urlencoded` `Content-Type`.

4.  `MultipartContent` - A content that can serialize multiple different `HttpContent` objects as `multipart/*` `Content-Type`.

5.  `JsonContent` - A content that serializes objects as `application/json` `Content-Type` with `UTF-8` encoding by default.

HTTP content class can be derived by a user to provide custom content serialization logic.

#### Examples

The following example shows a custom implementation of `HttpContent`. Some methods, despite being defined as `virtual` and not `abstract`, should still be overridden in the implementation for optimal behavior.

_Code sample not included: ~/snippets/csharp/System.Net.Http/HttpContent/source.cs._
## HttpContent.HttpContent() constructor

```csharp
protected HttpContent ();
```

Initializes a new instance of the `HttpContent` class.

To be added.

## HttpContent.Headers property

```csharp
public System.Net.Http.Headers.HttpContentHeaders Headers { get; }
```

Gets the HTTP content headers as defined in RFC 2616.

Returns: The content headers as defined in RFC 2616.

To be added.

## HttpContent.CopyTo(Stream, TransportContext, CancellationToken) method

```csharp
public void CopyTo (System.IO.Stream stream, System.Net.TransportContext? context, System.Threading.CancellationToken <example-value>);
```

Serializes the HTTP content into a stream of bytes and copies it to `stream`.

Parameters:

- `stream`: The target stream.
- `context`: Information about the transport (for example, the channel binding token). This parameter may be `null`.
- `cancellationToken`: The cancellation token to cancel the operation.

Exceptions:

- `ArgumentNullException`: The `stream` was `null`.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks

This method uses `SerializeToStream` internally to serialize the content into the given stream.
If the content has been previously buffered, for example, by calling `LoadIntoBufferAsync`, the method will return the buffered content and not call the serialization method.

## HttpContent.CopyToAsync(Stream) method

```csharp
public System.Threading.Tasks.Task CopyToAsync (System.IO.Stream stream);
```

Serializes the HTTP content into a stream of bytes and copies it to the stream object provided as the `stream` parameter.

Parameters:

- `stream`: The target stream.

Returns: The task object representing the asynchronous operation.

#### Remarks
This operation will not block. The returned `Task` object will complete after all of the content has been written to the stream object passed as the `stream` parameter.

## HttpContent.CopyToAsync(Stream, TransportContext) method

```csharp
public System.Threading.Tasks.Task CopyToAsync (System.IO.Stream stream, System.Net.TransportContext? context);
```

Serializes the HTTP content into a stream of bytes and copies it to the stream object provided as the `stream` parameter.

Parameters:

- `stream`: The target stream.
- `context`: Information about the transport (channel binding token, for example). This parameter may be `null`.

Returns: The task object representing the asynchronous operation.

#### Remarks
This operation will not block. The returned `Task` object will complete after all of the content has been written to the stream object passed as the `stream` parameter.

## HttpContent.CopyToAsync(Stream, CancellationToken) method

```csharp
public System.Threading.Tasks.Task CopyToAsync (System.IO.Stream stream, System.Threading.CancellationToken <example-value>);
```

Serializes the HTTP content into a stream of bytes and copies it to the stream object provided as the `stream` parameter.

Parameters:

- `stream`: The target stream.
- `cancellationToken`: The cancellation token to cancel the operation.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks
This operation will not block. The returned `Task` object will complete after all of the content has been written to the stream object passed as the `stream` parameter.

## HttpContent.CopyToAsync(Stream, TransportContext, CancellationToken) method

```csharp
public System.Threading.Tasks.Task CopyToAsync (System.IO.Stream stream, System.Net.TransportContext? context, System.Threading.CancellationToken <example-value>);
```

Serializes the HTTP content into a stream of bytes and copies it to the stream object provided as the `stream` parameter.

Parameters:

- `stream`: The target stream.
- `context`: Information about the transport (channel binding token, for example). This parameter may be `null`.
- `cancellationToken`: The cancellation token to cancel the operation.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks
This operation will not block. The returned `Task` object will complete after all of the content has been written to the stream object passed as the `stream` parameter.

## HttpContent.CreateContentReadStream(CancellationToken) method

```csharp
protected virtual System.IO.Stream CreateContentReadStream (System.Threading.CancellationToken <example-value>);
```

Serializes the HTTP content to a memory stream.

Parameters:

- `cancellationToken`: The cancellation token to cancel the operation.

Returns: The output memory stream which contains the serialized HTTP content.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks

Once the operation completes, the returned memory stream represents the HTTP content. The returned stream can then be used to read the content using various stream APIs.
The `CreateContentReadStream` method buffers the content to a memory stream.
Derived classes can override this behavior if there is a better way to retrieve the content as stream.
For example, a byte array or a string could use a more efficient method way such as wrapping a read-only MemoryStream around the bytes or string.

## HttpContent.CreateContentReadStreamAsync() method

```csharp
protected virtual System.Threading.Tasks.Task<System.IO.Stream> CreateContentReadStreamAsync ();
```

Serializes the HTTP content to a memory stream as an asynchronous operation.

Returns: The task object representing the asynchronous operation.

#### Remarks
This operation will not block. The returned `Task<T>` object will complete after all of the content has been written to the memory stream.

Once the operation completes, the `Result` property on the returned task object contains the memory stream that represents the HTTP content. The returned stream can then be used to read the content using various stream APIs.

The `HttpContent.CreateContentReadStreamAsync` method buffers the content to a memory stream. Derived classes can override this behavior if there is a better way to retrieve the content as stream. For example, a byte array or a string could use a more efficient method way such as wrapping a read-only `MemoryStream` around the bytes or string.

## HttpContent.CreateContentReadStreamAsync(CancellationToken) method

```csharp
protected virtual System.Threading.Tasks.Task<System.IO.Stream> CreateContentReadStreamAsync (System.Threading.CancellationToken <example-value>);
```

Serializes the HTTP content to a memory stream as an asynchronous operation.

Parameters:

- `cancellationToken`: The cancellation token to cancel the operation.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks
This operation will not block. The returned `Task<T>` object will complete after all of the content has been written to the memory stream.

Once the operation completes, the `Result` property on the returned task object contains the memory stream that represents the HTTP content. The returned stream can then be used to read the content using various stream APIs.

The `HttpContent.CreateContentReadStreamAsync` method buffers the content to a memory stream. Derived classes can override this behavior if there is a better way to retrieve the content as stream. For example, a byte array or a string could use a more efficient method way such as wrapping a read-only `MemoryStream` around the bytes or string.)

## HttpContent.Dispose() method

```csharp
public void Dispose ();
```

Releases the unmanaged resources and disposes of the managed resources used by the `HttpContent`.

To be added.

## HttpContent.Dispose(Boolean) method

```csharp
protected virtual void Dispose (bool disposing);
```

Releases the unmanaged resources used by the `HttpContent` and optionally disposes of the managed resources.

Parameters:

- `disposing`: `true` to release both managed and unmanaged resources; `false` to releases only unmanaged resources.

#### Remarks
This method is called by the public `Dispose()` method and the `Finalize` method, if it has been overridden. `Dispose()` invokes this method with the `disposing` parameter set to `true`. `Finalize` invokes this method with `disposing` set to `false`.

When the `disposing` parameter is `true`, this method releases all resources held by any managed objects that this `HttpContent` references. This method invokes the `Dispose()` method of each referenced object.

## HttpContent.LoadIntoBufferAsync() method

```csharp
public System.Threading.Tasks.Task LoadIntoBufferAsync ();
```

Serializes the HTTP content to a memory buffer as an asynchronous operation.

Returns: The task object representing the asynchronous operation.

#### Remarks
This operation will not block. The returned `Task` object will complete after all of the content has been serialized to the memory buffer.

After content is serialized to a memory buffer, calls to one of the `HttpContent.CopyToAsync` methods will copy the content of the memory buffer to the target stream.

## HttpContent.LoadIntoBufferAsync(Int64) method

```csharp
public System.Threading.Tasks.Task LoadIntoBufferAsync (long maxBufferSize);
```

Serializes the HTTP content to a memory buffer as an asynchronous operation.

Parameters:

- `maxBufferSize`: The maximum size, in bytes, of the buffer to use.

Returns: The task object representing the asynchronous operation.

#### Remarks
This operation will not block. The returned `Task` object will complete after all of the content has been serialized to the memory buffer.

After content is serialized to a memory buffer, calls to one of the `HttpContent.CopyToAsync` methods will copy the content of the memory buffer to the target stream.

If the content exceeds the value passed in the `maxBufferSize` parameter, an exception is thrown.

## HttpContent.LoadIntoBufferAsync(CancellationToken) method

```csharp
public System.Threading.Tasks.Task LoadIntoBufferAsync (System.Threading.CancellationToken <example-value>);
```

Serializes the HTTP content to a memory buffer as an asynchronous operation.

Parameters:

- `cancellationToken`: The cancellation token to cancel the operation.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.
- `ObjectDisposedException`: The object has already been disposed.

This operation will not block. The returned `Task` object will complete after all of the content has been serialized to the memory buffer.

After content is serialized to a memory buffer, calls to one of the `HttpContent.CopyToAsync` methods will copy the content of the memory buffer to the target stream.

## HttpContent.LoadIntoBufferAsync(Int64, CancellationToken) method

```csharp
public System.Threading.Tasks.Task LoadIntoBufferAsync (long maxBufferSize, System.Threading.CancellationToken <example-value>);
```

Serializes the HTTP content to a memory buffer as an asynchronous operation.

Parameters:

- `maxBufferSize`: The maximum size, in bytes, of the buffer to use.
- `cancellationToken`: The cancellation token to cancel the operation.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.
- `ObjectDisposedException`: The object has already been disposed.

This operation will not block. The returned `Task` object will complete after all of the content has been serialized to the memory buffer.

After content is serialized to a memory buffer, calls to one of the `HttpContent.CopyToAsync` methods will copy the content of the memory buffer to the target stream.

## HttpContent.ReadAsByteArrayAsync() method

```csharp
public System.Threading.Tasks.Task<byte[]> ReadAsByteArrayAsync ();
```

Serializes the HTTP content to a byte array as an asynchronous operation.

Returns: The task object representing the asynchronous operation.

#### Remarks
This operation will not block. The returned `Task<T>` object will complete after all of the content has been written as a byte array.

Once the operation completes, the `Result` property on the returned task object contains the byte array with the HTTP content.

Note that this method will internally buffer the content via `LoadIntoBufferAsync`.
