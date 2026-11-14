---
title: "KeyException class (java.security)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/KeyException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# KeyException class (java.security)

```java
public class KeyException extends GeneralSecurityException
```

This is the basic key exception.

**See also:** Key

**See also:** InvalidKeyException

**See also:** KeyManagementException

**Since:** 1.1

## KeyException.KeyException()

```java
public KeyException()
```

Constructs a `KeyException` with no detail message. A detail
message is a `String` that describes this particular exception.

## KeyException.KeyException(String)

```java
public KeyException(String msg)
```

Constructs a `KeyException` with the specified detail message.
A detail message is a `String` that describes this particular
exception.

Parameters:

- `msg`: the detail message.

## KeyException.KeyException(String, Throwable)

```java
public KeyException(String message, Throwable cause)
```

Creates a `KeyException` with the specified
detail message and cause.

Parameters:

- `message`: the detail message (which is saved for later retrieval by the `getMessage()` method).
- `cause`: the cause (which is saved for later retrieval by the `getCause()` method). (A `null` value is permitted, and indicates that the cause is nonexistent or unknown.)

**Since:** 1.5

## KeyException.KeyException(Throwable)

```java
public KeyException(Throwable cause)
```

Creates a `KeyException` with the specified cause
and a detail message of `(cause==null ? null : cause.toString())`
(which typically contains the class and detail message of
`cause`).

Parameters:

- `cause`: the cause (which is saved for later retrieval by the `getCause()` method). (A `null` value is permitted, and indicates that the cause is nonexistent or unknown.)

**Since:** 1.5
