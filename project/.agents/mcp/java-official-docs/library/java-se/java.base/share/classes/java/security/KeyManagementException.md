---
title: "KeyManagementException class (java.security)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/KeyManagementException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# KeyManagementException class (java.security)

```java
public class KeyManagementException extends KeyException
```

This is the general key <example-value> exception for all operations
dealing with key management. Examples of subclasses of
`KeyManagementException` that developers might create for
giving more detailed information could include:

- KeyIDConflictException

- KeyAuthorizationFailureException

- ExpiredKeyException

**Since:** 1.1

**See also:** Key

**See also:** KeyException

## KeyManagementException.KeyManagementException()

```java
public KeyManagementException()
```

Constructs a `KeyManagementException` with no detail message. A
detail message is a `String` that describes this particular
exception.

## KeyManagementException.KeyManagementException(String)

```java
public KeyManagementException(String msg)
```

Constructs a `KeyManagementException` with the specified detail
message. A detail message is a `String` that describes this
particular exception.

Parameters:

- `msg`: the detail message.

## KeyManagementException.KeyManagementException(String, Throwable)

```java
public KeyManagementException(String message, Throwable cause)
```

Creates a `KeyManagementException` with the specified
detail message and cause.

Parameters:

- `message`: the detail message (which is saved for later retrieval by the `getMessage()` method).
- `cause`: the cause (which is saved for later retrieval by the `getCause()` method). (A `null` value is permitted, and indicates that the cause is nonexistent or unknown.)

**Since:** 1.5

## KeyManagementException.KeyManagementException(Throwable)

```java
public KeyManagementException(Throwable cause)
```

Creates a `KeyManagementException` with the specified cause
and a detail message of `(cause==null ? null : cause.toString())`
(which typically contains the class and detail message of
`cause`).

Parameters:

- `cause`: the cause (which is saved for later retrieval by the `getCause()` method). (A `null` value is permitted, and indicates that the cause is nonexistent or unknown.)

**Since:** 1.5
