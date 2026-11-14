---
title: "NoRouteToHostException class (java.net)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/net/NoRouteToHostException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# NoRouteToHostException class (java.net)

```java
public class NoRouteToHostException extends SocketException
```

Signals that an error occurred while attempting to connect a
socket to a remote address and port.  Typically, the remote
host cannot be reached because of an intervening firewall, or
if an intermediate router is down.

**Since:** 1.1

## NoRouteToHostException.NoRouteToHostException(String)

```java
public NoRouteToHostException(String msg)
```

Constructs a new NoRouteToHostException with the specified detail
message as to why the remote host cannot be reached.
A detail message is a String that gives a specific
description of this error.

Parameters:

- `msg`: the detail message

## NoRouteToHostException.NoRouteToHostException()

```java
public NoRouteToHostException()
```

Construct a new NoRouteToHostException with no detailed message.
