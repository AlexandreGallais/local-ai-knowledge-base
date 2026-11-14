---
title: "WrongThreadException class (java.lang)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/WrongThreadException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# WrongThreadException class (java.lang)

```java
public final class WrongThreadException extends RuntimeException
```

Thrown to indicate that a method has been called on the wrong thread.

**Since:** 19

## WrongThreadException.WrongThreadException()

```java
public WrongThreadException()
```

Constructs a WrongThreadException with no detail message.

## WrongThreadException.WrongThreadException(String)

```java
public WrongThreadException(String s)
```

Constructs a WrongThreadException with the given detail message.

Parameters:

- `s`: the String that contains a detailed message, can be null

## WrongThreadException.WrongThreadException(String, Throwable)

```java
public WrongThreadException(String message, Throwable cause)
```

Constructs a WrongThreadException with the given detail message and cause.

Parameters:

- `message`: the detail message, can be null
- `cause`: the cause, can be null

## WrongThreadException.WrongThreadException(Throwable)

```java
public WrongThreadException(Throwable cause)
```

Constructs a WrongThreadException with the given cause and a detail
message of `(cause==null ? null : cause.toString())` (which
typically contains the class and detail message of `cause`).

Parameters:

- `cause`: the cause, can be null
