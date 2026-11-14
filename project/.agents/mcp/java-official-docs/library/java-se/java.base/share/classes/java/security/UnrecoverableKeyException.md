---
title: "UnrecoverableKeyException class (java.security)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/UnrecoverableKeyException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# UnrecoverableKeyException class (java.security)

```java
public class UnrecoverableKeyException extends UnrecoverableEntryException
```

This exception is thrown if a key in the keystore cannot be recovered.

**Since:** 1.2

## UnrecoverableKeyException.UnrecoverableKeyException()

```java
public UnrecoverableKeyException()
```

Constructs an `UnrecoverableKeyException` with no detail message.

## UnrecoverableKeyException.UnrecoverableKeyException(String)

```java
public UnrecoverableKeyException(String msg)
```

Constructs an `UnrecoverableKeyException` with the specified detail
message, which provides more information about why this exception
has been thrown.

Parameters:

- `msg`: the detail message.
