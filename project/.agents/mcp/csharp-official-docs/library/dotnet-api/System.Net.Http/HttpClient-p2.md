---
title: "HttpClient class (part 2 of 7)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Http/HttpClient.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HttpClient class (part 2 of 7)

## HttpClient.DefaultProxy property

```csharp
public static System.Net.IWebProxy DefaultProxy { get; set; }
```

Gets or sets the global HTTP proxy.

Returns: A proxy used by every HTTP request.

Exceptions:

- `ArgumentNullException`: The value passed cannot be `null`.

#### Remarks
This static property determines the default proxy that all `HttpClient` instances use if no proxy is set explicitly in the `HttpMessageHandler` passed through its constructor.

The default instance returned by this property will initialize following a different set of rules depending on your platform:
* **For Windows:** Reads proxy configuration from environment variables or, if those are not defined, from the user's proxy settings.

* **For macOS:** Reads proxy configuration from environment variables or, if those are not defined, from the system's proxy settings.

* **For Linux:** Reads proxy configuration from environment variables or, in case those are not defined, this property initializes a non-configured instance that bypasses all addresses.

The environment variables used for `DefaultProxy` initialization on Windows and Unix-based platforms are:
* HTTP_PROXY: the proxy server used on HTTP requests.
* HTTPS_PROXY: the proxy server used on HTTPS requests.
* ALL_PROXY: the proxy server used on HTTP and/or HTTPS requests in case HTTP_PROXY and/or HTTPS_PROXY are not defined.
* NO_PROXY: a comma-separated list of hostnames that should be excluded from proxying. Asterisks are not supported for wildcards; use a leading dot in case you want to match a subdomain. Examples: `NO_PROXY=.example.com` (with leading dot) will match `www.example.com`, but will not match `example.com`. `NO_PROXY=example.com` (without leading dot) will not match `www.example.com`. This behavior might be revisited in the future to match other ecosystems better.

On systems where environment variables are case-sensitive, the variable names may be all lowercase or all uppercase.  The lowercase names are checked first.

The proxy server may be a hostname or IP address, optionally followed by a colon and port number, or it may be an `http`, `https`, `socks4`, `socks4a`, or `socks5` URL. The URL cannot include any text after the hostname, IP, or port. If a scheme isn't specified, `http` is assumed.
The URL may optionally include a username and password for proxy authentication, but the password is ignored when using `socks4` or `socks4a` as the protocols have no support for password authentication.

* **`http`**: `http://[username:<example-password>@]hostname[:port]`
* **`https`**: `https://[username:<example-password>@]hostname[:port]`
* **`socks4`**: `socks4://[username@]hostname[:port]`
* **`socks4a`**: `socks4a://[username@]hostname[:port]`
* **`socks5`**: `socks5://[username:<example-password>@]hostname[:port]`

## HttpClient.DefaultRequestHeaders property

```csharp
public System.Net.Http.Headers.HttpRequestHeaders DefaultRequestHeaders { get; }
```

Gets the headers which should be sent with each request.

Returns: The headers which should be sent with each request.

#### Remarks
Headers set on this property don't need to be set on request messages again. `DefaultRequestHeaders` should not be modified while there are outstanding requests.

## HttpClient.DefaultRequestVersion property

```csharp
public Version DefaultRequestVersion { get; set; }
```

Gets or sets the default HTTP version used on subsequent requests made by this `HttpClient` instance.

Returns: The default version to use for any requests made with this `HttpClient` instance.

Exceptions:

- `ArgumentNullException`: In a set operation, `DefaultRequestVersion` is `null`.
- `InvalidOperationException`: The `HttpClient` instance has already started one or more requests.
- `ObjectDisposedException`: The `HttpClient` instance has already been disposed.

#### Remarks
`DefaultRequestVersion` is `Version11` by default.

The `DefaultRequestVersion` property specifies the default HTTP version to use for requests sent using this `HttpClient` instance when it constructs the `HttpRequestMessage` to send, specifically with calls to methods such as `HttpClient.DeleteAsync`, `HttpClient.GetAsync`, `HttpClient.GetByteArrayAsync`, `HttpClient.GetStreamAsync`, `HttpClient.GetStringAsync`, `HttpClient.PatchAsync`, `HttpClient.PostAsync`, and `HttpClient.PutAsync`.

The `DefaultRequestVersion` property doesn't apply to the `HttpClient.SendAsync` method. The `HttpRequestMessage` parameter passed as the argument to the `HttpClient.SendAsync` method has its own `Version` property that controls the HTTP version used for the request.

The `DefaultRequestVersion` property can be changed as long as the `HttpClient` instance has not started any request.

## HttpClient.DefaultVersionPolicy property

```csharp
public System.Net.Http.HttpVersionPolicy DefaultVersionPolicy { get; set; }
```

Gets or sets the default version policy for implicitly created requests in convenience methods, for example, `HttpClient.GetAsync` and `HttpClient.PostAsync`.

Returns: The HttpVersionPolicy used when the HTTP connection is established.

Exceptions:

- `InvalidOperationException`: The `HttpClient` instance has already started one or more requests.
- `ObjectDisposedException`: The `HttpClient` instance has already been disposed.

#### Remarks
This property has no effect on any of the `HttpClient.Send` or `HttpClient.SendAsync` overloads that accept an `HttpRequestMessage`.

## HttpClient.MaxResponseContentBufferSize property

```csharp
public long MaxResponseContentBufferSize { get; set; }
```

Gets or sets the maximum number of bytes to buffer when reading the response content.

Returns: The maximum number of bytes to buffer when reading the response content. The default value for this property is 2 gigabytes.

Exceptions:

- `ArgumentOutOfRangeException`: The size specified is less than or equal to zero
-or-

The size specified is greater than the maximum allowed buffer size.
- `InvalidOperationException`: An operation has already been started on the current instance.
- `ObjectDisposedException`: The current instance has been disposed.

#### Remarks
An app can set the `MaxResponseContentBufferSize` property to a lower value to limit the size of the response to buffer when reading the response. If the size of the response content is greater than the  `MaxResponseContentBufferSize` property, an exception is thrown.

## HttpClient.Timeout property

```csharp
public TimeSpan Timeout { get; set; }
```

Gets or sets the timespan to wait before the request times out.

Returns: The timespan to wait before the request times out.

Exceptions:

- `ArgumentOutOfRangeException`: The timeout specified is less than or equal to zero and is not `Timeout.InfiniteTimeSpan`

-or-

The timeout specified is greater than `Int32.MaxValue` milliseconds.
- `InvalidOperationException`: An operation has already been started on the current instance.
- `ObjectDisposedException`: The current instance has been disposed.

#### Remarks
The default value is 100,000 milliseconds (100 seconds).

To set an infinite timeout, set the property value to `InfiniteTimeSpan`.

A Domain Name System (DNS) query may take up to 15 seconds to return or time out. If your request contains a host name that requires resolution and you set `HttpClient.Timeout` to a value less than 15 seconds, it may take 15 seconds or more before a `WebException` is thrown to indicate a timeout on your request.

The same timeout will apply for all requests using this `HttpClient` instance.  You may also set different timeouts for individual requests using a `CancellationTokenSource` on a task. Note that only the shorter of the two timeouts will apply.

## Examples

The following example sets the `Timeout` property.

```csharp
HttpClient httpClient = new HttpClient();
httpClient.Timeout = TimeSpan.FromMinutes(10);
```

## HttpClient.CancelPendingRequests() method

```csharp
public void CancelPendingRequests ();
```

Cancels all pending requests on this instance.

#### Remarks
After calling this method, the `HttpClient` instance can still be used to execute additional requests.

## HttpClient.DeleteAsync(String) method

```csharp
public System.Threading.Tasks.Task<System.Net.Http.HttpResponseMessage> DeleteAsync (string? requestUri);
```

Sends a DELETE request to the specified URI as an asynchronous operation.

Parameters:

- `requestUri`: The URI the request is sent to.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `InvalidOperationException`: The request message was already sent by the `HttpClient` instance.

-or-

The `requestUri` is not an absolute URI.

-or-

`HttpClient.BaseAddress` is not set.
- `HttpRequestException`: The request failed due to an issue getting a valid HTTP response, such as network connectivity failure, DNS failure, server certificate validation error, or invalid server response. On .NET 8 and later versions, the reason is indicated by `HttpRequestException.HttpRequestError`.
- `OperationCanceledException`: The request failed due to timeout.

#### Remarks
This operation doesn't block. The returned `Task<T>` object will complete after the whole response (including content) is read.

> **Note:**
> In case of timeout, an `OperationCanceledException` that nests a `TimeoutException` is thrown.

## HttpClient.DeleteAsync(Uri) method

```csharp
public System.Threading.Tasks.Task<System.Net.Http.HttpResponseMessage> DeleteAsync (Uri? requestUri);
```

Sends a DELETE request to the specified URI as an asynchronous operation.

Parameters:

- `requestUri`: The URI the request is sent to.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `InvalidOperationException`: The request message was already sent by the `HttpClient` instance.

-or-

The `requestUri` is not an absolute URI.

-or-

`HttpClient.BaseAddress` is not set.
- `HttpRequestException`: The request failed due to an issue getting a valid HTTP response, such as network connectivity failure, DNS failure, server certificate validation error, or invalid server response. On .NET 8 and later versions, the reason is indicated by `HttpRequestException.HttpRequestError`
- `OperationCanceledException`: The request failed due to timeout.

#### Remarks
This operation doesn't block. The returned `Task<T>` object will complete after the whole response (including content) is read.

> **Note:**
> In case of timeout, an `OperationCanceledException` that nests a `TimeoutException` is thrown.

## HttpClient.DeleteAsync(String, CancellationToken) method

```csharp
public System.Threading.Tasks.Task<System.Net.Http.HttpResponseMessage> DeleteAsync (string? requestUri, System.Threading.CancellationToken <example-value>);
```

Sends a DELETE request to the specified URI with a cancellation token as an asynchronous operation.

Parameters:

- `requestUri`: The URI the request is sent to.
- `cancellationToken`: A cancellation token that can be used by other objects or threads to receive notice of cancellation.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `InvalidOperationException`: The request message was already sent by the `HttpClient` instance.

-or-

The `requestUri` is not an absolute URI.

-or-

`HttpClient.BaseAddress` is not set.
- `HttpRequestException`: The request failed due to an issue getting a valid HTTP response, such as network connectivity failure, DNS failure, server certificate validation error, or invalid server response. On .NET 8 and later versions, the reason is indicated by `HttpRequestException.HttpRequestError`
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

-or-

The request failed due to timeout.

#### Remarks
This operation doesn't block. The returned `Task<T>` object will complete after the whole response (including content) is read.

> **Note:**
> In case of timeout, an `OperationCanceledException` that nests a `TimeoutException` is thrown.

## HttpClient.DeleteAsync(Uri, CancellationToken) method

```csharp
public System.Threading.Tasks.Task<System.Net.Http.HttpResponseMessage> DeleteAsync (Uri? requestUri, System.Threading.CancellationToken <example-value>);
```

Sends a DELETE request to the specified URI with a cancellation token as an asynchronous operation.

Parameters:

- `requestUri`: The URI the request is sent to.
- `cancellationToken`: A cancellation token that can be used by other objects or threads to receive notice of cancellation.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `InvalidOperationException`: The request message was already sent by the `HttpClient` instance.

-or-

The `requestUri` is not an absolute URI.

-or-

`HttpClient.BaseAddress` is not set.
- `HttpRequestException`: The request failed due to an issue getting a valid HTTP response, such as network connectivity failure, DNS failure, server certificate validation error, or invalid server response. On .NET 8 and later versions, the reason is indicated by `HttpRequestException.HttpRequestError`
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

-or-

The request failed due to timeout.

#### Remarks
This operation doesn't block. The returned `Task<T>` object will complete after the whole response (including content) is read.

> **Note:**
> In case of timeout, an `OperationCanceledException` that nests a `TimeoutException` is thrown.

## HttpClient.Dispose(Boolean) method

```csharp
protected override void Dispose (bool disposing);
```

Releases the unmanaged resources used by the `HttpClient` and optionally disposes of the managed resources.

Parameters:

- `disposing`: `true` to release both managed and unmanaged resources; `false` to releases only unmanaged resources.

#### Remarks
This method is called by the public `Dispose()` method and the `Finalize` method, if it has been overridden. `Dispose()` invokes this method with the `disposing` parameter set to `true`. `Finalize` invokes this method with `disposing` set to `false`.

When the `disposing` parameter is `true`, this method releases all resources held by any managed objects that this `HttpClient` references. This method invokes the `Dispose()` method of each referenced object.

When this method is called, the `HttpClient.CancelPendingRequests` method is called to abort all pending requests.
