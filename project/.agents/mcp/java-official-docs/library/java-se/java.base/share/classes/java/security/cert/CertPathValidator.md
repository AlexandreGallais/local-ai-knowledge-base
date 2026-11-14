# CertPathValidator class (java.security.cert)

```java
public class CertPathValidator
```

A class for validating certification paths (also known as certificate
chains).
<p>
This class uses a provider-based architecture.
To create a {@code CertPathValidator},
call one of the static {@code getInstance} methods, passing in the
algorithm name of the {@code CertPathValidator} desired and
optionally the name of the provider desired.

<p>Once a {@code CertPathValidator} object has been created, it can
be used to validate certification paths by calling the {@link #validate
validate} method and passing it the {@code CertPath} to be validated
and an algorithm-specific set of parameters. If successful, the result is
returned in an object that implements the
{@code CertPathValidatorResult} interface.

<p>The {@link #getRevocationChecker} method allows an application to specify
additional algorithm-specific parameters and options used by the
{@code CertPathValidator} when checking the revocation status of
certificates. Here is an example demonstrating how it is used with the PKIX
algorithm:

<pre>
CertPathValidator cpv = CertPathValidator.getInstance("PKIX");
PKIXRevocationChecker rc = (PKIXRevocationChecker)cpv.getRevocationChecker();
rc.setOptions(EnumSet.of(Option.SOFT_FAIL));
params.addCertPathChecker(rc);
CertPathValidatorResult cpvr = cpv.validate(path, params);
</pre>

<p>Every implementation of the Java platform is required to support the
following standard {@code CertPathValidator} algorithm:
<ul>
<li>{@code PKIX}</li>
</ul>
This algorithm is described in the <a href=
"{@docRoot}/../specs/security/standard-names.html#certpathvalidator-algorithms">
CertPathValidator section</a> of the
Java Security Standard Algorithm Names Specification.
Consult the release documentation for your implementation to see if any
other algorithms are supported.

<p>
<b>Concurrent Access</b>
<p>
The static methods of this class are guaranteed to be thread-safe.
Multiple threads may concurrently invoke the static methods defined in
this class with no ill effects.
<p>
However, this is not true for the non-static methods defined by this class.
Unless otherwise documented by a specific provider, threads that need to
access a single {@code CertPathValidator} instance concurrently should
synchronize amongst themselves and provide the necessary locking. Multiple
threads each manipulating a different {@code CertPathValidator}
instance need not synchronize.

@spec security/standard-names.html Java Security Standard Algorithm Names
@see CertPath

@since       1.4
@author      Yassir Elley

## CertPathValidator.CertPathValidator(CertPathValidatorSpi, Provider, String)

```java
protected CertPathValidator(CertPathValidatorSpi validatorSpi, Provider provider, String algorithm)
```

Creates a {@code CertPathValidator} object of the given algorithm,
and encapsulates the given provider implementation (SPI object) in it.

@param validatorSpi the provider implementation
@param provider the provider
@param algorithm the algorithm name

## CertPathValidator.getInstance(String)

```java
public static CertPathValidator getInstance(String algorithm) throws NoSuchAlgorithmException
```

Returns a {@code CertPathValidator} object that implements the
specified algorithm.

<p> This method traverses the list of registered security Providers,
starting with the most preferred Provider.
A new CertPathValidator object encapsulating the
CertPathValidatorSpi implementation from the first
Provider that supports the specified algorithm is returned.

<p> Note that the list of registered providers may be retrieved via
the {@link Security#getProviders() Security.getProviders()} method.

@implNote
The JDK Reference Implementation additionally uses the
{@code jdk.security.provider.preferred}
{@link Security#getProperty(String) Security} property to determine
the preferred provider order for the specified algorithm. This
may be different from the order of providers returned by
{@link Security#getProviders() Security.getProviders()}.

@param algorithm the name of the requested {@code CertPathValidator}
algorithm. See the CertPathValidator section in the <a href=
"{@docRoot}/../specs/security/standard-names.html#certpathvalidator-algorithms">
Java Security Standard Algorithm Names Specification</a>
for information about standard algorithm names.

@spec security/standard-names.html Java Security Standard Algorithm Names
@return a {@code CertPathValidator} object that implements the
        specified algorithm

@throws NoSuchAlgorithmException if no {@code Provider} supports a
        {@code CertPathValidatorSpi} implementation for the
        specified algorithm

@throws NullPointerException if {@code algorithm} is {@code null}

@see java.security.Provider

## CertPathValidator.getInstance(String, String)

```java
public static CertPathValidator getInstance(String algorithm, String provider) throws NoSuchAlgorithmException, NoSuchProviderException
```

Returns a {@code CertPathValidator} object that implements the
specified algorithm.

<p> A new CertPathValidator object encapsulating the
CertPathValidatorSpi implementation from the specified provider
is returned.  The specified provider must be registered
in the security provider list.

<p> Note that the list of registered providers may be retrieved via
the {@link Security#getProviders() Security.getProviders()} method.

@param algorithm the name of the requested {@code CertPathValidator}
algorithm. See the CertPathValidator section in the <a href=
"{@docRoot}/../specs/security/standard-names.html#certpathvalidator-algorithms">
Java Security Standard Algorithm Names Specification</a>
for information about standard algorithm names.

@param provider the name of the provider.

@spec security/standard-names.html Java Security Standard Algorithm Names
@return a {@code CertPathValidator} object that implements the
        specified algorithm

@throws IllegalArgumentException if the {@code provider} is
        {@code null} or empty

@throws NoSuchAlgorithmException if a {@code CertPathValidatorSpi}
        implementation for the specified algorithm is not
        available from the specified provider

@throws NoSuchProviderException if the specified provider is not
        registered in the security provider list

@throws NullPointerException if {@code algorithm} is {@code null}

@see java.security.Provider

## CertPathValidator.getInstance(String, Provider)

```java
public static CertPathValidator getInstance(String algorithm, Provider provider) throws NoSuchAlgorithmException
```

Returns a {@code CertPathValidator} object that implements the
specified algorithm.

<p> A new CertPathValidator object encapsulating the
CertPathValidatorSpi implementation from the specified Provider
object is returned.  Note that the specified Provider object
does not have to be registered in the provider list.

@param algorithm the name of the requested {@code CertPathValidator}
algorithm. See the CertPathValidator section in the <a href=
"{@docRoot}/../specs/security/standard-names.html#certpathvalidator-algorithms">
Java Security Standard Algorithm Names Specification</a>
for information about standard algorithm names.

@param provider the provider.

@spec security/standard-names.html Java Security Standard Algorithm Names
@return a {@code CertPathValidator} object that implements the
         specified algorithm

@throws IllegalArgumentException if the {@code provider} is
        {@code null}

@throws NoSuchAlgorithmException if a {@code CertPathValidatorSpi}
        implementation for the specified algorithm is not available
        from the specified Provider object

@throws NullPointerException if {@code algorithm} is {@code null}

@see java.security.Provider

## CertPathValidator.getProvider()

```java
public final Provider getProvider()
```

Returns the {@code Provider} of this
{@code CertPathValidator}.

@return the {@code Provider} of this {@code CertPathValidator}

## CertPathValidator.getAlgorithm()

```java
public final String getAlgorithm()
```

Returns the algorithm name of this {@code CertPathValidator}.

@return the algorithm name of this {@code CertPathValidator}

## CertPathValidator.validate(CertPath, CertPathParameters)

```java
public final CertPathValidatorResult validate(CertPath certPath, CertPathParameters params) throws CertPathValidatorException, InvalidAlgorithmParameterException
```

Validates the specified certification path using the specified
algorithm parameter set.
<p>
The {@code CertPath} specified must be of a type that is
supported by the validation algorithm, otherwise an
{@code InvalidAlgorithmParameterException} will be thrown. For
example, a {@code CertPathValidator} that implements the PKIX
algorithm validates {@code CertPath} objects of type X.509.

@param certPath the {@code CertPath} to be validated
@param params the algorithm parameters
@return the result of the validation algorithm
@throws    CertPathValidatorException if the {@code CertPath}
does not validate
@throws    InvalidAlgorithmParameterException if the specified
parameters or the type of the specified {@code CertPath} are
inappropriate for this {@code CertPathValidator}

## CertPathValidator.getDefaultType()

```java
public static final String getDefaultType()
```

Returns the default {@code CertPathValidator} type as specified by
the {@code certpathvalidator.type} security property, or the string
{@literal "PKIX"} if no such property exists.

<p>The default {@code CertPathValidator} type can be used by
applications that do not want to use a hard-coded type when calling one
of the {@code getInstance} methods, and want to provide a default
type in case a user does not specify its own.

<p>The default {@code CertPathValidator} type can be changed by
setting the value of the {@code certpathvalidator.type} security
property to the desired type.

@see java.security.Security security properties
@return the default {@code CertPathValidator} type as specified
by the {@code certpathvalidator.type} security property, or the string
{@literal "PKIX"} if no such property exists.

## CertPathValidator.getRevocationChecker()

```java
public final CertPathChecker getRevocationChecker()
```

Returns a {@code CertPathChecker} that the encapsulated
{@code CertPathValidatorSpi} implementation uses to check the revocation
status of certificates. A PKIX implementation returns objects of
type {@code PKIXRevocationChecker}. Each invocation of this method
returns a new instance of {@code CertPathChecker}.

<p>The primary purpose of this method is to allow callers to specify
additional input parameters and options specific to revocation checking.
See the class description for an example.

@return a {@code CertPathChecker}
@throws UnsupportedOperationException if the service provider does not
        support this method
@since 1.8