# IllegalFormatWidthException class (java.util)

```java
public non-sealed class IllegalFormatWidthException extends IllegalFormatException
```

Unchecked exception thrown when the format width is a negative value other
than {@code -1} or is otherwise unsupported. If a given format width is not
representable by an {@code int} type, then the value
{@code Integer.MIN_VALUE} will be used in the exception.

@since 1.5

## IllegalFormatWidthException.IllegalFormatWidthException(int)

```java
public IllegalFormatWidthException(int w)
```

Constructs an instance of this class with the specified width.

@param  w
        The width

## IllegalFormatWidthException.getWidth()

```java
public int getWidth()
```

Returns the width. If the width is not representable by an {@code int},
then returns {@code Integer.MIN_VALUE}.

@return  The width