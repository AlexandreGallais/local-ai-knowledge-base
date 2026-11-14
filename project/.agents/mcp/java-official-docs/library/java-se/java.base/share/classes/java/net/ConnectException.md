---
title: "ConnectException class (java.net)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/net/ConnectException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ConnectException class (java.net)

```java
public class ConnectException extends SocketException
```

Signals that an error occurred while attempting to connect a
socket to a remote address and port.  Typically, the connection
was refused remotely (e.g., no process is listening on the
remote address/port).

**Since:** 1.1

## ConnectException.ConnectException(String)

```java
public ConnectException(String msg)
```

Constructs a new ConnectException with the specified detail
message as to why the connect error occurred.
A detail message is a String that gives a specific
description of this error.

Parameters:

- `msg`: the detail message

## ConnectException.ConnectException()

```java
public ConnectException()
```

Construct a new ConnectException with no detailed message.
