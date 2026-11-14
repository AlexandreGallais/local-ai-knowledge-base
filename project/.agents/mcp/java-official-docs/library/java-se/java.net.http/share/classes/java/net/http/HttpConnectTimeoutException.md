---
title: "HttpConnectTimeoutException class (java.net.http)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.net.http/share/classes/java/net/http/HttpConnectTimeoutException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# HttpConnectTimeoutException class (java.net.http)

```java
public class HttpConnectTimeoutException extends HttpTimeoutException
```

Thrown when a connection, over which an `HttpRequest` is intended to be
sent, is not successfully established within a specified time period.

**Since:** 11

## HttpConnectTimeoutException.HttpConnectTimeoutException(String)

```java
public HttpConnectTimeoutException(String message)
```

Constructs an `HttpConnectTimeoutException` with the given detail
message.

Parameters:

- `message`: The detail message; can be `null`
