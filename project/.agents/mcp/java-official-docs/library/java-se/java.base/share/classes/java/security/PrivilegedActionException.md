# PrivilegedActionException class (java.security)

```java
public class PrivilegedActionException extends Exception
```

This exception is thrown by
{@code doPrivileged(PrivilegedExceptionAction)} and
{@code doPrivileged(PrivilegedExceptionAction,
AccessControlContext context)} to indicate
that the action being performed threw a checked exception.  The exception
thrown by the action can be obtained by calling the
{@code getException} method.  In effect, an
{@code PrivilegedActionException} is a "wrapper"
for an exception thrown by a privileged action.

@since 1.2
@see PrivilegedExceptionAction
@see AccessController#doPrivileged(PrivilegedExceptionAction)
@see AccessController#doPrivileged(PrivilegedExceptionAction,AccessControlContext)

## PrivilegedActionException.PrivilegedActionException(Exception)

```java
public PrivilegedActionException(Exception exception)
```

Constructs a new {@code PrivilegedActionException} &quot;wrapping&quot;
the specific Exception.

@param exception The exception thrown

## PrivilegedActionException.getException()

```java
public Exception getException()
```

Returns the exception thrown by the computation that
resulted in this {@code PrivilegedActionException}.

@apiNote
This method predates the general-purpose exception chaining facility.
The {@link Throwable#getCause()} method is now the preferred means of
obtaining this information.

@return the exception thrown by the computation that
        resulted in this {@code PrivilegedActionException}.
@see PrivilegedExceptionAction
@see AccessController#doPrivileged(PrivilegedExceptionAction)
@see AccessController#doPrivileged(PrivilegedExceptionAction,
                                           AccessControlContext)