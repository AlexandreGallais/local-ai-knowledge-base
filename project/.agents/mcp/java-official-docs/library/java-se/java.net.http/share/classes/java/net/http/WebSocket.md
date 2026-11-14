---
title: "WebSocket interface (java.net.http) (part 1 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.net.http/share/classes/java/net/http/WebSocket.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# WebSocket interface (java.net.http)

```java
public interface WebSocket
```

A WebSocket Client.

 `WebSocket` instances are created through `WebSocket.Builder`.

 WebSocket has an input and an output side. These sides are independent
from each other. A side can either be open or closed. Once closed, the side
remains closed. WebSocket messages are sent through a `WebSocket` and
received through a `WebSocket.Listener` associated with it. Messages
can be sent until the WebSocket's output is closed, and received until the
WebSocket's input is closed.

 A send method is any of the `sendText`, `sendBinary`,
`sendPing`, `sendPong` and `sendClose` methods of
`WebSocket`. A send method initiates a send operation and returns a
`CompletableFuture` which completes once the operation has completed.
If the `CompletableFuture` completes normally the operation is
considered succeeded. If the `CompletableFuture` completes
exceptionally, the operation is considered failed. An operation that has been
initiated but not yet completed is considered pending.

 A receive method is any of the `onText`, `onBinary`,
`onPing`, `onPong` and `onClose` methods of
`Listener`. WebSocket initiates a receive operation by invoking a
receive method on the listener. The listener then must return a
`CompletionStage` which completes once the operation has completed.

 To control receiving of messages, a WebSocket maintains an
internal counter. This counter's value is a number of
times the WebSocket has yet to invoke a receive method. While this counter is
zero the WebSocket does not invoke receive methods. The counter is
incremented by `n` when `request(n)` is called. The counter is
decremented by one when the WebSocket invokes a receive method.
`onOpen` and `onError` are not receive methods. WebSocket invokes
`onOpen` prior to any other methods on the listener. WebSocket invokes
`onOpen` at most once. WebSocket may invoke `onError` at any
given time. If the WebSocket invokes `onError` or `onClose`, then
no further listener's methods will be invoked, no matter the value of the
counter. For a newly built WebSocket the counter is zero.

 Unless otherwise stated, `null` arguments will cause methods
of `WebSocket` to throw `NullPointerException`, similarly,
`WebSocket` will not pass `null` arguments to methods of
`Listener`. The state of a WebSocket is not changed by the invocations
that throw or return a `CompletableFuture` that completes with one of
the `NullPointerException`, `IllegalArgumentException`,
`IllegalStateException` exceptions.

 `WebSocket` handles received Ping and Close messages automatically
(as per the WebSocket Protocol) by replying with Pong and Close messages. If
the listener receives Ping or Close messages, no mandatory actions from the
listener are required.

**API note:** The relationship between a WebSocket and the associated Listener is
analogous to that of a Subscription and the associated Subscriber of type
`java.util.concurrent.Flow`.

**Since:** 11

## WebSocket.NORMAL_CLOSURE

```java
int NORMAL_CLOSURE
```

The WebSocket Close message status code (````),
indicating normal closure, meaning that the purpose for which the
connection was established has been fulfilled.

**See also:** #sendClose(int, String)

**See also:** Listener#onClose(WebSocket, int, String)

## WebSocket.header(String, String)

```java
Builder header(String name, String value)
```

Adds the given name-value pair to the list of additional HTTP headers
sent during the opening handshake.

 Headers defined in the
WebSocket
Protocol are illegal. If this method is not invoked, no
additional HTTP headers will be sent.

Parameters:

- `name`: the header name
- `value`: the header value

**Returns:** this builder

## WebSocket.connectTimeout(Duration)

```java
Builder connectTimeout(Duration timeout)
```

Sets a timeout for establishing a WebSocket connection.

 If the connection is not established within the specified
duration then building of the `WebSocket` will fail with
`HttpTimeoutException`. If this method is not invoked then the
infinite timeout is assumed.

Parameters:

- `timeout`: the timeout, non-negative, non-ZERO

**Returns:** this builder

## WebSocket.subprotocols(String, String...)

```java
Builder subprotocols(String mostPreferred, String... lesserPreferred)
```

Sets a request for the given subprotocols.

 After the `WebSocket` has been built, the actual
subprotocol can be queried through
WebSocket.getSubprotocol().

 Subprotocols are specified in the order of preference. The most
preferred subprotocol is specified first. If there are any additional
subprotocols they are enumerated from the most preferred to the least
preferred.

 Subprotocols not conforming to the syntax of subprotocol
identifiers are illegal. If this method is not invoked then no
subprotocols will be requested.

Parameters:

- `mostPreferred`: the most preferred subprotocol
- `lesserPreferred`: the lesser preferred subprotocols

**Returns:** this builder

## WebSocket.buildAsync(URI, Listener)

```java
CompletableFuture<WebSocket> buildAsync(URI uri, Listener listener)
```

Builds a `WebSocket` connected to the given `URI` and
associated with the given `Listener`.

 Returns a `CompletableFuture` which will either complete
normally with the resulting `WebSocket` or complete
exceptionally with one of the following errors:

-  `IOException` -
         if an I/O error occurs

-  `WebSocketHandshakeException` -
         if the opening handshake fails

-  `HttpTimeoutException` -
         if the opening handshake does not complete within
         the timeout

-  `InterruptedException` -
         if the operation is interrupted

-  `IllegalArgumentException` -
         if any of the arguments of this builder's methods are
         illegal

Parameters:

- `uri`: the WebSocket URI
- `listener`: the listener

**Returns:** a `CompletableFuture` with the `WebSocket`

## WebSocket.onOpen(WebSocket)

```java
default void onOpen(WebSocket webSocket)
```

A `WebSocket` has been connected.

 This is the initial invocation and it is made once. It is
typically used to make a request for more invocations.

Parameters:

- `webSocket`: the WebSocket that has been connected

**Implementation requirements:** The default implementation is equivalent to:

## WebSocket.onText(WebSocket, CharSequence, boolean)

```java
default CompletionStage<?> onText(WebSocket webSocket, CharSequence data, boolean last)
```

A textual data has been received.

 Return a `CompletionStage` which will be used by the
`WebSocket` as an indication it may reclaim the
`CharSequence`. Do not access the `CharSequence` after
this `CompletionStage` has completed.

Parameters:

- `webSocket`: the WebSocket on which the data has been received
- `data`: the data
- `last`: whether this invocation completes the message

**Implementation requirements:** The default implementation is equivalent to:

**Implementation note:** The `data` is always a legal UTF-16 sequence.

**Returns:** a `CompletionStage` which completes when the
`CharSequence` may be reclaimed; or `null` if it may be
reclaimed immediately

## WebSocket.onBinary(WebSocket, ByteBuffer, boolean)

```java
default CompletionStage<?> onBinary(WebSocket webSocket, ByteBuffer data, boolean last)
```

A binary data has been received.

 This data is located in bytes from the buffer's position to its
limit.

 Return a `CompletionStage` which will be used by the
`WebSocket` as an indication it may reclaim the
`ByteBuffer`. Do not access the `ByteBuffer` after
this `CompletionStage` has completed.

Parameters:

- `webSocket`: the WebSocket on which the data has been received
- `data`: the data
- `last`: whether this invocation completes the message

**Implementation requirements:** The default implementation is equivalent to:

**Returns:** a `CompletionStage` which completes when the
`ByteBuffer` may be reclaimed; or `null` if it may be
reclaimed immediately

## WebSocket.onPing(WebSocket, ByteBuffer)

```java
default CompletionStage<?> onPing(WebSocket webSocket, ByteBuffer message)
```

A Ping message has been received.

 As guaranteed by the WebSocket Protocol, the message consists of
not more than `125` bytes. These bytes are located from the
buffer's position to its limit.

 Given that the WebSocket implementation will automatically send a
reciprocal pong when a ping is received, it is rarely required to
send a pong message explicitly when a ping is received.

 Return a `CompletionStage` which will be used by the
`WebSocket` as a signal it may reclaim the
`ByteBuffer`. Do not access the `ByteBuffer` after
this `CompletionStage` has completed.

Parameters:

- `webSocket`: the WebSocket on which the message has been received
- `message`: the message

**Implementation requirements:** The default implementation is equivalent to:

**Returns:** a `CompletionStage` which completes when the
`ByteBuffer` may be reclaimed; or `null` if it may be
reclaimed immediately

## WebSocket.onPong(WebSocket, ByteBuffer)

```java
default CompletionStage<?> onPong(WebSocket webSocket, ByteBuffer message)
```

A Pong message has been received.

 As guaranteed by the WebSocket Protocol, the message consists of
not more than `125` bytes. These bytes are located from the
buffer's position to its limit.

 Return a `CompletionStage` which will be used by the
`WebSocket` as a signal it may reclaim the
`ByteBuffer`. Do not access the `ByteBuffer` after
this `CompletionStage` has completed.

Parameters:

- `webSocket`: the WebSocket on which the message has been received
- `message`: the message

**Implementation requirements:** The default implementation is equivalent to:

**Returns:** a `CompletionStage` which completes when the
`ByteBuffer` may be reclaimed; or `null` if it may be
reclaimed immediately

## WebSocket.onClose(WebSocket, int, String)

```java
default CompletionStage<?> onClose(WebSocket webSocket, int statusCode, String reason)
```

Receives a Close message indicating the WebSocket's input has been
closed.

 This is the last invocation from the specified `WebSocket`.
By the time this invocation begins the WebSocket's input will have
been closed.

 A Close message consists of a status code and a reason for
closing. The status code is an integer from the range
`1000 <= code <= 65535`. The `reason` is a string which
has a UTF-8 representation not longer than `123` bytes.

 If the WebSocket's output is not already closed, the
`CompletionStage` returned by this method will be used as an
indication that the WebSocket's output may be closed. The WebSocket
will close its output at the earliest of completion of the returned
`CompletionStage` or invoking either of the `sendClose`
or `abort` methods.

Parameters:

- `webSocket`: the WebSocket on which the message has been received
- `statusCode`: the status code
- `reason`: the reason

**API note:** Returning a `CompletionStage` that never completes,
effectively disables the reciprocating closure of the output.

 To specify a custom closure code or reason code the
`sendClose` method may be invoked from inside the
`onClose` invocation:

**Implementation requirements:** The default implementation of this method returns
`null`, indicating that the output should be closed
immediately.

**Returns:** a `CompletionStage` which completes when the
`WebSocket` may be closed; or `null` if it may be
closed immediately

## WebSocket.onError(WebSocket, Throwable)

```java
default void onError(WebSocket webSocket, Throwable error)
```

An error has occurred.

 This is the last invocation from the specified WebSocket. By the
time this invocation begins both the WebSocket's input and output
will have been closed. A WebSocket may invoke this method on the
associated listener at any time after it has invoked `onOpen`,
regardless of whether or not any invocations have been requested from
the WebSocket.

 If an exception is thrown from this method, resulting behavior is
undefined.

Parameters:

- `webSocket`: the WebSocket on which the error has occurred
- `error`: the error

## WebSocket.sendText(CharSequence, boolean)

```java
CompletableFuture<WebSocket> sendText(CharSequence data, boolean last)
```

Sends textual data with characters from the given character sequence.

 The character sequence must not be modified until the
`CompletableFuture` returned from this method has completed.

 A `CompletableFuture` returned from this method can
complete exceptionally with:

-  `IllegalStateException` -
         if there is a pending text or binary send operation
         or if the previous binary data does not complete the message

-  `IOException` -
         if an I/O error occurs, or if the output is closed

Parameters:

- `data`: the data
- `last`: `true` if this invocation completes the message, `false` otherwise

**Implementation note:** If `data` is a malformed UTF-16 sequence, the operation
will fail with `IOException`.

**Returns:** a `CompletableFuture` that completes, with this WebSocket,
when the data has been sent

## WebSocket.sendBinary(ByteBuffer, boolean)

```java
CompletableFuture<WebSocket> sendBinary(ByteBuffer data, boolean last)
```

Sends binary data with bytes from the given buffer.

 The data is located in bytes from the buffer's position to its limit.
Upon normal completion of a `CompletableFuture` returned from this
method the buffer will have no remaining bytes. The buffer must not be
accessed until after that.

 The `CompletableFuture` returned from this method can
complete exceptionally with:

-  `IllegalStateException` -
         if there is a pending text or binary send operation
         or if the previous textual data does not complete the message

-  `IOException` -
         if an I/O error occurs, or if the output is closed

Parameters:

- `data`: the data
- `last`: `true` if this invocation completes the message, `false` otherwise

**Returns:** a `CompletableFuture` that completes, with this WebSocket,
when the data has been sent

## WebSocket.sendPing(ByteBuffer)

```java
CompletableFuture<WebSocket> sendPing(ByteBuffer message)
```

Sends a Ping message with bytes from the given buffer.

 The message consists of not more than `125` bytes from the
buffer's position to its limit. Upon normal completion of a
`CompletableFuture` returned from this method the buffer will
have no remaining bytes. The buffer must not be accessed until after that.

 The `CompletableFuture` returned from this method can
complete exceptionally with:

-  `IllegalStateException` -
         if there is a pending ping or pong send operation

-  `IllegalArgumentException` -
         if the message is too long

-  `IOException` -
         if an I/O error occurs, or if the output is closed

Parameters:

- `message`: the message

**Returns:** a `CompletableFuture` that completes, with this WebSocket,
when the Ping message has been sent
