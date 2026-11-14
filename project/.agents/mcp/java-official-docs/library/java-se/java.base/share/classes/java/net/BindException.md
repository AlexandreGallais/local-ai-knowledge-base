---
title: "BindException class (java.net)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/net/BindException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# BindException class (java.net)

```java
public class BindException extends SocketException
```

Signals that an error occurred while attempting to bind a
socket to a local address and port.  Typically, the port is
in use, or the requested local address could not be assigned.

**Since:** 1.1

## BindException.BindException(String)

```java
public BindException(String msg)
```

Constructs a new BindException with the specified detail
message as to why the bind error occurred.
A detail message is a String that gives a specific
description of this error.

Parameters:

- `msg`: the detail message

## BindException.BindException()

```java
public BindException()
```

Construct a new BindException with no detailed message.
