---
title: "WinHttpHandler class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Http/WinHttpHandler.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# WinHttpHandler class

Namespace: `System.Net.Http`

```csharp
public class WinHttpHandler : System.Net.Http.HttpMessageHandler
```

Handles messages based on the WinHTTP interface of Windows. This class is intended for use in server environments.

#### Remarks

`WinHttpHandler` is similar to other existing classes such as `HttpClientHandler`. `WinHttpHandler` provides a handler underneath an `HttpClient` instance and is used to send HTTP requests out to a server and receive server responses. The `WinHttpHandler` implementation supports HTTP versions up to HTTP/2.

`WinHttpHandler` provides developers with more granular control over the application's HTTP communication than the `HttpClientHandler` class. This allows developers to implement more advanced HTTP scenarios or modify system defaults (for example, proxy settings, timeouts, and server SSL certificate validation).

`WinHttpHandler` is not intended to be a replacement for `HttpClientHandler`. Instead, it's a more advanced version that's provided for scenarios where `HttpClientHandler` is insufficient. `WinHttpHandler` is implemented as a thin wrapper on the WinHTTP interface of Windows and is only supported on Windows systems.

When using a chain of multiple handlers, `WinHttpHandler` should be at the bottom of the chain.

`WinHttpHandler` isn't included in the *System.Net.Http.dll* assembly as part of the .NET runtime. For more information, see WinHttpHandler removed from .NET runtime.

#### Trailing headers

Starting with version 6.0.0, `WinHttpHandler` supports trailing headers, also known as trailers (RFC 7230 - 4.1.2. Chunked Trailer Part).

Trailers are added to `TrailingHeaders`.

Trailer support is implemented via the `WINHTTP_QUERY_FLAG_TRAILERS` Query Info Flag which has been introduced in Windows 11, version 21H2 (10.0; Build 22000). On Windows systems where `WINHTTP_QUERY_FLAG_TRAILERS` is unsupported, trailers are ignored.

## WinHttpHandler.WinHttpHandler() constructor

```csharp
public WinHttpHandler ();
```

Initializes a new instance of the `WinHttpHandler` class.

To be added.

## WinHttpHandler.AutomaticDecompression property

```csharp
public System.Net.DecompressionMethods AutomaticDecompression { get; set; }
```

Gets or sets the type of decompression method used by the handler for automatic decompression of the HTTP content response.

Returns: To be added.

#### Remarks
The default value for this property is `None`.

## WinHttpHandler.AutomaticRedirection property

```csharp
public bool AutomaticRedirection { get; set; }
```

Gets or sets a value that indicates whether the handler should follow HTTP redirection responses.

Returns: `true` to follow HTTP redirection responses; otherwise, `false`. The default is `true`.

#### Remarks

When this property is set to `true`, all HTTP redirect responses from the server will be followed automatically except if they are redirecting from an HTTPS endpoint to an HTTP endpoint.

## WinHttpHandler.CheckCertificateRevocationList property

```csharp
public bool CheckCertificateRevocationList { get; set; }
```

Gets or sets a value that indicates whether to check the revocation list of certificates during SSL certificate validation.

Returns: `true` to check the revocation list of certificates during SSL certificate validation; otherwise, `false`. The default is `false`.

To be added.

## WinHttpHandler.ClientCertificateOption property

```csharp
public System.Net.Http.ClientCertificateOption ClientCertificateOption { get; set; }
```

Gets or sets a value that indicates if the certificate is automatically picked from the certificate store or if the caller is allowed to pass in a specific client certificate.

Returns: To be added.

#### Remarks
The default value for this property is `Manual`.

## WinHttpHandler.ClientCertificates property

```csharp
public System.Security.Cryptography.X509Certificates.X509Certificate2Collection ClientCertificates { get; }
```

Gets a collection of client authentication SSL certificates that are used for client authentication by the handler if the `WinHttpHandler.ClientCertificateOption` property is set to `Manual`.

Returns: To be added.

#### Remarks
The default value for this property is an empty collection.

## WinHttpHandler.CookieContainer property

```csharp
public System.Net.CookieContainer? CookieContainer { get; set; }
```

Gets or sets the managed cookie container object. This property is only used when the `WinHttpHandler.CookieUsePolicy` property is set to UseSpecifiedCookieContainer. Otherwise, the `WinHttpHandler.SendAsync` method will throw an exception.

Returns: To be added.

#### Remarks
The default value for this property is `null`.

## WinHttpHandler.CookieUsePolicy property

```csharp
public System.Net.Http.CookieUsePolicy CookieUsePolicy { get; set; }
```

Gets or sets a value that indicates how cookies should be managed and used. Developers can choose to ignore cookies, allow the handler to automatically manage them or manually handle them using a `CookieContainer` object.

Returns: To be added.

#### Remarks
The default for this property is `UseInternalCookieStoreOnly`. If this value is set to `UseSpecifiedCookieContainer`, then a container object must be initialized and assigned to the `CookieContainer` property. Otherwise, an exception will be thrown when trying to send a request.

## WinHttpHandler.DefaultProxyCredentials <example-value>

```csharp
public System.Net.ICredentials? DefaultProxyCredentials { get; set; }
```

When the default (system) proxy is used, gets or sets the credentials used to submit to the default proxy server for authentication.

Returns: The credentials used to authenticate the user to an authenticating proxy.

To be added.

## WinHttpHandler.EnableMultipleHttp2Connections property

```csharp
public bool EnableMultipleHttp2Connections { get; set; }
```

Gets or sets a value that indicates whether additional HTTP/2 connections can be established to the same server when the maximum number of concurrent streams is reached on all existing connections.

Returns: `true` if additional HTTP/2 connections are allowed to be created; otherwise, `false`.

To be added.

## WinHttpHandler.MaxAutomaticRedirections property

```csharp
public int MaxAutomaticRedirections { get; set; }
```

Gets or sets the maximum number of allowed HTTP redirects.

Returns: The maximum number of allowed HTTP redirects.

#### Remarks
The default value for this property is 50. This value only applies if `WinHttpHandler.AutomaticRedirection` is set to `true`.

## WinHttpHandler.MaxConnectionsPerServer property

```csharp
public int MaxConnectionsPerServer { get; set; }
```

Gets or sets the maximum number of TCP connections allowed to a single server.

Returns: The maximum number of TCP connections allowed to a single server.

#### Remarks
The default value for this property is `int.MaxValue`.

## WinHttpHandler.MaxResponseDrainSize property

```csharp
public int MaxResponseDrainSize { get; set; }
```

Gets or sets the maximum amount of data that can be drained from responses in bytes.

Returns: The maximum amount of data that can be drained from responses in bytes.

#### Remarks
Starting with .NET 10, the default value for this property is 1MB (1024 * 1024 B). For earlier versions, the value for this property is 64 KB (65 536 B)

## WinHttpHandler.MaxResponseHeadersLength property

```csharp
public int MaxResponseHeadersLength { get; set; }
```

Gets or sets the maximum length, in kilobytes (1024 bytes), of the response headers.

Returns: The maximum length, in kilobytes (1024 bytes), of the response headers.

#### Remarks
This property protects the client from an unauthorized server attempting to stall the client by sending a response with an infinite amount of header data. The default value for this property is 64 KB (equivalent to 65536 bytes).

## WinHttpHandler.PreAuthenticate property

```csharp
public bool PreAuthenticate { get; set; }
```

Gets or sets a value that indicates whether the handler sends an Authorization header with the request.

Returns: To be added.

#### Remarks
The default value for this property is `false`.

## WinHttpHandler.Properties property

```csharp
public System.Collections.Generic.IDictionary<string,object> Properties { get; }
```

Gets a writable dictionary (that is, a map) of custom properties for the `HttpClient` requests. The dictionary is initialized empty; you can insert and query key-value pairs for your custom handlers and special processing.

Returns: A writable dictionary of custom properties.

To be added.

## WinHttpHandler.Proxy property

```csharp
public System.Net.IWebProxy? Proxy { get; set; }
```

Gets or sets the custom proxy when the `WinHttpHandler.WindowsProxyUsePolicy` property is set to use a custom proxy.

Returns: To be added.

#### Remarks
The default value for this property is `null`.

## WinHttpHandler.ReceiveDataTimeout property

```csharp
public TimeSpan ReceiveDataTimeout { get; set; }
```

Gets or sets the timeout for receiving the data portion of a response from the server.

Returns: The timeout for receiving the data portion of a response from the server.

#### Remarks
The default value for this property is 30 seconds.

## WinHttpHandler.ReceiveHeadersTimeout property

```csharp
public TimeSpan ReceiveHeadersTimeout { get; set; }
```

Gets or sets the timeout for receiving the headers of a response from the server.

Returns: The timeout for receiving the headers of a response from the server.

#### Remarks
The default value for this property is 30 seconds.

## WinHttpHandler.SendTimeout property

```csharp
public TimeSpan SendTimeout { get; set; }
```

Gets or sets the timeout for sending a request.

Returns: The timeout for sending a request.

#### Remarks
The default value for this property is 30 seconds.

## WinHttpHandler.ServerCertificateValidationCallback property

```csharp
public Func<System.Net.Http.HttpRequestMessage,System.Security.Cryptography.X509Certificates.X509Certificate2,System.Security.Cryptography.X509Certificates.X509Chain,System.Net.Security.SslPolicyErrors,bool>? ServerCertificateValidationCallback { get; set; }
```

Gets or sets a callback method to validate the server certificate. This callback is part of the SSL handshake.

Returns: The callback should return `true` if the server certificate is considered valid and the request should be sent. Otherwise, returns `false`.

#### Remarks
The default value is `null`. If this property is `null`, the server certificate is validated using standard well-known certificate authorities.

The delegate's `sslPolicyErrors` argument contains any certificate errors returned by SSPI while authenticating the server. The `Boolean` value returned by this delegate determines whether the authentication is allowed to succeed.

#### Examples

The following code example implements the callback. If there are validation errors, this method returns `false` preventing communication with the unauthenticated server. Otherwise, it allows for additional validation and return `true` if the certificate is valid.

_Code sample not included: ~/snippets/csharp/System.Net.Http/WinHttpHandler/program.cs._
## WinHttpHandler.ServerCredentials <example-value>

```csharp
public System.Net.ICredentials? ServerCredentials { get; set; }
```

Gets or sets the credentials to be used by the client to authenticate to the server.

Returns: The credentials to be used by the client to authenticate to the server.

#### Remarks
The default value for this property is `null`.

## WinHttpHandler.SslProtocols property

```csharp
public System.Security.Authentication.SslProtocols SslProtocols { get; set; }
```

Gets or sets the collection of TLS/SSL protocols supported by the client.

Returns: The collection of TLS/SSL protocols supported by the client.

#### Remarks
The default value is `None`, which is the recommended value. It allows the operating system to choose the best protocol to use, and to block protocols that are not secure. For more information, see `SslProtocols`.

## WinHttpHandler.TcpKeepAliveEnabled property

```csharp
public bool TcpKeepAliveEnabled { get; set; }
```

Gets or sets a value indicating whether TCP keep-alive is enabled.

Returns: To be added.

#### Remarks

Only supported on Windows 10 version 2004 or newer.
If enabled, the values of `TcpKeepAliveInterval` and `TcpKeepAliveTime` will be forwarded
to set WINHTTP_OPTION_TCP_KEEPALIVE, enabling and configuring TCP keep-alive for the backing TCP socket.

## WinHttpHandler.TcpKeepAliveInterval property

```csharp
public TimeSpan TcpKeepAliveInterval { get; set; }
```

Gets or sets the TCP keep-alive interval.

Returns: To be added.

#### Remarks

Only supported on Windows 10 version 2004 or newer.
Has no effect if `TcpKeepAliveEnabled` is `false`.
The default value of this property is 1 second.

## WinHttpHandler.TcpKeepAliveTime property

```csharp
public TimeSpan TcpKeepAliveTime { get; set; }
```

Gets or sets the TCP keep-alive timeout.

Returns: To be added.

#### Remarks

Only supported on Windows 10 version 2004 or newer.
Has no effect if `TcpKeepAliveEnabled` is `false`.
The default value of this property is 2 hours.

## WinHttpHandler.WindowsProxyUsePolicy property

```csharp
public System.Net.Http.WindowsProxyUsePolicy WindowsProxyUsePolicy { get; set; }
```

Gets or sets the proxy setting. This property can be set to disable the proxy, use a custom proxy, or use the proxy settings of WinHTTP or WinInet on the machine.

Returns: To be added.

#### Remarks
The default value of this property is the WinHTTP stack proxy settings.

## WinHttpHandler.Dispose(Boolean) method

```csharp
protected override void Dispose (bool disposing);
```

Releases the unmanaged resources used by the `WinHttpHandler`, and optionally disposes of the managed resources.

Parameters:

- `disposing`: `true` to release both managed and unmanaged resources; `false` to release only unmanaged resources.

To be added.

## WinHttpHandler.SendAsync(HttpRequestMessage, CancellationToken) method

```csharp
protected override System.Threading.Tasks.Task<System.Net.Http.HttpResponseMessage> SendAsync (System.Net.Http.HttpRequestMessage request, System.Threading.CancellationToken <example-value>);
```

Sends an HTTP request as an asynchronous operation.

Parameters:

- `request`: The HTTP request message to send.
- `cancellationToken`: The cancellation token.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.
