# IllegalFormatPrecisionException class (java.util)

```java
public non-sealed class IllegalFormatPrecisionException extends IllegalFormatException
```

Unchecked exception thrown when the precision is a negative value other than
{@code -1}, the conversion does not support a precision, or the value is
otherwise unsupported. If the precision is not representable by an
{@code int} type, then the value {@code Integer.MIN_VALUE} will be used
in the exception.

@since 1.5

## IllegalFormatPrecisionException.IllegalFormatPrecisionException(int)

```java
public IllegalFormatPrecisionException(int p)
```

Constructs an instance of this class with the specified precision.

@param  p
        The precision

## IllegalFormatPrecisionException.getPrecision()

```java
public int getPrecision()
```

Returns the precision. If the precision isn't representable by an
{@code int}, then will return {@code Integer.MIN_VALUE}.

@return  The precision