---
title: "CertPathValidator class (java.security.cert)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/cert/CertPathValidator.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# CertPathValidator class (java.security.cert)

```java
public class CertPathValidator
```

A class for validating certification paths (also known as certificate
chains).

This class uses a provider-based architecture.
To create a `CertPathValidator`,
call one of the static `getInstance` methods, passing in the
algorithm name of the `CertPathValidator` desired and
optionally the name of the provider desired.

Once a `CertPathValidator` object has been created, it can
be used to validate certification paths by calling the validate method and passing it the `CertPath` to be validated
and an algorithm-specific set of parameters. If successful, the result is
returned in an object that implements the
`CertPathValidatorResult` interface.

The `getRevocationChecker` method allows an application to specify
additional algorithm-specific parameters and options used by the
`CertPathValidator` when checking the revocation status of
certificates. Here is an example demonstrating how it is used with the PKIX
algorithm:

```java
CertPathValidator cpv = CertPathValidator.getInstance("PKIX");
PKIXRevocationChecker rc = (PKIXRevocationChecker)cpv.getRevocationChecker();
rc.setOptions(EnumSet.of(Option.SOFT_FAIL));
params.addCertPathChecker(rc);
CertPathValidatorResult cpvr = cpv.validate(path, params);
```

Every implementation of the Java platform is required to support the
following standard `CertPathValidator` algorithm:

- `PKIX`

This algorithm is described in the
CertPathValidator section of the
Java Security Standard Algorithm Names Specification.
Consult the release documentation for your implementation to see if any
other algorithms are supported.

**Concurrent Access**

The static methods of this class are guaranteed to be thread-safe.
Multiple threads may concurrently invoke the static methods defined in
this class with no ill effects.

However, this is not true for the non-static methods defined by this class.
Unless otherwise documented by a specific provider, threads that need to
access a single `CertPathValidator` instance concurrently should
synchronize amongst themselves and provide the necessary locking. Multiple
threads each manipulating a different `CertPathValidator`
instance need not synchronize.

**See also:** CertPath

**Since:** 1.4

## CertPathValidator.CertPathValidator(CertPathValidatorSpi, Provider, String)

```java
protected CertPathValidator(CertPathValidatorSpi validatorSpi, Provider provider, String algorithm)
```

Creates a `CertPathValidator` object of the given algorithm,
and encapsulates the given provider implementation (SPI object) in it.

Parameters:

- `validatorSpi`: the provider implementation
- `provider`: the provider
- `algorithm`: the algorithm name

## CertPathValidator.getInstance(String)

```java
public static CertPathValidator getInstance(String algorithm) throws NoSuchAlgorithmException
```

Returns a `CertPathValidator` object that implements the
specified algorithm.

 This method traverses the list of registered security Providers,
starting with the most preferred Provider.
A new CertPathValidator object encapsulating the
CertPathValidatorSpi implementation from the first
Provider that supports the specified algorithm is returned.

 Note that the list of registered providers may be retrieved via
the Security.getProviders() method.

Parameters:

- `algorithm`: the name of the requested `CertPathValidator` algorithm. See the CertPathValidator section in the  Java Security Standard Algorithm Names Specification for information about standard algorithm names.

**Implementation note:** The JDK Reference Implementation additionally uses the
`jdk.security.provider.preferred`
Security property to determine
the preferred provider order for the specified algorithm. This
may be different from the order of providers returned by
Security.getProviders().

**Returns:** a `CertPathValidator` object that implements the
        specified algorithm

**See also:** java.security.Provider

Throws:

- `NoSuchAlgorithmException`: if no `Provider` supports a `CertPathValidatorSpi` implementation for the specified algorithm
- `NullPointerException`: if `algorithm` is `null`

## CertPathValidator.getInstance(String, String)

```java
public static CertPathValidator getInstance(String algorithm, String provider) throws NoSuchAlgorithmException, NoSuchProviderException
```

Returns a `CertPathValidator` object that implements the
specified algorithm.

 A new CertPathValidator object encapsulating the
CertPathValidatorSpi implementation from the specified provider
is returned.  The specified provider must be registered
in the security provider list.

 Note that the list of registered providers may be retrieved via
the Security.getProviders() method.

Parameters:

- `algorithm`: the name of the requested `CertPathValidator` algorithm. See the CertPathValidator section in the  Java Security Standard Algorithm Names Specification for information about standard algorithm names.
- `provider`: the name of the provider.

**Returns:** a `CertPathValidator` object that implements the
        specified algorithm

**See also:** java.security.Provider

Throws:

- `IllegalArgumentException`: if the `provider` is `null` or empty
- `NoSuchAlgorithmException`: if a `CertPathValidatorSpi` implementation for the specified algorithm is not available from the specified provider
- `NoSuchProviderException`: if the specified provider is not registered in the security provider list
- `NullPointerException`: if `algorithm` is `null`

## CertPathValidator.getInstance(String, Provider)

```java
public static CertPathValidator getInstance(String algorithm, Provider provider) throws NoSuchAlgorithmException
```

Returns a `CertPathValidator` object that implements the
specified algorithm.

 A new CertPathValidator object encapsulating the
CertPathValidatorSpi implementation from the specified Provider
object is returned.  Note that the specified Provider object
does not have to be registered in the provider list.

Parameters:

- `algorithm`: the name of the requested `CertPathValidator` algorithm. See the CertPathValidator section in the  Java Security Standard Algorithm Names Specification for information about standard algorithm names.
- `provider`: the provider.

**Returns:** a `CertPathValidator` object that implements the
         specified algorithm

**See also:** java.security.Provider

Throws:

- `IllegalArgumentException`: if the `provider` is `null`
- `NoSuchAlgorithmException`: if a `CertPathValidatorSpi` implementation for the specified algorithm is not available from the specified Provider object
- `NullPointerException`: if `algorithm` is `null`

## CertPathValidator.getProvider()

```java
public final Provider getProvider()
```

Returns the `Provider` of this
`CertPathValidator`.

**Returns:** the `Provider` of this `CertPathValidator`

## CertPathValidator.getAlgorithm()

```java
public final String getAlgorithm()
```

Returns the algorithm name of this `CertPathValidator`.

**Returns:** the algorithm name of this `CertPathValidator`

## CertPathValidator.validate(CertPath, CertPathParameters)

```java
public final CertPathValidatorResult validate(CertPath certPath, CertPathParameters params) throws CertPathValidatorException, InvalidAlgorithmParameterException
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

## CertPathValidator.getDefaultType()

```java
public static final String getDefaultType()
```

Returns the default `CertPathValidator` type as specified by
the `certpathvalidator.type` security property, or the string
 if no such property exists.

The default `CertPathValidator` type can be used by
applications that do not want to use a hard-coded type when calling one
of the `getInstance` methods, and want to provide a default
type in case a user does not specify its own.

The default `CertPathValidator` type can be changed by
setting the value of the `certpathvalidator.type` security
property to the desired type.

**See also:** java.security.Security security properties

**Returns:** the default `CertPathValidator` type as specified
by the `certpathvalidator.type` security property, or the string
 if no such property exists.

## CertPathValidator.getRevocationChecker()

```java
public final CertPathChecker getRevocationChecker()
```

Returns a `CertPathChecker` that the encapsulated
`CertPathValidatorSpi` implementation uses to check the revocation
status of certificates. A PKIX implementation returns objects of
type `PKIXRevocationChecker`. Each invocation of this method
returns a new instance of `CertPathChecker`.

The primary purpose of this method is to allow callers to specify
additional input parameters and options specific to revocation checking.
See the class description for an example.

**Returns:** a `CertPathChecker`

**Since:** 1.8

Throws:

- `UnsupportedOperationException`: if the service provider does not support this method
