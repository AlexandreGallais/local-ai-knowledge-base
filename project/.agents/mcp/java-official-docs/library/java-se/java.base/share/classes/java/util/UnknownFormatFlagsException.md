# UnknownFormatFlagsException class (java.util)

```java
public non-sealed class UnknownFormatFlagsException extends IllegalFormatException
```

Unchecked exception thrown when an unknown flag is given.

<p> Unless otherwise specified, passing a {@code null} argument to any
method or constructor in this class will cause a {@link
NullPointerException} to be thrown.

@since 1.5

## UnknownFormatFlagsException.UnknownFormatFlagsException(String)

```java
public UnknownFormatFlagsException(String f)
```

Constructs an instance of this class with the specified flags.

@param  f
        The set of format flags which contain an unknown flag

## UnknownFormatFlagsException.getFlags()

```java
public String getFlags()
```

Returns the set of flags which contains an unknown flag.

@return  The flags