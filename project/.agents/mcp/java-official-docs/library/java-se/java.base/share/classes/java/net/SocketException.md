---
title: "SocketException class (java.net)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/net/SocketException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# SocketException class (java.net)

```java
public class SocketException extends IOException
```

Thrown to indicate that there is an error creating or accessing a Socket.

**Since:** 1.0

## SocketException.SocketException(String)

```java
public SocketException(String msg)
```

Constructs a new `SocketException` with the
specified detail message.

Parameters:

- `msg`: the detail message.

## SocketException.SocketException()

```java
public SocketException()
```

Constructs a new `SocketException` with no detail message.

## SocketException.SocketException(String, Throwable)

```java
public SocketException(String msg, Throwable cause)
```

Constructs a new `SocketException` with the
specified detail message and cause.

Parameters:

- `msg`: the detail message.
- `cause`: the cause

**Since:** 19

## SocketException.SocketException(Throwable)

```java
public SocketException(Throwable cause)
```

Constructs a new `SocketException` with the
specified cause.

Parameters:

- `cause`: the cause

**Since:** 19
