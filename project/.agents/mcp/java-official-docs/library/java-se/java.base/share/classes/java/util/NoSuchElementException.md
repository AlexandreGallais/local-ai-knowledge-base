---
title: "NoSuchElementException class (java.util)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/NoSuchElementException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# NoSuchElementException class (java.util)

```java
public class NoSuchElementException extends RuntimeException
```

Thrown by various accessor methods to indicate that the element being requested
does not exist.

**See also:** java.util.Enumeration#nextElement()

**See also:** java.util.Iterator#next()

**Since:** 1.0

## NoSuchElementException.NoSuchElementException()

```java
public NoSuchElementException()
```

Constructs a `NoSuchElementException` with `null`
as its error message string.

## NoSuchElementException.NoSuchElementException(String, Throwable)

```java
public NoSuchElementException(String s, Throwable cause)
```

Constructs a `NoSuchElementException` with the specified detail
message and cause.

Parameters:

- `s`: the detail message, or null
- `cause`: the cause (which is saved for later retrieval by the `getCause()` method), or null

**Since:** 15

## NoSuchElementException.NoSuchElementException(Throwable)

```java
public NoSuchElementException(Throwable cause)
```

Constructs a `NoSuchElementException` with the specified cause.
The detail message is set to `(cause == null ? null : cause.toString())` (which typically contains the class and
detail message of `cause`).

Parameters:

- `cause`: the cause (which is saved for later retrieval by the `getCause()` method)

**Since:** 15

## NoSuchElementException.NoSuchElementException(String)

```java
public NoSuchElementException(String s)
```

Constructs a `NoSuchElementException`, saving a reference
to the error message string `s` for later retrieval by the
`getMessage` method.

Parameters:

- `s`: the detail message.
