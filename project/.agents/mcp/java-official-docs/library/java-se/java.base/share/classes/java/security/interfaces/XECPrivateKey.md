---
title: "XECPrivateKey <example-value> (java.security.interfaces)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/interfaces/XECPrivateKey.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# XECPrivateKey <example-value> (java.security.interfaces)

```java
public interface XECPrivateKey <example-value> XECKey, PrivateKey
```

An interface for an elliptic curve private key as defined by RFC 7748.
These keys are distinct from the keys represented by `ECPrivateKey`,
and they are intended for use with algorithms based on RFC 7748 such as the
XDH `KeyAgreement` algorithm.

An XEC private key is an encoded scalar value as described in RFC 7748.
The decoding procedure defined in this RFC includes an operation that forces
certain bits of the key to either 1 or 0. This operation is known as
"pruning" or "clamping" the private key. Arrays returned by this interface
are unpruned, and implementations will need to prune the array before
using it in any numerical operations.

**Since:** 11

## XECPrivateKey.getScalar()

```java
Optional<byte[]> getScalar()
```

Get the scalar value encoded as an unpruned byte array. A new copy of
the array is returned each time this method is called.

**Returns:** the unpruned encoded scalar value, or an empty Optional if the
    scalar cannot be extracted (e.g. if the provider is a hardware token
    and the private key is not allowed to leave the crypto boundary).

## XECPrivateKey.getParams()

```java
default AlgorithmParameterSpec getParams()
```

(inherited documentation)

**Implementation requirements:** The default implementation returns `null`.

**Returns:** (inherited documentation)
