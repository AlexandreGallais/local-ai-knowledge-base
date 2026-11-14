---
title: "SocketsHttpHandler class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Http/SocketsHttpHandler.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SocketsHttpHandler class (part 2 of 2)

## SocketsHttpHandler.MaxResponseDrainSize property

```csharp
public int MaxResponseDrainSize { get; set; }
```

Gets or sets the maximum amount of data that can be drained from responses in bytes.

Returns: The maximum amount of data that can be drained from responses in bytes.

Exceptions:

- `ArgumentOutOfRangeException`: The value specified is negative.
- `InvalidOperationException`: An operation has already been started on the current instance.
- `ObjectDisposedException`: The current instance has been disposed.

Draining occurs when a request is cancelled or a response is disposed prior to fully reading the content. If the number of bytes drained exceeds this amount, the connection will be closed rather than reused.

## SocketsHttpHandler.MaxResponseHeadersLength property

```csharp
public int MaxResponseHeadersLength { get; set; }
```

Gets or sets the maximum length, in kilobytes (1024 bytes), of the response headers.

Returns: The maximum size of the header portion from the server response, in kilobytes.

Exceptions:

- `ArgumentOutOfRangeException`: The value specified is less than or equal to zero.
- `InvalidOperationException`: An operation has already been started on the current instance.
- `ObjectDisposedException`: The current instance has been disposed.

For example, if the value is 64, then 65,536 bytes are allowed for the maximum response headers' length.

## SocketsHttpHandler.MeterFactory property

```csharp
public System.Diagnostics.Metrics.IMeterFactory? MeterFactory { get; set; }
```

Gets or sets the `IMeterFactory` to create a custom `Meter` for the `SocketsHttpHandler` instance.

Returns: To be added.

Exceptions:

- `InvalidOperationException`: An operation has already been started on the current instance.
- `ObjectDisposedException`: The current instance has been disposed.

When `SocketsHttpHandler.MeterFactory` is set to a non-`null` value, all metrics emitted by the `SocketsHttpHandler` instance will be recorded using the `Meter` provided by the `IMeterFactory`.

## SocketsHttpHandler.PlaintextStreamFilter property

```csharp
public Func<System.Net.Http.SocketsHttpPlaintextStreamFilterContext,System.Threading.CancellationToken,System.Threading.Tasks.ValueTask<System.IO.Stream>>? PlaintextStreamFilter { get; set; }
```

Gets or sets a custom callback that provides access to the plaintext HTTP protocol stream.

Returns: A callback that provides access to the plaintext HTTP protocol stream.

Exceptions:

- `InvalidOperationException`: An operation has already been started on the current instance.
- `ObjectDisposedException`: The current instance has been disposed.

To be added.

## SocketsHttpHandler.PooledConnectionIdleTimeout property

```csharp
public TimeSpan PooledConnectionIdleTimeout { get; set; }
```

Gets or sets how long a connection can be idle in the pool to be considered reusable.

Returns: The maximum idle time for a connection in the pool. The default value for this property is 1 minute.

Exceptions:

- `ArgumentOutOfRangeException`: The value specified is less than `TimeSpan.Zero` and is not `Timeout.InfiniteTimeSpan`.
- `InvalidOperationException`: An operation has already been started on the current instance.
- `ObjectDisposedException`: The current instance has been disposed.

To be added.

## SocketsHttpHandler.PooledConnectionLifetime property

```csharp
public TimeSpan PooledConnectionLifetime { get; set; }
```

Gets or sets how long a connection can be in the pool to be considered reusable.

Returns: The maximum time for a connection to be in the pool. The default value for this property is `Timeout.InfiniteTimeSpan`.

Exceptions:

- `ArgumentOutOfRangeException`: The value specified is less than `TimeSpan.Zero` (except `Timeout.InfiniteTimeSpan`).
- `InvalidOperationException`: An operation has already been started on the current instance.
- `ObjectDisposedException`: The current instance has been disposed.

#### Remarks
This property defines maximal connection lifetime in the pool, tracking its age from when the connection was established, regardless of how much time it spent idle or active. Connections are not torn down while actively being used to service requests. This lifetime is useful in order to allow connections to be reestablished periodically so as to better reflect DNS or other network changes.

If the connection endpoint is not the Domain name but the IP address, the value can be `InfiniteTimeSpan`.

## SocketsHttpHandler.PreAuthenticate property

```csharp
public bool PreAuthenticate { get; set; }
```

Gets or sets a value that indicates whether the handler sends an Authorization header with the request.

Returns: `true` if the handler sends an Authorization header with the request; otherwise, `false`.

Exceptions:

- `InvalidOperationException`: An operation has already been started on the current instance.
- `ObjectDisposedException`: The current instance has been disposed.

To be added.

## SocketsHttpHandler.Properties property

```csharp
public System.Collections.Generic.IDictionary<string,object?> Properties { get; }
```

Gets a writable dictionary (that is, a map) of custom properties for the HttpClient requests. The dictionary is initialized empty; you can insert and query key-value pairs for your custom handlers and special processing.

Returns: To be added.

To be added.

## SocketsHttpHandler.Proxy property

```csharp
public System.Net.IWebProxy? Proxy { get; set; }
```

Gets or sets the custom proxy when the `SocketsHttpHandler.UseProxy` property is `true`.

Returns: The custom proxy.

Exceptions:

- `InvalidOperationException`: An operation has already been started on the current instance.
- `ObjectDisposedException`: The current instance has been disposed.

To be added.

## SocketsHttpHandler.RequestHeaderEncodingSelector property

```csharp
public System.Net.Http.HeaderEncodingSelector<System.Net.Http.HttpRequestMessage>? RequestHeaderEncodingSelector { get; set; }
```

Gets or sets a callback that selects the `Encoding` to encode request header values.

Returns: The header encoding selector callback that selects the `Encoding` to encode the value for the specified request header name, or `null` to indicate the default behavior.

Exceptions:

- `InvalidOperationException`: An operation has already been started on the current instance.
- `ObjectDisposedException`: The current instance has been disposed.

#### Remarks

When specifying an encoding, you're generally expected to use one of the following encoding schemes: `ASCII`, `Latin1`, or `UTF8`. Other encoding schemes might be susceptible to request smuggling attacks.

> **Caution:**
> Fixed multi-byte encoding schemes in particular (for example, `Unicode` or `UTF32`) must never be used, as their binary representation is likely to be misinterpreted and break the protocol. For instance, part of `✊` might be interpreted as a new line (`\n`) that terminates the header value.

When you specify an encoding, it's your responsibility to ensure that the values are representable via the encoding, and that the server agrees on the encoding used. Otherwise, values will become corrupted. For example, since any set of bytes is considered a valid Latin1 sequence, a server replying with UTF-8 encoded header values might see its responses silently corrupted.

## SocketsHttpHandler.ResponseDrainTimeout property

```csharp
public TimeSpan ResponseDrainTimeout { get; set; }
```

Gets or sets the timespan to wait for data to be drained from responses.

Returns: The timespan to wait for data to be drained from responses.

Exceptions:

- `ArgumentOutOfRangeException`: The timeout specified is less than or equal to zero and is not `Timeout.InfiniteTimeSpan`

-or-

The timeout specified is greater than `Int32.MaxValue` milliseconds.
- `InvalidOperationException`: An operation has already been started on the current instance.
- `ObjectDisposedException`: The current instance has been disposed.

Draining occurs when a request is cancelled or a response is disposed prior to fully reading the content. If the time exceeds the value, the connection will be closed rather than reused.

## SocketsHttpHandler.ResponseHeaderEncodingSelector property

```csharp
public System.Net.Http.HeaderEncodingSelector<System.Net.Http.HttpRequestMessage>? ResponseHeaderEncodingSelector { get; set; }
```

Gets or sets a callback that selects the `Encoding` to decode response header values.

Returns: The header encoding selector callback that selects the `Encoding` to decode the value for the specified response header name, or `null` to indicate the default behavior.

Exceptions:

- `InvalidOperationException`: An operation has already been started on the current instance.
- `ObjectDisposedException`: The current instance has been disposed.

#### Remarks

When specifying an encoding, you're generally expected to use one of the following encoding schemes: `ASCII`, `Latin1`, or `UTF8`. Other encoding schemes might be susceptible to request smuggling attacks.

> **Caution:**
> Fixed multi-byte encoding schemes in particular (for example, `Unicode` or `UTF32`) must never be used, as their binary representation is likely to be misinterpreted and break the protocol. For instance, part of `✊` might be interpreted as a new line (`\n`) that terminates the header value.

When you specify an encoding, it's your responsibility to ensure that the values are representable via the encoding, and that the server agrees on the encoding used. Otherwise, values will become corrupted. For example, since any set of bytes is considered a valid Latin1 sequence, a server replying with UTF-8 encoded header values might see its responses silently corrupted.

## SocketsHttpHandler.ShouldEvictConnection property

```csharp
public Func<System.Net.Http.SocketsHttpConnectionEvictionContext,System.Threading.CancellationToken,System.Threading.Tasks.Task<bool>>? ShouldEvictConnection { get; set; }
```

To be added.

Returns: To be added.

To be added.

## SocketsHttpHandler.SslOptions property

```csharp
public System.Net.Security.SslClientAuthenticationOptions SslOptions { get; set; }
```

Gets or sets the set of options used for client TLS authentication.

Returns: The set of options used for client TLS authentication.

To be added.

## SocketsHttpHandler.UseCookies property

```csharp
public bool UseCookies { get; set; }
```

Gets or sets a value that indicates whether the handler should use cookies.

Returns: A value that indicates whether the handler should use cookies.

Exceptions:

- `InvalidOperationException`: An operation has already been started on the current instance.
- `ObjectDisposedException`: The current instance has been disposed.

To be added.

## SocketsHttpHandler.UseProxy property

```csharp
public bool UseProxy { get; set; }
```

Gets or sets a value that indicates whether the handler should use a proxy.

Returns: A value that indicates whether the handler should use a proxy.

Exceptions:

- `InvalidOperationException`: An operation has already been started on the current instance.
- `ObjectDisposedException`: The current instance has been disposed.

To be added.

## SocketsHttpHandler.Dispose(Boolean) method

```csharp
protected override void Dispose (bool disposing);
```

To be added.

Parameters:

- `disposing`: To be added.

To be added.

## SocketsHttpHandler.Send(HttpRequestMessage, CancellationToken) method

```csharp
protected internal override System.Net.Http.HttpResponseMessage Send (System.Net.Http.HttpRequestMessage request, System.Threading.CancellationToken <example-value>);
```

Sends an HTTP request.

Parameters:

- `request`: The HTTP request message to send.
- `cancellationToken`: The cancellation token.

Returns: The HTTP response message.

Exceptions:

- `NotSupportedException`: For HTTP/2 and higher or when requesting version upgrade is enabled by `HttpVersionPolicy.RequestVersionOrHigher`.

-or-

If using custom class derived from `HttpContent` not overriding `SerializeToStream` method.

-or-

If using custom `HttpMessageHandler` not overriding `Send` method.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.

## SocketsHttpHandler.SendAsync(HttpRequestMessage, CancellationToken) method

```csharp
protected internal override System.Threading.Tasks.Task<System.Net.Http.HttpResponseMessage> SendAsync (System.Net.Http.HttpRequestMessage request, System.Threading.CancellationToken <example-value>);
```

Sends an HTTP request as an asynchronous operation.

Parameters:

- `request`: The HTTP request message to send.
- `cancellationToken`: The cancellation token.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.
