# InputMismatchException class (java.util)

```java
public class InputMismatchException extends NoSuchElementException
```

Thrown by a {@code Scanner} to indicate that the token
retrieved does not match the pattern for the expected type, or
that the token is out of range for the expected type.

@see     java.util.Scanner
@since   1.5

## InputMismatchException.InputMismatchException()

```java
public InputMismatchException()
```

Constructs an {@code InputMismatchException} with {@code null}
as its error message string.

## InputMismatchException.InputMismatchException(String)

```java
public InputMismatchException(String s)
```

Constructs an {@code InputMismatchException}, saving a reference
to the error message string {@code s} for later retrieval by the
{@code getMessage} method.

@param   s   the detail message.