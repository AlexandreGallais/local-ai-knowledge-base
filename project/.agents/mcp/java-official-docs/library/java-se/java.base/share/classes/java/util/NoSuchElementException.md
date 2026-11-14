# NoSuchElementException class (java.util)

```java
public class NoSuchElementException extends RuntimeException
```

Thrown by various accessor methods to indicate that the element being requested
does not exist.

@see     java.util.Enumeration#nextElement()
@see     java.util.Iterator#next()
@since   1.0

## NoSuchElementException.NoSuchElementException()

```java
public NoSuchElementException()
```

Constructs a {@code NoSuchElementException} with {@code null}
as its error message string.

## NoSuchElementException.NoSuchElementException(String, Throwable)

```java
public NoSuchElementException(String s, Throwable cause)
```

Constructs a {@code NoSuchElementException} with the specified detail
message and cause.

@param s     the detail message, or null
@param cause the cause (which is saved for later retrieval by the
             {@link #getCause()} method), or null
@since 15

## NoSuchElementException.NoSuchElementException(Throwable)

```java
public NoSuchElementException(Throwable cause)
```

Constructs a {@code NoSuchElementException} with the specified cause.
The detail message is set to {@code (cause == null ? null :
cause.toString())} (which typically contains the class and
detail message of {@code cause}).

@param cause the cause (which is saved for later retrieval by the
             {@link #getCause()} method)
@since 15

## NoSuchElementException.NoSuchElementException(String)

```java
public NoSuchElementException(String s)
```

Constructs a {@code NoSuchElementException}, saving a reference
to the error message string {@code s} for later retrieval by the
{@code getMessage} method.

@param   s   the detail message.