---
title: "ECPrivateKeySpec class (java.security.spec)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/spec/ECPrivateKeySpec.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ECPrivateKeySpec class (java.security.spec)

```java
public class ECPrivateKeySpec implements KeySpec
```

This immutable class specifies an elliptic curve private key with
its associated parameters.

**See also:** KeySpec

**See also:** ECParameterSpec

**Since:** 1.5

## ECPrivateKeySpec.ECPrivateKeySpec(BigInteger, ECParameterSpec)

```java
public ECPrivateKeySpec(BigInteger s, ECParameterSpec params)
```

Creates a new ECPrivateKeySpec with the specified
parameter values.

Parameters:

- `s`: the private value.
- `params`: the associated elliptic curve domain parameters.

Throws:

- `NullPointerException`: if `s` or `params` is null.

## ECPrivateKeySpec.getS()

```java
public BigInteger getS()
```

Returns the private value S.

**Returns:** the private value S.

## ECPrivateKeySpec.getParams()

```java
public ECParameterSpec getParams()
```

Returns the associated elliptic curve domain
parameters.

**Returns:** the EC domain parameters.
