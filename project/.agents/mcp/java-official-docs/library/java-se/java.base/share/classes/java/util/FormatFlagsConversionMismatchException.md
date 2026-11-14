---
title: "FormatFlagsConversionMismatchException class (java.util)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/FormatFlagsConversionMismatchException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# FormatFlagsConversionMismatchException class (java.util)

```java
public non-sealed class FormatFlagsConversionMismatchException extends IllegalFormatException
```

Unchecked exception thrown when a conversion and flag are incompatible.

 Unless otherwise specified, passing a `null` argument to any
method or constructor in this class will cause a `NullPointerException` to be thrown.

**Since:** 1.5

## FormatFlagsConversionMismatchException.FormatFlagsConversionMismatchException(String, char)

```java
public FormatFlagsConversionMismatchException(String f, char c)
```

Constructs an instance of this class with the specified flag
and conversion.

Parameters:

- `f`: The flag
- `c`: The conversion

## FormatFlagsConversionMismatchException.getFlags()

```java
public String getFlags()
```

Returns the incompatible flag.

**Returns:** The flag

## FormatFlagsConversionMismatchException.getConversion()

```java
public char getConversion()
```

Returns the incompatible conversion.

**Returns:** The conversion
