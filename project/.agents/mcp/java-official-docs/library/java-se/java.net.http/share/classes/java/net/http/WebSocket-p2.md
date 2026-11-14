---
title: "WebSocket interface (java.net.http) (part 2 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.net.http/share/classes/java/net/http/WebSocket.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# WebSocket interface (java.net.http) (part 2 of 2)

## WebSocket.sendPong(ByteBuffer)

```java
CompletableFuture<WebSocket> sendPong(ByteBuffer message)
```

Sends a Pong message with bytes from the given buffer.

 The message consists of not more than `125` bytes from the
buffer's position to its limit. Upon normal completion of a
`CompletableFuture` returned from this method the buffer will have
no remaining bytes. The buffer must not be accessed until after that.

 Given that the WebSocket implementation will automatically send a
reciprocal pong when a ping is received, it is rarely required to send a
pong message explicitly.

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
when the Pong message has been sent

## WebSocket.sendClose(int, String)

```java
CompletableFuture<WebSocket> sendClose(int statusCode, String reason)
```

Initiates an orderly closure of this WebSocket's output by
sending a Close message with the given status code and the reason.

 The `statusCode` is an integer from the range
`1000 <= code <= 4999`. Status codes `1002`, `1003`,
`1006`, `1007`, `1009`, `1010`, `1012`,
`1013` and `1015` are illegal. Behaviour in respect to other
status codes is implementation-specific. A legal `reason` is a
string that has a UTF-8 representation not longer than `123` bytes.

 A `CompletableFuture` returned from this method can
complete exceptionally with:

-  `IllegalArgumentException` -
          if `statusCode` is illegal, or
          if `reason` is illegal

-  `IOException` -
          if an I/O error occurs, or if the output is closed

 Unless the `CompletableFuture` returned from this method
completes with `IllegalArgumentException`, or the method throws
`NullPointerException`, the output will be closed.

 If not already closed, the input remains open until a Close message
int, String) received, or
`abort` is invoked, or an
Throwable) error occurs.

Parameters:

- `statusCode`: the status code
- `reason`: the reason

**API note:** Use the provided integer constant `NORMAL_CLOSURE` as a
status code and an empty string as a reason in a typical case:

The `sendClose` method does not close this WebSocket's input. It
merely closes this WebSocket's output by sending a Close message. To
enforce closing the input, invoke the `abort` method. Here is an
example of an application that sends a Close message, and then starts a
timer. Once no data has been received within the specified timeout, the
timer goes off and the alarm aborts `WebSocket`:

**Returns:** a `CompletableFuture` that completes, with this WebSocket,
when the Close message has been sent

## WebSocket.request(long)

```java
void request(long n)
```

Increments the counter of invocations of receive methods.

 This WebSocket will invoke `onText`, `onBinary`,
`onPing`, `onPong` or `onClose` methods on the
associated listener (i.e. receive methods) up to `n` more times.

Parameters:

- `n`: the number of invocations

**API note:** The parameter of this method is the number of invocations being
requested from this WebSocket to the associated listener, not the number
of messages. Sometimes a message may be delivered to the listener in a
single invocation, but not always. For example, Ping, Pong and Close
messages are delivered in a single invocation of `onPing`,
`onPong` and `onClose` methods respectively. However, whether
or not Text and Binary messages are delivered in a single invocation of
`onText` and `onBinary` methods depends on the boolean
argument (`last`) of these methods. If `last` is
`false`, then there is more to a message than has been delivered to
the invocation.

 Here is an example of a listener that requests invocations, one at a
time, until a complete message has been accumulated, and then processes
the result:

Throws:

- `IllegalArgumentException`: if `n <= 0`

## WebSocket.getSubprotocol()

```java
String getSubprotocol()
```

Returns the subprotocol used by this WebSocket.

**Returns:** the subprotocol, or an empty string if there's no subprotocol

## WebSocket.isOutputClosed()

```java
boolean isOutputClosed()
```

Tells whether this WebSocket's output is closed.

 If this method returns `true`, subsequent invocations will also
return `true`.

**Returns:** `true` if closed, `false` otherwise

## WebSocket.isInputClosed()

```java
boolean isInputClosed()
```

Tells whether this WebSocket's input is closed.

 If this method returns `true`, subsequent invocations will also
return `true`.

**Returns:** `true` if closed, `false` otherwise

## WebSocket.abort()

```java
void abort()
```

Closes this WebSocket's input and output abruptly.

 When this method returns both the input and the output will have been
closed. Any pending send operations will fail with `IOException`.
Subsequent invocations of `abort` will have no effect.
