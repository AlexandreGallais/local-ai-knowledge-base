---
title: "XECPrivateKeySpec class (java.security.spec)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/spec/XECPrivateKeySpec.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# XECPrivateKeySpec class (java.security.spec)

```java
public class XECPrivateKeySpec implements KeySpec
```

A class representing elliptic curve private keys as defined in RFC 7748,
including the curve and other algorithm parameters. The private key is
represented as an encoded scalar value. The decoding procedure defined in
the RFC includes an operation that forces certain bits of the key to either
1 or 0. This operation is known as "pruning" or "clamping" the private key.
All arrays in this spec are unpruned, and implementations will need to prune
the array before using it in any numerical operations.

**Since:** 11

## XECPrivateKeySpec.XECPrivateKeySpec(AlgorithmParameterSpec, byte[])

```java
public XECPrivateKeySpec(AlgorithmParameterSpec params, byte[] scalar)
```

Construct a private key spec using the supplied parameters and
encoded scalar value.

Parameters:

- `params`: the algorithm parameters
- `scalar`: the unpruned encoded scalar value. This array is copied to protect against subsequent modification.

Throws:

- `NullPointerException`: if `params` or `scalar` is null.

## XECPrivateKeySpec.getParams()

```java
public AlgorithmParameterSpec getParams()
```

Get the algorithm parameters that define the curve and other settings.

**Returns:** the algorithm parameters

## XECPrivateKeySpec.getScalar()

```java
public byte[] getScalar()
```

Get the scalar value encoded as an unpruned byte array. A new copy of
the array is returned each time this method is called.

**Returns:** the unpruned encoded scalar value
