---
title: "VirtualMachineError class (java.lang)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/VirtualMachineError.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# VirtualMachineError class (java.lang)

```java
public abstract class VirtualMachineError extends Error
```

Thrown to indicate that the Java Virtual Machine is broken or has
run out of resources necessary for it to continue operating.

**Since:** 1.0

## VirtualMachineError.VirtualMachineError()

```java
public VirtualMachineError()
```

Constructs a `VirtualMachineError` with no detail message.

## VirtualMachineError.VirtualMachineError(String)

```java
public VirtualMachineError(String message)
```

Constructs a `VirtualMachineError` with the specified
detail message.

Parameters:

- `message`: the detail message.

## VirtualMachineError.VirtualMachineError(String, Throwable)

```java
public VirtualMachineError(String message, Throwable cause)
```

Constructs a `VirtualMachineError` with the specified
detail message and cause.

Note that the detail message
associated with `cause` is *not* automatically
incorporated in this error's detail message.

Parameters:

- `message`: the detail message (which is saved for later retrieval by the `getMessage()` method).
- `cause`: the cause (which is saved for later retrieval by the `getCause()` method). (A `null` value is permitted, and indicates that the cause is nonexistent or unknown.)

**Since:** 1.8

## VirtualMachineError.VirtualMachineError(Throwable)

```java
public VirtualMachineError(Throwable cause)
```

Constructs a `VirtualMachineError` with the specified
cause and a detail message of `(cause==null ? null : cause.toString())` (which typically contains the class and
detail message of `cause`).

Parameters:

- `cause`: the cause (which is saved for later retrieval by the `getCause()` method). (A `null` value is permitted, and indicates that the cause is nonexistent or unknown.)

**Since:** 1.8
