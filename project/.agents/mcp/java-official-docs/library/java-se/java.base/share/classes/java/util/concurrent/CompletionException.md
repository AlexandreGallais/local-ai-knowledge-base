---
title: "CompletionException class (java.util.concurrent)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/concurrent/CompletionException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# CompletionException class (java.util.concurrent)

```java
public class CompletionException extends RuntimeException
```

Exception thrown when an error or other exception is encountered
in the course of completing a result or task.

**Since:** 1.8

## CompletionException.CompletionException()

```java
protected CompletionException()
```

Constructs a `CompletionException` with no detail message.
The cause is not initialized, and may subsequently be
initialized by a call to initCause.

## CompletionException.CompletionException(String)

```java
protected CompletionException(String message)
```

Constructs a `CompletionException` with the specified detail
message. The cause is not initialized, and may subsequently be
initialized by a call to initCause.

Parameters:

- `message`: the detail message

## CompletionException.CompletionException(String, Throwable)

```java
public CompletionException(String message, Throwable cause)
```

Constructs a `CompletionException` with the specified detail
message and cause.

Parameters:

- `message`: the detail message
- `cause`: the cause (which is saved for later retrieval by the `getCause()` method)

## CompletionException.CompletionException(Throwable)

```java
public CompletionException(Throwable cause)
```

Constructs a `CompletionException` with the specified cause.
The detail message is set to `(cause == null ? null : cause.toString())` (which typically contains the class and
detail message of `cause`).

Parameters:

- `cause`: the cause (which is saved for later retrieval by the `getCause()` method)
