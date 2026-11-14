---
title: "UnrecoverableEntryException class (java.security)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/UnrecoverableEntryException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# UnrecoverableEntryException class (java.security)

```java
public class UnrecoverableEntryException extends GeneralSecurityException
```

This exception is thrown if an entry in the keystore cannot be recovered.

**Since:** 1.5

## UnrecoverableEntryException.UnrecoverableEntryException()

```java
public UnrecoverableEntryException()
```

Constructs an `UnrecoverableEntryException` with no detail message.

## UnrecoverableEntryException.UnrecoverableEntryException(String)

```java
public UnrecoverableEntryException(String msg)
```

Constructs an `UnrecoverableEntryException` with the specified
detail message, which provides more information about why this exception
has been thrown.

Parameters:

- `msg`: the detail message.
