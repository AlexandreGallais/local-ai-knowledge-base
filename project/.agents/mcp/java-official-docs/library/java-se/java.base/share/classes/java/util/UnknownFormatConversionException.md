---
title: "UnknownFormatConversionException class (java.util)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/UnknownFormatConversionException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# UnknownFormatConversionException class (java.util)

```java
public non-sealed class UnknownFormatConversionException extends IllegalFormatException
```

Unchecked exception thrown when an unknown conversion is given.

 Unless otherwise specified, passing a `null` argument to
any method or constructor in this class will cause a `NullPointerException` to be thrown.

**Since:** 1.5

## UnknownFormatConversionException.UnknownFormatConversionException(String)

```java
public UnknownFormatConversionException(String s)
```

Constructs an instance of this class with the unknown conversion.

Parameters:

- `s`: Unknown conversion

## UnknownFormatConversionException.getConversion()

```java
public String getConversion()
```

Returns the unknown conversion.

**Returns:** The unknown conversion.
