# UndeclaredThrowableException class (java.lang.reflect)

```java
public class UndeclaredThrowableException extends RuntimeException
```

Thrown by a method invocation on a proxy instance if its invocation
handler's {@link InvocationHandler#invoke invoke} method throws a
checked exception (a {@code Throwable} that is not assignable
to {@code RuntimeException} or {@code Error}) that
is not assignable to any of the exception types declared in the
{@code throws} clause of the method that was invoked on the
proxy instance and dispatched to the invocation handler.

<p>An {@code UndeclaredThrowableException} instance contains
the undeclared checked exception that was thrown by the invocation
handler, and it can be retrieved with the
{@code getUndeclaredThrowable()} method.
{@code UndeclaredThrowableException} extends
{@code RuntimeException}, so it is an unchecked exception
that wraps a checked exception.

@author      Peter Jones
@see         InvocationHandler
@since       1.3

## UndeclaredThrowableException.UndeclaredThrowableException(Throwable)

```java
public UndeclaredThrowableException(Throwable undeclaredThrowable)
```

Constructs an {@code UndeclaredThrowableException} with the
specified {@code Throwable}.

@param   undeclaredThrowable the undeclared checked exception
         that was thrown

## UndeclaredThrowableException.UndeclaredThrowableException(Throwable, String)

```java
public UndeclaredThrowableException(Throwable undeclaredThrowable, String s)
```

Constructs an {@code UndeclaredThrowableException} with the
specified {@code Throwable} and a detail message.

@param   undeclaredThrowable the undeclared checked exception
         that was thrown
@param   s the detail message

## UndeclaredThrowableException.getUndeclaredThrowable()

```java
public Throwable getUndeclaredThrowable()
```

Returns the {@code Throwable} instance wrapped in this
{@code UndeclaredThrowableException}, which may be {@code null}.

@apiNote
This method predates the general-purpose exception chaining facility.
The {@link Throwable#getCause()} method is now the preferred means of
obtaining this information.

@return the undeclared checked exception that was thrown