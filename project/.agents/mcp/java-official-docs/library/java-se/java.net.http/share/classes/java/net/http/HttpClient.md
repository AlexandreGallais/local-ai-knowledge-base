---
title: "HttpClient class (java.net.http) (part 1 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.net.http/share/classes/java/net/http/HttpClient.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# HttpClient class (java.net.http)

```java
public abstract class HttpClient implements AutoCloseable
```

An HTTP Client.

 An `HttpClient` can be used to send requests and retrieve their responses. An `HttpClient` is created through a builder.
The newBuilder method returns a builder that creates
instances of the default `HttpClient` implementation.
The builder can be used to configure per-client state, like: the preferred
protocol version ( HTTP/1.1 or HTTP/2 ), whether to follow redirects, a
proxy, an authenticator, etc. Once built, an `HttpClient` is immutable,
and can be used to send multiple requests.

 An `HttpClient` provides configuration information, and resource
sharing, for all requests sent through it. An `HttpClient` instance
typically manages its own pools of connections, which it may then reuse
as and when necessary. Connection pools are  typically not shared between
`HttpClient` instances. Creating a new client for each operation,
though possible, will usually prevent reusing such connections.

 A BodyHandler must be supplied for each `HttpRequest` sent. The `BodyHandler` determines how to handle the
response body, if any. Once an `HttpResponse` is received, the
headers, response code, and body (typically) are available. Whether the
response body bytes have been read or not depends on the type, `T`, of
the response body.

 Requests can be sent either synchronously or asynchronously:

- BodyHandler) blocks
    until the request has been sent and the response has been received.

- BodyHandler) sends the
    request and receives the response asynchronously. The `sendAsync`
    method returns immediately with a CompletableFuture<`HttpResponse`>. The `CompletableFuture` completes when the response becomes available. The
    returned `CompletableFuture` can be combined in different ways to
    declare dependencies among several asynchronous tasks.

**Synchronous Example**

**Asynchronous Example**

**API note:** Resources allocated by the `HttpClient` may be
reclaimed early by closing the client.

**Implementation note:** The `BodyHandlers` and `BodySubscribers`
 classes provide some streaming or publishing {@code BodyHandler} and {@code BodySubscriber} implementations which allow to stream body data back to the caller.
 In order for the resources associated with these streams to be
 reclaimed, and for the HTTP request to be considered completed,
 a caller must eventually obtain the streaming response body and close, cancel, or
 read the returned streams to exhaustion. Likewise, a custom
 `BodySubscriber` implementation should either request all data until onComplete or onError is signalled, or eventually
 cancel its subscription.

The JDK built-in implementation of the `HttpClient` overrides
`close()`, `shutdown()`, `shutdownNow()`,
`awaitTermination(Duration)`, and `isTerminated()` to
provide a best effort implementation. Failing to close, cancel, or
read streaming or publishing bodies to exhaustion
may stop delivery of data while leaving the request open, and
stall an orderly shutdown. The `shutdownNow()` method, if called, will
attempt to cancel any such non-completed requests, but may cause
abrupt termination of any on going operation.

If not explicitly closed, the JDK
built-in implementation of the `HttpClient` releases
its resources when an `HttpClient` instance is no longer
strongly reachable, and all operations started on that instance have
eventually completed. This relies both on the garbage collector
to notice that the instance is no longer reachable, and on all
requests started on the client to eventually complete. Failure
to properly close streaming or publishing bodies
may prevent the associated requests from running to completion, and
prevent the resources allocated by the associated client from
being reclaimed by the garbage collector.

**Since:** 11

## HttpClient.HttpClient()

```java
protected HttpClient()
```

Creates an HttpClient.

## HttpClient.newHttpClient()

```java
public static HttpClient newHttpClient()
```

Returns a new `HttpClient` with default settings.

 Equivalent to `newBuilder().build()`.

 The default settings include: the "GET" request method, a preference
of HTTP/2, a redirection policy of
NEVER, the default proxy selector, and the default SSL context.

**Implementation note:** The system-wide default values are retrieved at the time the
`HttpClient` instance is constructed. Changing the system-wide
values after an `HttpClient` instance has been built, for
instance, by calling `ProxySelector.setDefault(ProxySelector)`
or `SSLContext.setDefault(SSLContext)`, has no effect on already
built instances.

**Returns:** a new HttpClient

Throws:

- `UncheckedIOException`: if necessary underlying IO resources required to build a new HttpClient cannot be allocated.

## HttpClient.newBuilder()

```java
public static Builder newBuilder()
```

Creates a new `HttpClient` builder.

 Builders returned by this method create instances
of the default `HttpClient` implementation.

**Returns:** an `HttpClient.Builder`

## HttpClient.NO_PROXY

```java
public static final ProxySelector NO_PROXY
```

A proxy selector that always return `Proxy.NO_PROXY` implying
a direct connection.

 This is a convenience object that can be passed to
`proxy(ProxySelector)` in order to build an instance of
`HttpClient` that uses no proxy.

## HttpClient.cookieHandler(CookieHandler)

```java
public Builder cookieHandler(CookieHandler cookieHandler)
```

Sets a cookie handler.

Parameters:

- `cookieHandler`: the cookie handler

**Returns:** this builder

## HttpClient.connectTimeout(Duration)

```java
public Builder connectTimeout(Duration duration)
```

Sets the connect timeout duration for this client.

 In the case where a new connection needs to be established, if
the connection cannot be established within the given `duration`, then HttpClient::send throws an `HttpConnectTimeoutException`, or
HttpClient::sendAsync completes exceptionally with an
`HttpConnectTimeoutException`. If a new connection does not
need to be established, for example if a connection can be reused
from a previous request, then this timeout duration has no effect.

Parameters:

- `duration`: the duration to allow the underlying connection to be established

**Returns:** this builder

Throws:

- `IllegalArgumentException`: if the duration is non-positive

## HttpClient.sslContext(SSLContext)

```java
public Builder sslContext(SSLContext sslContext)
```

Sets an `SSLContext`.

 If this method is not invoked prior to building, then newly built clients will use the default context, which is normally adequate
for client applications that do not need to specify protocols, or
require client authentication.

Parameters:

- `sslContext`: the SSLContext

**Returns:** this builder

## HttpClient.sslParameters(SSLParameters)

```java
public Builder sslParameters(SSLParameters sslParameters)
```

Sets an `SSLParameters`.

 If this method is not invoked prior to building, then newly built clients will use a default,
implementation specific, set of parameters.

 Some parameters which are used internally by the HTTP Client
implementation (such as the application protocol list) should not be
set by callers, as they may be ignored. The contents of the given
object are copied.

Parameters:

- `sslParameters`: the SSLParameters

**Returns:** this builder

## HttpClient.executor(Executor)

```java
public Builder executor(Executor executor)
```

Sets the executor to be used for asynchronous and dependent tasks.

 If this method is not invoked prior to building, a default executor is created for each newly built `HttpClient`.

Parameters:

- `executor`: the Executor

**Implementation note:** The default executor uses a thread pool, with a custom
thread factory.

**Returns:** this builder

## HttpClient.followRedirects(Redirect)

```java
public Builder followRedirects(Redirect policy)
```

Specifies whether requests will automatically follow redirects issued
by the server.

 If this method is not invoked prior to building, then newly built clients will use a default redirection
policy of NEVER.

Parameters:

- `policy`: the redirection policy

**Returns:** this builder

## HttpClient.version(HttpClient.Version)

```java
public Builder version(HttpClient.Version version)
```

Requests a specific HTTP protocol version where possible.

 If this method is not invoked prior to building, then newly built clients will prefer HTTP/2.

 If set to HTTP/2, then each request
will attempt to upgrade to HTTP/2. If the upgrade succeeds, then the
response to this request will use HTTP/2 and all subsequent requests
and responses to the same
origin server
will use HTTP/2. If the upgrade fails, then the response will be
handled using HTTP/1.1

Parameters:

- `version`: the requested HTTP protocol version

**Implementation note:** Constraints may also affect the selection of protocol version.
For example, if HTTP/2 is requested through a proxy, and if the implementation
does not support this mode, then HTTP/1.1 may be used

**Returns:** this builder

## HttpClient.priority(int)

```java
public Builder priority(int priority)
```

Sets the default priority for any HTTP/2 requests sent from this
client. The value provided must be between `1` and `256`
(inclusive).

Parameters:

- `priority`: the priority weighting

**Returns:** this builder

Throws:

- `IllegalArgumentException`: if the given priority is out of range

## HttpClient.proxy(ProxySelector)

```java
public Builder proxy(ProxySelector proxySelector)
```

Sets a `java.net.ProxySelector`.

Parameters:

- `proxySelector`: the ProxySelector

**API note:** ProxySelector::of
provides a `ProxySelector` which uses a single proxy for all
requests. The system-wide proxy selector can be retrieved by
`ProxySelector.getDefault()`.

**Implementation note:** If this method is not invoked prior to building,
then newly built clients will use the default proxy selector, which is usually
adequate for client applications. The default proxy selector supports
a set of system properties related to

proxy settings. This default behavior can be disabled by
supplying an explicit proxy selector, such as `NO_PROXY` or
one returned by ProxySelector::of, before building.

**Returns:** this builder

## HttpClient.authenticator(Authenticator)

```java
public Builder authenticator(Authenticator authenticator)
```

Sets an authenticator to use for HTTP authentication.

Parameters:

- `authenticator`: the Authenticator

**Implementation note:** In the JDK built-in implementation of the `HttpClient`,
if a `HttpRequest` has an `Authorization` or `Proxy-Authorization` header set then its value is used and
the `Authenticator` is not invoked for the corresponding
authentication. In this case, any authentication errors are returned
to the user and requests are not automatically retried.
Additionally, the JDK built-in implementation currently only supports HTTP
`Basic` authentication.

**Returns:** this builder

## HttpClient.build()

```java
public HttpClient build()
```

Returns a new `HttpClient` built from the current state of this
builder.

**Returns:** a new `HttpClient`

Throws:

- `UncheckedIOException`: may be thrown if underlying IO resources required by the implementation cannot be allocated. For instance, if the implementation requires a `Selector`, and opening one fails due to lack of necessary resources.

## HttpClient.cookieHandler()

```java
public abstract Optional<CookieHandler> cookieHandler()
```

Returns an `Optional` containing this client's `CookieHandler`. If no `CookieHandler` was set in this client's
builder, then the `Optional` is empty.

**Returns:** an `Optional` containing this client's `CookieHandler`

## HttpClient.connectTimeout()

```java
public abstract Optional<Duration> connectTimeout()
```

Returns an `Optional` containing the *connect timeout duration*
for this client. If the connect timeout duration was not set in the client's builder, then the
`Optional` is empty.

**Returns:** an `Optional` containing this client's connect timeout
        duration

## HttpClient.followRedirects()

```java
public abstract Redirect followRedirects()
```

Returns the follow redirects policy for this client. The default value
for client's built by builders that do not specify a redirect policy is
NEVER.

**Returns:** this client's follow redirects setting

## HttpClient.proxy()

```java
public abstract Optional<ProxySelector> proxy()
```

Returns an `Optional` containing the `ProxySelector`
supplied to this client. If no proxy selector was set in this client's
builder, then the `Optional` is empty.

 Even though this method may return an empty optional, the `HttpClient` may still have a non-exposed default proxy selector that is
used for sending HTTP requests.

**Returns:** an `Optional` containing the proxy selector supplied
       to this client.

## HttpClient.sslContext()

```java
public abstract SSLContext sslContext()
```

Returns this client's `SSLContext`.

 If no `SSLContext` was set in this client's builder, then the
default context is returned.

**Returns:** this client's SSLContext

## HttpClient.sslParameters()

```java
public abstract SSLParameters sslParameters()
```

Returns a copy of this client's `SSLParameters`.

 If no `SSLParameters` were set in the client's builder, then an
implementation specific default set of parameters, that the client will
use, is returned.

**Returns:** this client's `SSLParameters`

## HttpClient.authenticator()

```java
public abstract Optional<Authenticator> authenticator()
```

Returns an `Optional` containing the `Authenticator` set on
this client. If no `Authenticator` was set in the client's builder,
then the `Optional` is empty.

**Returns:** an `Optional` containing this client's `Authenticator`

## HttpClient.version()

```java
public abstract HttpClient.Version version()
```

Returns the preferred HTTP protocol version for this client. The default
value is `HttpClient.Version.HTTP_2`

**Implementation note:** Constraints may also affect the selection of protocol version.
For example, if HTTP/2 is requested through a proxy, and if the
implementation does not support this mode, then HTTP/1.1 may be used

**Returns:** the HTTP protocol version requested

## HttpClient.executor()

```java
public abstract Optional<Executor> executor()
```

Returns an `Optional` containing this client's `Executor`. If no `Executor` was set in the client's builder,
then the `Optional` is empty.

 Even though this method may return an empty optional, the `HttpClient` may still have an non-exposed default executor that is used for
executing asynchronous and dependent tasks.

**Returns:** an `Optional` containing this client's `Executor`
