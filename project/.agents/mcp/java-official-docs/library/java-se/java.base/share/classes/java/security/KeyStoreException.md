---
title: "KeyStoreException class (java.security)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/KeyStoreException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# KeyStoreException class (java.security)

```java
public class KeyStoreException extends GeneralSecurityException
```

This is the generic KeyStore exception.

**Since:** 1.2

## KeyStoreException.KeyStoreException()

```java
public KeyStoreException()
```

Constructs a `KeyStoreException` with no detail message.  (A
detail message is a `String` that describes this particular
exception.)

## KeyStoreException.KeyStoreException(String)

```java
public KeyStoreException(String msg)
```

Constructs a `KeyStoreException` with the specified detail
message.  (A detail message is a `String` that describes this
particular exception.)

Parameters:

- `msg`: the detail message.

## KeyStoreException.KeyStoreException(String, Throwable)

```java
public KeyStoreException(String message, Throwable cause)
```

Creates a `KeyStoreException` with the specified
detail message and cause.

Parameters:

- `message`: the detail message (which is saved for later retrieval by the `getMessage()` method).
- `cause`: the cause (which is saved for later retrieval by the `getCause()` method). (A `null` value is permitted, and indicates that the cause is nonexistent or unknown.)

**Since:** 1.5

## KeyStoreException.KeyStoreException(Throwable)

```java
public KeyStoreException(Throwable cause)
```

Creates a `KeyStoreException` with the specified cause
and a detail message of `(cause==null ? null : cause.toString())`
(which typically contains the class and detail message of
`cause`).

Parameters:

- `cause`: the cause (which is saved for later retrieval by the `getCause()` method). (A `null` value is permitted, and indicates that the cause is nonexistent or unknown.)

**Since:** 1.5
