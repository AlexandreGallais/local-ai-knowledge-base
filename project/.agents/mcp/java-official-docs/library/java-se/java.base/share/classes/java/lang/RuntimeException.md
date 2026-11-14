---
title: "RuntimeException class (java.lang)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/RuntimeException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# RuntimeException class (java.lang)

```java
public class RuntimeException extends Exception
```

`RuntimeException` is the superclass of those
exceptions that can be thrown during the normal operation of the
Java Virtual Machine.

`RuntimeException` and its subclasses are *unchecked
exceptions*.  Unchecked exceptions do *not* need to be
declared in a method or constructor's `throws` clause if they
can be thrown by the execution of the method or constructor and
propagate outside the method or constructor boundary.

**JLS:** 11.2 Compile-Time Checking of Exceptions

**Since:** 1.0

## RuntimeException.RuntimeException()

```java
public RuntimeException()
```

Constructs a new runtime exception with `null` as its
detail message.  The cause is not initialized, and may subsequently be
initialized by a call to `initCause`.

## RuntimeException.RuntimeException(String)

```java
public RuntimeException(String message)
```

Constructs a new runtime exception with the specified detail message.
The cause is not initialized, and may subsequently be initialized by a
call to `initCause`.

Parameters:

- `message`: the detail message. The detail message is saved for later retrieval by the `getMessage()` method.

## RuntimeException.RuntimeException(String, Throwable)

```java
public RuntimeException(String message, Throwable cause)
```

Constructs a new runtime exception with the specified detail message and
cause.

Note that the detail message associated with
`cause` is *not* automatically incorporated in
this runtime exception's detail message.

Parameters:

- `message`: the detail message (which is saved for later retrieval by the `getMessage()` method).
- `cause`: the cause (which is saved for later retrieval by the `getCause()` method). (A `null` value is permitted, and indicates that the cause is nonexistent or unknown.)

**Since:** 1.4

## RuntimeException.RuntimeException(Throwable)

```java
public RuntimeException(Throwable cause)
```

Constructs a new runtime exception with the specified cause and a
detail message of `(cause==null ? null : cause.toString())`
(which typically contains the class and detail message of
`cause`).  This constructor is useful for runtime exceptions
that are little more than wrappers for other throwables.

Parameters:

- `cause`: the cause (which is saved for later retrieval by the `getCause()` method). (A `null` value is permitted, and indicates that the cause is nonexistent or unknown.)

**Since:** 1.4

## RuntimeException.RuntimeException(String, Throwable, boolean, boolean)

```java
protected RuntimeException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace)
```

Constructs a new runtime exception with the specified detail
message, cause, suppression enabled or disabled, and writable
stack trace enabled or disabled.

Parameters:

- `message`: the detail message.
- `cause`: the cause. (A `null` value is permitted, and indicates that the cause is nonexistent or unknown.)
- `enableSuppression`: whether or not suppression is enabled or disabled
- `writableStackTrace`: whether or not the stack trace should be writable

**Since:** 1.7
