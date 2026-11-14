# KeyException class (java.security)

```java
public class KeyException extends GeneralSecurityException
```

This is the basic key exception.

@see Key
@see InvalidKeyException
@see KeyManagementException

@author Benjamin Renaud
@since 1.1

## KeyException.KeyException()

```java
public KeyException()
```

Constructs a {@code KeyException} with no detail message. A detail
message is a {@code String} that describes this particular exception.

## KeyException.KeyException(String)

```java
public KeyException(String msg)
```

Constructs a {@code KeyException} with the specified detail message.
A detail message is a {@code String} that describes this particular
exception.

@param msg the detail message.

## KeyException.KeyException(String, Throwable)

```java
public KeyException(String message, Throwable cause)
```

Creates a {@code KeyException} with the specified
detail message and cause.

@param message the detail message (which is saved for later retrieval
       by the {@link #getMessage()} method).
@param cause the cause (which is saved for later retrieval by the
       {@link #getCause()} method).  (A {@code null} value is permitted,
       and indicates that the cause is nonexistent or unknown.)
@since 1.5

## KeyException.KeyException(Throwable)

```java
public KeyException(Throwable cause)
```

Creates a {@code KeyException} with the specified cause
and a detail message of {@code (cause==null ? null : cause.toString())}
(which typically contains the class and detail message of
{@code cause}).

@param cause the cause (which is saved for later retrieval by the
       {@link #getCause()} method).  (A {@code null} value is permitted,
       and indicates that the cause is nonexistent or unknown.)
@since 1.5