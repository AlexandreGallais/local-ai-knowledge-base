---
title: "SocketAddress class (java.net)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/net/SocketAddress.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# SocketAddress class (java.net)

```java
public abstract class SocketAddress implements java.io.Serializable
```

This class represents a Socket Address with no protocol attachment.
As an abstract class, it is meant to be subclassed with a specific,
protocol dependent, implementation.

It provides an immutable object used by sockets for binding, connecting, or
as returned values.

**See also:** java.net.Socket

**See also:** java.net.ServerSocket

**Since:** 1.4

## SocketAddress.SocketAddress()

```java
public SocketAddress()
```

Constructor for subclasses to call.
