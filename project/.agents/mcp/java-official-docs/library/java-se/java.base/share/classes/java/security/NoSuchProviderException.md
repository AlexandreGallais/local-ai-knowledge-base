---
title: "NoSuchProviderException class (java.security)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/NoSuchProviderException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# NoSuchProviderException class (java.security)

```java
public class NoSuchProviderException extends GeneralSecurityException
```

This exception is thrown when a particular security provider is
requested but is not available in the environment.

**Since:** 1.1

## NoSuchProviderException.NoSuchProviderException()

```java
public NoSuchProviderException()
```

Constructs a `NoSuchProviderException` with no detail message. A
detail message is a `String` that describes this particular
exception.

## NoSuchProviderException.NoSuchProviderException(String)

```java
public NoSuchProviderException(String msg)
```

Constructs a `NoSuchProviderException` with the specified detail
message. A detail message is a `String` that describes this
particular exception.

Parameters:

- `msg`: the detail message.
