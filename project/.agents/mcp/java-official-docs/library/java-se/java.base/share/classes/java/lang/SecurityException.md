# SecurityException class (java.lang)

```java
public class SecurityException extends RuntimeException
```

Thrown to indicate a security violation.

<p> This exception was originally specified for use with a SecurityManager when
an operation was denied. This feature no longer exists. This exception may be
deprecated in a future release.

@since   1.0

## SecurityException.SecurityException()

```java
public SecurityException()
```

Constructs a {@code SecurityException} with no detail message.

## SecurityException.SecurityException(String)

```java
public SecurityException(String s)
```

Constructs a {@code SecurityException} with the specified
detail message.

@param   s   the detail message.

## SecurityException.SecurityException(String, Throwable)

```java
public SecurityException(String message, Throwable cause)
```

Creates a {@code SecurityException} with the specified
detail message and cause.

@param message the detail message (which is saved for later retrieval
       by the {@link #getMessage()} method).
@param cause the cause (which is saved for later retrieval by the
       {@link #getCause()} method).  (A {@code null} value is permitted,
       and indicates that the cause is nonexistent or unknown.)
@since 1.5

## SecurityException.SecurityException(Throwable)

```java
public SecurityException(Throwable cause)
```

Creates a {@code SecurityException} with the specified cause
and a detail message of {@code (cause==null ? null : cause.toString())}
(which typically contains the class and detail message of
{@code cause}).

@param cause the cause (which is saved for later retrieval by the
       {@link #getCause()} method).  (A {@code null} value is permitted,
       and indicates that the cause is nonexistent or unknown.)
@since 1.5