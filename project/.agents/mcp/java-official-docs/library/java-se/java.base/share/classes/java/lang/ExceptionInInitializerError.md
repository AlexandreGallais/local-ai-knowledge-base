# ExceptionInInitializerError class (java.lang)

```java
public class ExceptionInInitializerError extends LinkageError
```

Signals that an unexpected exception has occurred in a static initializer.
An {@code ExceptionInInitializerError} is thrown to indicate that an
exception occurred during evaluation of a static initializer or the
initializer for a static variable.

@author  Frank Yellin
@since   1.1

## ExceptionInInitializerError.ExceptionInInitializerError()

```java
public ExceptionInInitializerError()
```

Constructs an {@code ExceptionInInitializerError} with
{@code null} as its detail message string and with no saved
throwable object.
A detail message is a String that describes this particular exception.

## ExceptionInInitializerError.ExceptionInInitializerError(Throwable)

```java
public ExceptionInInitializerError(Throwable thrown)
```

Constructs a new {@code ExceptionInInitializerError} class by
saving a reference to the {@code Throwable} object thrown for
later retrieval by the {@link #getException()} method. The detail
message string is set to {@code null}.

@param thrown The exception thrown

## ExceptionInInitializerError.ExceptionInInitializerError(String)

```java
public ExceptionInInitializerError(String s)
```

Constructs an {@code ExceptionInInitializerError} with the specified detail
message string.  A detail message is a String that describes this
particular exception. The detail message string is saved for later
retrieval by the {@link Throwable#getMessage()} method. There is no
saved throwable object.

@param s the detail message

## ExceptionInInitializerError.getException()

```java
public Throwable getException()
```

Returns the exception that occurred during a static initialization that
caused this error to be created.

@apiNote
This method predates the general-purpose exception chaining facility.
The {@link Throwable#getCause()} method is now the preferred means of
obtaining this information.

@return the saved throwable object of this
        {@code ExceptionInInitializerError}, or {@code null}
        if this {@code ExceptionInInitializerError} has no saved
        throwable object.