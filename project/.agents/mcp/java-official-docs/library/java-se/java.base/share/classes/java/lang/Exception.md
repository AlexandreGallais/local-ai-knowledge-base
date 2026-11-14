---
title: "Exception class (java.lang)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/Exception.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Exception class (java.lang)

```java
public class Exception extends Throwable
```

The class `Exception` and its subclasses are a form of
`Throwable` that indicates conditions that a reasonable
application might want to catch.

The class `Exception` and any subclasses that are not also
subclasses of `RuntimeException` are *checked
exceptions*.  Checked exceptions need to be declared in a
method or constructor's `throws` clause if they can be thrown
by the execution of the method or constructor and propagate outside
the method or constructor boundary.

**See also:** java.lang.Error

**JLS:** 11.2 Compile-Time Checking of Exceptions

**Since:** 1.0

## Exception.Exception()

```java
public Exception()
```

Constructs a new exception with `null` as its detail message.
The cause is not initialized, and may subsequently be initialized by a
call to `initCause`.

## Exception.Exception(String)

```java
public Exception(String message)
```

Constructs a new exception with the specified detail message.  The
cause is not initialized, and may subsequently be initialized by
a call to `initCause`.

Parameters:

- `message`: the detail message. The detail message is saved for later retrieval by the `getMessage()` method.

## Exception.Exception(String, Throwable)

```java
public Exception(String message, Throwable cause)
```

Constructs a new exception with the specified detail message and
cause.

Note that the detail message associated with
`cause` is *not* automatically incorporated in
this exception's detail message.

Parameters:

- `message`: the detail message (which is saved for later retrieval by the `getMessage()` method).
- `cause`: the cause (which is saved for later retrieval by the `getCause()` method). (A `null` value is permitted, and indicates that the cause is nonexistent or unknown.)

**Since:** 1.4

## Exception.Exception(Throwable)

```java
public Exception(Throwable cause)
```

Constructs a new exception with the specified cause and a detail
message of `(cause==null ? null : cause.toString())` (which
typically contains the class and detail message of `cause`).
This constructor is useful for exceptions that are little more than
wrappers for other throwables (for example, `java.security.PrivilegedActionException`).

Parameters:

- `cause`: the cause (which is saved for later retrieval by the `getCause()` method). (A `null` value is permitted, and indicates that the cause is nonexistent or unknown.)

**Since:** 1.4

## Exception.Exception(String, Throwable, boolean, boolean)

```java
protected Exception(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace)
```

Constructs a new exception with the specified detail message,
cause, suppression enabled or disabled, and writable stack
trace enabled or disabled.

Parameters:

- `message`: the detail message.
- `cause`: the cause. (A `null` value is permitted, and indicates that the cause is nonexistent or unknown.)
- `enableSuppression`: whether or not suppression is enabled or disabled
- `writableStackTrace`: whether or not the stack trace should be writable

**Since:** 1.7
