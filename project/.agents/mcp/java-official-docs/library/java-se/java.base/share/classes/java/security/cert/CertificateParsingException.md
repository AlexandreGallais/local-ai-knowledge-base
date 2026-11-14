# CertificateParsingException class (java.security.cert)

```java
public class CertificateParsingException extends CertificateException
```

Certificate Parsing Exception. This is thrown whenever an
invalid DER-encoded certificate is parsed or unsupported DER features
are found in the Certificate.

@author Hemma Prafullchandra
@since 1.2

## CertificateParsingException.CertificateParsingException()

```java
public CertificateParsingException()
```

Constructs a CertificateParsingException with no detail message. A
detail message is a String that describes this particular
exception.

## CertificateParsingException.CertificateParsingException(String)

```java
public CertificateParsingException(String message)
```

Constructs a CertificateParsingException with the specified detail
message. A detail message is a String that describes this
particular exception.

@param message the detail message.

## CertificateParsingException.CertificateParsingException(String, Throwable)

```java
public CertificateParsingException(String message, Throwable cause)
```

Creates a {@code CertificateParsingException} with the specified
detail message and cause.

@param message the detail message (which is saved for later retrieval
       by the {@link #getMessage()} method).
@param cause the cause (which is saved for later retrieval by the
       {@link #getCause()} method).  (A {@code null} value is permitted,
       and indicates that the cause is nonexistent or unknown.)
@since 1.5

## CertificateParsingException.CertificateParsingException(Throwable)

```java
public CertificateParsingException(Throwable cause)
```

Creates a {@code CertificateParsingException} with the
specified cause and a detail message of
{@code (cause==null ? null : cause.toString())}
(which typically contains the class and detail message of
{@code cause}).

@param cause the cause (which is saved for later retrieval by the
       {@link #getCause()} method).  (A {@code null} value is permitted,
       and indicates that the cause is nonexistent or unknown.)
@since 1.5