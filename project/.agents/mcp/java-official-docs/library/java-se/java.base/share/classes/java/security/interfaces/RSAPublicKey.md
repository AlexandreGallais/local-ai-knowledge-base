---
title: "RSAPublicKey <example-value> (java.security.interfaces)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/interfaces/RSAPublicKey.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# RSAPublicKey <example-value> (java.security.interfaces)

```java
public interface RSAPublicKey <example-value> java.security.PublicKey, RSAKey
```

The interface to an RSA public key.

**Since:** 1.2

## RSAPublicKey.serialVersionUID

```java
long serialVersionUID
```

The type fingerprint that is set to indicate
serialization compatibility with a previous
version of the type.

**Deprecated:** A `serialVersionUID` field in an interface is
ineffectual. Do not use; no replacement.

## RSAPublicKey.getPublicExponent()

```java
BigInteger getPublicExponent()
```

Returns the public exponent.

**Returns:** the public exponent

## RSAPublicKey.getParams()

```java
default AlgorithmParameterSpec getParams()
```

(inherited documentation)

**Implementation requirements:** The default implementation returns `null`.

**Returns:** (inherited documentation)

**Since:** 11
