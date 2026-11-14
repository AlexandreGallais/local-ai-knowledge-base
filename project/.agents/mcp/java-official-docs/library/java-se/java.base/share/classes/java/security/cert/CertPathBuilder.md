# CertPathBuilder class (java.security.cert)

```java
public class CertPathBuilder
```

A class for building certification paths (also known as certificate chains).
<p>
This class uses a provider-based architecture.
To create a {@code CertPathBuilder}, call
one of the static {@code getInstance} methods, passing in the
algorithm name of the {@code CertPathBuilder} desired and optionally
the name of the provider desired.

<p>Once a {@code CertPathBuilder} object has been created, certification
paths can be constructed by calling the {@link #build build} method and
passing it an algorithm-specific set of parameters. If successful, the
result (including the {@code CertPath} that was built) is returned
in an object that implements the {@code CertPathBuilderResult}
interface.

<p>The {@link #getRevocationChecker} method allows an application to specify
additional algorithm-specific parameters and options used by the
{@code CertPathBuilder} when checking the revocation status of certificates.
Here is an example demonstrating how it is used with the PKIX algorithm:

<pre>
CertPathBuilder cpb = CertPathBuilder.getInstance("PKIX");
PKIXRevocationChecker rc = (PKIXRevocationChecker)cpb.getRevocationChecker();
rc.setOptions(EnumSet.of(Option.PREFER_CRLS));
params.addCertPathChecker(rc);
CertPathBuilderResult cpbr = cpb.build(params);
</pre>

<p>Every implementation of the Java platform is required to support the
following standard {@code CertPathBuilder} algorithm:
<ul>
<li>{@code PKIX}</li>
</ul>
This algorithm is described in the <a href=
"{@docRoot}/../specs/security/standard-names.html#certpathbuilder-algorithms">
CertPathBuilder section</a> of the
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
access a single {@code CertPathBuilder} instance concurrently should
synchronize amongst themselves and provide the necessary locking. Multiple
threads each manipulating a different {@code CertPathBuilder} instance
need not synchronize.

@spec security/standard-names.html Java Security Standard Algorithm Names
@see CertPath

@since       1.4
@author      Sean Mullan
@author      Yassir Elley

## CertPathBuilder.CertPathBuilder(CertPathBuilderSpi, Provider, String)

```java
protected CertPathBuilder(CertPathBuilderSpi builderSpi, Provider provider, String algorithm)
```

Creates a {@code CertPathBuilder} object of the given algorithm,
and encapsulates the given provider implementation (SPI object) in it.

@param builderSpi the provider implementation
@param provider the provider
@param algorithm the algorithm name

## CertPathBuilder.getInstance(String)

```java
public static CertPathBuilder getInstance(String algorithm) throws NoSuchAlgorithmException
```

Returns a {@code CertPathBuilder} object that implements the
specified algorithm.

<p> This method traverses the list of registered security Providers,
starting with the most preferred Provider.
A new CertPathBuilder object encapsulating the
CertPathBuilderSpi implementation from the first
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

@param algorithm the name of the requested {@code CertPathBuilder}
 algorithm.  See the CertPathBuilder section in the <a href=
 "{@docRoot}/../specs/security/standard-names.html#certpathbuilder-algorithms">
Java Security Standard Algorithm Names Specification</a>
for information about standard algorithm names.

@spec security/standard-names.html Java Security Standard Algorithm Names
@return a {@code CertPathBuilder} object that implements the
        specified algorithm

@throws NoSuchAlgorithmException if no {@code Provider} supports a
        {@code CertPathBuilderSpi} implementation for the
        specified algorithm

@throws NullPointerException if {@code algorithm} is {@code null}

@see java.security.Provider

## CertPathBuilder.getInstance(String, String)

```java
public static CertPathBuilder getInstance(String algorithm, String provider) throws NoSuchAlgorithmException, NoSuchProviderException
```

Returns a {@code CertPathBuilder} object that implements the
specified algorithm.

<p> A new CertPathBuilder object encapsulating the
CertPathBuilderSpi implementation from the specified provider
is returned.  The specified provider must be registered
in the security provider list.

<p> Note that the list of registered providers may be retrieved via
the {@link Security#getProviders() Security.getProviders()} method.

@param algorithm the name of the requested {@code CertPathBuilder}
 algorithm.  See the CertPathBuilder section in the <a href=
 "{@docRoot}/../specs/security/standard-names.html#certpathbuilder-algorithms">
Java Security Standard Algorithm Names Specification</a>
for information about standard algorithm names.

@param provider the name of the provider.

@spec security/standard-names.html Java Security Standard Algorithm Names
@return a {@code CertPathBuilder} object that implements the
        specified algorithm

@throws IllegalArgumentException if the {@code provider} is
        {@code null} or empty

@throws NoSuchAlgorithmException if a {@code CertPathBuilderSpi}
        implementation for the specified algorithm is not
        available from the specified provider

@throws NoSuchProviderException if the specified provider is not
        registered in the security provider list

@throws NullPointerException if {@code algorithm} is {@code null}

@see java.security.Provider

## CertPathBuilder.getInstance(String, Provider)

```java
public static CertPathBuilder getInstance(String algorithm, Provider provider) throws NoSuchAlgorithmException
```

Returns a {@code CertPathBuilder} object that implements the
specified algorithm.

<p> A new CertPathBuilder object encapsulating the
CertPathBuilderSpi implementation from the specified Provider
object is returned.  Note that the specified Provider object
does not have to be registered in the provider list.

@param algorithm the name of the requested {@code CertPathBuilder}
 algorithm.  See the CertPathBuilder section in the <a href=
 "{@docRoot}/../specs/security/standard-names.html#certpathbuilder-algorithms">
Java Security Standard Algorithm Names Specification</a>
for information about standard algorithm names.

@param provider the provider.

@spec security/standard-names.html Java Security Standard Algorithm Names
@return a {@code CertPathBuilder} object that implements the
        specified algorithm

@throws IllegalArgumentException if the {@code provider} is
        {@code null}

@throws NoSuchAlgorithmException if a {@code CertPathBuilderSpi}
        implementation for the specified algorithm is not available
        from the specified {@code Provider} object

@throws NullPointerException if {@code algorithm} is {@code null}

@see java.security.Provider

## CertPathBuilder.getProvider()

```java
public final Provider getProvider()
```

Returns the provider of this {@code CertPathBuilder}.

@return the provider of this {@code CertPathBuilder}

## CertPathBuilder.getAlgorithm()

```java
public final String getAlgorithm()
```

Returns the name of the algorithm of this {@code CertPathBuilder}.

@return the name of the algorithm of this {@code CertPathBuilder}

## CertPathBuilder.build(CertPathParameters)

```java
public final CertPathBuilderResult build(CertPathParameters params) throws CertPathBuilderException, InvalidAlgorithmParameterException
```

Attempts to build a certification path using the specified algorithm
parameter set.

@param params the algorithm parameters
@return the result of the build algorithm
@throws CertPathBuilderException if the builder is unable to construct
 a certification path that satisfies the specified parameters
@throws InvalidAlgorithmParameterException if the specified parameters
are inappropriate for this {@code CertPathBuilder}

## CertPathBuilder.getDefaultType()

```java
public static final String getDefaultType()
```

Returns the default {@code CertPathBuilder} type as specified by
the {@code certpathbuilder.type} security property, or the string
{@literal "PKIX"} if no such property exists.

<p>The default {@code CertPathBuilder} type can be used by
applications that do not want to use a hard-coded type when calling one
of the {@code getInstance} methods, and want to provide a default
type in case a user does not specify its own.

<p>The default {@code CertPathBuilder} type can be changed by
setting the value of the {@code certpathbuilder.type} security property
to the desired type.

@see java.security.Security security properties
@return the default {@code CertPathBuilder} type as specified
by the {@code certpathbuilder.type} security property, or the string
{@literal "PKIX"} if no such property exists.

## CertPathBuilder.getRevocationChecker()

```java
public final CertPathChecker getRevocationChecker()
```

Returns a {@code CertPathChecker} that the encapsulated
{@code CertPathBuilderSpi} implementation uses to check the revocation
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