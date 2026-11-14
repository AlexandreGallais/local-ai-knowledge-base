---
title: "EdECPrivateKeySpec class (java.security.spec)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/spec/EdECPrivateKeySpec.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# EdECPrivateKeySpec class (java.security.spec)

```java
public final class EdECPrivateKeySpec implements KeySpec
```

A class representing elliptic curve private keys as defined in
RFC 8032: Edwards-Curve
Digital Signature Algorithm (EdDSA), including the curve and other
algorithm parameters. The private key is a bit string represented using
a byte array. This class only supports bit string lengths that are a
multiple of 8.

**Since:** 15

## EdECPrivateKeySpec.EdECPrivateKeySpec(NamedParameterSpec, byte[])

```java
public EdECPrivateKeySpec(NamedParameterSpec params, byte[] bytes)
```

Construct a private key spec using the supplied parameters and
bit string.

Parameters:

- `params`: the algorithm parameters.
- `bytes`: the key as a byte array. This array is copied to protect against subsequent modification.

Throws:

- `NullPointerException`: if `params` or `bytes` is null.

## EdECPrivateKeySpec.getParams()

```java
public NamedParameterSpec getParams()
```

Get the algorithm parameters that define the curve and other settings.

**Returns:** the algorithm parameters.

## EdECPrivateKeySpec.getBytes()

```java
public byte[] getBytes()
```

Get the byte array representing the private key. A new copy of the array
is returned each time this method is called.

**Returns:** the private key as a byte array.
