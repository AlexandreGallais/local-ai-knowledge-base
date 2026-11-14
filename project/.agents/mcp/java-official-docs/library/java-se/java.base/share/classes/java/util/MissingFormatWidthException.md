# MissingFormatWidthException class (java.util)

```java
public non-sealed class MissingFormatWidthException extends IllegalFormatException
```

Unchecked exception thrown when the format width is required.

<p> Unless otherwise specified, passing a {@code null} argument to any
method or constructor in this class will cause a {@link
NullPointerException} to be thrown.

@since 1.5

## MissingFormatWidthException.MissingFormatWidthException(String)

```java
public MissingFormatWidthException(String s)
```

Constructs an instance of this class with the specified format
specifier.

@param  s
        The format specifier which does not have a width

## MissingFormatWidthException.getFormatSpecifier()

```java
public String getFormatSpecifier()
```

Returns the format specifier which does not have a width.

@return  The format specifier which does not have a width