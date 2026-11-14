# UnknownFormatConversionException class (java.util)

```java
public non-sealed class UnknownFormatConversionException extends IllegalFormatException
```

Unchecked exception thrown when an unknown conversion is given.

<p> Unless otherwise specified, passing a {@code null} argument to
any method or constructor in this class will cause a {@link
NullPointerException} to be thrown.

@since 1.5

## UnknownFormatConversionException.UnknownFormatConversionException(String)

```java
public UnknownFormatConversionException(String s)
```

Constructs an instance of this class with the unknown conversion.

@param  s
        Unknown conversion

## UnknownFormatConversionException.getConversion()

```java
public String getConversion()
```

Returns the unknown conversion.

@return  The unknown conversion.