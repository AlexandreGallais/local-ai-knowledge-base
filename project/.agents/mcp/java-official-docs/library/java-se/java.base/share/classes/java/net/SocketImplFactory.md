---
title: "SocketImplFactory interface (java.net)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/net/SocketImplFactory.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# SocketImplFactory interface (java.net)

```java
public interface SocketImplFactory
```

This interface defines a factory for socket implementations. It
is used by the classes `Socket` and
`ServerSocket` to create actual socket
implementations.

**See also:** java.net.Socket

**See also:** java.net.ServerSocket

**Since:** 1.0

## SocketImplFactory.createSocketImpl()

```java
SocketImpl createSocketImpl()
```

Creates a new `SocketImpl` instance.

**Returns:** a new instance of `SocketImpl`.

**See also:** java.net.SocketImpl
