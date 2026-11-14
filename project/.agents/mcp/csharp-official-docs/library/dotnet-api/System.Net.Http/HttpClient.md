---
title: "HttpClient class (part 1 of 7)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Http/HttpClient.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HttpClient class

Namespace: `System.Net.Http`

```csharp
public class HttpClient : System.Net.Http.HttpMessageInvoker
```

Provides a class for sending HTTP requests and receiving HTTP responses from a resource identified by a URI.

The `HttpClient` class instance acts as a session to send HTTP requests. An `HttpClient` instance is a collection of settings applied to all requests executed by that instance. In addition, every `HttpClient` instance uses its own connection pool, isolating its requests from requests executed by other `HttpClient` instances.

#### Instancing

`HttpClient` is intended to be instantiated once and reused throughout the life of an application. `HttpClient` pools connections inside the handler instance and reuses a connection across multiple requests. If you instantiate an `HttpClient` class for every request, the number of sockets available under heavy loads might be exhausted. This exhaustion results in `SocketException` errors.

You can configure additional options by passing in a "handler", such as `HttpClientHandler` or `SocketsHttpHandler`, as part of the constructor. The connection properties on the handler cannot be changed once a request has been submitted, so one reason to create a new `HttpClient` instance would be if you need to change the connection properties. If different requests require different settings, this may also lead to an application having multiple `HttpClient` instances, where each instance is configured appropriately, and then requests are issued on the relevant client.

`HttpClient` only resolves DNS entries when a connection is created. It does not track any time to live (TTL) durations specified by the DNS server. If DNS entries change regularly, which can happen in some container scenarios, the client won't respect those updates. To solve this issue, you can limit the lifetime of the connection by setting the `PooledConnectionLifetime` property, so that DNS lookup is required when the connection is replaced.

```csharp
public class GoodController : ApiController
{
    private static readonly HttpClient httpClient;

    static GoodController()
    {
        var socketsHandler = new SocketsHttpHandler
        {
            PooledConnectionLifetime = TimeSpan.FromMinutes(2)
        };

        httpClient = new HttpClient(socketsHandler);
    }
}
```

As an alternative to creating only one `HttpClient` instance, you can also use `IHttpClientFactory` to manage the `HttpClient` instances for you. For more information, see Guidelines for using HttpClient.

#### Derivation

The `HttpClient` also acts as a base class for more specific HTTP clients. An example would be a `FacebookHttpClient` that provides additional methods specific to a Facebook web service (for example, a `GetFriends` method). Derived classes should not override the virtual methods on the class. Instead, use a constructor overload that accepts `HttpMessageHandler` to configure any pre-request or post-request processing.

#### Transports

The `HttpClient` is a high-level API that wraps the lower-level functionality available on each platform where it runs.

On each platform, `HttpClient` tries to use the best available transport:

| **Host/Runtime**            | **Backend**                                                                               |
| --------------------------- | ----------------------------------------------------------------------------------------- |
| Windows/.NET Framework      | `HttpWebRequest`                                                          |
| Windows/Mono                | `HttpWebRequest`                                                          |
| Windows/UWP                 | Windows native `WinHttpHandler` (HTTP 2.0 capable)                   |
| macOS/Mono                  | `HttpWebRequest`                                                          |
| Linux/Mono                  | `HttpWebRequest`                                                          |
| .NET                       | `SocketsHttpHandler`                    |

Users can also configure a specific transport for `HttpClient` by invoking the `HttpClient.%23ctor` constructor that takes an `HttpMessageHandler`.

The `SocketsHttpHandler` class provides the implementation used by higher-level HTTP networking classes such as `HttpClient`. The use of `SocketsHttpHandler` offers a number of advantages:

- High performance.
- The elimination of platform dependencies, which simplifies deployment and servicing.
- Consistent behavior across all .NET platforms.

#### Configure behavior using runtime configuration options

Certain aspects of `HttpClient`'s behavior are customizable through Runtime configuration options.

#### Connection pooling

`HttpClient` pools HTTP connections where possible and uses them for more than one request. This can have a significant performance benefit, especially for HTTPS requests, as the connection handshake is only done once.

Connection pool properties can be configured on a `HttpClientHandler` or `SocketsHttpHandler` passed in during construction, including `MaxConnectionsPerServer`, `PooledConnectionIdleTimeout`, and `PooledConnectionLifetime`.

Disposing of the `HttpClient` instance closes the open connections and cancels any pending requests.

> **Note:**
> If you concurrently send HTTP/1.1 requests to the same server, new connections can be created. Even if you reuse the `HttpClient` instance, if the rate of requests is high, or if there are any firewall limitations, that can exhaust the available sockets because of default TCP cleanup timers. To limit the number of concurrent connections, you can set the `MaxConnectionsPerServer` property. By default, the number of concurrent HTTP/1.1 connections is unlimited.

#### Buffering and request lifetime

By default, `HttpClient` methods (except `HttpClient.GetStreamAsync`) buffer the responses from the server, reading all the response body into memory before returning the async result. Those requests will continue until one of the following occurs:

- The `Task<T>` succeeds and returns a result.
- The `Timeout` is reached, in which case the `Task<T>` will be cancelled.
- The `CancellationToken` passable to some method overloads is fired.
- `CancelPendingRequests` is called.
- The HttpClient is disposed.

You can change the buffering behavior on a per-request basis using the `HttpCompletionOption` parameter available on some method overloads. This argument can be used to specify if the `Task<T>` should be considered complete after reading just the response headers, or after reading and buffering the response content.

If your app that uses `HttpClient` and related classes in the `Http` namespace intends to download large amounts of data (50 megabytes or more), then the app should stream those downloads and not use the default buffering. If you use the default buffering, the client memory usage will get very large, potentially resulting in substantially reduced performance.

#### Thread safety

The following methods are thread safe:

- `HttpClient.CancelPendingRequests`
- `HttpClient.DeleteAsync`
- `HttpClient.GetAsync`
- `HttpClient.GetByteArrayAsync`
- `HttpClient.GetStreamAsync`
- `HttpClient.GetStringAsync`
- `HttpClient.PostAsync`
- `HttpClient.PutAsync`
- `HttpClient.SendAsync`

#### Proxies

By default, `HttpClient` reads proxy configuration from environment variables or user/system settings, depending on the platform. You can change this behavior by passing a `WebProxy` or `IWebProxy` to, in order of precedence:

- The `Proxy` property on an `HttpClientHandler` passed in during `HttpClient` construction
- The `DefaultProxy` static property (affects all instances)

You can disable the proxy using `UseProxy`. The default configuration for Windows users is to try and detect a proxy using network discovery, which can be slow. For high throughput applications where it's known that a proxy isn't required, you should disable the proxy.

Proxy settings (like `Credentials`) should be changed only before the first request is made using the `HttpClient`. Changes made after using the `HttpClient` for the first time may not be reflected in subsequent requests.

#### Cookies

By default, `HttpClient` uses an `HttpClientHandler` whose `UseCookies` property is `true` and whose `CookieContainer` is shared by every request made through that `HttpClient` instance. This means any cookies returned by the server (for example, session or authentication cookies) are stored on the handler and are automatically sent back on subsequent requests made with the same `HttpClient` instance.

This behavior can cause problems for apps that reuse an `HttpClient` instance, or a handler, across multiple users or logical sessions, such as a server-side app that handles requests for many users, or an app that uses `IHttpClientFactory` to create and cache handlers. Cookies received while serving one user's request could be unintentionally sent on a subsequent, unrelated request, leading to information disclosure or authentication mix-ups.

If you don't need automatic cookie handling, set `UseCookies` to `false` on the handler passed to the `HttpClient` constructor, and manage cookies explicitly using request and response headers instead. Alternatively, if you do need automatic cookie handling, ensure each user or session uses its own `HttpClient` instance, or its own `CookieContainer`, so that cookies aren't shared across users.

#### Timeouts

You can use `Timeout` to set a default timeout for all HTTP requests from the `HttpClient` instance. The timeout only applies to the xxxAsync methods that cause a request/response to be initiated. If the timeout is reached, the `Task<T>` for that request is cancelled.

You can set some additional timeouts if you pass in a `SocketsHttpHandler` instance when constructing the `HttpClient` object:

| Property | Description |
| ------------ | -------------- |
| `ConnectTimeout` | Specifies a timeout that's used when a request requires a new TCP connection to be created. If the timeout occurs, the request `Task<T>` is cancelled. |
| `PooledConnectionLifetime` | Specifies a timeout to be used for each connection in the connection pool. If the connection is idle, the connection is immediately closed; otherwise, the connection is closed at the end of the current request. |
| `PooledConnectionIdleTimeout` | If a connection in the connection pool is idle for this long, the connection is closed. |
| `Expect100ContinueTimeout` | If request has an "Expect: 100-continue" header, it delays sending content until the timeout or until a "100-continue" response is received. |

`HttpClient` only resolves DNS entries when the connections are created. It does not track any time to live (TTL) durations specified by the DNS server. If DNS entries are changing regularly, which can happen in some container scenarios, you can use the `PooledConnectionLifetime` to limit the lifetime of the connection so that DNS lookup is required when replacing the connection.

_Code sample not included: ~/snippets/csharp/System.Net.Http/HttpClient/source.cs._

## HttpClient.HttpClient() constructor

```csharp
public HttpClient ();
```

Initializes a new instance of the `HttpClient` class using a `HttpClientHandler` that is disposed when this instance is disposed.

#### Remarks
Using this constructor is equivalent to calling the `HttpClient(new HttpClientHandler(), true)`) constructor.

## HttpClient.HttpClient(HttpMessageHandler) constructor

```csharp
public HttpClient (System.Net.Http.HttpMessageHandler handler);
```

Initializes a new instance of the `HttpClient` class with the specified handler. The handler is disposed when this instance is disposed.

Parameters:

- `handler`: The HTTP handler stack to use for sending requests.

Exceptions:

- `ArgumentNullException`: The `handler` is `null`.

#### Remarks
Using this constructor is equivalent to calling the `HttpClient(handler, true)`) constructor.

The specified `handler` will be disposed of by calling HttpClient.Dispose.

## HttpClient.HttpClient(HttpMessageHandler, Boolean) constructor

```csharp
public HttpClient (System.Net.Http.HttpMessageHandler handler, bool disposeHandler);
```

Initializes a new instance of the `HttpClient` class with the provided handler, and specifies whether that handler should be disposed when this instance is disposed.

Parameters:

- `handler`: The `HttpMessageHandler` responsible for processing the HTTP response messages.
- `disposeHandler`: `true` if the inner handler should be disposed of by HttpClient.Dispose; `false` if you intend to reuse the inner handler.

Exceptions:

- `ArgumentNullException`: The `handler` is `null`.

To be added.

## HttpClient.BaseAddress property

```csharp
public Uri? BaseAddress { get; set; }
```

Gets or sets the base address of Uniform Resource Identifier (URI) of the Internet resource used when sending requests.

Returns: The base address of Uniform Resource Identifier (URI) of the Internet resource used when sending requests.

Exceptions:

- `ArgumentException`: The `Uri` specified is not an absolute URI.
- `InvalidOperationException`: The `HttpClient` instance has already started one or more requests.
- `ObjectDisposedException`: The `HttpClient` instance has already been disposed.

#### Remarks
When sending a `HttpRequestMessage` with a relative URI, the message URI is added to the `BaseAddress` property to create an absolute URI.

Note that all characters after the right-most "/" in the base URI are excluded when combined with the message URI. See RFC 3986 Uniform Resource Identifier Generic Syntax specification.
