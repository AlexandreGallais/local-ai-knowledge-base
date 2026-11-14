---
title: "MissingFormatWidthException class (java.util)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/MissingFormatWidthException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# MissingFormatWidthException class (java.util)

```java
public non-sealed class MissingFormatWidthException extends IllegalFormatException
```

Unchecked exception thrown when the format width is required.

 Unless otherwise specified, passing a `null` argument to any
method or constructor in this class will cause a `NullPointerException` to be thrown.

**Since:** 1.5

## MissingFormatWidthException.MissingFormatWidthException(String)

```java
public MissingFormatWidthException(String s)
```

Constructs an instance of this class with the specified format
specifier.

Parameters:

- `s`: The format specifier which does not have a width

## MissingFormatWidthException.getFormatSpecifier()

```java
public String getFormatSpecifier()
```

Returns the format specifier which does not have a width.

**Returns:** The format specifier which does not have a width
