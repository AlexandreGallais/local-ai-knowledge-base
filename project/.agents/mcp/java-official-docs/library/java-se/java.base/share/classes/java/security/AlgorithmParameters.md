---
title: "AlgorithmParameters class (java.security)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/AlgorithmParameters.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# AlgorithmParameters class (java.security)

```java
public class AlgorithmParameters
```

This class is used as an opaque representation of cryptographic parameters.

An `AlgorithmParameters` object for managing the parameters
for a particular algorithm can be obtained by
calling one of the `getInstance` factory methods
(static methods that return instances of a given class).

Once an `AlgorithmParameters` object is obtained, it must be
initialized via a call to `init`, using an appropriate parameter
specification or parameter encoding.

A transparent parameter specification is obtained from an
`AlgorithmParameters` object via a call to
`getParameterSpec`, and a byte encoding of the parameters is
obtained via a call to `getEncoded`.

 Every implementation of the Java platform is required to support the
following standard `AlgorithmParameters` algorithms. For the "EC"
algorithm, implementations must support the curves in parentheses. For the
"RSASSA-PSS" algorithm, implementations must support the parameters in
parentheses.

- `AES`

- `ChaCha20-Poly1305`

- `DESede`

- `DiffieHellman`

- `DSA`

- `EC` (secp256r1, secp384r1)

- `RSASSA-PSS` (MGF1 mask generation function and SHA-256 or SHA-384
    hash algorithms)

These algorithms are described in the
AlgorithmParameters section of the
Java Security Standard Algorithm Names Specification.
Consult the release documentation for your implementation to see if any
other algorithms are supported.

**See also:** java.security.spec.AlgorithmParameterSpec

**See also:** java.security.spec.DSAParameterSpec

**See also:** KeyPairGenerator

**Since:** 1.2

## AlgorithmParameters.AlgorithmParameters(AlgorithmParametersSpi, Provider, String)

```java
protected AlgorithmParameters(AlgorithmParametersSpi paramSpi, Provider provider, String algorithm)
```

Creates an `AlgorithmParameters` object.

Parameters:

- `paramSpi`: the delegate
- `provider`: the provider
- `algorithm`: the algorithm

## AlgorithmParameters.getAlgorithm()

```java
public final String getAlgorithm()
```

Returns the name of the algorithm associated with this parameter object.

**Returns:** the algorithm name.

## AlgorithmParameters.getInstance(String)

```java
public static AlgorithmParameters getInstance(String algorithm) throws NoSuchAlgorithmException
```

Returns a parameter object for the specified algorithm.

 This method traverses the list of registered security providers,
starting with the most preferred provider.
A new `AlgorithmParameters` object encapsulating the
`AlgorithmParametersSpi` implementation from the first
provider that supports the specified algorithm is returned.

 Note that the list of registered providers may be retrieved via
the Security.getProviders() method.

 The returned parameter object must be initialized via a call to
`init`, using an appropriate parameter specification or
parameter encoding.

Parameters:

- `algorithm`: the name of the algorithm requested. See the AlgorithmParameters section in the  Java Security Standard Algorithm Names Specification for information about standard algorithm names.

**Implementation note:** The JDK Reference Implementation additionally uses the
`jdk.security.provider.preferred`
Security property to determine
the preferred provider order for the specified algorithm. This
may be different from the order of providers returned by
Security.getProviders().

**Returns:** the new parameter object

**See also:** Provider

Throws:

- `NoSuchAlgorithmException`: if no `Provider` supports an `AlgorithmParametersSpi` implementation for the specified algorithm
- `NullPointerException`: if `algorithm` is `null`

## AlgorithmParameters.getInstance(String, String)

```java
public static AlgorithmParameters getInstance(String algorithm, String provider) throws NoSuchAlgorithmException, NoSuchProviderException
```

Returns a parameter object for the specified algorithm.

 A new `AlgorithmParameters` object encapsulating the
`AlgorithmParametersSpi` implementation from the specified provider
is returned.  The specified provider must be registered
in the security provider list.

 Note that the list of registered providers may be retrieved via
the Security.getProviders() method.

The returned parameter object must be initialized via a call to
`init`, using an appropriate parameter specification or
parameter encoding.

Parameters:

- `algorithm`: the name of the algorithm requested. See the AlgorithmParameters section in the  Java Security Standard Algorithm Names Specification for information about standard algorithm names.
- `provider`: the name of the provider.

**Returns:** the new parameter object

**See also:** Provider

Throws:

- `IllegalArgumentException`: if the provider name is `null` or empty
- `NoSuchAlgorithmException`: if an `AlgorithmParametersSpi` implementation for the specified algorithm is not available from the specified provider
- `NoSuchProviderException`: if the specified provider is not registered in the security provider list
- `NullPointerException`: if `algorithm` is `null`

## AlgorithmParameters.getInstance(String, Provider)

```java
public static AlgorithmParameters getInstance(String algorithm, Provider provider) throws NoSuchAlgorithmException
```

Returns a parameter object for the specified algorithm.

 A new `AlgorithmParameters` object encapsulating the
`AlgorithmParametersSpi` implementation from the specified
provider is returned.  Note that the specified provider
does not have to be registered in the provider list.

The returned parameter object must be initialized via a call to
`init`, using an appropriate parameter specification or
parameter encoding.

Parameters:

- `algorithm`: the name of the algorithm requested. See the AlgorithmParameters section in the  Java Security Standard Algorithm Names Specification for information about standard algorithm names.
- `provider`: the name of the provider.

**Returns:** the new parameter object

**See also:** Provider

**Since:** 1.4

Throws:

- `IllegalArgumentException`: if the provider is `null`
- `NoSuchAlgorithmException`: if an `AlgorithmParameterGeneratorSpi` implementation for the specified algorithm is not available from the specified `Provider` object
- `NullPointerException`: if `algorithm` is `null`

## AlgorithmParameters.getProvider()

```java
public final Provider getProvider()
```

Returns the provider of this parameter object.

**Returns:** the provider of this parameter object

## AlgorithmParameters.init(AlgorithmParameterSpec)

```java
public final void init(AlgorithmParameterSpec paramSpec) throws InvalidParameterSpecException
```

Initializes this parameter object using the parameters
specified in `paramSpec`.

Parameters:

- `paramSpec`: the parameter specification.

Throws:

- `InvalidParameterSpecException`: if the given parameter specification is inappropriate for the initialization of this parameter object, or if this parameter object has already been initialized.

## AlgorithmParameters.init(byte[])

```java
public final void init(byte[] params) throws IOException
```

Imports the specified parameters and decodes them according to the
primary decoding format for parameters. The primary decoding
format for parameters is ASN.1, if an ASN.1 specification for this type
of parameters exists.

Parameters:

- `params`: the encoded parameters.

Throws:

- `IOException`: on decoding errors, or if this parameter object has already been initialized.

## AlgorithmParameters.init(byte[], String)

```java
public final void init(byte[] params, String format) throws IOException
```

Imports the parameters from `params` and decodes them
according to the specified decoding scheme.
If `format` is `null`, the
primary decoding format for parameters is used. The primary decoding
format is ASN.1, if an ASN.1 specification for these parameters
exists.

Parameters:

- `params`: the encoded parameters.
- `format`: the name of the decoding scheme.

Throws:

- `IOException`: on decoding errors, or if this parameter object has already been initialized.

## AlgorithmParameters.getParameterSpec(Class<T>)

```java
public final <T extends AlgorithmParameterSpec> T getParameterSpec(Class<T> paramSpec) throws InvalidParameterSpecException
```

Returns a (transparent) specification of this parameter object.
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

- `InvalidParameterSpecException`: if the requested parameter specification is inappropriate for this parameter object, or if this parameter object has not been initialized.

## AlgorithmParameters.getEncoded()

```java
public final byte[] getEncoded() throws IOException
```

Returns the parameters in their primary encoding format.
The primary encoding format for parameters is ASN.1, if an ASN.1
specification for this type of parameters exists.

**Returns:** the parameters encoded using their primary encoding format.

Throws:

- `IOException`: on encoding errors, or if this parameter object has not been initialized.

## AlgorithmParameters.getEncoded(String)

```java
public final byte[] getEncoded(String format) throws IOException
```

Returns the parameters encoded in the specified scheme.
If `format` is `null`, the
primary encoding format for parameters is used. The primary encoding
format is ASN.1, if an ASN.1 specification for these parameters
exists.

Parameters:

- `format`: the name of the encoding format.

**Returns:** the parameters encoded using the specified encoding scheme.

Throws:

- `IOException`: on encoding errors, or if this parameter object has not been initialized.

## AlgorithmParameters.toString()

```java
public final String toString()
```

Returns a formatted string describing the parameters.

**Returns:** a formatted string describing the parameters, or `null`
if this parameter object has not been initialized.
