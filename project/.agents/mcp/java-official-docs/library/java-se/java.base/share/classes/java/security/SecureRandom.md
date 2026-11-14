# SecureRandom class (java.security)

```java
public class SecureRandom extends java.util.Random
```

This class provides a cryptographically strong random number
generator (RNG).

<p>A cryptographically strong random number minimally complies with the
statistical random number generator tests specified in
<a href="https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.140-2.pdf">
<i>FIPS 140-2, Security Requirements for Cryptographic Modules</i></a>,
section 4.9.1.
Additionally, {@code SecureRandom} must produce non-deterministic output.
Therefore, any seed material passed to a {@code SecureRandom} object must be
unpredictable, and all {@code SecureRandom} output sequences must be
cryptographically strong, as described in
<a href="https://tools.ietf.org/html/rfc4086">
<i>RFC 4086: Randomness Requirements for Security</i></a>.

<p> Many {@code SecureRandom} implementations are in the form of a
pseudo-random number generator (PRNG, also known as deterministic random
bits generator or DRBG), which means they use a deterministic algorithm
to produce a pseudo-random sequence from a random seed.
Other implementations may produce true random numbers,
and yet others may use a combination of both techniques.

<p>A caller obtains a {@code SecureRandom} instance via the
no-argument constructor or one of the {@code getInstance} methods.
For example:

<blockquote><pre>
SecureRandom r1 = new SecureRandom();
SecureRandom r2 = SecureRandom.getInstance("NativePRNG");
SecureRandom r3 = SecureRandom.getInstance("DRBG",
        DrbgParameters.instantiation(128, RESEED_ONLY, null));</pre>
</blockquote>

<p> The third statement above returns a {@code SecureRandom} object of the
specific algorithm supporting the specific instantiate parameters. The
implementation's effective instantiated parameters must match this minimum
request but is not necessarily the same. For example, even if the request
does not require a certain feature, the actual instantiation can provide
the feature. An implementation may lazily instantiate a {@code SecureRandom}
until it's actually used, but the effective instantiate parameters must be
determined right after it's created and {@link #getParameters()} should
always return the same result unchanged.

<p> Typical callers of {@code SecureRandom} invoke the following methods
to retrieve random bytes:

<blockquote><pre>
SecureRandom random = new SecureRandom();
byte[] bytes = new byte[20];
random.nextBytes(bytes);</pre>
</blockquote>

<p> Callers may also invoke the {@link #generateSeed} method
to generate a given number of seed bytes (to seed other random number
generators, for example):

<blockquote><pre>
byte[] seed = random.generateSeed(20);</pre>
</blockquote>

<p> A newly created PRNG {@code SecureRandom} object is not seeded (except
if it is created by {@link #SecureRandom(byte[])}). The first call to
{@code nextBytes} will force it to seed itself from an implementation-
specific entropy source. This self-seeding will not occur if {@code setSeed}
was previously called.

<p> A {@code SecureRandom} can be reseeded at any time by calling the
{@code reseed} or {@code setSeed} method. The {@code reseed} method
reads entropy input from its entropy source to reseed itself.
The {@code setSeed} method requires the caller to provide the seed.

<p> Please note that {@code reseed} may not be supported by all
{@code SecureRandom} implementations.

<p> Some {@code SecureRandom} implementations may accept a
{@link SecureRandomParameters} parameter in its
{@link #nextBytes(byte[], SecureRandomParameters)} and
{@link #reseed(SecureRandomParameters)} methods to further
control the behavior of the methods.

<p> Note: Depending on the implementation, the {@code generateSeed},
{@code reseed} and {@code nextBytes} methods may block as entropy is being
gathered, for example, if the entropy source is /dev/random on various
Unix-like operating systems.

<h2> Thread safety </h2>
{@code SecureRandom} objects are safe for use by multiple concurrent threads.

@implSpec
A {@code SecureRandom} service provider can advertise that it is thread-safe
by setting the <a href=
"{@docRoot}/../specs/security/standard-names.html#service-attributes">service
provider attribute</a> "ThreadSafe" to "true" when registering the provider.
Otherwise, this class will instead synchronize access to the following
methods of the {@code SecureRandomSpi} implementation:
<ul>
<li>{@link SecureRandomSpi#engineSetSeed(byte[])}
<li>{@link SecureRandomSpi#engineNextBytes(byte[])}
<li>{@link SecureRandomSpi#engineNextBytes(byte[], SecureRandomParameters)}
<li>{@link SecureRandomSpi#engineGenerateSeed(int)}
<li>{@link SecureRandomSpi#engineReseed(SecureRandomParameters)}
</ul>

@spec https://www.rfc-editor.org/info/rfc4086
     RFC 4086: Randomness Requirements for Security
@spec https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.140-2.pdf
     Security Requirements for Cryptographic Modules
@spec security/standard-names.html Java Security Standard Algorithm Names
@see java.security.SecureRandomSpi
@see java.util.Random

@author Benjamin Renaud
@author Josh Bloch
@since 1.1

## SecureRandom.SecureRandom()

```java
public SecureRandom()
```

Constructs a secure random number generator (RNG) implementing the
default random number algorithm.

<p> This constructor traverses the list of registered security Providers,
starting with the most preferred Provider.
A new {@code SecureRandom} object encapsulating the
{@code SecureRandomSpi} implementation from the first provider
that supports a {@code SecureRandom} (RNG) algorithm is returned.
If none of the providers support an RNG algorithm,
then an implementation-specific default is returned.

<p> Note that the list of registered providers may be retrieved via
the {@link Security#getProviders() Security.getProviders()} method.

<p> See the {@code SecureRandom} section in the <a href=
"{@docRoot}/../specs/security/standard-names.html#securerandom-number-generation-algorithms">
Java Security Standard Algorithm Names Specification</a>
for information about standard RNG algorithm names.
@spec security/standard-names.html Java Security Standard Algorithm Names

## SecureRandom.SecureRandom(byte[])

```java
public SecureRandom(byte[] seed)
```

Constructs a secure random number generator (RNG) implementing the
default random number algorithm.
The {@code SecureRandom} instance is seeded with the specified seed bytes.

<p> This constructor traverses the list of registered security Providers,
starting with the most preferred Provider.
A new {@code SecureRandom} object encapsulating the
{@code SecureRandomSpi} implementation from the first provider
that supports a {@code SecureRandom} (RNG) algorithm is returned.
If none of the providers support an RNG algorithm,
then an implementation-specific default is returned.

<p> Note that the list of registered providers may be retrieved via
the {@link Security#getProviders() Security.getProviders()} method.

<p> See the {@code SecureRandom} section in the <a href=
"{@docRoot}/../specs/security/standard-names.html#securerandom-number-generation-algorithms">
Java Security Standard Algorithm Names Specification</a>
for information about standard RNG algorithm names.

@param seed the seed.
@spec security/standard-names.html Java Security Standard Algorithm Names
@throws NullPointerException if {@code seed} is {@code null}

## SecureRandom.SecureRandom(SecureRandomSpi, Provider)

```java
protected SecureRandom(SecureRandomSpi secureRandomSpi, Provider provider)
```

Creates a {@code SecureRandom} object.

@param secureRandomSpi the {@code SecureRandom} implementation.
@param provider the provider.

## SecureRandom.getInstance(String)

```java
public static SecureRandom getInstance(String algorithm) throws NoSuchAlgorithmException
```

Returns a {@code SecureRandom} object that implements the specified
Random Number Generator (RNG) algorithm.

<p> This method traverses the list of registered security Providers,
starting with the most preferred Provider.
A new {@code SecureRandom} object encapsulating the
{@code SecureRandomSpi} implementation from the first
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

@param algorithm the name of the RNG algorithm.
See the {@code SecureRandom} section in the <a href=
"{@docRoot}/../specs/security/standard-names.html#securerandom-number-generation-algorithms">
Java Security Standard Algorithm Names Specification</a>
for information about standard RNG algorithm names.

@spec security/standard-names.html Java Security Standard Algorithm Names
@return the new {@code SecureRandom} object

@throws NoSuchAlgorithmException if no {@code Provider} supports a
        {@code SecureRandomSpi} implementation for the
        specified algorithm

@throws NullPointerException if {@code algorithm} is {@code null}

@see Provider

@since 1.2

## SecureRandom.getInstance(String, String)

```java
public static SecureRandom getInstance(String algorithm, String provider) throws NoSuchAlgorithmException, NoSuchProviderException
```

Returns a {@code SecureRandom} object that implements the specified
Random Number Generator (RNG) algorithm.

<p> A new {@code SecureRandom} object encapsulating the
{@code SecureRandomSpi} implementation from the specified provider
is returned.  The specified provider must be registered
in the security provider list.

<p> Note that the list of registered providers may be retrieved via
the {@link Security#getProviders() Security.getProviders()} method.

@param algorithm the name of the RNG algorithm.
See the {@code SecureRandom} section in the <a href=
"{@docRoot}/../specs/security/standard-names.html#securerandom-number-generation-algorithms">
Java Security Standard Algorithm Names Specification</a>
for information about standard RNG algorithm names.

@param provider the name of the provider.

@spec security/standard-names.html Java Security Standard Algorithm Names
@return the new {@code SecureRandom} object

@throws IllegalArgumentException if the provider name is {@code null}
        or empty

@throws NoSuchAlgorithmException if a {@code SecureRandomSpi}
        implementation for the specified algorithm is not
        available from the specified provider

@throws NoSuchProviderException if the specified provider is not
        registered in the security provider list

@throws NullPointerException if {@code algorithm} is {@code null}

@see Provider

@since 1.2

## SecureRandom.getInstance(String, Provider)

```java
public static SecureRandom getInstance(String algorithm, Provider provider) throws NoSuchAlgorithmException
```

Returns a {@code SecureRandom} object that implements the specified
Random Number Generator (RNG) algorithm.

<p> A new {@code SecureRandom} object encapsulating the
{@code SecureRandomSpi} implementation from the specified provider
is returned.  Note that the specified provider does not
have to be registered in the provider list.

@param algorithm the name of the RNG algorithm.
See the {@code SecureRandom} section in the <a href=
"{@docRoot}/../specs/security/standard-names.html#securerandom-number-generation-algorithms">
Java Security Standard Algorithm Names Specification</a>
for information about standard RNG algorithm names.

@param provider the provider.

@spec security/standard-names.html Java Security Standard Algorithm Names
@return the new {@code SecureRandom} object

@throws IllegalArgumentException if the specified provider is
        {@code null}

@throws NoSuchAlgorithmException if a {@code SecureRandomSpi}
        implementation for the specified algorithm is not available
        from the specified {@code Provider} object

@throws NullPointerException if {@code algorithm} is {@code null}

@see Provider

@since 1.4

## SecureRandom.getInstance(String, SecureRandomParameters)

```java
public static SecureRandom getInstance( String algorithm, SecureRandomParameters params) throws NoSuchAlgorithmException
```

Returns a {@code SecureRandom} object that implements the specified
Random Number Generator (RNG) algorithm and supports the specified
{@code SecureRandomParameters} request.

<p> This method traverses the list of registered security providers,
starting with the most preferred provider.
A new {@code SecureRandom} object encapsulating the
{@code SecureRandomSpi} implementation from the first
provider that supports the specified algorithm and the specified
{@code SecureRandomParameters} is returned.

<p> Note that the list of registered providers may be retrieved via
the {@link Security#getProviders() Security.getProviders()} method.

@implNote
The JDK Reference Implementation additionally uses the
{@code jdk.security.provider.preferred} property to determine
the preferred provider order for the specified algorithm. This
may be different from the order of providers returned by
{@link Security#getProviders() Security.getProviders()}.

@param algorithm the name of the RNG algorithm.
See the {@code SecureRandom} section in the <a href=
"{@docRoot}/../specs/security/standard-names.html#securerandom-number-generation-algorithms">
Java Security Standard Algorithm Names Specification</a>
for information about standard RNG algorithm names.

@param params the {@code SecureRandomParameters}
              the newly created {@code SecureRandom} object must support.

@spec security/standard-names.html Java Security Standard Algorithm Names
@return the new {@code SecureRandom} object

@throws IllegalArgumentException if the specified params is
        {@code null}

@throws NoSuchAlgorithmException if no Provider supports a
        {@code SecureRandomSpi} implementation for the specified
        algorithm and parameters

@throws NullPointerException if {@code algorithm} is {@code null}

@see Provider

@since 9

## SecureRandom.getInstance(String, SecureRandomParameters, String)

```java
public static SecureRandom getInstance(String algorithm, SecureRandomParameters params, String provider) throws NoSuchAlgorithmException, NoSuchProviderException
```

Returns a {@code SecureRandom} object that implements the specified
Random Number Generator (RNG) algorithm and supports the specified
{@code SecureRandomParameters} request.

<p> A new {@code SecureRandom} object encapsulating the
{@code SecureRandomSpi} implementation from the specified provider
is returned.  The specified provider must be registered
in the security provider list.

<p> Note that the list of registered providers may be retrieved via
the {@link Security#getProviders() Security.getProviders()} method.

@param algorithm the name of the RNG algorithm.
See the {@code SecureRandom} section in the <a href=
"{@docRoot}/../specs/security/standard-names.html#securerandom-number-generation-algorithms">
Java Security Standard Algorithm Names Specification</a>
for information about standard RNG algorithm names.

@param params the {@code SecureRandomParameters}
              the newly created {@code SecureRandom} object must support.

@param provider the name of the provider.

@spec security/standard-names.html Java Security Standard Algorithm Names
@return the new {@code SecureRandom} object

@throws IllegalArgumentException if the provider name is {@code null}
        or empty, or params is {@code null}

@throws NoSuchAlgorithmException if the specified provider does not
        support a {@code SecureRandomSpi} implementation for the
        specified algorithm and parameters

@throws NoSuchProviderException if the specified provider is not
        registered in the security provider list

@throws NullPointerException if {@code algorithm} is {@code null}

@see Provider

@since 9

## SecureRandom.getInstance(String, SecureRandomParameters, Provider)

```java
public static SecureRandom getInstance(String algorithm, SecureRandomParameters params, Provider provider) throws NoSuchAlgorithmException
```

Returns a {@code SecureRandom} object that implements the specified
Random Number Generator (RNG) algorithm and supports the specified
{@code SecureRandomParameters} request.

<p> A new {@code SecureRandom} object encapsulating the
{@code SecureRandomSpi} implementation from the specified
provider is returned.  Note that the specified provider
does not have to be registered in the provider list.

@param algorithm the name of the RNG algorithm.
See the {@code SecureRandom} section in the <a href=
"{@docRoot}/../specs/security/standard-names.html#securerandom-number-generation-algorithms">
Java Security Standard Algorithm Names Specification</a>
for information about standard RNG algorithm names.

@param params the {@code SecureRandomParameters}
              the newly created {@code SecureRandom} object must support.

@param provider the provider.

@spec security/standard-names.html Java Security Standard Algorithm Names
@return the new {@code SecureRandom} object

@throws IllegalArgumentException if the specified provider or params
        is {@code null}

@throws NoSuchAlgorithmException if the specified provider does not
        support a {@code SecureRandomSpi} implementation for the
        specified algorithm and parameters

@throws NullPointerException if {@code algorithm} is {@code null}

@see Provider

@since 9

## SecureRandom.getProvider()

```java
public final Provider getProvider()
```

Returns the provider of this {@code SecureRandom} object.

@return the provider of this {@code SecureRandom} object.

## SecureRandom.getAlgorithm()

```java
public String getAlgorithm()
```

Returns the name of the algorithm implemented by this
{@code SecureRandom} object.

@return the name of the algorithm or {@code unknown}
         if the algorithm name cannot be determined.
@since 1.5

## SecureRandom.toString()

```java
public String toString()
```

Returns a Human-readable string representation of this
{@code SecureRandom}.

@return the string representation

## SecureRandom.getParameters()

```java
public SecureRandomParameters getParameters()
```

Returns the effective {@link SecureRandomParameters} for this
{@code SecureRandom} instance.
<p>
The returned value can be different from the
{@code SecureRandomParameters} object passed into a {@code getInstance}
method, but it cannot change during the lifetime of this
{@code SecureRandom} object.
<p>
A caller can use the returned value to find out what features this
{@code SecureRandom} supports.

@return the effective {@link SecureRandomParameters} parameters,
or {@code null} if no parameters were used.

@since 9
@see SecureRandomSpi

## SecureRandom.setSeed(byte[])

```java
public void setSeed(byte[] seed)
```

Reseeds this random object with the given seed. The seed supplements,
rather than replaces, the existing seed. Thus, repeated calls are
guaranteed never to reduce randomness.
<p>
A PRNG {@code SecureRandom} will not seed itself automatically if
{@code setSeed} is called before any {@code nextBytes} or {@code reseed}
calls. The caller should make sure that the {@code seed} argument
contains enough entropy for the security of this {@code SecureRandom}.

@param seed the seed.
@throws NullPointerException if {@code seed} is {@code null}

@see #getSeed

## SecureRandom.setSeed(long)

```java
public void setSeed(long seed)
```

Reseeds this random object, using the eight bytes contained
in the given {@code long seed}. The given seed supplements,
rather than replaces, the existing seed. Thus, repeated calls
are guaranteed never to reduce randomness.
<p>
A PRNG {@code SecureRandom} will not seed itself automatically if
{@code setSeed} is called before any {@code nextBytes} or {@code reseed}
calls. The caller should make sure that the {@code seed} argument
contains enough entropy for the security of this {@code SecureRandom}.

<p>This method is defined for compatibility with
{@code java.util.Random}.

@param seed the seed.

@see #getSeed

## SecureRandom.nextBytes(byte[])

```java
public void nextBytes(byte[] bytes)
```

Generates a user-specified number of random bytes.

@param bytes the array to be filled in with random bytes.
@throws NullPointerException if {@code bytes} is {@code null}

## SecureRandom.nextBytes(byte[], SecureRandomParameters)

```java
public void nextBytes(byte[] bytes, SecureRandomParameters params)
```

Generates a user-specified number of random bytes with
additional parameters.

@param bytes the array to be filled in with random bytes
@param params additional parameters
@throws NullPointerException if {@code bytes} is {@code null}
@throws UnsupportedOperationException if the underlying provider
        implementation has not overridden this method
@throws IllegalArgumentException if {@code params} is {@code null},
        illegal or unsupported by this {@code SecureRandom}

@since 9

## SecureRandom.next(int)

```java
protected final int next(int numBits)
```

Generates an integer containing the user-specified number of
pseudo-random bits (right justified, with leading zeros).  This
method overrides a {@code java.util.Random} method, and serves
to provide a source of random bits to all the methods inherited
from that class (for example, {@code nextInt},
{@code nextLong}, and {@code nextFloat}).

@param numBits number of pseudo-random bits to be generated, where
{@code 0 <= numBits <= 32}.

@return an {@code int} containing the user-specified number
of pseudo-random bits (right justified, with leading zeros).

## SecureRandom.getSeed(int)

```java
public static byte[] getSeed(int numBytes)
```

Returns the given number of seed bytes, computed using the seed
generation algorithm that this class uses to seed itself.  This
call may be used to seed other random number generators.

<p>This method is only included for backwards compatibility.
The caller is encouraged to use one of the alternative
{@code getInstance} methods to obtain a {@code SecureRandom} object, and
then call the {@code generateSeed} method to obtain seed bytes
from that object.

@param numBytes the number of seed bytes to generate.

@throws IllegalArgumentException if {@code numBytes} is negative
@return the seed bytes.

@see #setSeed

## SecureRandom.generateSeed(int)

```java
public byte[] generateSeed(int numBytes)
```

Returns the given number of seed bytes, computed using the seed
generation algorithm that this class uses to seed itself.  This
call may be used to seed other random number generators.

@param numBytes the number of seed bytes to generate.
@throws IllegalArgumentException if {@code numBytes} is negative
@return the seed bytes.

## SecureRandom.getInstanceStrong()

```java
public static SecureRandom getInstanceStrong() throws NoSuchAlgorithmException
```

Returns a {@code SecureRandom} object that was selected by using
the algorithms/providers specified in the {@code
securerandom.strongAlgorithms} {@link Security} property.
<p>
Some situations require strong random values, such as when
creating high-value/long-lived secrets like RSA public/private
keys.  To help guide applications in selecting a suitable strong
{@code SecureRandom} implementation, Java distributions
include a list of known strong {@code SecureRandom}
implementations in the {@code securerandom.strongAlgorithms}
Security property.
<p>
Every implementation of the Java platform is required to
support at least one strong {@code SecureRandom} implementation.

@return a strong {@code SecureRandom} implementation as indicated
by the {@code securerandom.strongAlgorithms} Security property

@throws NoSuchAlgorithmException if no algorithm is available

@see Security#getProperty(String)

@since 1.8

## SecureRandom.reseed()

```java
public void reseed()
```

Reseeds this {@code SecureRandom} with entropy input read from its
entropy source.

@throws UnsupportedOperationException if the underlying provider
        implementation has not overridden this method.

@since 9

## SecureRandom.reseed(SecureRandomParameters)

```java
public void reseed(SecureRandomParameters params)
```

Reseeds this {@code SecureRandom} with entropy input read from its
entropy source with additional parameters.
<p>
Note that entropy is obtained from an entropy source. While
some data in {@code params} may contain entropy, its main usage is to
provide diversity.

@param params extra parameters
@throws UnsupportedOperationException if the underlying provider
        implementation has not overridden this method.
@throws IllegalArgumentException if {@code params} is {@code null},
        illegal or unsupported by this {@code SecureRandom}

@since 9