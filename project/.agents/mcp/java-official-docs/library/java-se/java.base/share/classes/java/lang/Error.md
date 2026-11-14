---
title: "Error class (java.lang)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/Error.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Error class (java.lang)

```java
public class Error extends Throwable
```

An `Error` is a subclass of `Throwable`
that indicates serious problems that a reasonable application
should not try to catch. Most such errors are abnormal conditions.

A method is not required to declare in its `throws`
clause any subclasses of `Error` that might be thrown
during the execution of the method but not caught, since these
errors are abnormal conditions that should never occur.

That is, `Error` and its subclasses are regarded as unchecked
exceptions for the purposes of compile-time checking of exceptions.

**JLS:** 11.2 Compile-Time Checking of Exceptions

**Since:** 1.0

## Error.Error()

```java
public Error()
```

Constructs a new error with `null` as its detail message.
The cause is not initialized, and may subsequently be initialized by a
call to `initCause`.

## Error.Error(String)

```java
public Error(String message)
```

Constructs a new error with the specified detail message.  The
cause is not initialized, and may subsequently be initialized by
a call to `initCause`.

Parameters:

- `message`: the detail message. The detail message is saved for later retrieval by the `getMessage()` method.

## Error.Error(String, Throwable)

```java
public Error(String message, Throwable cause)
```

Constructs a new error with the specified detail message and
cause.

Note that the detail message associated with
`cause` is *not* automatically incorporated in
this error's detail message.

Parameters:

- `message`: the detail message (which is saved for later retrieval by the `getMessage()` method).
- `cause`: the cause (which is saved for later retrieval by the `getCause()` method). (A `null` value is permitted, and indicates that the cause is nonexistent or unknown.)

**Since:** 1.4

## Error.Error(Throwable)

```java
public Error(Throwable cause)
```

Constructs a new error with the specified cause and a detail
message of `(cause==null ? null : cause.toString())` (which
typically contains the class and detail message of `cause`).
This constructor is useful for errors that are little more than
wrappers for other throwables.

Parameters:

- `cause`: the cause (which is saved for later retrieval by the `getCause()` method). (A `null` value is permitted, and indicates that the cause is nonexistent or unknown.)

**Since:** 1.4

## Error.Error(String, Throwable, boolean, boolean)

```java
protected Error(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace)
```

Constructs a new error with the specified detail message,
cause, suppression enabled or disabled, and writable stack
trace enabled or disabled.

Parameters:

- `message`: the detail message.
- `cause`: the cause. (A `null` value is permitted, and indicates that the cause is nonexistent or unknown.)
- `enableSuppression`: whether or not suppression is enabled or disabled
- `writableStackTrace`: whether or not the stack trace should be writable

**Since:** 1.7
