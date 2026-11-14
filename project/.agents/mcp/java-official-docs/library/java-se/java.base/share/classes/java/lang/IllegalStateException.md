---
title: "IllegalStateException class (java.lang)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/IllegalStateException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# IllegalStateException class (java.lang)

```java
public class IllegalStateException extends RuntimeException
```

Signals that a method has been invoked at an illegal or
inappropriate time.  In other words, the Java environment or
Java application is not in an appropriate state for the requested
operation.

**Since:** 1.1

## IllegalStateException.IllegalStateException()

```java
public IllegalStateException()
```

Constructs an IllegalStateException with no detail message.
A detail message is a String that describes this particular exception.

## IllegalStateException.IllegalStateException(String)

```java
public IllegalStateException(String s)
```

Constructs an IllegalStateException with the specified detail
message.  A detail message is a String that describes this particular
exception.

Parameters:

- `s`: the String that contains a detailed message

## IllegalStateException.IllegalStateException(String, Throwable)

```java
public IllegalStateException(String message, Throwable cause)
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

## IllegalStateException.IllegalStateException(Throwable)

```java
public IllegalStateException(Throwable cause)
```

Constructs a new exception with the specified cause and a detail
message of `(cause==null ? null : cause.toString())` (which
typically contains the class and detail message of `cause`).
This constructor is useful for exceptions that are little more than
wrappers for other throwables (for example, `java.security.PrivilegedActionException`).

Parameters:

- `cause`: the cause (which is saved for later retrieval by the `Throwable.getCause()` method). (A `null` value is permitted, and indicates that the cause is nonexistent or unknown.)

**Since:** 1.5
