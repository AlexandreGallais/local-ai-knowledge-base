# ProviderException class (java.security)

```java
public class ProviderException extends RuntimeException
```

A runtime exception for {@code Provider} exceptions (such as
misconfiguration errors or unrecoverable internal errors),
which may be subclassed by Providers to
throw specialized, provider-specific runtime errors.

@author Benjamin Renaud
@since 1.1

## ProviderException.ProviderException()

```java
public ProviderException()
```

Constructs a {@code ProviderException} with no detail message. A
detail message is a {@code String} that describes this particular
exception.

## ProviderException.ProviderException(String)

```java
public ProviderException(String s)
```

Constructs a {@code ProviderException} with the specified detail
message. A detail message is a {@code String} that describes this
particular exception.

@param s the detail message.

## ProviderException.ProviderException(String, Throwable)

```java
public ProviderException(String message, Throwable cause)
```

Creates a {@code ProviderException} with the specified
detail message and cause.

@param message the detail message (which is saved for later retrieval
       by the {@link #getMessage()} method).
@param cause the cause (which is saved for later retrieval by the
       {@link #getCause()} method).  (A {@code null} value is permitted,
       and indicates that the cause is nonexistent or unknown.)
@since 1.5

## ProviderException.ProviderException(Throwable)

```java
public ProviderException(Throwable cause)
```

Creates a {@code ProviderException} with the specified cause
and a detail message of {@code (cause==null ? null : cause.toString())}
(which typically contains the class and detail message of
{@code cause}).

@param cause the cause (which is saved for later retrieval by the
       {@link #getCause()} method).  (A {@code null} value is permitted,
       and indicates that the cause is nonexistent or unknown.)
@since 1.5