---
title: "CertPathValidatorSpi class (java.security.cert)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/cert/CertPathValidatorSpi.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# CertPathValidatorSpi class (java.security.cert)

```java
public abstract class CertPathValidatorSpi
```

The *Service Provider Interface* (**SPI**)
for the CertPathValidator class. All
`CertPathValidator` implementations must include a class (the
SPI class) that extends this class (`CertPathValidatorSpi`)
and implements all of its methods. In general, instances of this class
should only be accessed through the `CertPathValidator` class.
For details, see the Java Cryptography Architecture.

**Concurrent Access**

Instances of this class need not be protected against concurrent
access from multiple threads. Threads that need to access a single
`CertPathValidatorSpi` instance concurrently should synchronize
amongst themselves and provide the necessary locking before calling the
wrapping `CertPathValidator` object.

However, implementations of `CertPathValidatorSpi` may still
encounter concurrency issues, since multiple threads each
manipulating a different `CertPathValidatorSpi` instance need not
synchronize.

**Since:** 1.4

## CertPathValidatorSpi.CertPathValidatorSpi()

```java
public CertPathValidatorSpi()
```

The default constructor.

## CertPathValidatorSpi.engineValidate(CertPath, CertPathParameters)

```java
public abstract CertPathValidatorResult engineValidate(CertPath certPath, CertPathParameters params) throws CertPathValidatorException, InvalidAlgorithmParameterException
```

Validates the specified certification path using the specified
algorithm parameter set.

The `CertPath` specified must be of a type that is
supported by the validation algorithm, otherwise an
`InvalidAlgorithmParameterException` will be thrown. For
example, a `CertPathValidator` that implements the PKIX
algorithm validates `CertPath` objects of type X.509.

Parameters:

- `certPath`: the `CertPath` to be validated
- `params`: the algorithm parameters

**Returns:** the result of the validation algorithm

Throws:

- `CertPathValidatorException`: if the `CertPath` does not validate
- `InvalidAlgorithmParameterException`: if the specified parameters or the type of the specified `CertPath` are inappropriate for this `CertPathValidator`

## CertPathValidatorSpi.engineGetRevocationChecker()

```java
public CertPathChecker engineGetRevocationChecker()
```

Returns a `CertPathChecker` that this implementation uses to
check the revocation status of certificates. A PKIX implementation
returns objects of type `PKIXRevocationChecker`.

The primary purpose of this method is to allow callers to specify
additional input parameters and options specific to revocation checking.
See the class description of `CertPathValidator` for an example.

This method was added to version 1.8 of the Java Platform Standard
Edition. In order to maintain backwards compatibility with existing
service providers, this method cannot be abstract and by default throws
an `UnsupportedOperationException`.

**Returns:** a `CertPathChecker` that this implementation uses to
check the revocation status of certificates

**Since:** 1.8

Throws:

- `UnsupportedOperationException`: if this method is not supported
