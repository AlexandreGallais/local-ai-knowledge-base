# MissingFormatArgumentException class (java.util)

```java
public non-sealed class MissingFormatArgumentException extends IllegalFormatException
```

Unchecked exception thrown when there is a format specifier which does not
have a corresponding argument or if an argument index refers to an argument
that does not exist.

<p> Unless otherwise specified, passing a {@code null} argument to any
method or constructor in this class will cause a {@link
NullPointerException} to be thrown.

@since 1.5

## MissingFormatArgumentException.MissingFormatArgumentException(String)

```java
public MissingFormatArgumentException(String s)
```

Constructs an instance of this class with the unmatched format
specifier.

@param  s
        Format specifier which does not have a corresponding argument

## MissingFormatArgumentException.getFormatSpecifier()

```java
public String getFormatSpecifier()
```

Returns the unmatched format specifier.

@return  The unmatched format specifier