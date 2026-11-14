---
title: "HttpWebRequest class (part 3 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net/HttpWebRequest.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HttpWebRequest class (part 3 of 3)

## HttpWebRequest.GetRequestStream(TransportContext) method

```csharp
public System.IO.Stream GetRequestStream (out System.Net.TransportContext? context);
```

Gets a `Stream` object to use to write request data and outputs the `TransportContext` associated with the stream.

Parameters:

- `context`: The `TransportContext` for the `Stream`.

Returns: A `Stream` to use to write request data.

Exceptions:

- `Exception`: The `HttpWebRequest.GetRequestStream` method was unable to obtain the `Stream`.
- `InvalidOperationException`: The `HttpWebRequest.GetRequestStream` method is called more than once.

-or-

`HttpWebRequest.TransferEncoding` is set to a value and `HttpWebRequest.SendChunked` is `false`.
- `NotSupportedException`: The request cache validator indicated that the response for this request can be served from the cache; however, requests that write data must not use the cache. This exception can occur if you are using a custom cache validator that is incorrectly implemented.
- `ProtocolViolationException`: The `HttpWebRequest.Method` property is GET or HEAD.

-or-

`HttpWebRequest.KeepAlive` is `true`, `HttpWebRequest.AllowWriteStreamBuffering` is `false`, `HttpWebRequest.ContentLength` is -1, `HttpWebRequest.SendChunked` is `false`, and `HttpWebRequest.Method` is POST or PUT.
- `WebException`: `HttpWebRequest.Abort` was previously called.

-or-

The time-out period for the request expired.

-or-

An error occurred while processing the request.

## HttpWebRequest.GetResponse() method

```csharp
public override System.Net.WebResponse GetResponse ();
```

Returns a response from an Internet resource.

Returns: A `WebResponse` that contains the response from the Internet resource.

Exceptions:

- `InvalidOperationException`: The stream is already in use by a previous call to `HttpWebRequest.BeginGetResponse`.

-or-

`HttpWebRequest.TransferEncoding` is set to a value and `HttpWebRequest.SendChunked` is `false`.
- `ProtocolViolationException`: `HttpWebRequest.Method` is GET or HEAD, and either `HttpWebRequest.ContentLength` is greater or equal to zero or `HttpWebRequest.SendChunked` is `true`.

-or-

`HttpWebRequest.KeepAlive` is `true`, `HttpWebRequest.AllowWriteStreamBuffering` is `false`, `HttpWebRequest.ContentLength` is -1, `HttpWebRequest.SendChunked` is `false`, and `HttpWebRequest.Method` is POST or PUT.

-or-

The `HttpWebRequest` has an entity body but the `HttpWebRequest.GetResponse` method is called without calling the `HttpWebRequest.GetRequestStream` method.

-or-

The `HttpWebRequest.ContentLength` is greater than zero, but the application does not write all of the promised data.
- `NotSupportedException`: The request cache validator indicated that the response for this request can be served from the cache; however, this request includes data to be sent to the server. Requests that send data must not use the cache. This exception can occur if you are using a custom cache validator that is incorrectly implemented.
- `WebException`: `HttpWebRequest.Abort` was previously called.

-or-

The time-out period for the request expired.

-or-

An error occurred while processing the request.

## HttpWebRequest.System.Runtime.Serialization.ISerializable.GetObjectData(SerializationInfo, StreamingContext) method

```csharp
void ISerializable.GetObjectData (System.Runtime.Serialization.SerializationInfo? serializationInfo, System.Runtime.Serialization.StreamingContext streamingContext);
```

Populates a `SerializationInfo` with the data needed to serialize the target object.

Parameters:

- `serializationInfo`: The `SerializationInfo` to populate with data.
- `streamingContext`: A `StreamingContext` that specifies the destination for this serialization.

To be added.
