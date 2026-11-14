---
title: "BootstrapMethodError class (java.lang)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/BootstrapMethodError.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# BootstrapMethodError class (java.lang)

```java
public class BootstrapMethodError extends LinkageError
```

Thrown to indicate that an `invokedynamic` instruction or a dynamic
constant failed to resolve its bootstrap method and arguments,
or for `invokedynamic` instruction the bootstrap method has failed to
provide a
call site with a
target
of the correct method type,
or for a dynamic constant the bootstrap method has failed to provide a
constant value of the required type.

**Since:** 1.7

## BootstrapMethodError.BootstrapMethodError()

```java
public BootstrapMethodError()
```

Constructs a `BootstrapMethodError` with no detail message.

## BootstrapMethodError.BootstrapMethodError(String)

```java
public BootstrapMethodError(String s)
```

Constructs a `BootstrapMethodError` with the specified
detail message.

Parameters:

- `s`: the detail message.

## BootstrapMethodError.BootstrapMethodError(String, Throwable)

```java
public BootstrapMethodError(String s, Throwable cause)
```

Constructs a `BootstrapMethodError` with the specified
detail message and cause.

Parameters:

- `s`: the detail message.
- `cause`: the cause, may be `null`.

## BootstrapMethodError.BootstrapMethodError(Throwable)

```java
public BootstrapMethodError(Throwable cause)
```

Constructs a `BootstrapMethodError` with the specified
cause.

Parameters:

- `cause`: the cause, may be `null`.
