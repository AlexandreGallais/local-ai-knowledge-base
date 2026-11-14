# DuplicateFormatFlagsException class (java.util)

```java
public non-sealed class DuplicateFormatFlagsException extends IllegalFormatException
```

Unchecked exception thrown when duplicate flags are provided in the format
specifier.

<p> Unless otherwise specified, passing a {@code null} argument to any
method or constructor in this class will cause a {@link
NullPointerException} to be thrown.

@since 1.5

## DuplicateFormatFlagsException.DuplicateFormatFlagsException(String)

```java
public DuplicateFormatFlagsException(String f)
```

Constructs an instance of this class with the specified flags.

@param  f
        The set of format flags which contain a duplicate flag.

## DuplicateFormatFlagsException.getFlags()

```java
public String getFlags()
```

Returns the set of flags which contains a duplicate flag.

@return  The flags