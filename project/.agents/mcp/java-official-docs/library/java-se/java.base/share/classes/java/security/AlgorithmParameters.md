# AlgorithmParameters class (java.security)

```java
public class AlgorithmParameters
```

This class is used as an opaque representation of cryptographic parameters.

<p>An {@code AlgorithmParameters} object for managing the parameters
for a particular algorithm can be obtained by
calling one of the {@code getInstance} factory methods
(static methods that return instances of a given class).

<p>Once an {@code AlgorithmParameters} object is obtained, it must be
initialized via a call to {@code init}, using an appropriate parameter
specification or parameter encoding.

<p>A transparent parameter specification is obtained from an
{@code AlgorithmParameters} object via a call to
{@code getParameterSpec}, and a byte encoding of the parameters is
obtained via a call to {@code getEncoded}.

<p> Every implementation of the Java platform is required to support the
following standard {@code AlgorithmParameters} algorithms. For the "EC"
algorithm, implementations must support the curves in parentheses. For the
"RSASSA-PSS" algorithm, implementations must support the parameters in
parentheses.
<ul>
<li>{@code AES}</li>
<li>{@code ChaCha20-Poly1305}</li>
<li>{@code DESede}</li>
<li>{@code DiffieHellman}</li>
<li>{@code DSA}</li>
<li>{@code EC} (secp256r1, secp384r1)</li>
<li>{@code RSASSA-PSS} (MGF1 mask generation function and SHA-256 or SHA-384
    hash algorithms)</li>
</ul>
These algorithms are described in the <a href=
"{@docRoot}/../specs/security/standard-names.html#algorithmparameters-algorithms">
AlgorithmParameters section</a> of the
Java Security Standard Algorithm Names Specification.
Consult the release documentation for your implementation to see if any
other algorithms are supported.

@spec security/standard-names.html Java Security Standard Algorithm Names
@author Jan Luehe


@see java.security.spec.AlgorithmParameterSpec
@see java.security.spec.DSAParameterSpec
@see KeyPairGenerator

@since 1.2

## AlgorithmParameters.AlgorithmParameters(AlgorithmParametersSpi, Provider, String)

```java
protected AlgorithmParameters(AlgorithmParametersSpi paramSpi, Provider provider, String algorithm)
```

Creates an {@code AlgorithmParameters} object.

@param paramSpi the delegate
@param provider the provider
@param algorithm the algorithm

## AlgorithmParameters.getAlgorithm()

```java
public final String getAlgorithm()
```

Returns the name of the algorithm associated with this parameter object.

@return the algorithm name.

## AlgorithmParameters.getInstance(String)

```java
public static AlgorithmParameters getInstance(String algorithm) throws NoSuchAlgorithmException
```

Returns a parameter object for the specified algorithm.

<p> This method traverses the list of registered security providers,
starting with the most preferred provider.
A new {@code AlgorithmParameters} object encapsulating the
{@code AlgorithmParametersSpi} implementation from the first
provider that supports the specified algorithm is returned.

<p> Note that the list of registered providers may be retrieved via
the {@link Security#getProviders() Security.getProviders()} method.

<p> The returned parameter object must be initialized via a call to
{@code init}, using an appropriate parameter specification or
parameter encoding.

@implNote
The JDK Reference Implementation additionally uses the
{@code jdk.security.provider.preferred}
{@link Security#getProperty(String) Security} property to determine
the preferred provider order for the specified algorithm. This
may be different from the order of providers returned by
{@link Security#getProviders() Security.getProviders()}.

@param algorithm the name of the algorithm requested.
See the AlgorithmParameters section in the <a href=
"{@docRoot}/../specs/security/standard-names.html#algorithmparameters-algorithms">
Java Security Standard Algorithm Names Specification</a>
for information about standard algorithm names.

@spec security/standard-names.html Java Security Standard Algorithm Names
@return the new parameter object

@throws NoSuchAlgorithmException if no {@code Provider} supports an
        {@code AlgorithmParametersSpi} implementation for the
        specified algorithm

@throws NullPointerException if {@code algorithm} is {@code null}

@see Provider

## AlgorithmParameters.getInstance(String, String)

```java
public static AlgorithmParameters getInstance(String algorithm, String provider) throws NoSuchAlgorithmException, NoSuchProviderException
```

Returns a parameter object for the specified algorithm.

<p> A new {@code AlgorithmParameters} object encapsulating the
{@code AlgorithmParametersSpi} implementation from the specified provider
is returned.  The specified provider must be registered
in the security provider list.

<p> Note that the list of registered providers may be retrieved via
the {@link Security#getProviders() Security.getProviders()} method.

<p>The returned parameter object must be initialized via a call to
{@code init}, using an appropriate parameter specification or
parameter encoding.

@param algorithm the name of the algorithm requested.
See the AlgorithmParameters section in the <a href=
"{@docRoot}/../specs/security/standard-names.html#algorithmparameters-algorithms">
Java Security Standard Algorithm Names Specification</a>
for information about standard algorithm names.

@param provider the name of the provider.

@spec security/standard-names.html Java Security Standard Algorithm Names
@return the new parameter object

@throws IllegalArgumentException if the provider name is {@code null}
        or empty

@throws NoSuchAlgorithmException if an {@code AlgorithmParametersSpi}
        implementation for the specified algorithm is not
        available from the specified provider

@throws NoSuchProviderException if the specified provider is not
        registered in the security provider list

@throws NullPointerException if {@code algorithm} is {@code null}

@see Provider

## AlgorithmParameters.getInstance(String, Provider)

```java
public static AlgorithmParameters getInstance(String algorithm, Provider provider) throws NoSuchAlgorithmException
```

Returns a parameter object for the specified algorithm.

<p> A new {@code AlgorithmParameters} object encapsulating the
{@code AlgorithmParametersSpi} implementation from the specified
provider is returned.  Note that the specified provider
does not have to be registered in the provider list.

<p>The returned parameter object must be initialized via a call to
{@code init}, using an appropriate parameter specification or
parameter encoding.

@param algorithm the name of the algorithm requested.
See the AlgorithmParameters section in the <a href=
"{@docRoot}/../specs/security/standard-names.html#algorithmparameters-algorithms">
Java Security Standard Algorithm Names Specification</a>
for information about standard algorithm names.

@param provider the name of the provider.

@spec security/standard-names.html Java Security Standard Algorithm Names
@return the new parameter object

@throws IllegalArgumentException if the provider is {@code null}

@throws NoSuchAlgorithmException if an
        {@code AlgorithmParameterGeneratorSpi}
        implementation for the specified algorithm is not available
        from the specified {@code Provider} object

@throws NullPointerException if {@code algorithm} is {@code null}

@see Provider

@since 1.4

## AlgorithmParameters.getProvider()

```java
public final Provider getProvider()
```

Returns the provider of this parameter object.

@return the provider of this parameter object

## AlgorithmParameters.init(AlgorithmParameterSpec)

```java
public final void init(AlgorithmParameterSpec paramSpec) throws InvalidParameterSpecException
```

Initializes this parameter object using the parameters
specified in {@code paramSpec}.

@param paramSpec the parameter specification.

@throws    InvalidParameterSpecException if the given parameter
specification is inappropriate for the initialization of this parameter
object, or if this parameter object has already been initialized.

## AlgorithmParameters.init(byte[])

```java
public final void init(byte[] params) throws IOException
```

Imports the specified parameters and decodes them according to the
primary decoding format for parameters. The primary decoding
format for parameters is ASN.1, if an ASN.1 specification for this type
of parameters exists.

@param params the encoded parameters.

@throws    IOException on decoding errors, or if this parameter object
has already been initialized.

## AlgorithmParameters.init(byte[], String)

```java
public final void init(byte[] params, String format) throws IOException
```

Imports the parameters from {@code params} and decodes them
according to the specified decoding scheme.
If {@code format} is {@code null}, the
primary decoding format for parameters is used. The primary decoding
format is ASN.1, if an ASN.1 specification for these parameters
exists.

@param params the encoded parameters.

@param format the name of the decoding scheme.

@throws    IOException on decoding errors, or if this parameter object
has already been initialized.

## AlgorithmParameters.getParameterSpec(Class<T>)

```java
public final <T extends AlgorithmParameterSpec> T getParameterSpec(Class<T> paramSpec) throws InvalidParameterSpecException
```

Returns a (transparent) specification of this parameter object.
{@code paramSpec} identifies the specification class in which
the parameters should be returned. It could, for example, be
{@code DSAParameterSpec.class}, to indicate that the
parameters should be returned in an instance of the
{@code DSAParameterSpec} class.

@param <T> the type of the parameter specification to be returned
@param paramSpec the specification class in which
the parameters should be returned.

@return the parameter specification.

@throws    InvalidParameterSpecException if the requested parameter
specification is inappropriate for this parameter object, or if this
parameter object has not been initialized.

## AlgorithmParameters.getEncoded()

```java
public final byte[] getEncoded() throws IOException
```

Returns the parameters in their primary encoding format.
The primary encoding format for parameters is ASN.1, if an ASN.1
specification for this type of parameters exists.

@return the parameters encoded using their primary encoding format.

@throws    IOException on encoding errors, or if this parameter object
has not been initialized.

## AlgorithmParameters.getEncoded(String)

```java
public final byte[] getEncoded(String format) throws IOException
```

Returns the parameters encoded in the specified scheme.
If {@code format} is {@code null}, the
primary encoding format for parameters is used. The primary encoding
format is ASN.1, if an ASN.1 specification for these parameters
exists.

@param format the name of the encoding format.

@return the parameters encoded using the specified encoding scheme.

@throws    IOException on encoding errors, or if this parameter object
has not been initialized.

## AlgorithmParameters.toString()

```java
public final String toString()
```

Returns a formatted string describing the parameters.

@return a formatted string describing the parameters, or {@code null}
if this parameter object has not been initialized.