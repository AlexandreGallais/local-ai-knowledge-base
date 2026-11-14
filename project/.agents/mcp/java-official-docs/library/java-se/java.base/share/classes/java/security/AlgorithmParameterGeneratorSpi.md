---
title: "AlgorithmParameterGeneratorSpi class (java.security)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/AlgorithmParameterGeneratorSpi.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# AlgorithmParameterGeneratorSpi class (java.security)

```java
public abstract class AlgorithmParameterGeneratorSpi
```

This class defines the *Service Provider Interface* (**SPI**)
for the `AlgorithmParameterGenerator` class, which
is used to generate a set of parameters to be used with a certain algorithm.

 All the abstract methods in this class must be implemented by each
cryptographic service provider who wishes to supply the implementation
of a parameter generator for a particular algorithm.

 In case the client does not explicitly initialize the
AlgorithmParameterGenerator (via a call to an `engineInit`
method), each provider must supply (and document) a default initialization.
See the Keysize Restriction sections of the

document for information on the AlgorithmParameterGenerator defaults
used by JDK providers.
However, note that defaults may vary across different providers.
Additionally, the default value for a provider may change in a future
version. Therefore, it is recommended to explicitly initialize the
`AlgorithmParameterGenerator` instead of relying on
provider-specific defaults.

**See also:** AlgorithmParameterGenerator

**See also:** AlgorithmParameters

**See also:** java.security.spec.AlgorithmParameterSpec

**Since:** 1.2

## AlgorithmParameterGeneratorSpi.AlgorithmParameterGeneratorSpi()

```java
public AlgorithmParameterGeneratorSpi()
```

Constructor for subclasses to call.

## AlgorithmParameterGeneratorSpi.engineInit(int, SecureRandom)

```java
protected abstract void engineInit(int size, SecureRandom random)
```

Initializes this parameter generator for a certain size
and source of randomness.

Parameters:

- `size`: the size (number of bits).
- `random`: the source of randomness.

## AlgorithmParameterGeneratorSpi.engineInit(AlgorithmParameterSpec, SecureRandom)

```java
protected abstract void engineInit(AlgorithmParameterSpec genParamSpec, SecureRandom random) throws InvalidAlgorithmParameterException
```

Initializes this parameter generator with a set of
algorithm-specific parameter generation values.

Parameters:

- `genParamSpec`: the set of algorithm-specific parameter generation values.
- `random`: the source of randomness.

Throws:

- `InvalidAlgorithmParameterException`: if the given parameter generation values are inappropriate for this parameter generator.

## AlgorithmParameterGeneratorSpi.engineGenerateParameters()

```java
protected abstract AlgorithmParameters engineGenerateParameters()
```

Generates the parameters.

**Returns:** the new `AlgorithmParameters` object.
