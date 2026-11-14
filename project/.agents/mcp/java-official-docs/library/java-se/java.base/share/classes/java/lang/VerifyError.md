---
title: "VerifyError class (java.lang)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/VerifyError.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# VerifyError class (java.lang)

```java
public class VerifyError extends LinkageError
```

Thrown when the "verifier" detects that a class file,
though well formed, contains some sort of internal inconsistency
or security problem.

**Since:** 1.0

## VerifyError.VerifyError()

```java
public VerifyError()
```

Constructs an `VerifyError` with no detail message.

## VerifyError.VerifyError(String)

```java
public VerifyError(String s)
```

Constructs an `VerifyError` with the specified detail message.

Parameters:

- `s`: the detail message.
