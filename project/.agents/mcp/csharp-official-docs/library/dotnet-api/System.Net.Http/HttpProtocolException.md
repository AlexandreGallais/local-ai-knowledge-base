---
title: "HttpProtocolException class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Http/HttpProtocolException.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HttpProtocolException class

Namespace: `System.Net.Http`

```csharp
public sealed class HttpProtocolException : System.Net.Http.HttpIOException
```

The exception thrown when an HTTP/2 or an HTTP/3 protocol error occurs.

#### Remarks

When calling `HttpClient` or `SocketsHttpHandler` methods, `HttpProtocolException` will be the inner exception of
`HttpRequestException` if a protocol error occurs.
When calling `Stream` methods on the stream returned by `ReadAsStream` or
`ReadAsStreamAsync`, `HttpProtocolException` can be thrown directly.

## HttpProtocolException.HttpProtocolException(Int64, String, Exception) constructor

```csharp
public HttpProtocolException (long errorCode, string message, Exception? innerException);
```

Initializes a new instance of the `HttpProtocolException` class with the specified error code, message, and inner exception.

Parameters:

- `errorCode`: The HTTP/2 or HTTP/3 error code.
- `message`: The error message that explains the reason for the exception.
- `innerException`: The exception that is the cause of the current exception.

To be added.

## HttpProtocolException.ErrorCode property

```csharp
public long ErrorCode { get; }
```

Gets the HTTP/2 or HTTP/3 error code associated with this exception.

Returns: To be added.

To be added.
