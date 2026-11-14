---
title: "HttpResponseMessage class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Http/HttpResponseMessage.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HttpResponseMessage class

Namespace: `System.Net.Http`

```csharp
public class HttpResponseMessage : IDisposable
```

Represents a HTTP response message including the status code and data.

#### Remarks
A common way to get an `HttpResponseMessage` is from one of the `SendAsync` methods.

#### Examples

_Code sample not included: ~/snippets/csharp/System.Net.Http/HttpClient/source.cs._

The preceding code example uses an `async Task Main()` entry point. That feature requires C# 7.1 or later.

## HttpResponseMessage.HttpResponseMessage() constructor

```csharp
public HttpResponseMessage ();
```

Initializes a new instance of the `HttpResponseMessage` class.

To be added.

## HttpResponseMessage.HttpResponseMessage(HttpStatusCode) constructor

```csharp
public HttpResponseMessage (System.Net.HttpStatusCode statusCode);
```

Initializes a new instance of the `HttpResponseMessage` class with a specific `HttpResponseMessage.StatusCode`.

Parameters:

- `statusCode`: The status code of the HTTP response.

To be added.

## HttpResponseMessage.Content property

```csharp
public System.Net.Http.HttpContent Content { get; set; }
```

Gets or sets the content of a HTTP response message.

Returns: The content of the HTTP response message.

#### Remarks
The contents of an HTTP response message corresponds to the entity body defined in RFC 2616.

## HttpResponseMessage.Headers property

```csharp
public System.Net.Http.Headers.HttpResponseHeaders Headers { get; }
```

Gets the collection of HTTP response headers.

Returns: The collection of HTTP response headers.

To be added.

## HttpResponseMessage.IsSuccessStatusCode property

```csharp
public bool IsSuccessStatusCode { get; }
```

Gets a value that indicates if the HTTP response was successful.

Returns: `true` if `HttpResponseMessage.StatusCode` was in the range 200-299; otherwise, `false`.

To be added.

## HttpResponseMessage.ReasonPhrase property

```csharp
public string? ReasonPhrase { get; set; }
```

Gets or sets the reason phrase, which typically is sent by servers together with the status code.

Returns: The reason phrase sent by the server.

To be added.

## HttpResponseMessage.RequestMessage property

```csharp
public System.Net.Http.HttpRequestMessage? RequestMessage { get; set; }
```

Gets or sets the request message that led to this response message.

Returns: The request message that led to this response message.

#### Remarks
This property is set to the request message that led to this response message. In the case of a request sent using `HttpClient`, this property will point to the actual request message leading to the final response. Note that this may not be the same message the user provided when sending the request. This is typically the case if the request needs to be resent due to redirects or authentication. This property can be used to determine what URL actually created the response (useful in case of redirects).

## HttpResponseMessage.StatusCode property

```csharp
public System.Net.HttpStatusCode StatusCode { get; set; }
```

Gets or sets the status code of the HTTP response.

Returns: The status code of the HTTP response.

To be added.

## HttpResponseMessage.TrailingHeaders property

```csharp
public System.Net.Http.Headers.HttpResponseHeaders TrailingHeaders { get; }
```

Gets the collection of trailing headers included in an HTTP response.

Returns: The collection of trailing headers in the HTTP response.

Exceptions:

- `HttpRequestException`: PROTOCOL_ERROR: The HTTP/2 response contains pseudo-headers in the Trailing Headers Frame.

#### Remarks
Forbidden headers will be ignored.

Since trailing headers are sent as an HTTP header appended at the end of the response message, the `TrailingHeaders` property returns an empty `HttpResponseHeaders` instance if it is accessed and the response content has not been read completely.

For additional information on trailing headers, see RFC 7230 - 4.1.2. Chunked Trailer Part.

## HttpResponseMessage.Version property

```csharp
public Version Version { get; set; }
```

Gets or sets the HTTP message version.

Returns: The HTTP message version. The default is 1.1.

To be added.

## HttpResponseMessage.Dispose() method

```csharp
public void Dispose ();
```

Releases the unmanaged resources and disposes of unmanaged resources used by the `HttpResponseMessage`.

#### Remarks
Disposing a response that's in progress can signal to the server that the response is no longer needed. This signal depends on the implementation or protocol.

## HttpResponseMessage.Dispose(Boolean) method

```csharp
protected virtual void Dispose (bool disposing);
```

Releases the unmanaged resources used by the `HttpResponseMessage` and optionally disposes of the managed resources.

Parameters:

- `disposing`: `true` to release both managed and unmanaged resources; `false` to releases only unmanaged resources.

#### Remarks

Disposing a response that's in progress can signal to the server that the response is no longer needed. This signal depends on the implementation or protocol.

This method is called by the public `Dispose()` method and the `Finalize` method, if it has been overridden. `Dispose()` invokes this method with the `disposing` parameter set to `true`. `Finalize` invokes this method with `disposing` set to `false`.

When the `disposing` parameter is `true`, this method releases all resources held by any managed objects that this `HttpResponseMessage` references. This method invokes the `Dispose()` method of each referenced object.

## HttpResponseMessage.EnsureSuccessStatusCode() method

```csharp
public System.Net.Http.HttpResponseMessage EnsureSuccessStatusCode ();
```

Throws an exception if the `HttpResponseMessage.IsSuccessStatusCode` property for the HTTP response is `false`.

Returns: The HTTP response message if the call is successful.

Exceptions:

- `HttpRequestException`: The HTTP response is unsuccessful.

#### Remarks
The `HttpResponseMessage.EnsureSuccessStatusCode` method throws an `HttpRequestException` if `StatusCode` is outside of the range 200-299 (the range of status codes indicating success according to the standard).

In some scenarios, you might need more control over which status codes are considered to be successful; for example, an API might be expected to always return `200 OK`. In such cases, we recommend to manually check if `StatusCode` matches the expected value.

## HttpResponseMessage.ToString() method

```csharp
public override string ToString ();
```

Returns a string that represents the current object.

Returns: A string representation of the current object.

To be added.
