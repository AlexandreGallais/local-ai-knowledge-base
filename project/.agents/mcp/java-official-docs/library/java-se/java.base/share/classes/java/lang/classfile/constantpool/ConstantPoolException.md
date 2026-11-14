---
title: "ConstantPoolException class (java.lang.classfile.constantpool)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/constantpool/ConstantPoolException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ConstantPoolException class (java.lang.classfile.constantpool)

```java
public class ConstantPoolException extends IllegalArgumentException
```

Thrown to indicate that requested entry cannot be obtained from the constant
pool or the bootstrap method table.  This is also thrown when the lazy
evaluation of constant pool or bootstrap method table entries encounter
format errors.

**Since:** 24

## ConstantPoolException.ConstantPoolException()

```java
public ConstantPoolException()
```

Constructs a `ConstantPoolException` with no detail message.

## ConstantPoolException.ConstantPoolException(String)

```java
public ConstantPoolException(String message)
```

Constructs a `ConstantPoolException` with the specified detail
message.

Parameters:

- `message`: the detail message, may be `null` for no detail message

## ConstantPoolException.ConstantPoolException(Throwable)

```java
public ConstantPoolException(Throwable cause)
```

Constructs a `ConstantPoolException` with the specified cause and
a detail message of `cause == null ? null : cause.toString()`.

Parameters:

- `cause`: the cause, may be `null` for nonexistent or unknown cause

## ConstantPoolException.ConstantPoolException(String, Throwable)

```java
public ConstantPoolException(String message, Throwable cause)
```

Constructs a `ConstantPoolException` with the specified detail
message and cause.

Parameters:

- `message`: the detail message, may be `null` for no detail message
- `cause`: the cause, may be `null` for nonexistent or unknown cause
