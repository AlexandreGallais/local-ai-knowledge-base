---
title: "AsymmetricKey <example-value> (java.security)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/AsymmetricKey.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# AsymmetricKey <example-value> (java.security)

```java
public non-sealed interface AsymmetricKey <example-value> Key, DEREncodable
```

An asymmetric key, which can be either a public key or a private key.
This interface contains methods that are common to either a public key or
a private key.

**Since:** 22

## AsymmetricKey.getParams()

```java
default AlgorithmParameterSpec getParams()
```

Returns the parameters associated with this key.
The parameters are optional and may be either
explicitly specified or implicitly created during
key pair generation.

**Implementation requirements:** The default implementation returns `null`.

**Returns:** the associated parameters, may be `null`
