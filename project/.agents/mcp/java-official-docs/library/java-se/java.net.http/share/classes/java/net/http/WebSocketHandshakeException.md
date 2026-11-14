---
title: "WebSocketHandshakeException class (java.net.http)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.net.http/share/classes/java/net/http/WebSocketHandshakeException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# WebSocketHandshakeException class (java.net.http)

```java
public final class WebSocketHandshakeException extends IOException
```

Thrown when the opening handshake has failed.

**Since:** 11

## WebSocketHandshakeException.WebSocketHandshakeException(HttpResponse<?>)

```java
public WebSocketHandshakeException(HttpResponse<?> response)
```

Constructs a `WebSocketHandshakeException` with the given
`HttpResponse`.

Parameters:

- `response`: the `HttpResponse` that resulted in the handshake failure

## WebSocketHandshakeException.getResponse()

```java
public HttpResponse<?> getResponse()
```

Returns the server's counterpart of the opening handshake.

 The value may be unavailable (`null`) if this exception has
been serialized and then deserialized.

**API note:** The primary purpose of this method is to allow programmatic
examination of the reasons behind the failure of the opening handshake.
Some of these reasons might allow recovery.

**Returns:** server response
