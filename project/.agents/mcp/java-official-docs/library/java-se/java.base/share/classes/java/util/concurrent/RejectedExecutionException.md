---
title: "RejectedExecutionException class (java.util.concurrent)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/concurrent/RejectedExecutionException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# RejectedExecutionException class (java.util.concurrent)

```java
public class RejectedExecutionException extends RuntimeException
```

Exception thrown by an `Executor` when a task cannot be
accepted for execution.

**Since:** 1.5

## RejectedExecutionException.RejectedExecutionException()

```java
public RejectedExecutionException()
```

Constructs a `RejectedExecutionException` with no detail message.
The cause is not initialized, and may subsequently be
initialized by a call to initCause.

## RejectedExecutionException.RejectedExecutionException(String)

```java
public RejectedExecutionException(String message)
```

Constructs a `RejectedExecutionException` with the
specified detail message. The cause is not initialized, and may
subsequently be initialized by a call to initCause.

Parameters:

- `message`: the detail message

## RejectedExecutionException.RejectedExecutionException(String, Throwable)

```java
public RejectedExecutionException(String message, Throwable cause)
```

Constructs a `RejectedExecutionException` with the
specified detail message and cause.

Parameters:

- `message`: the detail message
- `cause`: the cause (which is saved for later retrieval by the `getCause()` method)

## RejectedExecutionException.RejectedExecutionException(Throwable)

```java
public RejectedExecutionException(Throwable cause)
```

Constructs a `RejectedExecutionException` with the
specified cause.  The detail message is set to `(cause == null ? null : cause.toString())` (which typically contains
the class and detail message of `cause`).

Parameters:

- `cause`: the cause (which is saved for later retrieval by the `getCause()` method)
