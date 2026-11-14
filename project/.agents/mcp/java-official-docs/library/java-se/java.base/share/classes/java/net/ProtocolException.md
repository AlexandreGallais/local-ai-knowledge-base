---
title: "ProtocolException class (java.net)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/net/ProtocolException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ProtocolException class (java.net)

```java
public class ProtocolException extends IOException
```

Thrown to indicate that there is an error in the underlying
protocol, such as a TCP error.

**Since:** 1.0

## ProtocolException.ProtocolException(String)

```java
public ProtocolException(String message)
```

Constructs a new `ProtocolException` with the
specified detail message.

Parameters:

- `message`: the detail message.

## ProtocolException.ProtocolException()

```java
public ProtocolException()
```

Constructs a new `ProtocolException` with no detail message.
