---
title: "IllegalArgumentException class (java.lang)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/IllegalArgumentException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# IllegalArgumentException class (java.lang)

```java
public class IllegalArgumentException extends RuntimeException
```

Thrown to indicate that a method has been passed an illegal or
inappropriate argument.

**Since:** 1.0

## IllegalArgumentException.IllegalArgumentException()

```java
public IllegalArgumentException()
```

Constructs an `IllegalArgumentException` with no
detail message.

## IllegalArgumentException.IllegalArgumentException(String)

```java
public IllegalArgumentException(String s)
```

Constructs an `IllegalArgumentException` with the
specified detail message.

Parameters:

- `s`: the detail message.

## IllegalArgumentException.IllegalArgumentException(String, Throwable)

```java
public IllegalArgumentException(String message, Throwable cause)
```

Constructs a new exception with the specified detail message and
cause.

Note that the detail message associated with `cause` is
*not* automatically incorporated in this exception's detail
message.

Parameters:

- `message`: the detail message (which is saved for later retrieval by the `Throwable.getMessage()` method).
- `cause`: the cause (which is saved for later retrieval by the `Throwable.getCause()` method). (A `null` value is permitted, and indicates that the cause is nonexistent or unknown.)

**Since:** 1.5

## IllegalArgumentException.IllegalArgumentException(Throwable)

```java
public IllegalArgumentException(Throwable cause)
```

Constructs a new exception with the specified cause and a detail
message of `(cause==null ? null : cause.toString())` (which
typically contains the class and detail message of `cause`).
This constructor is useful for exceptions that are little more than
wrappers for other throwables (for example, `java.security.PrivilegedActionException`).

Parameters:

- `cause`: the cause (which is saved for later retrieval by the `Throwable.getCause()` method). (A `null` value is permitted, and indicates that the cause is nonexistent or unknown.)

**Since:** 1.5
