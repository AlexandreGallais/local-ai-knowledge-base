# InternalError class (java.lang)

```java
public class InternalError extends VirtualMachineError
```

Thrown to indicate some unexpected internal error has occurred in
the Java Virtual Machine.

@since   1.0

## InternalError.InternalError()

```java
public InternalError()
```

Constructs an {@code InternalError} with no detail message.

## InternalError.InternalError(String)

```java
public InternalError(String message)
```

Constructs an {@code InternalError} with the specified
detail message.

@param   message   the detail message.

## InternalError.InternalError(String, Throwable)

```java
public InternalError(String message, Throwable cause)
```

Constructs an {@code InternalError} with the specified detail
message and cause.  <p>Note that the detail message associated
with {@code cause} is <i>not</i> automatically incorporated in
this error's detail message.

@param  message the detail message (which is saved for later retrieval
        by the {@link #getMessage()} method).
@param  cause the cause (which is saved for later retrieval by the
        {@link #getCause()} method).  (A {@code null} value is
        permitted, and indicates that the cause is nonexistent or
        unknown.)
@since  1.8

## InternalError.InternalError(Throwable)

```java
public InternalError(Throwable cause)
```

Constructs an {@code InternalError} with the specified cause
and a detail message of {@code (cause==null ? null :
cause.toString())} (which typically contains the class and
detail message of {@code cause}).

@param  cause the cause (which is saved for later retrieval by the
        {@link #getCause()} method).  (A {@code null} value is
        permitted, and indicates that the cause is nonexistent or
        unknown.)
@since  1.8