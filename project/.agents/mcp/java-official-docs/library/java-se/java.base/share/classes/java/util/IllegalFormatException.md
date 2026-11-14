# IllegalFormatException class (java.util)

```java
public sealed class IllegalFormatException extends IllegalArgumentException permits DuplicateFormatFlagsException, FormatFlagsConversionMismatchException, IllegalFormatArgumentIndexException, IllegalFormatCodePointException, IllegalFormatConversionException, IllegalFormatFlagsException, IllegalFormatPrecisionException, IllegalFormatWidthException, MissingFormatArgumentException, MissingFormatWidthException, UnknownFormatConversionException, UnknownFormatFlagsException
```

Unchecked exception thrown when a format string contains an illegal syntax
or a format specifier that is incompatible with the given arguments.  Only
explicit subtypes of this exception which correspond to specific errors
should be instantiated.

@sealedGraph
@since 1.5