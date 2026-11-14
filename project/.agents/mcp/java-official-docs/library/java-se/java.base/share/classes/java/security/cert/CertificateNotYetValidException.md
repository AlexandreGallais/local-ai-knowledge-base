# CertificateNotYetValidException class (java.security.cert)

```java
public class CertificateNotYetValidException extends CertificateException
```

Certificate is not yet valid exception. This is thrown whenever
the current {@code Date} or the specified {@code Date}
is before the {@code notBefore} date/time in the Certificate
validity period.

@author Hemma Prafullchandra
@since 1.2

## CertificateNotYetValidException.CertificateNotYetValidException()

```java
public CertificateNotYetValidException()
```

Constructs a CertificateNotYetValidException with no detail message. A
detail message is a String that describes this particular
exception.

## CertificateNotYetValidException.CertificateNotYetValidException(String)

```java
public CertificateNotYetValidException(String message)
```

Constructs a CertificateNotYetValidException with the specified detail
message. A detail message is a String that describes this
particular exception.

@param message the detail message.