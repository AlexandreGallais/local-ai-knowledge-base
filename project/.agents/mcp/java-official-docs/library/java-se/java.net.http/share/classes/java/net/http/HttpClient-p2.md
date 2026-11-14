---
title: "HttpClient class (java.net.http) (part 2 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.net.http/share/classes/java/net/http/HttpClient.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# HttpClient class (java.net.http) (part 2 of 2)

## HttpClient.send(HttpRequest, HttpResponse.BodyHandler<T>)

```java
public abstract <T> HttpResponse<T> send(HttpRequest request, HttpResponse.BodyHandler<T> responseBodyHandler) throws IOException, InterruptedException
```

Sends the given request using this client, blocking if necessary to get
the response. The returned `HttpResponse``<T>` contains the
response status, headers, and body ( as handled by given response body
handler ).

 If the operation is interrupted, the default `HttpClient`
implementation attempts to cancel the HTTP exchange and
`InterruptedException` is thrown.
No guarantee is made as to exactly *when* the cancellation request
may be taken into account. In particular, the request might still get sent
to the server, as its processing might already have started asynchronously
in another thread, and the underlying resources may only be released
asynchronously.

- With HTTP/1.1, an attempt to cancel may cause the underlying
        connection to be closed abruptly.

- With HTTP/2, an attempt to cancel may cause the stream to be reset,
        or in certain circumstances, may also cause the connection to be
        closed abruptly, if, for instance, the thread is currently trying
        to write to the underlying socket.

Parameters:

- `<T>`: the response body type
- `request`: the request
- `responseBodyHandler`: the response body handler

**Returns:** the response

Throws:

- `IOException`: if an I/O error occurs when sending or receiving, or the client has shut down
- `InterruptedException`: if the operation is interrupted
- `IllegalArgumentException`: if the `request` argument is not a request that could have been validly built as specified by HttpRequest.Builder.

## HttpClient.sendAsync(HttpRequest, BodyHandler<T>)

```java
public abstract <T> CompletableFuture<HttpResponse<T>> sendAsync(HttpRequest request, BodyHandler<T> responseBodyHandler)
```

Sends the given request asynchronously using this client with the given
response body handler.

 Equivalent to: `sendAsync(request, responseBodyHandler, null)`.

Parameters:

- `<T>`: the response body type
- `request`: the request
- `responseBodyHandler`: the response body handler

**Returns:** a `CompletableFuture<HttpResponse<T>>`

Throws:

- `IllegalArgumentException`: if the `request` argument is not a request that could have been validly built as specified by HttpRequest.Builder.

## HttpClient.sendAsync(HttpRequest, BodyHandler<T>, PushPromiseHandler<T>)

```java
public abstract <T> CompletableFuture<HttpResponse<T>> sendAsync(HttpRequest request, BodyHandler<T> responseBodyHandler, PushPromiseHandler<T> pushPromiseHandler)
```

Sends the given request asynchronously using this client with the given
response body handler and push promise handler.

 The returned completable future, if completed successfully, completes
with an `HttpResponse``<T>` that contains the response status,
headers, and body ( as handled by given response body handler ).

 Push promises received, if any, are
handled by the given `pushPromiseHandler`. A `null` valued
`pushPromiseHandler` rejects any push promises.

 The returned completable future completes exceptionally with:

- `IOException` - if an I/O error occurs when sending or receiving,
     or the client has shut down.

 The default `HttpClient` implementation returns
`CompletableFuture` objects that are *cancelable*.
`CompletableFuture` objects derived from cancelable futures are themselves *cancelable*.
Invoking cancel(true)
on a cancelable future that is not completed, attempts to cancel the HTTP exchange
in an effort to release underlying resources as soon as possible.
No guarantee is made as to exactly *when* the cancellation request
may be taken into account. In particular, the request might still get sent
to the server, as its processing might already have started asynchronously
in another thread, and the underlying resources may only be released
asynchronously.

- With HTTP/1.1, an attempt to cancel may cause the underlying connection
        to be closed abruptly.

- With HTTP/2, an attempt to cancel may cause the stream to be reset.

Parameters:

- `<T>`: the response body type
- `request`: the request
- `responseBodyHandler`: the response body handler
- `pushPromiseHandler`: push promise handler, may be null

**Returns:** a `CompletableFuture<HttpResponse<T>>`

Throws:

- `IllegalArgumentException`: if the `request` argument is not a request that could have been validly built as specified by HttpRequest.Builder.

## HttpClient.newWebSocketBuilder()

```java
public WebSocket.Builder newWebSocketBuilder()
```

Creates a new `WebSocket` builder (optional operation).

 **Example**

 Finer control over the WebSocket Opening Handshake can be achieved
by using a custom `HttpClient`.

 **Example**

**Implementation requirements:** The default implementation of this method throws
`UnsupportedOperationException`. Clients obtained through
`HttpClient.newHttpClient()` or `HttpClient.newBuilder()`
return a `WebSocket` builder.

**Implementation note:** Both builder and `WebSocket`s created with it operate in
a non-blocking fashion. That is, their methods do not block before
returning a `CompletableFuture`. Asynchronous tasks are executed in
this `HttpClient`'s executor.

 When a `CompletionStage` returned from
Listener.onClose completes,
the `WebSocket` will send a Close message that has the same code
the received message has and an empty reason.

**Returns:** a `WebSocket.Builder`

Throws:

- `UnsupportedOperationException`: if this `HttpClient` does not provide WebSocket support

## HttpClient.shutdown()

```java
public void shutdown()
```

Initiates an orderly shutdown in which  requests previously
submitted with `send` or `sendAsync`
are run to completion, but no new request will be accepted.
Running a request to completion may involve running several
operations in the background, including waiting for responses to be delivered, which will all have to
run to completion until the request is considered completed.

Invocation has no additional effect if already shut down.

This method does not wait for previously submitted request
to complete execution.  Use awaitTermination or close to do that.

**Implementation requirements:** The default implementation of this method does nothing. Subclasses should
override this method to implement the appropriate behavior.

**See also:** ##closing Implementation Note on closing the HttpClient

**Since:** 21

## HttpClient.awaitTermination(Duration)

```java
public boolean awaitTermination(Duration duration) throws InterruptedException
```

Blocks until all operations have completed execution after a shutdown
request, or the `duration` elapses, or the current thread is
interrupted, whichever happens first.
Operations are any tasks required to run a request previously
submitted with `send` or `sendAsync` to completion.

 This method does not wait if the duration to wait is less than or
equal to zero. In this case, the method just tests if the thread has
terminated.

Parameters:

- `duration`: the maximum time to wait

**Implementation requirements:** The default implementation of this method checks for null arguments, but
otherwise does nothing and returns true.
Subclasses should override this method to implement the proper behavior.

**Returns:** `true` if this client terminated and
        `false` if the timeout elapsed before termination

**See also:** ##closing Implementation Note on closing the HttpClient

**Since:** 21

Throws:

- `InterruptedException`: if interrupted while waiting

## HttpClient.isTerminated()

```java
public boolean isTerminated()
```

Returns `true` if all operations have completed following
a shutdown.
Operations are any tasks required to run a request previously
submitted with `send` or `sendAsync` to completion.

 Note that `isTerminated` is never `true` unless
either `shutdown` or `shutdownNow` was called first.

**Implementation requirements:** The default implementation of this method does nothing and returns false.
Subclasses should override this method to implement the proper behavior.

**Returns:** `true` if all tasks have completed following a shutdown

**See also:** ##closing Implementation Note on closing the HttpClient

**Since:** 21

## HttpClient.shutdownNow()

```java
public void shutdownNow()
```

This method attempts to initiate an immediate shutdown.
An implementation of this method may attempt to
interrupt operations that are actively running.
Operations are any tasks required to run a request previously
submitted with `send` or `sendAsync` to completion.
The behavior of actively running operations when interrupted
is undefined. In particular, there is no guarantee that
interrupted operations will terminate, or that code waiting
on these operations will ever be notified.

**Implementation requirements:** The default implementation of this method simply calls `shutdown()`.
Subclasses should override this method to implement the appropriate
behavior.

**See also:** ##closing Implementation Note on closing the HttpClient

**Since:** 21

## HttpClient.close()

```java
public void close()
```

Initiates an orderly shutdown in which  requests previously
submitted to `send` or `sendAsync`
are run to completion, but no new request will be accepted.
Running a request to completion may involve running several
operations in the background, including waiting for responses to be delivered.
This method waits until all operations have completed execution
and the client has terminated.

 If interrupted while waiting, this method may attempt to stop all
operations by calling `shutdownNow()`. It then continues to wait
until all actively executing operations have completed.
The interrupt status will be re-asserted before this method returns.

 If already terminated, invoking this method has no effect.

**Implementation requirements:** The default implementation invokes `shutdown()` and waits for tasks
to complete execution with `awaitTermination`.

**See also:** ##closing Implementation Note on closing the HttpClient

**Since:** 21
