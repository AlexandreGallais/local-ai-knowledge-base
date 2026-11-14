---
title: "SecureRandom class (java.security) (part 1 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/SecureRandom.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# SecureRandom class (java.security)

```java
public class SecureRandom extends java.util.Random
```

This class provides a cryptographically strong random number
generator (RNG).

A cryptographically strong random number minimally complies with the
statistical random number generator tests specified in

*FIPS 140-2, Security Requirements for Cryptographic Modules*,
section 4.9.1.
Additionally, `SecureRandom` must produce non-deterministic output.
Therefore, any seed material passed to a `SecureRandom` object must be
unpredictable, and all `SecureRandom` output sequences must be
cryptographically strong, as described in

*RFC 4086: Randomness Requirements for Security*.

 Many `SecureRandom` implementations are in the form of a
pseudo-random number generator (PRNG, also known as deterministic random
bits generator or DRBG), which means they use a deterministic algorithm
to produce a pseudo-random sequence from a random seed.
Other implementations may produce true random numbers,
and yet others may use a combination of both techniques.

A caller obtains a `SecureRandom` instance via the
no-argument constructor or one of the `getInstance` methods.
For example:

```java
SecureRandom r1 = new SecureRandom();
SecureRandom r2 = SecureRandom.getInstance("NativePRNG");
SecureRandom r3 = SecureRandom.getInstance("DRBG",
        DrbgParameters.instantiation(128, RESEED_ONLY, null));
```

 The third statement above returns a `SecureRandom` object of the
specific algorithm supporting the specific instantiate parameters. The
implementation's effective instantiated parameters must match this minimum
request but is not necessarily the same. For example, even if the request
does not require a certain feature, the actual instantiation can provide
the feature. An implementation may lazily instantiate a `SecureRandom`
until it's actually used, but the effective instantiate parameters must be
determined right after it's created and `getParameters()` should
always return the same result unchanged.

 Typical callers of `SecureRandom` invoke the following methods
to retrieve random bytes:

```java
SecureRandom random = new SecureRandom();
byte[] bytes = new byte[20];
random.nextBytes(bytes);
```

 Callers may also invoke the `generateSeed` method
to generate a given number of seed bytes (to seed other random number
generators, for example):

```java
byte[] seed = random.generateSeed(20);
```

 A newly created PRNG `SecureRandom` object is not seeded (except
if it is created by `SecureRandom(byte[])`). The first call to
`nextBytes` will force it to seed itself from an implementation-
specific entropy source. This self-seeding will not occur if `setSeed`
was previously called.

 A `SecureRandom` can be reseeded at any time by calling the
`reseed` or `setSeed` method. The `reseed` method
reads entropy input from its entropy source to reseed itself.
The `setSeed` method requires the caller to provide the seed.

 Please note that `reseed` may not be supported by all
`SecureRandom` implementations.

 Some `SecureRandom` implementations may accept a
`SecureRandomParameters` parameter in its
SecureRandomParameters) and
`reseed(SecureRandomParameters)` methods to further
control the behavior of the methods.

 Note: Depending on the implementation, the `generateSeed`,
`reseed` and `nextBytes` methods may block as entropy is being
gathered, for example, if the entropy source is /dev/random on various
Unix-like operating systems.

####  Thread safety

`SecureRandom` objects are safe for use by multiple concurrent threads.

**Implementation requirements:** A `SecureRandom` service provider can advertise that it is thread-safe
by setting the service
provider attribute "ThreadSafe" to "true" when registering the provider.
Otherwise, this class will instead synchronize access to the following
methods of the `SecureRandomSpi` implementation:

- `SecureRandomSpi.engineSetSeed(byte[])`

- `SecureRandomSpi.engineNextBytes(byte[])`

- SecureRandomParameters)

- `SecureRandomSpi.engineGenerateSeed(int)`

- `SecureRandomSpi.engineReseed(SecureRandomParameters)`

**See also:** java.security.SecureRandomSpi

**See also:** java.util.Random

**Since:** 1.1

## SecureRandom.SecureRandom()

```java
public SecureRandom()
```

Constructs a secure random number generator (RNG) implementing the
default random number algorithm.

 This constructor traverses the list of registered security Providers,
starting with the most preferred Provider.
A new `SecureRandom` object encapsulating the
`SecureRandomSpi` implementation from the first provider
that supports a `SecureRandom` (RNG) algorithm is returned.
If none of the providers support an RNG algorithm,
then an implementation-specific default is returned.

 Note that the list of registered providers may be retrieved via
the Security.getProviders() method.

 See the `SecureRandom` section in the
Java Security Standard Algorithm Names Specification
for information about standard RNG algorithm names.

## SecureRandom.SecureRandom(byte[])

```java
public SecureRandom(byte[] seed)
```

Constructs a secure random number generator (RNG) implementing the
default random number algorithm.
The `SecureRandom` instance is seeded with the specified seed bytes.

 This constructor traverses the list of registered security Providers,
starting with the most preferred Provider.
A new `SecureRandom` object encapsulating the
`SecureRandomSpi` implementation from the first provider
that supports a `SecureRandom` (RNG) algorithm is returned.
If none of the providers support an RNG algorithm,
then an implementation-specific default is returned.

 Note that the list of registered providers may be retrieved via
the Security.getProviders() method.

 See the `SecureRandom` section in the
Java Security Standard Algorithm Names Specification
for information about standard RNG algorithm names.

Parameters:

- `seed`: the seed.

Throws:

- `NullPointerException`: if `seed` is `null`

## SecureRandom.SecureRandom(SecureRandomSpi, Provider)

```java
protected SecureRandom(SecureRandomSpi secureRandomSpi, Provider provider)
```

Creates a `SecureRandom` object.

Parameters:

- `secureRandomSpi`: the `SecureRandom` implementation.
- `provider`: the provider.

## SecureRandom.getInstance(String)

```java
public static SecureRandom getInstance(String algorithm) throws NoSuchAlgorithmException
```

Returns a `SecureRandom` object that implements the specified
Random Number Generator (RNG) algorithm.

 This method traverses the list of registered security Providers,
starting with the most preferred Provider.
A new `SecureRandom` object encapsulating the
`SecureRandomSpi` implementation from the first
provider that supports the specified algorithm is returned.

 Note that the list of registered providers may be retrieved via
the Security.getProviders() method.

Parameters:

- `algorithm`: the name of the RNG algorithm. See the `SecureRandom` section in the  Java Security Standard Algorithm Names Specification for information about standard RNG algorithm names.

**Implementation note:** The JDK Reference Implementation additionally uses the
`jdk.security.provider.preferred`
Security property to determine
the preferred provider order for the specified algorithm. This
may be different from the order of providers returned by
Security.getProviders().

**Returns:** the new `SecureRandom` object

**See also:** Provider

**Since:** 1.2

Throws:

- `NoSuchAlgorithmException`: if no `Provider` supports a `SecureRandomSpi` implementation for the specified algorithm
- `NullPointerException`: if `algorithm` is `null`

## SecureRandom.getInstance(String, String)

```java
public static SecureRandom getInstance(String algorithm, String provider) throws NoSuchAlgorithmException, NoSuchProviderException
```

Returns a `SecureRandom` object that implements the specified
Random Number Generator (RNG) algorithm.

 A new `SecureRandom` object encapsulating the
`SecureRandomSpi` implementation from the specified provider
is returned.  The specified provider must be registered
in the security provider list.

 Note that the list of registered providers may be retrieved via
the Security.getProviders() method.

Parameters:

- `algorithm`: the name of the RNG algorithm. See the `SecureRandom` section in the  Java Security Standard Algorithm Names Specification for information about standard RNG algorithm names.
- `provider`: the name of the provider.

**Returns:** the new `SecureRandom` object

**See also:** Provider

**Since:** 1.2

Throws:

- `IllegalArgumentException`: if the provider name is `null` or empty
- `NoSuchAlgorithmException`: if a `SecureRandomSpi` implementation for the specified algorithm is not available from the specified provider
- `NoSuchProviderException`: if the specified provider is not registered in the security provider list
- `NullPointerException`: if `algorithm` is `null`

## SecureRandom.getInstance(String, Provider)

```java
public static SecureRandom getInstance(String algorithm, Provider provider) throws NoSuchAlgorithmException
```

Returns a `SecureRandom` object that implements the specified
Random Number Generator (RNG) algorithm.

 A new `SecureRandom` object encapsulating the
`SecureRandomSpi` implementation from the specified provider
is returned.  Note that the specified provider does not
have to be registered in the provider list.

Parameters:

- `algorithm`: the name of the RNG algorithm. See the `SecureRandom` section in the  Java Security Standard Algorithm Names Specification for information about standard RNG algorithm names.
- `provider`: the provider.

**Returns:** the new `SecureRandom` object

**See also:** Provider

**Since:** 1.4

Throws:

- `IllegalArgumentException`: if the specified provider is `null`
- `NoSuchAlgorithmException`: if a `SecureRandomSpi` implementation for the specified algorithm is not available from the specified `Provider` object
- `NullPointerException`: if `algorithm` is `null`

## SecureRandom.getInstance(String, SecureRandomParameters)

```java
public static SecureRandom getInstance( String algorithm, SecureRandomParameters params) throws NoSuchAlgorithmException
```

Returns a `SecureRandom` object that implements the specified
Random Number Generator (RNG) algorithm and supports the specified
`SecureRandomParameters` request.

 This method traverses the list of registered security providers,
starting with the most preferred provider.
A new `SecureRandom` object encapsulating the
`SecureRandomSpi` implementation from the first
provider that supports the specified algorithm and the specified
`SecureRandomParameters` is returned.

 Note that the list of registered providers may be retrieved via
the Security.getProviders() method.

Parameters:

- `algorithm`: the name of the RNG algorithm. See the `SecureRandom` section in the  Java Security Standard Algorithm Names Specification for information about standard RNG algorithm names.
- `params`: the `SecureRandomParameters` the newly created `SecureRandom` object must support.

**Implementation note:** The JDK Reference Implementation additionally uses the
`jdk.security.provider.preferred` property to determine
the preferred provider order for the specified algorithm. This
may be different from the order of providers returned by
Security.getProviders().

**Returns:** the new `SecureRandom` object

**See also:** Provider

**Since:** 9

Throws:

- `IllegalArgumentException`: if the specified params is `null`
- `NoSuchAlgorithmException`: if no Provider supports a `SecureRandomSpi` implementation for the specified algorithm and parameters
- `NullPointerException`: if `algorithm` is `null`

## SecureRandom.getInstance(String, SecureRandomParameters, String)

```java
public static SecureRandom getInstance(String algorithm, SecureRandomParameters params, String provider) throws NoSuchAlgorithmException, NoSuchProviderException
```

Returns a `SecureRandom` object that implements the specified
Random Number Generator (RNG) algorithm and supports the specified
`SecureRandomParameters` request.

 A new `SecureRandom` object encapsulating the
`SecureRandomSpi` implementation from the specified provider
is returned.  The specified provider must be registered
in the security provider list.

 Note that the list of registered providers may be retrieved via
the Security.getProviders() method.

Parameters:

- `algorithm`: the name of the RNG algorithm. See the `SecureRandom` section in the  Java Security Standard Algorithm Names Specification for information about standard RNG algorithm names.
- `params`: the `SecureRandomParameters` the newly created `SecureRandom` object must support.
- `provider`: the name of the provider.

**Returns:** the new `SecureRandom` object

**See also:** Provider

**Since:** 9

Throws:

- `IllegalArgumentException`: if the provider name is `null` or empty, or params is `null`
- `NoSuchAlgorithmException`: if the specified provider does not support a `SecureRandomSpi` implementation for the specified algorithm and parameters
- `NoSuchProviderException`: if the specified provider is not registered in the security provider list
- `NullPointerException`: if `algorithm` is `null`

## SecureRandom.getInstance(String, SecureRandomParameters, Provider)

```java
public static SecureRandom getInstance(String algorithm, SecureRandomParameters params, Provider provider) throws NoSuchAlgorithmException
```

Returns a `SecureRandom` object that implements the specified
Random Number Generator (RNG) algorithm and supports the specified
`SecureRandomParameters` request.

 A new `SecureRandom` object encapsulating the
`SecureRandomSpi` implementation from the specified
provider is returned.  Note that the specified provider
does not have to be registered in the provider list.

Parameters:

- `algorithm`: the name of the RNG algorithm. See the `SecureRandom` section in the  Java Security Standard Algorithm Names Specification for information about standard RNG algorithm names.
- `params`: the `SecureRandomParameters` the newly created `SecureRandom` object must support.
- `provider`: the provider.

**Returns:** the new `SecureRandom` object

**See also:** Provider

**Since:** 9

Throws:

- `IllegalArgumentException`: if the specified provider or params is `null`
- `NoSuchAlgorithmException`: if the specified provider does not support a `SecureRandomSpi` implementation for the specified algorithm and parameters
- `NullPointerException`: if `algorithm` is `null`

## SecureRandom.getProvider()

```java
public final Provider getProvider()
```

Returns the provider of this `SecureRandom` object.

**Returns:** the provider of this `SecureRandom` object.

## SecureRandom.getAlgorithm()

```java
public String getAlgorithm()
```

Returns the name of the algorithm implemented by this
`SecureRandom` object.

**Returns:** the name of the algorithm or `unknown`
         if the algorithm name cannot be determined.

**Since:** 1.5
