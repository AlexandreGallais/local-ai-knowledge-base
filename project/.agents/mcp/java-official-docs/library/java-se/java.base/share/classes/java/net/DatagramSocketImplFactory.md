---
title: "DatagramSocketImplFactory interface (java.net)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/net/DatagramSocketImplFactory.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# DatagramSocketImplFactory interface (java.net)

```java
public interface DatagramSocketImplFactory
```

This interface defines a factory for datagram socket implementations. It
is used by the classes `DatagramSocket` to create actual socket
implementations.

**See also:** java.net.DatagramSocket

**Since:** 1.3

## DatagramSocketImplFactory.createDatagramSocketImpl()

```java
DatagramSocketImpl createDatagramSocketImpl()
```

Creates a new `DatagramSocketImpl` instance.

**Returns:** a new instance of `DatagramSocketImpl`.

**See also:** java.net.DatagramSocketImpl
