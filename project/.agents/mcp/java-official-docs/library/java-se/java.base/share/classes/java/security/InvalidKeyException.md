# InvalidKeyException class (java.security)

```java
public class InvalidKeyException extends KeyException
```

This is the exception for invalid Keys (invalid encoding, wrong
length, uninitialized, etc.).

@author Benjamin Renaud
@since 1.1

## InvalidKeyException.InvalidKeyException()

```java
public InvalidKeyException()
```

Constructs an {@code InvalidKeyException} with no detail message. A
detail message is a {@code String} that describes this particular
exception.

## InvalidKeyException.InvalidKeyException(String)

```java
public InvalidKeyException(String msg)
```

Constructs an {@code InvalidKeyException} with the specified detail
message. A detail message is a {@code String} that describes this
particular exception.

@param msg the detail message.

## InvalidKeyException.InvalidKeyException(String, Throwable)

```java
public InvalidKeyException(String message, Throwable cause)
```

Creates an {@code InvalidKeyException} with the specified
detail message and cause.

@param message the detail message (which is saved for later retrieval
       by the {@link #getMessage()} method).
@param cause the cause (which is saved for later retrieval by the
       {@link #getCause()} method).  (A {@code null} value is permitted,
       and indicates that the cause is nonexistent or unknown.)
@since 1.5

## InvalidKeyException.InvalidKeyException(Throwable)

```java
public InvalidKeyException(Throwable cause)
```

Creates an {@code InvalidKeyException} with the specified cause
and a detail message of {@code (cause==null ? null : cause.toString())}
(which typically contains the class and detail message of
{@code cause}).

@param cause the cause (which is saved for later retrieval by the
       {@link #getCause()} method).  (A {@code null} value is permitted,
       and indicates that the cause is nonexistent or unknown.)
@since 1.5