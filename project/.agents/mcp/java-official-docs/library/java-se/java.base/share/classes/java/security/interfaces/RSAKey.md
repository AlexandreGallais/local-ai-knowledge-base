---
title: "RSAKey <example-value> (java.security.interfaces)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/interfaces/RSAKey.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# RSAKey <example-value> (java.security.interfaces)

```java
public interface RSAKey
```

The interface to a public or private key in
PKCS#1 v2.2 standard,
such as those for RSA, or RSASSA-PSS algorithms.

**See also:** RSAPublicKey

**See also:** RSAPrivateKey

**Since:** 1.3

## RSAKey.getModulus()

```java
BigInteger getModulus()
```

Returns the modulus.

**Returns:** the modulus

## RSAKey.getParams()

```java
default AlgorithmParameterSpec getParams()
```

Returns the parameters associated with this key.
The parameters are optional and may be either
explicitly specified or implicitly created during
key pair generation.

**Implementation requirements:** The default implementation returns `null`.

**Returns:** the associated parameters, may be null

**Since:** 11
