# DigestException class (java.security)

```java
public class DigestException extends GeneralSecurityException
```

This is the generic Message Digest exception.

@author Benjamin Renaud
@since 1.1

## DigestException.DigestException()

```java
public DigestException()
```

Constructs a {@code DigestException} with no detail message.  (A
detail message is a {@code String} that describes this particular
exception.)

## DigestException.DigestException(String)

```java
public DigestException(String msg)
```

Constructs a {@code DigestException} with the specified detail
message.  (A detail message is a {@code String} that describes this
particular exception.)

@param msg the detail message.

## DigestException.DigestException(String, Throwable)

```java
public DigestException(String message, Throwable cause)
```

Creates a {@code DigestException} with the specified
detail message and cause.

@param message the detail message (which is saved for later retrieval
       by the {@link #getMessage()} method).
@param cause the cause (which is saved for later retrieval by the
       {@link #getCause()} method).  (A {@code null} value is permitted,
       and indicates that the cause is nonexistent or unknown.)
@since 1.5

## DigestException.DigestException(Throwable)

```java
public DigestException(Throwable cause)
```

Creates a {@code DigestException} with the specified cause
and a detail message of {@code (cause==null ? null : cause.toString())}
(which typically contains the class and detail message of
{@code cause}).

@param cause the cause (which is saved for later retrieval by the
       {@link #getCause()} method).  (A {@code null} value is permitted,
       and indicates that the cause is nonexistent or unknown.)
@since 1.5