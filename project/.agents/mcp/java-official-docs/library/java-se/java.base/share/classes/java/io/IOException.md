# IOException class (java.io)

```java
public class IOException extends Exception
```

Signals that an I/O exception of some sort has occurred. This
class is the general class of exceptions produced by failed or
interrupted I/O operations.

@see     java.io.InputStream
@see     java.io.OutputStream
@since   1.0

## IOException.IOException()

```java
public IOException()
```

Constructs an {@code IOException} with {@code null}
as its error detail message.

## IOException.IOException(String)

```java
public IOException(String message)
```

Constructs an {@code IOException} with the specified detail message.

@param message
       The detail message (which is saved for later retrieval
       by the {@link #getMessage()} method)

## IOException.IOException(String, Throwable)

```java
public IOException(String message, Throwable cause)
```

Constructs an {@code IOException} with the specified detail message
and cause.

<p> Note that the detail message associated with {@code cause} is
<i>not</i> automatically incorporated into this exception's detail
message.

@param message
       The detail message (which is saved for later retrieval
       by the {@link #getMessage()} method)

@param cause
       The cause (which is saved for later retrieval by the
       {@link #getCause()} method).  (A null value is permitted,
       and indicates that the cause is nonexistent or unknown.)

@since 1.6

## IOException.IOException(Throwable)

```java
public IOException(Throwable cause)
```

Constructs an {@code IOException} with the specified cause and a
detail message of {@code (cause==null ? null : cause.toString())}
(which typically contains the class and detail message of {@code cause}).
This constructor is useful for IO exceptions that are little more
than wrappers for other throwables.

@param cause
       The cause (which is saved for later retrieval by the
       {@link #getCause()} method).  (A null value is permitted,
       and indicates that the cause is nonexistent or unknown.)

@since 1.6