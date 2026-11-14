---
title: "SocketOption interface (java.net)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/net/SocketOption.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# SocketOption interface (java.net)

```java
public interface SocketOption<T>
```

A socket option associated with a socket.

 In the channels package, the `java.nio.channels.NetworkChannel` interface defines the setOption
and getOption
methods to set and query the channel's socket options.

Parameters:

- `<T>`: The type of the socket option value.

**Since:** 1.7

**See also:** StandardSocketOptions

## SocketOption.name()

```java
String name()
```

Returns the name of the socket option.

**Returns:** the name of the socket option

## SocketOption.type()

```java
Class<T> type()
```

Returns the type of the socket option value.

**Returns:** the type of the socket option value
