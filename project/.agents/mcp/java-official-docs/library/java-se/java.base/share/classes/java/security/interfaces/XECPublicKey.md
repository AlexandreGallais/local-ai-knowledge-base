---
title: "XECPublicKey <example-value> (java.security.interfaces)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/interfaces/XECPublicKey.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# XECPublicKey <example-value> (java.security.interfaces)

```java
public interface XECPublicKey <example-value> XECKey, PublicKey
```

An interface for an elliptic curve public key as defined by RFC 7748.
These keys are distinct from the keys represented by `ECPublicKey`,
and they are intended for use with algorithms based on RFC 7748 such as the
XDH `KeyAgreement` algorithm.

An XEC public key is a particular point on the curve, which is represented
using only its u-coordinate as described in RFC 7748. A u-coordinate is an
element of the field of integers modulo some value that is determined by
the algorithm parameters. This field element is represented by a BigInteger
which may hold any value. That is, the BigInteger is not restricted to the
range of canonical field elements.

**Since:** 11

## XECPublicKey.getU()

```java
BigInteger getU()
```

Get the u coordinate of the point.

**Returns:** the u-coordinate, represented using a BigInteger which may hold
         any value

## XECPublicKey.getParams()

```java
default AlgorithmParameterSpec getParams()
```

(inherited documentation)

**Implementation requirements:** The default implementation returns `null`.

**Returns:** (inherited documentation)
