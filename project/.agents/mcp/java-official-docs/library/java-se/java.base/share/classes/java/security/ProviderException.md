---
title: "ProviderException class (java.security)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/ProviderException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ProviderException class (java.security)

```java
public class ProviderException extends RuntimeException
```

A runtime exception for `Provider` exceptions (such as
misconfiguration errors or unrecoverable internal errors),
which may be subclassed by Providers to
throw specialized, provider-specific runtime errors.

**Since:** 1.1

## ProviderException.ProviderException()

```java
public ProviderException()
```

Constructs a `ProviderException` with no detail message. A
detail message is a `String` that describes this particular
exception.

## ProviderException.ProviderException(String)

```java
public ProviderException(String s)
```

Constructs a `ProviderException` with the specified detail
message. A detail message is a `String` that describes this
particular exception.

Parameters:

- `s`: the detail message.

## ProviderException.ProviderException(String, Throwable)

```java
public ProviderException(String message, Throwable cause)
```

Creates a `ProviderException` with the specified
detail message and cause.

Parameters:

- `message`: the detail message (which is saved for later retrieval by the `getMessage()` method).
- `cause`: the cause (which is saved for later retrieval by the `getCause()` method). (A `null` value is permitted, and indicates that the cause is nonexistent or unknown.)

**Since:** 1.5

## ProviderException.ProviderException(Throwable)

```java
public ProviderException(Throwable cause)
```

Creates a `ProviderException` with the specified cause
and a detail message of `(cause==null ? null : cause.toString())`
(which typically contains the class and detail message of
`cause`).

Parameters:

- `cause`: the cause (which is saved for later retrieval by the `getCause()` method). (A `null` value is permitted, and indicates that the cause is nonexistent or unknown.)

**Since:** 1.5
