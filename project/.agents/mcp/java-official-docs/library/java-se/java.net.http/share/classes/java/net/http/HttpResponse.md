---
title: "HttpResponse interface (java.net.http) (part 1 of 3)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.net.http/share/classes/java/net/http/HttpResponse.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# HttpResponse interface (java.net.http)

```java
public interface HttpResponse<T>
```

An HTTP response.

 An `HttpResponse` is not created directly, but rather returned as
a result of sending an `HttpRequest`. An `HttpResponse` is
made available when the response status code and headers have been received,
and typically after the response body has also been completely received.
Whether or not the `HttpResponse` is made available before the response
body has been completely received depends on the BodyHandler provided when sending the `HttpRequest`.

 This class provides methods for accessing the response status code,
headers, the response body, and the `HttpRequest` corresponding
to this response.

 The following is an example of retrieving a response as a String:

 The class BodyHandlers provides implementations
of many common response handlers. Alternatively, a custom `BodyHandler`
implementation can be used.

Parameters:

- `<T>`: the response body type

**Since:** 11

## HttpResponse.statusCode()

```java
public int statusCode()
```

Returns the status code for this response.

**Returns:** the response code

## HttpResponse.connectionLabel()

```java
default Optional<String> connectionLabel()
```

The format of the string is opaque, but the value is fixed and unique
for any connection in the scope of the associated `HttpClient`
instance.

**Implementation requirements:** The default implementation of this method returns
Optional.empty().

**Implementation note:** Instances of `HttpResponse` returned by the JDK built-in
implementation of `HttpClient` always return a non-empty value.

**Since:** 25

## HttpResponse.request()

```java
public HttpRequest request()
```

Returns the `HttpRequest` corresponding to this response.

 The returned `HttpRequest` may not be the initiating request
provided when BodyHandler) sending. For example, if the initiating request was redirected, then the
request returned by this method will have the redirected URI, which will
be different from the initiating request URI.

**See also:** #previousResponse()

**Returns:** the request

## HttpResponse.previousResponse()

```java
public Optional<HttpResponse<T>> previousResponse()
```

Returns an `Optional` containing the previous intermediate response
if one was received. An intermediate response is one that is received
as a result of redirection or authentication. If no previous response
was received then an empty `Optional` is returned.

**Returns:** an Optional containing the HttpResponse, if any.

## HttpResponse.headers()

```java
public HttpHeaders headers()
```

Returns the received response headers.

**Returns:** the response headers

## HttpResponse.body()

```java
public T body()
```

Returns the body. Depending on the type of `T`, the returned body
may represent the body after it was read (such as `byte[]`, or
`String`, or `Path`) or it may represent an object with
which the body is read, such as an `java.io.InputStream`.

 If this `HttpResponse` was returned from an invocation of
`previousResponse()` then this method returns `null`

**Returns:** the body

## HttpResponse.sslSession()

```java
public Optional<SSLSession> sslSession()
```

Returns an `Optional` containing the `SSLSession` in effect
for this response. Returns an empty `Optional` if this is not a
*HTTPS* response.

**Returns:** an `Optional` containing the `SSLSession` associated
        with the response

## HttpResponse.uri()

```java
public URI uri()
```

Returns the `URI` that the response was received from. This may be
different from the request `URI` if redirection occurred.

**Returns:** the URI of the response

## HttpResponse.version()

```java
public HttpClient.Version version()
```

Returns the HTTP protocol version that was used for this response.

**Returns:** HTTP protocol version

## HttpResponse.statusCode()

```java
public int statusCode()
```

Provides the response status code.

**Returns:** the response status code

## HttpResponse.headers()

```java
public HttpHeaders headers()
```

Provides the response headers.

**Returns:** the response headers

## HttpResponse.version()

```java
public HttpClient.Version version()
```

Provides the response protocol version.

**Returns:** the response protocol version

## HttpResponse.apply(ResponseInfo)

```java
public BodySubscriber<T> apply(ResponseInfo responseInfo)
```

Returns a BodySubscriber considering the
given response status code and headers. This method is invoked before
the actual response body bytes are read and its implementation must
return a BodySubscriber to consume the response
body bytes.

 The response body can be discarded using one of discarding or replacing.

Parameters:

- `responseInfo`: the response info

**Returns:** a body subscriber

## HttpResponse.fromSubscriber(Subscriber<? super List<ByteBuffer>>)

```java
public static BodyHandler<Void> fromSubscriber(Subscriber<? super List<ByteBuffer>> subscriber)
```

Returns a response body handler that returns a BodySubscriber`<Void>` obtained from `BodySubscribers.fromSubscriber(Subscriber)`, with the given
`subscriber`.

 The response body is not available through this, or the `HttpResponse` API, but instead all response body is forwarded to the
given `subscriber`, which should make it available, if
appropriate, through some other mechanism, e.g. an entry in a
database, etc.

Parameters:

- `subscriber`: the subscriber

**API note:** This method can be used as an adapter between `BodySubscriber` and `Flow.Subscriber`.

 For example:

**Returns:** a response body handler

## HttpResponse.fromSubscriber(S, Function<? super S,? extends T>)

```java
public static <S extends Subscriber<? super List<ByteBuffer>>,T> BodyHandler<T> fromSubscriber(S subscriber, Function<? super S,? extends T> finisher)
```

Returns a response body handler that returns a BodySubscriber`<T>` obtained from Function), with the
given `subscriber` and `finisher` function.

 The given `finisher` function is applied after the given
subscriber's `onComplete` has been invoked. The `finisher`
function is invoked with the given subscriber, and returns a value
that is set as the response's body.

Parameters:

- ``: the type of the Subscriber
- `<T>`: the type of the response body
- `subscriber`: the subscriber
- `finisher`: a function to be applied after the subscriber has completed

**API note:** This method can be used as an adapter between `BodySubscriber` and `Flow.Subscriber`.

 For example:

**Returns:** a response body handler

## HttpResponse.fromLineSubscriber(Subscriber<? super String>)

```java
public static BodyHandler<Void> fromLineSubscriber(Subscriber<? super String> subscriber)
```

Returns a response body handler that returns a BodySubscriber`<Void>` obtained from Function, Charset, String) BodySubscribers.fromLineSubscriber(subscriber, s -> null, charset, null),
with the given `subscriber`.
The charset used to decode the response body bytes is
obtained from the HTTP response headers as specified by `ofString()`,
and lines are delimited in the manner of `BufferedReader.readLine()`.

 The response body is not available through this, or the `HttpResponse` API, but instead all response body is forwarded to the
given `subscriber`, which should make it available, if
appropriate, through some other mechanism, e.g. an entry in a
database, etc.

Parameters:

- `subscriber`: the subscriber

**API note:** This method can be used as an adapter between a `BodySubscriber` and a text based `Flow.Subscriber` that parses
text line by line.

 For example:

**Returns:** a response body handler

## HttpResponse.fromLineSubscriber(S, Function<? super S,? extends T>, String)

```java
public static <S extends Subscriber<? super String>,T> BodyHandler<T> fromLineSubscriber(S subscriber, Function<? super S,? extends T> finisher, String lineSeparator)
```

Returns a response body handler that returns a BodySubscriber`<T>` obtained from Function, Charset, String) BodySubscribers.fromLineSubscriber(subscriber, finisher, charset, lineSeparator),
with the given `subscriber`, `finisher` function, and line separator.
The charset used to decode the response body bytes is
obtained from the HTTP response headers as specified by `ofString()`.

 The given `finisher` function is applied after the given
subscriber's `onComplete` has been invoked. The `finisher`
function is invoked with the given subscriber, and returns a value
that is set as the response's body.

Parameters:

- ``: the type of the Subscriber
- `<T>`: the type of the response body
- `subscriber`: the subscriber
- `finisher`: a function to be applied after the subscriber has completed
- `lineSeparator`: an optional line separator: can be `null`, in which case lines will be delimited in the manner of `BufferedReader.readLine()`.

**API note:** This method can be used as an adapter between a `BodySubscriber` and a text based `Flow.Subscriber` that parses
text line by line.

 For example:

**Returns:** a response body handler

Throws:

- `IllegalArgumentException`: if the supplied `lineSeparator` is the empty string

## HttpResponse.discarding()

```java
public static BodyHandler<Void> discarding()
```

Returns a response body handler that discards the response body.

**Returns:** a response body handler

## HttpResponse.replacing(U)

```java
public static <U> BodyHandler<U> replacing(U value)
```

Returns a response body handler that returns the given replacement
value, after discarding the response body.

Parameters:

- ``: the response body type
- `value`: the value of U to return as the body, may be `null`

**Returns:** a response body handler

## HttpResponse.ofString(Charset)

```java
public static BodyHandler<String> ofString(Charset charset)
```

Returns a `BodyHandler<String>` that returns a
BodySubscriber`<String>` obtained from
BodySubscribers.ofString(Charset).
The body is decoded using the given character set.

Parameters:

- `charset`: the character set to convert the body with

**Returns:** a response body handler

## HttpResponse.ofFile(Path, OpenOption...)

```java
public static BodyHandler<Path> ofFile(Path file, OpenOption... openOptions)
```

Returns a `BodyHandler` that returns a
BodySubscriber`` obtained from
OpenOption...) BodySubscribers.ofFile(Path,OpenOption...).

 When the `HttpResponse` object is returned, the body has
been completely written to the file, and `body()` returns a
reference to its `Path`.

Parameters:

- `file`: the file to store the body in
- `openOptions`: any options to use when opening/creating the file

**Returns:** a response body handler

Throws:

- `IllegalArgumentException`: if an invalid set of open options are specified

## HttpResponse.ofFile(Path)

```java
public static BodyHandler<Path> ofFile(Path file)
```

Returns a `BodyHandler` that returns a
BodySubscriber``.

 Equivalent to: `ofFile(file, CREATE, WRITE)`

Parameters:

- `file`: the file to store the body in

**Returns:** a response body handler

## HttpResponse.ofFileDownload(Path, OpenOption...)

```java
public static BodyHandler<Path> ofFileDownload(Path directory, OpenOption... openOptions)
```

Returns a `BodyHandler` that returns a
BodySubscriber<`Path`>
where the download directory is specified, but the filename is
obtained from the `Content-Disposition` response header. The
`Content-Disposition` header must specify the *attachment*
type and must also contain a *filename* parameter. If the
filename specifies multiple path components only the final component
is used as the filename (with the given directory name).

 When the `HttpResponse` object is returned, the body has
been completely written to the file and `body()` returns a
`Path` object for the file. The returned `Path` is the
combination of the supplied directory name and the file name supplied
by the server. If the destination directory does not exist or cannot
be written to, then the response will fail with an `IOException`.

Parameters:

- `directory`: the directory to store the file in
- `openOptions`: open options used when opening the file

**Returns:** a response body handler

Throws:

- `IllegalArgumentException`: if the given path does not exist, is not of the default file system, is not a directory, is not writable, or if an invalid set of open options are specified

## HttpResponse.ofInputStream()

```java
public static BodyHandler<InputStream> ofInputStream()
```

Returns a `BodyHandler<InputStream>` that returns a
BodySubscriber`<InputStream>` obtained from
BodySubscribers.ofInputStream.

 When the `HttpResponse` object is returned, the response
headers will have been completely read, but the body may not have
been fully received yet. The `body()` method returns an
`InputStream` from which the body can be read as it is received.

**API note:** See `BodySubscribers.ofInputStream()` for more
information.

To ensure that all resources associated with the
corresponding exchange are properly released the caller must
eventually obtain and close the returned stream.

**Returns:** a streaming response body handler

## HttpResponse.ofLines()

```java
public static BodyHandler<Stream<String>> ofLines()
```

Returns a `BodyHandler<Stream<String>>` that returns a
BodySubscriber`<Stream<String>>` obtained
from BodySubscribers.ofLines(charset).
The charset used to decode the response body bytes is
obtained from the HTTP response headers as specified by `ofString()`,
and lines are delimited in the manner of `BufferedReader.readLine()`.

 When the `HttpResponse` object is returned, the body may
not have been completely received.

**API note:** To ensure that all resources associated with the
corresponding exchange are properly released the caller must
eventually obtain and close the returned stream.

**Returns:** a streaming response body handler

## HttpResponse.ofByteArrayConsumer(Consumer<Optional<byte[]>>)

```java
public static BodyHandler<Void> ofByteArrayConsumer(Consumer<Optional<byte[]>> consumer)
```

Returns a `BodyHandler<Void>` that returns a
BodySubscriber`<Void>` obtained from
BodySubscribers.ofByteArrayConsumer(Consumer).

 When the `HttpResponse` object is returned, the body has
been completely written to the consumer.

Parameters:

- `consumer`: a Consumer to accept the response body

**API note:** The subscriber returned by this handler is not flow controlled.
Therefore, the supplied consumer must be able to process whatever
amount of data is delivered in a timely fashion.

**Returns:** a response body handler

## HttpResponse.ofByteArray()

```java
public static BodyHandler<byte[]> ofByteArray()
```

Returns a `BodyHandler<byte[]>` that returns a
BodySubscriber`<byte[]>` obtained
from BodySubscribers.ofByteArray().

 When the `HttpResponse` object is returned, the body has
been completely written to the byte array.

**Returns:** a response body handler
