---
title: "PortUnreachableException class (java.net)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/net/PortUnreachableException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# PortUnreachableException class (java.net)

```java
public class PortUnreachableException extends SocketException
```

Signals that an ICMP Port Unreachable message has been
received on a connected datagram.

**Since:** 1.4

## PortUnreachableException.PortUnreachableException(String)

```java
public PortUnreachableException(String msg)
```

Constructs a new `PortUnreachableException` with a
detail message.

Parameters:

- `msg`: the detail message

## PortUnreachableException.PortUnreachableException()

```java
public PortUnreachableException()
```

Construct a new `PortUnreachableException` with no
detailed message.
