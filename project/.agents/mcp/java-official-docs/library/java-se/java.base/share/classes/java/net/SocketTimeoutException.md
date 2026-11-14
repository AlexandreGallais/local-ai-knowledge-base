---
title: "SocketTimeoutException class (java.net)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/net/SocketTimeoutException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# SocketTimeoutException class (java.net)

```java
public class SocketTimeoutException extends java.io.InterruptedIOException
```

Signals that a timeout has occurred on a socket read or accept.

**Since:** 1.4

## SocketTimeoutException.SocketTimeoutException(String)

```java
public SocketTimeoutException(String msg)
```

Constructs a new SocketTimeoutException with a detail
message.

Parameters:

- `msg`: the detail message

## SocketTimeoutException.SocketTimeoutException()

```java
public SocketTimeoutException()
```

Construct a new SocketTimeoutException with no detailed message.
