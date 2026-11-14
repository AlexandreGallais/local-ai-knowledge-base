---
title: "XECKey <example-value> (java.security.interfaces)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/interfaces/XECKey.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# XECKey <example-value> (java.security.interfaces)

```java
public interface XECKey
```

An interface for an elliptic curve public/private key as defined by
RFC 7748. These keys are distinct from the keys represented by
`ECKey`, and they are intended for use with algorithms based on RFC
7748 such as the XDH `KeyAgreement` algorithm. This interface allows
access to the algorithm parameters associated with the key.

**Since:** 11

## XECKey.getParams()

```java
AlgorithmParameterSpec getParams()
```

Returns the algorithm parameters associated
with the key.

**Returns:** the associated algorithm parameters
