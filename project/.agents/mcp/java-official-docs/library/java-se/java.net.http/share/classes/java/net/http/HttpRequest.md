---
title: "HttpRequest class (java.net.http) (part 1 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.net.http/share/classes/java/net/http/HttpRequest.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# HttpRequest class (java.net.http)

```java
public abstract class HttpRequest
```

An HTTP request.

 An `HttpRequest` instance is built through an `HttpRequest`
builder. An `HttpRequest` builder
is obtained from one of the newBuilder
methods. A request's `URI`, headers, and body can be set. Request
bodies are provided through a BodyPublisher supplied
to one of the POST,
PUT or
method methods.
Once all required parameters have been set in the builder, build will return the `HttpRequest`. Builders can be
copied and modified many times in order to build multiple related requests
that differ in some parameters.

 The following is an example of a GET request that prints the response
body as a String:

The class BodyPublishers provides implementations
of many common publishers. Alternatively, a custom `BodyPublisher`
implementation can be used.

**Since:** 11

## HttpRequest.HttpRequest()

```java
protected HttpRequest()
```

Creates an HttpRequest.

## HttpRequest.uri(URI)

```java
public Builder uri(URI uri)
```

Sets this `HttpRequest`'s request `URI`.

Parameters:

- `uri`: the request URI

**Returns:** this builder

Throws:

- `IllegalArgumentException`: if the `URI` scheme is not supported

## HttpRequest.expectContinue(boolean)

```java
public Builder expectContinue(boolean enable)
```

Requests the server to acknowledge the request before sending the
body. This is disabled by default. If enabled, the server is
requested to send an error response or a `100 Continue`
response before the client sends the request body. This means the
request publisher for the request will not be invoked until this
interim response is received.

Parameters:

- `enable`: `true` if Expect continue to be sent

**Returns:** this builder

## HttpRequest.version(HttpClient.Version)

```java
public Builder version(HttpClient.Version version)
```

Sets the preferred `HttpClient.Version` for this request.

 The corresponding `HttpResponse` should be checked for the
version that was actually used. If the version is not set in a
request, then the version requested will be that of the sending
`HttpClient`.

Parameters:

- `version`: the HTTP protocol version requested

**Returns:** this builder

## HttpRequest.header(String, String)

```java
public Builder header(String name, String value)
```

Adds the given name value pair to the set of headers for this request.
The given value is added to the list of values for that name.

Parameters:

- `name`: the header name
- `value`: the header value

**Implementation note:** An implementation may choose to restrict some header names
          or values, as the HTTP Client may determine their value itself.
          For example, "Content-Length", which will be determined by
          the request Publisher. In such a case, an implementation of
          `HttpRequest.Builder` may choose to throw an
          `IllegalArgumentException` if such a header is passed
          to the builder.

**Returns:** this builder

Throws:

- `IllegalArgumentException`: if the header name or value is not valid, see  RFC 7230 section-3.2, or the header name or value is restricted by the implementation.

## HttpRequest.headers(String...)

```java
public Builder headers(String... headers)
```

Adds the given name value pairs to the set of headers for this
request. The supplied `String` instances must alternate as
header names and header values.
To add several values to the same name then the same name must
be supplied with each new value.

Parameters:

- `headers`: the list of name value pairs

**Returns:** this builder

Throws:

- `IllegalArgumentException`: if there are an odd number of parameters, or if a header name or value is not valid, see  RFC 7230 section-3.2, or a header name or value is String) restricted by the implementation.

## HttpRequest.timeout(Duration)

```java
public abstract Builder timeout(Duration duration)
```

Sets a timeout for this request. If the response is not received
within the specified timeout then an `HttpTimeoutException` is
thrown from java.net.http.HttpResponse.BodyHandler) HttpClient::send or
java.net.http.HttpResponse.BodyHandler) HttpClient::sendAsync
completes exceptionally with an `HttpTimeoutException`. The effect
of not setting a timeout is the same as setting an infinite Duration,
i.e. block forever.

Parameters:

- `duration`: the timeout duration

**Returns:** this builder

Throws:

- `IllegalArgumentException`: if the duration is non-positive

## HttpRequest.setHeader(String, String)

```java
public Builder setHeader(String name, String value)
```

Sets the given name value pair to the set of headers for this
request. This overwrites any previously set values for name.

Parameters:

- `name`: the header name
- `value`: the header value

**Returns:** this builder

Throws:

- `IllegalArgumentException`: if the header name or value is not valid, see  RFC 7230 section-3.2, or the header name or value is String) restricted by the implementation.

## HttpRequest.GET()

```java
public Builder GET()
```

Sets the request method of this builder to GET.
This is the default.

**Returns:** this builder

## HttpRequest.POST(BodyPublisher)

```java
public Builder POST(BodyPublisher bodyPublisher)
```

Sets the request method of this builder to POST and sets its
request body publisher to the given value.

Parameters:

- `bodyPublisher`: the body publisher

**Returns:** this builder

## HttpRequest.PUT(BodyPublisher)

```java
public Builder PUT(BodyPublisher bodyPublisher)
```

Sets the request method of this builder to PUT and sets its
request body publisher to the given value.

Parameters:

- `bodyPublisher`: the body publisher

**Returns:** this builder

## HttpRequest.DELETE()

```java
public Builder DELETE()
```

Sets the request method of this builder to DELETE.

**Returns:** this builder

## HttpRequest.method(String, BodyPublisher)

```java
public Builder method(String method, BodyPublisher bodyPublisher)
```

Sets the request method and request body of this builder to the
given values.

Parameters:

- `method`: the method to use
- `bodyPublisher`: the body publisher

**API note:** The noBody request
body publisher can be used where no request body is required or
appropriate. Whether a method is restricted, or not, is
implementation specific. For example, some implementations may choose
to restrict the `CONNECT` method.

**Returns:** this builder

Throws:

- `IllegalArgumentException`: if the method name is not valid, see  RFC 7230 section-3.1.1, or the method is restricted by the implementation.

## HttpRequest.build()

```java
public HttpRequest build()
```

Builds and returns an `HttpRequest`.

**Implementation requirements:** This method returns a new `HttpRequest` each time it is
invoked. Once built, the `HttpRequest` is immutable and can be
sent multiple times.

**Returns:** a new `HttpRequest`

Throws:

- `IllegalStateException`: if a URI has not been set

## HttpRequest.copy()

```java
public Builder copy()
```

Returns an exact duplicate copy of this `Builder` based on
current state. The new builder can then be modified independently of
this builder.

**Returns:** an exact copy of this builder

## HttpRequest.newBuilder(URI)

```java
public static HttpRequest.Builder newBuilder(URI uri)
```

Creates an `HttpRequest` builder with the given URI.

Parameters:

- `uri`: the request URI

**Returns:** a new request builder

Throws:

- `IllegalArgumentException`: if the URI scheme is not supported.

## HttpRequest.newBuilder(HttpRequest, BiPredicate<String, String>)

```java
public static Builder newBuilder(HttpRequest request, BiPredicate<String, String> filter)
```

Creates a `Builder` whose initial state is copied from an existing
`HttpRequest`.

 This builder can be used to build an `HttpRequest`, equivalent
to the original, while allowing amendment of the request state prior to
construction - for example, adding additional headers.

 The `filter` is applied to each header name value pair as they
are copied from the given request. When completed, only headers that
satisfy the condition as laid out by the `filter` will be present
in the `Builder` returned from this method.

Parameters:

- `request`: the original request
- `filter`: a header filter

**API note:** The following scenarios demonstrate typical use-cases of the filter.
Given an `HttpRequest` *request*:

-  Retain all headers:

-  Remove all headers:

-  Remove a particular header (e.g. Foo-Bar):

**Returns:** a new request builder

**Since:** 16

Throws:

- `IllegalArgumentException`: if a new builder cannot be seeded from the given request (for instance, if the request contains illegal parameters)

## HttpRequest.newBuilder()

```java
public static HttpRequest.Builder newBuilder()
```

Creates an `HttpRequest` builder.

**Returns:** a new request builder

## HttpRequest.bodyPublisher()

```java
public abstract Optional<BodyPublisher> bodyPublisher()
```

Returns an `Optional` containing the `BodyPublisher` set on
this request. If no `BodyPublisher` was set in the requests's
builder, then the `Optional` is empty.

**Returns:** an `Optional` containing this request's `BodyPublisher`

## HttpRequest.method()

```java
public abstract String method()
```

Returns the request method for this request. If not set explicitly,
the default method for any request is "GET".

**Returns:** this request's method

## HttpRequest.timeout()

```java
public abstract Optional<Duration> timeout()
```

Returns an `Optional` containing this request's timeout duration.
If the timeout duration was not set in the request's builder, then the
`Optional` is empty.

**Returns:** an `Optional` containing this request's timeout duration

## HttpRequest.expectContinue()

```java
public abstract boolean expectContinue()
```

Returns this request's expect continue setting.

**Returns:** this request's expect continue setting

## HttpRequest.uri()

```java
public abstract URI uri()
```

Returns this request's `URI`.

**Returns:** this request's URI

## HttpRequest.version()

```java
public abstract Optional<HttpClient.Version> version()
```

Returns an `Optional` containing the HTTP protocol version that
will be requested for this `HttpRequest`. If the version was not
set in the request's builder, then the `Optional` is empty.
In that case, the version requested will be that of the sending
`HttpClient`. The corresponding `HttpResponse` should be
queried to determine the version that was actually used.

**Returns:** HTTP protocol version

## HttpRequest.headers()

```java
public abstract HttpHeaders headers()
```

The (user-accessible) request headers that this request was (or will be)
sent with.

**Returns:** this request's HttpHeaders

## HttpRequest.equals(Object)

```java
public final boolean equals(Object obj)
```

Tests this HTTP request instance for equality with the given object.

 If the given object is not an `HttpRequest` then this
method returns `false`. Two HTTP requests are equal if their URI,
method, and headers fields are all equal.

 This method satisfies the general contract of the Object.equals method.

Parameters:

- `obj`: the object to which this object is to be compared

**Returns:** `true` if, and only if, the given object is an `HttpRequest` that is equal to this HTTP request

## HttpRequest.hashCode()

```java
public final int hashCode()
```

Computes a hash code for this HTTP request instance.

 The hash code is based upon the HTTP request's URI, method, and
header components, and satisfies the general contract of the
Object.hashCode method.

**Returns:** the hash-code value for this HTTP request

## HttpRequest.fromPublisher(Flow.Publisher<? extends ByteBuffer>)

```java
public static BodyPublisher fromPublisher(Flow.Publisher<? extends ByteBuffer> publisher)
```

Returns a request body publisher whose body is retrieved from the
given `Flow.Publisher`. The returned request body publisher
has an unknown content length.

Parameters:

- `publisher`: the publisher responsible for publishing the body

**API note:** This method can be used as an adapter between `BodyPublisher` and `Flow.Publisher`, where the amount of
request body that the publisher will publish is unknown.

**Returns:** a BodyPublisher

## HttpRequest.fromPublisher(Flow.Publisher<? extends ByteBuffer>, long)

```java
public static BodyPublisher fromPublisher(Flow.Publisher<? extends ByteBuffer> publisher, long contentLength)
```

Returns a request body publisher whose body is retrieved from the
given `Flow.Publisher`. The returned request body publisher
has the given content length.

 The given `contentLength` is a positive number, that
represents the exact amount of bytes the `publisher` must
publish.

Parameters:

- `publisher`: the publisher responsible for publishing the body
- `contentLength`: a positive number representing the exact amount of bytes the publisher will publish

**API note:** This method can be used as an adapter between `BodyPublisher` and `Flow.Publisher`, where the amount of
request body that the publisher will publish is known.

**Returns:** a BodyPublisher

Throws:

- `IllegalArgumentException`: if the content length is non-positive

## HttpRequest.ofString(String)

```java
public static BodyPublisher ofString(String body)
```

Returns a request body publisher whose body is the given `String`, converted using the UTF_8
character set.

Parameters:

- `body`: the String containing the body

**Returns:** a BodyPublisher

## HttpRequest.ofString(String, Charset)

```java
public static BodyPublisher ofString(String s, Charset charset)
```

Returns a request body publisher whose body is the given `String`, converted using the given character set.

Parameters:

- `s`: the String containing the body
- `charset`: the character set to convert the string to bytes

**Returns:** a BodyPublisher

## HttpRequest.ofInputStream(Supplier<? extends InputStream>)

```java
public static BodyPublisher ofInputStream(Supplier<? extends InputStream> streamSupplier)
```

A request body publisher that reads its data from an `InputStream`. A `Supplier` of `InputStream` is used in
case the request needs to be repeated, as the content is not buffered.
The `Supplier` may return `null` on subsequent attempts,
in which case the request fails.

Parameters:

- `streamSupplier`: a Supplier of open InputStreams

**Returns:** a BodyPublisher

## HttpRequest.ofByteArray(byte[])

```java
public static BodyPublisher ofByteArray(byte[] buf)
```

Returns a request body publisher whose body is the given byte array.

Parameters:

- `buf`: the byte array containing the body

**Returns:** a BodyPublisher
