---
title: "CertStoreException class (java.security.cert)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/cert/CertStoreException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# CertStoreException class (java.security.cert)

```java
public class CertStoreException extends GeneralSecurityException
```

An exception indicating one of a variety of problems retrieving
certificates and CRLs from a `CertStore`.

A `CertStoreException` provides support for wrapping
exceptions. The getCause method returns the throwable,
if any, that caused this exception to be thrown.

**Concurrent Access**

Unless otherwise specified, the methods defined in this class are not
thread-safe. Multiple threads that need to access a single
object concurrently should synchronize amongst themselves and
provide the necessary locking. Multiple threads each manipulating
separate objects need not synchronize.

**See also:** CertStore

**Since:** 1.4

## CertStoreException.CertStoreException()

```java
public CertStoreException()
```

Creates a `CertStoreException` with `null` as
its detail message.

## CertStoreException.CertStoreException(String)

```java
public CertStoreException(String msg)
```

Creates a `CertStoreException` with the given detail
message. A detail message is a `String` that describes this
particular exception.

Parameters:

- `msg`: the detail message

## CertStoreException.CertStoreException(Throwable)

```java
public CertStoreException(Throwable cause)
```

Creates a `CertStoreException` that wraps the specified
throwable. This allows any exception to be converted into a
`CertStoreException`, while retaining information about the
cause, which may be useful for debugging. The detail message is
set to (`cause==null ? null : cause.toString()`) (which
typically contains the class and detail message of cause).

Parameters:

- `cause`: the cause (which is saved for later retrieval by the getCause() method). (A `null` value is permitted, and indicates that the cause is nonexistent or unknown.)

## CertStoreException.CertStoreException(String, Throwable)

```java
public CertStoreException(String msg, Throwable cause)
```

Creates a `CertStoreException` with the specified detail
message and cause.

Parameters:

- `msg`: the detail message
- `cause`: the cause (which is saved for later retrieval by the getCause() method). (A `null` value is permitted, and indicates that the cause is nonexistent or unknown.)
