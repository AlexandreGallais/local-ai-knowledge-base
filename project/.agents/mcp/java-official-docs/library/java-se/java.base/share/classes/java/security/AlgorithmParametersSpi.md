---
title: "AlgorithmParametersSpi class (java.security)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/AlgorithmParametersSpi.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# AlgorithmParametersSpi class (java.security)

```java
public abstract class AlgorithmParametersSpi
```

This class defines the *Service Provider Interface* (**SPI**)
for the `AlgorithmParameters` class, which is used to manage
algorithm parameters.

 All the abstract methods in this class must be implemented by each
cryptographic service provider who wishes to supply parameter management
for a particular algorithm.

**See also:** AlgorithmParameters

**See also:** java.security.spec.AlgorithmParameterSpec

**See also:** java.security.spec.DSAParameterSpec

**Since:** 1.2

## AlgorithmParametersSpi.AlgorithmParametersSpi()

```java
public AlgorithmParametersSpi()
```

Constructor for subclasses to call.

## AlgorithmParametersSpi.engineInit(AlgorithmParameterSpec)

```java
protected abstract void engineInit(AlgorithmParameterSpec paramSpec) throws InvalidParameterSpecException
```

Initializes this parameters object using the parameters
specified in `paramSpec`.

Parameters:

- `paramSpec`: the parameter specification.

Throws:

- `InvalidParameterSpecException`: if the given parameter specification is inappropriate for the initialization of this parameter object.

## AlgorithmParametersSpi.engineInit(byte[])

```java
protected abstract void engineInit(byte[] params) throws IOException
```

Imports the specified parameters and decodes them
according to the primary decoding format for parameters.
The primary decoding format for parameters is ASN.1, if an ASN.1
specification for this type of parameters exists.

Parameters:

- `params`: the encoded parameters.

Throws:

- `IOException`: on decoding errors

## AlgorithmParametersSpi.engineInit(byte[], String)

```java
protected abstract void engineInit(byte[] params, String format) throws IOException
```

Imports the parameters from `params` and
decodes them according to the specified decoding format.
If `format` is `null`, the
primary decoding format for parameters is used. The primary decoding
format is ASN.1, if an ASN.1 specification for these parameters
exists.

Parameters:

- `params`: the encoded parameters.
- `format`: the name of the decoding format.

Throws:

- `IOException`: on decoding errors

## AlgorithmParametersSpi.engineGetParameterSpec(Class<T>)

```java
protected abstract <T extends AlgorithmParameterSpec> T engineGetParameterSpec(Class<T> paramSpec) throws InvalidParameterSpecException
```

Returns a (transparent) specification of this parameters
object.
`paramSpec` identifies the specification class in which
the parameters should be returned. It could, for example, be
`DSAParameterSpec.class`, to indicate that the
parameters should be returned in an instance of the
`DSAParameterSpec` class.

Parameters:

- `<T>`: the type of the parameter specification to be returned
- `paramSpec`: the specification class in which the parameters should be returned.

**Returns:** the parameter specification.

Throws:

- `InvalidParameterSpecException`: if the requested parameter specification is inappropriate for this parameter object.

## AlgorithmParametersSpi.engineGetEncoded()

```java
protected abstract byte[] engineGetEncoded() throws IOException
```

Returns the parameters in their primary encoding format.
The primary encoding format for parameters is ASN.1, if an ASN.1
specification for this type of parameters exists.

**Returns:** the parameters encoded using their primary encoding format.

Throws:

- `IOException`: on encoding errors.

## AlgorithmParametersSpi.engineGetEncoded(String)

```java
protected abstract byte[] engineGetEncoded(String format) throws IOException
```

Returns the parameters encoded in the specified format.
If `format` is `null`, the
primary encoding format for parameters is used. The primary encoding
format is ASN.1, if an ASN.1 specification for these parameters
exists.

Parameters:

- `format`: the name of the encoding format.

**Returns:** the parameters encoded using the specified encoding scheme.

Throws:

- `IOException`: on encoding errors.

## AlgorithmParametersSpi.engineToString()

```java
protected abstract String engineToString()
```

Returns a formatted string describing the parameters.

**Returns:** a formatted string describing the parameters.
