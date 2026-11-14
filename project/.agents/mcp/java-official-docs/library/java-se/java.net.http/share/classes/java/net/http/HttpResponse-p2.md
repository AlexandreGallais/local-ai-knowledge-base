---
title: "HttpResponse interface (java.net.http) (part 2 of 3)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.net.http/share/classes/java/net/http/HttpResponse.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# HttpResponse interface (java.net.http) (part 2 of 3)

## HttpResponse.ofString()

```java
public static BodyHandler<String> ofString()
```

Returns a `BodyHandler<String>` that returns a
BodySubscriber`<String>` obtained from
BodySubscribers.ofString(Charset).
The body is decoded using the character set specified in
the `Content-Type` response header. If there is no such
header, or the character set is not supported, then
UTF_8 is used.

 When the `HttpResponse` object is returned, the body has
been completely written to the string.

**Returns:** a response body handler

## HttpResponse.ofPublisher()

```java
public static BodyHandler<Publisher<List<ByteBuffer>>> ofPublisher()
```

Returns a `BodyHandler<Publisher<List<ByteBuffer>>>` that creates a
BodySubscriber`<Publisher<List<ByteBuffer>>>`
obtained from BodySubscribers.ofPublisher().

 When the `HttpResponse` object is returned, the response
headers will have been completely read, but the body may not have
been fully received yet. The `body()` method returns a
Publisher`<List<ByteBuffer>>` from which the body
response bytes can be obtained as they are received. The publisher
can and must be subscribed to only once.

**API note:** See `BodySubscribers.ofPublisher()` for more
information.

To ensure that all resources associated with the
corresponding exchange are properly released the caller must
subscribe to the publisher and conform to the rules outlined in
`BodySubscribers.ofPublisher()`

**Returns:** a publishing response body handler

## HttpResponse.buffering(BodyHandler<T>, int)

```java
public static <T> BodyHandler<T> buffering(BodyHandler<T> downstreamHandler, int bufferSize)
```

Returns a `BodyHandler` which, when invoked, returns a buffering BodySubscriber
that buffers data before delivering it to the downstream subscriber.
These `BodySubscriber` instances are created by calling
BodySubscribers.buffering with a subscriber obtained from the given
downstream handler and the `bufferSize` parameter.

Parameters:

- `<T>`: the response body type
- `downstreamHandler`: the downstream handler
- `bufferSize`: the buffer size parameter passed to BodySubscribers.buffering

**Returns:** a body handler

Throws:

- `IllegalArgumentException`: if `bufferSize <= 0`

## HttpResponse.limiting(BodyHandler<T>, long)

```java
public static <T> BodyHandler<T> limiting(BodyHandler<T> downstreamHandler, long capacity)
```

If the number of body bytes received exceeds the given
`capacity`, onError
is called on the downstream `BodySubscriber` with an
`IOException` indicating that the capacity is exceeded, and
the upstream subscription is cancelled.

Parameters:

- `downstreamHandler`: the downstream handler to pass <example-value> data to
- `capacity`: the maximum number of bytes that are allowed

**Since:** 25

Throws:

- `IllegalArgumentException`: if `capacity` is negative

## HttpResponse.applyPushPromise(HttpRequest, HttpRequest, Function<HttpResponse.BodyHandler<T>,CompletableFuture<HttpResponse<T>>>)

```java
public void applyPushPromise( HttpRequest initiatingRequest, HttpRequest pushPromiseRequest, Function<HttpResponse.BodyHandler<T>,CompletableFuture<HttpResponse<T>>> acceptor )
```

Notification of an incoming push promise.

 This method is invoked once for each push promise received, up
to the point where the response body of the initiating client-sent
request has been fully received.

 A push promise is accepted by invoking the given `acceptor`
function. The `acceptor` function must be passed a non-null
`BodyHandler`, that is to be used to handle the promise's
response body. The acceptor function will return a `CompletableFuture` that completes with the promise's response.

 If the `acceptor` function is not successfully invoked,
then the push promise is rejected. The `acceptor` function will
throw an `IllegalStateException` if invoked more than once.

Parameters:

- `initiatingRequest`: the initiating client-send request
- `pushPromiseRequest`: the synthetic push request
- `acceptor`: the acceptor function that must be successfully invoked to accept the push promise

## HttpResponse.of(Function<HttpRequest,BodyHandler<T>>, ConcurrentMap<HttpRequest,CompletableFuture<HttpResponse<T>>>)

```java
public static <T> PushPromiseHandler<T> of(Function<HttpRequest,BodyHandler<T>> pushPromiseHandler, ConcurrentMap<HttpRequest,CompletableFuture<HttpResponse<T>>> pushPromisesMap)
```

Returns a push promise handler that accumulates push promises, and
their responses, into the given map.

 Entries are added to the given map for each push promise accepted.
The entry's key is the push request, and the entry's value is a
`CompletableFuture` that completes with the response
corresponding to the key's push request. A push request is rejected /
cancelled if there is already an entry in the map whose key is
equal to it. A push request is
rejected / cancelled if it  does not have the same origin as its
initiating request.

 Entries are added to the given map as soon as practically
possible when a push promise is received and accepted. That way code,
using such a map like a cache, can determine if a push promise has
been issued by the server and avoid making, possibly, unnecessary
requests.

 The delivery of a push promise response is not coordinated with
the delivery of the response to the initiating client-sent request.
However, when the response body for the initiating client-sent
request has been fully received, the map is guaranteed to be fully
populated, that is, no more entries will be added. The individual
`CompletableFutures` contained in the map may or may not
already be completed at this point.

Parameters:

- `<T>`: the push promise response body type
- `pushPromiseHandler`: the body handler to use for push promises
- `pushPromisesMap`: a map to accumulate push promises into

**Returns:** a push promise handler

## HttpResponse.getBody()

```java
public CompletionStage<T> getBody()
```

Returns a `CompletionStage` which when completed will return
the response body object. This method can be called at any time
relative to the other `Flow.Subscriber` methods and is invoked
using the client's executor.

**Returns:** a CompletionStage for the response body

## HttpResponse.fromSubscriber(Subscriber<? super List<ByteBuffer>>)

```java
public static BodySubscriber<Void> fromSubscriber(Subscriber<? super List<ByteBuffer>> subscriber)
```

Returns a body subscriber that forwards all response body to the
given `Flow.Subscriber`. The completion stage of the returned body subscriber completes after one
of the given subscribers `onComplete` or `onError` has
been invoked.

Parameters:

- `subscriber`: the subscriber

**API note:** This method can be used as an adapter between `BodySubscriber` and `Flow.Subscriber`.

**Returns:** a body subscriber

## HttpResponse.fromSubscriber(S, Function<? super S,? extends T>)

```java
public static <S extends Subscriber<? super List<ByteBuffer>>,T> BodySubscriber<T> fromSubscriber(S subscriber, Function<? super S,? extends T> finisher)
```

Returns a body subscriber that forwards all response body to the
given `Flow.Subscriber`. The completion stage of the returned body subscriber completes after one
of the given subscribers `onComplete` or `onError` has
been invoked.

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

**Returns:** a body subscriber

## HttpResponse.fromLineSubscriber(Subscriber<? super String>)

```java
public static BodySubscriber<Void> fromLineSubscriber(Subscriber<? super String> subscriber)
```

Returns a body subscriber that forwards all response body to the
given `Flow.Subscriber`, line by line.
The completion stage of the returned body subscriber completes after one of the
given subscribers `onComplete` or `onError` has been
invoked.
Bytes are decoded using the UTF-8 charset, and lines are delimited in the manner of
`BufferedReader.readLine()`.

Parameters:

- `subscriber`: the subscriber

**API note:** This method can be used as an adapter between `BodySubscriber` and `Flow.Subscriber`.

**Implementation note:** This is equivalent to calling

**Returns:** a body subscriber

## HttpResponse.fromLineSubscriber(S, Function<? super S,? extends T>, Charset, String)

```java
public static <S extends Subscriber<? super String>,T> BodySubscriber<T> fromLineSubscriber(S subscriber, Function<? super S,? extends T> finisher, Charset charset, String lineSeparator)
```

Returns a body subscriber that forwards all response body to the
given `Flow.Subscriber`, line by line. The completion stage of the returned body
subscriber completes after one of the given subscribers
`onComplete` or `onError` has been invoked.

 The given `finisher` function is applied after the given
subscriber's `onComplete` has been invoked. The `finisher`
function is invoked with the given subscriber, and returns a value
that is set as the response's body.

Parameters:

- ``: the type of the Subscriber
- `<T>`: the type of the response body
- `subscriber`: the subscriber
- `finisher`: a function to be applied after the subscriber has completed
- `charset`: a `Charset` to decode the bytes
- `lineSeparator`: an optional line separator: can be `null`, in which case lines will be delimited in the manner of `BufferedReader.readLine()`.

**API note:** This method can be used as an adapter between `BodySubscriber` and `Flow.Subscriber`.

**Returns:** a body subscriber

Throws:

- `IllegalArgumentException`: if the supplied `lineSeparator` is the empty string

## HttpResponse.ofString(Charset)

```java
public static BodySubscriber<String> ofString(Charset charset)
```

Returns a body subscriber which stores the response body as a `String` converted using the given `Charset`.

 The `HttpResponse` using this subscriber is available after
the entire response has been read.

Parameters:

- `charset`: the character set to convert the String with

**Returns:** a body subscriber

## HttpResponse.ofByteArray()

```java
public static BodySubscriber<byte[]> ofByteArray()
```

Returns a `BodySubscriber` which stores the response body as a
byte array.

 The `HttpResponse` using this subscriber is available after
the entire response has been read.

**Returns:** a body subscriber

## HttpResponse.ofFile(Path, OpenOption...)

```java
public static BodySubscriber<Path> ofFile(Path file, OpenOption... openOptions)
```

Returns a `BodySubscriber` which stores the response body in a
file opened with the given options and name. The file will be opened
with the given options using FileChannel.open just before the body is read. Any exception thrown
will be returned or thrown from BodyHandler) HttpClient::send or BodyHandler) HttpClient::sendAsync as appropriate.

 The `HttpResponse` using this subscriber is available after
the entire response has been read.

Parameters:

- `file`: the file to store the body in
- `openOptions`: the list of options to open the file with

**Returns:** a body subscriber

Throws:

- `IllegalArgumentException`: if an invalid set of open options are specified

## HttpResponse.ofFile(Path)

```java
public static BodySubscriber<Path> ofFile(Path file)
```

Returns a `BodySubscriber` which stores the response body in a
file opened with the given name.

 Equivalent to: `ofFile(file, CREATE, WRITE)`

Parameters:

- `file`: the file to store the body in

**Returns:** a body subscriber

## HttpResponse.ofByteArrayConsumer(Consumer<Optional<byte[]>>)

```java
public static BodySubscriber<Void> ofByteArrayConsumer(Consumer<Optional<byte[]>> consumer)
```

Returns a `BodySubscriber` which provides the incoming body
data to the provided Consumer of `Optional<byte[]>`. Each
call to Consumer.accept()
will contain a non-empty `Optional`, except for the final
invocation after all body data has been read, when the `Optional` will be empty.

 The `HttpResponse` using this subscriber is available after
the entire response has been read.

Parameters:

- `consumer`: a Consumer of byte arrays

**API note:** This subscriber is not flow controlled.
Therefore, the supplied consumer must be able to process whatever
amount of data is delivered in a timely fashion.

**Returns:** a body subscriber

## HttpResponse.ofInputStream()

```java
public static BodySubscriber<InputStream> ofInputStream()
```

Returns a `BodySubscriber` which streams the response body as
an `InputStream`.

 The `HttpResponse` using this subscriber is available
immediately after the response headers have been read, without
requiring to wait for the entire body to be processed. The response
body can then be read directly from the `InputStream`.

**API note:** To ensure that all resources associated with the
corresponding exchange are properly released the caller must
ensure to either read all bytes until EOF is reached, or call
`InputStream.close` if it is unable or unwilling to do so.
Calling `close` before exhausting the stream may cause
the underlying HTTP connection to be closed and prevent it
from being reused for subsequent operations.

**Implementation note:** The `read` method of the `InputStream`
returned by the default implementation of this method will
throw an `IOException` with the thread interrupt status set if the thread is interrupted
while blocking on read. In that case, the request will also be
cancelled and the `InputStream` will be closed.

**Returns:** a streaming body subscriber
        which streams the response body as an `InputStream`.

## HttpResponse.ofLines(Charset)

```java
public static BodySubscriber<Stream<String>> ofLines(Charset charset)
```

Returns a `BodySubscriber` which streams the response body as
a Stream`<String>`, where each string in the stream
corresponds to a line as defined by `BufferedReader.lines()`.

 The `HttpResponse` using this subscriber is available
immediately after the response headers have been read, without
requiring to wait for the entire body to be processed. The response
body can then be read directly from the `Stream`.

Parameters:

- `charset`: the character set to use when converting bytes to characters

**API note:** To ensure that all resources associated with the
corresponding exchange are properly released the caller must
ensure to either read all lines until the stream is exhausted,
or call `Stream.close` if it is unable or unwilling to do so.
Calling `close` before exhausting the stream may cause
the underlying HTTP connection to be closed and prevent it
from being reused for subsequent operations.

**Returns:** a streaming body subscriber which streams
         the response body as a Stream`<String>`.

**See also:** BufferedReader#lines()
