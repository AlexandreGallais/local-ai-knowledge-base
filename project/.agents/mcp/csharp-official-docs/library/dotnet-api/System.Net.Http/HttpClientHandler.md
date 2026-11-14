---
title: "HttpClientHandler class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Http/HttpClientHandler.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HttpClientHandler class

Namespace: `System.Net.Http`

```csharp
public class HttpClientHandler : System.Net.Http.HttpMessageHandler
```

The default message handler used by `HttpClient` in .NET Framework.

The `HttpClientHandler` class and classes derived from it enable developers to configure a variety of options ranging from proxies to authentication.

The implementation of the `HttpClientHandler` class is based on the cross-platform HTTP protocol stack used by the `SocketsHttpHandler` class.

_Code sample not included: ~/snippets/csharp/System.Net.Http/HttpClientHandler/Overview/source.cs._
## HttpClientHandler.HttpClientHandler() constructor

```csharp
public HttpClientHandler ();
```

Creates an instance of a `HttpClientHandler` class.

To be added.

## HttpClientHandler.AllowAutoRedirect property

```csharp
public bool AllowAutoRedirect { get; set; }
```

Gets or sets a value that indicates whether the handler should follow redirection responses.

Returns: `true` if the handler should follow redirection responses; otherwise `false`. The default value is `true`.

#### Remarks
Set `HttpClientHandler.AllowAutoRedirect` to `true` if you want the handler to automatically follow HTTP redirection headers to the new location of the resource. The maximum number of redirections to follow is set by the `MaxAutomaticRedirections` property.

If `HttpClientHandler.AllowAutoRedirect` is set to `false`, all HTTP responses with an HTTP status code from 300 to 399 are returned to the application.

The Authorization header is cleared on auto-redirects and the handler automatically tries to re-authenticate to the redirected location. No other headers are cleared. In practice, this means that an application can't put custom authentication information into the Authorization header if it is possible to encounter redirection. Instead, the application must implement and register a custom authentication module.

If you are using cookies by specifically adding them to the `Headers` collection, these are not cleared when a redirect is followed, as the handler has no way of knowing what domain a cookie is allowed for. If you want to mimic browser behavior, use the `CookieContainer` class which allows you to specify the target domain for a cookie.

> **Note:**
> Setting `AllowAutoRedirect` to `true` **does not enable** automatic redirection to an HTTP URI from an HTTPS URI.

## HttpClientHandler.AutomaticDecompression property

```csharp
public System.Net.DecompressionMethods AutomaticDecompression { get; set; }
```

Gets or sets the type of decompression method used by the handler for automatic decompression of the HTTP content response.

Returns: The automatic decompression method used by the handler.

#### Remarks
Automatic decompression works only on the top most compression. So if the content is compressed multiple times, only the last compression will be decompressed.
For example, for a response with `Content-Encoding: gzip, br` header that contains content first compressed with gzip and then with Brotli, the content will only be decompressed using Brotli, leaving the still gzipped content in the `Content`.

Setting automatic decompression to anything other than `None` will result in adding `Accept-Encoding` header with the set values into every outgoing `HttpRequestMessage`.

## HttpClientHandler.CheckCertificateRevocationList property

```csharp
public bool CheckCertificateRevocationList { get; set; }
```

Gets or sets a value that indicates whether the certificate is checked against the certificate authority revocation list.

Returns: `true` if the certificate revocation list is checked; otherwise, `false`.

To be added.

## HttpClientHandler.ClientCertificateOptions property

```csharp
public System.Net.Http.ClientCertificateOption ClientCertificateOptions { get; set; }
```

Gets or sets a value that indicates if the certificate is automatically picked from the certificate store or if the caller is allowed to pass in a specific client certificate.

Returns: One of the enumeration values. The default value is `ClientCertificateOption.Manual`.

To be added.

## HttpClientHandler.ClientCertificates property

```csharp
public System.Security.Cryptography.X509Certificates.X509CertificateCollection ClientCertificates { get; }
```

Gets the collection of security certificates that are associated with requests to the server.

Returns: The X509CertificateCollection that is presented to the server when performing certificate based client authentication.

#### Remarks

The key usage attribute on the X509 certificate, if present, is required to have the value "Digital Signature" in order to be used when sending the request.

## HttpClientHandler.CookieContainer property

```csharp
public System.Net.CookieContainer CookieContainer { get; set; }
```

Gets or sets the cookie container used to store server cookies by the handler.

Returns: The cookie container used to store server cookies by the handler.

#### Remarks
The `CookieContainer` property provides an instance of the `CookieContainer` class that contains the cookies associated with this handler.

If the `UseCookies` property is `true`, the `CookieContainer` property represents the cookie container used to store the server cookies. The user can set custom cookies before sending requests using this property. If the  `UseCookies` property is false and the user adds cookies to `HttpClientHandler.CookieContainer`, cookies are ignored and not sent to the server. Setting the `HttpClientHandler.CookieContainer` to `null` will throw an exception.

## HttpClientHandler.Credentials <example-value>

```csharp
public System.Net.ICredentials? Credentials { get; set; }
```

Gets or sets authentication information used by this handler.

Returns: The authentication credentials <example-value> with the handler. The default is `null`.

#### Remarks

If the `UseDefaultCredentials` property has been set to `true`, it has a side effect on this property, and this property will be set to `DefaultCredentials`.

## HttpClientHandler.DangerousAcceptAnyServerCertificateValidator property

```csharp
public static Func<System.Net.Http.HttpRequestMessage,System.Security.Cryptography.X509Certificates.X509Certificate2?,System.Security.Cryptography.X509Certificates.X509Chain?,System.Net.Security.SslPolicyErrors,bool> DangerousAcceptAnyServerCertificateValidator { get; }
```

Gets a cached delegate that always returns `true`.

Returns: A cached delegate that always returns `true`.

#### Remarks
Particularly in test scenarios, a common pattern use `HttpClient` to connect to a server with a certificate that shouldn't be validated, such as a self-signed certificate. You commonly do this with `HttpClientHandler` by setting the `ServerCertificateCustomValidationCallback` property to a delegate that always returns `True`; this indicates that the certificate has passed validation. However, not all implementations support this callback, and some throw `PlatformNotSupportedException`.

The `DangerousAcceptAnyServerCertificateValidator` property addresses this limitation. The delegate returned by the `DangerousAcceptAnyServerCertificateValidator` property can be assigned to the `ServerCertificateCustomValidationCallback` property, as the following example does:

```csharp
handler.ServerCertificateCustomValidationCallback = HttpClientHandler.DangerousAcceptAnyServerCertificateValidator;
```

This gives `HttpClientHandler` implementations a known object reference identity that expresses the developer's intention. If the object stored in the `ServerCertificateCustomValidationCallback` property is reference equals to `HttpClientHandler.DangerousAcceptAnyServerCertificateValidator`, the runtime is able to entirely disable validation on a platform that would otherwise throw a `PlatformNotSupportedException`.

As a side benefit, developers can use this property to make it easier for tools to flag the danger of disabling certificate validation, which makes it easier for developers to avoid shipping insecure applications.

## HttpClientHandler.DefaultProxyCredentials <example-value>

```csharp
public System.Net.ICredentials? DefaultProxyCredentials { get; set; }
```

When the default (system) proxy is being used, gets or sets the credentials to submit to the default proxy server for authentication. The default proxy is used only when `HttpClientHandler.UseProxy` is set to `true` and `HttpClientHandler.Proxy` is set to `null`.

Returns: The credentials <example-value> to authenticate a request to the default proxy server.

To be added.

## HttpClientHandler.MaxAutomaticRedirections property

```csharp
public int MaxAutomaticRedirections { get; set; }
```

Gets or sets the maximum number of redirects that the handler follows.

Returns: The maximum number of redirection responses that the handler follows. The default value is 50.

#### Remarks
The `MaxAutomaticRedirections` property sets the maximum number of redirections for the request to follow if the `AllowAutoRedirect` property is `true`.

## HttpClientHandler.MaxConnectionsPerServer property

```csharp
public int MaxConnectionsPerServer { get; set; }
```

Gets or sets the maximum number of concurrent connections (per server endpoint) allowed when making requests using an `HttpClient` object. Note that the limit is per server endpoint, so for example a value of 256 would permit 256 concurrent connections to http://www.adatum.com/ and another 256 to http://www.adventure-works.com/.

Returns: The maximum number of concurrent connections (per server endpoint) allowed by an `HttpClient` object.

#### Remarks
The default value for this property is `int.MaxValue`.

## HttpClientHandler.MaxRequestContentBufferSize property

```csharp
public long MaxRequestContentBufferSize { get; set; }
```

Gets or sets the maximum request content buffer size used by the handler.

Returns: The maximum request content buffer size in bytes. The default value is 2 gigabytes.

#### Remarks
An app can set the `MaxRequestContentBufferSize` property to a lower value to limit the size of the request buffer. If the size of the request content is greater than the `MaxRequestContentBufferSize` property, an exception is thrown.

## HttpClientHandler.MaxResponseHeadersLength property

```csharp
public int MaxResponseHeadersLength { get; set; }
```

Gets or sets the maximum length, in kilobytes (1024 bytes), of the response headers. For example, if the value is 64, then 65536 bytes are allowed for the maximum response headers' length.

Returns: The maximum length, in kilobytes (1024 bytes), of the response headers.

To be added.

## HttpClientHandler.MeterFactory property

```csharp
public System.Diagnostics.Metrics.IMeterFactory? MeterFactory { get; set; }
```

Gets or sets the `IMeterFactory` to create a custom `Meter` for the `HttpClientHandler` instance.

Returns: To be added.

When `HttpClientHandler.MeterFactory` is set to a non-`null` value, all metrics emitted by the `HttpClientHandler` instance will be recorded using the `Meter` provided by the `IMeterFactory`.

## HttpClientHandler.PreAuthenticate property

```csharp
public bool PreAuthenticate { get; set; }
```

Gets or sets a value that indicates whether the handler sends an Authorization header with the request.

Returns: `true` for the handler to send an HTTP Authorization header with requests after authentication has taken place; otherwise, `false`. The default is `false`.

#### Remarks
After a client request to a specific `Uri` is successfully authenticated, if the `PreAuthenticate` property is `true` and credentials are supplied, `HttpClientHandler` matches against the credential list supplied in the  `Credentials` property. The Authorization header is sent with each request to any `Uri` that matches the specific `Uri` up to the last forward slash.

If the client request to a specific `Uri` is not successfully authenticated, the request uses standard authentication procedures.

With the exception of the first request, the `PreAuthenticate` property indicates whether to send authentication information with subsequent requests to a `Uri` that matches the specific `Uri` up to the last forward slash without waiting to be challenged by the server.

## HttpClientHandler.Properties property

```csharp
public System.Collections.Generic.IDictionary<string,object?> Properties { get; }
```

Gets a writable dictionary (that is, a map) of custom properties for the `HttpClient` requests. The dictionary is initialized empty; you can insert and query key-value pairs for your custom handlers and special processing.

Returns: a writable dictionary of custom properties.

To be added.

## HttpClientHandler.Proxy property

```csharp
public System.Net.IWebProxy? Proxy { get; set; }
```

Gets or sets proxy information used by the handler.

Returns: The proxy information used by the handler. The default value is `null`.

#### Remarks
The `Proxy` property identifies the `WebProxy` object to use to process requests to Internet resources. To specify that no proxy should be used, set the `Proxy` property to the proxy instance returned by the `GlobalProxySelection.GetEmptyWebProxy` method.

The local computer or application config file may specify that a default proxy be used. If the `Proxy` property is specified, then the proxy settings from the `Proxy` property override the local computer or application config file and the handler will use the proxy settings specified. If no proxy is specified in a config file and the `Proxy` property is unspecified, the handler uses the proxy settings inherited from Internet options on the local computer. If there are no proxy settings in Internet options, the request is sent directly to the server.

The `HttpClientHandler` class supports local proxy bypass. The class considers a destination to be local if any of the following conditions are met:

- The destination contains a flat name (no dots in the URL).
- The destination contains a loopback address (`Loopback` or `IPv6Loopback`) or the destination contains an `IPAddress` assigned to the local computer.
- The domain suffix of the destination matches the local computer's domain suffix (`IPGlobalProperties.DomainName`).
