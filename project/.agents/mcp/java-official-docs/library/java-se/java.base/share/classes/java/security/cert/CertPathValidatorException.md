---
title: "CertPathValidatorException class (java.security.cert)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/cert/CertPathValidatorException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# CertPathValidatorException class (java.security.cert)

```java
public class CertPathValidatorException extends GeneralSecurityException
```

An exception indicating one of a variety of problems encountered when
validating a certification path.

A `CertPathValidatorException` provides support for wrapping
exceptions. The getCause method returns the throwable,
if any, that caused this exception to be thrown.

A `CertPathValidatorException` may also include the
certification path that was being validated when the exception was thrown,
the index of the certificate in the certification path that caused the
exception to be thrown, and the reason that caused the failure. Use the
getCertPath, getIndex, and
getReason methods to retrieve this information.

**Concurrent Access**

Unless otherwise specified, the methods defined in this class are not
thread-safe. Multiple threads that need to access a single
object concurrently should synchronize amongst themselves and
provide the necessary locking. Multiple threads each manipulating
separate objects need not synchronize.

**See also:** CertPathValidator

**Since:** 1.4

## CertPathValidatorException.CertPathValidatorException()

```java
public CertPathValidatorException()
```

Creates a `CertPathValidatorException` with
no detail message.

## CertPathValidatorException.CertPathValidatorException(String)

```java
public CertPathValidatorException(String msg)
```

Creates a `CertPathValidatorException` with the given
detail message. A detail message is a `String` that
describes this particular exception.

Parameters:

- `msg`: the detail message

## CertPathValidatorException.CertPathValidatorException(Throwable)

```java
public CertPathValidatorException(Throwable cause)
```

Creates a `CertPathValidatorException` that wraps the
specified throwable. This allows any exception to be converted into a
`CertPathValidatorException`, while retaining information
about the wrapped exception, which may be useful for debugging. The
detail message is set to (`cause==null ? null : cause.toString()`)
(which typically contains the class and detail message of
cause).

Parameters:

- `cause`: the cause (which is saved for later retrieval by the getCause() method). (A `null` value is permitted, and indicates that the cause is nonexistent or unknown.)

## CertPathValidatorException.CertPathValidatorException(String, Throwable)

```java
public CertPathValidatorException(String msg, Throwable cause)
```

Creates a `CertPathValidatorException` with the specified
detail message and cause.

Parameters:

- `msg`: the detail message
- `cause`: the cause (which is saved for later retrieval by the getCause() method). (A `null` value is permitted, and indicates that the cause is nonexistent or unknown.)

## CertPathValidatorException.CertPathValidatorException(String, Throwable, CertPath, int)

```java
public CertPathValidatorException(String msg, Throwable cause, CertPath certPath, int index)
```

Creates a `CertPathValidatorException` with the specified
detail message, cause, certification path, and index.

Parameters:

- `msg`: the detail message (or `null` if none)
- `cause`: the cause (or `null` if none)
- `certPath`: the certification path that was in the process of being validated when the error was encountered
- `index`: the index of the certificate in the certification path that caused the error (or -1 if not applicable). Note that the list of certificates in a `CertPath` is zero based.

Throws:

- `IndexOutOfBoundsException`: if the index is out of range `(index < -1 || (certPath != null && index >= certPath.getCertificates().size())`
- `IllegalArgumentException`: if `certPath` is `null` and `index` is not -1

## CertPathValidatorException.CertPathValidatorException(String, Throwable, CertPath, int, Reason)

```java
public CertPathValidatorException(String msg, Throwable cause, CertPath certPath, int index, Reason reason)
```

Creates a `CertPathValidatorException` with the specified
detail message, cause, certification path, index, and reason.

Parameters:

- `msg`: the detail message (or `null` if none)
- `cause`: the cause (or `null` if none)
- `certPath`: the certification path that was in the process of being validated when the error was encountered
- `index`: the index of the certificate in the certification path that caused the error (or -1 if not applicable). Note that the list of certificates in a `CertPath` is zero based.
- `reason`: the reason the validation failed

**Since:** 1.7

Throws:

- `IndexOutOfBoundsException`: if the index is out of range `(index < -1 || (certPath != null && index >= certPath.getCertificates().size())`
- `IllegalArgumentException`: if `certPath` is `null` and `index` is not -1
- `NullPointerException`: if `reason` is `null`

## CertPathValidatorException.getCertPath()

```java
public CertPath getCertPath()
```

Returns the certification path that was being validated when
the exception was thrown.

**Returns:** the `CertPath` that was being validated when
the exception was thrown (or `null` if not specified)

## CertPathValidatorException.getIndex()

```java
public int getIndex()
```

Returns the index of the certificate in the certification path
that caused the exception to be thrown. Note that the list of
certificates in a `CertPath` is zero based. If no
index has been set, -1 is returned.

**Returns:** the index that has been set, or -1 if none has been set

## CertPathValidatorException.getReason()

```java
public Reason getReason()
```

Returns the reason that the validation failed. The reason is
associated with the index of the certificate returned by
`getIndex`.

**Returns:** the reason that the validation failed, or
   `BasicReason.UNSPECIFIED` if a reason has not been
   specified

**Since:** 1.7

## CertPathValidatorException.UNSPECIFIED, /** * The certificate is expired. */ EXPIRED, /** * The certificate is not yet valid. */ NOT_YET_VALID, /** * The certificate is revoked. */ REVOKED, /** * The revocation status of the certificate could not be determined. */ UNDETERMINED_REVOCATION_STATUS, /** * The signature is invalid. */ INVALID_SIGNATURE, /** * The public key or the signature algorithm has been constrained. */ ALGORITHM_CONSTRAINED } }

```java
UNSPECIFIED, /** * The certificate is expired. */ EXPIRED, /** * The certificate is not yet valid. */ NOT_YET_VALID, /** * The certificate is revoked. */ REVOKED, /** * The revocation status of the certificate could not be determined. */ UNDETERMINED_REVOCATION_STATUS, /** * The signature is invalid. */ INVALID_SIGNATURE, /** * The public key or the signature algorithm has been constrained. */ ALGORITHM_CONSTRAINED } }
```

Unspecified reason.

## CertPathValidatorException.EXPIRED, /** * The certificate is not yet valid. */ NOT_YET_VALID, /** * The certificate is revoked. */ REVOKED, /** * The revocation status of the certificate could not be determined. */ UNDETERMINED_REVOCATION_STATUS, /** * The signature is invalid. */ INVALID_SIGNATURE, /** * The public key or the signature algorithm has been constrained. */ ALGORITHM_CONSTRAINED } }

```java
EXPIRED, /** * The certificate is not yet valid. */ NOT_YET_VALID, /** * The certificate is revoked. */ REVOKED, /** * The revocation status of the certificate could not be determined. */ UNDETERMINED_REVOCATION_STATUS, /** * The signature is invalid. */ INVALID_SIGNATURE, /** * The public key or the signature algorithm has been constrained. */ ALGORITHM_CONSTRAINED } }
```

The certificate is expired.

## CertPathValidatorException.NOT_YET_VALID, /** * The certificate is revoked. */ REVOKED, /** * The revocation status of the certificate could not be determined. */ UNDETERMINED_REVOCATION_STATUS, /** * The signature is invalid. */ INVALID_SIGNATURE, /** * The public key or the signature algorithm has been constrained. */ ALGORITHM_CONSTRAINED } }

```java
NOT_YET_VALID, /** * The certificate is revoked. */ REVOKED, /** * The revocation status of the certificate could not be determined. */ UNDETERMINED_REVOCATION_STATUS, /** * The signature is invalid. */ INVALID_SIGNATURE, /** * The public key or the signature algorithm has been constrained. */ ALGORITHM_CONSTRAINED } }
```

The certificate is not yet valid.

## CertPathValidatorException.REVOKED, /** * The revocation status of the certificate could not be determined. */ UNDETERMINED_REVOCATION_STATUS, /** * The signature is invalid. */ INVALID_SIGNATURE, /** * The public key or the signature algorithm has been constrained. */ ALGORITHM_CONSTRAINED } }

```java
REVOKED, /** * The revocation status of the certificate could not be determined. */ UNDETERMINED_REVOCATION_STATUS, /** * The signature is invalid. */ INVALID_SIGNATURE, /** * The public key or the signature algorithm has been constrained. */ ALGORITHM_CONSTRAINED } }
```

The certificate is revoked.

## CertPathValidatorException.UNDETERMINED_REVOCATION_STATUS, /** * The signature is invalid. */ INVALID_SIGNATURE, /** * The public key or the signature algorithm has been constrained. */ ALGORITHM_CONSTRAINED } }

```java
UNDETERMINED_REVOCATION_STATUS, /** * The signature is invalid. */ INVALID_SIGNATURE, /** * The public key or the signature algorithm has been constrained. */ ALGORITHM_CONSTRAINED } }
```

The revocation status of the certificate could not be determined.

## CertPathValidatorException.INVALID_SIGNATURE, /** * The public key or the signature algorithm has been constrained. */ ALGORITHM_CONSTRAINED } }

```java
INVALID_SIGNATURE, /** * The public key or the signature algorithm has been constrained. */ ALGORITHM_CONSTRAINED } }
```

The signature is invalid.
