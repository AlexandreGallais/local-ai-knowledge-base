# InvalidAlgorithmParameterException class (java.security)

```java
public class InvalidAlgorithmParameterException extends GeneralSecurityException
```

This is the exception for invalid or inappropriate algorithm parameters.

@author Jan Luehe


@see AlgorithmParameters
@see java.security.spec.AlgorithmParameterSpec

@since 1.2

## InvalidAlgorithmParameterException.InvalidAlgorithmParameterException()

```java
public InvalidAlgorithmParameterException()
```

Constructs an {@code InvalidAlgorithmParameterException} with no detail
message.
A detail message is a {@code String} that describes this particular
exception.

## InvalidAlgorithmParameterException.InvalidAlgorithmParameterException(String)

```java
public InvalidAlgorithmParameterException(String msg)
```

Constructs an {@code InvalidAlgorithmParameterException} with the
specified detail message.
A detail message is a {@code String} that describes this
particular exception.

@param msg the detail message.

## InvalidAlgorithmParameterException.InvalidAlgorithmParameterException(String, Throwable)

```java
public InvalidAlgorithmParameterException(String message, Throwable cause)
```

Creates an {@code InvalidAlgorithmParameterException} with the
specified detail message and cause.

@param message the detail message (which is saved for later retrieval
       by the {@link #getMessage()} method).
@param cause the cause (which is saved for later retrieval by the
       {@link #getCause()} method).  (A {@code null} value is permitted,
       and indicates that the cause is nonexistent or unknown.)
@since 1.5

## InvalidAlgorithmParameterException.InvalidAlgorithmParameterException(Throwable)

```java
public InvalidAlgorithmParameterException(Throwable cause)
```

Creates an {@code InvalidAlgorithmParameterException} with the
specified cause and a detail message of
{@code (cause==null ? null : cause.toString())}
(which typically contains the class and detail message of
{@code cause}).

@param cause the cause (which is saved for later retrieval by the
       {@link #getCause()} method).  (A {@code null} value is permitted,
       and indicates that the cause is nonexistent or unknown.)
@since 1.5