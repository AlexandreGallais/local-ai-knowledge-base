---
title: "AlgorithmParameterGenerator class (java.security)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/AlgorithmParameterGenerator.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# AlgorithmParameterGenerator class (java.security)

```java
public class AlgorithmParameterGenerator
```

The `AlgorithmParameterGenerator` class is used to generate a
set of
parameters to be used with a certain algorithm. Parameter generators
are constructed using the `getInstance` factory methods
(static methods that return instances of a given class).

The object that will generate the parameters can be initialized
in two different ways: in an algorithm-independent manner, or in an
algorithm-specific manner:

- The algorithm-independent approach uses the fact that all parameter
generators share the concept of a "size" and a
source of randomness. The measure of size is universally shared
by all algorithm parameters, though it is interpreted differently
for different algorithms. For example, in the case of parameters for
the *DSA* algorithm, "size" corresponds to the size
of the prime modulus (in bits).
When using this approach, algorithm-specific parameter generation
values - if any - default to some standard values, unless they can be
derived from the specified size.

- The other approach initializes a parameter generator object
using algorithm-specific semantics, which are represented by a set of
algorithm-specific parameter generation values. To generate
Diffie-Hellman system parameters, for example, the parameter generation
values usually
consist of the size of the prime modulus and the size of the
random exponent, both specified in number of bits.

In case the client does not explicitly initialize the
`AlgorithmParameterGenerator` (via a call to an `init` method),
each provider must supply (and document) a default initialization.
See the Keysize Restriction sections of the

document for information on the AlgorithmParameterGenerator defaults
used by JDK providers.
However, note that defaults may vary across different providers.
Additionally, the default value for a provider may change in a future
version. Therefore, it is recommended to explicitly initialize the
`AlgorithmParameterGenerator` instead of relying on provider-specific
defaults.

 Every implementation of the Java platform is required to support the
following standard `AlgorithmParameterGenerator` algorithms and
keysizes in parentheses:

- `DiffieHellman` (1024, 2048)

- `DSA` (1024, 2048)

These algorithms are described in the
AlgorithmParameterGenerator section of the
Java Security Standard Algorithm Names Specification.
Consult the release documentation for your implementation to see if any
other algorithms are supported.

**See also:** AlgorithmParameters

**See also:** java.security.spec.AlgorithmParameterSpec

**Since:** 1.2

## AlgorithmParameterGenerator.AlgorithmParameterGenerator(AlgorithmParameterGeneratorSpi, Provider, String)

```java
protected AlgorithmParameterGenerator (AlgorithmParameterGeneratorSpi paramGenSpi, Provider provider, String algorithm)
```

Creates an `AlgorithmParameterGenerator` object.

Parameters:

- `paramGenSpi`: the delegate
- `provider`: the provider
- `algorithm`: the algorithm

## AlgorithmParameterGenerator.getAlgorithm()

```java
public final String getAlgorithm()
```

Returns the standard name of the algorithm this parameter
generator is associated with.

**Returns:** the string name of the algorithm.

## AlgorithmParameterGenerator.getInstance(String)

```java
public static AlgorithmParameterGenerator getInstance(String algorithm) throws NoSuchAlgorithmException
```

Returns an `AlgorithmParameterGenerator` object for generating
a set of parameters to be used with the specified algorithm.

 This method traverses the list of registered security providers,
starting with the most preferred provider.
A new `AlgorithmParameterGenerator` object encapsulating the
`AlgorithmParameterGeneratorSpi` implementation from the first
provider that supports the specified algorithm is returned.

 Note that the list of registered providers may be retrieved via
the Security.getProviders() method.

Parameters:

- `algorithm`: the name of the algorithm this parameter generator is associated with. See the AlgorithmParameterGenerator section in the  Java Security Standard Algorithm Names Specification for information about standard algorithm names.

**Implementation note:** The JDK Reference Implementation additionally uses the
`jdk.security.provider.preferred`
Security property to determine
the preferred provider order for the specified algorithm. This
may be different from the order of providers returned by
Security.getProviders().

**Returns:** the new `AlgorithmParameterGenerator` object

**See also:** Provider

Throws:

- `NoSuchAlgorithmException`: if no `Provider` supports an `AlgorithmParameterGeneratorSpi` implementation for the specified algorithm
- `NullPointerException`: if `algorithm` is `null`

## AlgorithmParameterGenerator.getInstance(String, String)

```java
public static AlgorithmParameterGenerator getInstance(String algorithm, String provider) throws NoSuchAlgorithmException, NoSuchProviderException
```

Returns an `AlgorithmParameterGenerator` object for generating
a set of parameters to be used with the specified algorithm.

 A new `AlgorithmParameterGenerator` object encapsulating the
`AlgorithmParameterGeneratorSpi` implementation from the
specified provider is returned.  The specified provider must be
registered in the security provider list.

 Note that the list of registered providers may be retrieved via
the Security.getProviders() method.

Parameters:

- `algorithm`: the name of the algorithm this parameter generator is associated with. See the AlgorithmParameterGenerator section in the  Java Security Standard Algorithm Names Specification for information about standard algorithm names.
- `provider`: the string name of the `Provider`.

**Returns:** the new `AlgorithmParameterGenerator` object

**See also:** Provider

Throws:

- `IllegalArgumentException`: if the provider name is `null` or empty
- `NoSuchAlgorithmException`: if an `AlgorithmParameterGeneratorSpi` implementation for the specified algorithm is not available from the specified provider
- `NoSuchProviderException`: if the specified provider is not registered in the security provider list
- `NullPointerException`: if `algorithm` is `null`

## AlgorithmParameterGenerator.getInstance(String, Provider)

```java
public static AlgorithmParameterGenerator getInstance(String algorithm, Provider provider) throws NoSuchAlgorithmException
```

Returns an `AlgorithmParameterGenerator` object for generating
a set of parameters to be used with the specified algorithm.

 A new `AlgorithmParameterGenerator` object encapsulating the
`AlgorithmParameterGeneratorSpi` implementation from the specified
provider is returned.  Note that the specified provider does not
have to be registered in the provider list.

Parameters:

- `algorithm`: the string name of the algorithm this parameter generator is associated with. See the AlgorithmParameterGenerator section in the  Java Security Standard Algorithm Names Specification for information about standard algorithm names.
- `provider`: the `Provider` object.

**Returns:** the new `AlgorithmParameterGenerator` object

**See also:** Provider

**Since:** 1.4

Throws:

- `IllegalArgumentException`: if the specified provider is `null`
- `NoSuchAlgorithmException`: if an `AlgorithmParameterGeneratorSpi` implementation for the specified algorithm is not available from the specified `Provider` object
- `NullPointerException`: if `algorithm` is `null`

## AlgorithmParameterGenerator.getProvider()

```java
public final Provider getProvider()
```

Returns the provider of this algorithm parameter generator object.

**Returns:** the provider of this algorithm parameter generator object

## AlgorithmParameterGenerator.init(int)

```java
public final void init(int size)
```

Initializes this parameter generator for a certain size.
To create the parameters, the `SecureRandom`
implementation of the highest-priority installed provider is used as
the source of randomness.
(If none of the installed providers supply an implementation of
`SecureRandom`, a system-provided source of randomness is
used.)

Parameters:

- `size`: the size (number of bits).

## AlgorithmParameterGenerator.init(int, SecureRandom)

```java
public final void init(int size, SecureRandom random)
```

Initializes this parameter generator for a certain size and source
of randomness.

Parameters:

- `size`: the size (number of bits).
- `random`: the source of randomness.

## AlgorithmParameterGenerator.init(AlgorithmParameterSpec)

```java
public final void init(AlgorithmParameterSpec genParamSpec) throws InvalidAlgorithmParameterException
```

Initializes this parameter generator with a set of algorithm-specific
parameter generation values.
To generate the parameters, the `SecureRandom`
implementation of the highest-priority installed provider is used as
the source of randomness.
(If none of the installed providers supply an implementation of
`SecureRandom`, a system-provided source of randomness is
used.)

Parameters:

- `genParamSpec`: the set of algorithm-specific parameter generation values.

Throws:

- `InvalidAlgorithmParameterException`: if the given parameter generation values are inappropriate for this parameter generator.

## AlgorithmParameterGenerator.init(AlgorithmParameterSpec, SecureRandom)

```java
public final void init(AlgorithmParameterSpec genParamSpec, SecureRandom random) throws InvalidAlgorithmParameterException
```

Initializes this parameter generator with a set of algorithm-specific
parameter generation values.

Parameters:

- `genParamSpec`: the set of algorithm-specific parameter generation values.
- `random`: the source of randomness.

Throws:

- `InvalidAlgorithmParameterException`: if the given parameter generation values are inappropriate for this parameter generator.

## AlgorithmParameterGenerator.generateParameters()

```java
public final AlgorithmParameters generateParameters()
```

Generates the parameters.

**Returns:** the new `AlgorithmParameters` object.
