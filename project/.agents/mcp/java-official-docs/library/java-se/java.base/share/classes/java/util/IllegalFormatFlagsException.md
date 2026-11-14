# IllegalFormatFlagsException class (java.util)

```java
public non-sealed class IllegalFormatFlagsException extends IllegalFormatException
```

Unchecked exception thrown when an illegal combination flags is given.

<p> Unless otherwise specified, passing a {@code null} argument to any
method or constructor in this class will cause a {@link
NullPointerException} to be thrown.

@since 1.5

## IllegalFormatFlagsException.IllegalFormatFlagsException(String)

```java
public IllegalFormatFlagsException(String f)
```

Constructs an instance of this class with the specified flags.

@param  f
        The set of format flags which contain an illegal combination

## IllegalFormatFlagsException.getFlags()

```java
public String getFlags()
```

Returns the set of flags which contains an illegal combination.

@return  The flags