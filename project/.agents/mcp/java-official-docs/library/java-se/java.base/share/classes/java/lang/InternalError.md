---
title: "InternalError class (java.lang)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/InternalError.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# InternalError class (java.lang)

```java
public class InternalError extends VirtualMachineError
```

Thrown to indicate some unexpected internal error has occurred in
the Java Virtual Machine.

**Since:** 1.0

## InternalError.InternalError()

```java
public InternalError()
```

Constructs an `InternalError` with no detail message.

## InternalError.InternalError(String)

```java
public InternalError(String message)
```

Constructs an `InternalError` with the specified
detail message.

Parameters:

- `message`: the detail message.

## InternalError.InternalError(String, Throwable)

```java
public InternalError(String message, Throwable cause)
```

Constructs an `InternalError` with the specified detail
message and cause.

Note that the detail message associated
with `cause` is *not* automatically incorporated in
this error's detail message.

Parameters:

- `message`: the detail message (which is saved for later retrieval by the `getMessage()` method).
- `cause`: the cause (which is saved for later retrieval by the `getCause()` method). (A `null` value is permitted, and indicates that the cause is nonexistent or unknown.)

**Since:** 1.8

## InternalError.InternalError(Throwable)

```java
public InternalError(Throwable cause)
```

Constructs an `InternalError` with the specified cause
and a detail message of `(cause==null ? null : cause.toString())` (which typically contains the class and
detail message of `cause`).

Parameters:

- `cause`: the cause (which is saved for later retrieval by the `getCause()` method). (A `null` value is permitted, and indicates that the cause is nonexistent or unknown.)

**Since:** 1.8
