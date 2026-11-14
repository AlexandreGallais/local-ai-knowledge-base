---
title: "EdECPrivateKey <example-value> (java.security.interfaces)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/interfaces/EdECPrivateKey.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# EdECPrivateKey <example-value> (java.security.interfaces)

```java
public interface EdECPrivateKey <example-value> EdECKey, PrivateKey
```

An interface for an elliptic curve private key as defined by
RFC 8032: Edwards-Curve
Digital Signature Algorithm (EdDSA). These keys are distinct from the
keys represented by `ECPrivateKey`, and they are intended for use
with algorithms based on RFC 8032 such as the EdDSA `Signature`
algorithm.

An Edwards-Curve private key is a bit string. This interface only supports bit
string lengths that are a multiple of 8, and the key is represented using
a byte array.

**Since:** 15

## EdECPrivateKey.getBytes()

```java
Optional<byte[]> getBytes()
```

Get a copy of the byte array representing the private key. This method
may return an empty `Optional` if the implementation is not
willing to produce the private key value.

**Returns:** an `Optional` containing the private key byte array.
If the key is not available, then an empty `Optional`.

## EdECPrivateKey.getParams()

```java
default NamedParameterSpec getParams()
```

(inherited documentation)

**Implementation requirements:** The default implementation returns `null`.

**Returns:** (inherited documentation)
