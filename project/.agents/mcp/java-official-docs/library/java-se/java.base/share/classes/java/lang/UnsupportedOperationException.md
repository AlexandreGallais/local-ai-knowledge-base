# UnsupportedOperationException class (java.lang)

```java
public class UnsupportedOperationException extends RuntimeException
```

Thrown to indicate that the requested operation is not supported.<p>

This class is a member of the
<a href="{@docRoot}/java.base/java/util/package-summary.html#CollectionsFramework">
Java Collections Framework</a>.

@author  Josh Bloch
@since   1.2

## UnsupportedOperationException.UnsupportedOperationException()

```java
public UnsupportedOperationException()
```

Constructs an UnsupportedOperationException with no detail message.

## UnsupportedOperationException.UnsupportedOperationException(String)

```java
public UnsupportedOperationException(String message)
```

Constructs an UnsupportedOperationException with the specified
detail message.

@param message the detail message

## UnsupportedOperationException.UnsupportedOperationException(String, Throwable)

```java
public UnsupportedOperationException(String message, Throwable cause)
```

Constructs a new exception with the specified detail message and
cause.

<p>Note that the detail message associated with {@code cause} is
<i>not</i> automatically incorporated in this exception's detail
message.

@param  message the detail message (which is saved for later retrieval
        by the {@link Throwable#getMessage()} method).
@param  cause the cause (which is saved for later retrieval by the
        {@link Throwable#getCause()} method).  (A {@code null} value
        is permitted, and indicates that the cause is nonexistent or
        unknown.)
@since 1.5

## UnsupportedOperationException.UnsupportedOperationException(Throwable)

```java
public UnsupportedOperationException(Throwable cause)
```

Constructs a new exception with the specified cause and a detail
message of {@code (cause==null ? null : cause.toString())} (which
typically contains the class and detail message of {@code cause}).
This constructor is useful for exceptions that are little more than
wrappers for other throwables (for example, {@link
java.security.PrivilegedActionException}).

@param  cause the cause (which is saved for later retrieval by the
        {@link Throwable#getCause()} method).  (A {@code null} value is
        permitted, and indicates that the cause is nonexistent or
        unknown.)
@since  1.5