# IllegalFormatConversionException class (java.util)

```java
public non-sealed class IllegalFormatConversionException extends IllegalFormatException
```

Unchecked exception thrown when the argument corresponding to the format
specifier is of an incompatible type.

<p> Unless otherwise specified, passing a {@code null} argument to any
method or constructor in this class will cause a {@link
NullPointerException} to be thrown.

@since 1.5

## IllegalFormatConversionException.IllegalFormatConversionException(char, Class<?>)

```java
public IllegalFormatConversionException(char c, Class<?> arg)
```

Constructs an instance of this class with the mismatched conversion and
the corresponding argument class.

@param  c
        Inapplicable conversion

@param  arg
        Class of the mismatched argument

## IllegalFormatConversionException.getConversion()

```java
public char getConversion()
```

Returns the inapplicable conversion.

@return  The inapplicable conversion

## IllegalFormatConversionException.getArgumentClass()

```java
public Class<?> getArgumentClass()
```

Returns the class of the mismatched argument.

@return   The class of the mismatched argument