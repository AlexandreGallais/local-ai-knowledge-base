# KeyPairGenerator class (java.security)

```java
public abstract class KeyPairGenerator extends KeyPairGeneratorSpi
```

The {@code KeyPairGenerator} class is used to generate pairs of
public and private keys. Key pair generators are constructed using the
{@code getInstance} factory methods (static methods that
return instances of a given class).

<p>A Key pair generator for a particular algorithm creates a public/private
key pair that can be used with this algorithm. It also associates
algorithm-specific parameters with each of the generated keys.

<p>There are two ways to generate a key pair: in an algorithm-independent
manner, and in an algorithm-specific manner.
The only difference between the two is the initialization of the object:

<ul>
<li><b>Algorithm-Independent Initialization</b>
<p>All key pair generators share the concepts of a keysize and a
source of randomness. The keysize is interpreted differently for different
algorithms (e.g., in the case of the <i>DSA</i> algorithm, the keysize
corresponds to the length of the modulus).
There is an
{@link #initialize(int, java.security.SecureRandom) initialize}
method in this {@code KeyPairGenerator} class that takes these two universally
shared types of arguments. There is also one that takes just a
{@code keysize} argument, and uses the {@code SecureRandom}
implementation of the highest-priority installed provider as the source
of randomness. (If none of the installed providers supply an implementation
of {@code SecureRandom}, a system-provided source of randomness is
used.)

<p>Since no other parameters are specified when you call the above
algorithm-independent {@code initialize} methods, it is up to the
provider what to do about the algorithm-specific parameters (if any) to be
associated with each of the keys. See the
{@extLink security_guide_jdk_providers JDK Providers} document for information
on the default algorithm-specific parameters used by JDK providers.

<li><b>Algorithm-Specific Initialization</b>
<p>For situations where a set of algorithm-specific parameters already
exists (e.g., so-called <i>community parameters</i> in DSA), there are two
{@link #initialize(java.security.spec.AlgorithmParameterSpec)
initialize} methods that have an {@code AlgorithmParameterSpec}
argument. One also has a {@code SecureRandom} argument, while
the other uses the {@code SecureRandom}
implementation of the highest-priority installed provider as the source
of randomness. (If none of the installed providers supply an implementation
of {@code SecureRandom}, a system-provided source of randomness is
used.)
</ul>

<p>In case the client does not explicitly initialize the
{@code KeyPairGenerator}
(via a call to an {@code initialize} method), each provider must
supply (and document) a default initialization.
See the Keysize Restriction sections of the
{@extLink security_guide_jdk_providers JDK Providers}
document for information on the {@code KeyPairGenerator} defaults used by
JDK providers.
However, note that defaults may vary across different providers.
Additionally, the default value for a provider may change in a future
version. Therefore, it is recommended to explicitly initialize the
{@code KeyPairGenerator} instead of relying on provider-specific defaults.

<p>Note that this class is abstract and extends from
{@code KeyPairGeneratorSpi} for historical reasons.
Application developers should only take notice of the methods defined in
this {@code KeyPairGenerator} class; all the methods in
the superclass are intended for cryptographic service providers who wish to
supply their own implementations of key pair generators.

<p> Every implementation of the Java platform is required to support the
following standard {@code KeyPairGenerator} algorithms. For the "EC"
algorithm, implementations must support the curves in parentheses. For other
algorithms, implementations must support the key sizes in parentheses.
<ul>
<li>{@code DiffieHellman} (1024, 2048, 3072, 4096)</li>
<li>{@code DSA} (1024, 2048)</li>
<li>{@code EC} (secp256r1, secp384r1)</li>
<li>{@code RSA} (1024, 2048, 3072, 4096)</li>
<li>{@code RSASSA-PSS} (2048, 3072, 4096)</li>
<li>{@code X25519}</li>
</ul>
These algorithms are described in the <a href=
"{@docRoot}/../specs/security/standard-names.html#keypairgenerator-algorithms">
KeyPairGenerator section</a> of the
Java Security Standard Algorithm Names Specification.
Consult the release documentation for your implementation to see if any
other algorithms are supported.

@spec security/standard-names.html Java Security Standard Algorithm Names
@author Benjamin Renaud
@since 1.1

@see java.security.spec.AlgorithmParameterSpec

## KeyPairGenerator.KeyPairGenerator(String)

```java
protected KeyPairGenerator(String algorithm)
```

Creates a {@code KeyPairGenerator} object for the specified algorithm.

@param algorithm the standard string name of the algorithm.
See the KeyPairGenerator section in the <a href=
"{@docRoot}/../specs/security/standard-names.html#keypairgenerator-algorithms">
Java Security Standard Algorithm Names Specification</a>
for information about standard algorithm names.
@spec security/standard-names.html Java Security Standard Algorithm Names

## KeyPairGenerator.getAlgorithm()

```java
public String getAlgorithm()
```

Returns the standard name of the algorithm for this key pair generator.
See the KeyPairGenerator section in the <a href=
"{@docRoot}/../specs/security/standard-names.html#keypairgenerator-algorithms">
Java Security Standard Algorithm Names Specification</a>
for information about standard algorithm names.

@spec security/standard-names.html Java Security Standard Algorithm Names
@return the standard string name of the algorithm.

## KeyPairGenerator.getInstance(String)

```java
public static KeyPairGenerator getInstance(String algorithm) throws NoSuchAlgorithmException
```

Returns a {@code KeyPairGenerator} object that generates public/private
key pairs for the specified algorithm.

<p> This method traverses the list of registered security Providers,
starting with the most preferred Provider.
A new {@code KeyPairGenerator} object encapsulating the
{@code KeyPairGeneratorSpi} implementation from the first
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

@param algorithm the standard string name of the algorithm.
See the KeyPairGenerator section in the <a href=
"{@docRoot}/../specs/security/standard-names.html#keypairgenerator-algorithms">
Java Security Standard Algorithm Names Specification</a>
for information about standard algorithm names.

@spec security/standard-names.html Java Security Standard Algorithm Names
@return the new {@code KeyPairGenerator} object

@throws NoSuchAlgorithmException if no {@code Provider} supports a
        {@code KeyPairGeneratorSpi} implementation for the
        specified algorithm

@throws NullPointerException if {@code algorithm} is {@code null}

@see Provider

## KeyPairGenerator.getInstance(String, String)

```java
public static KeyPairGenerator getInstance(String algorithm, String provider) throws NoSuchAlgorithmException, NoSuchProviderException
```

Returns a {@code KeyPairGenerator} object that generates public/private
key pairs for the specified algorithm.

<p> A new {@code KeyPairGenerator} object encapsulating the
{@code KeyPairGeneratorSpi} implementation from the specified provider
is returned.  The specified provider must be registered
in the security provider list.

<p> Note that the list of registered providers may be retrieved via
the {@link Security#getProviders() Security.getProviders()} method.

@param algorithm the standard string name of the algorithm.
See the KeyPairGenerator section in the <a href=
"{@docRoot}/../specs/security/standard-names.html#keypairgenerator-algorithms">
Java Security Standard Algorithm Names Specification</a>
for information about standard algorithm names.

@param provider the string name of the provider.

@spec security/standard-names.html Java Security Standard Algorithm Names
@return the new {@code KeyPairGenerator} object

@throws IllegalArgumentException if the provider name is {@code null}
        or empty

@throws NoSuchAlgorithmException if a {@code KeyPairGeneratorSpi}
        implementation for the specified algorithm is not
        available from the specified provider

@throws NoSuchProviderException if the specified provider is not
        registered in the security provider list

@throws NullPointerException if {@code algorithm} is {@code null}

@see Provider

## KeyPairGenerator.getInstance(String, Provider)

```java
public static KeyPairGenerator getInstance(String algorithm, Provider provider) throws NoSuchAlgorithmException
```

Returns a {@code KeyPairGenerator} object that generates public/private
key pairs for the specified algorithm.

<p> A new {@code KeyPairGenerator} object encapsulating the
{@code KeyPairGeneratorSpi} implementation from the specified provider
is returned.  Note that the specified provider does not
have to be registered in the provider list.

@param algorithm the standard string name of the algorithm.
See the KeyPairGenerator section in the <a href=
"{@docRoot}/../specs/security/standard-names.html#keypairgenerator-algorithms">
Java Security Standard Algorithm Names Specification</a>
for information about standard algorithm names.

@spec security/standard-names.html Java Security Standard Algorithm Names
@param provider the provider.

@return the new {@code KeyPairGenerator} object

@throws IllegalArgumentException if the specified provider is
        {@code null}

@throws NoSuchAlgorithmException if a {@code KeyPairGeneratorSpi}
        implementation for the specified algorithm is not available
        from the specified {@code Provider} object

@throws NullPointerException if {@code algorithm} is {@code null}

@see Provider

@since 1.4

## KeyPairGenerator.getProvider()

```java
public final Provider getProvider()
```

Returns the provider of this key pair generator object.

@return the provider of this key pair generator object

## KeyPairGenerator.initialize(int)

```java
public void initialize(int keysize)
```

Initializes the key pair generator for a certain keysize using
a default parameter set and the {@code SecureRandom}
implementation of the highest-priority installed provider as the source
of randomness.
(If none of the installed providers supply an implementation of
{@code SecureRandom}, a system-provided source of randomness is
used.)

@param keysize the keysize. This is an
algorithm-specific metric, such as modulus length, specified in
number of bits.

@throws    InvalidParameterException if the {@code keysize} is not
supported by this {@code KeyPairGenerator} object.

## KeyPairGenerator.initialize(int, SecureRandom)

```java
public void initialize(int keysize, SecureRandom random)
```

Initializes the key pair generator for a certain keysize with
the given source of randomness (and a default parameter set).

@param keysize the keysize. This is an
algorithm-specific metric, such as modulus length, specified in
number of bits.
@param random the source of randomness.

@throws    InvalidParameterException if the {@code keysize} is not
supported by this {@code KeyPairGenerator} object.

@since 1.2

## KeyPairGenerator.initialize(AlgorithmParameterSpec)

```java
public void initialize(AlgorithmParameterSpec params) throws InvalidAlgorithmParameterException
```

Initializes the key pair generator using the specified parameter
set and the {@code SecureRandom}
implementation of the highest-priority installed provider as the source
of randomness.
(If none of the installed providers supply an implementation of
{@code SecureRandom}, a system-provided source of randomness is
used.)

<p>This concrete method has been added to this previously-defined
abstract class.
This method calls the KeyPairGeneratorSpi
{@link KeyPairGeneratorSpi#initialize(
java.security.spec.AlgorithmParameterSpec,
java.security.SecureRandom) initialize} method,
passing it {@code params} and a source of randomness (obtained
from the highest-priority installed provider or system-provided if none
of the installed providers supply one).
That {@code initialize} method always throws an
{@code UnsupportedOperationException} if it is not overridden
by the provider.
@param params the parameter set used to generate the keys.

@throws    InvalidAlgorithmParameterException if the given parameters
are inappropriate for this key pair generator.

@since 1.2

## KeyPairGenerator.initialize(AlgorithmParameterSpec, SecureRandom)

```java
public void initialize(AlgorithmParameterSpec params, SecureRandom random) throws InvalidAlgorithmParameterException
```

Initializes the key pair generator with the given parameter
set and source of randomness.

<p>This concrete method has been added to this previously-defined
abstract class.
This method calls the KeyPairGeneratorSpi {@link
KeyPairGeneratorSpi#initialize(
java.security.spec.AlgorithmParameterSpec,
java.security.SecureRandom) initialize} method,
passing it {@code params} and {@code random}.
That {@code initialize}
method always throws an {@code UnsupportedOperationException}
if it is not overridden by the provider.

@param params the parameter set used to generate the keys.
@param random the source of randomness.

@throws    InvalidAlgorithmParameterException if the given parameters
are inappropriate for this key pair generator.

@since 1.2

## KeyPairGenerator.genKeyPair()

```java
public final KeyPair genKeyPair()
```

Generates a key pair.

<p>If this {@code KeyPairGenerator} has not been initialized explicitly,
provider-specific defaults will be used for the size and other
(algorithm-specific) values of the generated keys.

<p>This will generate a new key pair every time it is called.

<p>This method is functionally equivalent to
{@link #generateKeyPair() generateKeyPair}.

@return the generated key pair

@since 1.2

## KeyPairGenerator.generateKeyPair()

```java
public KeyPair generateKeyPair()
```

Generates a key pair.

<p>If this {@code KeyPairGenerator} has not been initialized explicitly,
provider-specific defaults will be used for the size and other
(algorithm-specific) values of the generated keys.

<p>This will generate a new key pair every time it is called.

<p>This method is functionally equivalent to
{@link #genKeyPair() genKeyPair}.

@return the generated key pair