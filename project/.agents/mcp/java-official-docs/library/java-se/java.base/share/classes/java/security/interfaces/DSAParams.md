---
title: "DSAParams interface (java.security.interfaces)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/interfaces/DSAParams.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# DSAParams interface (java.security.interfaces)

```java
public interface DSAParams extends AlgorithmParameterSpec
```

Interface to a DSA-specific set of key <example-value>, which defines a
DSA *key <example-value>*. DSA (Digital Signature Algorithm) is defined
in NIST's FIPS-186.

**See also:** DSAKey

**See also:** java.security.Key

**See also:** java.security.Signature

**Since:** 1.1

## DSAParams.getP()

```java
BigInteger getP()
```

Returns the prime, `p`.

**Returns:** the prime, `p`.

## DSAParams.getQ()

```java
BigInteger getQ()
```

Returns the subprime, `q`.

**Returns:** the subprime, `q`.

## DSAParams.getG()

```java
BigInteger getG()
```

Returns the base, `g`.

**Returns:** the base, `g`.
