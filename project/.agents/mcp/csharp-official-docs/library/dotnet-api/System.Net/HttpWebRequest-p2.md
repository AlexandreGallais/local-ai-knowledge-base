---
title: "HttpWebRequest class (part 2 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net/HttpWebRequest.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HttpWebRequest class (part 2 of 3)

## HttpWebRequest.SendChunked property

```csharp
public bool SendChunked { get; set; }
```

Gets or sets a value that indicates whether to send data in segments to the Internet resource.

Returns: `true` to send data to the Internet resource in segments; otherwise, `false`. The default value is `false`.

Exceptions:

- `InvalidOperationException`: The request has been started by calling the `HttpWebRequest.GetRequestStream`, `HttpWebRequest.BeginGetRequestStream`, `HttpWebRequest.GetResponse`, or `HttpWebRequest.BeginGetResponse` method.

## HttpWebRequest.ServerCertificateValidationCallback property

```csharp
public System.Net.Security.RemoteCertificateValidationCallback? ServerCertificateValidationCallback { get; set; }
```

Gets or sets a callback function to validate the server certificate.

Returns: A callback function to validate the server certificate.

## HttpWebRequest.ServicePoint property

```csharp
public System.Net.ServicePoint ServicePoint { get; }
```

Gets the service point to use for the request.

Returns: A `ServicePoint` that represents the network connection to the Internet resource.

## HttpWebRequest.SupportsCookieContainer property

```csharp
public virtual bool SupportsCookieContainer { get; }
```

Gets a value that indicates whether the request provides support for a `CookieContainer`.

Returns: `true` if the request provides support for a `CookieContainer`; otherwise, `false`.

To be added.

## HttpWebRequest.Timeout property

```csharp
public override int Timeout { get; set; }
```

Gets or sets the time-out value in milliseconds for the `HttpWebRequest.GetResponse` and `HttpWebRequest.GetRequestStream` methods.

Returns: The number of milliseconds to wait before the request times out. The default value is 100,000 milliseconds (100 seconds).

Exceptions:

- `ArgumentOutOfRangeException`: The value specified is less than zero and is not `Timeout.Infinite`.

## HttpWebRequest.TransferEncoding property

```csharp
public string? TransferEncoding { get; set; }
```

Gets or sets the value of the `Transfer-encoding` HTTP header.

Returns: The value of the `Transfer-encoding` HTTP header. The default value is `null`.

Exceptions:

- `InvalidOperationException`: `HttpWebRequest.TransferEncoding` is set when `HttpWebRequest.SendChunked` is `false`.
- `ArgumentException`: `HttpWebRequest.TransferEncoding` is set to the value "Chunked".

## HttpWebRequest.UnsafeAuthenticatedConnectionSharing property

```csharp
public bool UnsafeAuthenticatedConnectionSharing { get; set; }
```

Gets or sets a value that indicates whether to allow high-speed NTLM-authenticated connection sharing.

Returns: `true` to keep the authenticated connection open; otherwise, `false`.

## HttpWebRequest.UseDefaultCredentials <example-value>

```csharp
public override bool UseDefaultCredentials { get; set; }
```

Gets or sets a `Boolean` value that controls whether default credentials are sent with requests.

Returns: `true` if the default credentials are used; otherwise, `false`. The default value is `false`.

Exceptions:

- `InvalidOperationException`: You attempted to set this property after the request was sent.

## HttpWebRequest.UserAgent property

```csharp
public string? UserAgent { get; set; }
```

Gets or sets the value of the `User-agent` HTTP header.

Returns: The value of the `User-agent` HTTP header. The default value is `null`.

## HttpWebRequest.Abort() method

```csharp
public override void Abort ();
```

Cancels a request to an Internet resource.

## HttpWebRequest.AddRange(Int32) method

```csharp
public void AddRange (int range);
```

Adds a byte range header to a request for a specific range from the beginning or end of the requested data.

Parameters:

- `range`: The starting or ending point of the range.

Exceptions:

- `ArgumentException`: `range` is invalid.
- `InvalidOperationException`: The range header could not be added.

## HttpWebRequest.AddRange(Int64) method

```csharp
public void AddRange (long range);
```

Adds a byte range header to a request for a specific range from the beginning or end of the requested data.

Parameters:

- `range`: The starting or ending point of the range.

Exceptions:

- `ArgumentException`: `range` is invalid.
- `InvalidOperationException`: The range header could not be added.

## HttpWebRequest.AddRange(Int32, Int32) method

```csharp
public void AddRange (int from, int to);
```

Adds a byte range header to the request for a specified range.

Parameters:

- `from`: The position at which to start sending data.
- `to`: The position at which to stop sending data.

Exceptions:

- `ArgumentOutOfRangeException`: `from` is greater than `to`

-or-

`from` or `to` is less than 0.
- `InvalidOperationException`: The range header could not be added.

## HttpWebRequest.AddRange(Int64, Int64) method

```csharp
public void AddRange (long from, long to);
```

Adds a byte range header to the request for a specified range.

Parameters:

- `from`: The position at which to start sending data.
- `to`: The position at which to stop sending data.

Exceptions:

- `ArgumentOutOfRangeException`: `from` is greater than `to`

-or-

`from` or `to` is less than 0.
- `InvalidOperationException`: The range header could not be added.

## HttpWebRequest.AddRange(String, Int32) method

```csharp
public void AddRange (string rangeSpecifier, int range);
```

Adds a Range header to a request for a specific range from the beginning or end of the requested data.

Parameters:

- `rangeSpecifier`: The description of the range.
- `range`: The starting or ending point of the range.

Exceptions:

- `ArgumentNullException`: `rangeSpecifier` is `null`.
- `ArgumentException`: `rangeSpecifier` is invalid.
- `InvalidOperationException`: The range header could not be added.

## HttpWebRequest.AddRange(String, Int64) method

```csharp
public void AddRange (string rangeSpecifier, long range);
```

Adds a Range header to a request for a specific range from the beginning or end of the requested data.

Parameters:

- `rangeSpecifier`: The description of the range.
- `range`: The starting or ending point of the range.

Exceptions:

- `ArgumentNullException`: `rangeSpecifier` is `null`.
- `ArgumentException`: `rangeSpecifier` is invalid.
- `InvalidOperationException`: The range header could not be added.

## HttpWebRequest.AddRange(String, Int32, Int32) method

```csharp
public void AddRange (string rangeSpecifier, int from, int to);
```

Adds a range header to a request for a specified range.

Parameters:

- `rangeSpecifier`: The description of the range.
- `from`: The position at which to start sending data.
- `to`: The position at which to stop sending data.

Exceptions:

- `ArgumentNullException`: `rangeSpecifier` is `null`.
- `ArgumentOutOfRangeException`: `from` is greater than `to`

-or-

`from` or `to` is less than 0.
- `ArgumentException`: `rangeSpecifier` is invalid.
- `InvalidOperationException`: The range header could not be added.

## HttpWebRequest.AddRange(String, Int64, Int64) method

```csharp
public void AddRange (string rangeSpecifier, long from, long to);
```

Adds a range header to a request for a specified range.

Parameters:

- `rangeSpecifier`: The description of the range.
- `from`: The position at which to start sending data.
- `to`: The position at which to stop sending data.

Exceptions:

- `ArgumentNullException`: `rangeSpecifier` is `null`.
- `ArgumentOutOfRangeException`: `from` is greater than `to`

-or-

`from` or `to` is less than 0.
- `ArgumentException`: `rangeSpecifier` is invalid.
- `InvalidOperationException`: The range header could not be added.

## HttpWebRequest.BeginGetRequestStream(AsyncCallback, Object) method

```csharp
public override IAsyncResult BeginGetRequestStream (AsyncCallback? callback, object? state);
```

Begins an asynchronous request for a `Stream` object to use to write data.

Parameters:

- `callback`: The `AsyncCallback` delegate.
- `state`: The state object for this request.

Returns: An `IAsyncResult` that references the asynchronous request.

Exceptions:

- `ProtocolViolationException`: The `HttpWebRequest.Method` property is GET or HEAD.

-or-

`HttpWebRequest.KeepAlive` is `true`, `HttpWebRequest.AllowWriteStreamBuffering` is `false`, `HttpWebRequest.ContentLength` is -1, `HttpWebRequest.SendChunked` is `false`, and `HttpWebRequest.Method` is POST or PUT.
- `InvalidOperationException`: The stream is being used by a previous call to `HttpWebRequest.BeginGetRequestStream`

-or-

`HttpWebRequest.TransferEncoding` is set to a value and `HttpWebRequest.SendChunked` is `false`.

-or-

The thread pool is running out of threads.
- `NotSupportedException`: The request cache validator indicated that the response for this request can be served from the cache; however, requests that write data must not use the cache. This exception can occur if you are using a custom cache validator that is incorrectly implemented.
- `WebException`: `HttpWebRequest.Abort` was previously called.

## HttpWebRequest.BeginGetResponse(AsyncCallback, Object) method

```csharp
public override IAsyncResult BeginGetResponse (AsyncCallback? callback, object? state);
```

Begins an asynchronous request to an Internet resource.

Parameters:

- `callback`: The `AsyncCallback` delegate.
- `state`: The state object for this request.

Returns: An `IAsyncResult` that references the asynchronous request for a response.

Exceptions:

- `InvalidOperationException`: The stream is already in use by a previous call to `HttpWebRequest.BeginGetResponse`

-or-

`HttpWebRequest.TransferEncoding` is set to a value and `HttpWebRequest.SendChunked` is `false`.

-or-

The thread pool is running out of threads.
- `ProtocolViolationException`: `HttpWebRequest.Method` is GET or HEAD, and either `HttpWebRequest.ContentLength` is greater than zero or `HttpWebRequest.SendChunked` is `true`.

-or-

`HttpWebRequest.KeepAlive` is `true`, `HttpWebRequest.AllowWriteStreamBuffering` is `false`, and either `HttpWebRequest.ContentLength` is -1, `HttpWebRequest.SendChunked` is `false` and `HttpWebRequest.Method` is POST or PUT.

-or-

The `HttpWebRequest` has an entity body but the `HttpWebRequest.BeginGetResponse` method is called without calling the `HttpWebRequest.BeginGetRequestStream` method.

-or-

The `HttpWebRequest.ContentLength` is greater than zero, but the application does not write all of the promised data.
- `WebException`: `HttpWebRequest.Abort` was previously called.

## HttpWebRequest.EndGetRequestStream(IAsyncResult) method

```csharp
public override System.IO.Stream EndGetRequestStream (IAsyncResult asyncResult);
```

Ends an asynchronous request for a `Stream` object to use to write data.

Parameters:

- `asyncResult`: The pending request for a stream.

Returns: A `Stream` to use to write request data.

Exceptions:

- `ArgumentNullException`: `asyncResult` is `null`.
- `IOException`: The request did not complete, and no stream is available.
- `ArgumentException`: `asyncResult` was not returned by the current instance from a call to `HttpWebRequest.BeginGetRequestStream`.
- `InvalidOperationException`: This method was called previously using `asyncResult`.
- `WebException`: `HttpWebRequest.Abort` was previously called.

-or-

An error occurred while processing the request.

## HttpWebRequest.EndGetRequestStream(IAsyncResult, TransportContext) method

```csharp
public System.IO.Stream EndGetRequestStream (IAsyncResult asyncResult, out System.Net.TransportContext? context);
```

Ends an asynchronous request for a `Stream` object to use to write data and outputs the `TransportContext` associated with the stream.

Parameters:

- `asyncResult`: The pending request for a stream.
- `context`: The `TransportContext` for the `Stream`.

Returns: A `Stream` to use to write request data.

Exceptions:

- `ArgumentException`: `asyncResult` was not returned by the current instance from a call to `HttpWebRequest.BeginGetRequestStream`.
- `ArgumentNullException`: `asyncResult` is `null`.
- `InvalidOperationException`: This method was called previously using `asyncResult`.
- `IOException`: The request did not complete, and no stream is available.
- `WebException`: `HttpWebRequest.Abort` was previously called.

-or-

An error occurred while processing the request.

## HttpWebRequest.EndGetResponse(IAsyncResult) method

```csharp
public override System.Net.WebResponse EndGetResponse (IAsyncResult asyncResult);
```

Ends an asynchronous request to an Internet resource.

Parameters:

- `asyncResult`: The pending request for a response.

Returns: A `WebResponse` that contains the response from the Internet resource.

Exceptions:

- `ArgumentNullException`: `asyncResult` is `null`.
- `InvalidOperationException`: This method was called previously using `asyncResult`.

-or-

The `HttpWebRequest.ContentLength` property is greater than 0 but the data has not been written to the request stream.
- `WebException`: `HttpWebRequest.Abort` was previously called.

-or-

An error occurred while processing the request.
- `ArgumentException`: `asyncResult` was not returned by the current instance from a call to `HttpWebRequest.BeginGetResponse`.

## HttpWebRequest.GetObjectData(SerializationInfo, StreamingContext) method

```csharp
protected override void GetObjectData (System.Runtime.Serialization.SerializationInfo serializationInfo, System.Runtime.Serialization.StreamingContext streamingContext);
```

Populates a `SerializationInfo` with the data required to serialize the target object.

Parameters:

- `serializationInfo`: The `SerializationInfo` to populate with data.
- `streamingContext`: A `StreamingContext` that specifies the destination for this serialization.

Exceptions:

- `PlatformNotSupportedException`: In all cases.

To be added.

## HttpWebRequest.GetRequestStream() method

```csharp
public override System.IO.Stream GetRequestStream ();
```

Gets a `Stream` object to use to write request data.

Returns: A `Stream` to use to write request data.

Exceptions:

- `ProtocolViolationException`: The `HttpWebRequest.Method` property is GET or HEAD.

-or-

`HttpWebRequest.KeepAlive` is `true`, `HttpWebRequest.AllowWriteStreamBuffering` is `false`, `HttpWebRequest.ContentLength` is -1, `HttpWebRequest.SendChunked` is `false`, and `HttpWebRequest.Method` is POST or PUT.
- `InvalidOperationException`: The `HttpWebRequest.GetRequestStream` method is called more than once.

-or-

`HttpWebRequest.TransferEncoding` is set to a value and `HttpWebRequest.SendChunked` is `false`.
- `NotSupportedException`: The request cache validator indicated that the response for this request can be served from the cache; however, requests that write data must not use the cache. This exception can occur if you are using a custom cache validator that is incorrectly implemented.
- `WebException`: `HttpWebRequest.Abort` was previously called.

-or-

The time-out period for the request expired.

-or-

An error occurred while processing the request.
