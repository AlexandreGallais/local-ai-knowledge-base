---
title: "HttpWebResponse class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net/HttpWebResponse.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HttpWebResponse class (part 2 of 2)

## HttpWebResponse.Close() method

```csharp
public override void Close ();
```

Closes the response stream.

Exceptions:

- `ObjectDisposedException`: This `HttpWebResponse` object has been disposed.

#### Remarks
The `HttpWebResponse.Close` method closes the response stream and releases the connection to the resource for reuse by other requests.

You should not access any properties of the `HttpWebResponse` object after the call to the `Close` method. If you do, an `ObjectDisposedException` is thrown.

You must call either the `Stream.Close` or the `HttpWebResponse.Close` method to close the stream and release the connection for reuse. It is not necessary to call both `Stream.Close` and `HttpWebResponse.Close`, but doing so does not cause an error. Failure to close the stream can cause your application to run out of connections.

> **Note:**
> This member outputs trace information when you enable network tracing in your application.

#### Examples
The following example demonstrates how to close a `HttpWebResponse`.

_Code sample not included: ~/snippets/csharp/System.Net/HttpWebResponse/Close/httpwebresponse_close.cs._

## HttpWebResponse.Dispose(Boolean) method

```csharp
protected override void Dispose (bool disposing);
```

Releases the unmanaged resources used by the `HttpWebResponse`, and optionally disposes of the managed resources.

Parameters:

- `disposing`: `true` to release both managed and unmanaged resources; `false` to releases only unmanaged resources.

#### Remarks
This method is called by the public `Dispose()` method and the `Finalize` method, if it has been overridden. `Dispose()` invokes this method with the `disposing` parameter set to `true`. `Finalize` invokes this method with `disposing` set to `false`.

When the `disposing` parameter is `true`, this method releases all resources held by any managed objects that this `WebResponse` references. This method invokes the `Dispose()` method of each referenced object.

> **Note:**
> This member outputs trace information when you enable network tracing in your application.

## HttpWebResponse.GetObjectData(SerializationInfo, StreamingContext) method

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

## HttpWebResponse.GetResponseHeader(String) method

```csharp
public string GetResponseHeader (string headerName);
```

Gets the contents of a header that was returned with the response.

Parameters:

- `headerName`: The header value to return.

Returns: The contents of the specified header.

Exceptions:

- `ObjectDisposedException`: The current instance has been disposed.

#### Remarks
Use `HttpWebResponse.GetResponseHeader` to retrieve the contents of particular headers. You must specify which header you want to return.

#### Examples
This example creates a Web request and queries for a response. If the site requires authentication, this example will respond with a challenge string. This string is extracted using `HttpWebResponse.GetResponseHeader`.

_Code sample not included: ~/snippets/csharp/System.Net/HttpWebResponse/GetResponseHeader/httpwebresponse_getresponseheader.cs._

## HttpWebResponse.GetResponseStream() method

```csharp
public override System.IO.Stream GetResponseStream ();
```

Gets the stream that is used to read the body of the response from the server.

Returns: A `Stream` containing the body of the response.

Exceptions:

- `ProtocolViolationException`: There is no response stream.
- `ObjectDisposedException`: The current instance has been disposed.

#### Remarks
The `HttpWebResponse.GetResponseStream` method returns the data stream from the requested Internet resource.

> **Note:**
> You must call one of the `Stream.Close`, `Stream.Dispose`, `HttpWebResponse.Close`, or `HttpWebResponse.Dispose` methods to close the stream and release the connection for reuse. It's not necessary to close or dispose both `Stream` and `HttpWebResponse` instances, but doing so doesn't cause an error. Failure to close or dispose the stream will cause your application to run out of connections.

> **Note:**
> This member outputs trace information when you enable network tracing in your application.

#### Examples
The following example demonstrates how to use `HttpWebResponse.GetResponseStream` to return the `Stream` instance used to read the response from the server.

_Code sample not included: ~/snippets/csharp/System.Net/HttpWebResponse/GetResponseStream/httpwebresponse_getresponsestream.cs._

## HttpWebResponse.System.Runtime.Serialization.ISerializable.GetObjectData(SerializationInfo, StreamingContext) method

```csharp
void ISerializable.GetObjectData (System.Runtime.Serialization.SerializationInfo serializationInfo, System.Runtime.Serialization.StreamingContext streamingContext);
```

Serializes this instance into the specified `SerializationInfo` object.

Parameters:

- `serializationInfo`: The object into which this `HttpWebResponse` will be serialized.
- `streamingContext`: The destination of the serialization.

To be added.
