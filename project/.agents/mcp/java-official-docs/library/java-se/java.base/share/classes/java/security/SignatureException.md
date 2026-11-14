# SignatureException class (java.security)

```java
public class SignatureException extends GeneralSecurityException
```

This is the generic Signature exception.

@author Benjamin Renaud
@since 1.1

## SignatureException.SignatureException()

```java
public SignatureException()
```

Constructs a {@code SignatureException} with no detail message. A
detail message is a {@code String} that describes this particular
exception.

## SignatureException.SignatureException(String)

```java
public SignatureException(String msg)
```

Constructs a {@code SignatureException} with the specified detail
message.  A detail message is a {@code String} that describes this
particular exception.

@param msg the detail message.

## SignatureException.SignatureException(String, Throwable)

```java
public SignatureException(String message, Throwable cause)
```

Creates a {@code SignatureException} with the specified
detail message and cause.

@param message the detail message (which is saved for later retrieval
       by the {@link #getMessage()} method).
@param cause the cause (which is saved for later retrieval by the
       {@link #getCause()} method).  (A {@code null} value is permitted,
       and indicates that the cause is nonexistent or unknown.)
@since 1.5

## SignatureException.SignatureException(Throwable)

```java
public SignatureException(Throwable cause)
```

Creates a {@code SignatureException} with the specified cause
and a detail message of {@code (cause==null ? null : cause.toString())}
(which typically contains the class and detail message of
{@code cause}).

@param cause the cause (which is saved for later retrieval by the
       {@link #getCause()} method).  (A {@code null} value is permitted,
       and indicates that the cause is nonexistent or unknown.)
@since 1.5