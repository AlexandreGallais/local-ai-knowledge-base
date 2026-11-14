---
title: "CertPathBuilderSpi class (java.security.cert)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/cert/CertPathBuilderSpi.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# CertPathBuilderSpi class (java.security.cert)

```java
public abstract class CertPathBuilderSpi
```

The *Service Provider Interface* (**SPI**)
for the CertPathBuilder class. All
`CertPathBuilder` implementations must include a class (the
SPI class) that extends this class (`CertPathBuilderSpi`) and
implements all of its methods. In general, instances of this class should
only be accessed through the `CertPathBuilder` class. For
details, see the Java Cryptography Architecture.

**Concurrent Access**

Instances of this class need not be protected against concurrent
access from multiple threads. Threads that need to access a single
`CertPathBuilderSpi` instance concurrently should synchronize
amongst themselves and provide the necessary locking before calling the
wrapping `CertPathBuilder` object.

However, implementations of `CertPathBuilderSpi` may still
encounter concurrency issues, since multiple threads each
manipulating a different `CertPathBuilderSpi` instance need not
synchronize.

**Since:** 1.4

## CertPathBuilderSpi.CertPathBuilderSpi()

```java
public CertPathBuilderSpi()
```

The default constructor.

## CertPathBuilderSpi.engineBuild(CertPathParameters)

```java
public abstract CertPathBuilderResult engineBuild(CertPathParameters params) throws CertPathBuilderException, InvalidAlgorithmParameterException
```

Attempts to build a certification path using the specified
algorithm parameter set.

Parameters:

- `params`: the algorithm parameters

**Returns:** the result of the build algorithm

Throws:

- `CertPathBuilderException`: if the builder is unable to construct a certification path that satisfies the specified parameters
- `InvalidAlgorithmParameterException`: if the specified parameters are inappropriate for this `CertPathBuilder`

## CertPathBuilderSpi.engineGetRevocationChecker()

```java
public CertPathChecker engineGetRevocationChecker()
```

Returns a `CertPathChecker` that this implementation uses to
check the revocation status of certificates. A PKIX implementation
returns objects of type `PKIXRevocationChecker`.

The primary purpose of this method is to allow callers to specify
additional input parameters and options specific to revocation checking.
See the class description of `CertPathBuilder` for an example.

This method was added to version 1.8 of the Java Platform Standard
Edition. In order to maintain backwards compatibility with existing
service providers, this method cannot be abstract and by default throws
an `UnsupportedOperationException`.

**Returns:** a `CertPathChecker` that this implementation uses to
check the revocation status of certificates

**Since:** 1.8

Throws:

- `UnsupportedOperationException`: if this method is not supported
