---
title: "MultipartContent class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Http/MultipartContent.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MultipartContent class

Namespace: `System.Net.Http`

```csharp
public class MultipartContent : System.Net.Http.HttpContent, System.Collections.Generic.IEnumerable<System.Net.Http.HttpContent>
```

Provides a collection of `HttpContent` objects that get serialized using the multipart/* content type specification.

Multipart messages must contain one or more body parts. When a `MultipartContent` instance with zero parts is serialized, it's written as a single empty part with no content headers or message body.
If your server doesn't support such contents with zero parts, consider conditionally using a different `HttpContent` type or no `HttpContent`.

## MultipartContent.MultipartContent() constructor

```csharp
public MultipartContent ();
```

Creates a new instance of the `MultipartContent` class.

To be added.

## MultipartContent.MultipartContent(String) constructor

```csharp
public MultipartContent (string subtype);
```

Creates a new instance of the `MultipartContent` class.

Parameters:

- `subtype`: The subtype of the multipart content.

Exceptions:

- `ArgumentException`: The `subtype` was `null` or contains only white space characters.

To be added.

## MultipartContent.MultipartContent(String, String) constructor

```csharp
public MultipartContent (string subtype, string boundary);
```

Creates a new instance of the `MultipartContent` class.

Parameters:

- `subtype`: The subtype of the multipart content.
- `boundary`: The boundary string for the multipart content.

Exceptions:

- `ArgumentException`: The `subtype` was `null` or an empty string.

The `boundary` was `null` or contains only white space characters.

-or-

The `boundary` ends with a space character.
- `ArgumentOutOfRangeException`: The length of the `boundary` was greater than 70.

To be added.

## MultipartContent.HeaderEncodingSelector property

```csharp
public System.Net.Http.HeaderEncodingSelector<System.Net.Http.HttpContent>? HeaderEncodingSelector { get; set; }
```

Gets or sets a callback that decode response header values.

Returns: The header encoding selector callback to decode the value for the specified response header name, or `null` to indicate the default behavior.

To be added.

## MultipartContent.Add(HttpContent) method

```csharp
public virtual void Add (System.Net.Http.HttpContent content);
```

Adds multipart HTTP content to a collection of `HttpContent` objects that get serialized using the multipart/* content type specification.

Parameters:

- `content`: The HTTP content to add to the collection.

Exceptions:

- `ArgumentNullException`: The `content` was `null`.

To be added.

## MultipartContent.CreateContentReadStream(CancellationToken) method

```csharp
protected override System.IO.Stream CreateContentReadStream (System.Threading.CancellationToken <example-value>);
```

Serializes the HTTP content to a stream using the multipart/* encoding.

Parameters:

- `cancellationToken`: The cancellation token to cancel the operation.

Returns: The HTTP content stream that represents the multipart/* encoded HTTP content.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks
This method overrides `HttpContent.CreateContentReadStream` to use a custom stream that contains an array, with each HTTP content entity and its boundary encoded and serialized to a `MemoryStream` instance.

## MultipartContent.CreateContentReadStreamAsync() method

```csharp
protected override System.Threading.Tasks.Task<System.IO.Stream> CreateContentReadStreamAsync ();
```

Serializes the HTTP content to a stream using the multipart/* encoding as an asynchronous operation.

Returns: The task object representing the asynchronous operation.

#### Remarks
This method overrides `HttpContent.CreateContentReadStreamAsync` to use a custom stream that contains an array, with each HTTP content and its boundary encoded and serialized to a `MemoryStream` instance.

This operation will not block. The returned `Task<T>` object will complete after all of the content has been written to the memory stream.

Once the operation completes, the `Result` property on the returned task object contains the stream that represents the multipart/* encoded HTTP content. The returned stream can then be used to read the content using various stream APIs.

## MultipartContent.CreateContentReadStreamAsync(CancellationToken) method

```csharp
protected override System.Threading.Tasks.Task<System.IO.Stream> CreateContentReadStreamAsync (System.Threading.CancellationToken <example-value>);
```

Serializes the HTTP content to a stream using the multipart/* encoding as an asynchronous operation.

Parameters:

- `cancellationToken`: The cancellation token to cancel the operation.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks
This method overrides `HttpContent.CreateContentReadStreamAsync` to use a custom stream that contains an array, with each HTTP content and its boundary encoded and serialized to a `MemoryStream` instance.

This operation will not block. The returned `Task<T>` object will complete after all of the content has been written to the memory stream.

Once the operation completes, the `Result` property on the returned task object contains the stream that represents the multipart/* encoded HTTP content. The returned stream can then be used to read the content using various stream APIs.

## MultipartContent.Dispose(Boolean) method

```csharp
protected override void Dispose (bool disposing);
```

Releases the unmanaged resources used by the `MultipartContent` and optionally disposes of the managed resources.

Parameters:

- `disposing`: `true` to release both managed and unmanaged resources; `false` to releases only unmanaged resources.

#### Remarks
This method is called by the public `Dispose()` method and the `Finalize` method, if it has been overridden. `Dispose()` invokes this method with the `disposing` parameter set to `true`. `Finalize` invokes this method with `disposing` set to `false`.

When the `disposing` parameter is `true`, this method releases all resources held by any managed objects that this `MultipartContent` references. This method invokes the `Dispose()` method of each referenced object.

## MultipartContent.GetEnumerator() method

```csharp
public System.Collections.Generic.IEnumerator<System.Net.Http.HttpContent> GetEnumerator ();
```

Returns an enumerator that iterates through the collection of `HttpContent` objects that get serialized using the multipart/* content type specification.

Returns: An object that can be used to iterate through the collection.

#### Remarks
The foreach statement of the C# language (For Each in Visual Basic) hides the complexity of the enumerators. Therefore, using foreach is recommended, instead of directly manipulating the enumerator.

Enumerators can be used to read the data in the collection, but they cannot be used to modify the underlying collection.

Initially, the enumerator is positioned before the first element in the collection.

## MultipartContent.SerializeToStream(Stream, TransportContext, CancellationToken) method

```csharp
protected override void SerializeToStream (System.IO.Stream stream, System.Net.TransportContext? context, System.Threading.CancellationToken <example-value>);
```

Serializes the multipart HTTP content to a stream.

Parameters:

- `stream`: The target stream.
- `context`: Information about the transport (for example, the channel binding token). This parameter may be `null`.
- `cancellationToken`: The cancellation token to cancel the operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.

## MultipartContent.SerializeToStreamAsync(Stream, TransportContext) method

```csharp
protected override System.Threading.Tasks.Task SerializeToStreamAsync (System.IO.Stream stream, System.Net.TransportContext? context);
```

Serializes the multipart HTTP content to a stream as an asynchronous operation.

Parameters:

- `stream`: The target stream.
- `context`: Information about the transport (channel binding token, for example). This parameter may be `null`.

Returns: The task object representing the asynchronous operation.

#### Remarks
This operation will not block. The returned `Task<T>` object will complete after all of the content has been serialized to the target stream.

## MultipartContent.SerializeToStreamAsync(Stream, TransportContext, CancellationToken) method

```csharp
protected override System.Threading.Tasks.Task SerializeToStreamAsync (System.IO.Stream stream, System.Net.TransportContext? context, System.Threading.CancellationToken <example-value>);
```

Serializes the multipart HTTP content to a stream as an asynchronous operation.

Parameters:

- `stream`: The target stream.
- `context`: Information about the transport (channel binding token, for example). This parameter may be `null`.
- `cancellationToken`: The cancellation token to cancel the operation.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks
This operation will not block. The returned `Task<T>` object will complete after all of the content has been serialized to the target stream.

## MultipartContent.System.Collections.IEnumerable.GetEnumerator() method

```csharp
System.Collections.IEnumerator IEnumerable.GetEnumerator ();
```

Returns an enumerator that iterates through the collection of objects that get serialized using the multipart/* content type specification.

Returns: An object that can be used to iterate through the collection.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `MultipartContent` instance is cast to an `IEnumerable` interface.

## MultipartContent.TryComputeLength(Int64) method

```csharp
protected internal override bool TryComputeLength (out long length);
```

Determines whether the HTTP multipart content has a valid length in bytes.

Parameters:

- `length`: The length in bytes of the HTTP content.

Returns: `true` if `length` is a valid length; otherwise, `false`.

#### Remarks
The `MultipartContent.TryComputeLength` method gives HTTP multipart content the ability to calculate the content length. This is useful for content types which are able to easily calculate the content length. If computing the content length is not possible or expensive (would require the system to buffer the whole content where the serialization would be expensive or require the system to allocate a lot of memory), this method can return `false`. If this method returns `false`, this implies that either chunked transfer is needed or the content must get buffered before being sent to the server.
