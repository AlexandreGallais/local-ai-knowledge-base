---
title: "HttpResponse interface (java.net.http) (part 3 of 3)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.net.http/share/classes/java/net/http/HttpResponse.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# HttpResponse interface (java.net.http) (part 3 of 3)

## HttpResponse.ofPublisher()

```java
public static BodySubscriber<Publisher<List<ByteBuffer>>> ofPublisher()
```

Returns a response subscriber which publishes the response body
through a `Publisher<List<ByteBuffer>>`.

 The `HttpResponse` using this subscriber is available
immediately after the response headers have been read, without
requiring to wait for the entire body to be processed. The response
body bytes can then be obtained by subscribing to the publisher
returned by the `HttpResponse` body
method.

The publisher returned by the body
method can be subscribed to only once. The first subscriber will
receive the body response bytes if successfully subscribed, or will
cause the subscription to be cancelled otherwise.
If more subscriptions are attempted, the subsequent subscribers will
be immediately subscribed with an empty subscription and their
onError method
will be invoked with an `IllegalStateException`.

**API note:** To ensure that all resources associated with the
corresponding exchange are properly released the caller must
ensure that the provided publisher is subscribed once, and either
requests all bytes
until onComplete or
onError are invoked, or
cancel the provided subscription if it is unable or unwilling to do so.
Note that depending on the actual HTTP protocol version used for the exchange, cancelling the
subscription instead of exhausting the flow may cause the underlying
HTTP connection to be closed and prevent it from being reused for
subsequent operations.

**Returns:** A publishing body subscriber
        which publishes the response body
        through a `Publisher<List<ByteBuffer>>`.

## HttpResponse.replacing(U)

```java
public static <U> BodySubscriber<U> replacing(U value)
```

Returns a response subscriber which discards the response body. The
supplied value is the value that will be returned from
`HttpResponse.body()`.

Parameters:

- ``: the type of the response body
- `value`: the value to return from HttpResponse.body(), may be `null`

**Returns:** a body subscriber

## HttpResponse.discarding()

```java
public static BodySubscriber<Void> discarding()
```

Returns a response subscriber which discards the response body.

**Returns:** a response body subscriber

## HttpResponse.buffering(BodySubscriber<T>, int)

```java
public static <T> BodySubscriber<T> buffering(BodySubscriber<T> downstream, int bufferSize)
```

Returns a `BodySubscriber` which buffers data before delivering
it to the given downstream subscriber. The subscriber guarantees to
deliver `bufferSize` bytes of data to each invocation of the
downstream's onNext method,
except for the final invocation, just before
onComplete is invoked. The final
invocation of `onNext` may contain fewer than `bufferSize`
bytes.

 The returned subscriber delegates its getBody() method to the downstream subscriber.

Parameters:

- `<T>`: the type of the response body
- `downstream`: the downstream subscriber
- `bufferSize`: the buffer size

**Returns:** a buffering body subscriber

Throws:

- `IllegalArgumentException`: if `bufferSize <= 0`

## HttpResponse.mapping(BodySubscriber<T>, Function<? super T, ? extends U>)

```java
public static <T,U> BodySubscriber<U> mapping(BodySubscriber<T> upstream, Function<? super T, ? extends U> mapper)
```

Returns a `BodySubscriber` whose response body value is that of
the result of applying the given function to the body object of the
given `upstream` `BodySubscriber`.

 The mapping function is executed using the client's executor, and can therefore be used to map any
response body type, including blocking `InputStream`.
However, performing any blocking operation in the mapper function
runs the risk of blocking the executor's thread for an unknown
amount of time (at least until the blocking operation finishes),
which may end up starving the executor of available threads.
Therefore, in the case where mapping to the desired type might
block (e.g. by reading on the `InputStream`), then mapping
to a Supplier of the desired
type and deferring the blocking operation until Supplier::get is invoked by the caller's thread should be preferred,
as shown in the following example which uses a well-known JSON parser to
convert an `InputStream` into any annotated Java type.

For example:

Parameters:

- `<T>`: the upstream body type
- ``: the type of the body subscriber returned
- `upstream`: the body subscriber to be mapped
- `mapper`: the mapping function

**Returns:** a mapping body subscriber

## HttpResponse.limiting(BodySubscriber<T>, long)

```java
public static <T> BodySubscriber<T> limiting(BodySubscriber<T> downstreamSubscriber, long capacity)
```

If the number of body bytes received exceeds the given
`capacity`, onError
is called on the downstream `BodySubscriber` with an
`IOException` indicating that the capacity is exceeded, and
the upstream subscription is cancelled.

Parameters:

- `downstreamSubscriber`: the downstream subscriber to pass <example-value> data to
- `capacity`: the maximum number of bytes that are allowed

**Since:** 25

Throws:

- `IllegalArgumentException`: if `capacity` is negative
