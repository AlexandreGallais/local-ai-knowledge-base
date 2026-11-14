# CertificateExpiredException class (java.security.cert)

```java
public class CertificateExpiredException extends CertificateException
```

Certificate Expired Exception. This is thrown whenever the current
{@code Date} or the specified {@code Date} is after the
{@code notAfter} date/time specified in the validity period
of the certificate.

@author Hemma Prafullchandra
@since 1.2

## CertificateExpiredException.CertificateExpiredException()

```java
public CertificateExpiredException()
```

Constructs a CertificateExpiredException with no detail message. A
detail message is a String that describes this particular
exception.

## CertificateExpiredException.CertificateExpiredException(String)

```java
public CertificateExpiredException(String message)
```

Constructs a CertificateExpiredException with the specified detail
message. A detail message is a String that describes this
particular exception.

@param message the detail message.