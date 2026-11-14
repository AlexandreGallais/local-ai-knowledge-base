# FormatFlagsConversionMismatchException class (java.util)

```java
public non-sealed class FormatFlagsConversionMismatchException extends IllegalFormatException
```

Unchecked exception thrown when a conversion and flag are incompatible.

<p> Unless otherwise specified, passing a {@code null} argument to any
method or constructor in this class will cause a {@link
NullPointerException} to be thrown.

@since 1.5

## FormatFlagsConversionMismatchException.FormatFlagsConversionMismatchException(String, char)

```java
public FormatFlagsConversionMismatchException(String f, char c)
```

Constructs an instance of this class with the specified flag
and conversion.

@param  f
        The flag

@param  c
        The conversion

## FormatFlagsConversionMismatchException.getFlags()

```java
public String getFlags()
```

Returns the incompatible flag.

@return  The flag

## FormatFlagsConversionMismatchException.getConversion()

```java
public char getConversion()
```

Returns the incompatible conversion.

@return  The conversion