---
title: "FileWebRequest class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net/FileWebRequest.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# FileWebRequest class

Namespace: `System.Net`

```csharp
public class FileWebRequest : System.Net.WebRequest, System.Runtime.Serialization.ISerializable
```

Provides a file system implementation of the `WebRequest` class.

#### Remarks
The `FileWebRequest` class implements the `WebRequest` `abstract` base class for Uniform Resource Identifiers (URIs) that use the `file://` scheme to request local files.

Do not use the `FileWebRequest.%23ctor` constructor. Use the `WebRequest.Create` method to initialize new instances of the `FileWebRequest` class. If the URI scheme is `file://`, the `WebRequest.Create` method returns a `FileWebRequest` object.

The `FileWebRequest.GetResponse` method makes a synchronous request for the file specified in the `RequestUri` property and returns a `FileWebResponse` object that contains the response. You can make an asynchronous request for the file using the `FileWebRequest.BeginGetResponse` and `FileWebRequest.EndGetResponse` methods.

When you want to write data to a file, the `FileWebRequest.GetRequestStream` method returns a `Stream` instance to write to. The `FileWebRequest.BeginGetRequestStream` and `FileWebRequest.EndGetRequestStream` methods provide asynchronous access to the write data stream.

The `FileWebRequest` class relies on the `File` class for error handling.

#### Examples
The following code example uses the `FileWebRequest` class to access a file system resource.

_Code sample not included: ~/snippets/csharp/System.Net/FileWebRequest/Overview/getrequeststream.cs._

## FileWebRequest.FileWebRequest(SerializationInfo, StreamingContext) constructor

```csharp
protected FileWebRequest (System.Runtime.Serialization.SerializationInfo serializationInfo, System.Runtime.Serialization.StreamingContext streamingContext);
```

Initializes a new instance of the `FileWebRequest` class from the specified instances of the `SerializationInfo` and `StreamingContext` classes.

Parameters:

- `serializationInfo`: A `SerializationInfo` object that contains the information that is required to serialize the new `FileWebRequest` object.
- `streamingContext`: A `StreamingContext` object that contains the source of the serialized stream that is associated with the new `FileWebRequest` object.

Exceptions:

- `PlatformNotSupportedException`: In all cases.

To be added.

## FileWebRequest.ConnectionGroupName property

```csharp
public override string? ConnectionGroupName { get; set; }
```

Gets or sets the name of the connection group for the request. This property is reserved for future use.

Returns: The name of the connection group for the request.

#### Remarks
The `ConnectionGroupName` property is currently not used by the `FileWebRequest` class.

## FileWebRequest.ContentLength property

```csharp
public override long ContentLength { get; set; }
```

Gets or sets the content length of the data being sent.

Returns: The number of bytes of request data being sent.

Exceptions:

- `ArgumentException`: `FileWebRequest.ContentLength` is less than 0.

#### Examples
The following code example sets the content length of the data being sent. Refer to the complete example in the `FileWebRequest` class.

_Code sample not included: ~/snippets/csharp/System.Net/FileWebRequest/Overview/getrequeststream.cs._

## FileWebRequest.ContentType property

```csharp
public override string? ContentType { get; set; }
```

Gets or sets the content type of the data being sent. This property is reserved for future use.

Returns: The content type of the data being sent.

#### Remarks
The `ContentType` property contains the media type of the data being sent. This is typically the MIME encoding of the content. The `ContentType` property is currently not used by the `FileWebRequest` class.

## FileWebRequest.Credentials <example-value>

```csharp
public override System.Net.ICredentials? Credentials { get; set; }
```

Gets or sets the credentials that are associated with this request. This property is reserved for future use.

Returns: An `ICredentials` that contains the authentication credentials that are associated with this request. The default is `null`.

#### Remarks
Because the `FileWebRequest` class does not authenticate requests for files from the local file system, it ignores the contents, if any, of the `Credentials` property. Authentication for `FileWebRequest` is handled by the access control lists for the file resource in the underlying file system.

## FileWebRequest.Headers property

```csharp
public override System.Net.WebHeaderCollection Headers { get; }
```

Gets a collection of the name/value pairs that are associated with the request. This property is reserved for future use.

Returns: A `WebHeaderCollection` that contains header name/value pairs associated with this request.

#### Remarks
The `Headers` property is currently not used by the `FileWebRequest` class.

## FileWebRequest.Method property

```csharp
public override string Method { get; set; }
```

Gets or sets the protocol method used for the request. This property is reserved for future use.

Returns: The protocol method to use in this request.

Exceptions:

- `ArgumentException`: The method is invalid.

-or-

The method is not supported.

-or-

Multiple methods were specified.

#### Remarks
The `Method` property is currently not used by the `FileWebRequest` class.

#### Examples
The following code example sets the protocol method used for the request. Refer to the complete example in the `FileWebRequest` class.

_Code sample not included: ~/snippets/csharp/System.Net/FileWebRequest/Overview/getrequeststream.cs._

## FileWebRequest.PreAuthenticate property

```csharp
public override bool PreAuthenticate { get; set; }
```

Gets or sets a value that indicates whether to preauthenticate a request. This property is reserved for future use.

Returns: `true` to preauthenticate; otherwise, `false`.

#### Remarks
The `PreAuthenticate` property is currently not used by the `FileWebRequest` class.

## FileWebRequest.Proxy property

```csharp
public override System.Net.IWebProxy? Proxy { get; set; }
```

Gets or sets the network proxy to use for this request. This property is reserved for future use.

Returns: An `IWebProxy` that indicates the network proxy to use for this request.

#### Remarks
The `Proxy` property is currently not used by the `FileWebRequest` class.

## FileWebRequest.RequestUri property

```csharp
public override Uri RequestUri { get; }
```

Gets the Uniform Resource Identifier (URI) of the request.

Returns: A `Uri` that contains the URI of the request.

#### Examples
The following code example uses the `RequestUri` property to get the URI of the request.

_Code sample not included: ~/snippets/csharp/System.Net/FileWebRequest/RequestUri/filewebrequest_contentlength.cs._

## FileWebRequest.Timeout property

```csharp
public override int Timeout { get; set; }
```

Gets or sets the length of time until the request times out.

Returns: The time, in milliseconds, until the request times out, or the value `Timeout.Infinite` to indicate that the request does not time out.

Exceptions:

- `ArgumentOutOfRangeException`: The value specified is less than or equal to zero and is not `Timeout.Infinite`.

#### Remarks
A Domain Name System (DNS) query may take up to 15 seconds to return or time out. If your request contains a host name that requires resolution and you set `FileWebRequest.Timeout` to a value less than 15 seconds, it may take 15 seconds or more before a `WebException` is thrown to indicate a time-out on your request.

#### Examples
The following code example sets the `Timeout` property. Refer to the complete example in the `FileWebRequest` class.

_Code sample not included: ~/snippets/csharp/System.Net/FileWebRequest/Overview/getrequeststream.cs._

## FileWebRequest.UseDefaultCredentials <example-value>

```csharp
public override bool UseDefaultCredentials { get; set; }
```

Always throws a `NotSupportedException`.

Returns: Always throws a `NotSupportedException`.

Exceptions:

- `NotSupportedException`: Default credentials are not supported for file Uniform Resource Identifiers (URIs).

#### Remarks
The `UseDefaultCredentials` property is provided only for compatibility with other implementations of the `WebRequest` and `WebResponse` classes. There is no reason to use `FileWebRequest.UseDefaultCredentials`.

## FileWebRequest.Abort() method

```csharp
public override void Abort ();
```

Cancels a request to an Internet resource.

#### Remarks
The `FileWebRequest.Abort` method cancels a request to a resource. After a request is canceled, calling the `FileWebRequest.GetResponse`, `FileWebRequest.BeginGetResponse`, `FileWebRequest.EndGetResponse`, `FileWebRequest.GetRequestStream`, `FileWebRequest.BeginGetRequestStream`, or `FileWebRequest.EndGetRequestStream` method causes a `WebException` with the `Status` property set to `RequestCanceled`.

This member outputs trace information when you enable network tracing in your application.

## FileWebRequest.BeginGetRequestStream(AsyncCallback, Object) method

```csharp
public override IAsyncResult BeginGetRequestStream (AsyncCallback? callback, object? state);
```

Begins an asynchronous request for a `Stream` object to use to write data.

Parameters:

- `callback`: The `AsyncCallback` delegate.
- `state`: An object that contains state information for this request.

Returns: An `IAsyncResult` that references the asynchronous request.

Exceptions:

- `ProtocolViolationException`: The `FileWebRequest.Method` property is `GET` and the application writes to the stream.
- `InvalidOperationException`: The stream is being used by a previous call to `FileWebRequest.BeginGetRequestStream`.
- `ApplicationException`: No write stream is available.
- `WebException`: The `FileWebRequest` was aborted.

#### Remarks
The `FileWebRequest.BeginGetRequestStream` method starts an asynchronous request for a stream used to send data to a file system resource. The callback method that implements the `AsyncCallback` delegate uses the `FileWebRequest.EndGetRequestStream` method to return the request stream.

#### Examples
The following code example uses `FileWebRequest.BeginGetRequestStream` to make an asynchronous request for a `Stream` object.

_Code sample not included: ~/snippets/csharp/System.Net/FileWebRequest/BeginGetRequestStream/filewebrequest_reqbeginend.cs._

## FileWebRequest.BeginGetResponse(AsyncCallback, Object) method

```csharp
public override IAsyncResult BeginGetResponse (AsyncCallback? callback, object? state);
```

Begins an asynchronous request for a file system resource.

Parameters:

- `callback`: The `AsyncCallback` delegate.
- `state`: An object that contains state information for this request.

Returns: An `IAsyncResult` that references the asynchronous request.

Exceptions:

- `InvalidOperationException`: The stream is already in use by a previous call to `FileWebRequest.BeginGetResponse`.
- `WebException`: The `FileWebRequest` was aborted.

#### Remarks
The asynchronous callback method that implements the `AsyncCallback` delegate uses the `FileWebRequest.EndGetResponse` method to return the actual `FileWebResponse`.

#### Examples
The following code example uses the `FileWebRequest.BeginGetResponse` method to asynchronously access a file system resource.

_Code sample not included: ~/snippets/csharp/System.Net/FileWebRequest/BeginGetResponse/filewebrequest_resbeginend.cs._

## FileWebRequest.EndGetRequestStream(IAsyncResult) method

```csharp
public override System.IO.Stream EndGetRequestStream (IAsyncResult asyncResult);
```

Ends an asynchronous request for a `Stream` instance that the application uses to write data.

Parameters:

- `asyncResult`: An `IAsyncResult` that references the pending request for a stream.

Returns: A `Stream` object that the application uses to write data.

Exceptions:

- `ArgumentNullException`: `asyncResult` is `null`.

#### Remarks
The `FileWebRequest.EndGetRequestStream` method completes an asynchronous stream request that was started by the `FileWebRequest.BeginGetRequestStream` method.

> **Note:**
> To avoid timing issues with garbage collection, be sure to close the response stream by calling the `Stream.Close` method on the stream returned by the `FileWebResponse.GetResponseStream` method after calling the `FileWebRequest.EndGetResponse` method.

#### Examples
The following example uses the `FileWebRequest.EndGetRequestStream` method to end the asynchronous request for a `Stream` object.

_Code sample not included: ~/snippets/csharp/System.Net/FileWebRequest/BeginGetRequestStream/filewebrequest_reqbeginend.cs._

## FileWebRequest.EndGetResponse(IAsyncResult) method

```csharp
public override System.Net.WebResponse EndGetResponse (IAsyncResult asyncResult);
```

Ends an asynchronous request for a file system resource.

Parameters:

- `asyncResult`: An `IAsyncResult` that references the pending request for a response.

Returns: A `WebResponse` that contains the response from the file system resource.

Exceptions:

- `ArgumentNullException`: `asyncResult` is `null`.

#### Remarks
The `FileWebRequest.EndGetResponse` method completes an asynchronous request for a file system resource that was started with the `FileWebRequest.BeginGetResponse` method.

#### Examples
The following code example uses the `FileWebRequest.EndGetResponse` method to end an asynchronous request for a file system resource.

_Code sample not included: ~/snippets/csharp/System.Net/FileWebRequest/BeginGetResponse/filewebrequest_resbeginend.cs._

## FileWebRequest.GetObjectData(SerializationInfo, StreamingContext) method

```csharp
protected override void GetObjectData (System.Runtime.Serialization.SerializationInfo serializationInfo, System.Runtime.Serialization.StreamingContext streamingContext);
```

Populates a `SerializationInfo` with the data needed to serialize the target object.

Parameters:

- `serializationInfo`: The `SerializationInfo` to populate with data.
- `streamingContext`: A `StreamingContext` that specifies the destination for this serialization.

Exceptions:

- `PlatformNotSupportedException`: In all cases.

To be added.

## FileWebRequest.GetRequestStream() method

```csharp
public override System.IO.Stream GetRequestStream ();
```

Returns a `Stream` object for writing data to the file system resource.

Returns: A `Stream` for writing data to the file system resource.

Exceptions:

- `WebException`: The request times out.

#### Remarks
The `FileWebRequest.GetRequestStream` method provides synchronous access to the `Stream`. For asynchronous access, use the `FileWebRequest.BeginGetRequestStream` and `FileWebRequest.EndGetRequestStream` methods.

#### Examples
The following code example uses the `FileWebRequest.GetRequestStream` method to obtain a stream instance used to write to the file. Refer to the complete example in the `FileWebRequest` class.

_Code sample not included: ~/snippets/csharp/System.Net/FileWebRequest/Overview/getrequeststream.cs._
