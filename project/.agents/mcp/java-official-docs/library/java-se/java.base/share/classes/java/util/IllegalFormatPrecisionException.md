---
title: "IllegalFormatPrecisionException class (java.util)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/IllegalFormatPrecisionException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# IllegalFormatPrecisionException class (java.util)

```java
public non-sealed class IllegalFormatPrecisionException extends IllegalFormatException
```

Unchecked exception thrown when the precision is a negative value other than
`-1`, the conversion does not support a precision, or the value is
otherwise unsupported. If the precision is not representable by an
`int` type, then the value `Integer.MIN_VALUE` will be used
in the exception.

**Since:** 1.5

## IllegalFormatPrecisionException.IllegalFormatPrecisionException(int)

```java
public IllegalFormatPrecisionException(int p)
```

Constructs an instance of this class with the specified precision.

Parameters:

- `p`: The precision

## IllegalFormatPrecisionException.getPrecision()

```java
public int getPrecision()
```

Returns the precision. If the precision isn't representable by an
`int`, then will return `Integer.MIN_VALUE`.

**Returns:** The precision
