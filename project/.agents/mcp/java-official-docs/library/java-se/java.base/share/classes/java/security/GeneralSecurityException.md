# GeneralSecurityException class (java.security)

```java
public class GeneralSecurityException extends Exception
```

The {@code GeneralSecurityException} class is a generic
security exception class that provides type safety for all the
security-related exception classes that extend from it.

@author Jan Luehe
@since 1.2

## GeneralSecurityException.GeneralSecurityException()

```java
public GeneralSecurityException()
```

Constructs a {@code GeneralSecurityException} with no detail message.

## GeneralSecurityException.GeneralSecurityException(String)

```java
public GeneralSecurityException(String msg)
```

Constructs a {@code GeneralSecurityException} with the specified detail
message.
A detail message is a {@code String} that describes this particular
exception.

@param msg the detail message.

## GeneralSecurityException.GeneralSecurityException(String, Throwable)

```java
public GeneralSecurityException(String message, Throwable cause)
```

Creates a {@code GeneralSecurityException} with the specified
detail message and cause.

@param message the detail message (which is saved for later retrieval
       by the {@link #getMessage()} method).
@param cause the cause (which is saved for later retrieval by the
       {@link #getCause()} method).  (A {@code null} value is permitted,
       and indicates that the cause is nonexistent or unknown.)
@since 1.5

## GeneralSecurityException.GeneralSecurityException(Throwable)

```java
public GeneralSecurityException(Throwable cause)
```

Creates a {@code GeneralSecurityException} with the specified cause
and a detail message of {@code (cause==null ? null : cause.toString())}
(which typically contains the class and detail message of
{@code cause}).

@param cause the cause (which is saved for later retrieval by the
       {@link #getCause()} method).  (A {@code null} value is permitted,
       and indicates that the cause is nonexistent or unknown.)
@since 1.5