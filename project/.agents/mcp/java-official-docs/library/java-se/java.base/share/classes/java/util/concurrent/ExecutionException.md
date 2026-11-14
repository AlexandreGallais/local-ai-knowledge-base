---
title: "ExecutionException class (java.util.concurrent)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/concurrent/ExecutionException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ExecutionException class (java.util.concurrent)

```java
public class ExecutionException extends Exception
```

Exception thrown when attempting to retrieve the result of a task
that aborted by throwing an exception. This exception can be
inspected using the `getCause()` method.

**See also:** Future

**Since:** 1.5

## ExecutionException.ExecutionException()

```java
protected ExecutionException()
```

Constructs an `ExecutionException` with no detail message.
The cause is not initialized, and may subsequently be
initialized by a call to initCause.

## ExecutionException.ExecutionException(String)

```java
protected ExecutionException(String message)
```

Constructs an `ExecutionException` with the specified detail
message. The cause is not initialized, and may subsequently be
initialized by a call to initCause.

Parameters:

- `message`: the detail message

## ExecutionException.ExecutionException(String, Throwable)

```java
public ExecutionException(String message, Throwable cause)
```

Constructs an `ExecutionException` with the specified detail
message and cause.

Parameters:

- `message`: the detail message
- `cause`: the cause (which is saved for later retrieval by the `getCause()` method)

## ExecutionException.ExecutionException(Throwable)

```java
public ExecutionException(Throwable cause)
```

Constructs an `ExecutionException` with the specified cause.
The detail message is set to `(cause == null ? null : cause.toString())` (which typically contains the class and
detail message of `cause`).

Parameters:

- `cause`: the cause (which is saved for later retrieval by the `getCause()` method)
