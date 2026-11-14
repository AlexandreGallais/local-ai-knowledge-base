# KeyStoreException class (java.security)

```java
public class KeyStoreException extends GeneralSecurityException
```

This is the generic KeyStore exception.

@author Jan Luehe


@since 1.2

## KeyStoreException.KeyStoreException()

```java
public KeyStoreException()
```

Constructs a {@code KeyStoreException} with no detail message.  (A
detail message is a {@code String} that describes this particular
exception.)

## KeyStoreException.KeyStoreException(String)

```java
public KeyStoreException(String msg)
```

Constructs a {@code KeyStoreException} with the specified detail
message.  (A detail message is a {@code String} that describes this
particular exception.)

@param msg the detail message.

## KeyStoreException.KeyStoreException(String, Throwable)

```java
public KeyStoreException(String message, Throwable cause)
```

Creates a {@code KeyStoreException} with the specified
detail message and cause.

@param message the detail message (which is saved for later retrieval
       by the {@link #getMessage()} method).
@param cause the cause (which is saved for later retrieval by the
       {@link #getCause()} method).  (A {@code null} value is permitted,
       and indicates that the cause is nonexistent or unknown.)
@since 1.5

## KeyStoreException.KeyStoreException(Throwable)

```java
public KeyStoreException(Throwable cause)
```

Creates a {@code KeyStoreException} with the specified cause
and a detail message of {@code (cause==null ? null : cause.toString())}
(which typically contains the class and detail message of
{@code cause}).

@param cause the cause (which is saved for later retrieval by the
       {@link #getCause()} method).  (A {@code null} value is permitted,
       and indicates that the cause is nonexistent or unknown.)
@since 1.5