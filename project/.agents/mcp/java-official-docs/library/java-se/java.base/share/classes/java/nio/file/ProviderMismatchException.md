---
title: "ProviderMismatchException class (java.nio.file)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/nio/file/ProviderMismatchException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ProviderMismatchException class (java.nio.file)

```java
public class ProviderMismatchException extends java.lang.IllegalArgumentException
```

Unchecked exception thrown when an attempt is made to invoke a method on an
object created by one file system provider with a parameter created by a
different file system provider.

**Since:** 1.7

## ProviderMismatchException.ProviderMismatchException()

```java
public ProviderMismatchException()
```

Constructs an instance of this class.

## ProviderMismatchException.ProviderMismatchException(String)

```java
public ProviderMismatchException(String msg)
```

Constructs an instance of this class.

Parameters:

- `msg`: the detail message
