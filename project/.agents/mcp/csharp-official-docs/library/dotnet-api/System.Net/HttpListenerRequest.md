---
title: "HttpListenerRequest class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net/HttpListenerRequest.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HttpListenerRequest class

Namespace: `System.Net`

```csharp
public sealed class HttpListenerRequest
```

Describes an incoming HTTP request to an `HttpListener` object. This class cannot be inherited.

#### Remarks

When a client makes a request to a Uniform Resource Identifier (URI) handled by an `HttpListener` object, the `HttpListener` provides a `HttpListenerContext` object that contains information about the sender, the request, and the response that is sent to the client. The `Request` property returns the `HttpListenerRequest` object that describes the request.

The `HttpListenerRequest` object contains information about the request, such as the request `HttpListenerRequest.HttpMethod` string, `HttpListenerRequest.UserAgent` string, and request body data (see the `InputStream` property).

To reply to the request, you must get the associated response using the `Response` property.

#### Examples
The following code example demonstrates how to receive and respond to a `HttpListenerRequest`.

_Code sample not included: ~/snippets/csharp/System.Net/HttpListener/Overview/test.cs._

## HttpListenerRequest.AcceptTypes property

```csharp
public string[]? AcceptTypes { get; }
```

Gets the MIME types accepted by the client.

Returns: A `String` array that contains the type names specified in the request's `Accept` header or `null` if the client request did not include an `Accept` header.

#### Remarks
The `Accept` header is a string of space-separated Multipurpose Internet Mail Extensions (MIME) type names (for example, `image/jpeg`), which indicate the MIME types that the client is prepared to accept and process in a response. The `*/*` entry indicates that the client accepts any MIME type. For a detailed description of the `Accept` header, see RFC 2616, available at https://www.rfc-editor.org.

For a complete list of request headers, see the `HttpRequestHeader` enumeration.

#### Examples
The following code example demonstrates using this property.

_Code sample not included: ~/snippets/csharp/System.Net/HttpListener/Overview/test.cs._

## HttpListenerRequest.ClientCertificateError property

```csharp
public int ClientCertificateError { get; }
```

Gets an error code that identifies a problem with the `X509Certificate` provided by the client.

Returns: An `Int32` value that contains a Windows error code.

Exceptions:

- `InvalidOperationException`: The client certificate has not been initialized yet by a call to the `HttpListenerRequest.BeginGetClientCertificate` or `HttpListenerRequest.GetClientCertificate` methods

-or -

The operation is still in progress.

#### Remarks
This property contains a Windows error code returned by the Secure Channel (Schannel) Security Support Provider Interface (SSPI), which is used to validate the certificate. For more information about SSPI support for Schannel, see Creating a Secure Connection Using Schannel.

#### Examples
The following code example checks this property to determine whether the request includes a valid client certificate.

_Code sample not included: ~/snippets/csharp/System.Net/AuthenticationSchemes/Overview/sample.cs._

## HttpListenerRequest.ContentEncoding property

```csharp
public System.Text.Encoding ContentEncoding { get; }
```

Gets the content encoding that can be used with data sent with the request.

Returns: An `Encoding` object suitable for use with the data in the `HttpListenerRequest.InputStream` property.

#### Remarks
An `Encoding` object can be used to convert byte sequences into character sets (code pages) and characters into byte sequences. This property uses the charset value from the `Content-Type` header to determine the encoding. If that information is not available, this property returns `Encoding.Default`.

#### Examples
The following code example demonstrates using the `ContentEncoding` property.

_Code sample not included: ~/snippets/csharp/System.Net/HttpListener/Overview/test.cs._

## HttpListenerRequest.ContentLength64 property

```csharp
public long ContentLength64 { get; }
```

Gets the length of the body data included in the request.

Returns: The value from the request's `Content-Length` header. This value is -1 if the content length is not known.

#### Remarks
The `Content-Length` header expresses the length, in bytes, of the body data that accompanies the request.

For a complete list of request headers, see the `HttpRequestHeader` enumeration.

#### Examples
The following code example uses the `ContentLength64` property while processing body data.

_Code sample not included: ~/snippets/csharp/System.Net/HttpListener/Overview/test.cs._

## HttpListenerRequest.ContentType property

```csharp
public string? ContentType { get; }
```

Gets the MIME type of the body data included in the request.

Returns: A `String` that contains the text of the request's `Content-Type` header.

#### Remarks
If a client includes body data in a request, it declares the Multipurpose Internet Mail Extensions (MIME) type of the body data in the `Content-Type` header. For example, the default MIME type of data returned from a Web form using the `POST` method is `application/x-www-form-urlencoded`.

For a complete list of request headers, see the `HttpRequestHeader` enumeration and RFC 2616, available at https://www.rfc-editor.org.

The `HttpListenerRequest.ContentType` is null when there is no `Content-Type` header in the request.

#### Examples
The following code example demonstrates how to use this property.

_Code sample not included: ~/snippets/csharp/System.Net/HttpListener/Overview/test.cs._

## HttpListenerRequest.Cookies property

```csharp
public System.Net.CookieCollection Cookies { get; }
```

Gets the cookies sent with the request.

Returns: A `CookieCollection` that contains cookies that accompany the request. This property returns an empty collection if the request does not contain cookies.

#### Remarks
A cookie is name/value text data from a Web server that is stored on the local (client) computer.

#### Examples
The following code example displays the values of cookies sent with the request.

_Code sample not included: ~/snippets/csharp/System.Net/HttpListener/Overview/test.cs._

## HttpListenerRequest.HasEntityBody property

```csharp
public bool HasEntityBody { get; }
```

Gets a `Boolean` value that indicates whether the request has associated body data.

Returns: `true` if the request has associated body data; otherwise, `false`.

#### Remarks
A request that sends data to the server using the `POST` method, for example, should have an entity body.

#### Examples
The following code example demonstrates using this property.

_Code sample not included: ~/snippets/csharp/System.Net/HttpListener/Overview/test.cs._

## HttpListenerRequest.Headers property

```csharp
public System.Collections.Specialized.NameValueCollection Headers { get; }
```

Gets the collection of header name/value pairs sent in the request.

Returns: A `WebHeaderCollection` that contains the HTTP headers included in the request.

#### Remarks
Request headers contain metadata information. For example, headers can contain the Uniform Resource Identifier (URI) of the resource that referred the client to the server, the identity of the user agent employed by the client, and the acceptable MIME types for data in the response body.

For a complete list of request headers, see the `HttpRequestHeader` enumeration.

#### Examples
The following code example displays all the information in a given `WebHeaderCollection` object.

_Code sample not included: ~/snippets/csharp/System.Net/HttpListener/Overview/test.cs._

## HttpListenerRequest.HttpMethod property

```csharp
public string HttpMethod { get; }
```

Gets the HTTP method specified by the client.

Returns: A `String` that contains the method used in the request.

#### Remarks
The HTTP method is typically GET or POST, depending on the action desired by the client.

#### Examples
The following code example demonstrates using this property.

_Code sample not included: ~/snippets/csharp/System.Net/HttpListener/Overview/test.cs._

## HttpListenerRequest.InputStream property

```csharp
public System.IO.Stream InputStream { get; }
```

Gets a stream that contains the body data sent by the client.

Returns: A readable `Stream` object that contains the bytes sent by the client in the body of the request. This property returns `Stream.Null` if no data is sent with the request.

#### Remarks
If the client transmits data (for example, using the HTTP `POST` method), the stream returned by this method contains that data.

> **Note:**
> Closing the request does not close the stream returned by this property. When you no longer need the stream, you should close it by calling the `Stream.Close` method.

#### Examples
The following code example demonstrates using this property to read the data sent with a request.

_Code sample not included: ~/snippets/csharp/System.Net/HttpListener/Overview/test.cs._

## HttpListenerRequest.IsAuthenticated property

```csharp
public bool IsAuthenticated { get; }
```

Gets a `Boolean` value that indicates whether the client sending this request is authenticated.

Returns: `true` if the client was authenticated; otherwise, `false`.

#### Remarks
Your application requests client authentication using the `HttpListener.AuthenticationSchemes` or `AuthenticationSchemeSelectorDelegate` property.

Your application does not receive an `HttpListenerContext` for requests from clients that are not successfully authenticated.

#### Examples
The following code example displays the value of the `IsAuthenticated` property.

_Code sample not included: ~/snippets/csharp/System.Net/HttpListener/Overview/test.cs._

## HttpListenerRequest.IsLocal property

```csharp
public bool IsLocal { get; }
```

Gets a `Boolean` value that indicates whether the request is sent from the local computer.

Returns: `true` if the request originated on the same computer as the `HttpListener` object that provided the request; otherwise, `false`.

#### Remarks
Applications can use this property to perform special processing when requests are from the local computer.

#### Examples
The following code example demonstrates using the `IsLocal` property.

_Code sample not included: ~/snippets/csharp/System.Net/HttpListener/Overview/test.cs._

## HttpListenerRequest.IsSecureConnection property

```csharp
public bool IsSecureConnection { get; }
```

Gets a `Boolean` value that indicates whether the TCP connection used to send the request is using the Secure Sockets Layer (SSL) protocol.

Returns: `true` if the TCP connection is using SSL; otherwise, `false`.

#### Remarks
To request a secure connection, the client request uses `UriSchemeHttps` instead of `UriSchemeHttp`. If the connection cannot be established using SSL, the client receives a `WebException` that provides information about the error.

#### Examples
The following code example demonstrates using the `IsSecureConnection` property.

_Code sample not included: ~/snippets/csharp/System.Net/HttpListener/Overview/test.cs._

## HttpListenerRequest.IsWebSocketRequest property

```csharp
public bool IsWebSocketRequest { get; }
```

Gets a `Boolean` value that indicates whether the TCP connection was  a WebSocket request.

Returns: Returns `Boolean`.

`true` if the TCP connection is a WebSocket request; otherwise, `false`.

To be added.

## HttpListenerRequest.KeepAlive property

```csharp
public bool KeepAlive { get; }
```

Gets a `Boolean` value that indicates whether the client requests a persistent connection.

Returns: `true` if the connection should be kept open; otherwise, `false`.

#### Remarks
If an HTTP client and server expect to exchange data multiple times in a short time period, a persistent connection speeds up their communications by allowing them to avoid the overhead required to open and close a TCP connection for each message. For clients using HTTP/1.1, the default value for this property is `true`.

#### Examples
The following code example demonstrates using this property.

_Code sample not included: ~/snippets/csharp/System.Net/HttpListener/Overview/test.cs._

## HttpListenerRequest.LocalEndPoint property

```csharp
public System.Net.IPEndPoint LocalEndPoint { get; }
```

Gets the server IP address and port number to which the request is directed.

Returns: An `IPEndPoint` that represents the IP address that the request is sent to.

#### Remarks
This property is useful when you want to respond to requests based on the way they are addressed.

#### Examples
The following code example demonstrates using this property.

_Code sample not included: ~/snippets/csharp/System.Net/HttpListener/Overview/test.cs._

## HttpListenerRequest.ProtocolVersion property

```csharp
public Version ProtocolVersion { get; }
```

Gets the HTTP version used by the requesting client.

Returns: A `Version` that identifies the client's version of HTTP.

#### Remarks
The capabilities of different HTTP versions are specified in the documents available at https://www.rfc-editor.org.

#### Examples
The following code example demonstrates using this property.

_Code sample not included: ~/snippets/csharp/System.Net/HttpListener/Overview/test.cs._

## HttpListenerRequest.QueryString property

```csharp
public System.Collections.Specialized.NameValueCollection QueryString { get; }
```

Gets the query string included in the request.

Returns: A `NameValueCollection` object that contains the query data included in the request `HttpListenerRequest.Url`.

#### Remarks
In a URL, the query information is separated from the path information by a question mark (?). Name/value pairs are separated by an equals sign (=). To access the query data as a single string, get the `Query` property value from the `Uri` object returned by `HttpListenerRequest.Url`.

> **Note:**
> Queries without an equals sign (for example, `http://www.contoso.com/query.htm?Name`) are added to the `null` key in the `NameValueCollection`.

#### Examples
The following code example demonstrates using the `QueryString` property.

_Code sample not included: ~/snippets/csharp/System.Net/HttpListener/Overview/test.cs._

## HttpListenerRequest.RawUrl property

```csharp
public string? RawUrl { get; }
```

Gets the URL information (without the host and port) requested by the client.

Returns: A `String` that contains the raw URL for this request.

#### Remarks
The raw URL is defined as the part of the URL following the domain information. In the URL string `http://www.contoso.com/articles/recent.aspx`, the raw URL is `/articles/recent.aspx`. The raw URL includes the query string, if present.

To obtain the host and port information, use the `RemoteEndPoint` property.

#### Examples
The following code example demonstrates using the `RawUrl` property.

_Code sample not included: ~/snippets/csharp/System.Net/HttpListener/Overview/test.cs._
