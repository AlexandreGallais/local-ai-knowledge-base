# ReflectiveOperationException class (java.lang)

```java
public class ReflectiveOperationException extends Exception
```

Common superclass of exceptions thrown by reflective operations in
core reflection.

@see LinkageError
@since 1.7

## ReflectiveOperationException.ReflectiveOperationException()

```java
public ReflectiveOperationException()
```

Constructs a new exception with {@code null} as its detail
message.  The cause is not initialized, and may subsequently be
initialized by a call to {@link #initCause}.

## ReflectiveOperationException.ReflectiveOperationException(String)

```java
public ReflectiveOperationException(String message)
```

Constructs a new exception with the specified detail message.
The cause is not initialized, and may subsequently be
initialized by a call to {@link #initCause}.

@param   message   the detail message. The detail message is saved for
         later retrieval by the {@link #getMessage()} method.

## ReflectiveOperationException.ReflectiveOperationException(String, Throwable)

```java
public ReflectiveOperationException(String message, Throwable cause)
```

Constructs a new exception with the specified detail message
and cause.

<p>Note that the detail message associated with
{@code cause} is <em>not</em> automatically incorporated in
this exception's detail message.

@param  message the detail message (which is saved for later retrieval
        by the {@link #getMessage()} method).
@param  cause the cause (which is saved for later retrieval by the
        {@link #getCause()} method).  (A {@code null} value is
        permitted, and indicates that the cause is nonexistent or
        unknown.)

## ReflectiveOperationException.ReflectiveOperationException(Throwable)

```java
public ReflectiveOperationException(Throwable cause)
```

Constructs a new exception with the specified cause and a detail
message of {@code (cause==null ? null : cause.toString())} (which
typically contains the class and detail message of {@code cause}).

@param  cause the cause (which is saved for later retrieval by the
        {@link #getCause()} method).  (A {@code null} value is
        permitted, and indicates that the cause is nonexistent or
        unknown.)