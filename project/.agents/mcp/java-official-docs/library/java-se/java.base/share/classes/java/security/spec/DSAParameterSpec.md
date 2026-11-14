---
title: "DSAParameterSpec class (java.security.spec)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/spec/DSAParameterSpec.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# DSAParameterSpec class (java.security.spec)

```java
public class DSAParameterSpec implements AlgorithmParameterSpec, java.security.interfaces.DSAParams
```

This class specifies the set of parameters used with the DSA algorithm.

**See also:** AlgorithmParameterSpec

**Since:** 1.2

## DSAParameterSpec.DSAParameterSpec(BigInteger, BigInteger, BigInteger)

```java
public DSAParameterSpec(BigInteger p, BigInteger q, BigInteger g)
```

Creates a new DSAParameterSpec with the specified parameter values.

Parameters:

- `p`: the prime.
- `q`: the sub-prime.
- `g`: the base.

## DSAParameterSpec.getP()

```java
public BigInteger getP()
```

Returns the prime `p`.

**Returns:** the prime `p`.

## DSAParameterSpec.getQ()

```java
public BigInteger getQ()
```

Returns the sub-prime `q`.

**Returns:** the sub-prime `q`.

## DSAParameterSpec.getG()

```java
public BigInteger getG()
```

Returns the base `g`.

**Returns:** the base `g`.
