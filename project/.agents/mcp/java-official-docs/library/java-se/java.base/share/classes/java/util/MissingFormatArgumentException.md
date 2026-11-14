---
title: "MissingFormatArgumentException class (java.util)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/MissingFormatArgumentException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# MissingFormatArgumentException class (java.util)

```java
public non-sealed class MissingFormatArgumentException extends IllegalFormatException
```

Unchecked exception thrown when there is a format specifier which does not
have a corresponding argument or if an argument index refers to an argument
that does not exist.

 Unless otherwise specified, passing a `null` argument to any
method or constructor in this class will cause a `NullPointerException` to be thrown.

**Since:** 1.5

## MissingFormatArgumentException.MissingFormatArgumentException(String)

```java
public MissingFormatArgumentException(String s)
```

Constructs an instance of this class with the unmatched format
specifier.

Parameters:

- `s`: Format specifier which does not have a corresponding argument

## MissingFormatArgumentException.getFormatSpecifier()

```java
public String getFormatSpecifier()
```

Returns the unmatched format specifier.

**Returns:** The unmatched format specifier
