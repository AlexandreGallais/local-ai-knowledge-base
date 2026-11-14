---
title: "CertPathBuilderException class (java.security.cert)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/cert/CertPathBuilderException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# CertPathBuilderException class (java.security.cert)

```java
public class CertPathBuilderException extends GeneralSecurityException
```

An exception indicating one of a variety of problems encountered when
building a certification path with a `CertPathBuilder`.

A `CertPathBuilderException` provides support for wrapping
exceptions. The getCause method returns the throwable,
if any, that caused this exception to be thrown.

**Concurrent Access**

Unless otherwise specified, the methods defined in this class are not
thread-safe. Multiple threads that need to access a single
object concurrently should synchronize amongst themselves and
provide the necessary locking. Multiple threads each manipulating
separate objects need not synchronize.

**See also:** CertPathBuilder

**Since:** 1.4

## CertPathBuilderException.CertPathBuilderException()

```java
public CertPathBuilderException()
```

Creates a `CertPathBuilderException` with `null`
as its detail message.

## CertPathBuilderException.CertPathBuilderException(String)

```java
public CertPathBuilderException(String msg)
```

Creates a `CertPathBuilderException` with the given
detail message. The detail message is a `String` that
describes this particular exception in more detail.

Parameters:

- `msg`: the detail message

## CertPathBuilderException.CertPathBuilderException(Throwable)

```java
public CertPathBuilderException(Throwable cause)
```

Creates a `CertPathBuilderException` that wraps the specified
throwable. This allows any exception to be converted into a
`CertPathBuilderException`, while retaining information
about the wrapped exception, which may be useful for debugging. The
detail message is set to (`cause==null ? null : cause.toString()`)
(which typically contains the class and detail message of
cause).

Parameters:

- `cause`: the cause (which is saved for later retrieval by the getCause() method). (A `null` value is permitted, and indicates that the cause is nonexistent or unknown.)

## CertPathBuilderException.CertPathBuilderException(String, Throwable)

```java
public CertPathBuilderException(String msg, Throwable cause)
```

Creates a `CertPathBuilderException` with the specified
detail message and cause.

Parameters:

- `msg`: the detail message
- `cause`: the cause (which is saved for later retrieval by the getCause() method). (A `null` value is permitted, and indicates that the cause is nonexistent or unknown.)
