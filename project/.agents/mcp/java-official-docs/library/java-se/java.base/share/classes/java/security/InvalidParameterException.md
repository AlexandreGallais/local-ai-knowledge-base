---
title: "InvalidParameterException class (java.security)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/InvalidParameterException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# InvalidParameterException class (java.security)

```java
public class InvalidParameterException extends IllegalArgumentException
```

This exception, designed for use by the JCA/JCE engine classes,
is thrown when an invalid parameter is passed
to a method.

**Since:** 1.1

## InvalidParameterException.InvalidParameterException()

```java
public InvalidParameterException()
```

Constructs an `InvalidParameterException` with no detail message.
A detail message is a `String` that describes this particular
exception.

## InvalidParameterException.InvalidParameterException(String)

```java
public InvalidParameterException(String msg)
```

Constructs an `InvalidParameterException` with the specified
detail message.  A detail message is a `String` that describes
this particular exception.

Parameters:

- `msg`: the detail message.

## InvalidParameterException.InvalidParameterException(String, Throwable)

```java
public InvalidParameterException(String msg, Throwable cause)
```

Constructs an `InvalidParameterException` with the specified
detail message and cause. A detail message is a `String`
that describes this particular exception.

Note that the detail message associated with `cause` is
*not* automatically incorporated in this exception's detail
message.

Parameters:

- `msg`: the detail message (which is saved for later retrieval by the `Throwable.getMessage()` method).
- `cause`: the cause (which is saved for later retrieval by the `Throwable.getCause()` method). (A `null` value is permitted, and indicates that the cause is nonexistent or unknown.)

**Since:** 20

## InvalidParameterException.InvalidParameterException(Throwable)

```java
public InvalidParameterException(Throwable cause)
```

Constructs an `InvalidParameterException` with the specified cause
and a detail message of `(cause==null ? null : cause.toString())`
(which typically contains the class and detail message of `cause`).
This constructor is useful for exceptions that are little more than
wrappers for other throwables.

Parameters:

- `cause`: the cause (which is saved for later retrieval by the `Throwable.getCause()` method). (A `null` value is permitted, and indicates that the cause is nonexistent or unknown.)

**Since:** 20
