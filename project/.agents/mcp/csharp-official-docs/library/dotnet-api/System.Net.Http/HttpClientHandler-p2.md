---
title: "HttpClientHandler class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Http/HttpClientHandler.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HttpClientHandler class (part 2 of 2)

## HttpClientHandler.ServerCertificateCustomValidationCallback property

```csharp
public Func<System.Net.Http.HttpRequestMessage,System.Security.Cryptography.X509Certificates.X509Certificate2?,System.Security.Cryptography.X509Certificates.X509Chain?,System.Net.Security.SslPolicyErrors,bool>? ServerCertificateCustomValidationCallback { get; set; }
```

Gets or sets a callback method to validate the server certificate.

Returns: A callback method to validate the server certificate.

#### Remarks
The `HttpClientHandler.ServerCertificateCustomValidationCallback` can be used to obtain and validate the server certificate.

#### Examples
The following code example displays the server certificate.

_Code sample not included: ~/snippets/csharp/System.Net.Http/HttpClientHandler/ServerCertificateCustomValidationCallback/program.cs._
## HttpClientHandler.SslProtocols property

```csharp
public System.Security.Authentication.SslProtocols SslProtocols { get; set; }
```

Gets or sets the TLS/SSL protocols used by the `HttpClient` objects managed by the HttpClientHandler object.

Returns: A bitwise combination of the enumeration values that specify the TLS/SSL protocols.

To be added.

## HttpClientHandler.SupportsAutomaticDecompression property

```csharp
public virtual bool SupportsAutomaticDecompression { get; }
```

Gets a value that indicates whether the handler supports automatic response content decompression.

Returns: `true` if the handler supports automatic response content decompression; otherwise `false`. The default value is `true`.

To be added.

## HttpClientHandler.SupportsProxy property

```csharp
public virtual bool SupportsProxy { get; }
```

Gets a value that indicates whether the handler supports proxy settings.

Returns: `true` if the if the handler supports proxy settings; otherwise `false`. The default value is `true`.

To be added.

## HttpClientHandler.SupportsRedirectConfiguration property

```csharp
public virtual bool SupportsRedirectConfiguration { get; }
```

Gets a value that indicates whether the handler supports configuration settings for the `HttpClientHandler.AllowAutoRedirect` and `HttpClientHandler.MaxAutomaticRedirections` properties.

Returns: `true` if the if the handler supports configuration settings for the `HttpClientHandler.AllowAutoRedirect` and `HttpClientHandler.MaxAutomaticRedirections` properties; otherwise `false`. The default value is `true`.

To be added.

## HttpClientHandler.UseCookies property

```csharp
public bool UseCookies { get; set; }
```

Gets or sets a value that indicates whether the handler uses the  `HttpClientHandler.CookieContainer` property  to store server cookies and uses these cookies when sending requests.

Returns: `true` if the if the handler supports uses the  `HttpClientHandler.CookieContainer` property  to store server cookies and uses these cookies when sending requests; otherwise `false`. The default value is `true`.

To be added.

## HttpClientHandler.UseDefaultCredentials <example-value>

```csharp
public bool UseDefaultCredentials { get; set; }
```

Gets or sets a value that controls whether default credentials are sent with requests by the handler.

Returns: `true` if the default credentials are used; otherwise `false`. The default value is `false`.

#### Remarks
Set this property to `true` when requests made by the `HttpClientHandler` object should, if requested by the server, be authenticated using the credentials of the currently logged on user. For client applications, this is the desired behavior in most scenarios. For middle-tier applications, such as ASP.NET applications, instead of using this property, you would typically set the `Credentials` property to the credentials of the client on whose behalf the request is made.

This property doesn't affect proxy credentials. When the default (system) proxy is being used, set credentials <example-value> by using the `DefaultProxyCredentials` property. When the proxy is set by the `Proxy` property, set credentials for the proxy via its `Credentials` property.

If this property has been set to `true` then, it has a side effect on `Credentials` property, and `Credentials` will be set to `DefaultCredentials`.

## HttpClientHandler.UseProxy property

```csharp
public bool UseProxy { get; set; }
```

Gets or sets a value that indicates whether the handler uses a proxy for requests.

Returns: `true` if the handler should use a proxy for requests; otherwise `false`. The default value is `true`.

To be added.

## HttpClientHandler.Dispose(Boolean) method

```csharp
protected override void Dispose (bool disposing);
```

Releases the unmanaged resources used by the `HttpClientHandler` and optionally disposes of the managed resources.

Parameters:

- `disposing`: `true` to release both managed and unmanaged resources; `false` to releases only unmanaged resources.

#### Remarks
This method is called by the public `Dispose()` method and the `Finalize` method, if it has been overridden. `Dispose()` invokes this method with the `disposing` parameter set to `true`. `Finalize` invokes this method with `disposing` set to `false`.

When the `disposing` parameter is `true`, this method releases all resources held by any managed objects that this `HttpClientHandler` references. This method invokes the `Dispose()` method of each referenced object.

## HttpClientHandler.Send(HttpRequestMessage, CancellationToken) method

```csharp
protected internal override System.Net.Http.HttpResponseMessage Send (System.Net.Http.HttpRequestMessage request, System.Threading.CancellationToken <example-value>);
```

Creates an instance of  `HttpResponseMessage` based on the information provided in the `HttpRequestMessage`.

Parameters:

- `request`: The HTTP request message.
- `cancellationToken`: A cancellation token to cancel the operation.

Returns: The HTTP response message.

Exceptions:

- `ArgumentNullException`: The `request` was `null`.
- `NotSupportedException`: For HTTP/2 and higher or when requesting version upgrade is enabled by `HttpVersionPolicy.RequestVersionOrHigher`.

-or-

If using custom class derived from `HttpContent` not overriding `HttpContent.SerializeToStream` method.

-or-

If using custom `HttpMessageHandler` not overriding `HttpMessageHandler.Send` method.
- `OperationCanceledException`: The request was canceled.

-or-

If the `OperationCanceledException` exception nests the `TimeoutException`:
The request failed due to timeout.

This exception is stored into the returned task.

To be added.

## HttpClientHandler.SendAsync(HttpRequestMessage, CancellationToken) method

```csharp
protected internal override System.Threading.Tasks.Task<System.Net.Http.HttpResponseMessage> SendAsync (System.Net.Http.HttpRequestMessage request, System.Threading.CancellationToken <example-value>);
```

Creates an instance of  `HttpResponseMessage` based on the information provided in the `HttpRequestMessage` as an operation that will not block.

Parameters:

- `request`: The HTTP request message.
- `cancellationToken`: A cancellation token to cancel the operation.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `ArgumentNullException`: The `request` was `null`.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks
This operation is does not block. It returns an instance of `Task<T>` to represent the asynchronous operation. When the operation completes, `Task<T>.Result` contains the response message.
