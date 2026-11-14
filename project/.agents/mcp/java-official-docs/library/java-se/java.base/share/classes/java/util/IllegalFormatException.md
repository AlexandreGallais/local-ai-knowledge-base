---
title: "IllegalFormatException class (java.util)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/IllegalFormatException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# IllegalFormatException class (java.util)

```java
public sealed class IllegalFormatException extends IllegalArgumentException permits DuplicateFormatFlagsException, FormatFlagsConversionMismatchException, IllegalFormatArgumentIndexException, IllegalFormatCodePointException, IllegalFormatConversionException, IllegalFormatFlagsException, IllegalFormatPrecisionException, IllegalFormatWidthException, MissingFormatArgumentException, MissingFormatWidthException, UnknownFormatConversionException, UnknownFormatFlagsException
```

Unchecked exception thrown when a format string contains an illegal syntax
or a format specifier that is incompatible with the given arguments.  Only
explicit subtypes of this exception which correspond to specific errors
should be instantiated.

**sealedGraph:**

**Since:** 1.5
