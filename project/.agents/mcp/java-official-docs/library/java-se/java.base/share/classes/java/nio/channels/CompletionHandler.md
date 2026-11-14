---
title: "CompletionHandler interface (java.nio.channels)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/nio/channels/CompletionHandler.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# CompletionHandler interface (java.nio.channels)

```java
public interface CompletionHandler<V,A>
```

A handler for consuming the result of an asynchronous I/O operation.

 The asynchronous channels defined in this package allow a completion
handler to be specified to consume the result of an asynchronous operation.
The completed method is invoked when the I/O operation
completes successfully. The failed method is invoked if the
I/O operations fails. The implementations of these methods should complete
in a timely manner so as to avoid keeping the invoking thread from dispatching
to other completion handlers.

Parameters:

- `<V>`: The result type of the I/O operation
- ``: The type of the object attached to the I/O operation

**Since:** 1.7

## CompletionHandler.completed(V, A)

```java
void completed(V result, A attachment)
```

Invoked when an operation has completed.

Parameters:

- `result`: The result of the I/O operation.
- `attachment`: The object attached to the I/O operation when it was initiated.

## CompletionHandler.failed(Throwable, A)

```java
void failed(Throwable exc, A attachment)
```

Invoked when an operation fails.

Parameters:

- `exc`: The exception to indicate why the I/O operation failed
- `attachment`: The object attached to the I/O operation when it was initiated.
