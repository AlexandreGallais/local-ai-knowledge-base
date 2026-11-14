---
title: "HttpTimeoutException class (java.net.http)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.net.http/share/classes/java/net/http/HttpTimeoutException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# HttpTimeoutException class (java.net.http)

```java
public class HttpTimeoutException extends IOException
```

Thrown when a response is not received within a specified time period.

**Since:** 11

## HttpTimeoutException.HttpTimeoutException(String)

```java
public HttpTimeoutException(String message)
```

Constructs an `HttpTimeoutException` with the given detail message.

Parameters:

- `message`: The detail message; can be `null`
