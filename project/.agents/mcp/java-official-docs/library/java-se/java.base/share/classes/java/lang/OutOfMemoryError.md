---
title: "OutOfMemoryError class (java.lang)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/OutOfMemoryError.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# OutOfMemoryError class (java.lang)

```java
public class OutOfMemoryError extends VirtualMachineError
```

Thrown when the Java Virtual Machine cannot allocate an object
because it is out of memory, and no more memory could be made
available by the garbage collector.

`OutOfMemoryError` objects may be constructed by the virtual
machine as if Throwable, boolean, boolean) suppression were disabled and/or the stack trace was not writable.

**Since:** 1.0

## OutOfMemoryError.OutOfMemoryError()

```java
public OutOfMemoryError()
```

Constructs an `OutOfMemoryError` with no detail message.

## OutOfMemoryError.OutOfMemoryError(String)

```java
public OutOfMemoryError(String s)
```

Constructs an `OutOfMemoryError` with the specified
detail message.

Parameters:

- `s`: the detail message.
