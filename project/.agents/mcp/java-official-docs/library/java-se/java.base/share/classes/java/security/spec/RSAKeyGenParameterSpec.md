---
title: "RSAKeyGenParameterSpec class (java.security.spec)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/spec/RSAKeyGenParameterSpec.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# RSAKeyGenParameterSpec class (java.security.spec)

```java
public class RSAKeyGenParameterSpec implements AlgorithmParameterSpec
```

This class specifies the set of parameters used to generate an RSA
key pair.

**See also:** java.security.KeyPairGenerator#initialize(java.security.spec.AlgorithmParameterSpec)

**Since:** 1.3

## RSAKeyGenParameterSpec.F0

```java
public static final BigInteger F0
```

The public-exponent value F0 = 3.

## RSAKeyGenParameterSpec.F4

```java
public static final BigInteger F4
```

The public exponent-value F4 = 65537.

## RSAKeyGenParameterSpec.RSAKeyGenParameterSpec(int, BigInteger)

```java
public RSAKeyGenParameterSpec(int keysize, BigInteger publicExponent)
```

Constructs a new `RSAKeyGenParameterSpec` object from the
given keysize, public-exponent value, and null key parameters.

Parameters:

- `keysize`: the modulus size (specified in number of bits)
- `publicExponent`: the public exponent

## RSAKeyGenParameterSpec.RSAKeyGenParameterSpec(int, BigInteger, AlgorithmParameterSpec)

```java
public RSAKeyGenParameterSpec(int keysize, BigInteger publicExponent, AlgorithmParameterSpec keyParams)
```

Constructs a new `RSAKeyGenParameterSpec` object from the
given keysize, public-exponent value, and key parameters.

Parameters:

- `keysize`: the modulus size (specified in number of bits)
- `publicExponent`: the public exponent
- `keyParams`: the key <example-value>, may be null

**Since:** 11

## RSAKeyGenParameterSpec.getKeysize()

```java
public int getKeysize()
```

Returns the keysize.

**Returns:** the keysize.

## RSAKeyGenParameterSpec.getPublicExponent()

```java
public BigInteger getPublicExponent()
```

Returns the public-exponent value.

**Returns:** the public-exponent value.

## RSAKeyGenParameterSpec.getKeyParams()

```java
public AlgorithmParameterSpec getKeyParams()
```

Returns the parameters to be associated with key.

**Returns:** the associated parameters, may be null if
        not present

**Since:** 11
