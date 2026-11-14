# InvocationTargetException class (java.lang.reflect)

```java
public class InvocationTargetException extends ReflectiveOperationException
```

InvocationTargetException is a checked exception that wraps
an exception thrown by an invoked method or constructor.

@see Method
@see Constructor
@since 1.1

## InvocationTargetException.InvocationTargetException()

```java
protected InvocationTargetException()
```

Constructs an {@code InvocationTargetException} with
{@code null} as the target exception.

## InvocationTargetException.InvocationTargetException(Throwable)

```java
public InvocationTargetException(Throwable target)
```

Constructs a InvocationTargetException with a target exception.

@param target the target exception

## InvocationTargetException.InvocationTargetException(Throwable, String)

```java
public InvocationTargetException(Throwable target, String s)
```

Constructs a InvocationTargetException with a target exception
and a detail message.

@param target the target exception
@param s      the detail message

## InvocationTargetException.getTargetException()

```java
public Throwable getTargetException()
```

Get the thrown target exception.

@apiNote
This method predates the general-purpose exception chaining facility.
The {@link Throwable#getCause()} method is now the preferred means of
obtaining this information.

@return the thrown target exception (cause of this exception).

## InvocationTargetException.getCause()

```java
public Throwable getCause()
```

Returns the cause of this exception (the thrown target exception,
which may be {@code null}).

@return  the cause of this exception.
@since   1.4