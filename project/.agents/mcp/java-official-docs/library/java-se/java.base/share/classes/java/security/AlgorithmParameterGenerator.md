# AlgorithmParameterGenerator class (java.security)

```java
public class AlgorithmParameterGenerator
```

The {@code AlgorithmParameterGenerator} class is used to generate a
set of
parameters to be used with a certain algorithm. Parameter generators
are constructed using the {@code getInstance} factory methods
(static methods that return instances of a given class).

<P>The object that will generate the parameters can be initialized
in two different ways: in an algorithm-independent manner, or in an
algorithm-specific manner:

<ul>
<li>The algorithm-independent approach uses the fact that all parameter
generators share the concept of a "size" and a
source of randomness. The measure of size is universally shared
by all algorithm parameters, though it is interpreted differently
for different algorithms. For example, in the case of parameters for
the <i>DSA</i> algorithm, "size" corresponds to the size
of the prime modulus (in bits).
When using this approach, algorithm-specific parameter generation
values - if any - default to some standard values, unless they can be
derived from the specified size.

<li>The other approach initializes a parameter generator object
using algorithm-specific semantics, which are represented by a set of
algorithm-specific parameter generation values. To generate
Diffie-Hellman system parameters, for example, the parameter generation
values usually
consist of the size of the prime modulus and the size of the
random exponent, both specified in number of bits.
</ul>

<P>In case the client does not explicitly initialize the
{@code AlgorithmParameterGenerator} (via a call to an {@code init} method),
each provider must supply (and document) a default initialization.
See the Keysize Restriction sections of the
{@extLink security_guide_jdk_providers JDK Providers}
document for information on the AlgorithmParameterGenerator defaults
used by JDK providers.
However, note that defaults may vary across different providers.
Additionally, the default value for a provider may change in a future
version. Therefore, it is recommended to explicitly initialize the
{@code AlgorithmParameterGenerator} instead of relying on provider-specific
defaults.

<p> Every implementation of the Java platform is required to support the
following standard {@code AlgorithmParameterGenerator} algorithms and
keysizes in parentheses:
<ul>
<li>{@code DiffieHellman} (1024, 2048)</li>
<li>{@code DSA} (1024, 2048)</li>
</ul>
These algorithms are described in the <a href=
"{@docRoot}/../specs/security/standard-names.html#algorithmparametergenerator-algorithms">
AlgorithmParameterGenerator section</a> of the
Java Security Standard Algorithm Names Specification.
Consult the release documentation for your implementation to see if any
other algorithms are supported.

@spec security/standard-names.html Java Security Standard Algorithm Names
@author Jan Luehe


@see AlgorithmParameters
@see java.security.spec.AlgorithmParameterSpec

@since 1.2

## AlgorithmParameterGenerator.AlgorithmParameterGenerator(AlgorithmParameterGeneratorSpi, Provider, String)

```java
protected AlgorithmParameterGenerator (AlgorithmParameterGeneratorSpi paramGenSpi, Provider provider, String algorithm)
```

Creates an {@code AlgorithmParameterGenerator} object.

@param paramGenSpi the delegate
@param provider the provider
@param algorithm the algorithm

## AlgorithmParameterGenerator.getAlgorithm()

```java
public final String getAlgorithm()
```

Returns the standard name of the algorithm this parameter
generator is associated with.

@return the string name of the algorithm.

## AlgorithmParameterGenerator.getInstance(String)

```java
public static AlgorithmParameterGenerator getInstance(String algorithm) throws NoSuchAlgorithmException
```

Returns an {@code AlgorithmParameterGenerator} object for generating
a set of parameters to be used with the specified algorithm.

<p> This method traverses the list of registered security providers,
starting with the most preferred provider.
A new {@code AlgorithmParameterGenerator} object encapsulating the
{@code AlgorithmParameterGeneratorSpi} implementation from the first
provider that supports the specified algorithm is returned.

<p> Note that the list of registered providers may be retrieved via
the {@link Security#getProviders() Security.getProviders()} method.

@implNote
The JDK Reference Implementation additionally uses the
{@code jdk.security.provider.preferred}
{@link Security#getProperty(String) Security} property to determine
the preferred provider order for the specified algorithm. This
may be different from the order of providers returned by
{@link Security#getProviders() Security.getProviders()}.

@param algorithm the name of the algorithm this
parameter generator is associated with.
See the AlgorithmParameterGenerator section in the <a href=
"{@docRoot}/../specs/security/standard-names.html#algorithmparametergenerator-algorithms">
Java Security Standard Algorithm Names Specification</a>
for information about standard algorithm names.

@spec security/standard-names.html Java Security Standard Algorithm Names
@return the new {@code AlgorithmParameterGenerator} object

@throws NoSuchAlgorithmException if no {@code Provider} supports an
        {@code AlgorithmParameterGeneratorSpi} implementation for the
        specified algorithm

@throws NullPointerException if {@code algorithm} is {@code null}

@see Provider

## AlgorithmParameterGenerator.getInstance(String, String)

```java
public static AlgorithmParameterGenerator getInstance(String algorithm, String provider) throws NoSuchAlgorithmException, NoSuchProviderException
```

Returns an {@code AlgorithmParameterGenerator} object for generating
a set of parameters to be used with the specified algorithm.

<p> A new {@code AlgorithmParameterGenerator} object encapsulating the
{@code AlgorithmParameterGeneratorSpi} implementation from the
specified provider is returned.  The specified provider must be
registered in the security provider list.

<p> Note that the list of registered providers may be retrieved via
the {@link Security#getProviders() Security.getProviders()} method.

@param algorithm the name of the algorithm this
parameter generator is associated with.
See the AlgorithmParameterGenerator section in the <a href=
"{@docRoot}/../specs/security/standard-names.html#algorithmparametergenerator-algorithms">
Java Security Standard Algorithm Names Specification</a>
for information about standard algorithm names.

@param provider the string name of the {@code Provider}.

@spec security/standard-names.html Java Security Standard Algorithm Names
@return the new {@code AlgorithmParameterGenerator} object

@throws IllegalArgumentException if the provider name is {@code null}
        or empty

@throws NoSuchAlgorithmException if an
        {@code AlgorithmParameterGeneratorSpi}
        implementation for the specified algorithm is not
        available from the specified provider

@throws NoSuchProviderException if the specified provider is not
        registered in the security provider list

@throws NullPointerException if {@code algorithm} is {@code null}

@see Provider

## AlgorithmParameterGenerator.getInstance(String, Provider)

```java
public static AlgorithmParameterGenerator getInstance(String algorithm, Provider provider) throws NoSuchAlgorithmException
```

Returns an {@code AlgorithmParameterGenerator} object for generating
a set of parameters to be used with the specified algorithm.

<p> A new {@code AlgorithmParameterGenerator} object encapsulating the
{@code AlgorithmParameterGeneratorSpi} implementation from the specified
provider is returned.  Note that the specified provider does not
have to be registered in the provider list.

@param algorithm the string name of the algorithm this
parameter generator is associated with.
See the AlgorithmParameterGenerator section in the <a href=
"{@docRoot}/../specs/security/standard-names.html#algorithmparametergenerator-algorithms">
Java Security Standard Algorithm Names Specification</a>
for information about standard algorithm names.

@param provider the {@code Provider} object.

@spec security/standard-names.html Java Security Standard Algorithm Names
@return the new {@code AlgorithmParameterGenerator} object

@throws IllegalArgumentException if the specified provider is
        {@code null}

@throws NoSuchAlgorithmException if an
        {@code AlgorithmParameterGeneratorSpi}
        implementation for the specified algorithm is not available
        from the specified {@code Provider} object

@throws NullPointerException if {@code algorithm} is {@code null}

@see Provider

@since 1.4

## AlgorithmParameterGenerator.getProvider()

```java
public final Provider getProvider()
```

Returns the provider of this algorithm parameter generator object.

@return the provider of this algorithm parameter generator object

## AlgorithmParameterGenerator.init(int)

```java
public final void init(int size)
```

Initializes this parameter generator for a certain size.
To create the parameters, the {@code SecureRandom}
implementation of the highest-priority installed provider is used as
the source of randomness.
(If none of the installed providers supply an implementation of
{@code SecureRandom}, a system-provided source of randomness is
used.)

@param size the size (number of bits).

## AlgorithmParameterGenerator.init(int, SecureRandom)

```java
public final void init(int size, SecureRandom random)
```

Initializes this parameter generator for a certain size and source
of randomness.

@param size the size (number of bits).
@param random the source of randomness.

## AlgorithmParameterGenerator.init(AlgorithmParameterSpec)

```java
public final void init(AlgorithmParameterSpec genParamSpec) throws InvalidAlgorithmParameterException
```

Initializes this parameter generator with a set of algorithm-specific
parameter generation values.
To generate the parameters, the {@code SecureRandom}
implementation of the highest-priority installed provider is used as
the source of randomness.
(If none of the installed providers supply an implementation of
{@code SecureRandom}, a system-provided source of randomness is
used.)

@param genParamSpec the set of algorithm-specific parameter generation values.

@throws    InvalidAlgorithmParameterException if the given parameter
generation values are inappropriate for this parameter generator.

## AlgorithmParameterGenerator.init(AlgorithmParameterSpec, SecureRandom)

```java
public final void init(AlgorithmParameterSpec genParamSpec, SecureRandom random) throws InvalidAlgorithmParameterException
```

Initializes this parameter generator with a set of algorithm-specific
parameter generation values.

@param genParamSpec the set of algorithm-specific parameter generation values.
@param random the source of randomness.

@throws    InvalidAlgorithmParameterException if the given parameter
generation values are inappropriate for this parameter generator.

## AlgorithmParameterGenerator.generateParameters()

```java
public final AlgorithmParameters generateParameters()
```

Generates the parameters.

@return the new {@code AlgorithmParameters} object.