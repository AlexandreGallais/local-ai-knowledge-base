# HttpRequest class (java.net.http)

```java
public abstract class HttpRequest
```

An HTTP request.

<p> An {@code HttpRequest} instance is built through an {@code HttpRequest}
{@linkplain HttpRequest.Builder builder}. An {@code HttpRequest} builder
is obtained from one of the {@link HttpRequest#newBuilder(URI) newBuilder}
methods. A request's {@link URI}, headers, and body can be set. Request
bodies are provided through a {@link BodyPublisher BodyPublisher} supplied
to one of the {@link Builder#POST(BodyPublisher) POST},
{@link Builder#PUT(BodyPublisher) PUT} or
{@link Builder#method(String,BodyPublisher) method} methods.
Once all required parameters have been set in the builder, {@link
Builder#build() build} will return the {@code HttpRequest}. Builders can be
copied and modified many times in order to build multiple related requests
that differ in some parameters.

<p> The following is an example of a GET request that prints the response
body as a String:

{@snippet :
  HttpClient client = HttpClient.newHttpClient();

  HttpRequest request = HttpRequest.newBuilder()
        .uri(URI.create("http://foo.com/"))
        .build();

  client.sendAsync(request, BodyHandlers.ofString())
        .thenApply(HttpResponse::body)
        .thenAccept(System.out::println)
        .join(); }

<p>The class {@link BodyPublishers BodyPublishers} provides implementations
of many common publishers. Alternatively, a custom {@code BodyPublisher}
implementation can be used.

@since 11

## HttpRequest.HttpRequest()

```java
protected HttpRequest()
```

Creates an HttpRequest.

## HttpRequest.uri(URI)

```java
public Builder uri(URI uri)
```

Sets this {@code HttpRequest}'s request {@code URI}.

@param uri the request URI
@return this builder
@throws IllegalArgumentException if the {@code URI} scheme is not
        supported

## HttpRequest.expectContinue(boolean)

```java
public Builder expectContinue(boolean enable)
```

Requests the server to acknowledge the request before sending the
body. This is disabled by default. If enabled, the server is
requested to send an error response or a {@code 100 Continue}
response before the client sends the request body. This means the
request publisher for the request will not be invoked until this
interim response is received.

@param enable {@code true} if Expect continue to be sent
@return this builder

## HttpRequest.version(HttpClient.Version)

```java
public Builder version(HttpClient.Version version)
```

Sets the preferred {@link HttpClient.Version} for this request.

<p> The corresponding {@link HttpResponse} should be checked for the
version that was actually used. If the version is not set in a
request, then the version requested will be that of the sending
{@link HttpClient}.

@param version the HTTP protocol version requested
@return this builder

## HttpRequest.header(String, String)

```java
public Builder header(String name, String value)
```

Adds the given name value pair to the set of headers for this request.
The given value is added to the list of values for that name.

@implNote An implementation may choose to restrict some header names
          or values, as the HTTP Client may determine their value itself.
          For example, "Content-Length", which will be determined by
          the request Publisher. In such a case, an implementation of
          {@code HttpRequest.Builder} may choose to throw an
          {@code IllegalArgumentException} if such a header is passed
          to the builder.

@param name the header name
@param value the header value
@return this builder
@throws IllegalArgumentException if the header name or value is not
        valid, see <a href="https://tools.ietf.org/html/rfc7230#section-3.2">
        RFC 7230 section-3.2</a>, or the header name or value is restricted
        by the implementation.

## HttpRequest.headers(String...)

```java
public Builder headers(String... headers)
```

Adds the given name value pairs to the set of headers for this
request. The supplied {@code String} instances must alternate as
header names and header values.
To add several values to the same name then the same name must
be supplied with each new value.

@param headers the list of name value pairs
@return this builder
@throws IllegalArgumentException if there are an odd number of
        parameters, or if a header name or value is not valid, see
        <a href="https://tools.ietf.org/html/rfc7230#section-3.2">
        RFC 7230 section-3.2</a>, or a header name or value is
        {@linkplain #header(String, String) restricted} by the
        implementation.

## HttpRequest.timeout(Duration)

```java
public abstract Builder timeout(Duration duration)
```

Sets a timeout for this request. If the response is not received
within the specified timeout then an {@link HttpTimeoutException} is
thrown from {@link HttpClient#send(java.net.http.HttpRequest,
java.net.http.HttpResponse.BodyHandler) HttpClient::send} or
{@link HttpClient#sendAsync(java.net.http.HttpRequest,
java.net.http.HttpResponse.BodyHandler) HttpClient::sendAsync}
completes exceptionally with an {@code HttpTimeoutException}. The effect
of not setting a timeout is the same as setting an infinite Duration,
i.e. block forever.

@param duration the timeout duration
@return this builder
@throws IllegalArgumentException if the duration is non-positive

## HttpRequest.setHeader(String, String)

```java
public Builder setHeader(String name, String value)
```

Sets the given name value pair to the set of headers for this
request. This overwrites any previously set values for name.

@param name the header name
@param value the header value
@return this builder
@throws IllegalArgumentException if the header name or value is not valid,
        see <a href="https://tools.ietf.org/html/rfc7230#section-3.2">
        RFC 7230 section-3.2</a>, or the header name or value is
        {@linkplain #header(String, String) restricted} by the
        implementation.

## HttpRequest.GET()

```java
public Builder GET()
```

Sets the request method of this builder to GET.
This is the default.

@return this builder

## HttpRequest.POST(BodyPublisher)

```java
public Builder POST(BodyPublisher bodyPublisher)
```

Sets the request method of this builder to POST and sets its
request body publisher to the given value.

@param bodyPublisher the body publisher

@return this builder

## HttpRequest.PUT(BodyPublisher)

```java
public Builder PUT(BodyPublisher bodyPublisher)
```

Sets the request method of this builder to PUT and sets its
request body publisher to the given value.

@param bodyPublisher the body publisher

@return this builder

## HttpRequest.DELETE()

```java
public Builder DELETE()
```

Sets the request method of this builder to DELETE.

@return this builder

## HttpRequest.method(String, BodyPublisher)

```java
public Builder method(String method, BodyPublisher bodyPublisher)
```

Sets the request method and request body of this builder to the
given values.

@apiNote The {@link BodyPublishers#noBody() noBody} request
body publisher can be used where no request body is required or
appropriate. Whether a method is restricted, or not, is
implementation specific. For example, some implementations may choose
to restrict the {@code CONNECT} method.

@param method the method to use
@param bodyPublisher the body publisher
@return this builder
@throws IllegalArgumentException if the method name is not
        valid, see <a href="https://tools.ietf.org/html/rfc7230#section-3.1.1">
        RFC 7230 section-3.1.1</a>, or the method is restricted by the
        implementation.

## HttpRequest.build()

```java
public HttpRequest build()
```

Builds and returns an {@link HttpRequest}.

@implSpec This method returns a new {@code HttpRequest} each time it is
invoked. Once built, the {@code HttpRequest} is immutable and can be
sent multiple times.

@return a new {@code HttpRequest}
@throws IllegalStateException if a URI has not been set

## HttpRequest.copy()

```java
public Builder copy()
```

Returns an exact duplicate copy of this {@code Builder} based on
current state. The new builder can then be modified independently of
this builder.

@return an exact copy of this builder

## HttpRequest.newBuilder(URI)

```java
public static HttpRequest.Builder newBuilder(URI uri)
```

Creates an {@code HttpRequest} builder with the given URI.

@param uri the request URI
@return a new request builder
@throws IllegalArgumentException if the URI scheme is not supported.

## HttpRequest.newBuilder(HttpRequest, BiPredicate<String, String>)

```java
public static Builder newBuilder(HttpRequest request, BiPredicate<String, String> filter)
```

Creates a {@code Builder} whose initial state is copied from an existing
{@code HttpRequest}.

<p> This builder can be used to build an {@code HttpRequest}, equivalent
to the original, while allowing amendment of the request state prior to
construction - for example, adding additional headers.

<p> The {@code filter} is applied to each header name value pair as they
are copied from the given request. When completed, only headers that
satisfy the condition as laid out by the {@code filter} will be present
in the {@code Builder} returned from this method.

@apiNote
The following scenarios demonstrate typical use-cases of the filter.
Given an {@code HttpRequest} <em>request</em>:
<br><br>
<ul>
 <li> Retain all headers:
 {@snippet :
 HttpRequest.newBuilder(request, (n, v) -> true) }

 <li> Remove all headers:
 {@snippet :
 HttpRequest.newBuilder(request, (n, v) -> false) }

 <li> Remove a particular header (e.g. Foo-Bar):
 {@snippet :
 HttpRequest.newBuilder(request, (name, value) -> !name.equalsIgnoreCase("Foo-Bar")) }
</ul>

@param request the original request
@param filter a header filter
@return a new request builder
@throws IllegalArgumentException if a new builder cannot be seeded from
        the given request (for instance, if the request contains illegal
        parameters)
@since 16

## HttpRequest.newBuilder()

```java
public static HttpRequest.Builder newBuilder()
```

Creates an {@code HttpRequest} builder.

@return a new request builder

## HttpRequest.bodyPublisher()

```java
public abstract Optional<BodyPublisher> bodyPublisher()
```

Returns an {@code Optional} containing the {@link BodyPublisher} set on
this request. If no {@code BodyPublisher} was set in the requests's
builder, then the {@code Optional} is empty.

@return an {@code Optional} containing this request's {@code BodyPublisher}

## HttpRequest.method()

```java
public abstract String method()
```

Returns the request method for this request. If not set explicitly,
the default method for any request is "GET".

@return this request's method

## HttpRequest.timeout()

```java
public abstract Optional<Duration> timeout()
```

Returns an {@code Optional} containing this request's timeout duration.
If the timeout duration was not set in the request's builder, then the
{@code Optional} is empty.

@return an {@code Optional} containing this request's timeout duration

## HttpRequest.expectContinue()

```java
public abstract boolean expectContinue()
```

Returns this request's {@linkplain HttpRequest.Builder#expectContinue(boolean)
expect continue} setting.

@return this request's expect continue setting

## HttpRequest.uri()

```java
public abstract URI uri()
```

Returns this request's {@code URI}.

@return this request's URI

## HttpRequest.version()

```java
public abstract Optional<HttpClient.Version> version()
```

Returns an {@code Optional} containing the HTTP protocol version that
will be requested for this {@code HttpRequest}. If the version was not
set in the request's builder, then the {@code Optional} is empty.
In that case, the version requested will be that of the sending
{@link HttpClient}. The corresponding {@link HttpResponse} should be
queried to determine the version that was actually used.

@return HTTP protocol version

## HttpRequest.headers()

```java
public abstract HttpHeaders headers()
```

The (user-accessible) request headers that this request was (or will be)
sent with.

@return this request's HttpHeaders

## HttpRequest.equals(Object)

```java
public final boolean equals(Object obj)
```

Tests this HTTP request instance for equality with the given object.

<p> If the given object is not an {@code HttpRequest} then this
method returns {@code false}. Two HTTP requests are equal if their URI,
method, and headers fields are all equal.

<p> This method satisfies the general contract of the {@link
Object#equals(Object) Object.equals} method.

@param obj the object to which this object is to be compared
@return {@code true} if, and only if, the given object is an {@code
        HttpRequest} that is equal to this HTTP request

## HttpRequest.hashCode()

```java
public final int hashCode()
```

Computes a hash code for this HTTP request instance.

<p> The hash code is based upon the HTTP request's URI, method, and
header components, and satisfies the general contract of the
{@link Object#hashCode Object.hashCode} method.

@return the hash-code value for this HTTP request

## HttpRequest.fromPublisher(Flow.Publisher<? extends ByteBuffer>)

```java
public static BodyPublisher fromPublisher(Flow.Publisher<? extends ByteBuffer> publisher)
```

Returns a request body publisher whose body is retrieved from the
given {@code Flow.Publisher}. The returned request body publisher
has an unknown content length.

@apiNote This method can be used as an adapter between {@code
BodyPublisher} and {@code Flow.Publisher}, where the amount of
request body that the publisher will publish is unknown.

@param publisher the publisher responsible for publishing the body
@return a BodyPublisher

## HttpRequest.fromPublisher(Flow.Publisher<? extends ByteBuffer>, long)

```java
public static BodyPublisher fromPublisher(Flow.Publisher<? extends ByteBuffer> publisher, long contentLength)
```

Returns a request body publisher whose body is retrieved from the
given {@code Flow.Publisher}. The returned request body publisher
has the given content length.

<p> The given {@code contentLength} is a positive number, that
represents the exact amount of bytes the {@code publisher} must
publish.

@apiNote This method can be used as an adapter between {@code
BodyPublisher} and {@code Flow.Publisher}, where the amount of
request body that the publisher will publish is known.

@param publisher the publisher responsible for publishing the body
@param contentLength a positive number representing the exact
                     amount of bytes the publisher will publish
@throws IllegalArgumentException if the content length is
                                 non-positive
@return a BodyPublisher

## HttpRequest.ofString(String)

```java
public static BodyPublisher ofString(String body)
```

Returns a request body publisher whose body is the given {@code
String}, converted using the {@link StandardCharsets#UTF_8 UTF_8}
character set.

@param body the String containing the body
@return a BodyPublisher

## HttpRequest.ofString(String, Charset)

```java
public static BodyPublisher ofString(String s, Charset charset)
```

Returns a request body publisher whose body is the given {@code
String}, converted using the given character set.

@param s the String containing the body
@param charset the character set to convert the string to bytes
@return a BodyPublisher

## HttpRequest.ofInputStream(Supplier<? extends InputStream>)

```java
public static BodyPublisher ofInputStream(Supplier<? extends InputStream> streamSupplier)
```

A request body publisher that reads its data from an {@link
InputStream}. A {@link Supplier} of {@code InputStream} is used in
case the request needs to be repeated, as the content is not buffered.
The {@code Supplier} may return {@code null} on subsequent attempts,
in which case the request fails.

@param streamSupplier a Supplier of open InputStreams
@return a BodyPublisher

## HttpRequest.ofByteArray(byte[])

```java
public static BodyPublisher ofByteArray(byte[] buf)
```

Returns a request body publisher whose body is the given byte array.

@param buf the byte array containing the body
@return a BodyPublisher

## HttpRequest.ofByteArray(byte[], int, int)

```java
public static BodyPublisher ofByteArray(byte[] buf, int offset, int length)
```

Returns a request body publisher whose body is the content of the
given byte array of {@code length} bytes starting from the specified
{@code offset}.

@param buf the byte array containing the body
@param offset the offset of the first byte
@param length the number of bytes to use
@return a BodyPublisher
@throws IndexOutOfBoundsException if the sub-range is defined to be
                                  out of bounds

## HttpRequest.ofFile(Path)

```java
public static BodyPublisher ofFile(Path path) throws FileNotFoundException
```

A request body publisher that takes data from the contents of a File.

@param  path the path to the file containing the body
@return a BodyPublisher
@throws java.io.FileNotFoundException if the path is not found

## HttpRequest.ofByteArrays(Iterable<byte[]>)

```java
public static BodyPublisher ofByteArrays(Iterable<byte[]> iter)
```

A request body publisher that takes data from an {@code Iterable}
of byte arrays. An {@link Iterable} is provided which supplies
{@link Iterator} instances. Each attempt to send the request results
in one invocation of the {@code Iterable}.

@param iter an Iterable of byte arrays
@return a BodyPublisher

## HttpRequest.noBody()

```java
public static BodyPublisher noBody()
```

A request body publisher which sends no request body.

@return a BodyPublisher which completes immediately and sends
        no request body.

## HttpRequest.concat(BodyPublisher...)

```java
public static BodyPublisher concat(BodyPublisher... publishers)
```

Returns a {@code BodyPublisher} that publishes a request
body consisting of the concatenation of the request bodies
published by a sequence of publishers.

<p> If the sequence is empty an {@linkplain #noBody() empty} publisher
is returned. Otherwise, if the sequence contains a single element,
that publisher is returned. Otherwise a <em>concatenation publisher</em>
is returned.

<p> The request body published by a <em>concatenation publisher</em>
is logically equivalent to the request body that would have
been published by concatenating all the bytes of each publisher
in sequence.

<p> Each publisher is lazily subscribed to in turn,
until all the body bytes are published, an error occurs, or the
concatenation publisher's subscription is cancelled.
The concatenation publisher may be subscribed to more than once,
which in turn may result in the publishers in the sequence being
subscribed to more than once.

<p> The concatenation publisher has a known content
length only if all publishers in the sequence have a known content
length. The {@link BodyPublisher#contentLength() contentLength}
reported by the concatenation publisher is computed as follows:
<ul>
    <li> If any of the publishers reports an <em>{@linkplain
        BodyPublisher#contentLength() unknown}</em> content length,
        or if the sum of the known content lengths would exceed
        {@link Long#MAX_VALUE}, the resulting
        content length is <em>unknown</em>.</li>
    <li> Otherwise, the resulting content length is the sum of the
        known content lengths, a number between
        {@code 0} and {@link Long#MAX_VALUE}, inclusive.</li>
</ul>

@implNote If the concatenation publisher's subscription is
{@linkplain Flow.Subscription#cancel() cancelled}, or an error occurs
while publishing the bytes, not all publishers in the sequence may
be subscribed to.

@param publishers a sequence of publishers.
@return An aggregate publisher that publishes a request body
logically equivalent to the concatenation of all bytes published
by each publisher in the sequence.

@since 16