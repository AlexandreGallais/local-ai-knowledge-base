---
title: "RSAPrivateKey <example-value> (java.security.interfaces)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/interfaces/RSAPrivateKey.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# RSAPrivateKey <example-value> (java.security.interfaces)

```java
public interface RSAPrivateKey <example-value> java.security.PrivateKey, RSAKey
```

The interface to an RSA private key.

**Since:** 1.2

**See also:** RSAPrivateCrtKey

## RSAPrivateKey.serialVersionUID

```java
long serialVersionUID
```

The type fingerprint that is set to indicate
serialization compatibility with a previous
version of the type.

**Deprecated:** A `serialVersionUID` field in an interface is
ineffectual. Do not use; no replacement.

## RSAPrivateKey.getPrivateExponent()

```java
BigInteger getPrivateExponent()
```

Returns the private exponent.

**Returns:** the private exponent

## RSAPrivateKey.getParams()

```java
default AlgorithmParameterSpec getParams()
```

(inherited documentation)

**Implementation requirements:** The default implementation returns `null`.

**Returns:** (inherited documentation)

**Since:** 11
